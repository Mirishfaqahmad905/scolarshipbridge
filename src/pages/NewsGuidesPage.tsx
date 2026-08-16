import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Clock, Sparkles, ArrowRight, User, Tag } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { AdPlaceholder } from '../components/layout/AdPlaceholder';

export const NewsGuidesPage: React.FC = () => {
  const { news } = useApp();

  return (
    <div id="news-guides-directory" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8 pb-20">
      
      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ label: 'Guides & Application Blueprints' }]} />

      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-800 via-indigo-900 to-slate-900 rounded-3xl p-6 sm:p-10 text-white shadow-sm space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-amber-300 text-xs font-semibold border border-white/15">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Scholarship Masterclasses & Documentation Samples</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
          SOP Blueprints, Motivation Letters & Visa Guides
        </h1>
        <p className="text-xs sm:text-sm text-indigo-100/90 max-w-2xl leading-relaxed font-normal">
          Actionable, step-by-step guides written by successful scholarship alumni to help you craft compelling essays, secure IELTS waivers, and ace embassy interviews.
        </p>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {news.map(article => (
          <div
            key={article.id}
            className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:border-indigo-400 transition-all hover:shadow-md flex flex-col justify-between"
          >
            <div>
              <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-[11px] font-bold bg-slate-900/80 backdrop-blur-md text-white">
                  {article.category}
                </span>
              </div>

              <div className="p-5 space-y-3">
                <div className="flex items-center gap-2 text-[11px] text-slate-400 font-semibold">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{article.readTime}</span>
                  <span>•</span>
                  <span>{new Date(article.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                </div>

                <h3 className="font-bold text-base text-slate-900 group-hover:text-indigo-600 transition-colors leading-snug">
                  <Link to={`/guides/${article.slug}`}>
                    {article.title}
                  </Link>
                </h3>

                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
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
                className="text-xs font-bold text-indigo-600 hover:text-indigo-700 inline-flex items-center gap-1"
              >
                <span>Read Masterclass</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      <AdPlaceholder slot="top-banner" />

    </div>
  );
};
