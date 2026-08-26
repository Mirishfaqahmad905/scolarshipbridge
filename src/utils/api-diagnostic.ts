import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

/**
 * Environment Resolution Diagnostic Details
 */
export interface VercelEnvResolutionReport {
  timestamp: string;
  isProduction: boolean;
  viteMode: string;
  isVercelHost: boolean;
  hostname: string;
  origin: string;
  viteApiUrlEnv: string | undefined;
  localStorageOverride: string | null;
  effectiveBaseUrl: string;
  resolutionStrategy: 'VITE_ENV_VAR' | 'LOCALSTORAGE_OVERRIDE' | 'RELATIVE_DEFAULT' | 'CUSTOM';
  status: 'OPTIMAL' | 'WARNING' | 'MISCONFIGURED';
  warnings: string[];
  recommendations: string[];
}

/**
 * Admin Call Log Structure with Stack Traces
 */
export interface AdminCallDiagnosticLog {
  id: string;
  timestamp: string;
  endpoint: string;
  method: string;
  fullUrl: string;
  baseURL: string;
  requestHeaders: Record<string, any>;
  requestParams?: any;
  requestData?: any;
  responseStatus?: number;
  responseStatusText?: string;
  responseHeaders?: Record<string, any>;
  responseData?: any;
  isError: boolean;
  errorName?: string;
  errorMessage?: string;
  errorStack?: string;
  vercelHeaders?: {
    vercelId?: string;
    vercelCache?: string;
    vercelExecutionRegion?: string;
  };
  durationMs: number;
}

// In-memory logs ring buffer for administrative calls
const MAX_LOGS = 50;
const adminDiagnosticLogs: AdminCallDiagnosticLog[] = [];

/**
 * Verifies if frontend base URL is correctly resolving environment variables in Vercel production
 */
export function checkVercelEnvResolution(): VercelEnvResolutionReport {
  const isBrowser = typeof window !== 'undefined';
  const hostname = isBrowser ? window.location.hostname : 'localhost';
  const origin = isBrowser ? window.location.origin : 'http://localhost:3000';
  const isVercelHost = hostname.endsWith('.vercel.app') || hostname.includes('vercel');

  // Inspect Vite Environment Variables
  const env = (import.meta as any).env || {};
  const viteApiUrlEnv: string | undefined = env.VITE_API_URL;
  const isProduction: boolean = Boolean(env.PROD || env.MODE === 'production' || isVercelHost);
  const viteMode: string = env.MODE || (isProduction ? 'production' : 'development');

  let localStorageOverride: string | null = null;
  try {
    if (isBrowser) {
      localStorageOverride = localStorage.getItem('scholarbridge_api_base_url');
    }
  } catch {
    // Ignore storage restrictions
  }

  // Calculate effective Base URL
  let effectiveBaseUrl = '/api';
  let resolutionStrategy: VercelEnvResolutionReport['resolutionStrategy'] = 'RELATIVE_DEFAULT';

  if (localStorageOverride && localStorageOverride.trim()) {
    effectiveBaseUrl = localStorageOverride.trim().replace(/\/+$/, '');
    resolutionStrategy = 'LOCALSTORAGE_OVERRIDE';
  } else if (viteApiUrlEnv && viteApiUrlEnv.trim()) {
    effectiveBaseUrl = viteApiUrlEnv.trim().replace(/\/+$/, '');
    resolutionStrategy = 'VITE_ENV_VAR';
  } else {
    effectiveBaseUrl = '/api';
    resolutionStrategy = 'RELATIVE_DEFAULT';
  }

  const warnings: string[] = [];
  const recommendations: string[] = [];
  let status: VercelEnvResolutionReport['status'] = 'OPTIMAL';

  // Check for common Vercel misconfigurations
  if (isVercelHost) {
    if (viteApiUrlEnv && viteApiUrlEnv.includes('localhost')) {
      status = 'MISCONFIGURED';
      warnings.push(`VITE_API_URL is configured to "${viteApiUrlEnv}", pointing to localhost while running on Vercel production (${hostname}).`);
      recommendations.push('Remove VITE_API_URL or change it to a relative "/api" or production backend URL in Vercel Project Settings > Environment Variables.');
    }

    if (resolutionStrategy === 'RELATIVE_DEFAULT') {
      recommendations.push('Using relative "/api". Ensure vercel.json routes "/api/(.*)" to the serverless function (or Express api entry).');
    }

    if (resolutionStrategy === 'VITE_ENV_VAR' && !viteApiUrlEnv?.startsWith('https://') && !viteApiUrlEnv?.startsWith('/')) {
      status = 'WARNING';
      warnings.push(`VITE_API_URL "${viteApiUrlEnv}" lacks HTTPS protocol and may trigger browser mixed content errors.`);
      recommendations.push('Prefix your production API URL with https://');
    }
  } else {
    // Local development mode
    if (!viteApiUrlEnv && resolutionStrategy === 'RELATIVE_DEFAULT') {
      recommendations.push('Local development using default "/api" proxy routing. Ensure the dev server is proxying to port 3000.');
    }
  }

  const report: VercelEnvResolutionReport = {
    timestamp: new Date().toISOString(),
    isProduction,
    viteMode,
    isVercelHost,
    hostname,
    origin,
    viteApiUrlEnv,
    localStorageOverride,
    effectiveBaseUrl,
    resolutionStrategy,
    status,
    warnings,
    recommendations
  };

  // Log report to console in a distinct collapsible group
  logEnvResolutionToConsole(report);

  return report;
}

/**
 * Format and print the environment resolution report
 */
function logEnvResolutionToConsole(report: VercelEnvResolutionReport): void {
  const badgeColor = report.status === 'OPTIMAL' ? '#10b981' : report.status === 'WARNING' ? '#f59e0b' : '#ef4444';
  const badgeStyle = `background: ${badgeColor}; color: white; padding: 2px 6px; border-radius: 4px; font-weight: bold;`;
  
  console.groupCollapsed(
    `%c[ENV RESOLUTION]%c Base URL: "${report.effectiveBaseUrl}" %c${report.status}`,
    'background: #334155; color: #f8fafc; padding: 2px 6px; border-radius: 4px;',
    'color: #0f172a; font-weight: bold;',
    badgeStyle
  );

  console.table({
    'Runtime Host': report.hostname,
    'Origin': report.origin,
    'Vercel Detected': report.isVercelHost ? 'Yes (.vercel.app)' : 'No',
    'Vite Mode / Production': `${report.viteMode} (prod: ${report.isProduction})`,
    'VITE_API_URL Env': report.viteApiUrlEnv || '(undefined - fallback applied)',
    'LocalStorage Override': report.localStorageOverride || '(none)',
    'Effective Axios BaseURL': report.effectiveBaseUrl,
    'Resolution Strategy': report.resolutionStrategy,
    'Status': report.status
  });

  if (report.warnings.length > 0) {
    console.warn('⚠️ Environment Warnings:', report.warnings);
  }
  if (report.recommendations.length > 0) {
    console.info('💡 Recommendations:', report.recommendations);
  }

  console.groupEnd();
}

/**
 * Constructs the absolute requested URL from Axios configuration
 */
export function buildFullRequestUrl(baseURL: string = '', url: string = '', params?: Record<string, any>): string {
  let combined = url;
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    const cleanBase = (baseURL || '').replace(/\/+$/, '');
    const cleanPath = url.replace(/^\/+/, '');
    if (!cleanBase) {
      combined = typeof window !== 'undefined' ? `${window.location.origin}/${cleanPath}` : `http://localhost:3000/${cleanPath}`;
    } else {
      combined = `${cleanBase}/${cleanPath}`;
    }
  }

  if (params && Object.keys(params).length > 0) {
    try {
      const searchParams = new URLSearchParams();
      Object.entries(params).forEach(([k, v]) => {
        if (v !== undefined && v !== null) {
          searchParams.append(k, String(v));
        }
      });
      const queryStr = searchParams.toString();
      if (queryStr) {
        combined += (combined.includes('?') ? '&' : '?') + queryStr;
      }
    } catch {
      // Ignore URLSearchParams error
    }
  }

  return combined;
}

/**
 * Wrapper function for Axios admin calls to log full request URL, headers, and error stack traces
 */
export async function wrapAxiosAdminCall<T>(
  callFn: () => Promise<AxiosResponse<T> | T>,
  contextName: string = 'Admin API Operation'
): Promise<T> {
  const startTime = Date.now();
  try {
    const result = await callFn();
    // Return extracted data or result directly
    if (result && typeof result === 'object' && 'data' in (result as any) && 'status' in (result as any)) {
      return (result as AxiosResponse<T>).data;
    }
    return result as T;
  } catch (rawError: any) {
    const durationMs = Date.now() - startTime;
    logAdminErrorWithStackTrace(rawError, contextName, durationMs);
    throw rawError;
  }
}

/**
 * Detailed error logger capturing stack traces, request config, headers, and Vercel response info
 */
export function logAdminErrorWithStackTrace(
  error: any,
  context: string = 'Admin API Call',
  durationMs: number = 0
): AdminCallDiagnosticLog {
  const axiosError = error as AxiosError;
  const config: any = axiosError?.config || {};
  const response: any = axiosError?.response;
  
  const baseURL = config.baseURL || '';
  const endpoint = config.url || 'unknown';
  const method = (config.method || 'GET').toUpperCase();
  const fullUrl = buildFullRequestUrl(baseURL, endpoint, config.params);
  
  const headers = (config.headers as Record<string, any>) || {};
  const responseHeaders = response?.headers || {};
  
  const vercelId = responseHeaders['x-vercel-id'] || responseHeaders['X-Vercel-Id'];
  const vercelCache = responseHeaders['x-vercel-cache'] || responseHeaders['X-Vercel-Cache'];
  const vercelExecutionRegion = responseHeaders['x-vercel-execution-region'];

  const errorStack = error?.stack || new Error().stack;

  const logEntry: AdminCallDiagnosticLog = {
    id: `admin-err-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    timestamp: new Date().toISOString(),
    endpoint,
    method,
    fullUrl,
    baseURL,
    requestHeaders: { ...headers },
    requestParams: config.params,
    requestData: config.data,
    responseStatus: response?.status,
    responseStatusText: response?.statusText,
    responseHeaders: { ...responseHeaders },
    responseData: response?.data,
    isError: true,
    errorName: error?.name || 'AxiosError',
    errorMessage: error?.message || 'Unknown request failure',
    errorStack,
    vercelHeaders: {
      vercelId,
      vercelCache,
      vercelExecutionRegion
    },
    durationMs
  };

  // Push to circular buffer
  adminDiagnosticLogs.unshift(logEntry);
  if (adminDiagnosticLogs.length > MAX_LOGS) {
    adminDiagnosticLogs.pop();
  }

  // Print grouped, colorized console output with full stack trace
  console.group(
    `%c🚨 [ADMIN API ERROR]%c ${method} ${endpoint} %c${response?.status ? `HTTP ${response.status}` : 'NETWORK_ERROR'}%c (${durationMs}ms)`,
    'background: #dc2626; color: white; font-weight: bold; padding: 2px 6px; border-radius: 4px;',
    'color: #0f172a; font-weight: bold; margin-left: 6px;',
    'background: #7f1d1d; color: #fecaca; padding: 2px 6px; border-radius: 4px; font-weight: bold;',
    'color: #64748b; font-size: 11px;'
  );

  console.log('%c📍 Context:', 'font-weight: bold; color: #0284c7;', context);
  console.log('%c🔗 Full Resolved URL:', 'font-weight: bold; color: #3b82f6;', fullUrl);
  console.log('%c⚙️ Base URL Configured:', 'font-weight: bold;', baseURL || '(relative /)');
  
  console.groupCollapsed('📋 Request Headers & Payload');
  console.log('Headers:', headers);
  if (config.params) console.log('Query Params:', config.params);
  if (config.data) console.log('Request Body:', config.data);
  console.groupEnd();

  if (response) {
    console.groupCollapsed(`📦 Server Response (HTTP ${response.status})`);
    console.log('Response Status:', response.status, response.statusText);
    console.log('Response Headers:', responseHeaders);
    console.log('Response Data:', response.data);
    if (vercelId) {
      console.log('%c▲ Vercel Execution:', 'color: #000; font-weight: bold;', {
        'x-vercel-id': vercelId,
        'x-vercel-cache': vercelCache,
        'region': vercelExecutionRegion
      });
    }
    console.groupEnd();
  } else {
    console.warn('⚠️ No response received from server. Possible CORS blockage, DNS failure, or server crash.');
  }

  // Error Stack Trace
  console.group('%c💥 Error Stack Trace', 'color: #ef4444; font-weight: bold;');
  console.error(errorStack);
  console.groupEnd();

  console.groupEnd();

  return logEntry;
}

/**
 * Attaches automated diagnostic logging to an Axios instance for all /api/admin/* endpoints
 */
export function attachAdminDiagnosticsInterceptor(axiosInstance: AxiosInstance): void {
  // Request Interceptor
  axiosInstance.interceptors.request.use((config) => {
    (config as any).__requestStartTime = Date.now();
    const url = config.url || '';
    const isAdmin = url.includes('/admin') || (config.baseURL || '').includes('/admin');

    if (isAdmin) {
      const fullUrl = buildFullRequestUrl(config.baseURL, url, config.params);
      console.debug(`%c[ADMIN REQUEST] ${config.method?.toUpperCase()} ${fullUrl}`, 'color: #6366f1; font-weight: bold;');
    }
    return config;
  });

  // Response Interceptor
  axiosInstance.interceptors.response.use(
    (response) => {
      const config: any = response.config || {};
      const durationMs = config.__requestStartTime ? Date.now() - config.__requestStartTime : 0;
      const url = config.url || '';
      const isAdmin = url.includes('/admin') || (config.baseURL || '').includes('/admin');

      if (isAdmin) {
        const fullUrl = buildFullRequestUrl(config.baseURL, url, config.params);
        console.debug(
          `%c[ADMIN SUCCESS] ${config.method?.toUpperCase()} ${fullUrl} %cHTTP ${response.status}%c (${durationMs}ms)`,
          'color: #059669; font-weight: bold;',
          'background: #ecfdf5; color: #047857; padding: 1px 4px; border-radius: 3px;',
          'color: #94a3b8;'
        );
      }
      return response;
    },
    (error) => {
      const config: any = error?.config || {};
      const durationMs = config.__requestStartTime ? Date.now() - config.__requestStartTime : 0;
      const url = config.url || '';
      const isAdmin = url.includes('/admin') || (config.baseURL || '').includes('/admin');

      if (isAdmin) {
        logAdminErrorWithStackTrace(error, `Admin Endpoint: ${url}`, durationMs);
      }
      return Promise.reject(error);
    }
  );
}

/**
 * Get in-memory admin diagnostic logs
 */
export function getAdminDiagnosticLogs(): AdminCallDiagnosticLog[] {
  return [...adminDiagnosticLogs];
}

/**
 * Clear admin diagnostic logs
 */
export function clearAdminDiagnosticLogs(): void {
  adminDiagnosticLogs.length = 0;
}

/**
 * Comprehensive diagnostic suite testing admin routes and env resolution
 */
export async function runVercelAdminDiagnosticSuite(customAdminToken?: string): Promise<{
  envReport: VercelEnvResolutionReport;
  routeResults: Array<{ endpoint: string; method: string; fullUrl: string; status: number | 'FAIL'; timeMs: number; ok: boolean }>;
  allPassed: boolean;
}> {
  const envReport = checkVercelEnvResolution();
  const token = customAdminToken || (typeof window !== 'undefined' ? localStorage.getItem('scholarbridge_admin_token') : null) || 'mock-jwt-token-admin';
  
  const testEndpoints = [
    { endpoint: '/admin/scholarships', method: 'GET' },
    { endpoint: '/admin/universities', method: 'GET' },
    { endpoint: '/admin/countries', method: 'GET' },
    { endpoint: '/admin/posts', method: 'GET' },
    { endpoint: '/admin/settings', method: 'GET' }
  ];

  const routeResults: Array<{ endpoint: string; method: string; fullUrl: string; status: number | 'FAIL'; timeMs: number; ok: boolean }> = [];
  let allPassed = true;

  for (const item of testEndpoints) {
    const startTime = Date.now();
    const fullUrl = buildFullRequestUrl(envReport.effectiveBaseUrl, item.endpoint);
    try {
      const resp = await axios.get(fullUrl, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        },
        timeout: 10000
      });
      const timeMs = Date.now() - startTime;
      const ok = resp.status >= 200 && resp.status < 300;
      if (!ok) allPassed = false;
      routeResults.push({ endpoint: item.endpoint, method: item.method, fullUrl, status: resp.status, timeMs, ok });
    } catch (err: any) {
      const timeMs = Date.now() - startTime;
      allPassed = false;
      routeResults.push({
        endpoint: item.endpoint,
        method: item.method,
        fullUrl,
        status: err?.response?.status || 'FAIL',
        timeMs,
        ok: false
      });
      logAdminErrorWithStackTrace(err, `Diagnostic Suite: ${item.endpoint}`, timeMs);
    }
  }

  return {
    envReport,
    routeResults,
    allPassed
  };
}
