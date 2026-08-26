import React, { useState, useEffect } from 'react';
import { Save, Settings, Shield, Globe, Bell, DollarSign, Image as ImageIcon, CheckCircle2, Terminal } from 'lucide-react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { Base64Uploader } from '../../components/admin/Base64Uploader';
import { scholarshipApi, runComprehensiveApiDiagnostics, runVercelAdminDiagnosticSuite, checkVercelEnvResolution } from '../../services/api';
import { useApp } from '../../context/AppContext';

export const AdminSettingsPage: React.FC = () => {
  const { addToast } = useApp();
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [formData, setFormData] = useState<any>({
    siteName: 'ScholarshipBride',
    siteTagline: 'Connecting Ambitious Students with Global Funding Opportunities',
    logoUrl: '',
    faviconUrl: '',
    copyrightText: '© 2026 ScholarshipBride International Foundation. All rights reserved.',
    announcementBar: {
      enabled: true,
      text: '🎓 Fall 2026 International Admissions & Fully Funded Scholarships are Now Open! Apply Early.',
      linkText: 'View Open Deadlines',
      linkUrl: '/scholarships',
      backgroundColor: '#f59e0b',
      textColor: '#0f172a'
    },
    defaultCurrency: 'USD ($)',
    maintenanceMode: false,
    analyticsCode: "window.dataLayer = window.dataLayer || [];\nfunction gtag(){dataLayer.push(arguments);}\ngtag('js', new Date());\ngtag('config', 'G-SCHOLARSHIP');",
    emailNotifications: {
      newInquiryAlert: true,
      newScholarshipAlert: true,
      dailySummaryEmail: 'admissions@scholarshipbride.org'
    }
  });

  const loadSettings = async () => {
    try {
      setIsLoading(true);
      const data = await scholarshipApi.admin.getSettings();
      if (data && Object.keys(data).length > 0) {
        setFormData(data);
      }
    } catch (err) {
      // silent
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadSettings();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSaving(true);
      await scholarshipApi.admin.updateSettings(formData);
      addToast({
        type: 'success',
        title: 'Settings Saved',
        message: 'Updated general platform configuration in settings.json.'
      });
    } catch (err) {
      addToast({ type: 'error', title: 'Error', message: 'Failed to update settings.' });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <AdminLayout
      title="Global Website Settings"
      subtitle="Configure site branding, announcement ribbons, currency, and maintenance status in settings.json"
    >
      <form onSubmit={handleSave} className="space-y-6 max-w-5xl">
        <div className="flex items-center justify-between p-4 bg-white rounded-3xl border border-slate-200 shadow-xs">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Platform Preferences</h3>
            <p className="text-xs text-slate-500">Persisted safely into /backend/data/settings.json</p>
          </div>

          <button
            type="submit"
            disabled={isSaving}
            className="inline-flex items-center gap-2 px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-md cursor-pointer disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{isSaving ? 'Saving...' : 'Save Settings'}</span>
          </button>
        </div>

        {/* Branding & Identity */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <h4 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">
            1. Brand Identity & Global Name
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                Website Name *
              </label>
              <input
                type="text"
                required
                value={formData.siteName || ''}
                onChange={(e) => setFormData({ ...formData, siteName: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                Website Tagline
              </label>
              <input
                type="text"
                value={formData.siteTagline || ''}
                onChange={(e) => setFormData({ ...formData, siteTagline: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 outline-none"
              />
            </div>
          </div>

          <div className="text-xs space-y-3 pt-2">
            <Base64Uploader
              label="Custom Logo (Base64)"
              value={formData.logoUrl || ''}
              onChange={(b64) => setFormData({ ...formData, logoUrl: b64 })}
              helperText="Upload transparent PNG/SVG logo. Stored as Base64 in media.json / settings.json."
            />

            <div>
              <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                Footer Copyright Text
              </label>
              <input
                type="text"
                value={formData.copyrightText || ''}
                onChange={(e) => setFormData({ ...formData, copyrightText: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 outline-none"
              />
            </div>
          </div>
        </div>

        {/* Top Header Announcement Bar */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <h4 className="text-sm font-bold text-slate-900">2. Header Top Announcement Ribbon</h4>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={Boolean(formData.announcementBar?.enabled)}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    announcementBar: { ...formData.announcementBar, enabled: e.target.checked }
                  })
                }
                className="w-4 h-4 rounded text-indigo-600"
              />
              <span className="text-xs font-bold text-slate-700">Display Announcement Bar</span>
            </label>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                Announcement Message
              </label>
              <input
                type="text"
                value={formData.announcementBar?.text || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    announcementBar: { ...formData.announcementBar, text: e.target.value }
                  })
                }
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none text-slate-900 font-semibold"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Button Call-to-Action Text
                </label>
                <input
                  type="text"
                  value={formData.announcementBar?.linkText || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      announcementBar: { ...formData.announcementBar, linkText: e.target.value }
                    })
                  }
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Button Link Route
                </label>
                <input
                  type="text"
                  value={formData.announcementBar?.linkUrl || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      announcementBar: { ...formData.announcementBar, linkUrl: e.target.value }
                    })
                  }
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono text-[11px] outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* API & Backend Connection */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Globe className="w-4 h-4 text-indigo-600" />
              <span>4. Backend API URL & Online Deployment Endpoint</span>
            </h4>
            <span className="text-[10px] font-bold px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-200">
              Active Mode: {localStorage.getItem('scholarbridge_api_base_url') ? 'Custom URL' : 'Default (/api)'}
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                Custom Backend API Base URL (Optional)
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. https://your-backend-api.vercel.app/api or /api"
                  value={localStorage.getItem('scholarbridge_api_base_url') || ''}
                  onChange={(e) => {
                    const val = e.target.value.trim();
                    if (val) {
                      localStorage.setItem('scholarbridge_api_base_url', val);
                    } else {
                      localStorage.removeItem('scholarbridge_api_base_url');
                    }
                    setFormData({ ...formData, _customApiUrl: val });
                  }}
                  className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono text-[11px] outline-none"
                />
                <button
                  type="button"
                  onClick={async () => {
                    try {
                      const res = await scholarshipApi.healthCheck();
                      addToast({
                        type: 'success',
                        title: 'API Connection Successful',
                        message: `Connected to backend (${res.platform || 'Active'})! Status: ${res.status || 'OK'}`
                      });
                    } catch (err: any) {
                      addToast({
                        type: 'error',
                        title: 'API Connection Failed',
                        message: 'Could not connect to specified API endpoint. Falling back to local offline dataset.'
                      });
                    }
                  }}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white font-bold rounded-xl cursor-pointer"
                >
                  Test Health
                </button>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                Leave empty to use relative <code className="font-mono bg-slate-100 px-1 rounded">/api</code> (Vercel Serverless Function). If you host your backend Express server on a separate domain (e.g. Render, Railway, Vercel), enter its full API endpoint here.
              </p>
            </div>

            {/* Diagnostic Utility Runner */}
            <div className="mt-4 p-5 bg-slate-900 text-white rounded-2xl border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-emerald-400" />
                  <span className="font-bold text-xs uppercase tracking-wider text-slate-200">Vercel & /api/admin Diagnostic Suite</span>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      const envRep = checkVercelEnvResolution();
                      setFormData((prev: any) => ({ ...prev, _envRep: envRep }));
                      addToast({
                        type: envRep.status === 'OPTIMAL' ? 'success' : 'warning',
                        title: `Vercel Env: ${envRep.status}`,
                        message: `Base URL: ${envRep.effectiveBaseUrl} (${envRep.resolutionStrategy}). Check console for table.`
                      });
                    }}
                    className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-[11px] rounded-lg transition-colors cursor-pointer"
                  >
                    Check Env Resolution
                  </button>
                  <button
                    type="button"
                    onClick={async () => {
                      try {
                        setIsLoading(true);
                        const res = await runVercelAdminDiagnosticSuite();
                        setFormData((prev: any) => ({ ...prev, _adminSuite: res, _envRep: res.envReport }));
                        addToast({
                          type: res.allPassed ? 'success' : 'warning',
                          title: res.allPassed ? 'All Admin Routes OK' : 'Some Routes Failed',
                          message: `Tested 5 /api/admin endpoints. Base URL: ${res.envReport.effectiveBaseUrl}. Check console for stack traces!`
                        });
                      } catch (err: any) {
                        addToast({
                          type: 'error',
                          title: 'Diagnostic Error',
                          message: err.message
                        });
                      } finally {
                        setIsLoading(false);
                      }
                    }}
                    className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-[11px] rounded-lg transition-colors cursor-pointer"
                  >
                    Run /api/admin Diagnostic Suite
                  </button>
                </div>
              </div>

              {formData._envRep && (
                <div className="p-3.5 bg-slate-950 rounded-xl font-mono text-[11px] space-y-1.5 border border-slate-800">
                  <div className="flex justify-between items-center pb-1 border-b border-slate-800">
                    <span className="text-slate-400">Environment Status:</span>
                    <span className={`px-2 py-0.5 rounded font-bold ${formData._envRep.status === 'OPTIMAL' ? 'bg-emerald-950 text-emerald-400' : 'bg-amber-950 text-amber-400'}`}>
                      {formData._envRep.status} ({formData._envRep.resolutionStrategy})
                    </span>
                  </div>
                  <div className="text-slate-300">Effective Base URL: <span className="text-indigo-400 font-bold">{formData._envRep.effectiveBaseUrl}</span></div>
                  <div className="text-slate-400 text-[10px]">Vercel Host: {formData._envRep.isVercelHost ? 'Yes (.vercel.app)' : 'Local / Custom'} | VITE_API_URL: {formData._envRep.viteApiUrlEnv || '(none)'}</div>
                </div>
              )}

              {formData._adminSuite && (
                <div className="p-3.5 bg-slate-950 rounded-xl font-mono text-[11px] space-y-2 border border-slate-800">
                  <div className="text-slate-300 font-bold flex justify-between">
                    <span>Admin Route Verifications:</span>
                    <span className={formData._adminSuite.allPassed ? 'text-emerald-400' : 'text-rose-400'}>
                      {formData._adminSuite.allPassed ? '✅ All 5 Passed' : '⚠️ Has Failures'}
                    </span>
                  </div>
                  <div className="space-y-1">
                    {formData._adminSuite.routeResults.map((item: any, i: number) => (
                      <div key={i} className="flex justify-between items-center text-slate-300 border-b border-slate-900 pb-1">
                        <span className="truncate max-w-[280px]">{item.endpoint}</span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${item.ok ? 'bg-emerald-950 text-emerald-400' : 'bg-rose-950 text-rose-400'}`}>
                          HTTP {item.status} ({item.timeMs}ms)
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <p className="text-[10px] text-slate-400">
                💡 <code>api-diagnostic.ts</code> wraps Axios requests to log the full request URL, attached headers, request body, server responses, and specific error stack traces for all <code>/api/admin/*</code> calls.
              </p>
            </div>
          </div>
        </div>

        {/* Operational & Tracking */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <h4 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">
            3. Analytics & Maintenance Mode
          </h4>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                Google Analytics / Tag Manager Script
              </label>
              <textarea
                rows={4}
                value={formData.analyticsCode || ''}
                onChange={(e) => setFormData({ ...formData, analyticsCode: e.target.value })}
                className="w-full p-3 bg-slate-900 text-amber-400 font-mono text-[11px] rounded-xl outline-none"
              />
            </div>

            <div className="pt-2">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={Boolean(formData.maintenanceMode)}
                  onChange={(e) => setFormData({ ...formData, maintenanceMode: e.target.checked })}
                  className="w-4 h-4 rounded text-rose-600"
                />
                <div>
                  <span className="font-bold text-slate-900 block">Enable Maintenance Mode</span>
                  <span className="text-[11px] text-slate-500">
                    When enabled, public visitors see a "Under Scheduled Maintenance" screen. Admins can still login at /admin.
                  </span>
                </div>
              </label>
            </div>
          </div>
        </div>
      </form>
    </AdminLayout>
  );
};
