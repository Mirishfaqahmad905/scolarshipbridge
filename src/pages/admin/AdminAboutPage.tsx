import React, { useState, useEffect } from 'react';
import { Save, Plus, Trash2, Users, Target, Eye, Sparkles, CheckCircle2 } from 'lucide-react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { RichTextEditor } from '../../components/admin/RichTextEditor';
import { Base64Uploader } from '../../components/admin/Base64Uploader';
import { scholarshipApi } from '../../services/api';
import { useApp } from '../../context/AppContext';

export const AdminAboutPage: React.FC = () => {
  const { addToast } = useApp();
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [formData, setFormData] = useState<any>({
    title: 'Empowering Global Scholars Across the World',
    subtitle: 'Connecting ambitious students with fully funded university scholarships, research fellowships, and study abroad grants.',
    mission: 'To democratize access to world-class higher education by publishing verified, transparent, and comprehensive scholarship guides without paywalls.',
    vision: 'A world where academic brilliance and potential are never limited by financial boundaries or geography.',
    whyChooseUs: [
      '100% Verified official university & embassy links',
      'Detailed IELTS waiver & English requirement analysis',
      'Step-by-step motivation letter and research proposal guides',
      'Timely deadline tracking and daily opportunity updates'
    ],
    teamMembers: [
      {
        name: 'Dr. Sarah Jenkins',
        role: 'Founder & Senior Education Advisor',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
        bio: 'Former Fulbright scholar and admissions panelist with 12+ years advising international applicants.'
      },
      {
        name: 'Marcus Vance',
        role: 'Head of Global Research',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
        bio: 'Chevening alumnus researching European Union and Commonwealth grant frameworks.'
      }
    ],
    stats: [
      { label: 'Scholarships Indexed', value: '12,500+' },
      { label: 'Students Funded', value: '45,000+' },
      { label: 'Host Countries', value: '85+' },
      { label: 'Verified Partners', value: '250+' }
    ],
    heroImage: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80',
    metaTitle: 'About Us | ScholarshipBride International Foundation',
    metaDescription: 'Learn about ScholarshipBride, our mission to democratize higher education, and our editorial team of international scholarship advisors.'
  });

  const loadData = async () => {
    try {
      setIsLoading(true);
      const data = await scholarshipApi.admin.getAboutContent();
      if (data && Object.keys(data).length > 0) {
        setFormData(data);
      }
    } catch (err) {
      // silent
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleAddTeamMember = () => {
    setFormData({
      ...formData,
      teamMembers: [
        ...(formData.teamMembers || []),
        {
          name: 'New Advisor Name',
          role: 'Scholarship Consultant',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
          bio: 'Advising students on international scholarship opportunities.'
        }
      ]
    });
  };

  const handleUpdateTeamMember = (index: number, field: string, value: string) => {
    const updated = [...(formData.teamMembers || [])];
    updated[index] = { ...updated[index], [field]: value };
    setFormData({ ...formData, teamMembers: updated });
  };

  const handleRemoveTeamMember = (index: number) => {
    const updated = (formData.teamMembers || []).filter((_: any, i: number) => i !== index);
    setFormData({ ...formData, teamMembers: updated });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSaving(true);
      await scholarshipApi.admin.updateAboutContent(formData);
      addToast({
        type: 'success',
        title: 'About Content Saved',
        message: 'Updated about.json successfully.'
      });
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Save Error',
        message: 'Failed to update about.json.'
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <AdminLayout
      title="About Us CMS Manager"
      subtitle="Edit mission statements, editorial team profiles, and statistics in about.json"
    >
      <form onSubmit={handleSave} className="space-y-6 max-w-5xl">
        <div className="flex items-center justify-between p-4 bg-white rounded-3xl border border-slate-200 shadow-xs">
          <div>
            <h3 className="text-sm font-bold text-slate-900">About Page Editor</h3>
            <p className="text-xs text-slate-500">Live content automatically renders at /about</p>
          </div>
          <button
            type="submit"
            disabled={isSaving}
            className="inline-flex items-center gap-2 px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-md transition-all cursor-pointer disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{isSaving ? 'Saving Changes...' : 'Save About Page'}</span>
          </button>
        </div>

        {/* Hero Section */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <h4 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">
            Hero Header & Branding
          </h4>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                Main Headline
              </label>
              <input
                type="text"
                value={formData.title || ''}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 outline-none text-sm"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                Subtitle Description
              </label>
              <textarea
                rows={2}
                value={formData.subtitle || ''}
                onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 outline-none"
              />
            </div>

            <Base64Uploader
              label="Hero Banner Image (Base64)"
              value={formData.heroImage || ''}
              onChange={(b64) => setFormData({ ...formData, heroImage: b64 })}
            />
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <h4 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">
            Mission & Vision Statements
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                Our Mission
              </label>
              <textarea
                rows={4}
                value={formData.mission || ''}
                onChange={(e) => setFormData({ ...formData, mission: e.target.value })}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                Our Vision
              </label>
              <textarea
                rows={4}
                value={formData.vision || ''}
                onChange={(e) => setFormData({ ...formData, vision: e.target.value })}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 outline-none"
              />
            </div>
          </div>
        </div>

        {/* Team Members */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <h4 className="text-sm font-bold text-slate-900">Advisory Team & Leadership</h4>
            <button
              type="button"
              onClick={handleAddTeamMember}
              className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 hover:text-indigo-800 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Team Member</span>
            </button>
          </div>

          <div className="space-y-4">
            {(formData.teamMembers || []).map((m: any, idx: number) => (
              <div key={idx} className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-800">Member #{idx + 1}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveTeamMember(idx)}
                    className="p-1 text-rose-600 hover:text-rose-800 hover:bg-rose-50 rounded-lg cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-600 mb-1">Full Name</label>
                    <input
                      type="text"
                      value={m.name || ''}
                      onChange={(e) => handleUpdateTeamMember(idx, 'name', e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-600 mb-1">Role / Title</label>
                    <input
                      type="text"
                      value={m.role || ''}
                      onChange={(e) => handleUpdateTeamMember(idx, 'role', e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-600 mb-1">Short Biography</label>
                  <textarea
                    rows={2}
                    value={m.bio || ''}
                    onChange={(e) => handleUpdateTeamMember(idx, 'bio', e.target.value)}
                    className="w-full p-2.5 bg-white border border-slate-200 rounded-xl outline-none"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </form>
    </AdminLayout>
  );
};
