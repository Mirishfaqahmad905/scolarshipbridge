import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  GraduationCap, 
  Mail, 
  Send, 
  ShieldCheck, 
  Globe2, 
  Heart, 
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Footer: React.FC = () => {
  const { subscribeNewsletter } = useApp();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      const res = subscribeNewsletter(email);
      if (res) {
        setSubscribed(true);
        setEmail('');
      }
    }
  };

  return (
    <footer id="main-footer" className="bg-slate-950 text-slate-300 border-t border-slate-900 mt-20">
      
      {/* Newsletter Callout Banner */}
      <div className="border-b border-slate-850 bg-gradient-to-r from-slate-900 via-indigo-950/80 to-slate-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-xl text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold mb-3 border border-indigo-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Never Miss a Fully Funded Scholarship Deadline</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Get Weekly Verified International Scholarship Alerts
            </h3>
            <p className="text-sm text-slate-400 mt-2 leading-relaxed">
              Join over 85,000 international students receiving curated scholarship bulletins, English waiver tips, and step-by-step application breakdowns.
            </p>
          </div>

          {/* Form */}
          <div className="w-full max-w-md">
            {subscribed ? (
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-sm flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>You’re subscribed! Check your inbox for our latest study-abroad starter kit.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
                  <input
                    id="footer-newsletter-email"
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Enter your email address..."
                    className="w-full pl-10 pr-4 py-3 bg-slate-900 text-white placeholder-slate-500 rounded-xl border border-slate-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none text-sm"
                  />
                </div>
                <button
                  id="footer-btn-subscribe"
                  type="submit"
                  className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl text-sm transition-all shadow-md shadow-indigo-600/30 flex items-center justify-center gap-2 shrink-0"
                >
                  <span>Subscribe</span>
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}
            <p className="text-[11px] text-slate-500 mt-2 text-center lg:text-left">
              🔒 We respect your privacy. No spam ever. Unsubscribe at any time with 1 click.
            </p>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-10">
          
          {/* Col 1: Brand Info */}
          <div className="col-span-2 md:col-span-4 lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-600/20">
                <GraduationCap className="w-5 h-5" />
              </div>
              <span className="font-black text-xl text-white tracking-tight">
                Scholar<span className="text-indigo-400">Bridge</span>
              </span>
            </Link>
            
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              ScholarBridge is an independent international scholarship and study-abroad intelligence portal. We connect global talent with fully funded scholarships, tuition waivers, and world-class academic fellowships.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>100% Free & Verified</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300">
                <Globe2 className="w-4 h-4 text-indigo-400" />
                <span>Global Reach</span>
              </div>
            </div>
          </div>

          {/* Col 2: Degrees */}
          <div>
            <h4 className="text-xs uppercase font-bold tracking-wider text-slate-200 mb-4">
              Degree Levels
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/scholarships?funding=fully-funded" className="hover:text-white transition-colors flex items-center gap-1">
                  <span>Fully Funded</span>
                  <span className="text-[10px] bg-amber-500/20 text-amber-300 px-1 rounded">Top</span>
                </Link>
              </li>
              <li>
                <Link to="/scholarships?degree=bachelor" className="hover:text-white transition-colors">
                  Undergraduate (Bachelor)
                </Link>
              </li>
              <li>
                <Link to="/scholarships?degree=master" className="hover:text-white transition-colors">
                  Master’s Scholarships
                </Link>
              </li>
              <li>
                <Link to="/scholarships?degree=phd" className="hover:text-white transition-colors">
                  PhD & Doctoral Grants
                </Link>
              </li>
              <li>
                <Link to="/scholarships?degree=postdoc" className="hover:text-white transition-colors">
                  Postdoctoral Research
                </Link>
              </li>
              <li>
                <Link to="/scholarships?ielts=no-ielts" className="hover:text-white transition-colors">
                  Without IELTS / Waivers
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Destinations */}
          <div>
            <h4 className="text-xs uppercase font-bold tracking-wider text-slate-200 mb-4">
              Top Destinations
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/countries/germany" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <span>🇩🇪 Germany</span>
                  <span className="text-[10px] text-emerald-400">€0 Tuition</span>
                </Link>
              </li>
              <li>
                <Link to="/countries/united-states" className="hover:text-white transition-colors">
                  🇺🇸 United States
                </Link>
              </li>
              <li>
                <Link to="/countries/united-kingdom" className="hover:text-white transition-colors">
                  🇬🇧 United Kingdom
                </Link>
              </li>
              <li>
                <Link to="/countries/canada" className="hover:text-white transition-colors">
                  🇨🇦 Canada
                </Link>
              </li>
              <li>
                <Link to="/countries/japan" className="hover:text-white transition-colors">
                  🇯🇵 Japan (MEXT)
                </Link>
              </li>
              <li>
                <Link to="/countries/south-korea" className="hover:text-white transition-colors">
                  🇰🇷 South Korea (GKS)
                </Link>
              </li>
              <li>
                <Link to="/countries/italy" className="hover:text-white transition-colors">
                  🇮🇹 Italy (DSU)
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Platform & Resources */}
          <div>
            <h4 className="text-xs uppercase font-bold tracking-wider text-slate-200 mb-4">
              Tools & Resources
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/calendar" className="hover:text-white transition-colors">
                  Deadline Calendar
                </Link>
              </li>
              <li>
                <Link to="/universities" className="hover:text-white transition-colors">
                  Universities Directory
                </Link>
              </li>
              <li>
                <Link to="/opportunities" className="hover:text-white transition-colors">
                  Internships & Exchange
                </Link>
              </li>
              <li>
                <Link to="/news" className="hover:text-white transition-colors">
                  SOP & Motivation Guides
                </Link>
              </li>
              <li>
                <Link to="/bookmarks" className="hover:text-white transition-colors">
                  My Saved Scholarships
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  Contact Support Desk
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  About ScholarBridge
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Disclaimer & Copyright Bottom Bar */}
        <div className="border-t border-slate-900 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p className="text-center md:text-left leading-relaxed">
            &copy; {new Date().getFullYear()} ScholarBridge. All rights reserved. ScholarBridge is an educational directory service. Always confirm official deadlines and requirements with host universities and embassy portals.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="hover:text-slate-300 transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-slate-300 transition-colors">Terms of Service</Link>
            <Link to="/disclaimer" className="hover:text-slate-300 transition-colors">Disclaimer</Link>
            <Link to="/contact" className="hover:text-slate-300 transition-colors">Contact Us</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};
