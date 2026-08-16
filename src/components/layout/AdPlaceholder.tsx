import React from 'react';
import { ExternalLink, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

interface AdPlaceholderProps {
  slot?: 'top-banner' | 'sidebar' | 'in-content' | 'footer';
  className?: string;
}

export const AdPlaceholder: React.FC<AdPlaceholderProps> = ({ slot = 'sidebar', className = '' }) => {
  if (slot === 'top-banner') {
    return (
      <div id="ad-top-banner" className={`w-full bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-xl p-4 sm:p-6 border border-indigo-900/50 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 ${className}`}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center shrink-0">
            <Sparkles className="w-5 h-5 text-indigo-300" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-wider font-bold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
                Official Guide
              </span>
              <h3 className="text-sm sm:text-base font-bold text-white">Study Abroad Roadmap 2026/2027</h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
              Download our verified checklist: SOP templates, university fee waivers, and blocked account guides.
            </p>
          </div>
        </div>
        <Link
          to="/guides/how-to-write-a-winning-statement-of-purpose-sop-scholarships"
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs sm:text-sm font-semibold rounded-lg shadow-sm transition-all whitespace-nowrap"
        >
          <span>Read Free Guide</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>
      </div>
    );
  }

  if (slot === 'in-content') {
    return (
      <div id="ad-in-content" className={`my-8 p-5 bg-amber-50/80 border border-amber-200/80 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4 ${className}`}>
        <div className="flex items-start gap-3">
          <div className="p-2 bg-amber-100 rounded-lg text-amber-800 shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800">Need 1-on-1 Guidance?</span>
            <h4 className="text-sm font-bold text-slate-900 mt-0.5">Explore Our IELTS Waiver & Embassy Interview Tutorials</h4>
            <p className="text-xs text-slate-600 mt-0.5">Step-by-step documentation samples tailored for DAAD, Chevening, and MEXT selection.</p>
          </div>
        </div>
        <Link
          to="/news"
          className="shrink-0 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors"
        >
          Explore All Guides
        </Link>
      </div>
    );
  }

  return (
    <div id="ad-sidebar-widget" className={`p-4 rounded-xl border border-slate-200 bg-gradient-to-b from-indigo-50/50 to-white shadow-sm ${className}`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-[10px] uppercase font-bold tracking-wider text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded">
          Study Partner
        </span>
        <span className="text-[10px] text-slate-400 font-medium">Featured</span>
      </div>
      <h4 className="text-sm font-bold text-slate-900 leading-snug">
        Free German University Search & DAAD Verification
      </h4>
      <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
        Browse 2,000+ tuition-free degree programs in Germany with English Medium of Instruction.
      </p>
      <Link
        to="/countries/germany"
        className="mt-3 w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg transition-colors"
      >
        <span>Explore Germany Hub</span>
        <ExternalLink className="w-3.5 h-3.5" />
      </Link>
    </div>
  );
};
