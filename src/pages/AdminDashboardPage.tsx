import React, { useState, useEffect, useRef } from 'react';
import { 
  ShieldCheck, 
  Plus, 
  Trash2, 
  Edit3, 
  CheckCircle2, 
  MessageSquare, 
  Search,
  X,
  Image as ImageIcon,
  Upload,
  Database,
  RefreshCw,
  Copy,
  Check,
  AlertTriangle
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Scholarship, FundingType } from '../types';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { scholarshipApi } from '../services/api';

export const AdminDashboardPage: React.FC = () => {
  const { 
    scholarships, 
    saveScholarship, 
    deleteScholarship, 
    toggleScholarshipFeatured, 
    announcement, 
    updateAnnouncement,
    addToast 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'scholarships' | 'media' | 'messages' | 'announcement' | 'backups'>('scholarships');
  const [editingScholarship, setEditingScholarship] = useState<Partial<Scholarship> | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Media Library State (Base64)
  const [mediaList, setMediaList] = useState<any[]>([]);
  const [mediaLoading, setMediaLoading] = useState<boolean>(false);
  const [uploadingImage, setUploadingImage] = useState<boolean>(false);
  const [imageAltText, setImageAltText] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Messages State
  const [messagesList, setMessagesList] = useState<any[]>([]);
  const [messagesLoading, setMessagesLoading] = useState<boolean>(false);

  // Backups State
  const [backupsList, setBackupsList] = useState<any[]>([]);
  const [creatingBackup, setCreatingBackup] = useState<boolean>(false);

  // Announcement State
  const [announcementText, setAnnouncementText] = useState(announcement.text);
  const [announcementEnabled, setAnnouncementEnabled] = useState(announcement.enabled);
  const [announcementBadge, setAnnouncementBadge] = useState(announcement.badge || 'LATEST INTAKES 2026/2027');

  const filteredScholarships = scholarships.filter(s =>
    s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Load Media Library
  const fetchMedia = async () => {
    setMediaLoading(true);
    try {
      const data = await scholarshipApi.media.getAll();
      setMediaList(data);
    } catch (err) {
      console.error('Failed to load media list:', err);
    } finally {
      setMediaLoading(false);
    }
  };

  // Load Messages
  const fetchMessages = async () => {
    setMessagesLoading(true);
    try {
      const data = await scholarshipApi.getContactMessages();
      setMessagesList(data);
    } catch (err) {
      console.error('Failed to load messages:', err);
    } finally {
      setMessagesLoading(false);
    }
  };

  // Load Backups
  const fetchBackups = async () => {
    try {
      const data = await scholarshipApi.admin.listBackups();
      setBackupsList(data);
    } catch (err) {
      console.error('Failed to load backups:', err);
    }
  };

  useEffect(() => {
    if (activeTab === 'media') fetchMedia();
    if (activeTab === 'messages') fetchMessages();
    if (activeTab === 'backups') fetchBackups();
  }, [activeTab]);

  // Handle Base64 Image Upload
  const handleImageFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate type
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/jpg'];
    if (!validTypes.includes(file.type)) {
      addToast({
        type: 'error',
        title: 'Invalid Image Format',
        message: 'Please upload a JPEG, PNG, WEBP, or GIF image.'
      });
      return;
    }

    // Validate size (max 8MB)
    if (file.size > 8 * 1024 * 1024) {
      addToast({
        type: 'error',
        title: 'Image Too Large',
        message: 'Maximum allowed image size is 8MB.'
      });
      return;
    }

    setUploadingImage(true);
    const reader = new FileReader();

    reader.onload = async () => {
      try {
        const base64Data = reader.result as string;
        const res = await scholarshipApi.media.uploadBase64({
          fileName: file.name,
          imageData: base64Data,
          altText: imageAltText || file.name.split('.')[0],
          fileSize: file.size
        } as any);

        if (res && res.success) {
          addToast({
            type: 'success',
            title: 'Base64 Image Stored',
            message: `"${file.name}" saved to media.json database.`
          });
          setImageAltText('');
          if (fileInputRef.current) fileInputRef.current.value = '';
          await fetchMedia();
        } else {
          throw new Error(res?.message || 'Failed to upload');
        }
      } catch (err: any) {
        addToast({
          type: 'error',
          title: 'Upload Failed',
          message: err.message || 'Could not store Base64 image.'
        });
      } finally {
        setUploadingImage(false);
      }
    };

    reader.onerror = () => {
      setUploadingImage(false);
      addToast({
        type: 'error',
        title: 'File Read Error',
        message: 'Could not read image file.'
      });
    };

    reader.readAsDataURL(file);
  };

  // Handle Delete Media
  const handleDeleteMedia = async (id: string, fileName: string) => {
    if (!confirm(`Permanently delete "${fileName}" from media.json?`)) return;

    try {
      const res = await scholarshipApi.media.deleteMedia(id);
      if (res && res.success) {
        addToast({
          type: 'info',
          title: 'Media Deleted',
          message: `"${fileName}" removed from media.json.`
        });
        await fetchMedia();
      }
    } catch (err: any) {
      addToast({
        type: 'error',
        title: 'Delete Failed',
        message: err.message || 'Could not remove media item.'
      });
    }
  };

  // Handle Delete Contact Message
  const handleDeleteMessage = async (id: string) => {
    if (!confirm('Permanently delete this inquiry from contactMessages.json?')) return;
    try {
      await scholarshipApi.deleteContactMessage(id);
      addToast({
        type: 'info',
        title: 'Message Deleted',
        message: 'Message removed from contactMessages.json.'
      });
      await fetchMessages();
    } catch (err: any) {
      addToast({
        type: 'error',
        title: 'Delete Failed',
        message: err.message
      });
    }
  };

  // Handle Create Backup
  const handleCreateBackup = async () => {
    setCreatingBackup(true);
    try {
      const res = await scholarshipApi.admin.createBackup('manual');
      if (res && res.success) {
        addToast({
          type: 'success',
          title: 'Backup Created',
          message: `Snapshot created: ${res.data?.filename || 'JSON Backup'}`
        });
        await fetchBackups();
      }
    } catch (err: any) {
      addToast({
        type: 'error',
        title: 'Backup Failed',
        message: err.message
      });
    } finally {
      setCreatingBackup(false);
    }
  };

  // Handle Restore Backup
  const handleRestoreBackup = async (filename: string) => {
    if (!confirm(`Are you sure you want to restore from ${filename}? Current database files will be safely archived first.`)) return;

    try {
      const res = await scholarshipApi.admin.restoreBackup(filename);
      if (res && res.success) {
        addToast({
          type: 'success',
          title: 'Database Restored',
          message: res.message
        });
        window.location.reload();
      }
    } catch (err: any) {
      addToast({
        type: 'error',
        title: 'Restore Failed',
        message: err.message
      });
    }
  };

  const handleOpenAddModal = () => {
    setEditingScholarship({
      title: '',
      slug: '',
      organization: '',
      university: '',
      country: 'Germany',
      region: 'Europe',
      degreeLevels: ['Master'],
      fields: ['Engineering', 'Computer Science'],
      category: 'scholarships',
      type: 'Government',
      fundingType: 'Fully Funded',
      tuitionCoverage: '100% Full Tuition Waiver',
      monthlyStipend: '€1,200 / month',
      airfare: 'Round-trip Flight Ticket Provided',
      accommodation: 'Free Student Dormitory Accommodation',
      eligibleCountries: ['All International Students'],
      eligibility: {
        nationalityRequirement: 'Open to all international applicants',
        academicRequirement: 'Bachelor degree with minimum 3.0 GPA',
      },
      languageRequirements: {
        ieltsRequired: false,
        englishProficiencyCertificateAccepted: true,
        notes: 'English Medium of Instruction (MOI) certificate accepted'
      },
      greRequired: false,
      applicationFee: 'Free',
      deadline: '2026-11-30',
      duration: '2 Years',
      description: 'Prestigious government grant for graduate studies.',
      fullOverview: 'Comprehensive scholarship program covering full tuition, living stipends, health insurance, and international travel.',
      applicationUrl: 'https://example.org/apply',
      officialWebsite: 'https://example.org',
      image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80',
      tags: ['Fully Funded', 'Europe', 'Master', 'No IELTS'],
      featured: false,
      popular: true,
      status: 'published',
      verified: true
    });
    setIsModalOpen(true);
  };

  const handleSaveScholarship = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingScholarship?.title) return;

    const slug = editingScholarship.slug || editingScholarship.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const scholarshipData = {
      ...editingScholarship,
      slug,
      id: editingScholarship.id || `sch-${Date.now()}`
    } as Scholarship;

    await saveScholarship(scholarshipData);
    setIsModalOpen(false);
    setEditingScholarship(null);
  };

  const handleSaveAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    updateAnnouncement({
      ...announcement,
      text: announcementText,
      enabled: announcementEnabled,
      badge: announcementBadge
    });
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    addToast({
      type: 'info',
      title: 'Copied to Clipboard',
      message: 'Base64 image data URL copied.'
    });
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div id="admin-management-center" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8 pb-24">
      
      <Breadcrumbs items={[{ label: 'Admin Management Desk' }]} />

      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-amber-300 mb-1">
            <ShieldCheck className="w-4 h-4" />
            <span>ScholarBridge JSON File-Based CMS Engine</span>
          </div>
          <h1 className="text-2xl font-black text-white">Administrator Control Portal</h1>
          <p className="text-xs text-slate-300 mt-1">Direct CRUD operations stored safely in <code className="bg-black/40 px-1.5 py-0.5 rounded text-amber-300 font-mono">backend/data/*.json</code></p>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Publish New Scholarship</span>
        </button>
      </div>

      {/* Tab Navigation */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-3 text-xs font-bold">
        <button
          onClick={() => setActiveTab('scholarships')}
          className={`px-4 py-2 rounded-xl transition-colors cursor-pointer ${
            activeTab === 'scholarships' ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Scholarships ({scholarships.length})
        </button>

        <button
          onClick={() => setActiveTab('media')}
          className={`px-4 py-2 rounded-xl transition-colors cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'media' ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <ImageIcon className="w-3.5 h-3.5" />
          <span>Media Library (Base64)</span>
        </button>

        <button
          onClick={() => setActiveTab('messages')}
          className={`px-4 py-2 rounded-xl transition-colors cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'messages' ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Inquiries</span>
        </button>

        <button
          onClick={() => setActiveTab('announcement')}
          className={`px-4 py-2 rounded-xl transition-colors cursor-pointer ${
            activeTab === 'announcement' ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Notification Bar
        </button>

        <button
          onClick={() => setActiveTab('backups')}
          className={`px-4 py-2 rounded-xl transition-colors cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'backups' ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Database className="w-3.5 h-3.5" />
          <span>JSON Backups & Restore</span>
        </button>
      </div>

      {/* TAB 1: SCHOLARSHIPS MANAGEMENT */}
      {activeTab === 'scholarships' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search scholarship by title or country..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs outline-none focus:border-indigo-500"
              />
            </div>
            <span className="text-xs text-slate-500 font-semibold">{filteredScholarships.length} entries in scholarships.json</span>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-600">
                <thead className="bg-slate-50 text-slate-700 font-bold uppercase tracking-wider border-b border-slate-200">
                  <tr>
                    <th className="p-4">Title & Provider</th>
                    <th className="p-4">Destination</th>
                    <th className="p-4">Funding</th>
                    <th className="p-4">Deadline</th>
                    <th className="p-4 text-center">Featured</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredScholarships.map(s => (
                    <tr key={s.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="p-4 font-bold text-slate-900 max-w-xs truncate">
                        <div>{s.title}</div>
                        <div className="text-[11px] text-slate-400 font-normal">{s.organization}</div>
                      </td>
                      <td className="p-4 font-medium">{s.country}</td>
                      <td className="p-4">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          s.fundingType === 'Fully Funded' ? 'bg-emerald-50 text-emerald-700' : 'bg-indigo-50 text-indigo-700'
                        }`}>
                          {s.fundingType}
                        </span>
                      </td>
                      <td className="p-4 font-mono text-[11px]">{s.deadline}</td>
                      <td className="p-4 text-center">
                        <button
                          onClick={() => toggleScholarshipFeatured(s.id)}
                          className={`p-1.5 rounded-lg border text-xs transition-colors cursor-pointer ${
                            s.featured ? 'bg-amber-50 border-amber-200 text-amber-600 font-bold' : 'bg-slate-100 border-slate-200 text-slate-400'
                          }`}
                        >
                          ★
                        </button>
                      </td>
                      <td className="p-4 text-right space-x-2">
                        <button
                          onClick={() => {
                            setEditingScholarship(s);
                            setIsModalOpen(true);
                          }}
                          className="p-1.5 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors cursor-pointer"
                          title="Edit"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={async () => {
                            if (confirm(`Permanently delete "${s.title}" from scholarships.json?`)) {
                              await deleteScholarship(s.id);
                            }
                          }}
                          className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                          title="Delete from JSON"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: MEDIA LIBRARY (BASE64) */}
      {activeTab === 'media' && (
        <div className="space-y-6">
          {/* Upload Area */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Upload className="w-4 h-4 text-indigo-600" />
              <span>Base64 Image Upload & Storage</span>
            </h3>
            <p className="text-xs text-slate-500">
              Selected images are converted into Base64 format in your browser and stored directly inside <code className="bg-slate-100 px-1.5 py-0.5 rounded text-indigo-600 font-mono">backend/data/media.json</code>.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2 space-y-1 text-xs">
                <label className="font-bold text-slate-700">Image Description / Alt Text</label>
                <input
                  type="text"
                  placeholder="e.g. Oxford Rhodes Scholarship campus banner"
                  value={imageAltText}
                  onChange={e => setImageAltText(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="flex items-end">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageFileChange}
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  className="hidden"
                  id="media-file-input"
                />
                <label
                  htmlFor="media-file-input"
                  className={`w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl text-center cursor-pointer shadow-xs transition-colors flex items-center justify-center gap-2 ${
                    uploadingImage ? 'opacity-50 pointer-events-none' : ''
                  }`}
                >
                  <Upload className="w-4 h-4" />
                  <span>{uploadingImage ? 'Converting to Base64...' : 'Select & Upload Image'}</span>
                </label>
              </div>
            </div>
          </div>

          {/* Media Grid */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Stored Media Records ({mediaList.length})
              </h4>
              <button
                onClick={fetchMedia}
                className="text-xs text-indigo-600 hover:text-indigo-700 font-semibold flex items-center gap-1 cursor-pointer"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Refresh</span>
              </button>
            </div>

            {mediaLoading ? (
              <div className="p-12 text-center text-xs text-slate-400">Loading Base64 media library...</div>
            ) : mediaList.length === 0 ? (
              <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-12 text-center space-y-2">
                <ImageIcon className="w-8 h-8 text-slate-300 mx-auto" />
                <div className="text-xs font-bold text-slate-700">No media stored yet</div>
                <div className="text-[11px] text-slate-400">Upload your first image above to store Base64 data in media.json.</div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {mediaList.map((m) => (
                  <div key={m.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs space-y-3 p-4 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="aspect-video bg-slate-100 rounded-xl overflow-hidden relative">
                        <img
                          src={m.imageData}
                          alt={m.altText || m.fileName}
                          className="w-full h-full object-cover"
                        />
                        <span className="absolute top-2 left-2 bg-slate-900/75 text-white text-[10px] font-mono px-2 py-0.5 rounded-md backdrop-blur-xs">
                          {m.mimeType}
                        </span>
                      </div>
                      <div className="font-bold text-xs text-slate-900 truncate">{m.fileName}</div>
                      <div className="text-[11px] text-slate-500 line-clamp-1">{m.altText || 'No description'}</div>
                      <div className="text-[10px] text-slate-400 font-mono">
                        {(m.fileSize / 1024).toFixed(1)} KB • {m.createdAt?.split('T')[0]}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-100 gap-2">
                      <button
                        onClick={() => copyToClipboard(m.imageData, m.id)}
                        className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-bold rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                        title="Copy Base64 Data URL"
                      >
                        {copiedId === m.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedId === m.id ? 'Copied' : 'Copy Base64'}</span>
                      </button>

                      <button
                        onClick={() => handleDeleteMedia(m.id, m.fileName)}
                        className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                        title="Delete from media.json"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 3: CONTACT MESSAGES */}
      {activeTab === 'messages' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900">Student Inquiries & Advisory Messages</h3>
            <button
              onClick={fetchMessages}
              className="text-xs text-indigo-600 hover:text-indigo-700 font-semibold flex items-center gap-1 cursor-pointer"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Refresh</span>
            </button>
          </div>

          {messagesLoading ? (
            <div className="p-12 text-center text-xs text-slate-400">Loading inquiries from contactMessages.json...</div>
          ) : messagesList.length === 0 ? (
            <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-12 text-center space-y-2">
              <MessageSquare className="w-8 h-8 text-slate-300 mx-auto" />
              <div className="text-xs font-bold text-slate-700">No contact messages received yet</div>
              <div className="text-[11px] text-slate-400">New submissions from the /contact page will appear here.</div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-slate-200 divide-y divide-slate-100 overflow-hidden shadow-xs">
              {messagesList.map((msg) => (
                <div key={msg.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors">
                  <div className="space-y-1 max-w-2xl">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs text-slate-900">{msg.name}</span>
                      <span className="text-[11px] text-indigo-600 font-mono">&lt;{msg.email}&gt;</span>
                      <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-semibold">{msg.category || 'Inquiry'}</span>
                    </div>
                    <div className="font-semibold text-xs text-slate-800">{msg.subject}</div>
                    <p className="text-xs text-slate-600">{msg.message}</p>
                    <div className="text-[10px] text-slate-400">{new Date(msg.submittedAt || msg.createdAt).toLocaleString()}</div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <button
                      onClick={() => handleDeleteMessage(msg.id)}
                      className="p-2 text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
                      title="Delete from contactMessages.json"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 4: ANNOUNCEMENT TICKER */}
      {activeTab === 'announcement' && (
        <form onSubmit={handleSaveAnnouncement} className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-5 max-w-2xl">
          <h3 className="text-base font-bold text-slate-900">Header Notification Bar</h3>
          
          <div className="space-y-1.5 text-xs">
            <label className="font-bold text-slate-700">Badge Text</label>
            <input
              type="text"
              value={announcementBadge}
              onChange={e => setAnnouncementBadge(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
            />
          </div>

          <div className="space-y-1.5 text-xs">
            <label className="font-bold text-slate-700">Ticker Message</label>
            <textarea
              rows={3}
              value={announcementText}
              onChange={e => setAnnouncementText(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
            />
          </div>

          <div className="flex items-center gap-2 text-xs">
            <input
              type="checkbox"
              id="ann-enabled"
              checked={announcementEnabled}
              onChange={e => setAnnouncementEnabled(e.target.checked)}
              className="w-4 h-4 text-indigo-600 rounded"
            />
            <label htmlFor="ann-enabled" className="font-medium text-slate-700">Enable Announcement Banner</label>
          </div>

          <button
            type="submit"
            className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
          >
            Save Announcement
          </button>
        </form>
      )}

      {/* TAB 5: JSON BACKUPS & RESTORE */}
      {activeTab === 'backups' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Database className="w-4 h-4 text-indigo-600" />
                  <span>JSON File Storage Snapshots</span>
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Create point-in-time full backups of all JSON files in <code className="bg-slate-100 px-1.5 py-0.5 rounded text-indigo-600 font-mono">backend/backups/</code>.
                </p>
              </div>

              <button
                onClick={handleCreateBackup}
                disabled={creatingBackup}
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center gap-2 cursor-pointer self-start sm:self-auto"
              >
                <Database className="w-4 h-4" />
                <span>{creatingBackup ? 'Archiving Database...' : 'Create Snapshot Backup'}</span>
              </button>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Available Database Backups ({backupsList.length})
            </h4>

            {backupsList.length === 0 ? (
              <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-12 text-center space-y-2">
                <Database className="w-8 h-8 text-slate-300 mx-auto" />
                <div className="text-xs font-bold text-slate-700">No backup snapshots yet</div>
                <div className="text-[11px] text-slate-400">Click "Create Snapshot Backup" above to generate a full restore point.</div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-slate-200 divide-y divide-slate-100 overflow-hidden shadow-xs">
                {backupsList.map((b) => (
                  <div key={b.backupId} className="p-4 flex items-center justify-between gap-4">
                    <div className="space-y-0.5">
                      <div className="font-mono font-bold text-xs text-slate-900">{b.filename}</div>
                      <div className="text-[10px] text-slate-400 font-mono">
                        {(b.sizeBytes / 1024).toFixed(2)} KB • {new Date(b.createdAt).toLocaleString()}
                      </div>
                    </div>

                    <button
                      onClick={() => handleRestoreBackup(b.filename)}
                      className="px-3 py-1.5 bg-slate-100 hover:bg-indigo-50 text-indigo-700 hover:text-indigo-800 text-xs font-bold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Restore</span>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* EDIT / ADD SCHOLARSHIP MODAL */}
      {isModalOpen && editingScholarship && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl border border-slate-200 max-w-3xl w-full p-6 sm:p-8 space-y-5 my-8 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">
                {editingScholarship.id ? 'Edit Scholarship Opportunity' : 'Publish New Verified Scholarship'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveScholarship} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Scholarship Title</label>
                  <input
                    type="text"
                    required
                    value={editingScholarship.title || ''}
                    onChange={e => setEditingScholarship({ ...editingScholarship, title: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Funding Provider / Organization</label>
                  <input
                    type="text"
                    required
                    value={editingScholarship.organization || ''}
                    onChange={e => setEditingScholarship({ ...editingScholarship, organization: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Destination Country</label>
                  <input
                    type="text"
                    required
                    value={editingScholarship.country || ''}
                    onChange={e => setEditingScholarship({ ...editingScholarship, country: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Application Deadline (YYYY-MM-DD)</label>
                  <input
                    type="date"
                    required
                    value={editingScholarship.deadline || ''}
                    onChange={e => setEditingScholarship({ ...editingScholarship, deadline: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Funding Type</label>
                  <select
                    value={editingScholarship.fundingType || 'Fully Funded'}
                    onChange={e => setEditingScholarship({ ...editingScholarship, fundingType: e.target.value as FundingType })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  >
                    <option value="Fully Funded">Fully Funded</option>
                    <option value="Partial Funding">Partial Funding</option>
                    <option value="Tuition Waiver">Tuition Waiver</option>
                    <option value="Stipend Only">Stipend Only</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Official Application URL</label>
                  <input
                    type="url"
                    required
                    value={editingScholarship.applicationUrl || ''}
                    onChange={e => setEditingScholarship({ ...editingScholarship, applicationUrl: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Short Summary Description</label>
                <textarea
                  rows={2}
                  value={editingScholarship.description || ''}
                  onChange={e => setEditingScholarship({ ...editingScholarship, description: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-xs cursor-pointer"
                >
                  Save to scholarships.json
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
