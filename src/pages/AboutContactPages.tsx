import React, { useState } from 'react';
import { Mail, ShieldCheck, Sparkles, Send, CheckCircle2, Globe2, BookOpen, Lock } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';

export const AboutPage: React.FC = () => {
  return (
    <div id="about-us-page" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8 pb-20">
      <Breadcrumbs items={[{ label: 'About ScholarBridge' }]} />

      <div className="bg-gradient-to-r from-indigo-800 via-indigo-900 to-slate-900 rounded-3xl p-6 sm:p-10 text-white shadow-sm space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-amber-300 text-xs font-semibold border border-white/15">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Our Academic Mission</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
          About ScholarBridge Portal
        </h1>
        <p className="text-xs sm:text-sm text-indigo-100/90 leading-relaxed font-normal">
          Connecting talented international students with 100% verified, fully funded scholarships, government grants, and tuition-free university programs.
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 space-y-6 text-sm text-slate-700 leading-relaxed">
        <h2 className="text-xl font-bold text-slate-900">Why ScholarBridge Was Created</h2>
        <p>
          International education remains one of the most transformative opportunities for students worldwide. However, high agency fees, misleading information, and expired portals prevent hundreds of thousands of deserving scholars from accessing funded study abroad programs.
        </p>
        <p>
          ScholarBridge solves this by maintaining an open, free, and daily-verified directory of prestigious grants including DAAD Germany, Chevening UK, Fulbright USA, Japanese MEXT, Global Korea Scholarship (GKS), and Erasmus Mundus.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
            <h3 className="font-bold text-slate-900 text-base">100% Free</h3>
            <p className="text-xs text-slate-500">Zero subscriptions, paywalls, or agent placement markups.</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
            <h3 className="font-bold text-slate-900 text-base">Direct Links</h3>
            <p className="text-xs text-slate-500">Links lead straight to official embassy and university portals.</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
            <h3 className="font-bold text-slate-900 text-base">Verified Deadlines</h3>
            <p className="text-xs text-slate-500">Updated and monitored continuously by scholarship alumni.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ContactPage: React.FC = () => {
  const { addToast } = useApp();
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '', category: 'general' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    addToast({
      type: 'success',
      title: 'Inquiry Sent',
      message: 'Thank you! Our scholarship editorial team will review your message within 24 hours.'
    });
  };

  return (
    <div id="contact-us-page" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8 pb-20">
      <Breadcrumbs items={[{ label: 'Contact ScholarBridge Desk' }]} />

      <div className="bg-gradient-to-r from-indigo-800 via-indigo-900 to-slate-900 rounded-3xl p-6 sm:p-10 text-white shadow-sm space-y-3">
        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
          Contact Editorial & Verification Team
        </h1>
        <p className="text-xs sm:text-sm text-indigo-100/90 leading-relaxed font-normal">
          Have a newly announced scholarship opportunity, link correction, or partnership inquiry? Get in touch with our desk.
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs">
        {submitted ? (
          <div className="text-center py-12 space-y-3">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Message Received</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Thank you for reaching out. We have logged your inquiry into our verification queue.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="font-bold text-slate-700 uppercase tracking-wider block">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Elena Rostova"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-100"
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
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-100"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-slate-700 uppercase tracking-wider block">Inquiry Category</label>
              <select
                value={formData.category}
                onChange={e => setFormData({ ...formData, category: e.target.value })}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-100"
              >
                <option value="general">General Question</option>
                <option value="verification">Report Dead Link or Deadline Change</option>
                <option value="partnership">University / Organization Listing</option>
                <option value="technical">Technical Support</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-slate-700 uppercase tracking-wider block">Subject</label>
              <input
                type="text"
                required
                placeholder="Brief summary of your message"
                value={formData.subject}
                onChange={e => setFormData({ ...formData, subject: e.target.value })}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-100"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-slate-700 uppercase tracking-wider block">Message Details</label>
              <textarea
                rows={5}
                required
                placeholder="Provide specific scholarship links, details, or questions..."
                value={formData.message}
                onChange={e => setFormData({ ...formData, message: e.target.value })}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-100"
              />
            </div>

            <button
              type="submit"
              className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Send Message</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <div id="privacy-page" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8 pb-20">
      <Breadcrumbs items={[{ label: 'Privacy Policy' }]} />
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
        <h1 className="text-2xl font-black text-slate-900">Privacy Policy</h1>
        <p className="text-slate-500">Last updated: August 2026</p>
        <p>
          At ScholarBridge, student privacy and data security are our highest priority. We do not sell personal data to advertisers or third-party marketing brokers.
        </p>
        <h3 className="text-base font-bold text-slate-900 pt-3">Information We Collect</h3>
        <p>
          We only store optional student email addresses for weekly scholarship deadline notifications, and local browser bookmarks stored on your device.
        </p>
        <h3 className="text-base font-bold text-slate-900 pt-3">External Portals</h3>
        <p>
          When you click "Apply on Official Portal", you are redirected to the host university or government ministry website. Please consult their respective privacy policies.
        </p>
      </div>
    </div>
  );
};
