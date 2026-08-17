import React, { useState, useEffect } from 'react';
import { Plus, Search, Trash2, Edit, Tags, RefreshCw, X, ArrowUpDown } from 'lucide-react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { DeleteConfirmModal } from '../../components/admin/DeleteConfirmModal';
import { scholarshipApi } from '../../services/api';
import { useApp } from '../../context/AppContext';

export const AdminCategoriesPage: React.FC = () => {
  const { addToast } = useApp();

  const [categories, setCategories] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');

  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState<any>({
    name: '',
    slug: '',
    description: '',
    icon: 'GraduationCap',
    color: 'indigo'
  });

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<{ id: string; name: string } | null>(null);

  const loadCategories = async () => {
    try {
      setIsLoading(true);
      const list = await scholarshipApi.admin.getCategories();
      setCategories(list);
    } catch (err) {
      addToast({ type: 'error', title: 'Error', message: 'Failed to load categories.' });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleOpenAdd = () => {
    setIsEditing(false);
    setEditingId(null);
    setFormData({
      name: '',
      slug: '',
      description: '',
      icon: 'GraduationCap',
      color: 'indigo'
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (cat: any) => {
    setIsEditing(true);
    setEditingId(cat.id);
    setFormData(cat);
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
        id: isEditing ? editingId : `cat-${Date.now()}`,
        isNew: !isEditing
      };

      await scholarshipApi.admin.saveCategory(payload);
      addToast({
        type: 'success',
        title: isEditing ? 'Category Updated' : 'Category Created',
        message: `Saved category "${formData.name}".`
      });
      setModalOpen(false);
      loadCategories();
    } catch (err) {
      addToast({ type: 'error', title: 'Error', message: 'Failed to save category.' });
    } finally {
      setIsSaving(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!itemToDelete) return;
    try {
      await scholarshipApi.admin.deleteCategory(itemToDelete.id);
      addToast({ type: 'success', title: 'Deleted', message: `Removed category "${itemToDelete.name}".` });
      setDeleteModalOpen(false);
      setItemToDelete(null);
      loadCategories();
    } catch (err) {
      addToast({ type: 'error', title: 'Error', message: 'Could not delete category.' });
    }
  };

  const filtered = categories.filter((cat) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return cat.name?.toLowerCase().includes(q) || cat.slug?.toLowerCase().includes(q) || cat.description?.toLowerCase().includes(q);
  });

  return (
    <AdminLayout
      title="Scholarship Categories & Fields"
      subtitle="Organize scholarship opportunities by study fields, degree targets, and criteria"
      actionButton={{
        label: 'Add Category',
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
              placeholder="Search categories by name, slug, or keywords..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:bg-white outline-none"
            />
          </div>
          <button
            onClick={loadCategories}
            className="p-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-600 rounded-xl transition-colors cursor-pointer"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
        </div>

        {/* Categories Table */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                <th className="py-3.5 px-6">Category Name</th>
                <th className="py-3.5 px-4">Slug</th>
                <th className="py-3.5 px-4">Description</th>
                <th className="py-3.5 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {isLoading ? (
                <tr>
                  <td colSpan={4} className="py-8 text-center text-slate-400">
                    Loading categories from categories.json...
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-8 text-center text-slate-400">
                    No categories found.
                  </td>
                </tr>
              ) : (
                filtered.map((cat) => (
                  <tr key={cat.id || cat.slug} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3.5 px-6 font-bold text-slate-900 flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                        <Tags className="w-4 h-4" />
                      </div>
                      <span>{cat.name}</span>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-[11px] text-slate-500">
                      {cat.slug}
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 max-w-sm truncate">
                      {cat.description || 'General international grants category'}
                    </td>
                    <td className="py-3.5 px-6 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => handleOpenEdit(cat)}
                          className="p-1.5 text-indigo-600 hover:text-indigo-800 rounded-lg hover:bg-indigo-50 cursor-pointer"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            setItemToDelete({ id: cat.id, name: cat.name });
                            setDeleteModalOpen(true);
                          }}
                          className="p-1.5 text-rose-600 hover:text-rose-800 rounded-lg hover:bg-rose-50 cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Category Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50">
              <h3 className="text-sm font-bold text-slate-900">
                {isEditing ? `Edit: ${formData.name}` : 'Add Category'}
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
                  Category Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name || ''}
                  onChange={(e) => handleNameChange(e.target.value)}
                  placeholder="e.g. Computer Science & AI"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Category Slug
                </label>
                <input
                  type="text"
                  value={formData.slug || ''}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono text-slate-700 outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={formData.description || ''}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Description of scholarships classified under this group..."
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 outline-none"
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
                  {isSaving ? 'Saving...' : 'Save Category'}
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
