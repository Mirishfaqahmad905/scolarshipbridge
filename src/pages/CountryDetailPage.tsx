import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Globe2, 
  Sparkles, 
  Building2, 
  Banknote, 
  ShieldCheck, 
  FileText, 
  Briefcase, 
  MapPin, 
  ChevronRight, 
  ArrowRight,
  GraduationCap,
  Award
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { scholarshipApi } from '../services/api';
import { ScholarshipCard } from '../components/scholarships/ScholarshipCard';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { AdPlaceholder } from '../components/layout/AdPlaceholder';
import { CountryInfo, Scholarship } from '../types';

export const CountryDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { scholarships, countries } = useApp();
  const [country, setCountry] = useState<CountryInfo | null>(null);

  useEffect(() => {
    if (slug) {
      scholarshipApi.getCountryBySlug(slug).then(data => {
        setCountry(data);
      });
    }
  }, [slug]);

  if (!country) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">Country Guide Not Found</h2>
        <p className="text-sm text-slate-500">Please browse all available country study destinations.</p>
        <Link
          to="/countries"
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition-colors"
        >
          <span>View All Countries</span>
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  // Filter scholarships for this country
  const countryScholarships = scholarships.filter(
    s => s.country.toLowerCase() === country.name.toLowerCase()
  );

  return (
    <div id="country-detail-guide" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8 pb-20">
      
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: 'Study Destinations', url: '/countries' },
          { label: country.name }
        ]}
      />

      {/* Country Hero Header Banner */}
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-slate-900">
          <img
            src={country.bannerImage || country.image}
            alt={country.name}
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

          {/* Top Flag badge */}
          <div className="absolute top-6 left-6 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 backdrop-blur-md text-white text-xs font-bold border border-white/20">
            <span className="text-xl">{country.flag}</span>
            <span>{country.name} Study Abroad Guide 2026/2027</span>
          </div>

          {/* Title & Region in Banner */}
          <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
            <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">{country.region} Study Hub</span>
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              Study in {country.name}: Scholarships, Tuition & Visas
            </h1>
          </div>
        </div>

        {/* Quick Country Stats Grid */}
        <div className="bg-slate-50 border-t border-slate-200 p-6 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Tuition Fees</span>
            <span className="font-bold text-slate-900 text-sm mt-0.5 block">{country.averageTuition}</span>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Living Cost</span>
            <span className="font-bold text-slate-900 text-sm mt-0.5 block">{country.averageLivingCost}</span>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Post-Study Work Visa</span>
            <span className="font-bold text-slate-900 text-sm mt-0.5 block">{country.postStudyWorkVisa}</span>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Language of Instruction</span>
            <span className="font-bold text-slate-900 text-sm mt-0.5 block">{country.language}</span>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left 8 cols: Country Guide, Visa Rules, Top Universities */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Overview & Why Study Here */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-5">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <Globe2 className="w-5 h-5 text-indigo-600" />
              <span>Overview & Academic Advantages</span>
            </h2>
            <p className="text-sm text-slate-700 leading-relaxed font-normal">
              {country.overview}
            </p>

            <div className="pt-4 border-t border-slate-100 space-y-3">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Why International Students Choose {country.name}:
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {country.whyStudyHere.map((reason, idx) => (
                  <div key={idx} className="flex items-start gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-800 font-medium">
                    <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                      ✓
                    </span>
                    <span>{reason}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Visa & Work Regulations */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-4">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-indigo-600" />
              <span>Student Visa & Post-Study Work Rights</span>
            </h2>
            <p className="text-sm text-slate-700 leading-relaxed font-normal">
              {country.visaGuidelines}
            </p>
          </div>

          {/* Active Scholarships in this country */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <Award className="w-5 h-5 text-indigo-600" />
                <span>Verified Scholarships in {country.name} ({countryScholarships.length})</span>
              </h2>
              <Link
                to={`/scholarships?country=${encodeURIComponent(country.name)}`}
                className="text-xs font-bold text-indigo-600 hover:text-indigo-700"
              >
                View all filters &rarr;
              </Link>
            </div>

            {countryScholarships.length === 0 ? (
              <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center text-xs text-slate-500">
                No active scholarships currently listed for {country.name}. Check back soon for newly published intakes!
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {countryScholarships.map(s => (
                  <ScholarshipCard key={s.id} scholarship={s} viewMode="grid" />
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Right 4 cols: Top Universities & Ad */}
        <aside className="lg:col-span-4 space-y-6 sticky top-20">
          
          {/* Top Universities Widget */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <Building2 className="w-4 h-4 text-indigo-600" />
              <span>Top Universities in {country.name}</span>
            </h3>

            <div className="space-y-2">
              {country.topUniversities.map((uni, idx) => (
                <div key={idx} className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-800">{uni}</span>
                  <span className="text-[10px] text-slate-400 font-bold">Top Ranked</span>
                </div>
              ))}
            </div>
          </div>

          {/* Popular Fields */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-indigo-600" />
              <span>Top In-Demand Fields</span>
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {country.popularFields.map((field, idx) => (
                <span key={idx} className="px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 text-xs font-medium">
                  {field}
                </span>
              ))}
            </div>
          </div>

          <AdPlaceholder slot="sidebar" />

        </aside>

      </div>

    </div>
  );
};
