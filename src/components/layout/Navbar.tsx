import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  GraduationCap, 
  Search, 
  Bookmark, 
  Globe, 
  Building2, 
  BookOpen, 
  ChevronDown, 
  Menu, 
  X, 
  Calendar, 
  Sparkles, 
  ShieldCheck, 
  User as UserIcon,
  LogOut,
  Sliders,
  Compass
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Navbar: React.FC = () => {
  const { bookmarks, currentUser, login, logout } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scholarshipDropdown, setScholarshipDropdown] = useState(false);
  const [countriesDropdown, setCountriesDropdown] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);
  const [quickSearch, setQuickSearch] = useState('');
  
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setScholarshipDropdown(false);
    setCountriesDropdown(false);
    setUserDropdown(false);
  }, [location.pathname]);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setScholarshipDropdown(false);
        setCountriesDropdown(false);
        setUserDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleQuickSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (quickSearch.trim()) {
      navigate(`/scholarships?search=${encodeURIComponent(quickSearch.trim())}`);
      setQuickSearch('');
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs" ref={dropdownRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo & Brand Identity */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 group-hover:bg-indigo-700 text-white flex items-center justify-center shadow-md shadow-indigo-600/20 transition-all duration-200">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg sm:text-xl tracking-tight text-slate-900 leading-none">
                Scholar<span className="text-indigo-600">Bridge</span>
              </span>
              <span className="text-[10px] uppercase font-semibold tracking-wider text-slate-500 leading-tight">
                Global Education Discovery
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            
            {/* Scholarships Dropdown */}
            <div className="relative">
              <button
                id="nav-dropdown-scholarships"
                onClick={() => {
                  setScholarshipDropdown(!scholarshipDropdown);
                  setCountriesDropdown(false);
                  setUserDropdown(false);
                }}
                className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  scholarshipDropdown || location.pathname.startsWith('/scholarships') || location.pathname.startsWith('/category')
                    ? 'text-indigo-600 bg-indigo-50/70 font-semibold'
                    : 'text-slate-700 hover:text-indigo-600 hover:bg-slate-50'
                }`}
              >
                <span>Scholarships</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${scholarshipDropdown ? 'rotate-180 text-indigo-600' : 'text-slate-400'}`} />
              </button>

              {scholarshipDropdown && (
                <div className="absolute top-full left-0 mt-1.5 w-72 rounded-xl bg-white border border-slate-200 shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-3 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Degree Levels
                  </div>
                  <Link
                    to="/scholarships?funding=fully-funded"
                    className="flex items-center gap-2.5 px-3 py-2 text-sm text-slate-700 hover:bg-indigo-50/80 hover:text-indigo-600 transition-colors"
                  >
                    <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
                    <div>
                      <span className="font-semibold block leading-none">Fully Funded</span>
                      <span className="text-[11px] text-slate-500">100% tuition + stipend + flights</span>
                    </div>
                  </Link>
                  <Link
                    to="/scholarships?degree=bachelor"
                    className="flex items-center gap-2 px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50 hover:text-indigo-600 transition-colors"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 ml-1"></span>
                    <span>Undergraduate / Bachelor</span>
                  </Link>
                  <Link
                    to="/scholarships?degree=master"
                    className="flex items-center gap-2 px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50 hover:text-indigo-600 transition-colors"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 ml-1"></span>
                    <span>Master’s Programs</span>
                  </Link>
                  <Link
                    to="/scholarships?degree=phd"
                    className="flex items-center gap-2 px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50 hover:text-indigo-600 transition-colors"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 ml-1"></span>
                    <span>PhD & Doctoral Fellowships</span>
                  </Link>
                  
                  <div className="border-t border-slate-100 my-1.5"></div>
                  <div className="px-3 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Special Categories
                  </div>
                  <Link
                    to="/scholarships?ielts=no-ielts"
                    className="flex items-center gap-2 px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50 hover:text-indigo-600 transition-colors"
                  >
                    <ShieldCheck className="w-4 h-4 text-emerald-600 ml-1" />
                    <span>Without IELTS / English Waiver</span>
                  </Link>
                  <Link
                    to="/scholarships?fee=free"
                    className="flex items-center gap-2 px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50 hover:text-indigo-600 transition-colors"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 ml-1"></span>
                    <span>No Application Fee</span>
                  </Link>
                  <Link
                    to="/scholarships"
                    className="flex items-center justify-between px-3 py-2 mt-1 text-xs font-bold text-indigo-600 bg-indigo-50/50 hover:bg-indigo-100/70 rounded-lg mx-2 transition-colors"
                  >
                    <span>Browse All 500+ Scholarships</span>
                    <span>&rarr;</span>
                  </Link>
                </div>
              )}
            </div>

            {/* Countries Dropdown */}
            <div className="relative">
              <button
                id="nav-dropdown-countries"
                onClick={() => {
                  setCountriesDropdown(!countriesDropdown);
                  setScholarshipDropdown(false);
                  setUserDropdown(false);
                }}
                className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  countriesDropdown || location.pathname.startsWith('/countries')
                    ? 'text-indigo-600 bg-indigo-50/70 font-semibold'
                    : 'text-slate-700 hover:text-indigo-600 hover:bg-slate-50'
                }`}
              >
                <Globe className="w-4 h-4 text-slate-400" />
                <span>Countries</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${countriesDropdown ? 'rotate-180 text-indigo-600' : 'text-slate-400'}`} />
              </button>

              {countriesDropdown && (
                <div className="absolute top-full left-0 mt-1.5 w-80 rounded-xl bg-white border border-slate-200 shadow-xl p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="grid grid-cols-2 gap-1.5">
                    {[
                      { name: 'Germany', slug: 'germany', flag: '🇩🇪', sub: 'Tuition-Free' },
                      { name: 'United States', slug: 'united-states', flag: '🇺🇸', sub: 'Fulbright & Grants' },
                      { name: 'United Kingdom', slug: 'united-kingdom', flag: '🇬🇧', sub: 'Chevening & Commonwealth' },
                      { name: 'Canada', slug: 'canada', flag: '🇨🇦', sub: 'Vanier & PGWP' },
                      { name: 'Australia', slug: 'australia', flag: '🇦🇺', sub: 'Australia Awards' },
                      { name: 'Japan', slug: 'japan', flag: '🇯🇵', sub: 'MEXT Government' },
                      { name: 'South Korea', slug: 'south-korea', flag: '🇰🇷', sub: 'GKS / KGSP' },
                      { name: 'Italy', slug: 'italy', flag: '🇮🇹', sub: 'DSU Regional Aid' },
                      { name: 'Sweden', slug: 'sweden', flag: '🇸🇪', sub: 'Swedish Institute' },
                      { name: 'Netherlands', slug: 'netherlands', flag: '🇳🇱', sub: 'Orange Knowledge' }
                    ].map(c => (
                      <Link
                        key={c.slug}
                        to={`/countries/${c.slug}`}
                        className="flex items-center gap-2 p-2 rounded-lg hover:bg-slate-50 transition-colors"
                      >
                        <span className="text-lg leading-none">{c.flag}</span>
                        <div className="truncate">
                          <span className="text-xs font-semibold text-slate-800 block truncate">{c.name}</span>
                          <span className="text-[10px] text-slate-500 block truncate">{c.sub}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                  <div className="border-t border-slate-100 mt-2 pt-2">
                    <Link
                      to="/countries"
                      className="block text-center text-xs font-bold text-indigo-600 hover:text-indigo-700 py-1"
                    >
                      View All Study Destinations &rarr;
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Universities */}
            <Link
              to="/universities"
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                location.pathname.startsWith('/universities')
                  ? 'text-indigo-600 bg-indigo-50/70 font-semibold'
                  : 'text-slate-700 hover:text-indigo-600 hover:bg-slate-50'
              }`}
            >
              <Building2 className="w-4 h-4 text-slate-400" />
              <span>Universities</span>
            </Link>

            {/* Opportunities (Internships/Online) */}
            <Link
              to="/opportunities"
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                location.pathname.startsWith('/opportunities')
                  ? 'text-indigo-600 bg-indigo-50/70 font-semibold'
                  : 'text-slate-700 hover:text-indigo-600 hover:bg-slate-50'
              }`}
            >
              <Compass className="w-4 h-4 text-slate-400" />
              <span>Opportunities</span>
            </Link>

            {/* Deadline Calendar */}
            <Link
              to="/calendar"
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                location.pathname === '/calendar'
                  ? 'text-indigo-600 bg-indigo-50/70 font-semibold'
                  : 'text-slate-700 hover:text-indigo-600 hover:bg-slate-50'
              }`}
            >
              <Calendar className="w-4 h-4 text-slate-400" />
              <span>Calendar</span>
            </Link>

            {/* Guides & News */}
            <Link
              to="/news"
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                location.pathname.startsWith('/news') || location.pathname.startsWith('/guides')
                  ? 'text-indigo-600 bg-indigo-50/70 font-semibold'
                  : 'text-slate-700 hover:text-indigo-600 hover:bg-slate-50'
              }`}
            >
              <BookOpen className="w-4 h-4 text-slate-400" />
              <span>Guides</span>
            </Link>
          </nav>

          {/* Quick Search Bar & Right Action Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Quick Search Form */}
            <form onSubmit={handleQuickSearchSubmit} className="hidden md:flex items-center relative">
              <input
                id="nav-quick-search-input"
                type="text"
                value={quickSearch}
                onChange={e => setQuickSearch(e.target.value)}
                placeholder="Search DAAD, MEXT, Chevening..."
                className="w-48 lg:w-60 pl-8 pr-3 py-1.5 text-xs bg-slate-100/80 hover:bg-slate-100 focus:bg-white text-slate-800 rounded-lg border border-transparent focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 pointer-events-none" />
            </form>

            {/* Bookmarks Button */}
            <Link
              id="nav-btn-bookmarks"
              to="/bookmarks"
              className="relative p-2 text-slate-600 hover:text-indigo-600 hover:bg-slate-100 rounded-lg transition-colors"
              title="Saved Scholarships"
              aria-label="Bookmarks"
            >
              <Bookmark className="w-5 h-5" />
              {bookmarks.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-indigo-600 text-white text-[10px] font-bold flex items-center justify-center shadow-xs">
                  {bookmarks.length}
                </span>
              )}
            </Link>

            {/* User Profile / Admin Menu */}
            <div className="relative">
              {currentUser ? (
                <button
                  id="nav-user-menu-btn"
                  onClick={() => {
                    setUserDropdown(!userDropdown);
                    setScholarshipDropdown(false);
                    setCountriesDropdown(false);
                  }}
                  className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-slate-100 transition-colors border border-slate-200"
                >
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-7 h-7 rounded-md object-cover ring-1 ring-slate-300"
                  />
                  <span className="hidden sm:inline-block text-xs font-semibold text-slate-800 max-w-[100px] truncate">
                    {currentUser.name}
                  </span>
                  <span className={`hidden sm:inline-block text-[10px] px-1.5 py-0.5 rounded font-bold uppercase ${
                    currentUser.role === 'admin' ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-700'
                  }`}>
                    {currentUser.role}
                  </span>
                </button>
              ) : (
                <button
                  id="nav-btn-signin"
                  onClick={() => login('scholar@example.com', 'user')}
                  className="px-3.5 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-xs transition-colors"
                >
                  Sign In
                </button>
              )}

              {/* User Dropdown Menu */}
              {userDropdown && currentUser && (
                <div className="absolute right-0 top-full mt-1.5 w-64 rounded-xl bg-white border border-slate-200 shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-4 py-2 border-b border-slate-100">
                    <p className="text-xs font-semibold text-slate-900 truncate">{currentUser.name}</p>
                    <p className="text-[11px] text-slate-500 truncate">{currentUser.email}</p>
                    <span className="inline-block mt-1 px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 text-[10px] font-bold uppercase">
                      {currentUser.role} Account
                    </span>
                  </div>

                  {currentUser.role === 'admin' && (
                    <div className="py-1 border-b border-slate-100">
                      <Link
                        to="/admin"
                        className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-indigo-600 hover:bg-indigo-50 transition-colors"
                      >
                        <Sliders className="w-4 h-4" />
                        <span>Admin Control Center</span>
                      </Link>
                    </div>
                  )}

                  <div className="py-1">
                    <Link
                      to="/bookmarks"
                      className="flex items-center gap-2.5 px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 transition-colors"
                    >
                      <Bookmark className="w-4 h-4 text-slate-400" />
                      <span>My Saved Scholarships ({bookmarks.length})</span>
                    </Link>
                    <Link
                      to="/profile"
                      className="flex items-center gap-2.5 px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 transition-colors"
                    >
                      <UserIcon className="w-4 h-4 text-slate-400" />
                      <span>Profile & Alert Preferences</span>
                    </Link>
                  </div>

                  {/* Switch Role Quick Tester */}
                  <div className="px-4 py-2 border-t border-slate-100 bg-slate-50/60">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                      Quick Prototype Role Switch
                    </span>
                    <div className="flex gap-1.5">
                      <button
                        onClick={() => login('admin@scholarbridge.org', 'admin')}
                        className={`flex-1 text-[10px] font-semibold py-1 rounded border ${
                          currentUser.role === 'admin' ? 'bg-amber-500 text-white border-amber-600' : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        Admin Mode
                      </button>
                      <button
                        onClick={() => login('student@gmail.com', 'user')}
                        className={`flex-1 text-[10px] font-semibold py-1 rounded border ${
                          currentUser.role === 'user' ? 'bg-indigo-600 text-white border-indigo-700' : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        Student Mode
                      </button>
                    </div>
                  </div>

                  <div className="border-t border-slate-100 pt-1">
                    <button
                      onClick={logout}
                      className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-rose-600 hover:bg-rose-50 transition-colors text-left"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              id="nav-mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-700 hover:text-indigo-600 hover:bg-slate-100 rounded-lg transition-colors"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 max-h-[85vh] overflow-y-auto">
          {/* Mobile Search Form */}
          <form onSubmit={handleQuickSearchSubmit} className="relative">
            <input
              type="text"
              value={quickSearch}
              onChange={e => setQuickSearch(e.target.value)}
              placeholder="Search scholarships, countries, fields..."
              className="w-full pl-9 pr-4 py-2 text-sm bg-slate-100 text-slate-800 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          </form>

          <div className="space-y-1">
            <Link
              to="/scholarships"
              className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium text-slate-800 hover:bg-slate-100"
            >
              <div className="flex items-center gap-3">
                <GraduationCap className="w-5 h-5 text-indigo-600" />
                <span>All Scholarships</span>
              </div>
              <span className="text-xs text-slate-400">Explore &rarr;</span>
            </Link>

            <Link
              to="/scholarships?funding=fully-funded"
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100 pl-11"
            >
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Fully Funded Scholarships</span>
            </Link>

            <Link
              to="/scholarships?ielts=no-ielts"
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100 pl-11"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Scholarships Without IELTS</span>
            </Link>

            <Link
              to="/countries"
              className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium text-slate-800 hover:bg-slate-100"
            >
              <div className="flex items-center gap-3">
                <Globe className="w-5 h-5 text-indigo-600" />
                <span>Destinations by Country</span>
              </div>
              <span className="text-xs text-slate-400">10+ Hubs</span>
            </Link>

            <Link
              to="/universities"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-800 hover:bg-slate-100"
            >
              <Building2 className="w-5 h-5 text-indigo-600" />
              <span>Universities Directory</span>
            </Link>

            <Link
              to="/opportunities"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-800 hover:bg-slate-100"
            >
              <Compass className="w-5 h-5 text-indigo-600" />
              <span>Internships & Fellowships</span>
            </Link>

            <Link
              to="/calendar"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-800 hover:bg-slate-100"
            >
              <Calendar className="w-5 h-5 text-indigo-600" />
              <span>Deadline Calendar</span>
            </Link>

            <Link
              to="/news"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-800 hover:bg-slate-100"
            >
              <BookOpen className="w-5 h-5 text-indigo-600" />
              <span>Guides & SOP Templates</span>
            </Link>
          </div>

          <div className="pt-3 border-t border-slate-200">
            {currentUser?.role === 'admin' && (
              <Link
                to="/admin"
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-bold text-amber-700 bg-amber-50 mb-2"
              >
                <Sliders className="w-5 h-5" />
                <span>Admin Dashboard</span>
              </Link>
            )}

            <Link
              to="/bookmarks"
              className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium text-slate-800 bg-slate-50"
            >
              <div className="flex items-center gap-3">
                <Bookmark className="w-5 h-5 text-indigo-600" />
                <span>Saved Bookmarks</span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-indigo-600 text-white text-xs font-bold">
                {bookmarks.length}
              </span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
