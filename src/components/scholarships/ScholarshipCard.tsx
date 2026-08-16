import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Bookmark, 
  MapPin, 
  Building2, 
  Sparkles, 
  ShieldCheck, 
  Plane, 
  Banknote,
  GraduationCap
} from 'lucide-react';
import { Scholarship } from '../../types';
import { useApp } from '../../context/AppContext';
import { DeadlineCountdown } from './DeadlineCountdown';

interface ScholarshipCardProps {
  scholarship: Scholarship;
  viewMode?: 'grid' | 'list';
}

const countryFlagMap: Record<string, string> = {
  'Germany': '🇩🇪',
  'United States': '🇺🇸',
  'United Kingdom': '🇬🇧',
  'Canada': '🇨🇦',
  'Australia': '🇦🇺',
  'Japan': '🇯🇵',
  'South Korea': '🇰🇷',
  'Italy': '🇮🇹',
  'Sweden': '🇸🇪',
  'Netherlands': '🇳🇱',
  'China': '🇨🇳',
  'Singapore': '🇸🇬',
  'Switzerland': '🇨🇭',
  'France': '🇫🇷',
  'Hungary': '🇭🇺',
  'Turkey': '🇹🇷'
};

export const ScholarshipCard: React.FC<ScholarshipCardProps> = ({ scholarship, viewMode = 'grid' }) => {
  const { toggleBookmark, isBookmarked } = useApp();
  const bookmarked = isBookmarked(scholarship.id);
  const flag = countryFlagMap[scholarship.country] || '🌐';

  const isFullyFunded = scholarship.fundingType === 'Fully Funded';
  const hasNoIelts = !scholarship.languageRequirements.ieltsRequired;
  const isFreeApplication = scholarship.applicationFee === 'Free';

  if (viewMode === 'list') {
    return (
      <div 
        id={`scholarship-card-${scholarship.id}`}
        className="group relative bg-white rounded-2xl border border-slate-200/90 hover:border-indigo-400 p-5 sm:p-6 transition-all duration-200 hover:shadow-md flex flex-col md:flex-row gap-5 items-start md:items-center justify-between"
      >
        {/* Left Col: Info */}
        <div className="flex-1 min-w-0 space-y-2.5">
          
          {/* Top badges */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700">
              <span>{flag}</span>
              <span>{scholarship.country}</span>
            </span>

            {isFullyFunded ? (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                <Sparkles className="w-3 h-3 text-emerald-600" />
                <span>Fully Funded</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700">
                <span>{scholarship.fundingType}</span>
              </span>
            )}

            {hasNoIelts && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-200/60">
                <ShieldCheck className="w-3 h-3 text-blue-600" />
                <span>No IELTS Required</span>
              </span>
            )}

            {isFreeApplication && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-slate-100 text-slate-700">
                <span>Free App</span>
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors leading-snug">
            <Link to={`/scholarships/${scholarship.slug}`}>
              {scholarship.title}
            </Link>
          </h3>

          {/* Institution & Location */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">
            {scholarship.university && (
              <div className="flex items-center gap-1 truncate max-w-xs font-medium text-slate-700">
                <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="truncate">{scholarship.university}</span>
              </div>
            )}
            <div className="flex items-center gap-1 text-slate-600">
              <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>{scholarship.city ? `${scholarship.city}, ${scholarship.country}` : scholarship.country}</span>
            </div>
            <div className="flex items-center gap-1 text-slate-600">
              <GraduationCap className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>{scholarship.degreeLevels.join(', ')}</span>
            </div>
          </div>

          {/* Summary / Coverage line */}
          <p className="text-xs text-slate-600 line-clamp-1 max-w-3xl leading-relaxed">
            {scholarship.description}
          </p>
        </div>

        {/* Right Col: Deadline & Action */}
        <div className="flex sm:flex-col items-center sm:items-end justify-between w-full md:w-auto gap-3 pt-3 md:pt-0 border-t md:border-t-0 border-slate-100 shrink-0">
          <div className="flex flex-col items-start sm:items-end gap-1">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Application Deadline</span>
            <DeadlineCountdown deadline={scholarship.deadline} />
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleBookmark(scholarship.id);
              }}
              className={`p-2 rounded-xl border transition-all cursor-pointer ${
                bookmarked
                  ? 'bg-indigo-50 border-indigo-200 text-indigo-600'
                  : 'bg-white border-slate-200 text-slate-400 hover:text-indigo-600 hover:border-slate-300'
              }`}
              title={bookmarked ? 'Remove Bookmark' : 'Save Scholarship'}
              aria-label="Bookmark"
            >
              <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-indigo-600' : ''}`} />
            </button>

            <Link
              to={`/scholarships/${scholarship.slug}`}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition-all shadow-xs"
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Grid View (Default card)
  return (
    <div 
      id={`scholarship-card-${scholarship.id}`}
      className="group relative bg-white rounded-2xl border border-slate-200/90 hover:border-indigo-400 transition-all duration-200 hover:shadow-lg flex flex-col h-full overflow-hidden"
    >
      {/* Card Image Banner */}
      <div className="relative h-44 w-full overflow-hidden bg-slate-100">
        <img
          src={scholarship.image}
          alt={scholarship.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20" />

        {/* Country Badge */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-white text-xs font-semibold border border-white/20 shadow-xs">
          <span>{flag}</span>
          <span className="truncate max-w-[120px]">{scholarship.country}</span>
        </div>

        {/* Bookmark Button */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleBookmark(scholarship.id);
          }}
          className={`absolute top-3 right-3 p-2 rounded-xl backdrop-blur-md transition-all shadow-sm cursor-pointer z-10 ${
            bookmarked
              ? 'bg-white text-indigo-600 ring-2 ring-indigo-500'
              : 'bg-slate-900/70 text-white/90 hover:bg-white hover:text-indigo-600'
          }`}
          title={bookmarked ? 'Remove Bookmark' : 'Save Scholarship'}
          aria-label="Bookmark"
        >
          <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-indigo-600' : ''}`} />
        </button>

        {/* Funding badge overlay */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2">
          {isFullyFunded ? (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-extrabold bg-emerald-500 text-white shadow-md">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Fully Funded</span>
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold bg-indigo-600 text-white shadow-md">
              <span>{scholarship.fundingType}</span>
            </span>
          )}

          {scholarship.airfare && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold bg-slate-900/80 text-sky-300 border border-sky-400/30 backdrop-blur-xs">
              <Plane className="w-3 h-3" />
              <span>Flights</span>
            </span>
          )}
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 flex flex-col flex-1 justify-between space-y-4">
        
        <div className="space-y-2.5">
          {/* Degree level pills */}
          <div className="flex flex-wrap gap-1.5">
            {scholarship.degreeLevels.map(deg => (
              <span
                key={deg}
                className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-slate-100 text-slate-700"
              >
                {deg}
              </span>
            ))}
            {hasNoIelts && (
              <span className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-200/60">
                No IELTS
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-2 leading-snug">
            <Link to={`/scholarships/${scholarship.slug}`}>
              {scholarship.title}
            </Link>
          </h3>

          {/* Institution & City */}
          <div className="space-y-1 text-xs text-slate-500">
            {scholarship.university && (
              <div className="flex items-center gap-1.5 font-medium text-slate-700 truncate">
                <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="truncate">{scholarship.university}</span>
              </div>
            )}
            <div className="flex items-center gap-1.5 text-slate-500">
              <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>{scholarship.city ? `${scholarship.city}, ${scholarship.country}` : scholarship.country}</span>
            </div>
          </div>

          {/* Brief stipend highlight */}
          {scholarship.monthlyStipend && (
            <div className="flex items-start gap-1.5 text-xs text-slate-700 bg-slate-50 p-2 rounded-lg border border-slate-100">
              <Banknote className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
              <span className="line-clamp-1 font-medium">{scholarship.monthlyStipend}</span>
            </div>
          )}
        </div>

        {/* Card Footer: Deadline & Link */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Deadline</span>
            <DeadlineCountdown deadline={scholarship.deadline} compact />
          </div>

          <Link
            to={`/scholarships/${scholarship.slug}`}
            className="px-3.5 py-1.5 bg-indigo-50 hover:bg-indigo-600 text-indigo-600 hover:text-white font-bold text-xs rounded-lg transition-colors"
          >
            Details &rarr;
          </Link>
        </div>

      </div>
    </div>
  );
};
