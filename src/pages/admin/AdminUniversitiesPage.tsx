import React, { useState, useEffect } from 'react';
import { Plus, Search, Trash2, Edit, ExternalLink, School, RefreshCw, X, Globe, MapPin, Award } from 'lucide-react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { DeleteConfirmModal } from '../../components/admin/DeleteConfirmModal';
import { Base64Uploader } from '../../components/admin/Base64Uploader';
import { scholarshipApi } from '../../services/api';
import { useApp } from '../../context/AppContext';

export const AdminUniversitiesPage: React.FC = () => {
  const { addToast } = useApp();

  const [universities, setUniversities] = useState<any[]>([]);
  const [countriesList, setCountriesList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');

  // Modal State for Add / Edit
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState<any>({
    name: '',
    slug: '',
    country: 'United Kingdom',
    city: '',
    ranking: '',
    acceptanceRate: '',
    website: 'https://',
    image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80',
    description: '',
    scholarshipCount: 10
  });

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<{ id: string; name: string } | null>(null);

  const loadData = async () => {
    try {
      setIsLoading(true);
      const [unis, countries] = await Promise.all([
        scholarshipApi.admin.getUniversities(),
        scholarshipApi.admin.getCountries()
      ]);
      setUniversities(unis);
      setCountriesList(countries);
    } catch (err) {
      addToast({ type: 'error', title: 'Error', message: 'Could not load universities.' });
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
      slug: '',
      country: countriesList[0]?.name || 'United Kingdom',
      city: '',
      ranking: '#1 Worldwide',
      acceptanceRate: '15%',
      website: 'https://',
      image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80',
      description: '',
      scholarshipCount: 5
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (uni: any) => {
    setIsEditing(true);
    setEditingId(uni.id);
    setFormData(uni);
    setModalOpen(true);
  };

  const handleNameChange = (val: string) => {
    setFormData({
      ...formData,
      name: val,
      slug: val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name?.trim()) return;

    try {
      setIsSaving(true);
      const payload = {
        ...formData,
        id: isEditing ? editingId : `uni-${Date.now()}`,
        isNew: !isEditing
      };

      await scholarshipApi.admin.saveUniversity(payload);
      addToast({
        type: 'success',
        title: isEditing ? 'University Updated' : 'University Created',
        message: `Saved ${formData.name} to universities.json.`
      });
      setModalOpen(false);
      loadData();
    } catch (err: any) {
      addToast({ type: 'error', title: 'Error', message: 'Failed to save university.' });
    } finally {
      setIsSaving(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!itemToDelete) return;
    try {
      await scholarshipApi.admin.deleteUniversity(itemToDelete.id);
      addToast({ type: 'success', title: 'Deleted', message: `Removed ${itemToDelete.name}.` });
      setDeleteModalOpen(false);
      setItemToDelete(null);
      loadData();
    } catch (err) {
      addToast({ type: 'error', title: 'Error', message: 'Could not delete university.' });
    }
  };

  const filtered = universities.filter((u) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return u.name?.toLowerCase().includes(q) || u.country?.toLowerCase().includes(q) || u.city?.toLowerCase().includes(q);
  });

  return (
    <AdminLayout
      title="Universities & Academic Institutions"
      subtitle="Manage global universities, rankings, and sponsored grants in universities.json"
      actionButton={{
        label: 'Add University',
        onClick: handleOpenAdd,
        icon: <Plus className="w-4 h-4" />
      }}
    >
      <div className="space-y-6">
        {/* Search Bar */}
        <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-xs flex items-center justify-between gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search universities by name, country, or city..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:bg-white focus:border-indigo-500 outline-none"
            />
          </div>
          <button
            onClick={loadData}
            className="p-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-600 rounded-xl transition-colors cursor-pointer"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
        </div>

        {/* University Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            <div className="col-span-full py-12 text-center text-slate-400">
              <div className="inline-block w-6 h-6 border-2 border-indigo-600/30 border-t-indigo-600 rounded-full animate-spin mb-2" />
              <p className="text-xs">Loading universities...</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="col-span-full py-12 text-center text-slate-400">
              No universities found matching your search.
            </div>
          ) : (
            filtered.map((uni) => (
              <div key={uni.id} className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden flex flex-col justify-between group hover:shadow-md transition-all">
                <div className="relative h-36 bg-slate-100 overflow-hidden">
                  <img
                    src={uni.image || 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80'}
                    alt={uni.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
                    <span className="px-2 py-0.5 rounded-md bg-white/20 backdrop-blur-xs text-[10px] font-bold">
                      {uni.country}
                    </span>
                    {uni.ranking && (
                      <span className="px-2 py-0.5 rounded-md bg-amber-400 text-slate-950 text-[10px] font-black">
                        {uni.ranking}
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                      {uni.name}
                    </h4>
                    <p className="text-xs text-slate-500 line-clamp-2 mt-1">
                      {uni.description || 'Global leading academic institution partnering with international scholarship programs.'}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-600">
                      {uni.scholarshipCount || 5} Scholarships
                    </span>

                    <div className="flex items-center gap-1">
                      {uni.website && (
                        <a
                          href={uni.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                      <button
                        onClick={() => handleOpenEdit(uni)}
                        className="p-1.5 text-indigo-600 hover:text-indigo-800 rounded-lg hover:bg-indigo-50 cursor-pointer"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          setItemToDelete({ id: uni.id, name: uni.name });
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

      {/* University Add / Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50">
              <h3 className="text-sm font-bold text-slate-900">
                {isEditing ? `Edit University: ${formData.name}` : 'Add University'}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4 overflow-y-auto flex-1 text-xs">
              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                  University Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name || ''}
                  onChange={(e) => handleNameChange(e.target.value)}
                  placeholder="e.g. University of Cambridge"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-900 focus:bg-white outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Country *
                  </label>
                  <select
                    value={formData.country || ''}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 outline-none"
                  >
                    {countriesList.map((c) => (
                      <option key={c.id || c.name} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                    World Ranking
                  </label>
                  <input
                    type="text"
                    value={formData.ranking || ''}
                    onChange={(e) => setFormData({ ...formData, ranking: e.target.value })}
                    placeholder="e.g. #2 QS World Rank"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Official Website URL
                  </label>
                  <input
                    type="url"
                    value={formData.website || ''}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    placeholder="https://cam.ac.uk"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono text-slate-800 outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Acceptance Rate
                  </label>
                  <input
                    type="text"
                    value={formData.acceptanceRate || ''}
                    onChange={(e) => setFormData({ ...formData, acceptanceRate: e.target.value })}
                    placeholder="e.g. 18%"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 outline-none"
                  />
                </div>
              </div>

              <div>
                <Base64Uploader
                  label="Campus Photo / Logo (Base64)"
                  value={formData.image || ''}
                  onChange={(b64) => setFormData({ ...formData, image: b64 })}
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                  University Description
                </label>
                <textarea
                  rows={3}
                  value={formData.description || ''}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Overview of the university, academic faculties, and scholarship grants..."
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 border border-slate-300 rounded-xl text-slate-700 hover:bg-slate-50 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-md cursor-pointer disabled:opacity-50"
                >
                  {isSaving ? 'Saving...' : 'Save University'}
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
