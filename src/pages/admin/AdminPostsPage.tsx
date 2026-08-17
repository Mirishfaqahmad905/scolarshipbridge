import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Plus, 
  Search, 
  Trash2, 
  Edit, 
  Eye, 
  ExternalLink, 
  RefreshCw, 
  FileText, 
  CheckCircle, 
  XCircle,
  Calendar,
  User
} from 'lucide-react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { DeleteConfirmModal } from '../../components/admin/DeleteConfirmModal';
import { scholarshipApi } from '../../services/api';
import { useApp } from '../../context/AppContext';

export const AdminPostsPage: React.FC = () => {
  const { addToast } = useApp();

  const [posts, setPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<{ id: string; title: string } | null>(null);

  const loadPosts = async () => {
    try {
      setIsLoading(true);
      const list = await scholarshipApi.admin.getPosts();
      setPosts(list);
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Error',
        message: 'Could not load blog posts from JSON database.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const filteredPosts = posts.filter((p) => {
    if (categoryFilter !== 'all' && p.category !== categoryFilter) return false;
    if (search) {
      const q = search.toLowerCase();
      return p.title?.toLowerCase().includes(q) || p.excerpt?.toLowerCase().includes(q) || p.category?.toLowerCase().includes(q);
    }
    return true;
  });

  const promptDelete = (id: string, title: string) => {
    setItemToDelete({ id, title });
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!itemToDelete) return;
    try {
      await scholarshipApi.admin.deletePost(itemToDelete.id);
      addToast({
        type: 'success',
        title: 'Post Deleted',
        message: `Permanently removed "${itemToDelete.title}" from posts.json.`
      });
      setDeleteModalOpen(false);
      setItemToDelete(null);
      loadPosts();
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Delete Failed',
        message: 'Could not delete post from JSON database.'
      });
    }
  };

  const uniqueCategories = Array.from(new Set(posts.map((p) => p.category).filter(Boolean)));

  return (
    <AdminLayout
      title="Blog & Application Guides"
      subtitle="Manage articles, motivational letter guides, visa tips, and news updates"
      actionButton={{
        label: 'Write New Post',
        to: '/admin/posts/create',
        icon: <Plus className="w-4 h-4" />
      }}
    >
      <div className="space-y-6">
        {/* Search & Filter Bar */}
        <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search guides by title, category, or keyword..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:bg-white focus:border-indigo-500 outline-none"
            />
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-700 outline-none cursor-pointer"
            >
              <option value="all">All Categories</option>
              {uniqueCategories.map((cat: any) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            <button
              onClick={loadPosts}
              className="p-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-600 rounded-xl transition-colors cursor-pointer"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        {/* Posts Table */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  <th className="py-3.5 px-6">Article</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Author</th>
                  <th className="py-3.5 px-4">Published Date</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {isLoading ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-slate-400">
                      <div className="inline-block w-6 h-6 border-2 border-indigo-600/30 border-t-indigo-600 rounded-full animate-spin mb-2" />
                      <p>Loading posts from posts.json...</p>
                    </td>
                  </tr>
                ) : filteredPosts.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-slate-400">
                      No blog posts or application guides found.
                    </td>
                  </tr>
                ) : (
                  filteredPosts.map((post) => (
                    <tr key={post.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="py-3.5 px-6 font-semibold text-slate-900 max-w-sm">
                        <div className="flex items-center gap-3">
                          {post.featuredImage && (
                            <img
                              src={post.featuredImage}
                              alt=""
                              referrerPolicy="no-referrer"
                              className="w-12 h-9 rounded-lg object-cover bg-slate-100 border border-slate-200 flex-shrink-0"
                            />
                          )}
                          <div className="min-w-0">
                            <Link
                              to={`/admin/posts/edit/${post.id}`}
                              className="hover:text-indigo-600 line-clamp-1"
                              title={post.title}
                            >
                              {post.title}
                            </Link>
                            <span className="text-[11px] text-slate-400 block truncate font-normal">
                              {post.excerpt || 'No summary excerpt'}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-slate-700 font-medium">
                        <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px] font-bold">
                          {post.category || 'Guide'}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-slate-600">
                        {post.author || 'Editorial Team'}
                      </td>
                      <td className="py-3.5 px-4 text-slate-500 font-mono text-[11px]">
                        {post.publishedAt || post.createdAt?.split('T')[0] || 'Draft'}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold capitalize ${
                          post.status === 'published' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {post.status || 'published'}
                        </span>
                      </td>
                      <td className="py-3.5 px-6 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Link
                            to={`/news/${post.slug || post.id}`}
                            target="_blank"
                            title="View on site"
                            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </Link>

                          <Link
                            to={`/admin/posts/edit/${post.id}`}
                            title="Edit post"
                            className="p-1.5 text-indigo-600 hover:text-indigo-800 rounded-lg hover:bg-indigo-50"
                          >
                            <Edit className="w-4 h-4" />
                          </Link>

                          <button
                            type="button"
                            onClick={() => promptDelete(post.id, post.title)}
                            title="Delete post"
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
      </div>

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
