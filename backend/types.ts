export type AdminRole = 'superadmin' | 'admin' | 'editor' | 'author' | 'seo-manager' | 'ads-manager';

export interface AdminUser {
  id: string;
  username: string;
  email: string;
  passwordHash: string;
  role: AdminRole;
  permissions: string[];
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
  lastLogin: string | null;
}

export interface ScholarshipRecord {
  id: string;
  title: string;
  slug: string;
  organization: string;
  university?: string;
  country: string;
  city?: string;
  region: string;
  degreeLevels: string[];
  fields: string[];
  category: string;
  type: string;
  fundingType: string;
  tuitionCoverage: string;
  monthlyStipend?: string;
  airfare?: string;
  accommodation?: string;
  eligibleCountries: string[];
  eligibility: {
    nationalityRequirement?: string;
    academicRequirement?: string;
    ageLimit?: string;
    workExperience?: string;
  };
  languageRequirements: {
    ieltsRequired: boolean;
    ieltsMinScore?: number;
    toeflMinScore?: number;
    englishProficiencyCertificateAccepted?: boolean;
    notes?: string;
  };
  greRequired: boolean;
  applicationFee: string;
  deadline: string;
  openingDate?: string;
  duration?: string;
  description: string;
  fullOverview?: string;
  applicationUrl: string;
  officialWebsite?: string;
  image?: string;
  gallery?: string[];
  tags: string[];
  featured: boolean;
  popular?: boolean;
  status: 'published' | 'draft' | 'scheduled' | 'expired' | 'archived';
  verified: boolean;
  views?: number;
  bookmarksCount?: number;
  publishedAt?: string | null;
  scheduledAt?: string | null;
  expiresAt?: string | null;
  seoTitle?: string;
  seoDescription?: string;
  canonicalUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UniversityRecord {
  id: string;
  name: string;
  slug: string;
  country: string;
  city: string;
  flag?: string;
  rank?: string;
  ranking?: string;
  tuition?: string;
  website: string;
  image?: string;
  logo?: string;
  description: string;
  fundingOpportunities?: string[];
  popularFields?: string[];
  scholarshipCount?: number;
  seoTitle?: string;
  seoDescription?: string;
  status: 'published' | 'draft';
  createdAt: string;
  updatedAt: string;
}

export interface CountryRecord {
  id: string;
  name: string;
  slug: string;
  flag: string;
  region: string;
  description: string;
  averageLivingCost: string;
  workWhileStudying: string;
  postStudyWorkVisa: string;
  featured: boolean;
  topUniversities: string[];
  popularScholarships: string[];
  image: string;
  seoTitle?: string;
  seoDescription?: string;
  status: 'published' | 'draft';
  createdAt: string;
  updatedAt: string;
}

export interface CategoryRecord {
  id: string;
  name: string;
  slug: string;
  description: string;
  image?: string;
  icon?: string;
  position: number;
  status: 'active' | 'inactive';
  seoTitle?: string;
  seoDescription?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PostRecord {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  featuredImage: string;
  category: string;
  tags: string[];
  readTime: string;
  status: 'published' | 'draft' | 'scheduled' | 'archived';
  views: number;
  featured: boolean;
  publishedAt?: string | null;
  scheduledAt?: string | null;
  seoTitle?: string;
  seoDescription?: string;
  canonicalUrl?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AboutPageData {
  title: string;
  subtitle: string;
  content: string;
  mission: string;
  vision: string;
  whyChooseUs: string[];
  team: Array<{
    name: string;
    role: string;
    bio: string;
    avatar: string;
  }>;
  featuredImage: string;
  gallery: string[];
  socialLinks: Record<string, string>;
  seoTitle: string;
  seoDescription: string;
  canonicalUrl: string;
  status: string;
  updatedAt: string;
}

export interface ContactSettingsData {
  email: string;
  phone: string;
  whatsapp: string;
  address: string;
  workingHours: string;
  description: string;
  mapUrl: string;
  socialLinks: Record<string, string>;
  updatedAt: string;
}

export interface ContactMessageRecord {
  id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  category?: string;
  status: 'new' | 'read' | 'replied' | 'archived';
  submittedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface SocialMediaRecord {
  id: string;
  platform: string;
  name: string;
  url: string;
  icon: string;
  enabled: boolean;
  position: number;
  location: 'header' | 'footer' | 'sidebar' | 'about' | 'contact' | 'mobileMenu' | 'all';
  createdAt: string;
  updatedAt: string;
}

export interface MediaRecord {
  id: string;
  fileName: string;
  mimeType: string;
  imageData: string; // Base64 data:image/...
  fileSize: number;
  width?: number;
  height?: number;
  altText: string;
  caption?: string;
  uploadedBy: string;
  createdAt: string;
}

export interface SettingsData {
  siteName: string;
  siteUrl: string;
  logo: string;
  favicon: string;
  contactEmail: string;
  contactPhone: string;
  copyright: string;
  footerText: string;
  announcementBar: {
    enabled: boolean;
    badge: string;
    text: string;
    linkText: string;
    linkUrl: string;
    bgStyle: string;
  };
  header: {
    showSearch: boolean;
    showLanguageSwitcher: boolean;
    sticky: boolean;
  };
  footer: {
    showNewsletter: boolean;
    showSocial: boolean;
    columns: Array<{
      title: string;
      links: Array<{ label: string; url: string }>;
    }>;
  };
  defaultLanguage: string;
  updatedAt: string;
}

export interface NavigationRecord {
  id: string;
  label: string;
  url: string;
  parent?: string | null;
  position: number;
  enabled: boolean;
  target?: '_self' | '_blank';
  icon?: string;
  createdAt: string;
  updatedAt: string;
}

export interface SeoSettingsData {
  siteTitle: string;
  siteDescription: string;
  keywords: string[];
  canonicalUrl: string;
  defaultOgTitle: string;
  defaultOgDescription: string;
  defaultOgImage: string;
  googleVerification: string;
  bingVerification: string;
  robots: string;
  updatedAt: string;
}

export interface AdvertisementRecord {
  id: string;
  name: string;
  type: 'adsense' | 'custom-banner' | 'affiliate';
  placement: 'header' | 'belowHeader' | 'beforeContent' | 'insideContent' | 'afterContent' | 'sidebar' | 'beforeRelated' | 'afterRelated' | 'footer' | 'mobile' | 'desktop';
  code?: string;
  adClient?: string;
  adSlot?: string;
  bannerImage?: string;
  targetUrl?: string;
  altText?: string;
  status: 'active' | 'inactive';
  device: 'all' | 'desktop' | 'mobile';
  priority: number;
  startDate?: string;
  endDate?: string;
  pages: string[]; // e.g. ['all', 'home', 'scholarships', 'detail', 'news']
  createdAt: string;
  updatedAt: string;
}

export interface PageRecord {
  id: string;
  title: string;
  slug: string;
  content: string;
  sections?: any[];
  featuredImage?: string;
  status: 'published' | 'draft';
  seoTitle?: string;
  seoDescription?: string;
  canonicalUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface HomepageSection {
  id: string;
  key: string;
  name: string;
  enabled: boolean;
  position: number;
  title: string;
  subtitle?: string;
  description?: string;
  image?: string;
  buttonText?: string;
  buttonUrl?: string;
  limit?: number;
  customData?: Record<string, any>;
}

export interface HomepageSettingsData {
  hero: {
    enabled: boolean;
    title: string;
    subtitle: string;
    description: string;
    primaryButtonText: string;
    primaryButtonUrl: string;
    secondaryButtonText: string;
    secondaryButtonUrl: string;
    backgroundImage?: string;
    stats: Array<{ label: string; value: string }>;
  };
  sections: HomepageSection[];
  cta: {
    enabled: boolean;
    title: string;
    description: string;
    buttonText: string;
    buttonUrl: string;
    backgroundImage?: string;
  };
  newsletter: {
    enabled: boolean;
    title: string;
    subtitle: string;
    placeholder: string;
    buttonText: string;
  };
  updatedAt: string;
}

export interface AuditLogRecord {
  id: string;
  adminId: string;
  username: string;
  action: string;
  resource: string;
  resourceId?: string;
  details?: any;
  timestamp: string;
  ipAddress: string;
  userAgent: string;
}

export interface SubscriberRecord {
  id: string;
  email: string;
  subscribedAt: string;
  active: boolean;
  categories?: string[];
  source?: string;
}
