import React, { useState, useEffect } from 'react';
import { Save, Plus, Trash2, Menu, ArrowUp, ArrowDown, ExternalLink, Link2 } from 'lucide-react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { scholarshipApi } from '../../services/api';
import { useApp } from '../../context/AppContext';

export const AdminNavigationPage: React.FC = () => {
  const { addToast } = useApp();
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [headerNav, setHeaderNav] = useState<any[]>([]);
  const [footerNav, setFooterNav] = useState<any[]>([]);

  const defaultHeader = [
    { label: 'Scholarships', url: '/scholarships', openInNewTab: false },
    { label: 'Destinations', url: '/countries', openInNewTab: false },
    { label: 'Universities', url: '/universities', openInNewTab: false },
    { label: 'Categories', url: '/categories', openInNewTab: false },
    { label: 'Guides & News', url: '/news', openInNewTab: false },
    { label: 'About Us', url: '/about', openInNewTab: false },
    { label: 'Contact', url: '/contact', openInNewTab: false }
  ];

  const defaultFooter = [
    { label: 'Explore Scholarships', url: '/scholarships' },
    { label: 'Study Destinations', url: '/countries' },
    { label: 'Application Guides', url: '/news' },
    { label: 'Privacy Policy', url: '/privacy' },
    { label: 'Terms of Service', url: '/terms' },
    { label: 'Disclaimer', url: '/disclaimer' }
  ];

  const loadData = async () => {
    try {
      setIsLoading(true);
      const data = await scholarshipApi.admin.getNavigation();
      if (data) {
        setHeaderNav(data.header || defaultHeader);
        setFooterNav(data.footer || defaultFooter);
      } else {
        setHeaderNav(defaultHeader);
        setFooterNav(defaultFooter);
      }
    } catch (err) {
      setHeaderNav(defaultHeader);
      setFooterNav(defaultFooter);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleAddHeaderItem = () => {
    setHeaderNav([...headerNav, { label: 'New Link', url: '/', openInNewTab: false }]);
  };

  const handleAddFooterItem = () => {
    setFooterNav([...footerNav, { label: 'New Footer Link', url: '/' }]);
  };

  const handleMoveHeader = (index: number, direction: 'up' | 'down') => {
    const updated = [...headerNav];
    const target = direction === 'up' ? index - 1 : index + 1;
    if (target < 0 || target >= updated.length) return;
    const temp = updated[index];
    updated[index] = updated[target];
    updated[target] = temp;
    setHeaderNav(updated);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSaving(true);
      await scholarshipApi.admin.updateNavigation({
        header: headerNav,
        footer: footerNav
      });
      addToast({
        type: 'success',
        title: 'Navigation Saved',
        message: 'Saved menu structures to navigation.json.'
      });
    } catch (err) {
      addToast({ type: 'error', title: 'Error', message: 'Failed to update navigation.' });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <AdminLayout
      title="Header & Footer Menu Navigation"
      subtitle="Configure site navigation bars, header links, and footer directories in navigation.json"
    >
      <form onSubmit={handleSave} className="space-y-6 max-w-5xl">
        <div className="flex items-center justify-between p-4 bg-white rounded-3xl border border-slate-200 shadow-xs">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Website Menu Builder</h3>
            <p className="text-xs text-slate-500">Live navigation renders across all public pages</p>
          </div>

          <button
            type="submit"
            disabled={isSaving}
            className="inline-flex items-center gap-2 px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-md cursor-pointer disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{isSaving ? 'Saving...' : 'Save Navigation'}</span>
          </button>
        </div>

        {/* Header Navigation Section */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h4 className="text-sm font-bold text-slate-900">Header Main Navbar</h4>
              <p className="text-xs text-slate-500">Links displayed on desktop and mobile drawer menus</p>
            </div>

            <button
              type="button"
              onClick={handleAddHeaderItem}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs rounded-xl cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Menu Item</span>
            </button>
          </div>

          <div className="space-y-3">
            {headerNav.map((item, idx) => (
              <div
                key={idx}
                className="p-3 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs"
              >
                <div className="flex items-center gap-2">
                  <div className="flex flex-col gap-0.5">
                    <button
                      type="button"
                      onClick={() => handleMoveHeader(idx, 'up')}
                      disabled={idx === 0}
                      className="p-1 hover:bg-slate-200 rounded text-slate-400 hover:text-slate-700 disabled:opacity-20 cursor-pointer"
                    >
                      <ArrowUp className="w-3 h-3" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleMoveHeader(idx, 'down')}
                      disabled={idx === headerNav.length - 1}
                      className="p-1 hover:bg-slate-200 rounded text-slate-400 hover:text-slate-700 disabled:opacity-20 cursor-pointer"
                    >
                      <ArrowDown className="w-3 h-3" />
                    </button>
                  </div>
                  <span className="w-6 h-6 rounded-lg bg-white border border-slate-200 text-slate-700 font-bold text-[10px] flex items-center justify-center">
                    {idx + 1}
                  </span>
                </div>

                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={item.label || ''}
                    onChange={(e) => {
                      const updated = [...headerNav];
                      updated[idx].label = e.target.value;
                      setHeaderNav(updated);
                    }}
                    placeholder="Link Label"
                    className="px-3 py-1.5 bg-white border border-slate-200 rounded-xl font-bold text-slate-900 outline-none"
                  />
                  <input
                    type="text"
                    value={item.url || ''}
                    onChange={(e) => {
                      const updated = [...headerNav];
                      updated[idx].url = e.target.value;
                      setHeaderNav(updated);
                    }}
                    placeholder="URL Route (/scholarships)"
                    className="px-3 py-1.5 bg-white border border-slate-200 rounded-xl font-mono text-slate-700 outline-none"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <label className="flex items-center gap-1.5 cursor-pointer text-slate-600">
                    <input
                      type="checkbox"
                      checked={Boolean(item.openInNewTab)}
                      onChange={(e) => {
                        const updated = [...headerNav];
                        updated[idx].openInNewTab = e.target.checked;
                        setHeaderNav(updated);
                      }}
                      className="w-3.5 h-3.5 rounded text-indigo-600"
                    />
                    <span className="text-[11px]">New Tab</span>
                  </label>

                  <button
                    type="button"
                    onClick={() => setHeaderNav(headerNav.filter((_, i) => i !== idx))}
                    className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Navigation Section */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h4 className="text-sm font-bold text-slate-900">Footer Directory Links</h4>
              <p className="text-xs text-slate-500">Legal, sitemap, and category links in footer</p>
            </div>

            <button
              type="button"
              onClick={handleAddFooterItem}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs rounded-xl cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Footer Link</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {footerNav.map((item, idx) => (
              <div
                key={idx}
                className="p-3 bg-slate-50 border border-slate-200 rounded-2xl flex items-center gap-2 text-xs"
              >
                <input
                  type="text"
                  value={item.label || ''}
                  onChange={(e) => {
                    const updated = [...footerNav];
                    updated[idx].label = e.target.value;
                    setFooterNav(updated);
                  }}
                  className="flex-1 px-2.5 py-1.5 bg-white border border-slate-200 rounded-xl font-bold text-slate-900 outline-none"
                />
                <input
                  type="text"
                  value={item.url || ''}
                  onChange={(e) => {
                    const updated = [...footerNav];
                    updated[idx].url = e.target.value;
                    setFooterNav(updated);
                  }}
                  className="flex-1 px-2.5 py-1.5 bg-white border border-slate-200 rounded-xl font-mono text-slate-700 outline-none"
                />
                <button
                  type="button"
                  onClick={() => setFooterNav(footerNav.filter((_, i) => i !== idx))}
                  className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </form>
    </AdminLayout>
  );
};
