import React, { useState, useEffect } from 'react';
import { Save, Settings, Shield, Globe, Bell, DollarSign, Image as ImageIcon, CheckCircle2 } from 'lucide-react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { Base64Uploader } from '../../components/admin/Base64Uploader';
import { scholarshipApi } from '../../services/api';
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
