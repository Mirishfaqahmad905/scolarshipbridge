import React, { useState, useEffect } from 'react';
import { Plus, Search, Trash2, Edit, FileCode, RefreshCw, X, Eye, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { DeleteConfirmModal } from '../../components/admin/DeleteConfirmModal';
import { RichTextEditor } from '../../components/admin/RichTextEditor';
import { scholarshipApi } from '../../services/api';
import { useApp } from '../../context/AppContext';

export const AdminPagesPage: React.FC = () => {
  const { addToast } = useApp();

  const [pages, setPages] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');

  // Modal / Editor State
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState<any>({
    title: '',
    slug: '',
    content: '',
    metaTitle: '',
    metaDescription: '',
    status: 'published'
  });

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<{ id: string; title: string } | null>(null);

  const loadPages = async () => {
    try {
      setIsLoading(true);
      const list = await scholarshipApi.admin.getPages();
      setPages(list);
    } catch (err) {
      addToast({ type: 'error', title: 'Error', message: 'Failed to load custom pages.' });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPages();
  }, []);

  const handleOpenAdd = () => {
    setIsEditing(false);
    setEditingId(null);
    setFormData({
      title: '',
      slug: '',
      content: '## Page Title\n\nWrite the content of this page using markdown or rich text.',
      metaTitle: '',
      metaDescription: '',
      status: 'published'
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (page: any) => {
    setIsEditing(true);
    setEditingId(page.id || page.slug);
    setFormData(page);
    setModalOpen(true);
  };

  const handleTitleChange = (val: string) => {
    setFormData({
      ...formData,
      title: val,
      slug: isEditing && formData.slug ? formData.slug : val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      metaTitle: isEditing && formData.metaTitle ? formData.metaTitle : `${val} | ScholarshipBride`
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title?.trim()) return;

    try {
      setIsSaving(true);
      const payload = {
        ...formData,
        id: isEditing ? editingId : `page-${Date.now()}`,
        isNew: !isEditing,
        updatedAt: new Date().toISOString()
      };

      await scholarshipApi.admin.savePage(payload);
      addToast({
        type: 'success',
        title: isEditing ? 'Page Updated' : 'Page Created',
        message: `Saved page "${formData.title}" to pages.json.`
      });
      setModalOpen(false);
      loadPages();
    } catch (err) {
      addToast({ type: 'error', title: 'Error', message: 'Failed to save page.' });
    } finally {
      setIsSaving(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!itemToDelete) return;
    try {
      await scholarshipApi.admin.deletePage(itemToDelete.id);
      addToast({ type: 'success', title: 'Deleted', message: `Removed page "${itemToDelete.title}".` });
      setDeleteModalOpen(false);
      setItemToDelete(null);
      loadPages();
    } catch (err) {
      addToast({ type: 'error', title: 'Error', message: 'Could not delete page.' });
    }
  };

  const filtered = pages.filter((p) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return p.title?.toLowerCase().includes(q) || p.slug?.toLowerCase().includes(q);
  });

  return (
    <AdminLayout
      title="Custom CMS & Legal Pages"
      subtitle="Manage Privacy Policy, Terms of Service, Disclaimer, and institutional pages in pages.json"
      actionButton={{
        label: 'Create Custom Page',
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
              placeholder="Search pages by title or slug..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:bg-white outline-none"
            />
          </div>
          <button
            onClick={loadPages}
            className="p-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-600 rounded-xl transition-colors cursor-pointer"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
        </div>

        {/* Pages Table */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                <th className="py-3.5 px-6">Page Title</th>
                <th className="py-3.5 px-4">Slug / Route</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Last Updated</th>
                <th className="py-3.5 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-slate-400">
                    Loading pages from pages.json...
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-slate-400">
                    No custom pages found.
                  </td>
                </tr>
              ) : (
                filtered.map((p) => (
                  <tr key={p.id || p.slug} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3.5 px-6 font-bold text-slate-900 flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
                        <FileCode className="w-4 h-4" />
                      </div>
                      <span>{p.title}</span>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-[11px] text-slate-500">
                      /{p.slug}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                        {p.status || 'published'}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-500 font-mono text-[11px]">
                      {p.updatedAt?.split('T')[0] || 'Recently'}
                    </td>
                    <td className="py-3.5 px-6 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Link
                          to={`/${p.slug}`}
                          target="_blank"
                          className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleOpenEdit(p)}
                          className="p-1.5 text-indigo-600 hover:text-indigo-800 rounded-lg hover:bg-indigo-50 cursor-pointer"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            setItemToDelete({ id: p.id || p.slug, title: p.title });
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

      {/* Page Modal Editor */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden max-h-[92vh] flex flex-col">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50">
              <h3 className="text-sm font-bold text-slate-900">
                {isEditing ? `Edit Page: ${formData.title}` : 'Create Custom CMS Page'}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4 overflow-y-auto flex-1 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Page Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title || ''}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="e.g. Terms of Service"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Page Route Slug
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.slug || ''}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="terms-of-service"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono text-slate-700 outline-none"
                  />
                </div>
              </div>

              <div>
                <RichTextEditor
                  label="Page Content & Markdown"
                  value={formData.content || ''}
                  onChange={(val) => setFormData({ ...formData, content: val })}
                  placeholder="Draft terms, privacy policy clauses, or institutional overview..."
                  minHeight="320px"
                />
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2 border-t border-slate-100">
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Meta Title
                  </label>
                  <input
                    type="text"
                    value={formData.metaTitle || ''}
                    onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Meta Description
                  </label>
                  <input
                    type="text"
                    value={formData.metaDescription || ''}
                    onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 outline-none"
                  />
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
                  {isSaving ? 'Saving...' : 'Save Page'}
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
