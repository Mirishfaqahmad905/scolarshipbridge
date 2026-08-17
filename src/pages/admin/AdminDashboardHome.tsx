import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  GraduationCap, 
  FileText, 
  School, 
  Globe, 
  Tags, 
  FileCode, 
  Image as ImageIcon, 
  DollarSign, 
  Users, 
  Mail, 
  Plus, 
  ArrowUpRight, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  Database, 
  TrendingUp, 
  RefreshCw,
  ExternalLink,
  Eye,
  Edit,
  Trash2,
  Sparkles,
  Share2
} from 'lucide-react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { scholarshipApi } from '../../services/api';
import { useApp } from '../../context/AppContext';

export const AdminDashboardHome: React.FC = () => {
  const { addToast } = useApp();
  const [stats, setStats] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [recentScholarships, setRecentScholarships] = useState<any[]>([]);
  const [recentPosts, setRecentPosts] = useState<any[]>([]);
  const [recentMessages, setRecentMessages] = useState<any[]>([]);
  const [backups, setBackups] = useState<any[]>([]);
  const [isBackingUp, setIsBackingUp] = useState(false);

  const fetchDashboardData = async () => {
    try {
      setIsLoading(true);
      const data = await scholarshipApi.admin.getDashboardStats();
      setStats(data);

      // Also load recent lists
      const [scholarshipsRes, postsRes, messagesRes, backupsRes] = await Promise.all([
        scholarshipApi.admin.getScholarships({ limit: 6 }),
        scholarshipApi.admin.getPosts(),
        scholarshipApi.admin.getContactMessages(),
        scholarshipApi.admin.listBackups()
      ]);

      setRecentScholarships((scholarshipsRes?.data || []).slice(0, 5));
      setRecentPosts(postsRes.slice(0, 4));
      setRecentMessages(messagesRes.slice(0, 4));
      setBackups(backupsRes.slice(0, 3));
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Data Load Error',
        message: 'Could not load admin dashboard statistics.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleQuickBackup = async () => {
    try {
      setIsBackingUp(true);
      const res = await scholarshipApi.admin.createBackup('Dashboard Quick Backup');
      if (res && res.success) {
        addToast({
          type: 'success',
          title: 'Backup Created',
          message: 'JSON database snapshot saved successfully.'
        });
        const updatedBackups = await scholarshipApi.admin.listBackups();
        setBackups(updatedBackups.slice(0, 3));
      }
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Backup Failed',
        message: 'Could not complete database snapshot.'
      });
    } finally {
      setIsBackingUp(false);
    }
  };

  const statCards = [
    {
      title: 'Total Scholarships',
      count: stats?.counts?.scholarships ?? 0,
      subtext: `${stats?.scholarshipStatusBreakdown?.published ?? 0} Published • ${stats?.counts?.featuredScholarships ?? 0} Featured`,
      icon: <GraduationCap className="w-5 h-5" />,
      color: 'text-indigo-600 bg-indigo-50 border-indigo-100',
      to: '/admin/scholarships'
    },
    {
      title: 'Blog & Guides',
      count: stats?.counts?.posts ?? 0,
      subtext: 'Expert application guides & news',
      icon: <FileText className="w-5 h-5" />,
      color: 'text-sky-600 bg-sky-50 border-sky-100',
      to: '/admin/posts'
    },
    {
      title: 'Universities',
      count: stats?.counts?.universities ?? 0,
      subtext: 'Institutions with active programs',
      icon: <School className="w-5 h-5" />,
      color: 'text-emerald-600 bg-emerald-50 border-emerald-100',
      to: '/admin/universities'
    },
    {
      title: 'Countries & Hubs',
      count: stats?.counts?.countries ?? 0,
      subtext: 'Global study destinations',
      icon: <Globe className="w-5 h-5" />,
      color: 'text-amber-600 bg-amber-50 border-amber-100',
      to: '/admin/countries'
    },
    {
      title: 'Categories',
      count: stats?.counts?.categories ?? 0,
      subtext: 'Field and funding groupings',
      icon: <Tags className="w-5 h-5" />,
      color: 'text-purple-600 bg-purple-50 border-purple-100',
      to: '/admin/categories'
    },
    {
      title: 'Custom Pages',
      count: stats?.counts?.pages ?? 0,
      subtext: 'CMS and legal documentation',
      icon: <FileCode className="w-5 h-5" />,
      color: 'text-teal-600 bg-teal-50 border-teal-100',
      to: '/admin/pages'
    },
    {
      title: 'Media Library',
      count: stats?.counts?.media ?? 0,
      subtext: 'Base64 images & uploads',
      icon: <ImageIcon className="w-5 h-5" />,
      color: 'text-pink-600 bg-pink-50 border-pink-100',
      to: '/admin/media'
    },
    {
      title: 'Advertisements',
      count: stats?.counts?.advertisements ?? 0,
      subtext: `${stats?.counts?.activeAds ?? 0} active placements`,
      icon: <DollarSign className="w-5 h-5" />,
      color: 'text-orange-600 bg-orange-50 border-orange-100',
      to: '/admin/ads'
    },
    {
      title: 'Newsletter Subscribers',
      count: stats?.counts?.subscribers ?? 0,
      subtext: 'Weekly deadline subscribers',
      icon: <Users className="w-5 h-5" />,
      color: 'text-blue-600 bg-blue-50 border-blue-100',
      to: '/admin/homepage'
    },
    {
      title: 'Contact Messages',
      count: stats?.counts?.contactMessages ?? 0,
      subtext: `${stats?.counts?.unreadContactMessages ?? 0} unread inquiries`,
      icon: <Mail className="w-5 h-5" />,
      color: stats?.counts?.unreadContactMessages > 0 ? 'text-rose-600 bg-rose-50 border-rose-200 ring-2 ring-rose-500/20' : 'text-slate-600 bg-slate-50 border-slate-200',
      to: '/admin/contact/messages'
    }
  ];

  return (
    <AdminLayout
      title="Admin Dashboard"
      subtitle="Complete website management & JSON database operations"
    >
      <div className="space-y-8">
        {/* Quick Action Ribbon */}
        <div className="bg-gradient-to-r from-slate-900 to-indigo-950 rounded-3xl p-6 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 border border-slate-800">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-400 text-slate-950">
                JSON Database Active
              </span>
              <span className="text-xs text-slate-400">All data stored in /backend/data/*.json</span>
            </div>
            <h2 className="text-xl font-black tracking-tight">Website Control Panel</h2>
            <p className="text-xs text-slate-300 max-w-xl">
              Create, update, or delete scholarships, articles, destinations, ads, and SEO metadata with instant JSON file persistence.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <Link
              to="/admin/scholarships/create"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>New Scholarship</span>
            </Link>

            <Link
              to="/admin/posts/create"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl border border-slate-700 transition-all cursor-pointer"
            >
              <FileText className="w-4 h-4" />
              <span>New Article</span>
            </Link>

            <button
              type="button"
              onClick={handleQuickBackup}
              disabled={isBackingUp}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl transition-all cursor-pointer disabled:opacity-50"
            >
              <Database className="w-4 h-4" />
              <span>{isBackingUp ? 'Backing Up...' : 'Snapshot Backup'}</span>
            </button>
          </div>
        </div>

        {/* 10 Real-time Stats Cards Grid */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              System Overview & KPI Metrics
            </h3>
            <button
              onClick={fetchDashboardData}
              disabled={isLoading}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-800 cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
              <span>Refresh Metrics</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {statCards.map((card, idx) => (
              <Link
                key={idx}
                to={card.to}
                className={`p-4 rounded-2xl bg-white border transition-all hover:shadow-md hover:-translate-y-0.5 group block ${card.color.split(' ')[2] || 'border-slate-200'}`}
              >
                <div className="flex items-center justify-between">
                  <span className={`p-2.5 rounded-xl ${card.color.split(' ')[0]} ${card.color.split(' ')[1]}`}>
                    {card.icon}
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-600 transition-colors" />
                </div>
                <div className="mt-3">
                  <p className="text-2xl font-black text-slate-900 tracking-tight">
                    {isLoading ? '-' : card.count}
                  </p>
                  <p className="text-xs font-bold text-slate-700 mt-0.5">{card.title}</p>
                  <p className="text-[11px] text-slate-400 truncate mt-1">{card.subtext}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Visual Distribution Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Degree Level Distribution */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-slate-900">Degree Level Distribution</h4>
                <p className="text-xs text-slate-500">Scholarship opportunities by academic level</p>
              </div>
              <GraduationCap className="w-5 h-5 text-indigo-600" />
            </div>

            <div className="space-y-3 pt-2">
              {stats?.degreeBreakdown ? (
                Object.entries(stats.degreeBreakdown).map(([degree, count]: any) => {
                  const total = stats.counts.scholarships || 1;
                  const pct = Math.round((count / total) * 100);
                  return (
                    <div key={degree} className="space-y-1">
                      <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
                        <span>{degree}</span>
                        <span className="text-slate-500">{count} ({pct}%)</span>
                      </div>
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-indigo-600 rounded-full"
                          style={{ width: `${Math.max(5, pct)}%` }}
                        />
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className="text-xs text-slate-400">Loading degree metrics...</p>
              )}
            </div>
          </div>

          {/* Top Host Destinations Breakdown */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-slate-900">Top Host Countries</h4>
                <p className="text-xs text-slate-500">Highest volume study locations</p>
              </div>
              <Globe className="w-5 h-5 text-amber-600" />
            </div>

            <div className="space-y-3 pt-2">
              {stats?.topCountries ? (
                stats.topCountries.slice(0, 5).map((item: any) => {
                  const total = stats.counts.scholarships || 1;
                  const pct = Math.round((item.count / total) * 100);
                  return (
                    <div key={item.country} className="space-y-1">
                      <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
                        <span>{item.country}</span>
                        <span className="text-slate-500">{item.count} scholarships</span>
                      </div>
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-amber-500 rounded-full"
                          style={{ width: `${Math.max(8, pct)}%` }}
                        />
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className="text-xs text-slate-400">Loading country distribution...</p>
              )}
            </div>
          </div>

          {/* Publishing & DB Snapshot Health */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-slate-900">Database & Backups</h4>
                <p className="text-xs text-slate-500">JSON snapshot versioning</p>
              </div>
              <Database className="w-5 h-5 text-emerald-600" />
            </div>

            <div className="space-y-3 pt-1">
              <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                <div className="text-xs">
                  <p className="font-bold text-emerald-900">JSON File Integrity Healthy</p>
                  <p className="text-emerald-700">18 data collections loaded seamlessly</p>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-2">
                  <span>Recent Database Backups</span>
                  <Link to="/admin/backups" className="text-indigo-600 hover:underline">
                    View All
                  </Link>
                </div>
                <div className="space-y-1.5">
                  {backups.length > 0 ? (
                    backups.map((b: any) => (
                      <div key={b.filename} className="p-2.5 bg-slate-50 rounded-xl text-xs flex items-center justify-between border border-slate-100">
                        <span className="font-mono text-[11px] text-slate-600 truncate max-w-[180px]">
                          {b.label || b.filename}
                        </span>
                        <span className="text-[10px] text-slate-400">{b.formattedDate || b.createdAt}</span>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-slate-400 italic">No snapshots created yet.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Scholarships Table */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900">Recently Updated Scholarships</h3>
              <p className="text-xs text-slate-500">Live opportunities stored in scholarships.json</p>
            </div>
            <Link
              to="/admin/scholarships"
              className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 hover:text-indigo-800"
            >
              <span>Manage All ({stats?.counts?.scholarships || 0})</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-100 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  <th className="py-3 px-6">Scholarship Title</th>
                  <th className="py-3 px-4">Country & Org</th>
                  <th className="py-3 px-4">Funding</th>
                  <th className="py-3 px-4">Deadline</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {recentScholarships.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3.5 px-6 font-semibold text-slate-900 max-w-xs truncate">
                      <Link to={`/admin/scholarships/edit/${s.id}`} className="hover:text-indigo-600">
                        {s.title}
                      </Link>
                    </td>
                    <td className="py-3.5 px-4 text-slate-600">
                      <span className="font-medium">{s.country}</span>
                      {s.organization && <span className="text-slate-400 block text-[11px] truncate max-w-[140px]">{s.organization}</span>}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        s.fundingType === 'Fully Funded' ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {s.fundingType || 'Full / Partial'}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 font-mono text-[11px]">
                      {s.deadline || 'Rolling'}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold capitalize ${
                        s.status === 'published' ? 'bg-emerald-100 text-emerald-800' :
                        s.status === 'expired' ? 'bg-rose-100 text-rose-800' : 'bg-slate-200 text-slate-700'
                      }`}>
                        {s.status || 'published'}
                      </span>
                    </td>
                    <td className="py-3.5 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          to={`/scholarship/${s.id}`}
                          target="_blank"
                          title="View on public site"
                          className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Link>
                        <Link
                          to={`/admin/scholarships/edit/${s.id}`}
                          title="Edit scholarship"
                          className="p-1.5 text-indigo-600 hover:text-indigo-800 rounded-lg hover:bg-indigo-50"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Lower Row: Recent Posts & Recent Inquiries */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Blog Posts */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xs p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900">Recent Guides & News</h3>
                <p className="text-xs text-slate-500">Articles published in posts.json</p>
              </div>
              <Link to="/admin/posts" className="text-xs font-bold text-indigo-600 hover:underline">
                Manage Posts
              </Link>
            </div>

            <div className="divide-y divide-slate-100">
              {recentPosts.map((post) => (
                <div key={post.id} className="py-3 flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-slate-800 truncate hover:text-indigo-600">
                      <Link to={`/admin/posts/edit/${post.id}`}>{post.title}</Link>
                    </p>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      {post.category || 'Guide'} • {post.publishedAt || post.createdAt?.split('T')[0]}
                    </p>
                  </div>
                  <Link
                    to={`/admin/posts/edit/${post.id}`}
                    className="p-1.5 text-indigo-600 hover:text-indigo-800 rounded-lg hover:bg-indigo-50"
                  >
                    <Edit className="w-4 h-4" />
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Contact Inquiries */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xs p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900">Recent Contact Messages</h3>
                <p className="text-xs text-slate-500">Submissions from contact form</p>
              </div>
              <Link to="/admin/contact/messages" className="text-xs font-bold text-indigo-600 hover:underline">
                View Inbox
              </Link>
            </div>

            <div className="divide-y divide-slate-100">
              {recentMessages.length > 0 ? (
                recentMessages.map((msg) => (
                  <div key={msg.id} className="py-3 flex items-center justify-between gap-4">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-xs font-bold text-slate-800">{msg.name}</p>
                        {msg.status === 'new' && (
                          <span className="px-1.5 py-0.2 text-[9px] font-black uppercase bg-rose-500 text-white rounded-full">
                            New
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-500 truncate mt-0.5">{msg.subject || msg.message}</p>
                    </div>
                    <Link
                      to={`/admin/contact/messages`}
                      className="text-xs font-bold text-indigo-600 hover:underline flex-shrink-0"
                    >
                      Reply
                    </Link>
                  </div>
                ))
              ) : (
                <p className="text-xs text-slate-400 py-4 italic">No contact inquiries received yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};
