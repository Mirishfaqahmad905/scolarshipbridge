import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  BookOpen, 
  Clock, 
  User, 
  Calendar, 
  Share2, 
  ChevronRight, 
  ArrowLeft, 
  CheckCircle2, 
  Sparkles, 
  Bookmark, 
  FileText 
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { scholarshipApi } from '../services/api';
import { NewsArticle } from '../types';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { AdPlaceholder } from '../components/layout/AdPlaceholder';

export const NewsDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<NewsArticle | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      scholarshipApi.getNewsBySlug(slug).then(data => {
        setArticle(data);
        setLoading(false);
      });
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-sm font-semibold text-slate-600">Loading guide...</p>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">Guide Not Found</h2>
        <p className="text-sm text-slate-500">The requested article could not be located.</p>
        <Link
          to="/news"
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition-colors"
        >
          <span>View All Guides</span>
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div id="guide-detail-page" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8 pb-24">
      
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: 'Guides & Masterclasses', url: '/news' },
          { label: article.category, url: '/news' },
          { label: article.title }
        ]}
      />

      {/* Article Header */}
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
        
        {/* Banner image */}
        <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-slate-900">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

          <div className="absolute top-6 left-6 flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-white text-xs font-bold border border-white/20">
              {article.category}
            </span>
          </div>

          <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
            <div className="flex items-center gap-3 text-xs text-indigo-200 font-semibold">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {article.readTime}
              </span>
              <span>•</span>
              <span>Published {new Date(article.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
            </div>
            <h1 className="text-xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight">
              {article.title}
            </h1>
          </div>
        </div>

        {/* Author Bio Bar */}
        <div className="bg-slate-50 border-t border-slate-200 p-4 sm:px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={article.author.avatar}
              alt={article.author.name}
              className="w-10 h-10 rounded-full object-cover ring-2 ring-indigo-500/20"
            />
            <div>
              <h4 className="text-xs font-bold text-slate-900">{article.author.name}</h4>
              <p className="text-[11px] text-slate-500">{article.author.role}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {article.tags.map((tag, idx) => (
              <span key={idx} className="hidden sm:inline-block px-2.5 py-1 bg-white border border-slate-200 text-slate-600 rounded-lg text-[11px] font-semibold">
                #{tag}
              </span>
            ))}
          </div>
        </div>

      </div>

      {/* Main Article Body */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 space-y-6">
        
        {/* Lead Excerpt */}
        <div className="p-4 sm:p-5 rounded-2xl bg-indigo-50/60 border border-indigo-100 text-xs sm:text-sm text-indigo-950 font-medium leading-relaxed">
          {article.excerpt}
        </div>

        {/* Structured Article Content */}
        <div className="prose prose-slate max-w-none text-slate-800 text-sm leading-relaxed space-y-4">
          {article.content.split('\n\n').map((paragraph, idx) => {
            if (paragraph.startsWith('### ')) {
              return (
                <h3 key={idx} className="text-lg font-bold text-slate-900 pt-4 pb-1 border-b border-slate-100">
                  {paragraph.replace('### ', '')}
                </h3>
              );
            }
            if (paragraph.startsWith('## ')) {
              return (
                <h2 key={idx} className="text-xl font-extrabold text-slate-900 pt-6 pb-2 border-b border-slate-200">
                  {paragraph.replace('## ', '')}
                </h2>
              );
            }
            if (paragraph.startsWith('- ')) {
              const items = paragraph.split('\n').map(l => l.replace('- ', ''));
              return (
                <ul key={idx} className="space-y-1.5 list-disc pl-5 text-slate-700">
                  {items.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              );
            }
            return (
              <p key={idx} className="text-slate-700 leading-relaxed">
                {paragraph}
              </p>
            );
          })}
        </div>

        {/* Actionable Download / Checklist Footer */}
        <div className="p-6 rounded-2xl bg-slate-900 text-white space-y-3 mt-8">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>Key Takeaways & Action Item</span>
          </div>
          <h3 className="text-base font-bold text-white">
            Ready to apply these principles to your target scholarships?
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Browse currently active verified scholarship portals and filter by your degree level and country preferences.
          </p>
          <div className="pt-2">
            <Link
              to="/scholarships"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl transition-colors"
            >
              <span>Explore Verified Scholarships</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

      </div>

      <AdPlaceholder slot="in-content" />

    </div>
  );
};
