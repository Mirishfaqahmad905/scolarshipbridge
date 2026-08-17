import React, { useState, useEffect } from 'react';
import { 
  Download, 
  Upload, 
  Database, 
  ShieldCheck, 
  HardDrive, 
  RefreshCw, 
  CheckCircle2, 
  AlertTriangle,
  Clock,
  Trash2,
  FileJson
} from 'lucide-react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { scholarshipApi } from '../../services/api';
import { useApp } from '../../context/AppContext';

export const AdminBackupsPage: React.FC = () => {
  const { addToast } = useApp();
  const [isBackingUp, setIsBackingUp] = useState(false);
  const [isRestoring, setIsRestoring] = useState(false);
  const [backups, setBackups] = useState<any[]>([
    {
      id: 'snapshot-latest',
      filename: 'scholarshipbride-database-snapshot-latest.json',
      createdAt: new Date().toISOString(),
      size: '2.4 MB',
      totalRecords: 142,
      type: 'Full System Snapshot'
    }
  ]);

  const handleDownloadBackup = async () => {
    try {
      setIsBackingUp(true);
      const data = await scholarshipApi.admin.exportFullBackup();
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `scholarshipbride-backup-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      addToast({
        type: 'success',
        title: 'Backup Downloaded',
        message: 'All JSON database collections downloaded successfully.'
      });
    } catch (err) {
      addToast({ type: 'error', title: 'Error', message: 'Failed to generate JSON snapshot backup.' });
    } finally {
      setIsBackingUp(false);
    }
  };

  const handleRestoreFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!confirm('WARNING: Restoring will overwrite existing JSON files with the backup snapshot. Continue?')) {
      e.target.value = '';
      return;
    }

    try {
      setIsRestoring(true);
      const text = await file.text();
      const parsed = JSON.parse(text);
      await scholarshipApi.admin.restoreFullBackup(parsed);
      addToast({
        type: 'success',
        title: 'Restore Completed',
        message: 'All JSON files successfully restored to snapshot state.'
      });
    } catch (err) {
      addToast({ type: 'error', title: 'Restore Failed', message: 'Invalid JSON snapshot backup file.' });
    } finally {
      setIsRestoring(false);
      e.target.value = '';
    }
  };

  return (
    <AdminLayout
      title="Database Snapshots & Disaster Recovery"
      subtitle="Export and restore full JSON database snapshots for complete data protection and site migrations"
    >
      <div className="space-y-6 max-w-5xl">
        {/* Top Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Export Card */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-700 flex items-center justify-center">
              <Download className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Export Full JSON Snapshot</h3>
              <p className="text-xs text-slate-500 leading-relaxed mt-1">
                Packages all scholarships, posts, universities, countries, categories, CMS pages, ads, and media into a consolidated JSON archive file.
              </p>
            </div>
            <button
              onClick={handleDownloadBackup}
              disabled={isBackingUp}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-md cursor-pointer disabled:opacity-50"
            >
              <Download className="w-4 h-4" />
              <span>{isBackingUp ? 'Generating Snapshot...' : 'Download Full Backup (.json)'}</span>
            </button>
          </div>

          {/* Import / Restore Card */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center">
              <Upload className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Restore Snapshot Backup</h3>
              <p className="text-xs text-slate-500 leading-relaxed mt-1">
                Upload a valid JSON backup file to overwrite and synchronize all platform collections on the backend.
              </p>
            </div>
            <label className="inline-flex items-center gap-2 px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-md cursor-pointer">
              <Upload className="w-4 h-4" />
              <span>{isRestoring ? 'Restoring Database...' : 'Select Snapshot File to Restore'}</span>
              <input
                type="file"
                accept=".json"
                onChange={handleRestoreFile}
                className="hidden"
                disabled={isRestoring}
              />
            </label>
          </div>
        </div>

        {/* Database Collections Table */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Active Storage Collections (/backend/data/*.json)
            </h4>
            <span className="text-xs font-mono text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full font-bold">
              100% JSON Engine (No MongoDB)
            </span>
          </div>

          <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
            {[
              { name: 'scholarships.json', desc: 'Grants & Fellowships' },
              { name: 'posts.json', desc: 'Guides & Articles' },
              { name: 'universities.json', desc: 'Institutions' },
              { name: 'countries.json', desc: 'Study Destinations' },
              { name: 'categories.json', desc: 'Field Classifications' },
              { name: 'pages.json', desc: 'Legal & Static CMS' },
              { name: 'about.json', desc: 'About & Team Data' },
              { name: 'contact.json', desc: 'Office & Support Details' },
              { name: 'contactMessages.json', desc: 'Student Inquiries' },
              { name: 'media.json', desc: 'Base64 Encoded Files' },
              { name: 'socialMedia.json', desc: '11 Social Channels' },
              { name: 'homepage.json', desc: 'Hero & Sections CMS' },
              { name: 'navigation.json', desc: 'Header & Footer Menus' },
              { name: 'seo.json', desc: 'Search Meta & Robots' },
              { name: 'ads.json', desc: 'Monetization Units' },
              { name: 'users.json', desc: 'Admin RBAC Accounts' }
            ].map((col) => (
              <div key={col.name} className="p-3 bg-slate-50 border border-slate-100 rounded-2xl space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-slate-900 font-mono text-[11px]">
                  <FileJson className="w-3.5 h-3.5 text-indigo-600" />
                  <span>{col.name}</span>
                </div>
                <p className="text-[10px] text-slate-400">{col.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};
