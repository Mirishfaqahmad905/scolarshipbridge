import React, { useState, useEffect } from 'react';
import { Search, RefreshCw, Activity, Shield, Clock, User, Filter } from 'lucide-react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { scholarshipApi } from '../../services/api';
import { useApp } from '../../context/AppContext';

export const AdminAuditLogsPage: React.FC = () => {
  const { addToast } = useApp();

  const [logs, setLogs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [actionFilter, setActionFilter] = useState('all');

  const loadLogs = async () => {
    try {
      setIsLoading(true);
      const list = await scholarshipApi.admin.getAuditLogs();
      setLogs(list);
    } catch (err) {
      addToast({ type: 'error', title: 'Error', message: 'Failed to load audit logs from auditLogs.json.' });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadLogs();
  }, []);

  const filtered = logs.filter((log) => {
    if (actionFilter !== 'all' && !log.action?.toLowerCase().includes(actionFilter.toLowerCase())) return false;
    if (search) {
      const q = search.toLowerCase();
      return (
        log.admin?.toLowerCase().includes(q) ||
        log.action?.toLowerCase().includes(q) ||
        log.resource?.toLowerCase().includes(q) ||
        log.resourceId?.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <AdminLayout
      title="System Audit Trail & Activity Logs"
      subtitle="Immutable record of administrative logins, content mutations, and database actions in auditLogs.json"
    >
      <div className="space-y-6">
        <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search audit trail by admin user, resource ID, or action..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:bg-white outline-none"
            />
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            <select
              value={actionFilter}
              onChange={(e) => setActionFilter(e.target.value)}
              className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-700 outline-none cursor-pointer"
            >
              <option value="all">All Actions ({logs.length})</option>
              <option value="CREATE">Create Operations</option>
              <option value="UPDATE">Update Operations</option>
              <option value="DELETE">Delete Operations</option>
              <option value="LOGIN">Admin Logins</option>
              <option value="BACKUP">Database Backups</option>
            </select>

            <button
              onClick={loadLogs}
              className="p-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-600 rounded-xl transition-colors cursor-pointer"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        {/* Logs Table */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                <th className="py-3.5 px-6">Timestamp</th>
                <th className="py-3.5 px-4">Admin User</th>
                <th className="py-3.5 px-4">Action</th>
                <th className="py-3.5 px-4">Resource Target</th>
                <th className="py-3.5 px-4">IP / Origin</th>
                <th className="py-3.5 px-6 text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-400">
                    Loading audit trail from auditLogs.json...
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-400">
                    No activity logs recorded.
                  </td>
                </tr>
              ) : (
                filtered.map((log, idx) => (
                  <tr key={log.id || idx} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3.5 px-6 font-mono text-[11px] text-slate-500">
                      {log.timestamp || 'Recently'}
                    </td>
                    <td className="py-3.5 px-4 font-bold text-slate-900 flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-slate-900 text-amber-400 flex items-center justify-center text-[10px] font-black">
                        {log.admin?.charAt(0).toUpperCase() || 'A'}
                      </div>
                      <span>{log.admin || 'admin'}</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase ${
                        log.action?.includes('DELETE') ? 'bg-rose-100 text-rose-800' :
                        log.action?.includes('CREATE') ? 'bg-emerald-100 text-emerald-800' :
                        log.action?.includes('LOGIN') ? 'bg-purple-100 text-purple-800' :
                        log.action?.includes('BACKUP') ? 'bg-amber-100 text-amber-900' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {log.action}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-700 font-medium">
                      <span className="capitalize">{log.resource}</span>
                      {log.resourceId && (
                        <span className="block text-[10px] font-mono text-slate-400 truncate max-w-[140px]">
                          ID: {log.resourceId}
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-slate-400 font-mono text-[11px]">
                      {log.ip || '127.0.0.1'}
                    </td>
                    <td className="py-3.5 px-6 text-right text-slate-500 text-[11px] max-w-xs truncate">
                      {log.details || log.action}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};
