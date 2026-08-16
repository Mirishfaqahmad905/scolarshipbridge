import React, { useState } from 'react';
import { 
  Search, 
  SlidersHorizontal, 
  RotateCcw, 
  LayoutGrid, 
  List, 
  ChevronDown,
  Sparkles,
  ShieldCheck,
  Check
} from 'lucide-react';
import { FilterState } from '../../types';

interface ScholarshipFilterBarProps {
  filters: FilterState;
  onFilterChange: (key: keyof FilterState, value: string) => void;
  onResetFilters: () => void;
  totalResults: number;
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
  availableCountries: string[];
}

export const ScholarshipFilterBar: React.FC<ScholarshipFilterBarProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
  totalResults,
  viewMode,
  onViewModeChange,
  availableCountries
}) => {
  const [expandedFilters, setExpandedFilters] = useState(false);

  const isFiltered = 
    filters.search !== '' ||
    filters.country !== 'all' ||
    filters.degree !== 'all' ||
    filters.funding !== 'all' ||
    filters.ielts !== 'all' ||
    filters.fee !== 'all' ||
    filters.deadlineStatus !== 'all' ||
    filters.sortBy !== 'newest';

  return (
    <div id="scholarship-filter-panel" className="bg-white rounded-2xl border border-slate-200 shadow-xs p-4 sm:p-5 space-y-4 mb-6">
      
      {/* Primary Search & Quick Toggles Row */}
      <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        
        {/* Search Input */}
        <div className="relative flex-1">
          <input
            id="filter-search-input"
            type="text"
            value={filters.search}
            onChange={e => onFilterChange('search', e.target.value)}
            placeholder="Search by scholarship title, university, field, or keyword..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 hover:bg-slate-100/80 focus:bg-white text-slate-800 text-sm rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
          {filters.search && (
            <button
              onClick={() => onFilterChange('search', '')}
              className="absolute right-3 top-3 text-xs text-slate-400 hover:text-slate-600 bg-slate-200 hover:bg-slate-300 rounded-full w-5 h-5 flex items-center justify-center"
            >
              ✕
            </button>
          )}
        </div>

        {/* Quick Filter Pill Buttons & View Switcher */}
        <div className="flex flex-wrap items-center gap-2 shrink-0">
          
          {/* Fully Funded Quick Toggle */}
          <button
            onClick={() => onFilterChange('funding', filters.funding === 'fully-funded' ? 'all' : 'fully-funded')}
            className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${
              filters.funding === 'fully-funded'
                ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Fully Funded</span>
            {filters.funding === 'fully-funded' && <Check className="w-3 h-3 ml-0.5" />}
          </button>

          {/* No IELTS Quick Toggle */}
          <button
            onClick={() => onFilterChange('ielts', filters.ielts === 'no-ielts' ? 'all' : 'no-ielts')}
            className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${
              filters.ielts === 'no-ielts'
                ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>No IELTS</span>
            {filters.ielts === 'no-ielts' && <Check className="w-3 h-3 ml-0.5" />}
          </button>

          {/* Expand Filter Button */}
          <button
            onClick={() => setExpandedFilters(!expandedFilters)}
            className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${
              expandedFilters || isFiltered
                ? 'bg-slate-900 text-white border-slate-900'
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filters</span>
            <ChevronDown className={`w-3.5 h-3.5 transition-transform ${expandedFilters ? 'rotate-180' : ''}`} />
          </button>

          {/* View Mode Toggle */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button
              onClick={() => onViewModeChange('grid')}
              className={`p-1.5 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white text-indigo-600 shadow-xs' : 'text-slate-500 hover:text-slate-800'}`}
              title="Grid View"
              aria-label="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => onViewModeChange('list')}
              className={`p-1.5 rounded-lg transition-all ${viewMode === 'list' ? 'bg-white text-indigo-600 shadow-xs' : 'text-slate-500 hover:text-slate-800'}`}
              title="List View"
              aria-label="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

      {/* Expanded Multi-Facet Filters */}
      {expandedFilters && (
        <div className="pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 animate-in fade-in duration-200">
          
          {/* Degree Level */}
          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wider">
              Degree Level
            </label>
            <select
              id="filter-degree-select"
              value={filters.degree}
              onChange={e => onFilterChange('degree', e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 outline-none"
            >
              <option value="all">All Degree Levels</option>
              <option value="bachelor">Undergraduate / Bachelor</option>
              <option value="master">Master's Degree</option>
              <option value="phd">PhD / Doctoral</option>
              <option value="postdoc">Postdoctoral Fellowship</option>
              <option value="internship">Internship / Summer School</option>
              <option value="online course">Online / Distance Learning</option>
            </select>
          </div>

          {/* Destination Country */}
          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wider">
              Destination Country
            </label>
            <select
              id="filter-country-select"
              value={filters.country}
              onChange={e => onFilterChange('country', e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 outline-none"
            >
              <option value="all">All Countries (Worldwide)</option>
              {availableCountries.map(country => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>

          {/* Funding Type */}
          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wider">
              Funding Coverage
            </label>
            <select
              id="filter-funding-select"
              value={filters.funding}
              onChange={e => onFilterChange('funding', e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 outline-none"
            >
              <option value="all">All Funding Types</option>
              <option value="fully-funded">Fully Funded (Tuition + Stipend)</option>
              <option value="partial">Partial Funding / Grants</option>
              <option value="tuition-free">Tuition Waiver / €0 Tuition</option>
              <option value="stipend">Monthly Stipend Only</option>
            </select>
          </div>

          {/* Sort Order */}
          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wider">
              Sort By
            </label>
            <select
              id="filter-sort-select"
              value={filters.sortBy || 'newest'}
              onChange={e => onFilterChange('sortBy', e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 outline-none"
            >
              <option value="newest">Newest Published</option>
              <option value="deadline">Upcoming Deadline (Soonest)</option>
              <option value="popular">Most Bookmarked / Popular</option>
              <option value="views">Most Viewed</option>
              <option value="title-asc">Title: A to Z</option>
            </select>
          </div>

          {/* Secondary Filters Row: Fee & Deadline Status */}
          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wider">
              Application Fee
            </label>
            <select
              id="filter-fee-select"
              value={filters.fee}
              onChange={e => onFilterChange('fee', e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 outline-none"
            >
              <option value="all">Any Fee Status</option>
              <option value="free">100% Free Application</option>
              <option value="paid">Paid Application</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wider">
              Deadline Status
            </label>
            <select
              id="filter-deadline-select"
              value={filters.deadlineStatus}
              onChange={e => onFilterChange('deadlineStatus', e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 outline-none"
            >
              <option value="all">All Deadlines</option>
              <option value="open">Currently Open</option>
              <option value="closing-soon">Closing Soon (Under 30 Days)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wider">
              English Requirement
            </label>
            <select
              id="filter-ielts-select"
              value={filters.ielts}
              onChange={e => onFilterChange('ielts', e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 outline-none"
            >
              <option value="all">Any English Requirement</option>
              <option value="no-ielts">No IELTS / English Waiver</option>
              <option value="ielts-required">IELTS / TOEFL Required</option>
            </select>
          </div>

          {/* Reset Action */}
          <div className="flex items-end">
            <button
              id="btn-reset-filters"
              onClick={onResetFilters}
              disabled={!isFiltered}
              className={`w-full py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 border transition-all ${
                isFiltered
                  ? 'bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100 cursor-pointer'
                  : 'bg-slate-50 text-slate-400 border-slate-200 cursor-not-allowed opacity-60'
              }`}
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset All Filters</span>
            </button>
          </div>

        </div>
      )}

      {/* Results Bar */}
      <div className="flex items-center justify-between pt-2 text-xs text-slate-500">
        <div>
          Showing <span className="font-bold text-slate-900">{totalResults}</span> verified scholarship {totalResults === 1 ? 'opportunity' : 'opportunities'}
        </div>
        {isFiltered && (
          <button
            onClick={onResetFilters}
            className="text-indigo-600 hover:text-indigo-700 font-semibold underline underline-offset-2"
          >
            Clear active filters
          </button>
        )}
      </div>

    </div>
  );
};
