import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Save, ArrowLeft, Eye, Image as ImageIcon, Search, Globe, FileText } from 'lucide-react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { RichTextEditor } from '../../components/admin/RichTextEditor';
import { Base64Uploader } from '../../components/admin/Base64Uploader';
import { scholarshipApi } from '../../services/api';
import { useApp } from '../../context/AppContext';

export const AdminPostEditorPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToast } = useApp();

  const isEditing = Boolean(id && id !== 'create');
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState<any>({
    title: '',
    slug: '',
    category: 'Application Guides',
    author: 'ScholarshipBride Editorial Team',
    excerpt: '',
    content: '',
    featuredImage: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1200&q=80',
    tags: ['Scholarships', 'Application Tips', 'IELTS Waiver'],
    status: 'published',
    readTime: '5 min read',
    metaTitle: '',
    metaDescription: '',
    publishedAt: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    if (isEditing && id) {
      const loadPost = async () => {
        try {
          setIsLoading(true);
          const data = await scholarshipApi.admin.getPost(id);
          if (data) {
            setFormData(data);
          } else {
            addToast({ type: 'error', title: 'Not Found', message: 'Article not found in posts.json.' });
            navigate('/admin/posts');
          }
        } catch (err) {
          addToast({ type: 'error', title: 'Error', message: 'Failed to load article.' });
        } finally {
          setIsLoading(false);
        }
      };
      loadPost();
    }
  }, [id, isEditing]);

  const handleTitleChange = (val: string) => {
    const updates: any = { title: val };
    if (!isEditing || !formData.slug) {
      updates.slug = val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    }
    if (!formData.metaTitle) {
      updates.metaTitle = `${val} | ScholarshipBride Guide`;
    }
    setFormData((prev: any) => ({ ...prev, ...updates }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title?.trim()) {
      addToast({ type: 'error', title: 'Validation Error', message: 'Post title is required.' });
      return;
    }

    try {
      setIsSaving(true);
      const payload = {
        ...formData,
        id: isEditing ? id : `post-${Date.now()}`,
        isNew: !isEditing
      };

      const res = await scholarshipApi.admin.savePost(payload);
      if (res && res.success) {
        addToast({
          type: 'success',
          title: isEditing ? 'Post Updated' : 'Post Published',
          message: `Saved "${formData.title}" to posts.json.`
        });
        navigate('/admin/posts');
      }
    } catch (err: any) {
      addToast({
        type: 'error',
        title: 'Save Failed',
        message: err?.response?.data?.message || 'Could not save post to database.'
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <AdminLayout
      title={isEditing ? `Edit Guide: ${formData.title || ''}` : 'Create Application Guide'}
      subtitle="Publish guides, motivational letter blueprints, and scholarship announcements"
    >
      <form onSubmit={handleSave} className="space-y-6 max-w-5xl">
        {/* Action Header */}
        <div className="flex items-center justify-between p-4 bg-white rounded-3xl border border-slate-200 shadow-xs">
          <Link
            to="/admin/posts"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Posts</span>
          </Link>

          <div className="flex items-center gap-3">
            {isEditing && (
              <Link
                to={`/news/${formData.slug || id}`}
                target="_blank"
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl"
              >
                <Eye className="w-4 h-4" />
                <span>Live View</span>
              </Link>
            )}

            <button
              type="submit"
              disabled={isSaving}
              className="inline-flex items-center gap-2 px-6 py-2 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white text-xs font-bold rounded-xl shadow-md transition-all cursor-pointer disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{isSaving ? 'Saving...' : isEditing ? 'Save Article' : 'Publish Article'}</span>
            </button>
          </div>
        </div>

        {/* Content Box */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Post Title *
              </label>
              <input
                type="text"
                required
                value={formData.title || ''}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="e.g. How to Write a Winning Motivation Letter for European Scholarships"
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-base font-bold text-slate-900 focus:bg-white focus:border-indigo-500 outline-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  URL Slug
                </label>
                <input
                  type="text"
                  value={formData.slug || ''}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono text-slate-700 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Category
                </label>
                <select
                  value={formData.category || 'Application Guides'}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 outline-none cursor-pointer"
                >
                  <option value="Application Guides">Application Guides</option>
                  <option value="Visa & Embassy">Visa & Embassy Guidelines</option>
                  <option value="IELTS & Language">IELTS & Language Waivers</option>
                  <option value="Interviews">Scholarship Interviews</option>
                  <option value="Global News">Global Education News</option>
                  <option value="Motivational Letters">Motivational Letters</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Author Name
                </label>
                <input
                  type="text"
                  value={formData.author || ''}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  placeholder="Scholarship Advisor"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Short Excerpt / Summary
              </label>
              <textarea
                rows={2}
                value={formData.excerpt || ''}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                placeholder="A concise summary of the article displayed in post cards and search feeds..."
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 outline-none"
              />
            </div>

            {/* Featured Image Base64 Uploader */}
            <Base64Uploader
              label="Article Featured Image (Base64 Stored)"
              value={formData.featuredImage || ''}
              onChange={(base64) => setFormData({ ...formData, featuredImage: base64 })}
              helperText="Upload a featured banner image for this article. Stored in media.json."
            />

            {/* Rich Text Editor */}
            <div>
              <RichTextEditor
                label="Full Article Body & Markdown Content"
                value={formData.content || ''}
                onChange={(val) => setFormData({ ...formData, content: val })}
                placeholder="Write your comprehensive scholarship guide or news announcement..."
                minHeight="420px"
              />
            </div>

            {/* SEO & Status */}
            <div className="pt-4 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Meta Title Tag
                </label>
                <input
                  type="text"
                  value={formData.metaTitle || ''}
                  onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
                  placeholder="Guide Title | ScholarshipBride"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Publication Status
                </label>
                <select
                  value={formData.status || 'published'}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 outline-none cursor-pointer"
                >
                  <option value="published">Published (Live Online)</option>
                  <option value="draft">Draft (Hidden)</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </form>
    </AdminLayout>
  );
};
