export type FundingType = 'Fully Funded' | 'Partial Funding' | 'Tuition Waiver' | 'Stipend Only' | 'Self Funded';

export type DegreeLevel = 'Bachelor' | 'Undergraduate' | 'Master' | 'PhD' | 'Postdoctoral' | 'Diploma' | 'Fellowship' | 'Non-Degree' | 'Internship' | 'Research' | 'Summer School' | 'Online Course';

export type OpportunityCategory = 
  | 'scholarships' 
  | 'fellowships' 
  | 'internships' 
  | 'research' 
  | 'exchange-programs' 
  | 'summer-schools' 
  | 'online-courses' 
  | 'study-abroad';

export type ScholarshipStatus = 'published' | 'draft' | 'archived';

export interface ApplicationStep {
  stepNumber: number;
  title: string;
  description: string;
  link?: string;
  linkLabel?: string;
  importantNote?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface Scholarship {
  id: string;
  title: string;
  slug: string;
  university?: string;
  organization: string;
  country: string;
  region: 'Europe' | 'North America' | 'Asia' | 'Australia & Oceania' | 'Middle East' | 'Africa' | 'Latin America' | 'Worldwide';
  city?: string;
  degreeLevels: DegreeLevel[];
  fields: string[];
  category: OpportunityCategory;
  type: 'Government' | 'University' | 'Private Foundation' | 'Corporate' | 'International Organization';
  fundingType: FundingType;
  fundingAmount?: string;
  tuitionCoverage: string; // e.g. "100% Full Tuition Waiver"
  monthlyStipend?: string; // e.g. "$2,200 / month (~$26,400/yr)"
  accommodation?: string; // e.g. "Free On-Campus Housing or €600/month housing allowance"
  airfare?: string; // e.g. "Return economy flight ticket provided"
  healthInsurance?: string; // e.g. "Comprehensive international medical cover included"
  visaSupport?: string; // e.g. "Official visa facilitation letter and visa fee reimbursement"
  researchSupport?: string; // e.g. "$5,000 annual research & conference travel grant"
  eligibleCountries: string[]; // e.g. ["All Nationalities", "Developing Countries", etc.]
  eligibility: {
    nationalityRequirement: string;
    academicRequirement: string;
    minimumGpa?: string;
    ageLimit?: string;
    workExperience?: string;
    otherRequirements?: string[];
  };
  languageRequirements: {
    ieltsRequired: boolean;
    ieltsScore?: string;
    toeflScore?: string;
    duolingoScore?: string;
    englishProficiencyCertificateAccepted: boolean;
    notes?: string;
  };
  greRequired: boolean;
  applicationFee: 'Free' | 'Paid' | 'Waived';
  applicationFeeAmount?: string;
  deadline: string; // ISO date format YYYY-MM-DD
  startDate?: string;
  duration: string; // e.g. "2 - 4 Years"
  numberOfAwards?: number | string; // e.g. "150 awards annually"
  studyMode?: 'Full-time' | 'Part-time' | 'Online' | 'Hybrid';
  description: string;
  fullOverview: string;
  aboutProvider?: string;
  whyApply?: string[];
  benefits: string[];
  requirements: string[];
  documents: string[];
  applicationSteps: ApplicationStep[];
  faq: FAQItem[];
  applicationUrl: string;
  officialWebsite: string;
  sourceUrl?: string;
  image: string;
  gallery?: string[];
  tags: string[];
  featured: boolean;
  popular: boolean;
  status: ScholarshipStatus;
  views: number;
  bookmarksCount: number;
  createdAt?: string;
  publishedAt: string;
  updatedAt: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  verified: boolean;
  verifiedBy?: string;
  verifiedAt?: string;
  lastChecked?: string;
  seoTitle?: string;
  seoDescription?: string;
}

export interface CountryInfo {
  slug: string;
  name: string;
  code: string;
  region: string;
  flag?: string;
  flagEmoji?: string;
  flagUrl?: string;
  image: string;
  bannerImage: string;
  currency: string;
  averageTuition: string;
  averageLivingCost: string;
  postStudyWorkVisa: string;
  language: string;
  overview: string;
  whyStudyHere: string[];
  visaGuidelines: string;
  topUniversities: string[];
  popularFields: string[];
  activeScholarshipsCount?: number;
  scholarshipCount?: number;
}

export interface UniversityInfo {
  slug: string;
  name: string;
  country: string;
  city: string;
  worldRank?: number;
  logo: string;
  bannerImage: string;
  website: string;
  description: string;
  acceptanceRate?: string;
  internationalStudentsPercent?: string;
  popularMajors: string[];
}

export interface NewsArticle {
  id: string;
  title: string;
  slug: string;
  category: 'Guides' | 'Tips' | 'Policy' | 'Interviews' | 'Rankings' | 'Visa';
  excerpt: string;
  content: string;
  image: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  publishedAt: string;
  readTime: string;
  tags: string[];
  featured?: boolean;
}

export interface UserComment {
  id: string;
  scholarshipId: string;
  authorName: string;
  authorEmail: string;
  authorAvatar?: string;
  content: string;
  createdAt: string;
  status: 'approved' | 'pending' | 'rejected';
  likes: number;
  replies?: {
    id: string;
    authorName: string;
    content: string;
    createdAt: string;
    isAdmin?: boolean;
  }[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'admin' | 'editor' | 'author' | 'user';
  createdAt: string;
  country?: string;
  targetDegree?: string;
  preferredFields?: string[];
  savedScholarshipIds: string[];
  recentlyViewedIds: string[];
  notificationsEnabled: boolean;
}

export interface AnnouncementConfig {
  enabled: boolean;
  text: string;
  linkText?: string;
  linkUrl?: string;
  badge?: string;
  bgStyle?: 'primary' | 'emerald' | 'amber' | 'indigo';
}

export interface FilterState {
  search: string;
  country: string;
  region: string;
  degree: string;
  funding: string;
  field: string;
  category: string;
  type: string;
  ielts: string; // 'all' | 'no-ielts' | 'ielts-required'
  fee: string; // 'all' | 'free' | 'paid'
  deadlineStatus: string; // 'all' | 'open' | 'closing-soon' | 'closed'
  sortBy: 'newest' | 'deadline' | 'popular' | 'views' | 'title-asc' | 'title-desc';
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  title: string;
  message: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  category: 'general' | 'partnership' | 'verification' | 'technical';
  submittedAt: string;
  read: boolean;
}

export interface Subscriber {
  id: string;
  email: string;
  subscribedAt: string;
  preferences?: string[];
  active: boolean;
}

export interface NewsletterSubscriptionResponse {
  success: boolean;
  alreadySubscribed?: boolean;
  email?: string;
  message: string;
}
