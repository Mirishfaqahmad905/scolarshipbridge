import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Plus, 
  Trash2, 
  Edit3, 
  Sparkles, 
  CheckCircle2, 
  Users, 
  MessageSquare, 
  Megaphone, 
  Search,
  ExternalLink,
  Save,
  X
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Scholarship, OpportunityCategory, DegreeLevel, FundingType } from '../types';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';

export const AdminDashboardPage: React.FC = () => {
  const { 
    scholarships, 
    addScholarship, 
    updateScholarship, 
    deleteScholarship, 
    toggleFeatured, 
    announcement, 
    updateAnnouncement,
    addToast 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'scholarships' | 'announcement' | 'subscribers'>('scholarships');
  const [editingScholarship, setEditingScholarship] = useState<Partial<Scholarship> | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Announcement form local state
  const [announcementText, setAnnouncementText] = useState(announcement.text);
  const [announcementEnabled, setAnnouncementEnabled] = useState(announcement.enabled);
  const [announcementBadge, setAnnouncementBadge] = useState(announcement.badge || 'LATEST INTAKES 2026/2027');

  const filteredScholarships = scholarships.filter(s =>
    s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
      fullOverview: 'Comprehensive scholarship program covering full tuition, living stipends, health insurance, and international travel for international candidates.',
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

  const handleSaveScholarship = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingScholarship?.title) return;

    const slug = editingScholarship.slug || editingScholarship.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const scholarshipData = {
      ...editingScholarship,
      slug,
      id: editingScholarship.id || `sch-${Date.now()}`
    } as Scholarship;

    if (editingScholarship.id) {
      updateScholarship(scholarshipData);
      addToast({ type: 'success', title: 'Updated', message: 'Scholarship updated successfully.' });
    } else {
      addScholarship(scholarshipData);
      addToast({ type: 'success', title: 'Created', message: 'New scholarship published to directory.' });
    }

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
    addToast({ type: 'success', title: 'Ticker Saved', message: 'Top announcement bar updated live.' });
  };

  return (
    <div id="admin-management-center" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8 pb-24">
      
      <Breadcrumbs items={[{ label: 'Admin Management Desk' }]} />

      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-amber-300 mb-1">
            <ShieldCheck className="w-4 h-4" />
            <span>ScholarBridge Editorial & Portal Admin</span>
          </div>
          <h1 className="text-2xl font-black text-white">Content & Verification Management</h1>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Publish New Scholarship</span>
        </button>
      </div>

      {/* Tab Selector */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3 text-xs font-bold">
        <button
          onClick={() => setActiveTab('scholarships')}
          className={`px-4 py-2 rounded-xl transition-colors ${
            activeTab === 'scholarships' ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Scholarships Directory ({scholarships.length})
        </button>
        <button
          onClick={() => setActiveTab('announcement')}
          className={`px-4 py-2 rounded-xl transition-colors ${
            activeTab === 'announcement' ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Top Announcement Ticker
        </button>
      </div>

      {/* Tab 1: Scholarships Management */}
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
            <span className="text-xs text-slate-500 font-semibold">{filteredScholarships.length} entries</span>
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
                          onClick={() => toggleFeatured(s.id)}
                          className={`p-1.5 rounded-lg border text-xs transition-colors ${
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
                          className="p-1.5 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Delete "${s.title}"?`)) {
                              deleteScholarship(s.id);
                              addToast({ type: 'info', title: 'Deleted', message: 'Scholarship removed.' });
                            }
                          }}
                          className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                          title="Delete"
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

      {/* Tab 2: Announcement Ticker */}
      {activeTab === 'announcement' && (
        <form onSubmit={handleSaveAnnouncement} className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-5 max-w-2xl">
          <h3 className="text-base font-bold text-slate-900">Live Header Notification Bar</h3>
          
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
            className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
          >
            Save Announcement
          </button>
        </form>
      )}

      {/* Edit / Add Modal */}
      {isModalOpen && editingScholarship && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl border border-slate-200 max-w-3xl w-full p-6 sm:p-8 space-y-5 my-8 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">
                {editingScholarship.id ? 'Edit Scholarship Opportunity' : 'Publish New Verified Scholarship'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
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
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-xs"
                >
                  Save Scholarship
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
