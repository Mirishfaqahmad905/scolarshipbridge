import React, { useState, useEffect } from 'react';
import { Save, Mail, Phone, MapPin, Clock, MessageSquare, Send, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { scholarshipApi } from '../../services/api';
import { useApp } from '../../context/AppContext';

export const AdminContactPage: React.FC = () => {
  const { addToast } = useApp();
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [formData, setFormData] = useState<any>({
    email: 'admissions@scholarshipbride.org',
    supportEmail: 'help@scholarshipbride.org',
    phone: '+44 20 7946 0912',
    whatsapp: '+44 7700 900077',
    address: '71-75 Shelton Street, Covent Garden, London, WC2H 9JQ, United Kingdom',
    officeHours: 'Monday – Friday: 9:00 AM – 6:00 PM (GMT)',
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2482.907997871239!2d-0.12574!3d51.51486!2m3!1f0!2f0!3f0!3m2!1i1024!2f768!4f13.1!3m3!1m2!1s0x487604cc9497e6eb%3A0x6b63d6fa33c3756a!2sCovent%20Garden%2C%20London!5e0!3m2!1sen!2suk!4v1620000000000',
    title: 'Get in Touch with Scholarship Advisors',
    subtitle: 'Have inquiries regarding deadlines, eligibility evaluations, or institutional partnership opportunities? Send us a message.',
    metaTitle: 'Contact Us | ScholarshipBride Global Advisory',
    metaDescription: 'Reach the ScholarshipBride editorial and international student advisory team.'
  });

  const loadData = async () => {
    try {
      setIsLoading(true);
      const data = await scholarshipApi.admin.getContactContent();
      if (data && Object.keys(data).length > 0) {
        setFormData(data);
      }
    } catch (err) {
      // silent
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSaving(true);
      await scholarshipApi.admin.updateContactContent(formData);
      addToast({
        type: 'success',
        title: 'Contact Settings Saved',
        message: 'Updated contact.json successfully.'
      });
    } catch (err) {
      addToast({ type: 'error', title: 'Error', message: 'Failed to update contact info.' });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <AdminLayout
      title="Contact Page & Support Information"
      subtitle="Configure public contact channels, support emails, and office location in contact.json"
    >
      <form onSubmit={handleSave} className="space-y-6 max-w-5xl">
        <div className="flex items-center justify-between p-4 bg-white rounded-3xl border border-slate-200 shadow-xs">
          <div className="flex items-center gap-3">
            <Link
              to="/admin/contact/messages"
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs rounded-xl"
            >
              <MessageSquare className="w-4 h-4" />
              <span>View User Inquiries Inbox</span>
            </Link>
          </div>

          <button
            type="submit"
            disabled={isSaving}
            className="inline-flex items-center gap-2 px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-md cursor-pointer disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{isSaving ? 'Saving...' : 'Save Contact Information'}</span>
          </button>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <h4 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">
            Public Contact Details
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                Official Primary Email
              </label>
              <input
                type="email"
                value={formData.email || ''}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none text-slate-900 font-medium"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                Student Support Email
              </label>
              <input
                type="email"
                value={formData.supportEmail || ''}
                onChange={(e) => setFormData({ ...formData, supportEmail: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none text-slate-900 font-medium"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                Direct Telephone
              </label>
              <input
                type="text"
                value={formData.phone || ''}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none text-slate-900 font-medium"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                WhatsApp Student Desk
              </label>
              <input
                type="text"
                value={formData.whatsapp || ''}
                onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none text-slate-900 font-medium"
              />
            </div>
          </div>

          <div className="text-xs space-y-3 pt-2">
            <div>
              <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                Physical Office Address
              </label>
              <input
                type="text"
                value={formData.address || ''}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none text-slate-900 font-medium"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                Operating Hours
              </label>
              <input
                type="text"
                value={formData.officeHours || ''}
                onChange={(e) => setFormData({ ...formData, officeHours: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none text-slate-900 font-medium"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                Google Maps Embed iFrame URL
              </label>
              <input
                type="text"
                value={formData.mapEmbedUrl || ''}
                onChange={(e) => setFormData({ ...formData, mapEmbedUrl: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono text-[11px] outline-none text-slate-700"
              />
            </div>
          </div>
        </div>
      </form>
    </AdminLayout>
  );
};
