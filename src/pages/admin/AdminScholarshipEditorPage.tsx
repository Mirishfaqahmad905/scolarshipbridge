import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  Save, 
  ArrowLeft, 
  Globe, 
  DollarSign, 
  CheckSquare, 
  FileText, 
  Image as ImageIcon, 
  Search, 
  Calendar,
  Sparkles,
  ExternalLink,
  Eye,
  Trash2,
  AlertCircle
} from 'lucide-react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { RichTextEditor } from '../../components/admin/RichTextEditor';
import { Base64Uploader } from '../../components/admin/Base64Uploader';
import { scholarshipApi } from '../../services/api';
import { useApp } from '../../context/AppContext';

export const AdminScholarshipEditorPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToast } = useApp();

  const isEditing = Boolean(id && id !== 'create');
  const [activeTab, setActiveTab] = useState<'basic' | 'funding' | 'eligibility' | 'application' | 'media' | 'seo' | 'publishing'>('basic');
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Form State
  const [formData, setFormData] = useState<any>({
    title: '',
    slug: '',
    organization: '',
    university: '',
    country: 'United Kingdom',
    region: 'Europe',
    category: 'all',
    type: 'merit',
    fundingType: 'Fully Funded',
    tuitionCoverage: '100% Tuition Waiver',
    monthlyStipend: '£1,500 / month',
    airfareIncluded: true,
    accommodation: 'University housing provided',
    healthInsurance: 'Full comprehensive health insurance',
    totalValue: '£45,000 / year',
    degreeLevels: ['Masters', 'PhD'],
    minimumGpa: '3.5 / 4.0 or Upper Second-Class Honours',
    eligibleNationalities: ['All Nationalities (International)'],
    ageLimit: 'No strict age limit',
    ieltsRequired: true,
    ieltsWaiverAvailable: true,
    ieltsMinimumScore: '6.5 overall (no band below 6.0)',
    workExperience: 'Recommended but not mandatory',
    description: '',
    applicationStartDate: '2026-09-01',
    deadline: '2026-12-31',
    officialLink: 'https://',
    applyInstructions: '1. Complete the university admission application.\n2. Submit the scholarship funding application form.\n3. Upload research proposal and academic transcripts.',
    requiredDocuments: [
      'Academic Transcripts & Degree Certificates',
      'Statement of Purpose (SOP) / Motivational Letter',
      'Two Academic Reference Letters',
      'Curriculum Vitae (CV) / Resume',
      'English Language Proficiency Certificate or Waiver'
    ],
    featuredImage: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80',
    logo: '',
    status: 'published',
    featured: true,
    urgent: false,
    metaTitle: '',
    metaDescription: '',
    keywords: []
  });

  const [countriesList, setCountriesList] = useState<any[]>([]);
  const [categoriesList, setCategoriesList] = useState<any[]>([]);
  const [universitiesList, setUniversitiesList] = useState<any[]>([]);

  useEffect(() => {
    const loadDependencies = async () => {
      try {
        const [countries, categories, universities] = await Promise.all([
          scholarshipApi.admin.getCountries(),
          scholarshipApi.admin.getCategories(),
          scholarshipApi.admin.getUniversities()
        ]);
        setCountriesList(countries);
        setCategoriesList(categories);
        setUniversitiesList(universities);
      } catch (err) {
        // silent
      }
    };

    loadDependencies();
  }, []);

  useEffect(() => {
    if (isEditing && id) {
      const loadRecord = async () => {
        try {
          setIsLoading(true);
          const data = await scholarshipApi.admin.getScholarship(id);
          if (data) {
            setFormData(data);
          } else {
            addToast({ type: 'error', title: 'Not Found', message: 'Scholarship not found in database.' });
            navigate('/admin/scholarships');
          }
        } catch (err) {
          addToast({ type: 'error', title: 'Error', message: 'Failed to load scholarship details.' });
        } finally {
          setIsLoading(false);
        }
      };

      loadRecord();
    }
  }, [id, isEditing]);

  const handleTitleChange = (val: string) => {
    const updates: any = { title: val };
    if (!isEditing || !formData.slug) {
      updates.slug = val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    }
    if (!formData.metaTitle) {
      updates.metaTitle = `${val} 2026/2027 (Fully Funded)`;
    }
    setFormData((prev: any) => ({ ...prev, ...updates }));
  };

  const handleDegreeToggle = (degree: string) => {
    const current = formData.degreeLevels || [];
    const updated = current.includes(degree)
      ? current.filter((d: string) => d !== degree)
      : [...current, degree];
    setFormData({ ...formData, degreeLevels: updated });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title?.trim()) {
      addToast({ type: 'error', title: 'Validation Error', message: 'Scholarship title is required.' });
      return;
    }

    try {
      setIsSaving(true);
      const payload = {
        ...formData,
        id: isEditing ? id : `sch-${Date.now()}`,
        isNew: !isEditing
      };

      const res = await scholarshipApi.admin.saveScholarship(payload);
      if (res && res.success) {
        addToast({
          type: 'success',
          title: isEditing ? 'Scholarship Updated' : 'Scholarship Created',
          message: `Saved "${formData.title}" to scholarships.json.`
        });
        navigate('/admin/scholarships');
      }
    } catch (err: any) {
      addToast({
        type: 'error',
        title: 'Save Failed',
        message: err?.response?.data?.message || 'Could not persist scholarship into database.'
      });
    } finally {
      setIsSaving(false);
    }
  };

  const tabs = [
    { key: 'basic', label: '1. Basic Info', icon: <FileText className="w-4 h-4" /> },
    { key: 'funding', label: '2. Funding & Benefits', icon: <DollarSign className="w-4 h-4" /> },
    { key: 'eligibility', label: '3. Eligibility', icon: <CheckSquare className="w-4 h-4" /> },
    { key: 'application', label: '4. Application Steps', icon: <Calendar className="w-4 h-4" /> },
    { key: 'media', label: '5. Images (Base64)', icon: <ImageIcon className="w-4 h-4" /> },
    { key: 'seo', label: '6. SEO & Meta', icon: <Search className="w-4 h-4" /> },
    { key: 'publishing', label: '7. Publishing & Status', icon: <Globe className="w-4 h-4" /> }
  ];

  return (
    <AdminLayout
      title={isEditing ? `Edit: ${formData.title || 'Scholarship'}` : 'Create New Scholarship'}
      subtitle="Complete database record schema saved directly into scholarships.json"
    >
      <form onSubmit={handleSave} className="space-y-6 max-w-6xl">
        {/* Top Header Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-white rounded-3xl border border-slate-200 shadow-xs">
          <Link
            to="/admin/scholarships"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Scholarships List</span>
          </Link>

          <div className="flex items-center gap-3">
            {isEditing && (
              <Link
                to={`/scholarship/${id}`}
                target="_blank"
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
              >
                <Eye className="w-4 h-4" />
                <span>Live Preview</span>
              </Link>
            )}

            <button
              type="submit"
              disabled={isSaving}
              className="inline-flex items-center gap-2 px-6 py-2 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white text-xs font-bold rounded-xl shadow-md transition-all cursor-pointer disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{isSaving ? 'Saving to JSON...' : isEditing ? 'Save Changes' : 'Publish Scholarship'}</span>
            </button>
          </div>
        </div>

        {/* Tab Selection Bar */}
        <div className="flex items-center gap-1 overflow-x-auto p-1.5 bg-slate-200/80 rounded-2xl border border-slate-300/60 text-xs font-bold text-slate-600">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all whitespace-nowrap cursor-pointer ${
                activeTab === tab.key
                  ? 'bg-white text-indigo-700 shadow-xs font-black'
                  : 'hover:text-slate-900 hover:bg-white/40'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab 1: Basic Information */}
        {activeTab === 'basic' && (
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-6 animate-in fade-in">
            <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
              Basic Scholarship Information
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Scholarship Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title || ''}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="e.g. Oxford Clarendon International Scholarship 2026"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-900 focus:bg-white focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    URL Slug
                  </label>
                  <input
                    type="text"
                    value={formData.slug || ''}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono text-slate-700 focus:bg-white focus:border-indigo-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Organization / Sponsoring Body
                  </label>
                  <input
                    type="text"
                    value={formData.organization || ''}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    placeholder="e.g. Clarendon Fund & British Council"
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:border-indigo-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Host Country
                  </label>
                  <select
                    value={formData.country || ''}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 outline-none"
                  >
                    {countriesList.map((c) => (
                      <option key={c.id || c.code} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Host University / Institute
                  </label>
                  <input
                    type="text"
                    value={formData.university || ''}
                    onChange={(e) => setFormData({ ...formData, university: e.target.value })}
                    placeholder="e.g. University of Oxford"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:border-indigo-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Category
                  </label>
                  <select
                    value={formData.category || 'all'}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 outline-none"
                  >
                    {categoriesList.map((cat) => (
                      <option key={cat.id || cat.slug} value={cat.slug || cat.name}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <RichTextEditor
                  label="Detailed Scholarship Overview & Description"
                  value={formData.description || ''}
                  onChange={(val) => setFormData({ ...formData, description: val })}
                  placeholder="Describe the scholarship background, aims, faculty requirements..."
                />
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Funding & Benefits */}
        {activeTab === 'funding' && (
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-6 animate-in fade-in">
            <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
              Funding Level & Financial Coverage
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Funding Type
                </label>
                <select
                  value={formData.fundingType || 'Fully Funded'}
                  onChange={(e) => setFormData({ ...formData, fundingType: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 outline-none"
                >
                  <option value="Fully Funded">Fully Funded (Tuition + Stipend + Travel)</option>
                  <option value="Partial Funding">Partial Funding (Partial Tuition / Grant)</option>
                  <option value="Tuition Free">Tuition Free (100% Waiver Only)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Estimated Total Award Value
                </label>
                <input
                  type="text"
                  value={formData.totalValue || ''}
                  onChange={(e) => setFormData({ ...formData, totalValue: e.target.value })}
                  placeholder="e.g. $55,000 per year"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Tuition Coverage
                </label>
                <input
                  type="text"
                  value={formData.tuitionCoverage || ''}
                  onChange={(e) => setFormData({ ...formData, tuitionCoverage: e.target.value })}
                  placeholder="e.g. 100% full tuition waiver"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Monthly Living Allowance / Stipend
                </label>
                <input
                  type="text"
                  value={formData.monthlyStipend || ''}
                  onChange={(e) => setFormData({ ...formData, monthlyStipend: e.target.value })}
                  placeholder="e.g. $1,800 / month tax-free"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Accommodation Details
                </label>
                <input
                  type="text"
                  value={formData.accommodation || ''}
                  onChange={(e) => setFormData({ ...formData, accommodation: e.target.value })}
                  placeholder="e.g. University dormitory housing included"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Health & Medical Insurance
                </label>
                <input
                  type="text"
                  value={formData.healthInsurance || ''}
                  onChange={(e) => setFormData({ ...formData, healthInsurance: e.target.value })}
                  placeholder="e.g. Comprehensive international health insurance"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 outline-none"
                />
              </div>
            </div>

            <div className="pt-2">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={Boolean(formData.airfareIncluded)}
                  onChange={(e) => setFormData({ ...formData, airfareIncluded: e.target.checked })}
                  className="w-4 h-4 rounded-md border-slate-300 text-indigo-600 focus:ring-0"
                />
                <span className="text-xs font-bold text-slate-800">
                  Round-trip Economy International Airfare Tickets Included
                </span>
              </label>
            </div>
          </div>
        )}

        {/* Tab 3: Eligibility */}
        {activeTab === 'eligibility' && (
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-6 animate-in fade-in">
            <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
              Candidate Eligibility Criteria
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Eligible Degree Levels (Select all that apply)
                </label>
                <div className="flex flex-wrap items-center gap-3">
                  {['Undergraduate', 'Bachelors', 'Masters', 'PhD', 'Postdoctoral', 'Short Courses / Fellowships'].map((deg) => (
                    <button
                      key={deg}
                      type="button"
                      onClick={() => handleDegreeToggle(deg)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                        formData.degreeLevels?.includes(deg)
                          ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {deg}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Academic Requirement / Minimum GPA
                  </label>
                  <input
                    type="text"
                    value={formData.minimumGpa || ''}
                    onChange={(e) => setFormData({ ...formData, minimumGpa: e.target.value })}
                    placeholder="e.g. 3.0 / 4.0 or equivalent"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Age Limit
                  </label>
                  <input
                    type="text"
                    value={formData.ageLimit || ''}
                    onChange={(e) => setFormData({ ...formData, ageLimit: e.target.value })}
                    placeholder="e.g. Under 35 years old at time of application"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 outline-none"
                  />
                </div>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-800">English Language Requirements</label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={Boolean(formData.ieltsWaiverAvailable)}
                      onChange={(e) => setFormData({ ...formData, ieltsWaiverAvailable: e.target.checked })}
                      className="w-4 h-4 rounded-md border-slate-300 text-indigo-600"
                    />
                    <span className="text-xs font-semibold text-emerald-700">English Proficiency Waiver / Certificate Accepted</span>
                  </label>
                </div>
                <input
                  type="text"
                  value={formData.ieltsMinimumScore || ''}
                  onChange={(e) => setFormData({ ...formData, ieltsMinimumScore: e.target.value })}
                  placeholder="e.g. IELTS 6.5 or TOEFL 90 or English Medium of Instruction letter"
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Application Process */}
        {activeTab === 'application' && (
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-6 animate-in fade-in">
            <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
              Application Timelines & Official Steps
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Application Deadline *
                </label>
                <input
                  type="text"
                  required
                  value={formData.deadline || ''}
                  onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                  placeholder="e.g. December 15, 2026 or 2026-12-15"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Official Sponsor / University Portal URL *
                </label>
                <input
                  type="url"
                  required
                  value={formData.officialLink || ''}
                  onChange={(e) => setFormData({ ...formData, officialLink: e.target.value })}
                  placeholder="https://ox.ac.uk/clarendon-scholarships"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono text-slate-800 outline-none"
                />
              </div>
            </div>

            <div>
              <RichTextEditor
                label="Step-by-Step Application Instructions"
                value={formData.applyInstructions || ''}
                onChange={(val) => setFormData({ ...formData, applyInstructions: val })}
                placeholder="List step 1, step 2, step 3 for applicants..."
              />
            </div>
          </div>
        )}

        {/* Tab 5: Images & Media (Base64) */}
        {activeTab === 'media' && (
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-6 animate-in fade-in">
            <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
              Featured Media & Base64 Image Upload
            </h3>

            <div className="space-y-6">
              <Base64Uploader
                label="Featured Scholarship Banner Image"
                value={formData.featuredImage || ''}
                onChange={(base64) => setFormData({ ...formData, featuredImage: base64 })}
                helperText="Upload a high quality image. It will be encoded directly into Base64 format and stored in media.json."
              />

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Or External Image URL
                </label>
                <input
                  type="text"
                  value={formData.featuredImage || ''}
                  onChange={(e) => setFormData({ ...formData, featuredImage: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono text-slate-700 outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {/* Tab 6: SEO & Meta */}
        {activeTab === 'seo' && (
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-6 animate-in fade-in">
            <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
              Search Engine Optimization (SEO)
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Meta Title Tag
                </label>
                <input
                  type="text"
                  value={formData.metaTitle || ''}
                  onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
                  placeholder="Scholarship Name 2026/2027 (Fully Funded) | ScholarshipBride"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 outline-none"
                />
                <span className="text-[10px] text-slate-400">Recommended length: 50-60 characters</span>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Meta Description
                </label>
                <textarea
                  rows={3}
                  value={formData.metaDescription || ''}
                  onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                  placeholder="Comprehensive guide to Oxford Clarendon Scholarship: eligibility, benefits, full tuition waiver, monthly stipend, and step-by-step application walkthrough."
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 outline-none"
                />
                <span className="text-[10px] text-slate-400">Recommended length: 140-160 characters</span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 7: Publishing & Status */}
        {activeTab === 'publishing' && (
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-6 animate-in fade-in">
            <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
              Visibility & Publishing Controls
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Publication Status
                </label>
                <select
                  value={formData.status || 'published'}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full max-w-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 outline-none"
                >
                  <option value="published">Published (Visible on Live Website)</option>
                  <option value="draft">Draft (Hidden from Public)</option>
                  <option value="expired">Expired (Past Deadline)</option>
                  <option value="archived">Archived</option>
                </select>
              </div>

              <div className="space-y-2 pt-2">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={Boolean(formData.featured)}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="w-4 h-4 rounded-md border-slate-300 text-indigo-600"
                  />
                  <span className="text-xs font-bold text-slate-800">
                    Feature on Homepage Hero & Top Showcase
                  </span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={Boolean(formData.urgent)}
                    onChange={(e) => setFormData({ ...formData, urgent: e.target.checked })}
                    className="w-4 h-4 rounded-md border-slate-300 text-rose-600"
                  />
                  <span className="text-xs font-bold text-rose-700">
                    Mark with "Urgent Deadline" Badge
                  </span>
                </label>
              </div>
            </div>
          </div>
        )}
      </form>
    </AdminLayout>
  );
};
