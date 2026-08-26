import bcrypt from 'bcryptjs';
import { JsonDatabase } from './jsonDatabase';
import { 
  AdminUser, 
  AboutPageData, 
  ContactSettingsData, 
  SettingsData, 
  SeoSettingsData, 
  SocialMediaRecord,
  NavigationRecord,
  AdvertisementRecord,
  CategoryRecord
} from '../types';
import { mockScholarships } from '../../src/data/mockScholarships';
import { mockCountries } from '../../src/data/mockCountries';
import { mockUniversities } from '../../src/data/mockUniversities';
import { mockNewsArticles } from '../../src/data/mockNews';

export async function initializeJsonDatabase(forceDiskWrite: boolean = false): Promise<void> {
  await JsonDatabase.ensureDirectories();

  // 1. Admins
  const existingAdmins = await JsonDatabase.findAll<AdminUser>('admins');
  const adminUsername = process.env.ADMIN_USERNAME || 'mirishfaqahmad';
  const adminPassword = process.env.ADMIN_INITIAL_PASSWORD || 'AAshfAAq;';
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@scholarbridge.org';

  const passwordHash = await bcrypt.hash(adminPassword, 10);
  const existingIndex = existingAdmins.findIndex((a) => a.username === adminUsername);

  if (existingIndex >= 0) {
    existingAdmins[existingIndex].passwordHash = passwordHash;
    existingAdmins[existingIndex].status = 'active';
    await JsonDatabase.writeData('admins', existingAdmins);
    console.log(`[Init] SuperAdmin credentials refreshed: ${adminUsername}`);
  } else {
    const superAdmin: AdminUser = {
      id: 'admin-super-01',
      username: adminUsername,
      email: adminEmail,
      passwordHash,
      role: 'superadmin',
      permissions: [
        'all',
        'manage_scholarships',
        'manage_universities',
        'manage_countries',
        'manage_categories',
        'manage_posts',
        'manage_media',
        'manage_settings',
        'manage_seo',
        'manage_ads',
        'manage_messages',
        'manage_admins',
        'manage_backups'
      ],
      status: 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      lastLogin: null
    };
    await JsonDatabase.writeData('admins', [superAdmin, ...existingAdmins]);
    console.log(`[Init] SuperAdmin created: ${adminUsername}`);
  }

  // 2. Scholarships
  if (forceDiskWrite || (await JsonDatabase.findAll('scholarships')).length === 0) {
    await JsonDatabase.writeData('scholarships', mockScholarships);
  }

  // 3. Universities
  if (forceDiskWrite || (await JsonDatabase.findAll('universities')).length === 0) {
    await JsonDatabase.writeData('universities', mockUniversities);
  }

  // 4. Countries
  if (forceDiskWrite || (await JsonDatabase.findAll('countries')).length === 0) {
    await JsonDatabase.writeData('countries', mockCountries);
  }

  // 5. Posts (News & Guides)
  if (forceDiskWrite || (await JsonDatabase.findAll('posts')).length === 0) {
    await JsonDatabase.writeData('posts', mockNewsArticles);
  }

  // 6. Categories
  if (forceDiskWrite || (await JsonDatabase.findAll<CategoryRecord>('categories')).length === 0) {
    const defaultCategories: CategoryRecord[] = [
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
    await JsonDatabase.writeData('categories', defaultCategories);
  }

  // 7. About Page Data
  const existingAbout = await JsonDatabase.readData<AboutPageData | null>('about', null);
  if (forceDiskWrite || !existingAbout || !existingAbout.title) {
    const defaultAbout: AboutPageData = {
      title: 'About ScholarBridge',
      subtitle: 'Empowering Global Scholars with Verified, Direct-Access Educational Funding',
      content: 'ScholarBridge is the world’s premier open-access platform dedicated to cataloging verified international scholarships, fellowships, tuition waivers, and study abroad funding opportunities. Our mission is to eliminate educational gatekeeping by connecting high-achieving students directly with official institutions and government grants.',
      mission: 'To democratize access to world-class higher education by providing free, accurate, and direct application pathways for every deserving student globally.',
      vision: 'A world where financial status is never a barrier to academic excellence and international research collaboration.',
      whyChooseUs: [
        '100% Verified Official Portals with zero intermediaries or hidden fees',
        'Real-Time Deadline Tracking with calendar alerts and timeline breakdowns',
        'Clear Eligibility Checklists with IELTS exemption and document requirements',
        'Direct Official Links connecting applicants straight to host universities and ministries'
      ],
      team: [
        {
          name: 'Mir Ishfaq Ahmad',
          role: 'Founder & Principal Editorial Director',
          bio: 'International education strategist and scholarship mentor with over a decade of experience guiding global applicants.',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'
        },
        {
          name: 'Elena Rostova',
          role: 'Head of Global Research & Verification',
          bio: 'Former DAAD fellow and Erasmus Mundus scholar specializing in European grant policies.',
          avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80'
        }
      ],
      featuredImage: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80',
      gallery: [],
      socialLinks: {
        facebook: 'https://facebook.com/scholarbridge',
        twitter: 'https://twitter.com/scholarbridge',
        linkedin: 'https://linkedin.com/company/scholarbridge',
        telegram: 'https://t.me/scholarbridge'
      },
      seoTitle: 'About ScholarBridge - Verified Global Scholarships Platform',
      seoDescription: 'Learn about ScholarBridge mission to provide verified international scholarships and study abroad resources.',
      canonicalUrl: 'https://scholarbridge.org/about',
      status: 'published',
      updatedAt: new Date().toISOString()
    };
    await JsonDatabase.writeData('about', defaultAbout);
  }

  // 8. Contact Settings
  const existingContact = await JsonDatabase.readData<ContactSettingsData | null>('contact', null);
  if (forceDiskWrite || !existingContact || !existingContact.email) {
    const defaultContact: ContactSettingsData = {
      email: 'admissions@scholarbridge.org',
      phone: '+49 89 289 01',
      whatsapp: '+49 152 12345678',
      address: 'ScholarBridge Global Education Desk, Munich & Oxford',
      workingHours: 'Monday - Friday: 08:00 AM - 06:00 PM (CET)',
      description: 'Have inquiries regarding scholarship verification, university partnerships, or editorial contributions? Reach out to our dedicated support team.',
      mapUrl: 'https://maps.google.com',
      socialLinks: {
        email: 'mailto:support@scholarbridge.org',
        telegram: 'https://t.me/scholarbridge'
      },
      updatedAt: new Date().toISOString()
    };
    await JsonDatabase.writeData('contact', defaultContact);
  }

  // 9. Contact Messages
  if (forceDiskWrite || !(await JsonDatabase.findAll('contactMessages'))) {
    await JsonDatabase.writeData('contactMessages', []);
  }

  // 10. Social Media
  if (forceDiskWrite || (await JsonDatabase.findAll<SocialMediaRecord>('socialMedia')).length === 0) {
    const defaultSocial: SocialMediaRecord[] = [
      {
        id: 'soc-1',
        platform: 'Telegram',
        name: 'ScholarBridge Official Channel',
        url: 'https://t.me/scholarbridge',
        icon: 'Send',
        enabled: true,
        position: 1,
        location: 'all',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: 'soc-2',
        platform: 'WhatsApp',
        name: 'Scholarship Community Alert Group',
        url: 'https://chat.whatsapp.com/scholarbridge',
        icon: 'MessageCircle',
        enabled: true,
        position: 2,
        location: 'all',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: 'soc-3',
        platform: 'LinkedIn',
        name: 'ScholarBridge Organization',
        url: 'https://linkedin.com/company/scholarbridge',
        icon: 'Linkedin',
        enabled: true,
        position: 3,
        location: 'footer',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: 'soc-4',
        platform: 'YouTube',
        name: 'ScholarBridge Application Tutorials',
        url: 'https://youtube.com/@scholarbridge',
        icon: 'Youtube',
        enabled: true,
        position: 4,
        location: 'footer',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ];
    await JsonDatabase.writeData('socialMedia', defaultSocial);
  }

  // 11. Media Library
  if (forceDiskWrite || !(await JsonDatabase.findAll('media'))) {
    await JsonDatabase.writeData('media', []);
  }

  // 12. Site Settings
  const existingSettings = await JsonDatabase.readData<SettingsData | null>('settings', null);
  if (forceDiskWrite || !existingSettings || !existingSettings.siteName) {
    const defaultSettings: SettingsData = {
      siteName: 'ScholarBridge',
      siteUrl: process.env.CLIENT_URL || 'http://localhost:3000',
      logo: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&w=150&q=80',
      favicon: '/favicon.ico',
      contactEmail: 'contact@scholarbridge.org',
      contactPhone: '+49 89 289 01',
      copyright: `© ${new Date().getFullYear()} ScholarBridge Global Education Foundation. All rights reserved.`,
      footerText: 'ScholarBridge is an independent international scholarship directory and knowledge portal providing free, verified application guidance for students worldwide.',
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
      footer: {
        showNewsletter: true,
        showSocial: true,
        columns: [
          {
            title: 'Explore Grants',
            links: [
              { label: 'Fully Funded Scholarships', url: '/category/fully-funded' },
              { label: 'Government Awards', url: '/category/government' },
              { label: 'Scholarships Without IELTS', url: '/category/no-ielts' },
              { label: 'Master & PhD Fellowships', url: '/category/postgraduate' }
            ]
          },
          {
            title: 'Top Destinations',
            links: [
              { label: 'Study in Germany (DAAD)', url: '/countries/germany' },
              { label: 'Study in the UK (Chevening)', url: '/countries/united-kingdom' },
              { label: 'Study in Japan (MEXT)', url: '/countries/japan' },
              { label: 'Study in South Korea (GKS)', url: '/countries/south-korea' }
            ]
          },
          {
            title: 'Platform & Support',
            links: [
              { label: 'About ScholarBridge', url: '/about' },
              { label: 'Application Guides & News', url: '/news' },
              { label: 'Direct Universities Index', url: '/universities' },
              { label: 'Contact Help Desk', url: '/contact' }
            ]
          }
        ]
      },
      defaultLanguage: 'en',
      updatedAt: new Date().toISOString()
    };
    await JsonDatabase.writeData('settings', defaultSettings);
  }

  // 13. SEO Global Settings
  const existingSeo = await JsonDatabase.readData<SeoSettingsData | null>('seo', null);
  if (forceDiskWrite || !existingSeo || !existingSeo.siteTitle) {
    const defaultSeo: SeoSettingsData = {
      siteTitle: 'ScholarBridge - International Scholarships, Grants & Study Abroad',
      siteDescription: 'Search and apply for fully funded international scholarships, government grants, DAAD, Chevening, MEXT, and university fellowships worldwide.',
      keywords: [
        'scholarships',
        'fully funded scholarships 2026',
        'study abroad',
        'DAAD Germany',
        'Chevening UK',
        'MEXT Japan',
        'GKS Korea',
        'Master scholarships',
        'PhD grants',
        'without IELTS'
      ],
      canonicalUrl: 'https://scholarbridge.org',
      defaultOgTitle: 'ScholarBridge - Verified Global Scholarships & Study Abroad Portal',
      defaultOgDescription: 'Find and track verified international scholarship deadlines and official application portals.',
      defaultOgImage: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80',
      googleVerification: 'google-site-verification-scholarbridge-code',
      bingVerification: 'bing-site-verification-scholarbridge-code',
      robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
      updatedAt: new Date().toISOString()
    };
    await JsonDatabase.writeData('seo', defaultSeo);
  }

  // 14. Advertisements & Google AdSense configuration
  if (forceDiskWrite || (await JsonDatabase.findAll<AdvertisementRecord>('advertisements')).length === 0) {
    const defaultAds: AdvertisementRecord[] = [
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
      },
      {
        id: 'ad-detail-sidebar',
        name: 'Scholarship Detail Sidebar Ad',
        type: 'adsense',
        placement: 'sidebar',
        adClient: 'ca-pub-XXXXXXXXXXXXXXX',
        adSlot: '9876543210',
        status: 'active',
        device: 'desktop',
        priority: 1,
        pages: ['detail', 'scholarships'],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: 'ad-in-article',
        name: 'In-Article Content Ad',
        type: 'adsense',
        placement: 'insideContent',
        adClient: 'ca-pub-XXXXXXXXXXXXXXX',
        adSlot: '5555555555',
        status: 'active',
        device: 'all',
        priority: 2,
        pages: ['news', 'guides', 'detail'],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ];
    await JsonDatabase.writeData('advertisements', defaultAds);
  }

  // 15. Navigation Menu
  if (forceDiskWrite || (await JsonDatabase.findAll<NavigationRecord>('navigation')).length === 0) {
    const defaultNav: NavigationRecord[] = [
      { id: 'nav-1', label: 'Explore Scholarships', url: '/scholarships', position: 1, enabled: true, target: '_self', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
      { id: 'nav-2', label: 'By Country', url: '/countries', position: 2, enabled: true, target: '_self', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
      { id: 'nav-3', label: 'Top Universities', url: '/universities', position: 3, enabled: true, target: '_self', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
      { id: 'nav-4', label: 'Application Guides', url: '/news', position: 4, enabled: true, target: '_self', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
      { id: 'nav-5', label: 'Deadline Calendar', url: '/calendar', position: 5, enabled: true, target: '_self', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
      { id: 'nav-6', label: 'About Us', url: '/about', position: 6, enabled: true, target: '_self', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }
    ];
    await JsonDatabase.writeData('navigation', defaultNav);
  }

  // 16. Pages
  if (forceDiskWrite || (await JsonDatabase.findAll('pages')).length === 0) {
    await JsonDatabase.writeData('pages', []);
  }

  // 17. Audit Logs
  if (forceDiskWrite || !(await JsonDatabase.findAll('auditLogs'))) {
    await JsonDatabase.writeData('auditLogs', []);
  }

  // 18. Subscribers
  if (forceDiskWrite || (await JsonDatabase.findAll('subscribers')).length === 0) {
    await JsonDatabase.writeData('subscribers', [
      { id: 'sub-1', email: 'alex.scholar@gmail.com', subscribedAt: '2026-08-01', active: true },
      { id: 'sub-2', email: 'elena.student@outlook.com', subscribedAt: '2026-08-05', active: true },
      { id: 'sub-3', email: 'raj.tech@yahoo.com', subscribedAt: '2026-08-10', active: true }
    ]);
  }

  console.log('[JsonDB] All JSON database files verified and initialized successfully.');
}
