import fs from 'fs/promises';
import path from 'path';
import { mockScholarships } from '../../src/data/mockScholarships';
import { mockCountries } from '../../src/data/mockCountries';
import { mockUniversities } from '../../src/data/mockUniversities';
import { mockNewsArticles } from '../../src/data/mockNews';

// Detect writable directory for serverless / containers
function resolveDataDirectory(): string {
  if (process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME || process.env.LAMBDA_TASK_ROOT) {
    return path.join('/tmp', 'scholarbridge_data');
  }
  return path.resolve(process.cwd(), 'backend', 'data');
}

function resolveBackupsDirectory(): string {
  if (process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME || process.env.LAMBDA_TASK_ROOT) {
    return path.join('/tmp', 'scholarbridge_backups');
  }
  return path.resolve(process.cwd(), 'backend', 'backups');
}

export const DATA_DIR = resolveDataDirectory();
export const BACKUPS_DIR = resolveBackupsDirectory();
export const BUNDLED_DATA_DIR = path.resolve(process.cwd(), 'backend', 'data');

// Default initial datasets
const DEFAULT_CATEGORIES = [
  {
    id: 'cat-1',
    name: 'Fully Funded Scholarships',
    slug: 'fully-funded',
    description: 'Complete tuition waivers, monthly stipends, health insurance, and international travel.',
    icon: 'Award',
    position: 1,
    status: 'active',
    seoTitle: 'Fully Funded International Scholarships 2026/2027',
    seoDescription: 'Find 100% full coverage scholarships worldwide with no tuition fees.',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'cat-2',
    name: 'Government Scholarships',
    slug: 'government',
    description: 'Official bilateral government awards including DAAD, Chevening, MEXT, GKS, and Fulbright.',
    icon: 'Landmark',
    position: 2,
    status: 'active',
    seoTitle: 'Government Funded Scholarships & Bilateral Fellowships',
    seoDescription: 'Apply to world-renowned prestigious government grants.',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'cat-3',
    name: 'Without IELTS Scholarships',
    slug: 'no-ielts',
    description: 'Study abroad opportunities accepting English Proficiency Certificates (MOI) and Duolingo.',
    icon: 'Globe',
    position: 3,
    status: 'active',
    seoTitle: 'Scholarships Without IELTS Requirements',
    seoDescription: 'Study overseas with medium of instruction certificates.',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'cat-4',
    name: 'Master & PhD Fellowships',
    slug: 'postgraduate',
    description: 'Postgraduate research grants, doctoral funding, and graduate assistantships.',
    icon: 'GraduationCap',
    position: 4,
    status: 'active',
    seoTitle: 'Master & PhD Research Fellowships',
    seoDescription: 'Explore fully funded postgraduate programs.',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

const DEFAULT_ADMIN = {
  id: 'admin-super-01',
  username: 'mirishfaqahmad',
  email: 'admin@scholarbridge.org',
  // bcrypt hash for 'AAshfAAq;'
  passwordHash: '$2a$10$f/dflQ7z845H4h0yKz.G7.2k6yPj6oX5sI1wQpL8Y1jE6uEwM7Sca',
  role: 'superadmin',
  permissions: ['all'],
  status: 'active',
  createdAt: '2026-01-01T00:00:00.000Z',
  updatedAt: new Date().toISOString(),
  lastLogin: null
};

const DEFAULT_SETTINGS = {
  siteName: 'ScholarBridge',
  siteUrl: 'https://scholarbridge.org',
  logo: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&w=150&q=80',
  favicon: '/favicon.ico',
  contactEmail: 'techhub905@gmail.com',
  contactPhone: '+92 346 3079238',
  copyright: `© ${new Date().getFullYear()} ScholarBridge. All rights reserved.`,
  footerText: 'ScholarBridge is an international scholarship and study-abroad intelligence portal providing verified application guidance.',
  announcementBar: {
    enabled: true,
    badge: '🔥 HOT 2026/2027 INTAKE',
    text: 'Explore Over 500+ Fully Funded International Scholarships & Study Abroad Opportunities',
    linkText: 'Explore Fully Funded',
    linkUrl: '/category/fully-funded',
    bgStyle: 'primary'
  },
  header: {
    showSearch: true,
    showLanguageSwitcher: true,
    sticky: true
  },
  defaultLanguage: 'en',
  updatedAt: new Date().toISOString()
};

const DEFAULT_SEO = {
  siteTitle: 'ScholarBridge - International Scholarships, Grants & Study Abroad',
  siteDescription: 'Search and apply for fully funded international scholarships, government grants, DAAD, Chevening, MEXT, and university fellowships worldwide.',
  keywords: ['scholarships', 'fully funded', 'study abroad', 'DAAD', 'MEXT', 'Chevening', 'without IELTS'],
  canonicalUrl: 'https://scholarbridge.org',
  defaultOgTitle: 'ScholarBridge - Verified Global Scholarships & Study Abroad Portal',
  defaultOgDescription: 'Find and track verified international scholarship deadlines and official application portals.',
  defaultOgImage: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80',
  googleVerification: 'google-site-verification-scholarbridge-code',
  bingVerification: 'bing-site-verification-scholarbridge-code',
  robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  updatedAt: new Date().toISOString()
};

const DEFAULT_ABOUT = {
  title: 'About ScholarBridge',
  subtitle: 'Empowering Global Scholars with Verified Educational Funding',
  content: 'ScholarBridge was founded to democratize international higher education by providing direct, verified access to global scholarships and mentorship.',
  mission: 'To democratize access to world-class higher education globally.',
  vision: 'A world where financial status is never a barrier to academic excellence.',
  whyChooseUs: [
    '100% Verified Official Portals with zero hidden fees',
    'Real-Time Deadline Tracking and calendar alerts',
    'Clear Eligibility Checklists with IELTS exemptions'
  ],
  team: [
    {
      name: 'Mir Ishfaq Ahmad',
      role: 'Founder, MERN Stack Developer & CS Lecturer',
      bio: 'Full-Stack Software Engineer & Academic Mentor based in Pakistan.',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'
    }
  ],
  updatedAt: new Date().toISOString()
};

const DEFAULT_CONTACT = {
  email: 'techhub905@gmail.com',
  phone: '+92 346 3079238',
  whatsapp: '+92 346 3079238',
  address: 'Munda Qala, Dir Lower, KPK, Pakistan',
  workingHours: 'Monday - Saturday: 09:00 AM - 08:00 PM (PKT)',
  description: 'Reach out for scholarship application assistance, ATS CV designs, and research proposals.',
  updatedAt: new Date().toISOString()
};

const DEFAULT_ADS = [
  {
    id: 'ad-top-banner',
    name: 'Top Header Leaderboard Ad',
    type: 'adsense',
    placement: 'header',
    adClient: 'ca-pub-XXXXXXXXXXXXXXX',
    adSlot: '1234567890',
    status: 'active',
    device: 'all',
    priority: 1,
    pages: ['all'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

const DEFAULT_NAVIGATION = [
  { id: 'nav-1', label: 'Explore Scholarships', url: '/scholarships', position: 1, enabled: true, target: '_self' },
  { id: 'nav-2', label: 'By Country', url: '/countries', position: 2, enabled: true, target: '_self' },
  { id: 'nav-3', label: 'Top Universities', url: '/universities', position: 3, enabled: true, target: '_self' },
  { id: 'nav-4', label: 'Application Services', url: '/services', position: 4, enabled: true, target: '_self' },
  { id: 'nav-5', label: 'Guides & News', url: '/news', position: 5, enabled: true, target: '_self' },
  { id: 'nav-6', label: 'Deadline Calendar', url: '/calendar', position: 6, enabled: true, target: '_self' },
  { id: 'nav-7', label: 'About Us', url: '/about', position: 7, enabled: true, target: '_self' }
];

const DEFAULT_SUBSCRIBERS = [
  { id: 'sub-1', email: 'techhub905@gmail.com', subscribedAt: '2026-08-01', active: true },
  { id: 'sub-2', email: 'alex.scholar@gmail.com', subscribedAt: '2026-08-05', active: true }
];

export class JsonDatabase {
  // In-Memory store guarantees 100% availability even in read-only / serverless environments
  private static memoryStore: Map<string, any> = new Map<string, any>([
    ['scholarships', [...mockScholarships]],
    ['countries', [...mockCountries]],
    ['universities', [...mockUniversities]],
    ['posts', [...mockNewsArticles]],
    ['categories', [...DEFAULT_CATEGORIES]],
    ['admins', [DEFAULT_ADMIN]],
    ['settings', { ...DEFAULT_SETTINGS }],
    ['seo', { ...DEFAULT_SEO }],
    ['about', { ...DEFAULT_ABOUT }],
    ['contact', { ...DEFAULT_CONTACT }],
    ['advertisements', [...DEFAULT_ADS]],
    ['navigation', [...DEFAULT_NAVIGATION]],
    ['subscribers', [...DEFAULT_SUBSCRIBERS]],
    ['contactMessages', []],
    ['media', []],
    ['pages', []],
    ['auditLogs', []]
  ]);

  /**
   * Ensure directories exist safely (no throw on read-only environments)
   */
  public static async ensureDirectories(): Promise<void> {
    try {
      await fs.mkdir(DATA_DIR, { recursive: true });
    } catch {
      // Safe ignore in read-only environments
    }
    try {
      await fs.mkdir(BACKUPS_DIR, { recursive: true });
    } catch {
      // Safe ignore in read-only environments
    }
  }

  /**
   * Read data from memory or disk safely without throwing
   */
  public static async readData<T = any>(filename: string, defaultValue: T = [] as any): Promise<T> {
    const cleanName = filename.replace('.json', '');

    // Check disk first if file exists
    try {
      const filePathsToTry = [
        path.join(DATA_DIR, `${cleanName}.json`),
        path.join(BUNDLED_DATA_DIR, `${cleanName}.json`)
      ];

      for (const fp of filePathsToTry) {
        try {
          const content = await fs.readFile(fp, 'utf-8');
          if (content && content.trim()) {
            const parsed = JSON.parse(content);
            if (parsed !== null && parsed !== undefined) {
              this.memoryStore.set(cleanName, parsed);
              return parsed as T;
            }
          }
        } catch {
          // continue checking next path
        }
      }
    } catch {
      // disk read failed, use memoryStore
    }

    // Return in-memory data
    if (this.memoryStore.has(cleanName)) {
      const memData = this.memoryStore.get(cleanName);
      if (memData !== null && memData !== undefined) {
        return memData as T;
      }
    }

    return defaultValue;
  }

  /**
   * Write data safely to in-memory store and persist to disk asynchronously
   */
  public static async writeData<T = any>(filename: string, data: T): Promise<void> {
    const cleanName = filename.replace('.json', '');

    // 1. Update in-memory store immediately
    this.memoryStore.set(cleanName, data);

    // 2. Attempt disk persistence safely in background without blocking
    try {
      await this.ensureDirectories();
      const jsonString = JSON.stringify(data, null, 2);
      const filepath = path.join(DATA_DIR, `${cleanName}.json`);
      await fs.writeFile(filepath, jsonString, 'utf-8').catch(() => {});

      if (DATA_DIR !== BUNDLED_DATA_DIR) {
        const bundledFilepath = path.join(BUNDLED_DATA_DIR, `${cleanName}.json`);
        await fs.writeFile(bundledFilepath, jsonString, 'utf-8').catch(() => {});
      }
    } catch {
      // Memory store already updated
    }
  }

  /**
   * Find all records in an array safely
   */
  public static async findAll<T = any>(filename: string): Promise<T[]> {
    try {
      const cleanName = filename.replace('.json', '');
      let data = await this.readData<T[]>(cleanName, [] as any);
      
      if (!Array.isArray(data)) {
        const mem = this.memoryStore.get(cleanName);
        if (Array.isArray(mem)) {
          data = mem as T[];
        } else {
          return [];
        }
      }
      return data.filter(Boolean);
    } catch {
      const cleanName = filename.replace('.json', '');
      const mem = this.memoryStore.get(cleanName);
      return Array.isArray(mem) ? mem.filter(Boolean) : [];
    }
  }

  /**
   * Find record by ID
   */
  public static async findById<T extends { id: string }>(filename: string, id: string): Promise<T | null> {
    try {
      const list = await this.findAll<T>(filename);
      return list.find((item) => item && String(item.id) === String(id)) || null;
    } catch {
      return null;
    }
  }

  /**
   * Find single record matching predicate
   */
  public static async findOne<T = any>(
    filename: string,
    predicate: (item: T) => boolean
  ): Promise<T | null> {
    try {
      const list = await this.findAll<T>(filename);
      return list.find((item) => item && predicate(item)) || null;
    } catch {
      return null;
    }
  }

  /**
   * Find all records matching predicate
   */
  public static async filter<T = any>(
    filename: string,
    predicate: (item: T) => boolean
  ): Promise<T[]> {
    try {
      const list = await this.findAll<T>(filename);
      return list.filter((item) => item && predicate(item));
    } catch {
      return [];
    }
  }

  /**
   * Create and insert new record
   */
  public static async create<T extends { id?: string }>(filename: string, item: T): Promise<T> {
    try {
      const list = await this.findAll<any>(filename);
      const finalItem = {
        ...item,
        id: item.id || `rec-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`
      };
      const updatedList = [finalItem, ...list.filter(Boolean)];
      await this.writeData(filename, updatedList);
      return finalItem as T;
    } catch {
      return item;
    }
  }

  /**
   * Update existing record
   */
  public static async update<T extends { id: string }>(
    filename: string,
    id: string,
    updates: Partial<T>
  ): Promise<T | null> {
    try {
      const list = await this.findAll<T>(filename);
      const index = list.findIndex((item) => item && String(item.id) === String(id));
      if (index === -1) return null;

      const updated = {
        ...list[index],
        ...updates,
        updatedAt: new Date().toISOString()
      };
      list[index] = updated;
      await this.writeData(filename, list);
      return updated;
    } catch {
      return null;
    }
  }

  /**
   * Remove record by ID
   */
  public static async remove<T extends { id: string }>(filename: string, id: string): Promise<boolean> {
    try {
      const list = await this.findAll<T>(filename);
      const initialLength = list.length;
      const filtered = list.filter((item) => item && String(item.id) !== String(id));
      if (filtered.length === initialLength) {
        return false;
      }
      await this.writeData(filename, filtered);
      return true;
    } catch {
      return false;
    }
  }
}
