import React, { useState, useEffect } from 'react';
import { 
  Save, 
  Plus, 
  Trash2, 
  Share2, 
  Check, 
  ArrowUp, 
  ArrowDown, 
  Globe, 
  ExternalLink,
  MessageCircle,
  Video,
  Send
} from 'lucide-react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { scholarshipApi } from '../../services/api';
import { useApp } from '../../context/AppContext';

export const AdminSocialMediaPage: React.FC = () => {
  const { addToast } = useApp();
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [socialLinks, setSocialLinks] = useState<any[]>([]);

  const defaultPlatforms = [
    { platform: 'telegram', label: 'Telegram Community Channel', url: 'https://t.me/scholarshipbride', enabled: true, placements: ['header', 'footer', 'sidebar'] },
    { platform: 'whatsapp', label: 'WhatsApp Alerts Group', url: 'https://chat.whatsapp.com/scholarshipbride', enabled: true, placements: ['header', 'footer', 'sidebar'] },
    { platform: 'facebook', label: 'Facebook Page & Group', url: 'https://facebook.com/scholarshipbride', enabled: true, placements: ['footer'] },
    { platform: 'twitter', label: 'X (formerly Twitter)', url: 'https://x.com/scholarshipbride', enabled: true, placements: ['footer'] },
    { platform: 'linkedin', label: 'LinkedIn Company Hub', url: 'https://linkedin.com/company/scholarshipbride', enabled: true, placements: ['footer'] },
    { platform: 'instagram', label: 'Instagram Study Reels', url: 'https://instagram.com/scholarshipbride', enabled: true, placements: ['footer'] },
    { platform: 'youtube', label: 'YouTube Admissions TV', url: 'https://youtube.com/@scholarshipbride', enabled: true, placements: ['footer'] },
    { platform: 'tiktok', label: 'TikTok Quick Tips', url: 'https://tiktok.com/@scholarshipbride', enabled: false, placements: ['footer'] },
    { platform: 'pinterest', label: 'Pinterest Infographics', url: 'https://pinterest.com/scholarshipbride', enabled: false, placements: ['footer'] },
    { platform: 'reddit', label: 'Reddit r/ScholarshipBride', url: 'https://reddit.com/r/scholarships', enabled: false, placements: ['footer'] },
    { platform: 'threads', label: 'Threads Community', url: 'https://threads.net/@scholarshipbride', enabled: false, placements: ['footer'] }
  ];

  const loadData = async () => {
    try {
      setIsLoading(true);
      const data = await scholarshipApi.admin.getSocialMedia();
      if (Array.isArray(data) && data.length > 0) {
        setSocialLinks(data);
      } else {
        setSocialLinks(defaultPlatforms);
      }
    } catch (err) {
      setSocialLinks(defaultPlatforms);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleTogglePlacement = (index: number, placement: string) => {
    const updated = [...socialLinks];
    const currentPlacements = updated[index].placements || [];
    if (currentPlacements.includes(placement)) {
      updated[index].placements = currentPlacements.filter((p: string) => p !== placement);
    } else {
      updated[index].placements = [...currentPlacements, placement];
    }
    setSocialLinks(updated);
  };

  const handleMove = (index: number, direction: 'up' | 'down') => {
    const updated = [...socialLinks];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= updated.length) return;
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;
    setSocialLinks(updated);
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      await scholarshipApi.admin.updateSocialMedia(socialLinks);
      addToast({
        type: 'success',
        title: 'Social Links Saved',
        message: 'Persisted 11 platforms into socialMedia.json.'
      });
    } catch (err) {
      addToast({ type: 'error', title: 'Error', message: 'Failed to update socialMedia.json.' });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <AdminLayout
      title="Social Media & Community Channels"
      subtitle="Configure Telegram, WhatsApp, YouTube, and 11 community link placements in socialMedia.json"
    >
      <div className="space-y-6 max-w-5xl">
        <div className="flex items-center justify-between p-4 bg-white rounded-3xl border border-slate-200 shadow-xs">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Community Links & Placements</h3>
            <p className="text-xs text-slate-500">Configure where social buttons display (Header, Footer, Sidebar, Floating)</p>
          </div>
          <button
            type="button"
            onClick={handleSave}
            disabled={isSaving}
            className="inline-flex items-center gap-2 px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-md cursor-pointer disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{isSaving ? 'Saving...' : 'Save Social Channels'}</span>
          </button>
        </div>

        {/* Social Links List */}
        <div className="space-y-3">
          {socialLinks.map((item, idx) => (
            <div
              key={item.platform}
              className={`p-4 rounded-3xl border transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs ${
                item.enabled ? 'bg-white border-slate-200 shadow-xs' : 'bg-slate-50 border-slate-200 opacity-60'
              }`}
            >
              <div className="flex items-center gap-3 min-w-[200px]">
                <div className="flex flex-col gap-0.5">
                  <button
                    onClick={() => handleMove(idx, 'up')}
                    disabled={idx === 0}
                    className="p-1 hover:bg-slate-100 rounded text-slate-400 hover:text-slate-700 disabled:opacity-20 cursor-pointer"
                  >
                    <ArrowUp className="w-3 h-3" />
                  </button>
                  <button
                    onClick={() => handleMove(idx, 'down')}
                    disabled={idx === socialLinks.length - 1}
                    className="p-1 hover:bg-slate-100 rounded text-slate-400 hover:text-slate-700 disabled:opacity-20 cursor-pointer"
                  >
                    <ArrowDown className="w-3 h-3" />
                  </button>
                </div>

                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 capitalize">{item.platform}</span>
                    {item.enabled ? (
                      <span className="px-2 py-0.2 bg-emerald-100 text-emerald-800 rounded-full text-[9px] font-bold">Active</span>
                    ) : (
                      <span className="px-2 py-0.2 bg-slate-200 text-slate-600 rounded-full text-[9px] font-bold">Disabled</span>
                    )}
                  </div>
                  <span className="text-[11px] text-slate-400">{item.label}</span>
                </div>
              </div>

              <div className="flex-1">
                <input
                  type="url"
                  value={item.url || ''}
                  onChange={(e) => {
                    const updated = [...socialLinks];
                    updated[idx].url = e.target.value;
                    setSocialLinks(updated);
                  }}
                  placeholder="https://"
                  className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl font-mono text-[11px] outline-none"
                />
              </div>

              {/* Placements checkboxes */}
              <div className="flex flex-wrap items-center gap-2">
                {['header', 'footer', 'sidebar'].map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => handleTogglePlacement(idx, p)}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase transition-colors cursor-pointer ${
                      item.placements?.includes(p)
                        ? 'bg-indigo-100 text-indigo-800'
                        : 'bg-slate-100 text-slate-400 hover:text-slate-600'
                    }`}
                  >
                    {p}
                  </button>
                ))}

                <button
                  type="button"
                  onClick={() => {
                    const updated = [...socialLinks];
                    updated[idx].enabled = !updated[idx].enabled;
                    setSocialLinks(updated);
                  }}
                  className={`px-3 py-1 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                    item.enabled ? 'bg-slate-100 text-slate-700 hover:bg-slate-200' : 'bg-emerald-600 text-white'
                  }`}
                >
                  {item.enabled ? 'Disable' : 'Enable'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};
