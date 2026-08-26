import { AxiosError } from 'axios';

export interface VercelDiagnosticsInfo {
  isVercel: boolean;
  vercelId?: string;
  vercelCache?: string;
  vercelExecutionRegion?: string;
  matchedHtmlFallback: boolean;
  isCrossOrigin: boolean;
}

export interface ApiDiagnosticReport {
  id: string;
  timestamp: string;
  context?: string;
  endpoint: string;
  method: string;
  baseURL: string;
  fullResolvedUrl: string;
  currentOrigin: string;
  status: number | null;
  statusText: string;
  errorMessage: string;
  errorName: string;
  hasAuthHeader: boolean;
  authTokenType?: string;
  vercel: VercelDiagnosticsInfo;
  networkError: boolean;
  timeoutError: boolean;
  corsSuspected: boolean;
  likelyCause: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  recommendations: string[];
  rawResponseData?: any;
  rawRequestHeaders?: Record<string, any>;
}

// In-memory ring buffer for the latest diagnostic logs (max 30 entries)
const MAX_DIAGNOSTIC_HISTORY = 30;
const diagnosticHistory: ApiDiagnosticReport[] = [];

/**
 * Helper to get the full resolved URL from Axios config
 */
export function getFullRequestUrl(baseURL: string = '', url: string = ''): string {
  if (!url) return baseURL || window.location.href;
  if (/^https?:\/\//i.test(url)) return url;
  
  const cleanBase = (baseURL || '').replace(/\/+$/, '');
  const cleanPath = url.replace(/^\/+/, '');
  
  if (!cleanBase) {
    return `${window.location.origin}/${cleanPath}`;
  }
  return `${cleanBase}/${cleanPath}`;
}

/**
 * Diagnostic utility function that inspects Axios errors for /api/admin and /api calls,
 * specifically checking base URL resolution, Vercel rewrite behaviors, and proxy configurations.
 */
export function diagnoseApiError(error: any, context?: string): ApiDiagnosticReport {
  const now = new Date().toISOString();
  const reportId = `diag-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
  const currentOrigin = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000';
  
  const axiosError = error as AxiosError;
  const config: any = axiosError?.config || {};
  const response: any = axiosError?.response;
  const request: any = axiosError?.request;

  const baseURL = config.baseURL || '';
  const endpoint = config.url || 'unknown';
  const method = (config.method || 'GET').toUpperCase();
  const fullResolvedUrl = getFullRequestUrl(baseURL, endpoint);
  
  const status = response?.status || null;
  const statusText = response?.statusText || (error.code ? String(error.code) : 'Unknown');
  const errorMessage = error?.message || 'Unknown network error';
  const errorName = error?.name || 'Error';

  // Request headers inspection
  const headers = (config.headers as Record<string, any>) || {};
  const authHeader = headers['Authorization'] || headers['authorization'] || '';
  const hasAuthHeader = Boolean(authHeader);
  const authTokenType = hasAuthHeader ? (String(authHeader).startsWith('Bearer ') ? 'Bearer JWT' : 'Custom') : undefined;

  // Response inspection
  const responseHeaders = response?.headers || {};
  const contentType = String(responseHeaders['content-type'] || responseHeaders['Content-Type'] || '');
  const responseData = response?.data;
  
  // Vercel-specific indicators
  const vercelId = responseHeaders['x-vercel-id'] as string | undefined;
  const vercelCache = responseHeaders['x-vercel-cache'] as string | undefined;
  const vercelExecutionRegion = responseHeaders['x-vercel-execution-region'] as string | undefined;
  const isVercel = Boolean(vercelId || (typeof window !== 'undefined' && window.location.hostname.includes('vercel.app')));

  // Check if an HTML page (like index.html) was returned instead of JSON
  const isHtmlResponse = contentType.includes('text/html') || 
    (typeof responseData === 'string' && (responseData.includes('<!DOCTYPE html>') || responseData.includes('<html')));

  // Cross-origin & Network error analysis
  const isCrossOrigin = fullResolvedUrl.startsWith('http') && !fullResolvedUrl.startsWith(currentOrigin);
  const networkError = !response && Boolean(request || error.code === 'ERR_NETWORK');
  const timeoutError = error.code === 'ECONNABORTED' || errorMessage.toLowerCase().includes('timeout');
  const corsSuspected = networkError && isCrossOrigin;

  // Derive Likely Cause & Actionable Recommendations
  const recommendations: string[] = [];
  let likelyCause = 'Unknown error occurred during API communication.';
  let severity: ApiDiagnosticReport['severity'] = 'medium';

  const isAdminCall = endpoint.includes('/admin') || (baseURL + endpoint).includes('/admin');

  if (isHtmlResponse) {
    severity = 'high';
    likelyCause = 'Vercel rewrite mismatch: The request to the API was routed to the single-page application index.html instead of the backend serverless function or Express server.';
    recommendations.push('Ensure `vercel.json` rewrites `/api/(.*)` to `/api` before the single-page application fallback `/(.*)` rule.');
    recommendations.push('Verify that `/api/index.ts` or `/server.ts` is correctly declared as the entry point.');
    recommendations.push(`Current requested URL: "${fullResolvedUrl}". Check if the route is prefixed with "/api" or if baseURL needs adjusting.`);
  } else if (status === 404) {
    severity = 'high';
    likelyCause = `Endpoint not found (404) on host ${baseURL || 'relative origin'}. The backend route for ${method} ${endpoint} does not exist or the proxy rewrite stripped the path.`;
    recommendations.push(`Check if the backend router has registered ${method} "${endpoint}".`);
    recommendations.push('If deploying to Vercel, check that your Express route paths match the rewritten path.');
    recommendations.push('If hosting backend on an external server (Render/Railway), ensure the Custom API URL in Admin Settings is set to the correct base path ending in "/api".');
  } else if (status === 401 || status === 403) {
    severity = 'medium';
    likelyCause = `Authentication failure (${status}): The request to an administrative endpoint was rejected due to missing, invalid, or expired admin credentials.`;
    if (!hasAuthHeader) {
      recommendations.push('No Authorization header was sent with this request. Ensure you are logged into the Admin panel at /admin/login.');
    } else {
      recommendations.push('The attached Bearer token may have expired or is invalid. Log out and log back in to regenerate a valid JWT session.');
    }
  } else if (status === 500 || status === 502 || status === 503 || status === 504) {
    severity = 'critical';
    likelyCause = `Server Error (${status}): The backend failed while processing the ${method} ${endpoint} request. In serverless environments, this often stems from unhandled exceptions, missing environment variables, or read-only filesystem writes.`;
    recommendations.push('Check Vercel Deployment Logs under "Runtime Logs" or "Functions" tab for stack traces.');
    recommendations.push('Ensure disk operations use in-memory fallbacks or writable /tmp directories on serverless platforms.');
    recommendations.push('Verify database connection strings or JSON database files in backend/data/ are packaged with the build.');
  } else if (corsSuspected) {
    severity = 'high';
    likelyCause = `CORS or Network Failure: The browser was blocked from accessing cross-origin host "${fullResolvedUrl}".`;
    recommendations.push(`Add CORS headers (Access-Control-Allow-Origin: ${currentOrigin}) to your remote backend server.`);
    recommendations.push('Enable OPTIONS preflight request handling on the backend Express router.');
    recommendations.push('Check if the remote backend protocol is HTTPS to avoid mixed-content blocking in production.');
  } else if (timeoutError) {
    severity = 'medium';
    likelyCause = `Request timed out after ${config.timeout || 15000}ms while reaching "${fullResolvedUrl}".`;
    recommendations.push('The backend serverless function may be experiencing cold-start latency or an infinite loop.');
    recommendations.push('Check server performance and increase the Axios timeout in src/services/api.ts if needed.');
  } else if (networkError) {
    severity = 'high';
    likelyCause = `Network Connection Refused: Could not connect to API server at "${fullResolvedUrl}".`;
    recommendations.push('Verify that the backend server is running and accessible.');
    recommendations.push('If on Vercel, check that the deployment build succeeded without serverless compilation errors.');
  }

  if (isAdminCall && !recommendations.some(r => r.includes('Admin Settings'))) {
    recommendations.push('You can test and override the live backend connection in Admin Settings -> Backend API URL.');
  }

  const report: ApiDiagnosticReport = {
    id: reportId,
    timestamp: now,
    context: context || (isAdminCall ? 'Admin API Call' : 'Public API Call'),
    endpoint,
    method,
    baseURL,
    fullResolvedUrl,
    currentOrigin,
    status,
    statusText,
    errorMessage,
    errorName,
    hasAuthHeader,
    authTokenType,
    vercel: {
      isVercel,
      vercelId,
      vercelCache,
      vercelExecutionRegion,
      matchedHtmlFallback: isHtmlResponse,
      isCrossOrigin
    },
    networkError,
    timeoutError,
    corsSuspected,
    likelyCause,
    severity,
    recommendations,
    rawResponseData: typeof responseData === 'object' ? responseData : (responseData ? String(responseData).slice(0, 500) : undefined),
    rawRequestHeaders: {
      hasAuth: hasAuthHeader,
      contentType: headers['Content-Type'] || headers['content-type']
    }
  };

  // Push to local history
  diagnosticHistory.unshift(report);
  if (diagnosticHistory.length > MAX_DIAGNOSTIC_HISTORY) {
    diagnosticHistory.pop();
  }

  // Save latest diagnostic to sessionStorage for inspector UI
  try {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('scholarbridge_last_api_diagnostic', JSON.stringify(report));
    }
  } catch {
    // Ignore storage quota errors
  }

  // Emit structured diagnostic log to console with rich styling
  logDiagnosticToConsole(report);

  return report;
}

/**
 * Pretty console logging with grouped details
 */
function logDiagnosticToConsole(report: ApiDiagnosticReport): void {
  const badgeStyle = (bgColor: string) => `background: ${bgColor}; color: white; padding: 2px 6px; border-radius: 4px; font-weight: bold;`;
  const severityColors = {
    low: '#3b82f6',
    medium: '#f59e0b',
    high: '#ea580c',
    critical: '#dc2626'
  };

  const groupTitle = `%c[API DIAGNOSTIC]%c ${report.method} ${report.endpoint} %c${report.status ? `HTTP ${report.status}` : 'NETWORK ERROR'}`;
  
  console.groupCollapsed(
    groupTitle,
    badgeStyle('#1e293b'),
    'color: #0f172a; font-weight: bold;',
    badgeStyle(severityColors[report.severity])
  );

  console.log('%c🔍 LIKELY CAUSE:', 'font-weight: bold; color: #dc2626;', report.likelyCause);

  console.table({
    'Requested Method': report.method,
    'Endpoint': report.endpoint,
    'Configured Base URL': report.baseURL || '(relative /)',
    'Full Resolved URL': report.fullResolvedUrl,
    'Origin Host': report.currentOrigin,
    'HTTP Status': report.status ?? 'None (Network Error)',
    'Status Text': report.statusText,
    'Auth Header Attached': report.hasAuthHeader ? `Yes (${report.authTokenType})` : 'No',
    'Detected Vercel Runtime': report.vercel.isVercel ? 'Yes' : 'No',
    'HTML Rewriting Collision': report.vercel.matchedHtmlFallback ? '⚠️ Detected (HTML returned instead of JSON)' : 'No',
    'Cross-Origin Request': report.vercel.isCrossOrigin ? 'Yes' : 'No'
  });

  if (report.recommendations.length > 0) {
    console.log('%c💡 ACTIONABLE RECOMMENDATIONS:', 'font-weight: bold; color: #0284c7;');
    report.recommendations.forEach((rec, idx) => {
      console.log(`  ${idx + 1}. ${rec}`);
    });
  }

  if (report.rawResponseData) {
    console.log('%c📦 Response Payload:', 'font-weight: bold; color: #64748b;', report.rawResponseData);
  }

  console.groupEnd();
}

/**
 * Retrieve recent diagnostic reports for inspection in Admin UI
 */
export function getRecentApiDiagnostics(): ApiDiagnosticReport[] {
  return [...diagnosticHistory];
}

/**
 * Clear diagnostic logs
 */
export function clearApiDiagnostics(): void {
  diagnosticHistory.length = 0;
  try {
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('scholarbridge_last_api_diagnostic');
    }
  } catch {
    // Ignore
  }
}

/**
 * Run an active health & routing diagnostic check against multiple endpoints
 */
export async function runComprehensiveApiDiagnostics(customUrl?: string): Promise<{
  healthResult: any;
  latencyMs: number;
  report: ApiDiagnosticReport | null;
  endpointsTested: Array<{ endpoint: string; status: number | 'FAIL'; timeMs: number }>;
}> {
  const targetBase = (customUrl || '').trim().replace(/\/+$/, '') || (typeof window !== 'undefined' ? '' : 'http://localhost:3000');
  const startTime = Date.now();
  const endpointsTested: Array<{ endpoint: string; status: number | 'FAIL'; timeMs: number }> = [];
  
  let healthResult: any = null;
  let report: ApiDiagnosticReport | null = null;

  const testList = ['/api/health', '/api/scholarships?limit=1', '/api/countries'];

  for (const ep of testList) {
    const epStart = Date.now();
    const targetUrl = targetBase ? `${targetBase}${ep.replace(/^\/api/, '')}` : ep;
    try {
      const resp = await fetch(targetUrl, {
        headers: {
          'Accept': 'application/json'
        }
      });
      const timeMs = Date.now() - epStart;
      endpointsTested.push({ endpoint: ep, status: resp.status, timeMs });
      if (ep === '/api/health') {
        try {
          healthResult = await resp.json();
        } catch {
          healthResult = { rawText: await resp.text() };
        }
      }
    } catch (err: any) {
      const timeMs = Date.now() - epStart;
      endpointsTested.push({ endpoint: ep, status: 'FAIL', timeMs });
      report = diagnoseApiError(err, 'Manual Diagnostic Runner');
    }
  }

  const latencyMs = Date.now() - startTime;
  return {
    healthResult,
    latencyMs,
    report,
    endpointsTested
  };
}
