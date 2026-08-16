import React from 'react';
import { Link } from 'react-router-dom';
import { Bookmark, Sparkles, Trash2, ArrowRight, Printer, Share2, Calendar, AlertCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ScholarshipCard } from '../components/scholarships/ScholarshipCard';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';

export const BookmarksPage: React.FC = () => {
  const { scholarships, bookmarks, clearBookmarks } = useApp();

  const savedScholarships = scholarships.filter(s => bookmarks.includes(s.id));

  const handlePrint = () => {
    window.print();
  };

  return (
    <div id="bookmarks-dashboard-page" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8 pb-20">
      
      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ label: 'Saved Scholarships & Deadlines' }]} />

      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-800 via-indigo-900 to-slate-900 rounded-3xl p-6 sm:p-10 text-white shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-amber-300 text-xs font-semibold border border-white/15">
            <Bookmark className="w-3.5 h-3.5" />
            <span>Personal Application Tracker</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
            Saved Scholarships & Shortlist ({savedScholarships.length})
          </h1>
          <p className="text-xs sm:text-sm text-indigo-100/90 leading-relaxed font-normal">
            Track upcoming application deadlines, organize your target opportunities, and export your personal study abroad shortlist.
          </p>
        </div>

        {savedScholarships.length > 0 && (
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-xl border border-white/20 transition-all flex items-center gap-2"
            >
              <Printer className="w-4 h-4" />
              <span>Print / PDF</span>
            </button>
            <button
              onClick={clearBookmarks}
              className="px-4 py-2.5 bg-rose-500/20 hover:bg-rose-500/30 text-rose-200 text-xs font-bold rounded-xl border border-rose-400/30 transition-all flex items-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              <span>Clear All</span>
            </button>
          </div>
        )}
      </div>

      {/* Saved Scholarships Grid */}
      {savedScholarships.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-4 max-w-2xl mx-auto">
          <div className="w-16 h-16 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto">
            <Bookmark className="w-8 h-8 text-indigo-500" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">No Scholarships Saved Yet</h2>
          <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
            Click the bookmark icon on any scholarship card or detail page to build your shortlist and track upcoming application deadlines.
          </p>
          <Link
            to="/scholarships"
            className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors"
          >
            <span>Explore All Scholarships</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedScholarships.map(scholarship => (
            <ScholarshipCard key={scholarship.id} scholarship={scholarship} viewMode="grid" />
          ))}
        </div>
      )}

    </div>
  );
};
