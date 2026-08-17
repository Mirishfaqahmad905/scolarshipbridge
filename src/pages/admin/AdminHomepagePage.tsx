import React, { useState, useEffect } from 'react';
import { 
  Save, 
  ArrowUp, 
  ArrowDown, 
  Eye, 
  EyeOff, 
  Layout, 
  Layers, 
  Sliders, 
  Sparkles,
  ExternalLink,
  Plus,
  Trash2
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { Base64Uploader } from '../../components/admin/Base64Uploader';
import { scholarshipApi } from '../../services/api';
import { useApp } from '../../context/AppContext';

export const AdminHomepagePage: React.FC = () => {
  const { addToast } = useApp();
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [heroSettings, setHeroSettings] = useState<any>({
    badge: '🎓 2026/2027 Academic Admissions Open',
    title: 'Unlock Verified Global Scholarships & Study Abroad Grants',
    subtitle: 'Search through thousands of 100% fully funded undergraduate, masters, and PhD scholarships in the UK, USA, Germany, Canada, and Australia.',
    primaryButtonText: 'Explore Fully Funded Grants',
    primaryButtonLink: '/scholarships',
    secondaryButtonText: 'Study Destinations',
    secondaryButtonLink: '/countries',
    backgroundImage: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1600&q=80'
  });

  const [sections, setSections] = useState<any[]>([
    { id: 'featured_scholarships', title: 'Featured Scholarships', subtitle: 'Prestigious global awards with upcoming deadlines', enabled: true, count: 6 },
    { id: 'destinations', title: 'Top Study Destinations', subtitle: 'Explore university funding by host nation', enabled: true, count: 8 },
    { id: 'categories', title: 'Explore by Field & Category', subtitle: 'Find opportunities tailored to your discipline', enabled: true, count: 8 },
    { id: 'latest_scholarships', title: 'Recently Added Scholarships', subtitle: 'Newly published grants and fellowships', enabled: true, count: 8 },
    { id: 'top_universities', title: 'World-Class Universities', subtitle: 'Institutions partnering with scholarship foundations', enabled: true, count: 6 },
    { id: 'guides_blog', title: 'Admissions Guides & Visa Tips', subtitle: 'Expert guides on motivational letters and IELTS waivers', enabled: true, count: 4 },
    { id: 'newsletter', title: 'Never Miss a Deadline', subtitle: 'Join 45,000+ ambitious scholars receiving weekly deadline digests', enabled: true, count: 1 }
  ]);

  const loadData = async () => {
    try {
      setIsLoading(true);
      const data = await scholarshipApi.admin.getHomepageSettings();
      if (data) {
        if (data.hero) setHeroSettings(data.hero);
        if (data.sections) setSections(data.sections);
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

  const handleMoveSection = (index: number, direction: 'up' | 'down') => {
    const updated = [...sections];
    const target = direction === 'up' ? index - 1 : index + 1;
    if (target < 0 || target >= updated.length) return;
    const temp = updated[index];
    updated[index] = updated[target];
    updated[target] = temp;
    setSections(updated);
  };

  const handleToggleSection = (index: number) => {
    const updated = [...sections];
    updated[index].enabled = !updated[index].enabled;
    setSections(updated);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSaving(true);
      await scholarshipApi.admin.updateHomepageSettings({
        hero: heroSettings,
        sections
      });
      addToast({
        type: 'success',
        title: 'Homepage Saved',
        message: 'Saved hero banner and layout order in homepage.json.'
      });
    } catch (err) {
      addToast({ type: 'error', title: 'Error', message: 'Failed to update homepage settings.' });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <AdminLayout
      title="Homepage CMS & Layout Builder"
      subtitle="Customize homepage hero banner, section order, headlines, and visibility in homepage.json"
    >
      <form onSubmit={handleSave} className="space-y-6 max-w-5xl">
        <div className="flex items-center justify-between p-4 bg-white rounded-3xl border border-slate-200 shadow-xs">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-700">Dynamic Section Ordering</span>
            <Link
              to="/"
              target="_blank"
              className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 hover:underline"
            >
              <span>View Live Homepage</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>

          <button
            type="submit"
            disabled={isSaving}
            className="inline-flex items-center gap-2 px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-md cursor-pointer disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{isSaving ? 'Saving...' : 'Save Homepage Layout'}</span>
          </button>
        </div>

        {/* Hero Section Settings */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <h4 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">
            1. Hero Header & Banner Configuration
          </h4>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                Top Announcement Pill Badge
              </label>
              <input
                type="text"
                value={heroSettings.badge || ''}
                onChange={(e) => setHeroSettings({ ...heroSettings, badge: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none font-semibold text-slate-900"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                Hero Main Headline
              </label>
              <input
                type="text"
                value={heroSettings.title || ''}
                onChange={(e) => setHeroSettings({ ...heroSettings, title: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none font-bold text-slate-900 text-sm"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                Hero Subtitle Description
              </label>
              <textarea
                rows={2}
                value={heroSettings.subtitle || ''}
                onChange={(e) => setHeroSettings({ ...heroSettings, subtitle: e.target.value })}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none text-slate-800"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Primary Button Text
                </label>
                <input
                  type="text"
                  value={heroSettings.primaryButtonText || ''}
                  onChange={(e) => setHeroSettings({ ...heroSettings, primaryButtonText: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Primary Button Link
                </label>
                <input
                  type="text"
                  value={heroSettings.primaryButtonLink || ''}
                  onChange={(e) => setHeroSettings({ ...heroSettings, primaryButtonLink: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none font-mono text-[11px]"
                />
              </div>
            </div>

            <Base64Uploader
              label="Hero Background Banner (Base64)"
              value={heroSettings.backgroundImage || ''}
              onChange={(b64) => setHeroSettings({ ...heroSettings, backgroundImage: b64 })}
            />
          </div>
        </div>

        {/* Homepage Sections Manager */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <h4 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">
            2. Content Sections & Ordering
          </h4>

          <div className="space-y-3">
            {sections.map((sec, idx) => (
              <div
                key={sec.id}
                className={`p-4 rounded-2xl border transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs ${
                  sec.enabled ? 'bg-white border-slate-200 shadow-xs' : 'bg-slate-50 border-slate-200 opacity-60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="flex flex-col gap-0.5">
                    <button
                      type="button"
                      onClick={() => handleMoveSection(idx, 'up')}
                      disabled={idx === 0}
                      className="p-1 hover:bg-slate-100 rounded text-slate-400 hover:text-slate-700 disabled:opacity-20 cursor-pointer"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleMoveSection(idx, 'down')}
                      disabled={idx === sections.length - 1}
                      className="p-1 hover:bg-slate-100 rounded text-slate-400 hover:text-slate-700 disabled:opacity-20 cursor-pointer"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <span className="w-6 h-6 rounded-lg bg-slate-100 text-slate-600 font-bold text-[11px] flex items-center justify-center">
                    {idx + 1}
                  </span>

                  <div className="space-y-0.5 min-w-[180px]">
                    <p className="font-bold text-slate-900">{sec.title}</p>
                    <p className="text-[11px] text-slate-400 truncate max-w-xs">{sec.subtitle}</p>
                  </div>
                </div>

                <div className="flex-1 grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">
                      Section Heading
                    </label>
                    <input
                      type="text"
                      value={sec.title || ''}
                      onChange={(e) => {
                        const updated = [...sections];
                        updated[idx].title = e.target.value;
                        setSections(updated);
                      }}
                      className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-xl outline-none font-semibold text-slate-800"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">
                      Items Display Limit
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={24}
                      value={sec.count || 6}
                      onChange={(e) => {
                        const updated = [...sections];
                        updated[idx].count = parseInt(e.target.value) || 6;
                        setSections(updated);
                      }}
                      className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-xl outline-none font-medium text-slate-800"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleToggleSection(idx)}
                    className={`px-3 py-1.5 rounded-xl font-bold transition-colors cursor-pointer flex items-center gap-1.5 ${
                      sec.enabled
                        ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                        : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
                    }`}
                  >
                    {sec.enabled ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                    <span>{sec.enabled ? 'Visible' : 'Hidden'}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </form>
    </AdminLayout>
  );
};
