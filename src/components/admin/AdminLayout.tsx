import React, { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  GraduationCap, 
  FileText, 
  School, 
  Globe, 
  Tags, 
  FileCode, 
  Home, 
  Info, 
  Mail, 
  MessageSquare, 
  Share2, 
  Image as ImageIcon, 
  DollarSign, 
  Search, 
  Users, 
  ClipboardList, 
  Database, 
  Settings, 
  User, 
  LogOut, 
  ExternalLink, 
  Bell, 
  ChevronDown, 
  ChevronRight, 
  Menu, 
  X, 
  Plus,
  Sparkles,
  Shield,
  Layers,
  ArrowUpRight
} from 'lucide-react';
import { scholarshipApi } from '../../services/api';
import { useApp } from '../../context/AppContext';

interface AdminLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  actionButton?: {
    label: string;
    onClick?: () => void;
    to?: string;
    icon?: React.ReactNode;
  };
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  children,
  title,
  subtitle,
  actionButton
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { addToast } = useApp();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [unreadMessagesCount, setUnreadMessagesCount] = useState(0);
  const [currentUser, setCurrentUser] = useState<any>(null);

  // Fetch current user and unread messages
  useEffect(() => {
    const fetchAdminContext = async () => {
      try {
        const user = await scholarshipApi.admin.getProfile();
        setCurrentUser(user);
      } catch (err) {
        // Token might be invalid
      }

      try {
        const messages = await scholarshipApi.admin.getContactMessages();
        const unread = messages.filter((m: any) => m.status === 'new').length;
        setUnreadMessagesCount(unread);
      } catch (err) {
        // silent
      }
    };

    fetchAdminContext();
  }, []);

  // Global search shortcut (Ctrl+K or Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchModalOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Execute admin global search
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults(null);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        setIsSearching(true);
        const res = await scholarshipApi.admin.search(searchQuery);
        setSearchResults(res);
      } catch (err) {
        // silent
      } finally {
        setIsSearching(false);
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleLogout = async () => {
    try {
      await scholarshipApi.admin.logout();
      addToast({
        type: 'info',
        title: 'Logged Out',
        message: 'You have been signed out of the admin panel.'
      });
      navigate('/admin/login');
    } catch (err) {
      navigate('/admin/login');
    }
  };

  const navSections = [
    {
      heading: 'Overview',
      items: [
        { label: 'Dashboard', to: '/admin/dashboard', icon: <LayoutDashboard className="w-4 h-4" /> }
      ]
    },
    {
      heading: 'Content Management',
      items: [
        { label: 'Scholarships', to: '/admin/scholarships', icon: <GraduationCap className="w-4 h-4" />, countBadge: null },
        { label: 'Blog & Guides', to: '/admin/posts', icon: <FileText className="w-4 h-4" /> },
        { label: 'Universities', to: '/admin/universities', icon: <School className="w-4 h-4" /> },
        { label: 'Countries', to: '/admin/countries', icon: <Globe className="w-4 h-4" /> },
        { label: 'Categories', to: '/admin/categories', icon: <Tags className="w-4 h-4" /> },
        { label: 'Custom Pages', to: '/admin/pages', icon: <FileCode className="w-4 h-4" /> }
      ]
    },
    {
      heading: 'Website & CMS',
      items: [
        { label: 'Homepage CMS', to: '/admin/homepage', icon: <Home className="w-4 h-4" /> },
        { label: 'About Page', to: '/admin/about', icon: <Info className="w-4 h-4" /> },
        { label: 'Contact Settings', to: '/admin/contact', icon: <Mail className="w-4 h-4" /> },
        { 
          label: 'Contact Messages', 
          to: '/admin/contact/messages', 
          icon: <MessageSquare className="w-4 h-4" />,
          badge: unreadMessagesCount > 0 ? unreadMessagesCount : null,
          badgeColor: 'bg-rose-500 text-white'
        },
        { label: 'Navigation Menus', to: '/admin/navigation', icon: <Layers className="w-4 h-4" /> },
        { label: 'Social Media', to: '/admin/social-media', icon: <Share2 className="w-4 h-4" /> },
        { label: 'Media Library', to: '/admin/media', icon: <ImageIcon className="w-4 h-4" /> }
      ]
    },
    {
      heading: 'Monetization & SEO',
      items: [
        { label: 'Advertisements', to: '/admin/ads', icon: <DollarSign className="w-4 h-4" /> },
        { label: 'SEO & Meta', to: '/admin/seo', icon: <Globe className="w-4 h-4" /> }
      ]
    },
    {
      heading: 'System & Security',
      items: [
        { label: 'Admin Users', to: '/admin/users', icon: <Users className="w-4 h-4" /> },
        { label: 'Audit Logs', to: '/admin/audit-logs', icon: <ClipboardList className="w-4 h-4" /> },
        { label: 'JSON Backups', to: '/admin/backups', icon: <Database className="w-4 h-4" /> },
        { label: 'Site Settings', to: '/admin/settings', icon: <Settings className="w-4 h-4" /> }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-900">
      {/* Top Header Bar */}
      <header className="sticky top-0 z-30 bg-slate-900 text-white border-b border-slate-800 shadow-md">
        <div className="flex items-center justify-between px-4 lg:px-6 h-16">
          {/* Left Brand + Mobile Hamburger */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen((prev) => !prev)}
              className="lg:hidden p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
              aria-label="Toggle sidebar"
            >
              <Menu className="w-5 h-5" />
            </button>

            <Link to="/admin/dashboard" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-amber-400 text-slate-950 flex items-center justify-center font-black text-sm shadow-sm shadow-emerald-500/20">
                SB
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-black tracking-tight text-base text-white">Scholar<span className="text-emerald-400">Bridge</span></span>
                  <span className="px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-emerald-400/20 text-emerald-300 rounded-md border border-emerald-400/30">
                    Admin
                  </span>
                </div>
                <span className="text-[11px] text-slate-400 font-medium">JSON Database CMS</span>
              </div>
            </Link>
          </div>

          {/* Center Search Bar Trigger */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-6">
            <button
              type="button"
              onClick={() => setSearchModalOpen(true)}
              className="w-full flex items-center justify-between px-3.5 py-2 text-xs text-slate-400 bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 rounded-xl transition-all shadow-inner group"
            >
              <div className="flex items-center gap-2">
                <Search className="w-4 h-4 text-slate-400 group-hover:text-amber-400 transition-colors" />
                <span>Search scholarships, posts, universities, countries, pages...</span>
              </div>
              <kbd className="px-1.5 py-0.5 text-[10px] font-mono text-slate-400 bg-slate-900 border border-slate-700 rounded-md">
                ⌘K
              </kbd>
            </button>
          </div>

          {/* Right Action Icons & Profile */}
          <div className="flex items-center gap-2.5">
            {/* View Live Website Button */}
            <Link
              to="/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl transition-colors"
            >
              <span>View Website</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            {/* Notifications / Messages indicator */}
            <Link
              to="/admin/contact/messages"
              className="relative p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
              title="Contact Messages"
            >
              <Bell className="w-5 h-5" />
              {unreadMessagesCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-rose-500 rounded-full ring-2 ring-slate-900 animate-pulse" />
              )}
            </Link>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setProfileDropdownOpen((prev) => !prev)}
                className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-sm shadow-xs">
                  {currentUser?.username ? currentUser.username.charAt(0).toUpperCase() : 'A'}
                </div>
                <div className="hidden lg:flex flex-col text-left">
                  <span className="text-xs font-semibold text-white leading-tight">
                    {currentUser?.username || 'Administrator'}
                  </span>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider">
                    {currentUser?.role || 'Super Admin'}
                  </span>
                </div>
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </button>

              {profileDropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setProfileDropdownOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="px-4 py-2 border-b border-slate-100">
                      <p className="text-xs font-bold text-slate-900">{currentUser?.username || 'Admin'}</p>
                      <p className="text-xs text-slate-500 truncate">{currentUser?.email || 'admin@scholarbridge.org'}</p>
                    </div>

                    <div className="py-1">
                      <Link
                        to="/admin/profile"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                      >
                        <User className="w-4 h-4 text-slate-400" />
                        <span>My Admin Profile</span>
                      </Link>
                      <Link
                        to="/admin/backups"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                      >
                        <Database className="w-4 h-4 text-slate-400" />
                        <span>JSON Backups</span>
                      </Link>
                      <Link
                        to="/admin/settings"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                      >
                        <Settings className="w-4 h-4 text-slate-400" />
                        <span>Site Settings</span>
                      </Link>
                    </div>

                    <div className="border-t border-slate-100 pt-1">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                      >
                        <LogOut className="w-4 h-4 text-rose-500" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Layout Body */}
      <div className="flex-1 flex">
        {/* Desktop Fixed Left Sidebar */}
        <aside className="hidden lg:block w-64 bg-slate-900 text-slate-300 border-r border-slate-800 flex-shrink-0 min-h-[calc(100vh-4rem)]">
          <div className="p-4 space-y-6 sticky top-16 max-h-[calc(100vh-4rem)] overflow-y-auto">
            {/* Quick Action Button */}
            <div className="flex items-center gap-2">
              <Link
                to="/admin/scholarships/create"
                className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl transition-colors shadow-sm"
              >
                <Plus className="w-4 h-4" />
                <span>New Scholarship</span>
              </Link>
              <Link
                to="/admin/posts/create"
                className="inline-flex items-center justify-center p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-bold rounded-xl transition-colors border border-slate-700"
                title="Create New Post"
              >
                <FileText className="w-4 h-4" />
              </Link>
            </div>

            {/* Navigation Lists */}
            {navSections.map((section, idx) => (
              <div key={idx} className="space-y-1">
                <p className="px-3 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  {section.heading}
                </p>
                <div className="space-y-0.5 pt-1">
                  {section.items.map((item, itemIdx) => {
                    const isActive = location.pathname === item.to || (item.to !== '/admin/dashboard' && location.pathname.startsWith(item.to));
                    return (
                      <NavLink
                        key={itemIdx}
                        to={item.to}
                        className={({ isActive: active }) =>
                          `flex items-center justify-between px-3 py-2 text-xs font-medium rounded-xl transition-all ${
                            active
                              ? 'bg-indigo-600/20 text-amber-400 font-bold border border-indigo-500/30'
                              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                          }`
                        }
                      >
                        <div className="flex items-center gap-2.5">
                          {item.icon}
                          <span>{item.label}</span>
                        </div>
                        {item.badge && (
                          <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${item.badgeColor || 'bg-indigo-600 text-white'}`}>
                            {item.badge}
                          </span>
                        )}
                      </NavLink>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* Mobile Slide-Over Drawer */}
        {sidebarOpen && (
          <div className="lg:hidden fixed inset-0 z-50 flex">
            <div
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs"
              onClick={() => setSidebarOpen(false)}
            />
            <div className="relative w-72 max-w-[80vw] bg-slate-900 text-slate-300 p-4 space-y-6 overflow-y-auto z-10">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-amber-400 text-slate-950 font-black flex items-center justify-center">
                    S
                  </div>
                  <span className="font-bold text-white text-sm">ScholarshipBride Admin</span>
                </div>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {navSections.map((section, idx) => (
                <div key={idx} className="space-y-1">
                  <p className="px-3 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    {section.heading}
                  </p>
                  <div className="space-y-0.5 pt-1">
                    {section.items.map((item, itemIdx) => (
                      <NavLink
                        key={itemIdx}
                        to={item.to}
                        onClick={() => setSidebarOpen(false)}
                        className={({ isActive }) =>
                          `flex items-center justify-between px-3 py-2 text-xs font-medium rounded-xl transition-all ${
                            isActive
                              ? 'bg-indigo-600 text-white font-bold'
                              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                          }`
                        }
                      >
                        <div className="flex items-center gap-2.5">
                          {item.icon}
                          <span>{item.label}</span>
                        </div>
                        {item.badge && (
                          <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${item.badgeColor || 'bg-indigo-600 text-white'}`}>
                            {item.badge}
                          </span>
                        )}
                      </NavLink>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Center Main Content Area */}
        <main className="flex-1 flex flex-col min-w-0 bg-slate-100 p-4 lg:p-8">
          {/* Optional Page Title Header */}
          {(title || actionButton) && (
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-200">
              <div>
                {title && <h1 className="text-2xl font-black text-slate-900 tracking-tight">{title}</h1>}
                {subtitle && <p className="text-sm text-slate-500 mt-0.5">{subtitle}</p>}
              </div>

              {actionButton && (
                <div>
                  {actionButton.to ? (
                    <Link
                      to={actionButton.to}
                      className="inline-flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white text-xs font-bold rounded-xl transition-all shadow-sm cursor-pointer"
                    >
                      {actionButton.icon || <Plus className="w-4 h-4" />}
                      <span>{actionButton.label}</span>
                    </Link>
                  ) : (
                    <button
                      type="button"
                      onClick={actionButton.onClick}
                      className="inline-flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white text-xs font-bold rounded-xl transition-all shadow-sm cursor-pointer"
                    >
                      {actionButton.icon || <Plus className="w-4 h-4" />}
                      <span>{actionButton.label}</span>
                    </button>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Children Page Content */}
          <div className="flex-1">
            {children}
          </div>
        </main>
      </div>

      {/* Global Interactive Search Modal (⌘K) */}
      {searchModalOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
            {/* Search Input Bar */}
            <div className="flex items-center px-4 border-b border-slate-200">
              <Search className="w-5 h-5 text-slate-400 mr-3" />
              <input
                type="text"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search scholarships, posts, universities, countries, pages..."
                className="w-full py-4 text-sm text-slate-900 placeholder:text-slate-400 bg-transparent outline-none focus:outline-none"
              />
              <button
                onClick={() => setSearchModalOpen(false)}
                className="px-2 py-1 text-xs text-slate-400 hover:text-slate-600 rounded-md bg-slate-100 hover:bg-slate-200"
              >
                ESC
              </button>
            </div>

            {/* Search Results Display */}
            <div className="max-h-96 overflow-y-auto p-4 space-y-4">
              {isSearching ? (
                <div className="py-8 text-center text-sm text-slate-500">
                  <div className="inline-block w-6 h-6 border-2 border-indigo-600/30 border-t-indigo-600 rounded-full animate-spin mb-2" />
                  <p>Searching JSON databases...</p>
                </div>
              ) : searchResults ? (
                <div className="space-y-4">
                  {/* Scholarships Results */}
                  {searchResults.scholarships?.length > 0 && (
                    <div>
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Scholarships</h4>
                      <div className="space-y-1">
                        {searchResults.scholarships.map((s: any) => (
                          <Link
                            key={s.id}
                            to={`/admin/scholarships/edit/${s.id}`}
                            onClick={() => setSearchModalOpen(false)}
                            className="flex items-center justify-between p-2 rounded-xl hover:bg-indigo-50 group"
                          >
                            <div className="flex items-center gap-2">
                              <GraduationCap className="w-4 h-4 text-indigo-600" />
                              <span className="text-xs font-semibold text-slate-800 group-hover:text-indigo-600">{s.title}</span>
                            </div>
                            <span className="text-[11px] text-slate-400">{s.country}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Blog Posts Results */}
                  {searchResults.posts?.length > 0 && (
                    <div>
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Blog Posts</h4>
                      <div className="space-y-1">
                        {searchResults.posts.map((p: any) => (
                          <Link
                            key={p.id}
                            to={`/admin/posts/edit/${p.id}`}
                            onClick={() => setSearchModalOpen(false)}
                            className="flex items-center justify-between p-2 rounded-xl hover:bg-indigo-50 group"
                          >
                            <div className="flex items-center gap-2">
                              <FileText className="w-4 h-4 text-indigo-600" />
                              <span className="text-xs font-semibold text-slate-800 group-hover:text-indigo-600">{p.title}</span>
                            </div>
                            <span className="text-[11px] text-slate-400">{p.category}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Universities Results */}
                  {searchResults.universities?.length > 0 && (
                    <div>
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Universities</h4>
                      <div className="space-y-1">
                        {searchResults.universities.map((u: any) => (
                          <Link
                            key={u.id}
                            to={`/admin/universities`}
                            onClick={() => setSearchModalOpen(false)}
                            className="flex items-center justify-between p-2 rounded-xl hover:bg-indigo-50 group"
                          >
                            <div className="flex items-center gap-2">
                              <School className="w-4 h-4 text-indigo-600" />
                              <span className="text-xs font-semibold text-slate-800 group-hover:text-indigo-600">{u.name}</span>
                            </div>
                            <span className="text-[11px] text-slate-400">{u.country}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* No Results */}
                  {(!searchResults.scholarships?.length && !searchResults.posts?.length && !searchResults.universities?.length) && (
                    <p className="py-8 text-center text-sm text-slate-400">No records found matching "{searchQuery}"</p>
                  )}
                </div>
              ) : (
                <div className="py-8 text-center text-xs text-slate-400">
                  Type a keyword to instantly query scholarships, articles, universities, countries, and pages stored in JSON files.
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
