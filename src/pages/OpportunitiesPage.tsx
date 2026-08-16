import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Briefcase, GraduationCap, Plane, Globe2, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ScholarshipCard } from '../components/scholarships/ScholarshipCard';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { OpportunityCategory } from '../types';

export const OpportunitiesPage: React.FC = () => {
  const { scholarships } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories: { id: string; label: string; icon: string }[] = [
    { id: 'all', label: 'All Opportunities', icon: '🌐' },
    { id: 'fellowships', label: 'Research Fellowships', icon: '🔬' },
    { id: 'internships', label: 'Paid Internships', icon: '💼' },
    { id: 'exchange-programs', label: 'Exchange Programs', icon: '✈️' },
    { id: 'summer-schools', label: 'Summer Schools', icon: '☀️' },
  ];

  const filteredOpportunities = scholarships.filter(s => {
    if (selectedCategory === 'all') return true;
    return s.category === selectedCategory || s.degreeLevels.some(d => d.toLowerCase().includes(selectedCategory));
  });

  return (
    <div id="global-opportunities-page" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8 pb-20">
      
      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ label: 'Fellowships, Internships & Exchange Programs' }]} />

      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-800 via-indigo-900 to-slate-900 rounded-3xl p-6 sm:p-10 text-white shadow-sm space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-amber-300 text-xs font-semibold border border-white/15">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Global Mobility & Research Gateway</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
          Fellowships, Internships & Exchange Programs
        </h1>
        <p className="text-xs sm:text-sm text-indigo-100/90 max-w-2xl leading-relaxed font-normal">
          Beyond traditional degrees: discover short-term international research residencies, UN internships, fully funded youth summits, and student exchange schemes.
        </p>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap items-center gap-2 bg-white p-2 rounded-2xl border border-slate-200 shadow-xs">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              selectedCategory === cat.id
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <span>{cat.icon}</span>
            <span>{cat.label}</span>
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredOpportunities.map(opportunity => (
          <ScholarshipCard key={opportunity.id} scholarship={opportunity} viewMode="grid" />
        ))}
      </div>

    </div>
  );
};
