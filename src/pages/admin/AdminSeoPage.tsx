import React, { useState, useEffect } from 'react';
import { Save, Search, Globe, Share2, CheckCircle2, Shield, Code, ExternalLink } from 'lucide-react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { Base64Uploader } from '../../components/admin/Base64Uploader';
import { scholarshipApi } from '../../services/api';
import { useApp } from '../../context/AppContext';

export const AdminSeoPage: React.FC = () => {
  const { addToast } = useApp();
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [formData, setFormData] = useState<any>({
    metaTitle: 'ScholarshipBride | Fully Funded International Scholarships & Fellowships 2026',
    metaDescription: 'Find and apply for 100% fully funded undergraduate, masters, and PhD scholarships worldwide. Official links, application guides, and IELTS waiver tips.',
    keywords: 'scholarships 2026, fully funded scholarships, masters scholarships UK, PhD fellowships Europe, DAAD scholarship Germany, Chevening scholarship',
    author: 'ScholarshipBride International',
    ogImage: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80',
    twitterHandle: '@scholarshipbride',
    googleSiteVerification: 'google-site-verification=abcdef1234567890',
    bingSiteVerification: 'bing-site-verification=xyz987654321',
    robotsTxt: 'User-agent: *\nAllow: /\nDisallow: /admin/\nDisallow: /api/admin/\n\nSitemap: https://scholarshipbride.org/sitemap.xml',
    canonicalBaseUrl: 'https://scholarshipbride.org',
    structuredDataSchema: true
  });

  const loadData = async () => {
    try {
      setIsLoading(true);
      const data = await scholarshipApi.admin.getSeoSettings();
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
    loadData();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSaving(true);
      await scholarshipApi.admin.updateSeoSettings(formData);
      addToast({
        type: 'success',
        title: 'SEO Settings Saved',
        message: 'Updated global search engine metadata in seo.json.'
      });
    } catch (err) {
      addToast({ type: 'error', title: 'Error', message: 'Failed to update SEO settings.' });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <AdminLayout
      title="Global SEO & Search Indexing"
      subtitle="Configure meta tags, OpenGraph social sharing, search console verification, and robots.txt in seo.json"
    >
      <form onSubmit={handleSave} className="space-y-6 max-w-5xl">
        <div className="flex items-center justify-between p-4 bg-white rounded-3xl border border-slate-200 shadow-xs">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800">
              Sitemap Active (/sitemap.xml)
            </span>
          </div>

          <button
            type="submit"
            disabled={isSaving}
            className="inline-flex items-center gap-2 px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-md cursor-pointer disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{isSaving ? 'Saving...' : 'Save SEO Configuration'}</span>
          </button>
        </div>

        {/* Global Meta Tags */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <h4 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">
            1. Global Default Meta Tags
          </h4>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                Default Meta Title Tag
              </label>
              <input
                type="text"
                value={formData.metaTitle || ''}
                onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none font-bold text-slate-900"
              />
              <span className="text-[10px] text-slate-400">Current length: {formData.metaTitle?.length || 0} characters (Optimal: 50-60)</span>
            </div>

            <div>
              <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                Default Meta Description
              </label>
              <textarea
                rows={3}
                value={formData.metaDescription || ''}
                onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none text-slate-800"
              />
              <span className="text-[10px] text-slate-400">Current length: {formData.metaDescription?.length || 0} characters (Optimal: 140-160)</span>
            </div>

            <div>
              <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                Global Keywords (Comma-separated)
              </label>
              <input
                type="text"
                value={formData.keywords || ''}
                onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none text-slate-800"
              />
            </div>
          </div>
        </div>

        {/* Social Share & OpenGraph */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <h4 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">
            2. OpenGraph & Social Media Cards
          </h4>

          <div className="space-y-4 text-xs">
            <Base64Uploader
              label="Default OpenGraph Sharing Image (1200x630)"
              value={formData.ogImage || ''}
              onChange={(b64) => setFormData({ ...formData, ogImage: b64 })}
              helperText="This image appears when links from the website are shared across Twitter/X, WhatsApp, LinkedIn, or Facebook."
            />

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Twitter / X Publisher Handle
                </label>
                <input
                  type="text"
                  value={formData.twitterHandle || ''}
                  onChange={(e) => setFormData({ ...formData, twitterHandle: e.target.value })}
                  placeholder="@scholarshipbride"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Canonical Base URL
                </label>
                <input
                  type="url"
                  value={formData.canonicalBaseUrl || ''}
                  onChange={(e) => setFormData({ ...formData, canonicalBaseUrl: e.target.value })}
                  placeholder="https://scholarshipbride.org"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono text-[11px] outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Webmaster Verification & Robots.txt */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <h4 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">
            3. Webmaster Console & Search Bot Directives
          </h4>

          <div className="space-y-3 text-xs">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Google Search Console Verification
                </label>
                <input
                  type="text"
                  value={formData.googleSiteVerification || ''}
                  onChange={(e) => setFormData({ ...formData, googleSiteVerification: e.target.value })}
                  placeholder="google-site-verification=..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono text-[11px] outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Bing Webmaster Tools Verification
                </label>
                <input
                  type="text"
                  value={formData.bingSiteVerification || ''}
                  onChange={(e) => setFormData({ ...formData, bingSiteVerification: e.target.value })}
                  placeholder="bing-site-verification=..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono text-[11px] outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                Robots.txt Directives
              </label>
              <textarea
                rows={5}
                value={formData.robotsTxt || ''}
                onChange={(e) => setFormData({ ...formData, robotsTxt: e.target.value })}
                className="w-full p-3 bg-slate-900 text-emerald-400 font-mono text-[11px] rounded-xl outline-none"
              />
            </div>
          </div>
        </div>
      </form>
    </AdminLayout>
  );
};
