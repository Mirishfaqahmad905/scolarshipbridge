import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Plus, 
  Search, 
  Filter, 
  Trash2, 
  Edit, 
  Copy, 
  Eye, 
  CheckCircle, 
  XCircle, 
  Archive, 
  ExternalLink, 
  RefreshCw, 
  ChevronLeft, 
  ChevronRight,
  Sparkles,
  SlidersHorizontal,
  Check,
  AlertCircle
} from 'lucide-react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { DeleteConfirmModal } from '../../components/admin/DeleteConfirmModal';
import { scholarshipApi } from '../../services/api';
import { useApp } from '../../context/AppContext';

export const AdminScholarshipsPage: React.FC = () => {
  const { addToast } = useApp();

  const [scholarships, setScholarships] = useState<any[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Filters & Search
  const [search, setSearch] = useState('');
  const [countryFilter, setCountryFilter] = useState('all');
  const [degreeFilter, setDegreeFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [fundingFilter, setFundingFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(15);

  // Bulk Selection
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Modals
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<{ id: string; title: string } | null>(null);
  const [isBulkDeleting, setIsBulkDeleting] = useState(false);

  // Lists for dropdown options
  const [countriesList, setCountriesList] = useState<any[]>([]);
  const [categoriesList, setCategoriesList] = useState<any[]>([]);

  const loadFilterOptions = async () => {
    try {
      const [countries, categories] = await Promise.all([
        scholarshipApi.admin.getCountries(),
        scholarshipApi.admin.getCategories()
      ]);
      setCountriesList(countries);
      setCategoriesList(categories);
    } catch (err) {
      // silent
    }
  };

  const loadScholarships = async () => {
    try {
      setIsLoading(true);
      const res = await scholarshipApi.admin.getScholarships({
        search,
        country: countryFilter,
        degree: degreeFilter,
        category: categoryFilter,
        funding: fundingFilter,
        status: statusFilter,
        sortBy,
        page: currentPage,
        limit: pageSize
      });

      if (res && res.data) {
        setScholarships(res.data);
        setTotalCount(res.total || res.data.length);
      }
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Fetch Error',
        message: 'Could not load scholarships from JSON database.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadFilterOptions();
  }, []);

  useEffect(() => {
    loadScholarships();
  }, [search, countryFilter, degreeFilter, categoryFilter, fundingFilter, statusFilter, sortBy, currentPage, pageSize]);

  // Bulk select handlers
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedIds(scholarships.map((s) => s.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectRow = (id: string) => {
    setSelectedIds((prev) => 
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Quick Action: Publish
  const handlePublish = async (id: string) => {
    try {
      await scholarshipApi.admin.publishScholarship(id);
      addToast({ type: 'success', title: 'Published', message: 'Scholarship published to website.' });
      loadScholarships();
    } catch (err) {
      addToast({ type: 'error', title: 'Error', message: 'Failed to update scholarship status.' });
    }
  };

  // Quick Action: Unpublish / Draft
  const handleUnpublish = async (id: string) => {
    try {
      await scholarshipApi.admin.unpublishScholarship(id);
      addToast({ type: 'info', title: 'Moved to Draft', message: 'Scholarship moved to draft.' });
      loadScholarships();
    } catch (err) {
      addToast({ type: 'error', title: 'Error', message: 'Failed to update scholarship status.' });
    }
  };

  // Quick Action: Duplicate
  const handleDuplicate = async (id: string) => {
    try {
      const res = await scholarshipApi.admin.duplicateScholarship(id);
      if (res && res.success) {
        addToast({ type: 'success', title: 'Duplicated', message: 'Scholarship duplicated as draft.' });
        loadScholarships();
      }
    } catch (err) {
      addToast({ type: 'error', title: 'Error', message: 'Failed to duplicate scholarship.' });
    }
  };

  // Delete modal open
  const promptDeleteSingle = (id: string, title: string) => {
    setItemToDelete({ id, title });
    setIsBulkDeleting(false);
    setDeleteModalOpen(true);
  };

  const promptDeleteBulk = () => {
    if (selectedIds.length === 0) return;
    setIsBulkDeleting(true);
    setItemToDelete(null);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      if (isBulkDeleting) {
        for (const id of selectedIds) {
          await scholarshipApi.admin.deleteScholarship(id);
        }
        addToast({
          type: 'success',
          title: 'Bulk Deletion Complete',
          message: `Permanently deleted ${selectedIds.length} scholarships.`
        });
        setSelectedIds([]);
      } else if (itemToDelete) {
        await scholarshipApi.admin.deleteScholarship(itemToDelete.id);
        addToast({
          type: 'success',
          title: 'Deleted',
          message: `Scholarship "${itemToDelete.title}" permanently removed.`
        });
      }
      setDeleteModalOpen(false);
      setItemToDelete(null);
      loadScholarships();
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Delete Failed',
        message: 'Could not remove scholarship from JSON storage.'
      });
    }
  };

  const totalPages = Math.ceil(totalCount / pageSize) || 1;

  return (
    <AdminLayout
      title="Scholarship Management"
      subtitle="Manage, publish, filter, and organize international scholarship listings"
      actionButton={{
        label: 'Create Scholarship',
        to: '/admin/scholarships/create',
        icon: <Plus className="w-4 h-4" />
      }}
    >
      <div className="space-y-6">
        {/* Filter and Search Bar Card */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          {/* Top Search Line */}
          <div className="flex flex-col md:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Search by scholarship title, university, tags, or sponsor..."
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all"
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
                >
                  Clear
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 w-full md:w-auto">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-medium text-slate-700 outline-none cursor-pointer"
              >
                <option value="newest">Sort: Newest First</option>
                <option value="deadline">Sort: Urgent Deadline</option>
                <option value="title">Sort: Title (A-Z)</option>
              </select>

              <button
                onClick={loadScholarships}
                title="Refresh Table"
                className="p-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-600 rounded-2xl transition-colors cursor-pointer"
              >
                <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              </button>
            </div>
          </div>

          {/* Bottom Dropdown Filters */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 pt-2 border-t border-slate-100 text-xs">
            {/* Country */}
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                Country
              </label>
              <select
                value={countryFilter}
                onChange={(e) => {
                  setCountryFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 font-medium outline-none cursor-pointer"
              >
                <option value="all">All Countries</option>
                {countriesList.map((c) => (
                  <option key={c.id || c.code} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Degree */}
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                Degree Level
              </label>
              <select
                value={degreeFilter}
                onChange={(e) => {
                  setDegreeFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 font-medium outline-none cursor-pointer"
              >
                <option value="all">All Degrees</option>
                <option value="Undergraduate">Undergraduate</option>
                <option value="Masters">Masters</option>
                <option value="PhD">PhD / Doctoral</option>
                <option value="Postdoctoral">Postdoctoral</option>
              </select>
            </div>

            {/* Category */}
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                Category
              </label>
              <select
                value={categoryFilter}
                onChange={(e) => {
                  setCategoryFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 font-medium outline-none cursor-pointer"
              >
                <option value="all">All Categories</option>
                {categoriesList.map((cat) => (
                  <option key={cat.id || cat.slug} value={cat.slug || cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Funding */}
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                Funding Type
              </label>
              <select
                value={fundingFilter}
                onChange={(e) => {
                  setFundingFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 font-medium outline-none cursor-pointer"
              >
                <option value="all">All Funding</option>
                <option value="fully-funded">Fully Funded</option>
                <option value="partial">Partial Funding</option>
                <option value="tuition-free">Tuition Free</option>
              </select>
            </div>

            {/* Status */}
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                Status
              </label>
              <select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 font-medium outline-none cursor-pointer"
              >
                <option value="all">All Statuses</option>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
                <option value="expired">Expired</option>
                <option value="archived">Archived</option>
              </select>
            </div>
          </div>
        </div>

        {/* Bulk Actions Bar (Active when items selected) */}
        {selectedIds.length > 0 && (
          <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-2xl flex flex-wrap items-center justify-between gap-4 animate-in fade-in">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-indigo-600 text-white font-bold text-xs flex items-center justify-center">
                {selectedIds.length}
              </span>
              <span className="text-xs font-bold text-indigo-950">Scholarships Selected</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={promptDeleteBulk}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete Selected ({selectedIds.length})</span>
              </button>
            </div>
          </div>
        )}

        {/* Table Data View */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  <th className="py-3.5 px-4 w-10">
                    <input
                      type="checkbox"
                      checked={scholarships.length > 0 && selectedIds.length === scholarships.length}
                      onChange={handleSelectAll}
                      className="w-4 h-4 rounded-md border-slate-300 text-indigo-600 focus:ring-0 cursor-pointer"
                    />
                  </th>
                  <th className="py-3.5 px-4">Title & Organization</th>
                  <th className="py-3.5 px-3">Country</th>
                  <th className="py-3.5 px-3">Degrees</th>
                  <th className="py-3.5 px-3">Funding</th>
                  <th className="py-3.5 px-3">Deadline</th>
                  <th className="py-3.5 px-3">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {isLoading ? (
                  <tr>
                    <td colSpan={8} className="py-12 text-center text-slate-400">
                      <div className="inline-block w-6 h-6 border-2 border-indigo-600/30 border-t-indigo-600 rounded-full animate-spin mb-2" />
                      <p>Loading scholarships from database...</p>
                    </td>
                  </tr>
                ) : scholarships.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-12 text-center text-slate-400">
                      <p className="font-semibold text-slate-600 mb-1">No scholarships found</p>
                      <p className="text-xs text-slate-400">Try adjusting your search criteria or create a new scholarship.</p>
                    </td>
                  </tr>
                ) : (
                  scholarships.map((item) => {
                    const isSelected = selectedIds.includes(item.id);
                    return (
                      <tr
                        key={item.id}
                        className={`transition-colors ${isSelected ? 'bg-indigo-50/40' : 'hover:bg-slate-50/60'}`}
                      >
                        <td className="py-3.5 px-4">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => handleSelectRow(item.id)}
                            className="w-4 h-4 rounded-md border-slate-300 text-indigo-600 focus:ring-0 cursor-pointer"
                          />
                        </td>
                        <td className="py-3.5 px-4 font-semibold text-slate-900 max-w-xs">
                          <Link
                            to={`/admin/scholarships/edit/${item.id}`}
                            className="hover:text-indigo-600 line-clamp-1"
                            title={item.title}
                          >
                            {item.title}
                          </Link>
                          <span className="text-[11px] text-slate-400 block truncate font-normal">
                            {item.organization || item.university || 'Independent Award'}
                          </span>
                        </td>
                        <td className="py-3.5 px-3 text-slate-700 font-medium">
                          {item.country || 'International'}
                        </td>
                        <td className="py-3.5 px-3 text-slate-600">
                          {item.degreeLevels?.slice(0, 2).join(', ') || 'All Levels'}
                        </td>
                        <td className="py-3.5 px-3">
                          <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            item.fundingType === 'Fully Funded' ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'
                          }`}>
                            {item.fundingType || 'Full / Partial'}
                          </span>
                        </td>
                        <td className="py-3.5 px-3 text-slate-600 font-mono text-[11px]">
                          {item.deadline || 'Rolling'}
                        </td>
                        <td className="py-3.5 px-3">
                          <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold capitalize ${
                            item.status === 'published' ? 'bg-emerald-100 text-emerald-800' :
                            item.status === 'draft' ? 'bg-amber-100 text-amber-800' :
                            item.status === 'expired' ? 'bg-rose-100 text-rose-800' : 'bg-slate-200 text-slate-700'
                          }`}>
                            {item.status || 'published'}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-1">
                            {item.status === 'published' ? (
                              <button
                                type="button"
                                onClick={() => handleUnpublish(item.id)}
                                title="Move to Draft"
                                className="p-1.5 text-amber-600 hover:text-amber-800 rounded-lg hover:bg-amber-50 cursor-pointer"
                              >
                                <XCircle className="w-4 h-4" />
                              </button>
                            ) : (
                              <button
                                type="button"
                                onClick={() => handlePublish(item.id)}
                                title="Publish Online"
                                className="p-1.5 text-emerald-600 hover:text-emerald-800 rounded-lg hover:bg-emerald-50 cursor-pointer"
                              >
                                <CheckCircle className="w-4 h-4" />
                              </button>
                            )}

                            <button
                              type="button"
                              onClick={() => handleDuplicate(item.id)}
                              title="Duplicate as Draft"
                              className="p-1.5 text-slate-500 hover:text-slate-700 rounded-lg hover:bg-slate-100 cursor-pointer"
                            >
                              <Copy className="w-4 h-4" />
                            </button>

                            <Link
                              to={`/scholarship/${item.id}`}
                              target="_blank"
                              title="View Public Page"
                              className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </Link>

                            <Link
                              to={`/admin/scholarships/edit/${item.id}`}
                              title="Edit Scholarship"
                              className="p-1.5 text-indigo-600 hover:text-indigo-800 rounded-lg hover:bg-indigo-50"
                            >
                              <Edit className="w-4 h-4" />
                            </Link>

                            <button
                              type="button"
                              onClick={() => promptDeleteSingle(item.id, item.title)}
                              title="Delete Permanently"
                              className="p-1.5 text-rose-600 hover:text-rose-800 rounded-lg hover:bg-rose-50 cursor-pointer"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Footer */}
          <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-slate-500 font-medium">
              Showing {scholarships.length > 0 ? (currentPage - 1) * pageSize + 1 : 0} to{' '}
              {Math.min(currentPage * pageSize, totalCount)} of {totalCount} scholarships
            </span>

            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={currentPage <= 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="px-3 py-1.5 border border-slate-200 rounded-xl bg-white text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-40 cursor-pointer"
              >
                Previous
              </button>

              <span className="text-xs font-bold text-slate-700 px-2">
                Page {currentPage} of {totalPages}
              </span>

              <button
                type="button"
                disabled={currentPage >= totalPages}
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                className="px-3 py-1.5 border border-slate-200 rounded-xl bg-white text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-40 cursor-pointer"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Reusable Delete Modal */}
      <DeleteConfirmModal
        isOpen={deleteModalOpen}
        itemName={itemToDelete?.title}
        count={isBulkDeleting ? selectedIds.length : 1}
        onCancel={() => {
          setDeleteModalOpen(false);
          setItemToDelete(null);
        }}
        onConfirm={handleConfirmDelete}
      />
    </AdminLayout>
  );
};
