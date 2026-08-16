import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Search, 
  Sparkles, 
  Globe2, 
  GraduationCap, 
  ArrowRight, 
  ShieldCheck, 
  Plane, 
  CheckCircle2, 
  TrendingUp, 
  Clock, 
  BookOpen, 
  Award,
  Filter
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ScholarshipCard } from '../components/scholarships/ScholarshipCard';
import { AdPlaceholder } from '../components/layout/AdPlaceholder';

export const HomePage: React.FC = () => {
  const { scholarships, countries, news } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTab, setSelectedTab] = useState<'all' | 'fully-funded' | 'master' | 'phd' | 'no-ielts'>('all');
  const navigate = useNavigate();

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/scholarships?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/scholarships');
    }
  };

  // Filter scholarships for the homepage tabs
  const filteredTabScholarships = scholarships.filter(s => {
    if (selectedTab === 'fully-funded') return s.fundingType === 'Fully Funded';
    if (selectedTab === 'master') return s.degreeLevels.includes('Master');
    if (selectedTab === 'phd') return s.degreeLevels.includes('PhD') || s.degreeLevels.includes('Research');
    if (selectedTab === 'no-ielts') return !s.languageRequirements.ieltsRequired;
    return true;
  }).slice(0, 6);

  const featuredScholarships = scholarships.filter(s => s.featured).slice(0, 3);
  const latestNews = news.slice(0, 3);

  return (
    <div id="home-page-container" className="space-y-16 sm:space-y-20 pb-16">
      
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-900 text-white pt-12 pb-20 sm:pt-16 sm:pb-24 px-4 sm:px-6 lg:px-8 border-b border-indigo-950">
        
        {/* Background decorative subtle glow elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full overflow-hidden pointer-events-none opacity-20">
          <div className="absolute -top-24 left-1/4 w-96 h-96 bg-indigo-500 rounded-full blur-3xl" />
          <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-emerald-500 rounded-full blur-3xl" />
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10 space-y-6">
          
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-semibold backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>2026 / 2027 International Admissions & Funding Gateway</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight max-w-4xl mx-auto">
            Discover <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-amber-300 to-emerald-300">Fully Funded</span> Scholarships & Study Abroad
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal">
            Direct access to government grants, university tuition waivers, and paid research fellowships in Europe, North America, and Asia.
          </p>

          {/* Interactive Search Box */}
          <form onSubmit={handleHeroSearch} className="max-w-3xl mx-auto mt-8">
            <div className="flex flex-col sm:flex-row items-stretch gap-2 p-2 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl">
              <div className="relative flex-1 flex items-center">
                <Search className="w-5 h-5 text-slate-400 absolute left-4 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search by degree, field (e.g. Computer Science), or country (Germany, UK)..."
                  className="w-full pl-12 pr-4 py-3.5 bg-white text-slate-900 placeholder-slate-400 rounded-xl text-sm font-medium outline-none focus:ring-2 focus:ring-indigo-500 shadow-inner"
                />
              </div>
              <button
                type="submit"
                className="px-8 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm rounded-xl transition-all shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2"
              >
                <span>Find Scholarships</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>

          {/* Popular Search Chips */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2 text-xs text-slate-400">
            <span className="font-semibold text-slate-300">Trending Searches:</span>
            {[
              { label: '🇩🇪 Germany €0 Tuition', url: '/countries/germany' },
              { label: '✨ Fully Funded Only', url: '/scholarships?funding=fully-funded' },
              { label: '🛡️ No IELTS', url: '/scholarships?ielts=no-ielts' },
              { label: '🇬🇧 Chevening UK', url: '/scholarships/uk-chevening-scholarship-master-degrees' },
              { label: '🇯🇵 MEXT Japan', url: '/scholarships/mext-japanese-government-scholarship-tokyo' },
              { label: '🇨🇦 Canada Vanier', url: '/countries/canada' }
            ].map((chip, idx) => (
              <Link
                key={idx}
                to={chip.url}
                className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/15 border border-white/10 text-slate-200 hover:text-white transition-colors"
              >
                {chip.label}
              </Link>
            ))}
          </div>

          {/* Trust / Stats Metric Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-10 border-t border-indigo-900/60 max-w-4xl mx-auto">
            <div className="p-3 text-center">
              <span className="block text-2xl sm:text-3xl font-black text-white">500+</span>
              <span className="text-xs text-indigo-200">Verified Opportunities</span>
            </div>
            <div className="p-3 text-center">
              <span className="block text-2xl sm:text-3xl font-black text-amber-300">$120M+</span>
              <span className="text-xs text-indigo-200">Total Grant Value</span>
            </div>
            <div className="p-3 text-center">
              <span className="block text-2xl sm:text-3xl font-black text-emerald-400">100% Free</span>
              <span className="text-xs text-indigo-200">Zero Agent Fees</span>
            </div>
            <div className="p-3 text-center">
              <span className="block text-2xl sm:text-3xl font-black text-sky-300">85,000+</span>
              <span className="text-xs text-indigo-200">Students Supported</span>
            </div>
          </div>

        </div>
      </section>

      {/* Top Banner Opportunity Guide */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AdPlaceholder slot="top-banner" />
      </div>

      {/* 2. FEATURED SCHOLARSHIPS CAROUSEL / GRID */}
      {featuredScholarships.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2 text-indigo-600 font-bold text-xs uppercase tracking-wider mb-1">
                <Award className="w-4 h-4" />
                <span>Premier Global Awards</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Featured Flagship Scholarships
              </h2>
            </div>
            <Link
              to="/scholarships?funding=fully-funded"
              className="inline-flex items-center gap-1 text-sm font-bold text-indigo-600 hover:text-indigo-700 transition-colors"
            >
              <span>View All Flagship Grants</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredScholarships.map(s => (
              <ScholarshipCard key={s.id} scholarship={s} viewMode="grid" />
            ))}
          </div>
        </section>
      )}

      {/* 3. EXPLORE BY COUNTRY / STUDY DESTINATION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 text-indigo-600 font-bold text-xs uppercase tracking-wider mb-1">
              <Globe2 className="w-4 h-4" />
              <span>International Hubs</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Top Study Destinations & Country Hubs
            </h2>
          </div>
          <Link
            to="/countries"
            className="inline-flex items-center gap-1 text-sm font-bold text-indigo-600 hover:text-indigo-700 transition-colors"
          >
            <span>Explore All 10+ Countries</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {countries.slice(0, 6).map(country => (
            <Link
              key={country.slug}
              to={`/countries/${country.slug}`}
              className="group relative bg-white rounded-2xl border border-slate-200 p-4 hover:border-indigo-500 hover:shadow-md transition-all flex flex-col items-center text-center space-y-3"
            >
              <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-3xl shadow-inner group-hover:scale-110 transition-transform">
                {country.flag}
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-900 group-hover:text-indigo-600 transition-colors">
                  {country.name}
                </h3>
                <span className="text-[11px] font-semibold text-slate-500 block mt-0.5">
                  {country.activeScholarshipsCount} Scholarships
                </span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 font-bold">
                {country.averageTuition === '€0 (Tuition Free)' ? '€0 Tuition' : 'Top Ranked'}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. MAIN DIRECTORY TABS & SCHOLARSHIP LIST */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200">
          
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-200">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Latest Verified Opportunities
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Updated daily with official application portals, deadlines, and stipend terms.
              </p>
            </div>

            {/* Quick Filter Tabs */}
            <div className="flex flex-wrap items-center gap-1.5 bg-white p-1.5 rounded-2xl border border-slate-200">
              {[
                { id: 'all', label: 'All' },
                { id: 'fully-funded', label: '✨ Fully Funded' },
                { id: 'master', label: 'Master’s' },
                { id: 'phd', label: 'PhD / Research' },
                { id: 'no-ielts', label: '🛡️ No IELTS' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedTab(tab.id as any)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    selectedTab === tab.id
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Grid Output */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {filteredTabScholarships.map(s => (
              <ScholarshipCard key={s.id} scholarship={s} viewMode="grid" />
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              to="/scholarships"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm rounded-xl transition-all shadow-md"
            >
              <span>Explore All Scholarships & Filters</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>

      {/* 5. VALUE PROPOSITION: WHY SCHOLARBRIDGE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-indigo-900 via-slate-900 to-indigo-950 text-white rounded-3xl p-8 sm:p-12 shadow-xl border border-indigo-800/60">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs uppercase font-bold tracking-wider text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
              Our Non-Profit Mission
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
              Democratizing World-Class Higher Education for Every Talented Student
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              We eliminate the opaque barriers in international education by providing 100% free, verified, and direct scholarship links without third-party commissions or high agency charges.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8 pt-8 border-t border-indigo-800/60">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-white">100% Direct Official Portals</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                We always link directly to host universities, embassy portals, and government ministries.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                <Plane className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-white">Full Funding Focus</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Prioritizing schemes with 100% tuition coverage, living stipends, and round-trip airfare.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-300 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-white">Verified English Waivers</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Curated catalogs of scholarships that accept Medium of Instruction (MOI) certificates.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. EDITORIAL GUIDES & SOP BLUEPRINTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 text-indigo-600 font-bold text-xs uppercase tracking-wider mb-1">
              <BookOpen className="w-4 h-4" />
              <span>Application Masterclass</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Essential Study Abroad Guides
            </h2>
          </div>
          <Link
            to="/news"
            className="inline-flex items-center gap-1 text-sm font-bold text-indigo-600 hover:text-indigo-700 transition-colors"
          >
            <span>Read All Guides</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {latestNews.map(article => (
            <div
              key={article.id}
              className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:border-indigo-400 transition-all hover:shadow-md flex flex-col justify-between"
            >
              <div>
                <div className="h-44 w-full overflow-hidden bg-slate-100 relative">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-[11px] font-bold bg-slate-900/80 backdrop-blur-md text-white">
                    {article.category}
                  </span>
                </div>
                <div className="p-5 space-y-2">
                  <span className="text-[11px] text-slate-400 font-semibold">{article.readTime}</span>
                  <h3 className="font-bold text-base text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-2 leading-snug">
                    <Link to={`/guides/${article.slug}`}>
                      {article.title}
                    </Link>
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0 border-t border-slate-100 flex items-center justify-between mt-2">
                <div className="flex items-center gap-2">
                  <img
                    src={article.author.avatar}
                    alt={article.author.name}
                    className="w-6 h-6 rounded-full object-cover"
                  />
                  <span className="text-xs font-semibold text-slate-700">{article.author.name}</span>
                </div>
                <Link
                  to={`/guides/${article.slug}`}
                  className="text-xs font-bold text-indigo-600 hover:text-indigo-700"
                >
                  Read &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
