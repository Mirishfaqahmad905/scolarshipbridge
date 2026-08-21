import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Mail, 
  ShieldCheck, 
  Sparkles, 
  Send, 
  CheckCircle2, 
  Globe2, 
  BookOpen, 
  MapPin, 
  Phone, 
  Github, 
  Linkedin, 
  Award, 
  GraduationCap, 
  Code, 
  Briefcase, 
  Layers, 
  FileText, 
  User, 
  ExternalLink,
  MessageSquare,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';

export const AboutPage: React.FC = () => {
  return (
    <div id="about-us-page" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-10 pb-24 font-sans">
      <Breadcrumbs items={[{ label: 'About ScholarBridge & Leadership' }]} />

      {/* Hero Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-slate-800 p-8 sm:p-12 text-white shadow-xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold tracking-wide border border-indigo-500/30">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Our Mission & Leadership</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
            About ScholarBridge & Leadership
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
            ScholarBridge was engineered to democratize international higher education by providing direct, verified access to global scholarships, academic mentorship, and professional application services.
          </p>
        </div>
      </div>

      {/* Founder & Lead Developer Profile Section */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-8">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Avatar / Bio Card */}
          <div className="w-full lg:w-80 shrink-0 bg-gradient-to-b from-slate-900 to-indigo-950 rounded-3xl p-6 text-white text-center space-y-4 shadow-md">
            <div className="w-24 h-24 mx-auto rounded-2xl bg-gradient-to-tr from-amber-400 to-amber-500 text-slate-950 font-black text-3xl flex items-center justify-center shadow-lg shadow-amber-500/20">
              MIA
            </div>
            <div>
              <h2 className="text-xl font-black text-white">Mir Ishfaq Ahmad</h2>
              <p className="text-xs font-semibold text-amber-400 mt-1">
                Founder, MERN Stack Developer & CS Lecturer
              </p>
              <p className="text-[11px] text-slate-300 mt-0.5">
                Full-Stack Engineer & Academic Mentor
              </p>
            </div>

            <div className="pt-3 border-t border-slate-800 space-y-2 text-left text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Munda Qala, Dir Lower, KPK, Pakistan</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href="https://wa.me/923463079238" target="_blank" rel="noopener noreferrer" className="hover:underline text-emerald-300 font-mono">
                  +92-346-3079238
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-indigo-400 shrink-0" />
                <span className="truncate">techhub905@gmail.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-indigo-400 shrink-0" />
                <span className="truncate">mirishfaqahmad905@gmail.com</span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-center gap-3">
              <a
                href="https://github.com/Mirishfaqahmad905"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white transition-colors flex items-center gap-1.5 text-xs font-semibold"
              >
                <Github className="w-4 h-4" />
                <span>GitHub</span>
              </a>
              <a
                href="https://wa.me/923463079238"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white transition-colors flex items-center gap-1.5 text-xs font-semibold"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Detailed Biography & Qualifications */}
          <div className="flex-1 space-y-6 text-sm text-slate-700 leading-relaxed">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold mb-2">
                <Briefcase className="w-3.5 h-3.5" />
                <span>Professional Biography</span>
              </div>
              <h3 className="text-2xl font-bold text-slate-900">
                Engineering Academic Discovery & Full-Stack Solutions
              </h3>
              <p className="mt-3">
                I am a passionate and results-driven MERN Stack Developer with over three years of hands-on experience designing, developing, and deploying modern full-stack web applications. My core expertise spans React.js, Node.js, Express.js, and MongoDB, alongside deep proficiency in RESTful API development, database architecture, and responsive UI engineering.
              </p>
              <p className="mt-2">
                In parallel with my software engineering career, I serve as a <strong>Computer Science Lecturer</strong> at Jamal College of Science (JMC) and Khyber College of Munda, delivering conceptual and practical education in programming, database management systems (DBMS), networking, and modern web technologies.
              </p>
            </div>

            {/* Academic Credentials */}
            <div className="pt-4 border-t border-slate-100 space-y-3">
              <h4 className="font-bold text-slate-900 flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-indigo-600" />
                <span>Education & Qualifications</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <span className="font-bold text-slate-900 block">BS Computer Science</span>
                  <span className="text-slate-600">University of Malakand (2020 – 2024)</span>
                  <span className="text-indigo-600 font-semibold block mt-1">CGPA: 3.4 / 4.0</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <span className="font-bold text-slate-900 block">Diploma in Information Tech (DIT)</span>
                  <span className="text-slate-600">BTE Peshawar</span>
                  <span className="text-emerald-600 font-semibold block mt-1">Score: 95% (Distinction)</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <span className="font-bold text-slate-900 block">F.Sc (Computer Science)</span>
                  <span className="text-slate-600">Govt HSS Munda</span>
                  <span className="text-slate-600 font-semibold block mt-1">Score: 70.82%</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <span className="font-bold text-slate-900 block">Google Cybersecurity Certificate</span>
                  <span className="text-slate-600">Professional Cybersecurity Program</span>
                  <span className="text-amber-600 font-semibold block mt-1">In Progress (Expected 2 Months)</span>
                </div>
              </div>
            </div>

            {/* Core Technical Capabilities */}
            <div className="pt-4 border-t border-slate-100 space-y-3">
              <h4 className="font-bold text-slate-900 flex items-center gap-2">
                <Code className="w-5 h-5 text-indigo-600" />
                <span>Core Technical & Teaching Skills</span>
              </h4>
              <div className="flex flex-wrap gap-2 text-xs">
                {[
                  'React.js', 'Node.js', 'Express.js', 'MongoDB', 'JavaScript (ES6+)',
                  'TypeScript', 'Tailwind CSS', 'Bootstrap', 'REST APIs', 'JWT Auth',
                  'MySQL', 'PostgreSQL', 'SQL Server', 'Oracle DBA', 'Git & GitHub',
                  'Vercel & Netlify Deployment', 'Windows Server', 'Linux & Networking'
                ].map((skill, idx) => (
                  <span key={idx} className="px-3 py-1 bg-slate-100 text-slate-800 font-medium rounded-lg border border-slate-200">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Services Overview Section */}
      <div className="bg-gradient-to-br from-indigo-50 to-slate-100 rounded-3xl border border-indigo-100 p-8 sm:p-10 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-600 text-white text-xs font-bold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Full Mentorship & Delivery</span>
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Comprehensive Services We Provide For You
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              From international portal applications and ATS CV designs to complete research proposals and web systems.
            </p>
          </div>
          <Link
            to="/services"
            className="px-5 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-2 shrink-0"
          >
            <span>Explore All Services</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
              1
            </div>
            <h3 className="font-bold text-slate-900 text-sm">We Apply For You</h3>
            <p className="text-xs text-slate-600">
              Complete submission on government and university portals (DAAD, MEXT, GKS, CSC, Turkiye Burslari).
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
              2
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Academic CV & SOP Design</h3>
            <p className="text-xs text-slate-600">
              ATS-optimized academic CVs, statements of purpose, and custom motivation letters tailored to review committees.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              3
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Research Proposals & Web Apps</h3>
            <p className="text-xs text-slate-600">
              Masters & PhD research proposals with literature review, methodology, and full-stack web applications deployed on Vercel.
            </p>
          </div>
        </div>
      </div>

      {/* Trust & Guarantee */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-2">
          <ShieldCheck className="w-6 h-6 text-emerald-600" />
          <h4 className="font-bold text-slate-900 text-sm">100% Free Scholarship Portal</h4>
          <p className="text-xs text-slate-500">
            All public scholarship listings, official links, and deadline feeds remain completely free with zero subscription paywalls.
          </p>
        </div>
        <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-2">
          <Globe2 className="w-6 h-6 text-indigo-600" />
          <h4 className="font-bold text-slate-900 text-sm">Global Coverage</h4>
          <p className="text-xs text-slate-500">
            Monitoring 500+ verified scholarships across Germany, USA, UK, Canada, Australia, Japan, Korea, and Europe.
          </p>
        </div>
        <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-2">
          <BookOpen className="w-6 h-6 text-amber-600" />
          <h4 className="font-bold text-slate-900 text-sm">Direct Mentorship</h4>
          <p className="text-xs text-slate-500">
            Directly supervised by experienced academic educators and professional software engineers.
          </p>
        </div>
      </div>
    </div>
  );
};

export const ContactPage: React.FC = () => {
  const { addToast } = useApp();
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    phone: '',
    service: 'application_submission',
    subject: '', 
    message: '' 
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    addToast({
      type: 'success',
      title: 'Message Received Successfully! 🎉',
      message: 'Mir Ishfaq Ahmad and our team will review your inquiry within 12 hours.'
    });
  };

  return (
    <div id="contact-us-page" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-10 pb-24 font-sans">
      <Breadcrumbs items={[{ label: 'Contact ScholarBridge & Mentorship Desk' }]} />

      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-slate-800 p-8 sm:p-12 text-white shadow-xl">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold tracking-wide border border-indigo-500/30">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Get Direct Application & Academic Assistance</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
            Contact Mir Ishfaq Ahmad & Team
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
            Need us to apply for you, design your academic CV, draft your research proposal, or ask a scholarship query? We are here to help you succeed.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Direct Contact Info */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-xs space-y-6">
            <h3 className="text-lg font-bold text-slate-900">Direct Contact Details</h3>
            
            <div className="space-y-4 text-xs text-slate-600">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                  <User className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-slate-900 block text-sm">Mir Ishfaq Ahmad</span>
                  <span className="text-[11px] text-slate-500">MERN Stack Developer & Lecturer</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-slate-900 block">WhatsApp & Phone</span>
                  <a href="https://wa.me/923463079238" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:underline font-mono font-bold">
                    +92-346-3079238
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="truncate">
                  <span className="font-bold text-slate-900 block">Primary Email</span>
                  <a href="mailto:techhub905@gmail.com" className="text-indigo-600 hover:underline truncate block">
                    techhub905@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="truncate">
                  <span className="font-bold text-slate-900 block">Secondary Email</span>
                  <a href="mailto:mirishfaqahmad905@gmail.com" className="text-indigo-600 hover:underline truncate block">
                    mirishfaqahmad905@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-slate-900 block">Office / Location</span>
                  <span>Munda Qala, Dir Lower, KPK, Pakistan</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 space-y-2">
              <a
                href="https://wa.me/923463079238?text=Hello%20Mir%20Ishfaq%20Ahmad,%20I%20have%20a%20scholarship%20inquiry."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-md transition-colors flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Instant WhatsApp Chat</span>
              </a>
              <Link
                to="/services"
                className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <span>View Full Service Catalog</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Right Column: Contact & Service Submission Form */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs">
          {submitted ? (
            <div className="text-center py-16 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">Message Received Successfully!</h3>
              <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                Thank you for getting in touch. Mir Ishfaq Ahmad will personally inspect your requirements and respond via email or WhatsApp within 12 hours.
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="px-6 py-2.5 bg-indigo-600 text-white text-xs font-bold rounded-xl"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="border-b border-slate-100 pb-4">
                <h3 className="text-lg font-bold text-slate-900">Send an Inquiry or Request a Service</h3>
                <p className="text-slate-500 text-xs mt-0.5">
                  Fill in your details below and specify what you need assistance with.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700 uppercase tracking-wider block">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Elena Rostova"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-100"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700 uppercase tracking-wider block">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. elena@example.com"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-100"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700 uppercase tracking-wider block">WhatsApp / Phone (Optional)</label>
                  <input
                    type="text"
                    placeholder="e.g. +92 346 0000000"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-100"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700 uppercase tracking-wider block">Required Service</label>
                  <select
                    value={formData.service}
                    onChange={e => setFormData({ ...formData, service: e.target.value })}
                    className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-100 font-medium"
                  >
                    <option value="application_submission">We Apply For You (Portal Submission)</option>
                    <option value="cv_design">Academic / ATS CV Designing</option>
                    <option value="research_proposal">Research Proposal / Thesis Synopsis Drafting</option>
                    <option value="sop_motivation">Motivation Letter & SOP Writing</option>
                    <option value="lor_drafting">Recommendation Letter (LOR) Drafting</option>
                    <option value="web_deployment">Full-Stack Web Dev & Vercel Deployment</option>
                    <option value="general_inquiry">General Scholarship Inquiry</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-slate-700 uppercase tracking-wider block">Subject</label>
                <input
                  type="text"
                  required
                  placeholder="Brief summary of your inquiry (e.g. Germany Master's Application Help)"
                  value={formData.subject}
                  onChange={e => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-100"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-slate-700 uppercase tracking-wider block">Message Details</label>
                <textarea
                  rows={5}
                  required
                  placeholder="Provide your background, target country, program, deadlines, or questions..."
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-100"
                />
              </div>

              <div className="pt-2 flex items-center justify-between">
                <span className="text-[11px] text-slate-500">🔒 Confidential. Responded within 12 hours.</span>
                <button
                  type="submit"
                  className="px-8 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Inquiry</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <div id="privacy-page" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8 pb-20">
      <Breadcrumbs items={[{ label: 'Privacy Policy & Terms' }]} />
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
        <h1 className="text-2xl font-black text-slate-900">Privacy Policy & Terms of Use</h1>
        <p className="text-slate-500">Last updated: August 2026</p>
        <p>
          At ScholarBridge, student privacy and data security are our highest priority. We do not sell personal data to advertisers or third-party marketing brokers.
        </p>
        <h3 className="text-base font-bold text-slate-900 pt-3">Information We Collect</h3>
        <p>
          We only store optional student email addresses for weekly scholarship deadline notifications, and local browser bookmarks stored on your device. Any consultation data submitted through our forms is treated with strict academic confidentiality.
        </p>
        <h3 className="text-base font-bold text-slate-900 pt-3">External Portals</h3>
        <p>
          When you click &quot;Apply on Official Portal&quot;, you are redirected to the official host university, embassy, or government ministry website. Please consult their respective privacy policies.
        </p>
      </div>
    </div>
  );
};
