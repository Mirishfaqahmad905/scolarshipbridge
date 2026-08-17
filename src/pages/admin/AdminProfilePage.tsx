import React, { useState, useEffect } from 'react';
import { Save, User, Lock, Shield, Mail, KeyRound, CheckCircle2 } from 'lucide-react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { scholarshipApi } from '../../services/api';
import { useApp } from '../../context/AppContext';

export const AdminProfilePage: React.FC = () => {
  const { addToast } = useApp();
  const [isSaving, setIsSaving] = useState(false);
  const [user, setUser] = useState<any>({
    username: 'mirishfaqahmad',
    name: 'Mir Ishfaq Ahmad',
    email: 'admin@scholarbridge.org',
    role: 'Super Admin'
  });

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    const raw = localStorage.getItem('scholarshipbride_admin_user');
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        setUser(parsed);
      } catch (e) {
        // silent
      }
    }
  }, []);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSaving(true);
      await scholarshipApi.admin.updateProfile({
        name: user.name,
        email: user.email
      });
      localStorage.setItem('scholarshipbride_admin_user', JSON.stringify(user));
      addToast({
        type: 'success',
        title: 'Profile Updated',
        message: 'Your administrator profile details have been saved.'
      });
    } catch (err) {
      addToast({ type: 'error', title: 'Error', message: 'Failed to update profile.' });
    } finally {
      setIsSaving(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword || newPassword !== confirmPassword) {
      addToast({ type: 'error', title: 'Mismatch', message: 'New passwords do not match.' });
      return;
    }

    try {
      setIsSaving(true);
      const res = await scholarshipApi.admin.changePassword({
        currentPassword,
        newPassword
      });

      if (res && res.success) {
        addToast({
          type: 'success',
          title: 'Password Changed',
          message: 'Your administrator credentials have been securely updated.'
        });
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        addToast({ type: 'error', title: 'Error', message: res.message || 'Incorrect current password.' });
      }
    } catch (err: any) {
      addToast({ type: 'error', title: 'Error', message: err.message || 'Failed to update password.' });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <AdminLayout
      title="Admin Profile & Security Credentials"
      subtitle="Manage your personal administrator account details and update your password"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl">
        {/* Profile Card */}
        <form onSubmit={handleUpdateProfile} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4 text-xs">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
            <div className="w-10 h-10 rounded-2xl bg-slate-900 text-amber-400 flex items-center justify-center font-bold text-base">
              {user.username?.charAt(0).toUpperCase() || 'A'}
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm">Account Information</h4>
              <p className="text-slate-400 text-[11px] font-mono">{user.role || 'Super Admin'}</p>
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
              Username (Immutable)
            </label>
            <input
              type="text"
              disabled
              value={user.username || ''}
              className="w-full px-3 py-2 bg-slate-100 border border-slate-200 rounded-xl text-slate-500 font-mono"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
              Full Display Name
            </label>
            <input
              type="text"
              value={user.name || ''}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-medium outline-none"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={user.email || ''}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-medium outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={isSaving}
            className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-md cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Save Profile Info</span>
          </button>
        </form>

        {/* Change Password Card */}
        <form onSubmit={handleChangePassword} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4 text-xs">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center">
              <KeyRound className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm">Security & Password</h4>
              <p className="text-slate-400 text-[11px]">Update your master login credentials</p>
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
              Current Password *
            </label>
            <input
              type="password"
              required
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono outline-none"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
              New Password *
            </label>
            <input
              type="password"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono outline-none"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
              Confirm New Password *
            </label>
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={isSaving}
            className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl shadow-md cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <Lock className="w-4 h-4" />
            <span>Update Credentials</span>
          </button>
        </form>
      </div>
    </AdminLayout>
  );
};
