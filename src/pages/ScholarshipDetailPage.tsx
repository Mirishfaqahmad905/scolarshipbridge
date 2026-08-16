import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  GraduationCap, 
  Sparkles, 
  MapPin, 
  Building2, 
  Calendar, 
  Banknote, 
  Plane, 
  ShieldCheck, 
  CheckCircle2, 
  ExternalLink, 
  Share2, 
  Bookmark, 
  FileText, 
  Clock, 
  Award, 
  ChevronRight, 
  HelpCircle, 
  ChevronDown, 
  Heart,
  Globe2,
  AlertTriangle,
  UserCheck,
  Copy,
  Check,
  X
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { scholarshipApi } from '../services/api';
import { Scholarship } from '../types';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { DeadlineCountdown } from '../components/scholarships/DeadlineCountdown';
import { EligibilityChecklist } from '../components/scholarships/EligibilityChecklist';
import { SocialShareButtons } from '../components/scholarships/SocialShareButtons';
import { CommentsSection } from '../components/scholarships/CommentsSection';
import { RelatedScholarships } from '../components/scholarships/RelatedScholarships';
import { AdPlaceholder } from '../components/layout/AdPlaceholder';

export const ScholarshipDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { scholarships, isBookmarked, toggleBookmark, addRecentlyViewed, addToast } = useApp();
  
  const [scholarship, setScholarship] = useState<Scholarship | null>(null);
  const [loading, setLoading] = useState(true);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState(false);

  useEffect(() => {
    if (slug) {
      scholarshipApi.getBySlug(slug).then(data => {
        if (data) {
          setScholarship(data);
          addRecentlyViewed(data.id);
        }
        setLoading(false);
      });
    }
  }, [slug]);

  const handleCopyApplyUrl = () => {
    if (scholarship) {
      navigator.clipboard.writeText(scholarship.applicationUrl);
      setCopiedUrl(true);
      addToast({
        type: 'success',
        title: 'Application Link Copied',
        message: 'Official portal link copied to your clipboard.'
      });
      setTimeout(() => setCopiedUrl(false), 3000);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-sm font-semibold text-slate-600">Loading verified scholarship details...</p>
      </div>
    );
  }

  if (!scholarship) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto">
          <AlertTriangle className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900">Scholarship Not Found</h2>
        <p className="text-sm text-slate-500 max-w-md mx-auto">
          The requested opportunity may have expired or been moved. Please browse our active scholarship directory.
        </p>
        <Link
          to="/scholarships"
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors"
        >
          <span>Browse All Scholarships</span>
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  const bookmarked = isBookmarked(scholarship.id);

  return (
    <div id="scholarship-detail-view" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8 pb-24">
      
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: 'Scholarships', url: '/scholarships' },
          { label: scholarship.country, url: `/countries/${scholarship.country.toLowerCase().replace(/\s+/g, '-')}` },
          { label: scholarship.title }
        ]}
      />

      {/* Hero Header Card */}
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
        
        {/* Top Banner Image with Overlay */}
        <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-slate-900">
          <img
            src={scholarship.image}
            alt={scholarship.title}
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

          {/* Quick Header Overlay Badges */}
          <div className="absolute top-4 left-4 sm:top-6 sm:left-6 flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-white text-xs font-semibold border border-white/20">
              📍 {scholarship.country}
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-500/90 text-white text-xs font-bold shadow-xs flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{scholarship.fundingType}</span>
            </span>
            {scholarship.verified && (
              <span className="px-3 py-1 rounded-full bg-indigo-600/90 text-white text-xs font-bold flex items-center gap-1 border border-indigo-400/40">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Verified by ScholarBridge Desk</span>
              </span>
            )}
          </div>

          {/* Top Right Bookmark Button */}
          <button
            onClick={() => toggleBookmark(scholarship.id)}
            className={`absolute top-4 right-4 sm:top-6 sm:right-6 p-3 rounded-2xl backdrop-blur-md transition-all shadow-md ${
              bookmarked
                ? 'bg-white text-indigo-600 ring-2 ring-indigo-500'
                : 'bg-slate-900/80 text-white hover:bg-white hover:text-indigo-600'
            }`}
            title={bookmarked ? 'Remove Bookmark' : 'Save to Bookmarks'}
          >
            <Bookmark className={`w-5 h-5 ${bookmarked ? 'fill-indigo-600' : ''}`} />
          </button>

          {/* Title & Organization in Banner */}
          <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 text-white space-y-2">
            <div className="flex items-center gap-2 text-xs sm:text-sm text-indigo-200 font-semibold">
              <span>{scholarship.organization}</span>
              {scholarship.university && (
                <>
                  <span>•</span>
                  <span>{scholarship.university}</span>
                </>
              )}
            </div>
            <h1 className="text-xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight">
              {scholarship.title}
            </h1>
          </div>
        </div>

        {/* Quick Spec Highlights Bar */}
        <div className="bg-slate-50 border-t border-slate-200 px-6 py-4 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Host Destination</span>
            <span className="font-bold text-slate-900 text-sm mt-0.5 block">{scholarship.city ? `${scholarship.city}, ` : ''}{scholarship.country}</span>
          </div>

          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Target Degrees</span>
            <span className="font-bold text-slate-900 text-sm mt-0.5 block">{scholarship.degreeLevels.join(', ')}</span>
          </div>

          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Application Fee</span>
            <span className="font-bold text-emerald-600 text-sm mt-0.5 block">{scholarship.applicationFee === 'Free' ? '100% Free' : scholarship.applicationFee}</span>
          </div>

          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Application Deadline</span>
            <div className="mt-1">
              <DeadlineCountdown deadline={scholarship.deadline} />
            </div>
          </div>
        </div>

      </div>

      {/* Main Content Layout: Left 8 Cols (Details) & Right 4 Cols (Sidebar + CTA) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Full Overview, Financial Coverage, Eligibility Checklist, Step-by-Step, FAQs */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Social Share Bar */}
          <SocialShareButtons title={scholarship.title} />

          {/* Section 1: Comprehensive Program Overview */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-4">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-indigo-600" />
              <span>Program Summary & Scope</span>
            </h2>
            <p className="text-sm text-slate-700 leading-relaxed font-normal">
              {scholarship.fullOverview || scholarship.description}
            </p>

            {scholarship.aboutProvider && (
              <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-600 leading-relaxed space-y-1">
                <span className="font-bold text-slate-800 block uppercase tracking-wider text-[10px]">
                  About The Funding Provider ({scholarship.organization})
                </span>
                <p>{scholarship.aboutProvider}</p>
              </div>
            )}
          </div>

          {/* Section 2: Complete Financial Benefits Breakdown */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-indigo-600" />
                <span>Financial Coverage & Scholarship Benefits</span>
              </h2>
              <span className="text-xs font-bold px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-200/60">
                {scholarship.fundingType}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Tuition */}
              <div className="p-4 rounded-xl bg-indigo-50/50 border border-indigo-100 flex items-start gap-3">
                <div className="p-2 bg-indigo-600 text-white rounded-lg shrink-0">
                  <Banknote className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-900 block">Tuition Waiver</span>
                  <p className="text-xs font-semibold text-slate-800 mt-0.5">{scholarship.tuitionCoverage}</p>
                </div>
              </div>

              {/* Monthly Stipend */}
              <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-100 flex items-start gap-3">
                <div className="p-2 bg-emerald-600 text-white rounded-lg shrink-0">
                  <Banknote className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-900 block">Living Allowance / Stipend</span>
                  <p className="text-xs font-semibold text-slate-800 mt-0.5">{scholarship.monthlyStipend || 'Specified in admission letter'}</p>
                </div>
              </div>

              {/* Airfare */}
              <div className="p-4 rounded-xl bg-sky-50/50 border border-sky-100 flex items-start gap-3">
                <div className="p-2 bg-sky-600 text-white rounded-lg shrink-0">
                  <Plane className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-sky-900 block">Travel & Airfare</span>
                  <p className="text-xs font-semibold text-slate-800 mt-0.5">{scholarship.airfare || 'Economy round-trip airfare included'}</p>
                </div>
              </div>

              {/* Accommodation */}
              <div className="p-4 rounded-xl bg-purple-50/50 border border-purple-100 flex items-start gap-3">
                <div className="p-2 bg-purple-600 text-white rounded-lg shrink-0">
                  <Building2 className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-purple-900 block">Accommodation Support</span>
                  <p className="text-xs font-semibold text-slate-800 mt-0.5">{scholarship.accommodation || 'On-campus dorm or monthly housing grant'}</p>
                </div>
              </div>

            </div>

            {/* Bulleted Benefits List */}
            {scholarship.benefits && scholarship.benefits.length > 0 && (
              <div className="space-y-2 pt-2">
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Additional Perks & Allowances Included:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {scholarship.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Section 3: Interactive Eligibility Self-Check */}
          <EligibilityChecklist scholarship={scholarship} />

          {/* Section 4: Required Documents Checklist */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-4">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <FileText className="w-5 h-5 text-indigo-600" />
              <span>Required Application Dossier</span>
            </h2>
            <p className="text-xs text-slate-500">
              Ensure all documents are translated into English/German/target host language and authenticated if required.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {(scholarship.documents || [
                'Complete Online Application Form',
                'Academic Transcripts and Degree Certificates',
                'Statement of Purpose (SOP) / Motivation Letter',
                'Two Academic Reference / Recommendation Letters',
                'Updated Academic CV / Resume (Europass or Standard format)',
                'Passport Copy (Valid for at least 12 months)',
                'Language Proficiency Certificate or MOI Waiver'
              ]).map((doc, idx) => (
                <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs font-medium text-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                  <span>{doc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Section 5: Step-by-Step Application Roadmap */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <Award className="w-5 h-5 text-indigo-600" />
              <span>Step-by-Step Application Procedure</span>
            </h2>

            <div className="space-y-4 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-indigo-100">
              {(scholarship.applicationSteps && scholarship.applicationSteps.length > 0 
                ? scholarship.applicationSteps 
                : [
                  { stepNumber: 1, title: 'Check Eligibility & Select Course', description: 'Review host university programs and confirm your degree match.' },
                  { stepNumber: 2, title: 'Prepare Required Documents', description: 'Draft your SOP, contact referees for letters, and authenticate transcripts.' },
                  { stepNumber: 3, title: 'Submit University / Scholarship Portal', description: 'Create an account on the official portal and upload all requested PDF documents.' },
                  { stepNumber: 4, title: 'Interview & Visa Processing', description: 'Shortlisted candidates attend online panel interviews prior to final scholarship letter issuance.' }
                ]
              ).map((step, idx) => (
                <div key={idx} className="relative flex items-start gap-4 pl-1">
                  <div className="w-7 h-7 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center shrink-0 z-10 shadow-xs">
                    {step.stepNumber || idx + 1}
                  </div>
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 flex-1 space-y-1">
                    <h4 className="text-sm font-bold text-slate-900">{step.title}</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">{step.description}</p>
                    {step.importantNote && (
                      <span className="inline-block mt-1 text-[11px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                        Note: {step.importantNote}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 6: Frequently Asked Questions (FAQ) Accordion */}
          {scholarship.faq && scholarship.faq.length > 0 && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-4">
              <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-indigo-600" />
                <span>Frequently Asked Questions</span>
              </h2>

              <div className="space-y-2.5 pt-2">
                {scholarship.faq.map((item, idx) => {
                  const isOpen = openFaqIndex === idx;
                  return (
                    <div key={idx} className="border border-slate-200 rounded-xl overflow-hidden">
                      <button
                        onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                        className="w-full px-4 py-3.5 text-left text-xs sm:text-sm font-bold text-slate-900 bg-slate-50/50 hover:bg-slate-50 flex items-center justify-between transition-colors"
                      >
                        <span>{item.question}</span>
                        <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180 text-indigo-600' : ''}`} />
                      </button>
                      {isOpen && (
                        <div className="p-4 bg-white text-xs text-slate-600 leading-relaxed border-t border-slate-100">
                          {item.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Section 7: Student Discussion & Q&A */}
          <CommentsSection scholarshipId={scholarship.id} />

        </div>

        {/* Right Sticky Sidebar: Direct Apply CTA, Key Info Widget, Ad */}
        <aside className="lg:col-span-4 space-y-6 sticky top-20">
          
          {/* Primary Apply Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-5">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Application Status</span>
                <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                  Active / Open
                </span>
              </div>
              <h3 className="text-base font-bold text-slate-900">
                Official Application Access
              </h3>
            </div>

            {/* Countdown Box */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Final Deadline:</span>
              <DeadlineCountdown deadline={scholarship.deadline} />
            </div>

            {/* Direct Apply Button */}
            <div className="space-y-2">
              <a
                id="btn-official-apply-now"
                href={scholarship.applicationUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  addToast({
                    type: 'success',
                    title: 'Opening Official Portal',
                    message: `Redirecting to ${scholarship.organization} portal...`
                  });
                }}
                className="w-full py-3.5 px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2 group cursor-pointer text-center"
              >
                <span>Apply on Official Portal</span>
                <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              <button
                type="button"
                onClick={() => setShowApplyModal(true)}
                className="w-full py-2 px-3 text-slate-600 hover:text-indigo-600 hover:bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Application Instructions & Direct Link</span>
              </button>
            </div>

            {/* Official Website Link */}
            {scholarship.officialWebsite && (
              <a
                href={scholarship.officialWebsite}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-1.5"
              >
                <span>Visit Official Program Website</span>
                <Globe2 className="w-3.5 h-3.5" />
              </a>
            )}

            {/* Save to Bookmarks Button */}
            <button
              type="button"
              onClick={() => toggleBookmark(scholarship.id)}
              className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs border transition-all flex items-center justify-center gap-2 cursor-pointer ${
                bookmarked
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-emerald-600 text-emerald-600' : ''}`} />
              <span>{bookmarked ? 'Saved to Your Bookmarks' : 'Save to Bookmarks'}</span>
            </button>

            {/* Verification & Trust Badge */}
            <div className="pt-3 border-t border-slate-100 flex items-start gap-2 text-[11px] text-slate-500">
              <ShieldCheck className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
              <span>
                Verified direct link. ScholarBridge never charges application or agent placement fees.
              </span>
            </div>
          </div>

          {/* Quick Specifications Widget */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Opportunity Key Facts
            </h4>
            
            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500">Duration:</span>
                <span className="font-semibold text-slate-800">{scholarship.duration}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500">Awards Available:</span>
                <span className="font-semibold text-slate-800">{scholarship.numberOfAwards || 'Multiple (Global)'}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500">English Certificate:</span>
                <span className="font-semibold text-slate-800">
                  {scholarship.languageRequirements.ieltsRequired ? `IELTS ${scholarship.languageRequirements.ieltsScore}` : 'MOI Waiver Accepted'}
                </span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500">GRE / GMAT:</span>
                <span className="font-semibold text-slate-800">{scholarship.greRequired ? 'Required' : 'Not Required'}</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-slate-500">Application Fee:</span>
                <span className="font-semibold text-emerald-600">{scholarship.applicationFee}</span>
              </div>
            </div>
          </div>

          {/* Ad / Resource Card */}
          <AdPlaceholder slot="sidebar" />

        </aside>

      </div>

      {/* Section 8: Related Opportunities */}
      <RelatedScholarships currentScholarship={scholarship} allScholarships={scholarships} />

      {/* Application Details & URL Modal */}
      {showApplyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5 shadow-2xl border border-slate-200 animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-indigo-600">
                <ShieldCheck className="w-5 h-5" />
                <span className="font-bold text-xs uppercase tracking-wider">Official Portal Direct Link</span>
              </div>
              <button
                type="button"
                onClick={() => setShowApplyModal(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-black text-slate-900 leading-snug">
                {scholarship.title}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                You are about to access the verified official application host portal for <strong>{scholarship.organization}</strong>.
              </p>
            </div>

            {/* Direct URL Container */}
            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
              <span className="text-[11px] font-bold uppercase text-slate-500 tracking-wider">Target Submission URL</span>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={scholarship.applicationUrl}
                  className="w-full text-xs font-mono text-slate-700 bg-white border border-slate-200 rounded-xl px-3 py-2 select-all outline-none"
                />
                <button
                  type="button"
                  onClick={handleCopyApplyUrl}
                  className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold shrink-0 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  {copiedUrl ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedUrl ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>

            {/* Step Checkpoints */}
            <div className="space-y-2 text-xs text-slate-600">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>Prepare all certified transcripts and English certificates prior to opening the form.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>Zero intermediaries — direct submission to host institution.</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href={scholarship.applicationUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setShowApplyModal(false)}
                className="flex-1 py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer text-center"
              >
                <span>Launch Portal in New Tab</span>
                <ExternalLink className="w-4 h-4" />
              </a>
              <button
                type="button"
                onClick={() => setShowApplyModal(false)}
                className="py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
