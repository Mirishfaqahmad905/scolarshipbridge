import React from 'react';
import { Link } from 'react-router-dom';
import { Globe2, ArrowRight, Sparkles, Building2, Banknote, ShieldCheck, MapPin } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { AdPlaceholder } from '../components/layout/AdPlaceholder';

export const CountriesDirectoryPage: React.FC = () => {
  const { countries, scholarships } = useApp();

  return (
    <div id="countries-directory-page" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8 pb-20">
      
      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ label: 'Study Destinations & Country Hubs' }]} />

      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-800 via-indigo-900 to-slate-900 rounded-3xl p-6 sm:p-10 text-white shadow-sm space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-amber-300 text-xs font-semibold border border-white/15">
          <Globe2 className="w-3.5 h-3.5" />
          <span>Global Study Destinations Guide</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
          Study Abroad Country Hubs & Visa Policies
        </h1>
        <p className="text-xs sm:text-sm text-indigo-100/90 max-w-2xl leading-relaxed font-normal">
          Compare tuition costs, post-study work visas (PSW), cost of living, language requirements, and top government scholarships across premier destinations.
        </p>
      </div>

      {/* Grid of Country Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {countries.map(country => {
          const countryScholarshipsCount = scholarships.filter(
            s => s.country.toLowerCase() === country.name.toLowerCase()
          ).length;

          return (
            <div
              key={country.slug}
              className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:border-indigo-400 transition-all hover:shadow-md flex flex-col justify-between"
            >
              {/* Image banner */}
              <div className="relative h-44 w-full overflow-hidden bg-slate-100">
                <img
                  src={country.image}
                  alt={country.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20" />

                {/* Country Flag Badge */}
                <div className="absolute top-3 left-3 flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-white text-xs font-bold border border-white/20">
                  <span className="text-base">{country.flag}</span>
                  <span>{country.name}</span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white font-semibold">
                  <span>{country.region}</span>
                  <span className="bg-indigo-600 px-2 py-0.5 rounded-md text-[11px] font-bold">
                    {countryScholarshipsCount || country.activeScholarshipsCount} Scholarships
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {country.overview}
                  </p>

                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-xs">
                    <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">Avg. Tuition</span>
                      <span className="font-bold text-slate-800 truncate block mt-0.5">{country.averageTuition}</span>
                    </div>
                    <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">Work Visa</span>
                      <span className="font-bold text-slate-800 truncate block mt-0.5">{country.postStudyWorkVisa}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500">
                    Currency: <strong className="text-slate-800">{country.currency}</strong>
                  </span>
                  <Link
                    to={`/countries/${country.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 hover:text-indigo-700"
                  >
                    <span>View Destination Guide</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <AdPlaceholder slot="top-banner" />

    </div>
  );
};
