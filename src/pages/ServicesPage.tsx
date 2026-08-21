import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  GraduationCap, 
  FileText, 
  BookOpen, 
  Sparkles, 
  CheckCircle2, 
  Send, 
  Globe2, 
  Award, 
  ShieldCheck, 
  Code, 
  ArrowRight, 
  Clock, 
  HelpCircle,
  Laptop
} from 'lucide-react';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { useApp } from '../context/AppContext';

export const ServicesPage: React.FC = () => {
  const { addToast } = useApp();
  const [selectedService, setSelectedService] = useState('application');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    targetDegree: 'Master',
    targetCountry: 'Germany',
    notes: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const services = [
    {
      id: 'application',
      title: 'Full Scholarship Application & Portal Submission',
      badge: 'Most Popular',
      icon: GraduationCap,
      description: 'We handle your entire scholarship application cycle from start to finish across European, North American, and Asian university portals.',
      highlights: [
        'Complete university & scholarship portal registration & form filling',
        'Direct embassy & ministry application submissions (DAAD, MEXT, GKS, CSC, Turkiye Burslari)',
        'Deadline tracking, error audits, and submission verification',
        'Guidance on fee waivers and official English proficiency certificate alternatives'
      ],
      leadTime: '3 – 5 Days'
    },
    {
      id: 'cv_design',
      title: 'Academic & ATS-Compliant CV / Resume Designing',
      badge: 'Essential',
      icon: FileText,
      description: 'Tailor-made academic CVs designed specifically for international scholarship review committees, professors, and automated ATS filters.',
      highlights: [
        'Europass, US/Canada Academic, and Asian scholarship standard formatting',
        'Strategic emphasis on research publications, GPA, awards, and community impact',
        'Keyword optimization for automated selection filters',
        'Delivered in editable Word and print-ready PDF formats'
      ],
      leadTime: '24 – 48 Hours'
    },
    {
      id: 'research_proposal',
      title: 'Comprehensive Research Proposal & Thesis Synopsis',
      badge: 'MS & PhD Track',
      icon: BookOpen,
      description: 'Well-structured, academically rigorous research proposals written according to international university guidelines for Masters by Research and PhD scholarships.',
      highlights: [
        'Novel research problem identification and hypothesis formulation',
        'Comprehensive literature review with recent peer-reviewed citations (APA/IEEE/Harvard)',
        'Detailed research methodology, experimental design, and Gantt chart timeline',
        'Zero plagiarism with Turnitin report guarantee'
      ],
      leadTime: '5 – 7 Days'
    },
    {
      id: 'sop_motivation',
      title: 'Statement of Purpose (SOP) & Motivation Letter Drafting',
      badge: 'High Acceptance',
      icon: Sparkles,
      description: 'Compelling, deeply personalized motivation letters and personal statements that articulate your story, academic ambitions, and suitability for the scholarship.',
      highlights: [
        '100% custom-written story matching specific scholarship mission values',
        'Clear justification for country, university, and professor alignment',
        'Persuasive future career & country development impact plans',
        'Multiple review and revision cycles until complete satisfaction'
      ],
      leadTime: '48 Hours'
    },
    {
      id: 'lor_references',
      title: 'Letters of Recommendation (LOR) & Academic References',
      badge: 'Faculty Ready',
      icon: Award,
      description: 'Strong, distinctive recommendation letters tailored for your university professors, thesis advisors, and workplace managers.',
      highlights: [
        'Distinct perspectives highlighting research abilities, leadership, and integrity',
        'Prepared ready for professor signatures or official institution letterheads',
        'Aligned with scholarship criteria to reinforce your main application theme'
      ],
      leadTime: '24 – 48 Hours'
    },
    {
      id: 'web_dev',
      title: 'Academic Portfolio & Full-Stack Web Development',
      badge: 'Tech & Deployment',
      icon: Laptop,
      description: 'Personal researcher websites, academic portfolios, and custom web applications developed and deployed on Vercel, Netlify, or Cloud Run by our expert full-stack engineer.',
      highlights: [
        'Modern React, Tailwind CSS, and Node.js responsive web development',
        'Flawless deployment on Vercel, Netlify, and Cloud platforms with custom domain setup',
        'Showcase your publications, research projects, CV, and contact booking in one link'
      ],
      leadTime: '3 – 6 Days'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      addToast({
        type: 'error',
        title: 'Missing Details',
        message: 'Please provide your name and email to request service.'
      });
      return;
    }

    setIsSubmitted(true);
    addToast({
      type: 'success',
      title: 'Inquiry Submitted Successfully! 🎉',
      message: 'Mir Ishfaq Ahmad and the ScholarBridge team will reach out within 12 hours.'
    });
  };

  return (
    <div id="services-page" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-12 pb-24">
      <Breadcrumbs items={[{ label: 'Scholarship Services & Application Desk' }]} />

      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-slate-800 p-8 sm:p-12 text-white shadow-xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold tracking-wide border border-indigo-500/30">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Official ScholarBridge Editorial & Mentorship Desk</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
            We Handle Your Applications, CVs, Proposals & Documents
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
            Whether you need a winning ATS academic CV, a complete master/PhD research proposal, or want our team to apply to fully funded scholarship portals directly on your behalf, we are here to support your global journey.
          </p>
          <div className="pt-2 flex flex-wrap items-center gap-4">
            <a
              href="#service-booking-form"
              className="px-6 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-indigo-600/30 transition-all flex items-center gap-2"
            >
              <span>Book Application Assistance</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="https://wa.me/923463079238?text=Hello%20Mir%20Ishfaq%20Ahmad,%20I%20need%20assistance%20with%20my%20scholarship%20application/CV/Research%20Proposal."
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-emerald-600/30 transition-all flex items-center gap-2"
            >
              <span>Direct WhatsApp Chat</span>
            </a>
          </div>
        </div>
      </div>

      {/* Service Catalog Grid */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Our Professional Scholarship Services
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Engineered by experienced international scholars and full-stack researchers.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((srv) => {
            const Icon = srv.icon;
            return (
              <div 
                key={srv.id}
                id={`service-card-${srv.id}`}
                className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-7 flex flex-col justify-between hover:shadow-xl hover:border-indigo-200 transition-all duration-200 group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-200">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
                      {srv.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                      {srv.title}
                    </h3>
                    <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                      {srv.description}
                    </p>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-slate-100">
                    {srv.highlights.map((h, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span className="leading-snug">{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 mt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-slate-500">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>Turnaround: {srv.leadTime}</span>
                  </div>
                  <a
                    href="#service-booking-form"
                    onClick={() => setSelectedService(srv.id)}
                    className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
                  >
                    <span>Request Now</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Consultation Booking Form */}
      <div id="service-booking-form" className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-6">
        <div className="border-b border-slate-100 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold mb-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Direct Mentorship Desk</span>
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Request Your Scholarship Assistance Package
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Select your required service and submit your details. Our lead mentor, <strong>Mir Ishfaq Ahmad</strong>, will personally review your profile.
            </p>
          </div>
          <div className="text-xs text-slate-500 bg-slate-50 p-3 rounded-xl border border-slate-200">
            <span className="font-semibold text-slate-700 block">📞 Direct WhatsApp:</span>
            <span className="text-indigo-600 font-mono font-bold">+92 346 3079238</span>
          </div>
        </div>

        {isSubmitted ? (
          <div className="text-center py-12 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Inquiry Received Successfully!</h3>
            <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
              Thank you for trusting ScholarBridge. We have logged your request and sent a confirmation email. You can also message us directly on WhatsApp at <strong>+92-346-3079238</strong> for instant review.
            </p>
            <button
              type="button"
              onClick={() => setIsSubmitted(false)}
              className="px-6 py-2.5 bg-indigo-600 text-white text-xs font-bold rounded-xl"
            >
              Submit Another Request
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="space-y-1.5">
              <label className="font-bold text-slate-700 uppercase tracking-wider block">
                Select Desired Service
              </label>
              <select
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-200 font-medium text-slate-800"
              >
                <option value="application">Full Scholarship Application & Portal Submission (We Apply For You)</option>
                <option value="cv_design">Academic & ATS-Compliant CV / Resume Designing</option>
                <option value="research_proposal">Complete Research Proposal & Thesis Synopsis Drafting</option>
                <option value="sop_motivation">Statement of Purpose (SOP) & Motivation Letter Drafting</option>
                <option value="lor_references">Letters of Recommendation (LOR) & Academic References</option>
                <option value="web_dev">Personal Researcher Portfolio & Full-Stack Web Development</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="font-bold text-slate-700 uppercase tracking-wider block">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Tariq Mehmood"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-200"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-slate-700 uppercase tracking-wider block">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. tariq@gmail.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-200"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="font-bold text-slate-700 uppercase tracking-wider block">
                  WhatsApp / Phone Number
                </label>
                <input
                  type="text"
                  placeholder="e.g. +92 346 0000000"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-200"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-slate-700 uppercase tracking-wider block">
                  Target Degree Level
                </label>
                <select
                  value={formData.targetDegree}
                  onChange={(e) => setFormData({ ...formData, targetDegree: e.target.value })}
                  className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-200"
                >
                  <option value="Bachelor">Bachelor / Undergraduate</option>
                  <option value="Master">Master’s / MS</option>
                  <option value="PhD">PhD / Doctoral</option>
                  <option value="PostDoc">Post-Doctoral Fellowship</option>
                  <option value="Internship">International Internship</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-slate-700 uppercase tracking-wider block">
                  Target Destination / Country
                </label>
                <input
                  type="text"
                  placeholder="e.g. Germany, UK, Japan, Korea, USA"
                  value={formData.targetCountry}
                  onChange={(e) => setFormData({ ...formData, targetCountry: e.target.value })}
                  className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-200"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-slate-700 uppercase tracking-wider block">
                Project Specifics or Query
              </label>
              <textarea
                rows={4}
                placeholder="Mention specific scholarships (DAAD, MEXT, Chevening, Fulbright), major/field of study, or deadline dates..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-200"
              />
            </div>

            <div className="pt-2 flex items-center justify-between">
              <div className="flex items-center gap-2 text-slate-500 text-[11px]">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>100% Confidentiality & Academic Integrity</span>
              </div>
              <button
                type="submit"
                className="px-8 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Submit Service Inquiry</span>
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Trust & FAQ Section */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 space-y-6">
        <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
          Frequently Asked Questions About Our Services
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-300 leading-relaxed">
          <div className="space-y-2 p-4 rounded-2xl bg-slate-800/80 border border-slate-700">
            <h4 className="font-bold text-white text-sm flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-indigo-400" />
              <span>Can you apply on official scholarship portals for me?</span>
            </h4>
            <p>
              Yes! We provide full-cycle application submission support. We create, configure, upload documents, and submit your profiles on government and university portals before official deadlines.
            </p>
          </div>

          <div className="space-y-2 p-4 rounded-2xl bg-slate-800/80 border border-slate-700">
            <h4 className="font-bold text-white text-sm flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-indigo-400" />
              <span>Do you provide original, plagiarism-free research proposals?</span>
            </h4>
            <p>
              Every research proposal is custom-developed from scratch, tailored to your specific field and university professor interests, with modern peer-reviewed references and a zero-plagiarism guarantee.
            </p>
          </div>

          <div className="space-y-2 p-4 rounded-2xl bg-slate-800/80 border border-slate-700">
            <h4 className="font-bold text-white text-sm flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-indigo-400" />
              <span>How do I receive my completed CV or documents?</span>
            </h4>
            <p>
              Completed files are sent directly to your registered email and WhatsApp in fully editable MS Word (.docx) and high-resolution PDF formats with revisions included.
            </p>
          </div>

          <div className="space-y-2 p-4 rounded-2xl bg-slate-800/80 border border-slate-700">
            <h4 className="font-bold text-white text-sm flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-indigo-400" />
              <span>How do I contact the lead engineer directly?</span>
            </h4>
            <p>
              You can contact <strong>Mir Ishfaq Ahmad</strong> directly on WhatsApp at <strong>+92-346-3079238</strong> or email at <strong>techhub905@gmail.com</strong> / <strong>mirishfaqahmad905@gmail.com</strong>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
