import React, { useState, useEffect } from 'react';
import { Plus, Search, Trash2, Edit, ExternalLink, Globe, RefreshCw, X, MapPin } from 'lucide-react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { DeleteConfirmModal } from '../../components/admin/DeleteConfirmModal';
import { Base64Uploader } from '../../components/admin/Base64Uploader';
import { scholarshipApi } from '../../services/api';
import { useApp } from '../../context/AppContext';

export const AdminCountriesPage: React.FC = () => {
  const { addToast } = useApp();

  const [countries, setCountries] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');

  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState<any>({
    name: '',
    code: '',
    region: 'Europe',
    flag: '🇬🇧',
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=800&q=80',
    livingCost: '$1,200 - $1,800 / month',
    postStudyVisa: '2-Year Graduate Work Visa',
    scholarshipCount: 20,
    guideSlug: 'uk-study-guide',
    description: ''
  });

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<{ id: string; name: string } | null>(null);

  const loadData = async () => {
    try {
      setIsLoading(true);
      const list = await scholarshipApi.admin.getCountries();
      setCountries(list);
    } catch (err) {
      addToast({ type: 'error', title: 'Error', message: 'Could not load countries.' });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleOpenAdd = () => {
    setIsEditing(false);
    setEditingId(null);
    setFormData({
      name: '',
      code: '',
      region: 'Europe',
      flag: '🌐',
      image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=800&q=80',
      livingCost: '$1,000 - $1,500 / month',
      postStudyVisa: 'Post-study work permit available',
      scholarshipCount: 15,
      guideSlug: '',
      description: ''
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (country: any) => {
    setIsEditing(true);
    setEditingId(country.id);
    setFormData(country);
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name?.trim()) return;

    try {
      setIsSaving(true);
      const payload = {
        ...formData,
        id: isEditing ? editingId : `country-${Date.now()}`,
        isNew: !isEditing
      };

      await scholarshipApi.admin.saveCountry(payload);
      addToast({
        type: 'success',
        title: isEditing ? 'Country Updated' : 'Country Created',
        message: `Saved ${formData.name} to countries.json.`
      });
      setModalOpen(false);
      loadData();
    } catch (err: any) {
      addToast({ type: 'error', title: 'Error', message: 'Failed to save country.' });
    } finally {
      setIsSaving(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!itemToDelete) return;
    try {
      await scholarshipApi.admin.deleteCountry(itemToDelete.id);
      addToast({ type: 'success', title: 'Deleted', message: `Removed ${itemToDelete.name}.` });
      setDeleteModalOpen(false);
      setItemToDelete(null);
      loadData();
    } catch (err) {
      addToast({ type: 'error', title: 'Error', message: 'Could not delete country.' });
    }
  };

  const filtered = countries.filter((c) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return c.name?.toLowerCase().includes(q) || c.region?.toLowerCase().includes(q) || c.code?.toLowerCase().includes(q);
  });

  return (
    <AdminLayout
      title="Study Destinations & Host Countries"
      subtitle="Manage destination hubs, living cost benchmarks, and visa guides in countries.json"
      actionButton={{
        label: 'Add Destination',
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
              placeholder="Search study destinations by country name or region..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:bg-white outline-none"
            />
          </div>
          <button
            onClick={loadData}
            className="p-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-600 rounded-xl transition-colors cursor-pointer"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
        </div>

        {/* Countries Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {isLoading ? (
            <div className="col-span-full py-12 text-center text-slate-400">
              Loading destinations...
            </div>
          ) : filtered.length === 0 ? (
            <div className="col-span-full py-12 text-center text-slate-400">
              No study destinations found.
            </div>
          ) : (
            filtered.map((c) => (
              <div key={c.id || c.code} className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden flex flex-col justify-between group hover:shadow-md transition-all">
                <div className="relative h-32 bg-slate-100 overflow-hidden">
                  <img
                    src={c.image || 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=800&q=80'}
                    alt={c.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
                    <div className="flex items-center gap-1.5">
                      <span className="text-base">{c.flag}</span>
                      <span className="text-xs font-bold">{c.name}</span>
                    </div>
                    <span className="text-[10px] font-mono font-bold bg-white/20 px-1.5 py-0.5 rounded">
                      {c.region}
                    </span>
                  </div>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div className="space-y-1 text-xs text-slate-600">
                    <p className="font-semibold text-slate-900">{c.livingCost || 'Living Cost: Standard'}</p>
                    <p className="text-[11px] text-slate-500 line-clamp-1">{c.postStudyVisa}</p>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="font-bold text-indigo-600">
                      {c.scholarshipCount || 10} Grants
                    </span>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleOpenEdit(c)}
                        className="p-1.5 text-indigo-600 hover:text-indigo-800 rounded-lg hover:bg-indigo-50 cursor-pointer"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          setItemToDelete({ id: c.id, name: c.name });
                          setDeleteModalOpen(true);
                        }}
                        className="p-1.5 text-rose-600 hover:text-rose-800 rounded-lg hover:bg-rose-50 cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Country Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50">
              <h3 className="text-sm font-bold text-slate-900">
                {isEditing ? `Edit: ${formData.name}` : 'Add Destination Country'}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Country Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name || ''}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Germany"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-semibold outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Region
                  </label>
                  <select
                    value={formData.region || 'Europe'}
                    onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 outline-none"
                  >
                    <option value="Europe">Europe</option>
                    <option value="North America">North America</option>
                    <option value="Asia">Asia</option>
                    <option value="Oceania / Australia">Oceania / Australia</option>
                    <option value="Middle East">Middle East</option>
                    <option value="Latin America">Latin America</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Avg. Living Cost
                  </label>
                  <input
                    type="text"
                    value={formData.livingCost || ''}
                    onChange={(e) => setFormData({ ...formData, livingCost: e.target.value })}
                    placeholder="e.g. €934 / month"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Post-Study Work Visa
                  </label>
                  <input
                    type="text"
                    value={formData.postStudyVisa || ''}
                    onChange={(e) => setFormData({ ...formData, postStudyVisa: e.target.value })}
                    placeholder="e.g. 18-Month Job Search Visa"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 outline-none"
                  />
                </div>
              </div>

              <div>
                <Base64Uploader
                  label="Country Image / Banner (Base64)"
                  value={formData.image || ''}
                  onChange={(b64) => setFormData({ ...formData, image: b64 })}
                />
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
                  {isSaving ? 'Saving...' : 'Save Country'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <DeleteConfirmModal
        isOpen={deleteModalOpen}
        itemName={itemToDelete?.name}
        onCancel={() => {
          setDeleteModalOpen(false);
          setItemToDelete(null);
        }}
        onConfirm={handleConfirmDelete}
      />
    </AdminLayout>
  );
};
