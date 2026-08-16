import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, X, ChevronRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AnnouncementBar: React.FC = () => {
  const { announcement } = useApp();
  const [dismissed, setDismissed] = useState(false);

  if (!announcement.enabled || dismissed) return null;

  return (
    <div id="top-announcement-bar" className="bg-slate-900 text-white text-xs sm:text-sm py-2 px-4 border-b border-slate-800 relative z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-1 justify-center sm:justify-start text-center sm:text-left truncate">
          {announcement.badge && (
            <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-semibold text-[11px] border border-emerald-500/30 whitespace-nowrap">
              <Sparkles className="w-3 h-3 text-emerald-400" />
              {announcement.badge}
            </span>
          )}
          <span className="font-medium text-slate-200 truncate">
            {announcement.text}
          </span>
          {announcement.linkUrl && (
            <Link
              to={announcement.linkUrl}
              className="inline-flex items-center gap-0.5 text-amber-300 hover:text-amber-200 font-semibold underline underline-offset-2 ml-1 transition-colors whitespace-nowrap"
            >
              <span>{announcement.linkText || 'Explore Now'}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          )}
        </div>

        <button
          id="btn-dismiss-announcement"
          onClick={() => setDismissed(true)}
          className="text-slate-400 hover:text-white p-1 rounded transition-colors"
          aria-label="Dismiss announcement"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
