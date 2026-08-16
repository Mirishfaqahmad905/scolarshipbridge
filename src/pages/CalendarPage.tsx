import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar as CalendarIcon, Clock, Sparkles, AlertTriangle, ArrowRight, Building2, MapPin } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { DeadlineCountdown } from '../components/scholarships/DeadlineCountdown';

export const CalendarPage: React.FC = () => {
  const { scholarships } = useApp();
  const [selectedMonth, setSelectedMonth] = useState<string>('all');

  // Sort scholarships by deadline ascending
  const sortedScholarships = [...scholarships].sort(
    (a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
  );

  // Group by month
  const groupedByMonth = sortedScholarships.reduce((acc, item) => {
    const date = new Date(item.deadline);
    const monthKey = date.toLocaleString('en-US', { month: 'long', year: 'numeric' });
    if (!acc[monthKey]) acc[monthKey] = [];
    acc[monthKey].push(item);
    return acc;
  }, {} as Record<string, typeof scholarships>);

  const monthsList = Object.keys(groupedByMonth);

  return (
    <div id="deadlines-calendar-page" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8 pb-20">
      
      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ label: 'Scholarship Deadlines & Timeline' }]} />

      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-800 via-indigo-900 to-slate-900 rounded-3xl p-6 sm:p-10 text-white shadow-sm space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-amber-300 text-xs font-semibold border border-white/15">
          <CalendarIcon className="w-3.5 h-3.5" />
          <span>Application Cycles Timeline</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
          International Scholarship Deadlines Calendar 2026/2027
        </h1>
        <p className="text-xs sm:text-sm text-indigo-100/90 max-w-2xl leading-relaxed font-normal">
          Chronological breakdown of global scholarship submission deadlines to ensure you submit complete portfolios before portals close.
        </p>
      </div>

      {/* Month Filter Selector */}
      <div className="flex flex-wrap items-center gap-2 bg-white p-2 rounded-2xl border border-slate-200 shadow-xs">
        <button
          onClick={() => setSelectedMonth('all')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            selectedMonth === 'all'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          All Deadlines
        </button>
        {monthsList.map(month => (
          <button
            key={month}
            onClick={() => setSelectedMonth(month)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              selectedMonth === month
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            {month} ({groupedByMonth[month].length})
          </button>
        ))}
      </div>

      {/* Timeline Section */}
      <div className="space-y-8">
        {monthsList
          .filter(month => selectedMonth === 'all' || selectedMonth === month)
          .map(month => (
            <div key={month} className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-indigo-600" />
                <h2 className="text-lg font-bold text-slate-900 tracking-tight">{month}</h2>
                <span className="text-xs font-semibold text-slate-400">({groupedByMonth[month].length} deadlines)</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {groupedByMonth[month].map(item => (
                  <div
                    key={item.id}
                    className="bg-white rounded-2xl border border-slate-200 p-5 hover:border-indigo-400 transition-all hover:shadow-sm flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                          {item.country}
                        </span>
                        <DeadlineCountdown deadline={item.deadline} compact />
                      </div>

                      <h3 className="font-bold text-sm text-slate-900 hover:text-indigo-600 transition-colors leading-snug">
                        <Link to={`/scholarships/${item.slug}`}>
                          {item.title}
                        </Link>
                      </h3>

                      <p className="text-xs text-slate-500 line-clamp-2">
                        {item.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                        {item.fundingType}
                      </span>
                      <Link
                        to={`/scholarships/${item.slug}`}
                        className="text-xs font-bold text-indigo-600 hover:text-indigo-700"
                      >
                        View & Apply &rarr;
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
      </div>

    </div>
  );
};
