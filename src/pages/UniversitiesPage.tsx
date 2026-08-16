import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  Building2, 
  MapPin, 
  GraduationCap, 
  Sparkles, 
  Search, 
  ExternalLink, 
  Globe2, 
  Award, 
  CheckCircle2,
  SlidersHorizontal
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { AdPlaceholder } from '../components/layout/AdPlaceholder';

interface UniversityData {
  id: string;
  name: string;
  country: string;
  city: string;
  flag: string;
  rank: string;
  tuition: string;
  fundingOpportunities: string[];
  scholarshipCount: number;
  website: string;
  image: string;
  description: string;
  popularFields: string[];
}

export const UniversitiesPage: React.FC = () => {
  const { scholarships } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<string>('all');

  const universitiesList: UniversityData[] = useMemo(() => [
    {
      id: 'uni-1',
      name: 'Technical University of Munich (TUM)',
      country: 'Germany',
      city: 'Munich',
      flag: '🇩🇪',
      rank: '#28 Global QS',
      tuition: '€0 (Tuition Free)',
      fundingOpportunities: ['DAAD Helmut Schmidt', 'TUM Asia Grants', 'Deutschlandstipendium'],
      scholarshipCount: 14,
      website: 'https://www.tum.de/en/',
      image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80',
      description: 'Germany’s premier technical university renowned for engineering, computer science, and full English Master degrees.',
      popularFields: ['Computer Science', 'Robotics', 'Management & Technology']
    },
    {
      id: 'uni-2',
      name: 'University of Oxford',
      country: 'United Kingdom',
      city: 'Oxford',
      flag: '🇬🇧',
      rank: '#3 Global QS',
      tuition: 'Fully Funded via Chevening & Clarendon',
      fundingOpportunities: ['Clarendon Fund', 'Rhodes Scholarship', 'Chevening Fellowship'],
      scholarshipCount: 22,
      website: 'https://www.ox.ac.uk/',
      image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80',
      description: 'The oldest university in the English-speaking world with comprehensive fully funded graduate scholarships.',
      popularFields: ['Public Policy', 'Law', 'Biomedical Science']
    },
    {
      id: 'uni-3',
      name: 'University of Tokyo',
      country: 'Japan',
      city: 'Tokyo',
      flag: '🇯🇵',
      rank: '#23 Global QS',
      tuition: '100% Free via MEXT Scholarship',
      fundingOpportunities: ['MEXT Japanese Government', 'Todai Fellowship', 'ADB-JSP Grant'],
      scholarshipCount: 18,
      website: 'https://www.u-tokyo.ac.jp/en/',
      image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80',
      description: 'Japan’s highest-ranked institution offering English-taught Master and PhD degrees with generous government stipends.',
      popularFields: ['Artificial Intelligence', 'Civil Engineering', 'Economics']
    },
    {
      id: 'uni-4',
      name: 'University of Toronto',
      country: 'Canada',
      city: 'Toronto',
      flag: '🇨🇦',
      rank: '#21 Global QS',
      tuition: 'Fully Funded via Lester B. Pearson',
      fundingOpportunities: ['Lester B. Pearson', 'Vanier CGS Doctoral', 'Ontario Trillium'],
      scholarshipCount: 16,
      website: 'https://www.utoronto.ca/',
      image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
      description: 'Canada’s leading research power providing complete tuition, accommodation, and living support for top scholars.',
      popularFields: ['Data Science', 'Public Health', 'Business Administration']
    },
    {
      id: 'uni-5',
      name: 'Seoul National University (SNU)',
      country: 'South Korea',
      city: 'Seoul',
      flag: '🇰🇷',
      rank: '#36 Global QS',
      tuition: 'Fully Funded via GKS (KGSP)',
      fundingOpportunities: ['Global Korea Scholarship (GKS)', 'SNU Global Scholarship', 'Brain Korea 21'],
      scholarshipCount: 12,
      website: 'https://en.snu.ac.kr/',
      image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=800&q=80',
      description: 'Korea’s flagship research university providing living stipend, roundtrip flights, and language grants.',
      popularFields: ['Semiconductor Engineering', 'International Studies', 'Biotechnology']
    },
    {
      id: 'uni-6',
      name: 'Politecnico di Milano',
      country: 'Italy',
      city: 'Milan',
      flag: '🇮🇹',
      rank: '#1 in Italy',
      tuition: '€0 with DSU Regional Scholarship',
      fundingOpportunities: ['DSU Regional Grant', 'Politecnico Merit Grants', 'Invest Your Talent in Italy'],
      scholarshipCount: 9,
      website: 'https://www.polimi.it/en',
      image: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=800&q=80',
      description: 'Italy’s top technical university offering tuition waivers and €7,000+ yearly living allowances for global applicants.',
      popularFields: ['Architecture', 'Mechanical Engineering', 'Design Innovation']
    }
  ], []);

  const countries = useMemo(() => {
    const list = new Set<string>();
    universitiesList.forEach(u => list.add(u.country));
    return ['all', ...Array.from(list)];
  }, [universitiesList]);

  const filteredUnis = universitiesList.filter(u => {
    const matchesSearch = u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          u.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          u.country.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCountry = selectedCountry === 'all' || u.country === selectedCountry;
    return matchesSearch && matchesCountry;
  });

  return (
    <div id="universities-directory-page" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8 pb-24">
      
      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ label: 'Universities & Higher Education Directory' }]} />

      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-800 via-indigo-900 to-slate-900 rounded-3xl p-6 sm:p-10 text-white shadow-sm space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-amber-300 text-xs font-semibold border border-white/15">
          <Building2 className="w-3.5 h-3.5" />
          <span>Global Partner Institutions</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
          Top World Universities with Fully Funded Scholarships
        </h1>
        <p className="text-xs sm:text-sm text-indigo-100/90 max-w-2xl leading-relaxed font-normal">
          Explore world-ranked universities in Germany, the UK, Japan, Canada, South Korea, and Italy offering tuition-free degrees, government grants, and English-taught Master & PhD degrees.
        </p>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Search universities by name, country, or degree field..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:bg-white focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 outline-none"
          />
        </div>

        {/* Country Filter */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <SlidersHorizontal className="w-4 h-4 text-slate-400 shrink-0" />
          <select
            value={selectedCountry}
            onChange={e => setSelectedCountry(e.target.value)}
            className="w-full sm:w-48 px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 outline-none focus:ring-2 focus:ring-indigo-100"
          >
            <option value="all">All Countries</option>
            {countries.filter(c => c !== 'all').map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Universities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUnis.map(uni => (
          <div
            key={uni.id}
            className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:border-indigo-400 transition-all hover:shadow-lg flex flex-col justify-between"
          >
            <div>
              {/* Image banner */}
              <div className="relative h-48 w-full overflow-hidden bg-slate-900">
                <img
                  src={uni.image}
                  alt={uni.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

                {/* Country Pill */}
                <div className="absolute top-3 left-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-white text-xs font-semibold border border-white/20">
                  <span>{uni.flag}</span>
                  <span>{uni.country}</span>
                </div>

                {/* Ranking */}
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-amber-500 text-white text-[11px] font-bold shadow-md">
                  {uni.rank}
                </div>

                {/* Name over banner */}
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <h3 className="font-bold text-base leading-snug drop-shadow-xs">
                    {uni.name}
                  </h3>
                  <div className="flex items-center gap-1 text-xs text-slate-300 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-indigo-300 shrink-0" />
                    <span>{uni.city}, {uni.country}</span>
                  </div>
                </div>
              </div>

              {/* Body */}
              <div className="p-5 space-y-4">
                <p className="text-xs text-slate-600 leading-relaxed">
                  {uni.description}
                </p>

                {/* Tuition & Funding Summary */}
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-500 font-medium">Standard Tuition:</span>
                    <span className="font-bold text-emerald-600">{uni.tuition}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs pt-1 border-t border-slate-100">
                    <span className="text-slate-500 font-medium">Open Scholarships:</span>
                    <span className="font-bold text-indigo-600">{uni.scholarshipCount} Active Grants</span>
                  </div>
                </div>

                {/* Popular Fields */}
                <div className="space-y-1.5">
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">Key Disciplines:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {uni.popularFields.map(f => (
                      <span key={f} className="px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 text-[11px] font-semibold">
                        {f}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Featured Schemes */}
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">Affiliated Grants:</span>
                  <ul className="space-y-1">
                    {uni.fundingOpportunities.map((op, idx) => (
                      <li key={idx} className="flex items-center gap-1.5 text-xs text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                        <span>{op}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Footer action buttons */}
            <div className="p-5 pt-0 border-t border-slate-100 flex items-center justify-between gap-2 mt-2">
              <a
                href={uni.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-slate-600 hover:text-indigo-600 inline-flex items-center gap-1"
              >
                <span>Official Web</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <Link
                to={`/scholarships?search=${encodeURIComponent(uni.name)}`}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
              >
                View Scholarships &rarr;
              </Link>
            </div>
          </div>
        ))}
      </div>

      <AdPlaceholder slot="top-banner" />

    </div>
  );
};
