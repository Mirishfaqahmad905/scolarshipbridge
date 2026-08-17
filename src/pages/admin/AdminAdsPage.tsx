import React, { useState, useEffect } from 'react';
import { Plus, Search, Trash2, Edit, DollarSign, RefreshCw, X, Eye, EyeOff, Layout, Code, Check } from 'lucide-react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { DeleteConfirmModal } from '../../components/admin/DeleteConfirmModal';
import { Base64Uploader } from '../../components/admin/Base64Uploader';
import { scholarshipApi } from '../../services/api';
import { useApp } from '../../context/AppContext';

export const AdminAdsPage: React.FC = () => {
  const { addToast } = useApp();

  const [ads, setAds] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');

  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState<any>({
    title: '',
    type: 'banner',
    placement: 'header_top',
    code: '',
    imageUrl: '',
    targetUrl: '',
    status: 'active',
    device: 'all',
    priority: 1
  });

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<{ id: string; title: string } | null>(null);

  const loadAds = async () => {
    try {
      setIsLoading(true);
      const list = await scholarshipApi.admin.getAds();
      setAds(list);
    } catch (err) {
      addToast({ type: 'error', title: 'Error', message: 'Failed to load advertisements.' });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadAds();
  }, []);

  const handleOpenAdd = () => {
    setIsEditing(false);
    setEditingId(null);
    setFormData({
      title: '',
      type: 'banner',
      placement: 'header_top',
      code: '',
      imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=728&q=80',
      targetUrl: 'https://scholarshipbride.org/scholarships',
      status: 'active',
      device: 'all',
      priority: 1
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (ad: any) => {
    setIsEditing(true);
    setEditingId(ad.id);
    setFormData(ad);
    setModalOpen(true);
  };

  const handleToggleStatus = async (ad: any) => {
    try {
      const newStatus = ad.status === 'active' ? 'inactive' : 'active';
      await scholarshipApi.admin.saveAd({ ...ad, status: newStatus });
      addToast({
        type: 'info',
        title: 'Status Updated',
        message: `Ad marked as ${newStatus}.`
      });
      loadAds();
    } catch (err) {
      addToast({ type: 'error', title: 'Error', message: 'Failed to toggle ad status.' });
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title?.trim()) return;

    try {
      setIsSaving(true);
      const payload = {
        ...formData,
        id: isEditing ? editingId : `ad-${Date.now()}`,
        isNew: !isEditing
      };

      await scholarshipApi.admin.saveAd(payload);
      addToast({
        type: 'success',
        title: isEditing ? 'Ad Updated' : 'Ad Created',
        message: `Saved ad placement "${formData.title}" in ads.json.`
      });
      setModalOpen(false);
      loadAds();
    } catch (err) {
      addToast({ type: 'error', title: 'Error', message: 'Failed to save ad.' });
    } finally {
      setIsSaving(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!itemToDelete) return;
    try {
      await scholarshipApi.admin.deleteAd(itemToDelete.id);
      addToast({ type: 'success', title: 'Deleted', message: `Removed ad "${itemToDelete.title}".` });
      setDeleteModalOpen(false);
      setItemToDelete(null);
      loadAds();
    } catch (err) {
      addToast({ type: 'error', title: 'Error', message: 'Failed to delete ad.' });
    }
  };

  const filtered = ads.filter((ad) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return ad.title?.toLowerCase().includes(q) || ad.placement?.toLowerCase().includes(q);
  });

  return (
    <AdminLayout
      title="Monetization & Advertisement Placements"
      subtitle="Manage Google AdSense, affiliate banners, and custom HTML ads in ads.json"
      actionButton={{
        label: 'Create Ad Unit',
        onClick: handleOpenAdd,
        icon: <Plus className="w-4 h-4" />
      }}
    >
      <div className="space-y-6">
        <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-xs flex items-center justify-between gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search ad placements..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:bg-white outline-none"
            />
          </div>
          <button
            onClick={loadAds}
            className="p-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-600 rounded-xl transition-colors cursor-pointer"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
        </div>

        {/* Ads Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            <div className="col-span-full py-12 text-center text-slate-400 text-xs">
              Loading ad placements...
            </div>
          ) : filtered.length === 0 ? (
            <div className="col-span-full py-12 text-center text-slate-400 text-xs">
              No advertisement units created yet.
            </div>
          ) : (
            filtered.map((ad) => (
              <div
                key={ad.id}
                className="bg-white rounded-3xl border border-slate-200 shadow-xs p-5 flex flex-col justify-between space-y-4 group hover:shadow-md transition-all"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-indigo-50 text-indigo-700">
                      {ad.type}
                    </span>
                    <button
                      onClick={() => handleToggleStatus(ad)}
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold cursor-pointer transition-colors ${
                        ad.status === 'active' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      {ad.status === 'active' ? 'Active' : 'Inactive'}
                    </button>
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{ad.title}</h4>
                    <p className="text-xs text-slate-400 font-mono mt-0.5">Placement: {ad.placement}</p>
                  </div>

                  {/* Ad Thumbnail Preview */}
                  {ad.type === 'banner' && ad.imageUrl && (
                    <div className="h-24 bg-slate-100 rounded-xl overflow-hidden border border-slate-200">
                      <img src={ad.imageUrl} alt="" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                    </div>
                  )}

                  {ad.type === 'adsense' && (
                    <div className="p-3 bg-amber-50/50 border border-amber-200 rounded-xl font-mono text-[10px] text-amber-900 truncate">
                      {ad.code || 'AdSense Client Slot'}
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-slate-500 font-medium capitalize">
                    Target: {ad.device || 'All Devices'}
                  </span>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleOpenEdit(ad)}
                      className="p-1.5 text-indigo-600 hover:bg-indigo-50 rounded-lg cursor-pointer"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        setItemToDelete({ id: ad.id, title: ad.title });
                        setDeleteModalOpen(true);
                      }}
                      className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Ad Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50">
              <h3 className="text-sm font-bold text-slate-900">
                {isEditing ? `Edit Ad: ${formData.title}` : 'Create Advertisement Placement'}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Ad Unit Title / Label *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title || ''}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Header 728x90 Leaderboard"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Ad Type
                  </label>
                  <select
                    value={formData.type || 'banner'}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none text-slate-800"
                  >
                    <option value="banner">Banner Image + Affiliate Link</option>
                    <option value="adsense">Google AdSense Script</option>
                    <option value="custom_html">Custom HTML / Script</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Website Placement
                  </label>
                  <select
                    value={formData.placement || 'header_top'}
                    onChange={(e) => setFormData({ ...formData, placement: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none text-slate-800"
                  >
                    <option value="header_top">Header Top Banner</option>
                    <option value="below_header">Below Header Ribbon</option>
                    <option value="before_content">Before Scholarship Content</option>
                    <option value="inside_content">Inside Article Content</option>
                    <option value="after_content">After Content / Bottom</option>
                    <option value="sidebar_top">Sidebar Top</option>
                    <option value="sidebar_sticky">Sidebar Sticky</option>
                    <option value="footer_banner">Footer Banner</option>
                  </select>
                </div>
              </div>

              {formData.type === 'banner' ? (
                <div className="space-y-3">
                  <Base64Uploader
                    label="Banner Graphic Image (Base64)"
                    value={formData.imageUrl || ''}
                    onChange={(b64) => setFormData({ ...formData, imageUrl: b64 })}
                  />

                  <div>
                    <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Affiliate / Destination URL
                    </label>
                    <input
                      type="url"
                      value={formData.targetUrl || ''}
                      onChange={(e) => setFormData({ ...formData, targetUrl: e.target.value })}
                      placeholder="https://sponsor.com/apply"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono text-[11px] outline-none"
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                    AdSense / HTML Script Code
                  </label>
                  <textarea
                    rows={4}
                    value={formData.code || ''}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                    placeholder="<script async src='https://pagead2.googlesyndication.com...'></script>"
                    className="w-full p-3 bg-slate-900 text-amber-300 font-mono text-[11px] rounded-xl outline-none"
                  />
                </div>
              )}

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Target Device
                  </label>
                  <select
                    value={formData.device || 'all'}
                    onChange={(e) => setFormData({ ...formData, device: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none text-slate-800"
                  >
                    <option value="all">All Devices (Desktop & Mobile)</option>
                    <option value="desktop">Desktop Only</option>
                    <option value="mobile">Mobile Only</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Initial Status
                  </label>
                  <select
                    value={formData.status || 'active'}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none text-slate-800"
                  >
                    <option value="active">Active (Displaying Live)</option>
                    <option value="inactive">Inactive (Disabled)</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 border border-slate-300 rounded-xl text-slate-700 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-md cursor-pointer disabled:opacity-50"
                >
                  {isSaving ? 'Saving...' : 'Save Ad Unit'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <DeleteConfirmModal
        isOpen={deleteModalOpen}
        itemName={itemToDelete?.title}
        onCancel={() => {
          setDeleteModalOpen(false);
          setItemToDelete(null);
        }}
        onConfirm={handleConfirmDelete}
      />
    </AdminLayout>
  );
};
