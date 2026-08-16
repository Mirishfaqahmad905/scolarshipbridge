import { 
  Scholarship, 
  CountryInfo, 
  UniversityInfo, 
  NewsArticle, 
  FilterState, 
  UserComment, 
  ContactMessage, 
  Subscriber, 
  User 
} from '../types';
import { mockScholarships } from '../data/mockScholarships';
import { mockCountries } from '../data/mockCountries';
import { mockUniversities } from '../data/mockUniversities';
import { mockNewsArticles } from '../data/mockNews';

const STORAGE_KEYS = {
  SCHOLARSHIPS: 'scholarbridge_scholarships_v1',
  BOOKMARKS: 'scholarbridge_bookmarks_v1',
  RECENTLY_VIEWED: 'scholarbridge_recently_viewed_v1',
  COMMENTS: 'scholarbridge_comments_v1',
  SUBSCRIBERS: 'scholarbridge_subscribers_v1',
  CONTACT_MESSAGES: 'scholarbridge_contact_messages_v1',
  AUTH_USER: 'scholarbridge_auth_user_v1',
  ANNOUNCEMENT: 'scholarbridge_announcement_v1'
};

// Seed initial localStorage datasets if not present
export const initializeLocalStorage = () => {
  if (!localStorage.getItem(STORAGE_KEYS.SCHOLARSHIPS)) {
    localStorage.setItem(STORAGE_KEYS.SCHOLARSHIPS, JSON.stringify(mockScholarships));
  }
  if (!localStorage.getItem(STORAGE_KEYS.BOOKMARKS)) {
    localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(['sch-001', 'sch-002']));
  }
  if (!localStorage.getItem(STORAGE_KEYS.RECENTLY_VIEWED)) {
    localStorage.setItem(STORAGE_KEYS.RECENTLY_VIEWED, JSON.stringify(['sch-001', 'sch-003']));
  }
  if (!localStorage.getItem(STORAGE_KEYS.SUBSCRIBERS)) {
    const sampleSubscribers: Subscriber[] = [
      { id: 'sub-1', email: 'alex.scholar@gmail.com', subscribedAt: '2026-08-01', active: true },
      { id: 'sub-2', email: 'elena.student@outlook.com', subscribedAt: '2026-08-05', active: true },
      { id: 'sub-3', email: 'raj.tech@yahoo.com', subscribedAt: '2026-08-10', active: true }
    ];
    localStorage.setItem(STORAGE_KEYS.SUBSCRIBERS, JSON.stringify(sampleSubscribers));
  }
  if (!localStorage.getItem(STORAGE_KEYS.COMMENTS)) {
    const sampleComments: UserComment[] = [
      {
        id: 'comm-1',
        scholarshipId: 'sch-001',
        authorName: 'Maria Silva',
        authorEmail: 'maria.silva@example.com',
        content: 'I applied for the Helmut Schmidt Programme last intake and the tips on writing the public policy essay here were instrumental. Highly recommended!',
        createdAt: '2026-07-20T14:32:00Z',
        status: 'approved',
        likes: 12
      },
      {
        id: 'comm-2',
        scholarshipId: 'sch-003',
        authorName: 'Ahmed Tariq',
        authorEmail: 'ahmed.tariq@example.com',
        content: 'Can anyone confirm if the Japanese embassy requires apostilled documents or regular notary stamps for the first screening round?',
        createdAt: '2026-08-02T09:15:00Z',
        status: 'approved',
        likes: 4,
        replies: [
          {
            id: 'rep-1',
            authorName: 'ScholarBridge Editorial Desk',
            content: 'Hello Ahmed! For the initial Embassy screening, notarized English translations are accepted. Full Apostille is only requested after provisional selection.',
            createdAt: '2026-08-02T11:00:00Z',
            isAdmin: true
          }
        ]
      }
    ];
    localStorage.setItem(STORAGE_KEYS.COMMENTS, JSON.stringify(sampleComments));
  }
};

// API Service Abstraction Layer (structured for easy Node.js/Express + MongoDB swap)
export const scholarshipApi = {
  getAll: async (): Promise<Scholarship[]> => {
    initializeLocalStorage();
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SCHOLARSHIPS);
      return data ? JSON.parse(data) : mockScholarships;
    } catch {
      return mockScholarships;
    }
  },

  getBySlug: async (slug: string): Promise<Scholarship | null> => {
    const list = await scholarshipApi.getAll();
    return list.find(item => item.slug === slug || item.id === slug) || null;
  },

  saveScholarship: async (scholarship: Scholarship): Promise<Scholarship> => {
    const list = await scholarshipApi.getAll();
    const existingIndex = list.findIndex(s => s.id === scholarship.id);
    let updatedList: Scholarship[];
    if (existingIndex >= 0) {
      updatedList = [...list];
      updatedList[existingIndex] = { ...scholarship, updatedAt: new Date().toISOString().split('T')[0] };
    } else {
      const newScholarship = {
        ...scholarship,
        id: scholarship.id || `sch-${Date.now()}`,
        publishedAt: scholarship.publishedAt || new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0],
        views: scholarship.views || 0,
        bookmarksCount: scholarship.bookmarksCount || 0
      };
      updatedList = [newScholarship, ...list];
    }
    localStorage.setItem(STORAGE_KEYS.SCHOLARSHIPS, JSON.stringify(updatedList));
    return scholarship;
  },

  deleteScholarship: async (id: string): Promise<boolean> => {
    const list = await scholarshipApi.getAll();
    const filtered = list.filter(s => s.id !== id);
    localStorage.setItem(STORAGE_KEYS.SCHOLARSHIPS, JSON.stringify(filtered));
    return true;
  },

  toggleFeatured: async (id: string): Promise<Scholarship | null> => {
    const list = await scholarshipApi.getAll();
    const item = list.find(s => s.id === id);
    if (!item) return null;
    item.featured = !item.featured;
    localStorage.setItem(STORAGE_KEYS.SCHOLARSHIPS, JSON.stringify(list));
    return item;
  },

  incrementViewCount: async (id: string): Promise<void> => {
    const list = await scholarshipApi.getAll();
    const item = list.find(s => s.id === id);
    if (item) {
      item.views = (item.views || 0) + 1;
      localStorage.setItem(STORAGE_KEYS.SCHOLARSHIPS, JSON.stringify(list));
    }
  },

  getCountries: async (): Promise<CountryInfo[]> => {
    return mockCountries;
  },

  getCountryBySlug: async (slug: string): Promise<CountryInfo | null> => {
    return mockCountries.find(c => c.slug.toLowerCase() === slug.toLowerCase() || c.name.toLowerCase() === slug.toLowerCase()) || null;
  },

  getUniversities: async (): Promise<UniversityInfo[]> => {
    return mockUniversities;
  },

  getUniversityBySlug: async (slug: string): Promise<UniversityInfo | null> => {
    return mockUniversities.find(u => u.slug.toLowerCase() === slug.toLowerCase()) || null;
  },

  getNews: async (): Promise<NewsArticle[]> => {
    return mockNewsArticles;
  },

  getNewsBySlug: async (slug: string): Promise<NewsArticle | null> => {
    return mockNewsArticles.find(n => n.slug === slug || n.id === slug) || null;
  },

  filterScholarships: (scholarships: Scholarship[], filters: Partial<FilterState>): Scholarship[] => {
    return scholarships.filter(item => {
      // Search text match
      if (filters.search && filters.search.trim()) {
        const query = filters.search.toLowerCase().trim();
        const matchesTitle = item.title.toLowerCase().includes(query);
        const matchesUni = item.university?.toLowerCase().includes(query);
        const matchesOrg = item.organization.toLowerCase().includes(query);
        const matchesCountry = item.country.toLowerCase().includes(query);
        const matchesFields = item.fields.some(f => f.toLowerCase().includes(query));
        const matchesTags = item.tags.some(t => t.toLowerCase().includes(query));
        const matchesDesc = item.description.toLowerCase().includes(query);
        if (!matchesTitle && !matchesUni && !matchesOrg && !matchesCountry && !matchesFields && !matchesTags && !matchesDesc) {
          return false;
        }
      }

      // Country match
      if (filters.country && filters.country !== 'all') {
        if (item.country.toLowerCase() !== filters.country.toLowerCase()) {
          return false;
        }
      }

      // Region match
      if (filters.region && filters.region !== 'all') {
        if (item.region.toLowerCase() !== filters.region.toLowerCase()) {
          return false;
        }
      }

      // Degree level match
      if (filters.degree && filters.degree !== 'all') {
        const target = filters.degree.toLowerCase();
        const hasDegree = item.degreeLevels.some(d => d.toLowerCase() === target || (target === 'bachelor' && d === 'Undergraduate'));
        if (!hasDegree) return false;
      }

      // Funding type match
      if (filters.funding && filters.funding !== 'all') {
        const target = filters.funding.toLowerCase();
        if (target === 'fully-funded' && item.fundingType !== 'Fully Funded') return false;
        if (target === 'partial' && item.fundingType !== 'Partial Funding') return false;
        if (target === 'tuition-free' && !item.tuitionCoverage.toLowerCase().includes('free') && !item.tuitionCoverage.toLowerCase().includes('100%')) return false;
        if (target === 'stipend' && !item.monthlyStipend) return false;
      }

      // Field of study match
      if (filters.field && filters.field !== 'all') {
        const target = filters.field.toLowerCase();
        const matchesField = item.fields.some(f => f.toLowerCase().includes(target));
        if (!matchesField) return false;
      }

      // Category match
      if (filters.category && filters.category !== 'all') {
        if (item.category !== filters.category) return false;
      }

      // Type match (Government, University, etc.)
      if (filters.type && filters.type !== 'all') {
        if (item.type.toLowerCase() !== filters.type.toLowerCase()) return false;
      }

      // IELTS filter
      if (filters.ielts && filters.ielts !== 'all') {
        if (filters.ielts === 'no-ielts' && item.languageRequirements.ieltsRequired) return false;
        if (filters.ielts === 'ielts-required' && !item.languageRequirements.ieltsRequired) return false;
      }

      // Application fee
      if (filters.fee && filters.fee !== 'all') {
        if (filters.fee === 'free' && item.applicationFee !== 'Free') return false;
        if (filters.fee === 'paid' && item.applicationFee !== 'Paid') return false;
      }

      // Deadline Status
      if (filters.deadlineStatus && filters.deadlineStatus !== 'all') {
        const today = new Date();
        const deadlineDate = new Date(item.deadline);
        const diffDays = Math.ceil((deadlineDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
        
        if (filters.deadlineStatus === 'open' && diffDays < 0) return false;
        if (filters.deadlineStatus === 'closing-soon' && (diffDays < 0 || diffDays > 30)) return false;
        if (filters.deadlineStatus === 'closed' && diffDays >= 0) return false;
      }

      return true;
    }).sort((a, b) => {
      const sortBy = filters.sortBy || 'newest';
      if (sortBy === 'newest') {
        return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
      }
      if (sortBy === 'deadline') {
        return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
      }
      if (sortBy === 'popular') {
        return (b.bookmarksCount || 0) - (a.bookmarksCount || 0);
      }
      if (sortBy === 'views') {
        return (b.views || 0) - (a.views || 0);
      }
      if (sortBy === 'title-asc') {
        return a.title.localeCompare(b.title);
      }
      if (sortBy === 'title-desc') {
        return b.title.localeCompare(a.title);
      }
      return 0;
    });
  }
};
