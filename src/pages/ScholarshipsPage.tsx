import React, { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { 
  GraduationCap, 
  Sparkles, 
  Globe2, 
  ShieldCheck, 
  SlidersHorizontal, 
  RotateCcw, 
  LayoutGrid, 
  List, 
  ChevronRight,
  Search,
  CheckCircle2,
  Calendar,
  Building2,
  MapPin,
  Bookmark
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ScholarshipCard } from '../components/scholarships/ScholarshipCard';
import { ScholarshipFilterBar } from '../components/scholarships/ScholarshipFilterBar';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { AdPlaceholder } from '../components/layout/AdPlaceholder';
import { scholarshipApi } from '../services/api';
import { FilterState } from '../types';

export const ScholarshipsPage: React.FC = () => {
  const { scholarships, activeFilters, setFilter, resetFilters, bookmarks, toggleBookmark } = useApp();
  const [searchParams, setSearchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Sync URL query params with state if provided
  const querySearch = searchParams.get('search') || '';
  const queryFunding = searchParams.get('funding') || '';
  const queryDegree = searchParams.get('degree') || '';
  const queryCountry = searchParams.get('country') || '';
  const queryIelts = searchParams.get('ielts') || '';
  const queryFee = searchParams.get('fee') || '';

  // Local filter override synced with context
  const currentFilters: FilterState = useMemo(() => {
    return {
      ...activeFilters,
      search: querySearch || activeFilters.search,
      funding: queryFunding || activeFilters.funding,
      degree: queryDegree || activeFilters.degree,
      country: queryCountry || activeFilters.country,
      ielts: queryIelts || activeFilters.ielts,
      fee: queryFee || activeFilters.fee,
    };
  }, [activeFilters, querySearch, queryFunding, queryDegree, queryCountry, queryIelts, queryFee]);

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    setFilter(key, value);
    // Update URL search params as well
    const newParams = new URLSearchParams(searchParams);
    if (value && value !== 'all') {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    setSearchParams(newParams);
  };

  const handleResetFilters = () => {
    resetFilters();
    setSearchParams({});
  };

  // Get filtered results using API utility
  const filteredScholarships = useMemo(() => {
    return scholarshipApi.filterScholarships(scholarships, currentFilters);
  }, [scholarships, currentFilters]);

  // Extract unique countries for filter dropdown
  const uniqueCountries = useMemo(() => {
    const set = new Set<string>();
    scholarships.forEach(s => set.add(s.country));
    return Array.from(set).sort();
  }, [scholarships]);

  return (
    <div id="scholarships-directory-page" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 pb-20">
      
      {/* Breadcrumb Navigation */}
      <Breadcrumbs
        items={[
          { label: 'Scholarships Directory', url: '/scholarships' },
          ...(currentFilters.country !== 'all' ? [{ label: currentFilters.country }] : []),
          ...(currentFilters.degree !== 'all' ? [{ label: `${currentFilters.degree.toUpperCase()} Level` }] : [])
        ]}
      />

      {/* Page Header with Clean Hero Gradient */}
      <div className="bg-gradient-to-r from-indigo-800 via-indigo-900 to-slate-900 rounded-2xl p-6 sm:p-10 text-white relative overflow-hidden shadow-sm">
        <div className="relative z-10 max-w-3xl space-y-2.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-amber-300 text-xs font-semibold border border-white/15">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Verified 2026/2027 Intakes</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
            International Scholarships & Grants Directory
          </h1>
          <p className="text-xs sm:text-sm text-indigo-100/90 leading-relaxed max-w-2xl">
            Explore 100% verified fully funded opportunities, government fellowships, tuition waivers, and grants across Europe, North America, Asia, and Oceania.
          </p>
        </div>

        {/* Quick Degree Filter Badges inside Header */}
        <div className="relative z-10 flex flex-wrap gap-2 mt-6 pt-4 border-t border-white/10">
          <span className="text-xs text-indigo-200 font-semibold self-center mr-1">Quick Filters:</span>
          {[
            { label: '✨ Fully Funded', key: 'funding', val: 'fully-funded' },
            { label: '🎓 Bachelor', key: 'degree', val: 'bachelor' },
            { label: '📜 Master’s', key: 'degree', val: 'master' },
            { label: '🔬 PhD & Research', key: 'degree', val: 'phd' },
            { label: '🛡️ Without IELTS', key: 'ielts', val: 'no-ielts' },
            { label: '⚡ Free Application', key: 'fee', val: 'free' },
          ].map((item, idx) => {
            const isActive = currentFilters[item.key as keyof FilterState] === item.val;
            return (
              <button
                key={idx}
                onClick={() => handleFilterChange(item.key as keyof FilterState, isActive ? 'all' : item.val)}
                className={`text-xs px-3 py-1 rounded-full border transition-all ${
                  isActive
                    ? 'bg-white text-indigo-900 font-bold border-white shadow-xs'
                    : 'bg-white/10 text-white hover:bg-white/20 border-white/20'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Primary Layout: Sidebar Filters + Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Filter Sidebar (Desktop) */}
        <aside className="hidden lg:block lg:col-span-3 space-y-6 sticky top-20">
          
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-indigo-600" />
                <h3 className="font-bold text-sm text-slate-900 uppercase tracking-wider">Refine Directory</h3>
              </div>
              <button
                onClick={handleResetFilters}
                className="text-[11px] font-semibold text-rose-600 hover:text-rose-700 flex items-center gap-1"
                title="Reset all"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            </div>

            {/* Degree Filter */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Degree Level
              </label>
              <div className="space-y-1">
                {[
                  { id: 'all', label: 'All Levels' },
                  { id: 'bachelor', label: 'Undergraduate / Bachelor' },
                  { id: 'master', label: 'Master’s Degree' },
                  { id: 'phd', label: 'PhD / Doctorate' },
                  { id: 'postdoc', label: 'Postdoc Research' },
                  { id: 'internship', label: 'Internship / Fellowships' }
                ].map(opt => (
                  <label 
                    key={opt.id} 
                    className="flex items-center justify-between text-xs text-slate-700 hover:text-indigo-600 cursor-pointer p-1.5 rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="degree-sidebar"
                        checked={currentFilters.degree === opt.id}
                        onChange={() => handleFilterChange('degree', opt.id)}
                        className="text-indigo-600 focus:ring-indigo-500 rounded"
                      />
                      <span className={currentFilters.degree === opt.id ? 'font-bold text-indigo-600' : 'font-medium'}>
                        {opt.label}
                      </span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Funding Coverage Filter */}
            <div className="space-y-2 pt-3 border-t border-slate-100">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Funding Coverage
              </label>
              <div className="space-y-1">
                {[
                  { id: 'all', label: 'All Funding Options' },
                  { id: 'fully-funded', label: 'Fully Funded (100%)' },
                  { id: 'partial', label: 'Partial / Grants' },
                  { id: 'tuition-free', label: 'Tuition Waiver' },
                  { id: 'stipend', label: 'Monthly Stipend' }
                ].map(opt => (
                  <label 
                    key={opt.id} 
                    className="flex items-center justify-between text-xs text-slate-700 hover:text-indigo-600 cursor-pointer p-1.5 rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="funding-sidebar"
                        checked={currentFilters.funding === opt.id}
                        onChange={() => handleFilterChange('funding', opt.id)}
                        className="text-indigo-600 focus:ring-indigo-500 rounded"
                      />
                      <span className={currentFilters.funding === opt.id ? 'font-bold text-indigo-600' : 'font-medium'}>
                        {opt.label}
                      </span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Country Selector */}
            <div className="space-y-2 pt-3 border-t border-slate-100">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Destination Country
              </label>
              <select
                value={currentFilters.country}
                onChange={e => handleFilterChange('country', e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 outline-none"
              >
                <option value="all">All Countries (Worldwide)</option>
                {uniqueCountries.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* English Requirement */}
            <div className="space-y-2 pt-3 border-t border-slate-100">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                English Proficiency
              </label>
              <select
                value={currentFilters.ielts}
                onChange={e => handleFilterChange('ielts', e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 outline-none"
              >
                <option value="all">Any Requirement</option>
                <option value="no-ielts">No IELTS / English Waiver</option>
                <option value="ielts-required">IELTS / TOEFL Required</option>
              </select>
            </div>

          </div>

          {/* Quick Newsletter Card */}
          <div className="bg-indigo-50/80 border border-indigo-100 rounded-2xl p-4 space-y-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <h4 className="text-xs font-bold text-indigo-950 uppercase tracking-wider">
                Weekly Deadlines Alert
              </h4>
            </div>
            <p className="text-xs text-indigo-800 leading-relaxed">
              Get notified 14 days before major international scholarship portals close.
            </p>
            <Link
              to="/#main-footer"
              className="block text-center w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-colors"
            >
              Join 85k+ Students
            </Link>
          </div>

          <AdPlaceholder slot="sidebar" />
        </aside>

        {/* Right Main Content (Filter Bar + Scholarship Grid) */}
        <main className="lg:col-span-9 space-y-6">
          
          {/* Top Filter Bar Component */}
          <ScholarshipFilterBar
            filters={currentFilters}
            onFilterChange={handleFilterChange}
            onResetFilters={handleResetFilters}
            totalResults={filteredScholarships.length}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            availableCountries={uniqueCountries}
          />

          {/* Empty State */}
          {filteredScholarships.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto">
                <Search className="w-8 h-8 text-indigo-500" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">No Scholarships Found</h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
                We couldn’t find any opportunities matching your active filter criteria. Try resetting filters or exploring other destinations.
              </p>
              <button
                onClick={handleResetFilters}
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            /* Results Grid / List */
            <div className={
              viewMode === 'grid'
                ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
                : 'space-y-4'
            }>
              {filteredScholarships.map(scholarship => (
                <ScholarshipCard
                  key={scholarship.id}
                  scholarship={scholarship}
                  viewMode={viewMode}
                />
              ))}
            </div>
          )}

          {/* Verified Quality Assurance Banner */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  100% Verified Application Links
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Our academic research team verifies all deadlines and direct submission URLs every 48 hours.
                </p>
              </div>
            </div>
            <Link
              to="/news"
              className="text-xs font-bold text-indigo-600 hover:text-indigo-700 whitespace-nowrap"
            >
              Learn Verification Standards &rarr;
            </Link>
          </div>

        </main>

      </div>
    </div>
  );
};
