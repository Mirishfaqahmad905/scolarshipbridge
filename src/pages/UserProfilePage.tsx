import React, { useState } from 'react';
import { User, Bell, GraduationCap, Globe2, Sparkles, CheckCircle2, ShieldCheck, Bookmark } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';

export const UserProfilePage: React.FC = () => {
  const { user, updateUserProfile, addToast, bookmarks } = useApp();
  
  const [formData, setFormData] = useState({
    name: user?.name || 'Alex Morgan',
    email: user?.email || 'alex.scholar@gmail.com',
    targetDegree: user?.targetDegree || 'Master',
    country: user?.country || 'Germany',
    notificationsEnabled: user?.notificationsEnabled ?? true
  });

  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile(formData);
    setSaved(true);
    addToast({
      type: 'success',
      title: 'Profile Updated',
      message: 'Your study preferences and scholarship alert settings have been saved.'
    });
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div id="user-profile-page" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8 pb-20">
      
      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ label: 'Student Profile & Preferences' }]} />

      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-800 via-indigo-900 to-slate-900 rounded-3xl p-6 sm:p-10 text-white shadow-sm flex items-center gap-5">
        <div className="w-16 h-16 rounded-2xl bg-indigo-500/30 border border-indigo-400/40 flex items-center justify-center text-2xl font-black text-white shrink-0">
          {formData.name.charAt(0)}
        </div>
        <div className="space-y-1">
          <h1 className="text-xl sm:text-2xl font-black text-white">{formData.name}</h1>
          <p className="text-xs sm:text-sm text-indigo-200">{formData.email}</p>
          <span className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[11px] font-semibold border border-emerald-400/30">
            Student Member (Free Tier)
          </span>
        </div>
      </div>

      {/* Form Container */}
      <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
        <h2 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
          <GraduationCap className="w-5 h-5 text-indigo-600" />
          <span>Study Abroad Criteria & Notification Preferences</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs">
          <div className="space-y-1.5">
            <label className="font-bold text-slate-700 uppercase tracking-wider block">Full Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-900 outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="font-bold text-slate-700 uppercase tracking-wider block">Email Address</label>
            <input
              type="email"
              value={formData.email}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-900 outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="font-bold text-slate-700 uppercase tracking-wider block">Target Degree Level</label>
            <select
              value={formData.targetDegree}
              onChange={e => setFormData({ ...formData, targetDegree: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-900 outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500"
            >
              <option value="Bachelor">Bachelor / Undergraduate</option>
              <option value="Master">Master’s Degree</option>
              <option value="PhD">PhD / Doctorate</option>
              <option value="Postdoc">Postdoctoral Research</option>
              <option value="Internship">Internship / Exchange</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="font-bold text-slate-700 uppercase tracking-wider block">Primary Target Country</label>
            <select
              value={formData.country}
              onChange={e => setFormData({ ...formData, country: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-900 outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500"
            >
              <option value="Germany">Germany (Tuition Free)</option>
              <option value="United Kingdom">United Kingdom</option>
              <option value="United States">United States</option>
              <option value="Canada">Canada</option>
              <option value="Japan">Japan</option>
              <option value="Australia">Australia</option>
              <option value="Any">Worldwide (Open)</option>
            </select>
          </div>
        </div>

        {/* Notifications Toggle */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900">Deadline Notification Alerts</h4>
              <p className="text-[11px] text-slate-500">Receive email alerts 14 days before saved scholarship deadlines close.</p>
            </div>
          </div>
          <input
            type="checkbox"
            checked={formData.notificationsEnabled}
            onChange={e => setFormData({ ...formData, notificationsEnabled: e.target.checked })}
            className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500 cursor-pointer"
          />
        </div>

        <div className="pt-4 border-t border-slate-100 flex justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-2"
          >
            {saved && <CheckCircle2 className="w-4 h-4 text-emerald-300" />}
            <span>Save Preferences</span>
          </button>
        </div>
      </form>

    </div>
  );
};
