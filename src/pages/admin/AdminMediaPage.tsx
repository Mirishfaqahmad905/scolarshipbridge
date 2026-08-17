import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Search, 
  Trash2, 
  Image as ImageIcon, 
  Copy, 
  Check, 
  RefreshCw, 
  Grid, 
  List, 
  Eye, 
  X, 
  Download,
  CheckCircle2,
  HardDrive
} from 'lucide-react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { DeleteConfirmModal } from '../../components/admin/DeleteConfirmModal';
import { Base64Uploader } from '../../components/admin/Base64Uploader';
import { scholarshipApi } from '../../services/api';
import { useApp } from '../../context/AppContext';

export const AdminMediaPage: React.FC = () => {
  const { addToast } = useApp();

  const [mediaList, setMediaList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [newImageBase64, setNewImageBase64] = useState('');
  const [newImageTitle, setNewImageTitle] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState<any | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<{ id: string; name: string } | null>(null);

  const loadMedia = async () => {
    try {
      setIsLoading(true);
      const list = await scholarshipApi.admin.getMedia();
      setMediaList(list);
    } catch (err) {
      addToast({ type: 'error', title: 'Error', message: 'Failed to load media items from media.json.' });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadMedia();
  }, []);

  const handleUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newImageBase64) {
      addToast({ type: 'error', title: 'Upload Error', message: 'Please select an image.' });
      return;
    }

    try {
      setIsUploading(true);
      const payload = {
        name: newImageTitle || `Image-${Date.now()}`,
        base64: newImageBase64,
        size: `${Math.round(newImageBase64.length / 1024)} KB`
      };

      const res = await scholarshipApi.admin.uploadMedia(payload);
      if (res && res.success) {
        addToast({
          type: 'success',
          title: 'Image Uploaded',
          message: 'Encoded as Base64 and stored in media.json.'
        });
        setUploadModalOpen(false);
        setNewImageBase64('');
        setNewImageTitle('');
        loadMedia();
      }
    } catch (err) {
      addToast({ type: 'error', title: 'Error', message: 'Failed to store image in media.json.' });
    } finally {
      setIsUploading(false);
    }
  };

  const handleCopyBase64 = (base64: string, id: string) => {
    navigator.clipboard.writeText(base64);
    setCopiedId(id);
    addToast({
      type: 'info',
      title: 'Copied Base64',
      message: 'Base64 data URI copied to clipboard.'
    });
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleConfirmDelete = async () => {
    if (!itemToDelete) return;
    try {
      await scholarshipApi.admin.deleteMedia(itemToDelete.id);
      addToast({
        type: 'success',
        title: 'Media Deleted',
        message: 'Permanently removed from media.json.'
      });
      setDeleteModalOpen(false);
      setItemToDelete(null);
      setDetailModalOpen(false);
      loadMedia();
    } catch (err) {
      addToast({ type: 'error', title: 'Error', message: 'Failed to remove media.' });
    }
  };

  const filtered = mediaList.filter((m) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return m.name?.toLowerCase().includes(q) || m.filename?.toLowerCase().includes(q) || m.alt?.toLowerCase().includes(q);
  });

  return (
    <AdminLayout
      title="Media & Base64 Asset Storage"
      subtitle="Upload, encode, inspect, and organize Base64 images stored in media.json"
      actionButton={{
        label: 'Upload Image (Base64)',
        onClick: () => setUploadModalOpen(true),
        icon: <Plus className="w-4 h-4" />
      }}
    >
      <div className="space-y-6">
        {/* Search and Layout Toggle Bar */}
        <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-xs flex items-center justify-between gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search media files by name, dimensions, or tags..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:bg-white outline-none"
            />
          </div>

          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                viewMode === 'grid' ? 'bg-white text-indigo-600 shadow-xs' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                viewMode === 'list' ? 'bg-white text-indigo-600 shadow-xs' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={loadMedia}
            className="p-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-600 rounded-xl transition-colors cursor-pointer"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
        </div>

        {/* Media Grid View */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {isLoading ? (
              <div className="col-span-full py-12 text-center text-slate-400 text-xs">
                Loading media from media.json...
              </div>
            ) : filtered.length === 0 ? (
              <div className="col-span-full py-12 text-center text-slate-400 text-xs">
                No images stored yet. Click "Upload Image" to add Base64 files.
              </div>
            ) : (
              filtered.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden group hover:border-indigo-400 transition-all flex flex-col justify-between"
                >
                  <div
                    onClick={() => {
                      setSelectedMedia(item);
                      setDetailModalOpen(true);
                    }}
                    className="relative aspect-video bg-slate-100 cursor-pointer overflow-hidden flex items-center justify-center"
                  >
                    <img
                      src={item.base64 || item.url}
                      alt={item.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                    <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <span className="p-1.5 bg-white/90 text-slate-900 rounded-lg text-xs font-bold flex items-center gap-1">
                        <Eye className="w-3.5 h-3.5" />
                        Inspect
                      </span>
                    </div>
                  </div>

                  <div className="p-3 text-xs space-y-1">
                    <p className="font-bold text-slate-900 truncate" title={item.name}>
                      {item.name || 'Untitled Image'}
                    </p>
                    <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1">
                      <span>{item.size || 'Base64'}</span>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleCopyBase64(item.base64 || item.url, item.id)}
                          title="Copy Base64"
                          className="p-1 text-slate-400 hover:text-indigo-600 rounded cursor-pointer"
                        >
                          {copiedId === item.id ? (
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                        <button
                          onClick={() => {
                            setItemToDelete({ id: item.id, name: item.name });
                            setDeleteModalOpen(true);
                          }}
                          title="Delete"
                          className="p-1 text-slate-400 hover:text-rose-600 rounded cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        ) : (
          /* Media List View */
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  <th className="py-3.5 px-6">Thumbnail</th>
                  <th className="py-3.5 px-4">Image Name</th>
                  <th className="py-3.5 px-4">Size</th>
                  <th className="py-3.5 px-4">Uploaded Date</th>
                  <th className="py-3.5 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-2.5 px-6">
                      <img
                        src={item.base64 || item.url}
                        alt=""
                        referrerPolicy="no-referrer"
                        className="w-12 h-8 rounded-lg object-cover bg-slate-100 border border-slate-200"
                      />
                    </td>
                    <td className="py-2.5 px-4 font-bold text-slate-900">{item.name}</td>
                    <td className="py-2.5 px-4 text-slate-500 font-mono text-[11px]">{item.size || 'Base64'}</td>
                    <td className="py-2.5 px-4 text-slate-500 font-mono text-[11px]">{item.createdAt || 'Recently'}</td>
                    <td className="py-2.5 px-6 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => handleCopyBase64(item.base64 || item.url, item.id)}
                          className="p-1.5 text-slate-600 hover:text-indigo-600 hover:bg-slate-100 rounded-lg cursor-pointer"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            setSelectedMedia(item);
                            setDetailModalOpen(true);
                          }}
                          className="p-1.5 text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 rounded-lg cursor-pointer"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            setItemToDelete({ id: item.id, name: item.name });
                            setDeleteModalOpen(true);
                          }}
                          className="p-1.5 text-rose-600 hover:text-rose-800 hover:bg-rose-50 rounded-lg cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Upload Modal */}
      {uploadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50">
              <h3 className="text-sm font-bold text-slate-900">Upload Image to Base64 JSON Storage</h3>
              <button
                onClick={() => setUploadModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUploadSubmit} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Image Label / Title
                </label>
                <input
                  type="text"
                  required
                  value={newImageTitle}
                  onChange={(e) => setNewImageTitle(e.target.value)}
                  placeholder="e.g. Oxford Campus Banner"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none font-medium text-slate-900"
                />
              </div>

              <Base64Uploader
                label="Select File"
                value={newImageBase64}
                onChange={(b64) => setNewImageBase64(b64)}
                helperText="Will be encoded and stored directly into media.json."
              />

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setUploadModalOpen(false)}
                  className="px-4 py-2 border border-slate-300 rounded-xl text-slate-700 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUploading || !newImageBase64}
                  className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-md cursor-pointer disabled:opacity-50"
                >
                  {isUploading ? 'Uploading...' : 'Save Base64 Image'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Inspect Media Modal */}
      {detailModalOpen && selectedMedia && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50">
              <h3 className="text-sm font-bold text-slate-900 truncate max-w-md">
                Media Details: {selectedMedia.name}
              </h3>
              <button
                onClick={() => setDetailModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 overflow-y-auto flex-1 text-xs">
              <div className="max-h-72 rounded-2xl bg-slate-950 flex items-center justify-center overflow-hidden">
                <img
                  src={selectedMedia.base64 || selectedMedia.url}
                  alt={selectedMedia.name}
                  referrerPolicy="no-referrer"
                  className="max-h-72 object-contain"
                />
              </div>

              <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Storage Format</span>
                  <span className="font-mono text-slate-800">Base64 in media.json</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Encoded Size</span>
                  <span className="font-mono text-slate-800">{selectedMedia.size || 'Base64 Stream'}</span>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Base64 Data URI String
                </label>
                <div className="relative">
                  <textarea
                    rows={4}
                    readOnly
                    value={selectedMedia.base64 || selectedMedia.url}
                    className="w-full p-3 bg-slate-900 text-slate-300 font-mono text-[10px] rounded-xl outline-none select-all"
                  />
                  <button
                    onClick={() => handleCopyBase64(selectedMedia.base64 || selectedMedia.url, selectedMedia.id)}
                    className="absolute top-2 right-2 px-2.5 py-1 bg-white/20 hover:bg-white/30 text-white rounded-lg text-[10px] font-bold"
                  >
                    Copy String
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100 bg-slate-50">
              <button
                type="button"
                onClick={() => {
                  setItemToDelete({ id: selectedMedia.id, name: selectedMedia.name });
                  setDeleteModalOpen(true);
                }}
                className="px-4 py-2 text-rose-600 hover:bg-rose-50 font-bold rounded-xl text-xs flex items-center gap-1.5"
              >
                <Trash2 className="w-4 h-4" />
                <span>Delete from Database</span>
              </button>

              <button
                type="button"
                onClick={() => setDetailModalOpen(false)}
                className="px-5 py-2 bg-slate-900 text-white font-bold rounded-xl text-xs"
              >
                Close
              </button>
            </div>
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
