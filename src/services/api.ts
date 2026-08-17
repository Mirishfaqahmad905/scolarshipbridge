import axios from 'axios';
import { 
  Scholarship, 
  CountryInfo, 
  UniversityInfo, 
  NewsArticle, 
  FilterState, 
  ContactMessage, 
  Subscriber, 
  User 
} from '../types';
import { mockScholarships } from '../data/mockScholarships';
import { mockCountries } from '../data/mockCountries';
import { mockUniversities } from '../data/mockUniversities';
import { mockNewsArticles } from '../data/mockNews';

// Axios instance configured for API communication
export const apiClient = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor to attach JWT token if present
apiClient.interceptors.request.use((config) => {
  try {
    const token = localStorage.getItem('scholarbridge_admin_token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch {
    // Ignore in case localStorage is unavailable
  }
  return config;
});

export const scholarshipApi = {
  /**
   * Fetch all scholarships with optional query filters
   */
  getAll: async (filters?: Partial<FilterState>): Promise<Scholarship[]> => {
    try {
      const response = await apiClient.get('/scholarships', {
        params: {
          limit: 100,
          ...filters
        }
      });
      if (response.data && response.data.success && Array.isArray(response.data.data)) {
        return response.data.data;
      }
      return mockScholarships;
    } catch (err) {
      console.warn('[API] Could not reach backend /api/scholarships, fallback to dataset:', err);
      return mockScholarships;
    }
  },

  /**
   * Fetch single scholarship by slug or ID
   */
  getBySlug: async (slug: string): Promise<Scholarship | null> => {
    try {
      const response = await apiClient.get(`/scholarships/${slug}`);
      if (response.data && response.data.success && response.data.data) {
        return response.data.data;
      }
      const list = await scholarshipApi.getAll();
      return list.find((item) => item.slug === slug || item.id === slug) || null;
    } catch {
      const list = await scholarshipApi.getAll();
      return list.find((item) => item.slug === slug || item.id === slug) || null;
    }
  },

  /**
   * Create or update scholarship in JSON database
   */
  saveScholarship: async (scholarship: Partial<Scholarship>): Promise<Scholarship> => {
    if (scholarship.id) {
      const response = await apiClient.put(`/admin/scholarships/${scholarship.id}`, scholarship);
      return response.data.data || (scholarship as Scholarship);
    } else {
      const response = await apiClient.post('/admin/scholarships', scholarship);
      return response.data.data || (scholarship as Scholarship);
    }
  },

  /**
   * Delete scholarship permanently from scholarships.json
   */
  deleteScholarship: async (id: string): Promise<boolean> => {
    const response = await apiClient.delete(`/admin/scholarships/${id}`);
    return response.data && response.data.success;
  },

  /**
   * Toggle featured status
   */
  toggleFeatured: async (id: string, currentFeatured: boolean = false): Promise<Scholarship | null> => {
    const response = await apiClient.put(`/admin/scholarships/${id}`, {
      featured: !currentFeatured
    });
    return response.data.data || null;
  },

  /**
   * Increment view count
   */
  incrementViewCount: async (id: string): Promise<void> => {
    try {
      await apiClient.get(`/scholarships/${id}`);
    } catch {
      // ignore
    }
  },

  /**
   * Filter and sort scholarships in-memory
   */
  filterScholarships: (scholarships: Scholarship[], filters: FilterState): Scholarship[] => {
    return scholarships.filter((item) => {
      if (filters.search) {
        const q = filters.search.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(q);
        const matchesCountry = item.country.toLowerCase().includes(q);
        const matchesOrg = item.organization.toLowerCase().includes(q);
        const matchesField = item.fields?.some((f) => f.toLowerCase().includes(q));
        if (!matchesTitle && !matchesCountry && !matchesOrg && !matchesField) return false;
      }
      if (filters.country && filters.country !== 'all' && item.country.toLowerCase() !== filters.country.toLowerCase()) {
        return false;
      }
      if (filters.region && filters.region !== 'all' && item.region.toLowerCase() !== filters.region.toLowerCase()) {
        return false;
      }
      if (filters.degree && filters.degree !== 'all' && !item.degreeLevels.includes(filters.degree as any)) {
        return false;
      }
      if (filters.funding && filters.funding !== 'all' && item.fundingType !== filters.funding) {
        return false;
      }
      if (filters.field && filters.field !== 'all' && !item.fields.includes(filters.field)) {
        return false;
      }
      if (filters.ielts === 'no-ielts' && item.languageRequirements?.ieltsRequired) {
        return false;
      }
      if (filters.fee === 'free' && item.applicationFee && item.applicationFee.toLowerCase() !== 'free') {
        return false;
      }
      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'deadline') {
        return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
      }
      if (filters.sortBy === 'popular' || filters.sortBy === 'views') {
        return (b.views || 0) - (a.views || 0);
      }
      return new Date(b.publishedAt || b.createdAt || '').getTime() - new Date(a.publishedAt || a.createdAt || '').getTime();
    });
  },

  /**
   * Countries
   */
  getCountries: async (): Promise<CountryInfo[]> => {
    try {
      const response = await apiClient.get('/countries');
      if (response.data && response.data.success && Array.isArray(response.data.data)) {
        return response.data.data;
      }
      return mockCountries;
    } catch {
      return mockCountries;
    }
  },

  getCountryBySlug: async (slug: string): Promise<CountryInfo | null> => {
    const countries = await scholarshipApi.getCountries();
    return countries.find((c) => c.slug.toLowerCase() === slug.toLowerCase() || c.name.toLowerCase() === slug.toLowerCase()) || null;
  },

  /**
   * Universities
   */
  getUniversities: async (): Promise<UniversityInfo[]> => {
    try {
      const response = await apiClient.get('/universities');
      if (response.data && response.data.success && Array.isArray(response.data.data)) {
        return response.data.data;
      }
      return mockUniversities;
    } catch {
      return mockUniversities;
    }
  },

  getUniversityBySlug: async (slug: string): Promise<UniversityInfo | null> => {
    const list = await scholarshipApi.getUniversities();
    return list.find((u) => u.slug.toLowerCase() === slug.toLowerCase()) || null;
  },

  /**
   * News & Guides
   */
  getNews: async (): Promise<NewsArticle[]> => {
    try {
      const response = await apiClient.get('/posts');
      if (response.data && response.data.success && Array.isArray(response.data.data)) {
        return response.data.data;
      }
      return mockNewsArticles;
    } catch {
      return mockNewsArticles;
    }
  },

  getNewsBySlug: async (slug: string): Promise<NewsArticle | null> => {
    try {
      const response = await apiClient.get(`/posts/${slug}`);
      if (response.data && response.data.success && response.data.data) {
        return response.data.data;
      }
      const list = await scholarshipApi.getNews();
      return list.find((n) => n.slug === slug || n.id === slug) || null;
    } catch {
      const list = await scholarshipApi.getNews();
      return list.find((n) => n.slug === slug || n.id === slug) || null;
    }
  },

  /**
   * About page
   */
  getAbout: async () => {
    const response = await apiClient.get('/about');
    return response.data.data;
  },

  updateAbout: async (data: any) => {
    const response = await apiClient.put('/admin/about', data);
    return response.data.data;
  },

  /**
   * Contact
   */
  getContactSettings: async () => {
    const response = await apiClient.get('/contact/settings');
    return response.data.data;
  },

  submitContactMessage: async (data: { name: string; email: string; subject?: string; message: string; category?: string }) => {
    const response = await apiClient.post('/contact/messages', data);
    return response.data;
  },

  getContactMessages: async () => {
    const response = await apiClient.get('/admin/contact/messages');
    return response.data.data || [];
  },

  deleteContactMessage: async (id: string) => {
    const response = await apiClient.delete(`/admin/contact/messages/${id}`);
    return response.data;
  },

  /**
   * Social Media
   */
  getSocialMedia: async (location?: string) => {
    const response = await apiClient.get('/social', { params: { location } });
    return response.data.data || [];
  },

  /**
   * Site Settings & Announcements
   */
  getSettings: async () => {
    const response = await apiClient.get('/settings');
    return response.data.data;
  },

  updateSettings: async (data: any) => {
    const response = await apiClient.put('/admin/settings', data);
    return response.data.data;
  },

  /**
   * Advertisements
   */
  getAds: async (placement?: string) => {
    const response = await apiClient.get('/ads', { params: { placement } });
    return response.data.data || [];
  },

  /**
   * Media Library & Base64 Upload / Delete
   */
  media: {
    getAll: async () => {
      const response = await apiClient.get('/admin/media');
      return response.data.data || [];
    },

    uploadBase64: async (payload: {
      fileName: string;
      imageData: string; // Base64
      altText?: string;
      caption?: string;
      width?: number;
      height?: number;
      fileSize?: number;
    }) => {
      const response = await apiClient.post('/admin/media', payload);
      return response.data;
    },

    deleteMedia: async (id: string) => {
      const response = await apiClient.delete(`/admin/media/${id}`);
      return response.data;
    }
  },

  /**
   * Newsletter Subscribe
   */
  subscribeNewsletter: async (email: string) => {
    const response = await apiClient.post('/newsletter/subscribe', { email });
    return response.data;
  },

  /**
   * Admin Authentication & Dashboard
   */
  admin: {
    login: async (username: string, password: string) => {
      const response = await apiClient.post('/admin/auth/login', { username, password });
      if (response.data && response.data.token) {
        localStorage.setItem('scholarbridge_admin_token', response.data.token);
      }
      if (response.data && response.data.user) {
        localStorage.setItem('scholarshipbride_admin_user', JSON.stringify(response.data.user));
      }
      return response.data;
    },

    logout: async () => {
      try {
        await apiClient.post('/admin/auth/logout');
      } finally {
        localStorage.removeItem('scholarbridge_admin_token');
        localStorage.removeItem('scholarshipbride_admin_user');
      }
    },

    getDashboardStats: async () => {
      const response = await apiClient.get('/admin/dashboard');
      return response.data.data;
    },

    search: async (q: string) => {
      const response = await apiClient.get('/admin/search', { params: { q } });
      return response.data.data;
    },

    // Scholarships CRUD
    getScholarships: async (params?: any) => {
      const response = await apiClient.get('/admin/scholarships', { params });
      return response.data;
    },
    getScholarship: async (id: string) => {
      const response = await apiClient.get(`/admin/scholarships/${id}`);
      return response.data.data;
    },
    saveScholarship: async (data: any) => {
      if (data.id && !data.isNew) {
        const response = await apiClient.put(`/admin/scholarships/${data.id}`, data);
        return response.data;
      } else {
        const response = await apiClient.post('/admin/scholarships', data);
        return response.data;
      }
    },
    deleteScholarship: async (id: string) => {
      const response = await apiClient.delete(`/admin/scholarships/${id}`);
      return response.data;
    },
    publishScholarship: async (id: string) => {
      const response = await apiClient.post(`/admin/scholarships/${id}/publish`);
      return response.data;
    },
    unpublishScholarship: async (id: string) => {
      const response = await apiClient.post(`/admin/scholarships/${id}/unpublish`);
      return response.data;
    },
    archiveScholarship: async (id: string) => {
      const response = await apiClient.post(`/admin/scholarships/${id}/archive`);
      return response.data;
    },
    duplicateScholarship: async (id: string) => {
      const response = await apiClient.post(`/admin/scholarships/${id}/duplicate`);
      return response.data;
    },

    // Blog Posts CRUD
    getPosts: async () => {
      const response = await apiClient.get('/admin/posts');
      return response.data.data || [];
    },
    getPost: async (id: string) => {
      const list = await apiClient.get('/admin/posts');
      const found = (list.data.data || []).find((p: any) => p.id === id || p.slug === id);
      return found || null;
    },
    savePost: async (data: any) => {
      if (data.id && !data.isNew) {
        const response = await apiClient.put(`/admin/posts/${data.id}`, data);
        return response.data;
      } else {
        const response = await apiClient.post('/admin/posts', data);
        return response.data;
      }
    },
    deletePost: async (id: string) => {
      const response = await apiClient.delete(`/admin/posts/${id}`);
      return response.data;
    },

    // Universities CRUD
    getUniversities: async () => {
      const response = await apiClient.get('/admin/universities');
      return response.data.data || [];
    },
    saveUniversity: async (data: any) => {
      if (data.id && !data.isNew) {
        const response = await apiClient.put(`/admin/universities/${data.id}`, data);
        return response.data;
      } else {
        const response = await apiClient.post('/admin/universities', data);
        return response.data;
      }
    },
    deleteUniversity: async (id: string) => {
      const response = await apiClient.delete(`/admin/universities/${id}`);
      return response.data;
    },

    // Countries CRUD
    getCountries: async () => {
      const response = await apiClient.get('/admin/countries');
      return response.data.data || [];
    },
    saveCountry: async (data: any) => {
      if (data.id && !data.isNew) {
        const response = await apiClient.put(`/admin/countries/${data.id}`, data);
        return response.data;
      } else {
        const response = await apiClient.post('/admin/countries', data);
        return response.data;
      }
    },
    deleteCountry: async (id: string) => {
      const response = await apiClient.delete(`/admin/countries/${id}`);
      return response.data;
    },

    // Categories CRUD
    getCategories: async () => {
      const response = await apiClient.get('/admin/categories');
      return response.data.data || [];
    },
    saveCategory: async (data: any) => {
      if (data.id && !data.isNew) {
        const response = await apiClient.put(`/admin/categories/${data.id}`, data);
        return response.data;
      } else {
        const response = await apiClient.post('/admin/categories', data);
        return response.data;
      }
    },
    deleteCategory: async (id: string) => {
      const response = await apiClient.delete(`/admin/categories/${id}`);
      return response.data;
    },

    // Pages CRUD
    getPages: async () => {
      const response = await apiClient.get('/admin/pages');
      return response.data.data || [];
    },
    getPage: async (id: string) => {
      const list = await apiClient.get('/admin/pages');
      const found = (list.data.data || []).find((p: any) => p.id === id || p.slug === id);
      return found || null;
    },
    savePage: async (data: any) => {
      if (data.id && !data.isNew) {
        const response = await apiClient.put(`/admin/pages/${data.id}`, data);
        return response.data;
      } else {
        const response = await apiClient.post('/admin/pages', data);
        return response.data;
      }
    },
    deletePage: async (id: string) => {
      const response = await apiClient.delete(`/admin/pages/${id}`);
      return response.data;
    },

    // About Page CMS
    getAbout: async () => {
      const response = await apiClient.get('/admin/about');
      return response.data.data;
    },
    getAboutContent: async () => {
      const response = await apiClient.get('/admin/about');
      return response.data.data;
    },
    saveAbout: async (data: any) => {
      const response = await apiClient.put('/admin/about', data);
      return response.data;
    },
    updateAboutContent: async (data: any) => {
      const response = await apiClient.put('/admin/about', data);
      return response.data;
    },

    // Contact Settings & Messages
    getContactSettings: async () => {
      const response = await apiClient.get('/admin/contact/settings');
      return response.data.data;
    },
    getContactContent: async () => {
      const response = await apiClient.get('/admin/contact/settings');
      return response.data.data;
    },
    saveContactSettings: async (data: any) => {
      const response = await apiClient.put('/admin/contact/settings', data);
      return response.data;
    },
    updateContactContent: async (data: any) => {
      const response = await apiClient.put('/admin/contact/settings', data);
      return response.data;
    },
    getContactMessages: async () => {
      const response = await apiClient.get('/admin/contact/messages');
      return response.data.data || [];
    },
    updateContactMessage: async (id: string, data: any) => {
      const response = await apiClient.put(`/admin/contact/messages/${id}`, data);
      return response.data;
    },
    updateContactMessageStatus: async (id: string, status: string) => {
      const response = await apiClient.put(`/admin/contact/messages/${id}`, { status });
      return response.data;
    },
    deleteContactMessage: async (id: string) => {
      const response = await apiClient.delete(`/admin/contact/messages/${id}`);
      return response.data;
    },

    // Media
    getMedia: async () => {
      const response = await apiClient.get('/admin/media');
      return response.data.data || [];
    },
    uploadMedia: async (payload: any) => {
      const response = await apiClient.post('/admin/media', payload);
      return response.data;
    },
    deleteMedia: async (id: string) => {
      const response = await apiClient.delete(`/admin/media/${id}`);
      return response.data;
    },

    // Social Media Manager
    getSocialMedia: async () => {
      const response = await apiClient.get('/admin/social');
      return response.data.data || [];
    },
    saveSocialMedia: async (data: any) => {
      if (data.id && !data.isNew) {
        const response = await apiClient.put(`/admin/social/${data.id}`, data);
        return response.data;
      } else {
        const response = await apiClient.post('/admin/social', data);
        return response.data;
      }
    },
    updateSocialMedia: async (data: any) => {
      if (data.id && !data.isNew) {
        const response = await apiClient.put(`/admin/social/${data.id}`, data);
        return response.data;
      } else {
        const response = await apiClient.post('/admin/social', data);
        return response.data;
      }
    },
    deleteSocialMedia: async (id: string) => {
      const response = await apiClient.delete(`/admin/social/${id}`);
      return response.data;
    },

    // Homepage CMS
    getHomepage: async () => {
      const response = await apiClient.get('/admin/homepage');
      return response.data.data;
    },
    getHomepageSettings: async () => {
      const response = await apiClient.get('/admin/homepage');
      return response.data.data;
    },
    saveHomepage: async (data: any) => {
      const response = await apiClient.put('/admin/homepage', data);
      return response.data;
    },
    updateHomepageSettings: async (data: any) => {
      const response = await apiClient.put('/admin/homepage', data);
      return response.data;
    },

    // Navigation Menu Builder
    getNavigation: async () => {
      const response = await apiClient.get('/admin/navigation');
      return response.data.data || [];
    },
    saveNavigation: async (data: any) => {
      if (data.id && !data.isNew) {
        const response = await apiClient.put(`/admin/navigation/${data.id}`, data);
        return response.data;
      } else {
        const response = await apiClient.post('/admin/navigation', data);
        return response.data;
      }
    },
    updateNavigation: async (data: any) => {
      if (data.id && !data.isNew) {
        const response = await apiClient.put(`/admin/navigation/${data.id}`, data);
        return response.data;
      } else {
        const response = await apiClient.post('/admin/navigation', data);
        return response.data;
      }
    },
    deleteNavigation: async (id: string) => {
      const response = await apiClient.delete(`/admin/navigation/${id}`);
      return response.data;
    },

    // SEO Settings
    getSeo: async () => {
      const response = await apiClient.get('/admin/seo');
      return response.data.data;
    },
    getSeoSettings: async () => {
      const response = await apiClient.get('/admin/seo');
      return response.data.data;
    },
    saveSeo: async (data: any) => {
      const response = await apiClient.put('/admin/seo', data);
      return response.data;
    },
    updateSeoSettings: async (data: any) => {
      const response = await apiClient.put('/admin/seo', data);
      return response.data;
    },

    // Advertisements
    getAds: async () => {
      const response = await apiClient.get('/admin/ads');
      return response.data.data || [];
    },
    saveAd: async (data: any) => {
      if (data.id && !data.isNew) {
        const response = await apiClient.put(`/admin/ads/${data.id}`, data);
        return response.data;
      } else {
        const response = await apiClient.post('/admin/ads', data);
        return response.data;
      }
    },
    deleteAd: async (id: string) => {
      const response = await apiClient.delete(`/admin/ads/${id}`);
      return response.data;
    },

    // Admin Users (Superadmin)
    getUsers: async () => {
      const response = await apiClient.get('/admin/users');
      return response.data.data || [];
    },
    saveUser: async (data: any) => {
      if (data.id && !data.isNew) {
        const response = await apiClient.put(`/admin/users/${data.id}`, data);
        return response.data;
      } else {
        const response = await apiClient.post('/admin/users', data);
        return response.data;
      }
    },
    createUser: async (data: any) => {
      const response = await apiClient.post('/admin/users', data);
      return response.data;
    },
    updateUser: async (id: string, data: any) => {
      const response = await apiClient.put(`/admin/users/${id}`, data);
      return response.data;
    },
    deleteUser: async (id: string) => {
      const response = await apiClient.delete(`/admin/users/${id}`);
      return response.data;
    },

    // Admin Profile & Password
    getProfile: async () => {
      const response = await apiClient.get('/admin/auth/me');
      const user = response.data.user || response.data.data;
      if (user) {
        localStorage.setItem('scholarshipbride_admin_user', JSON.stringify(user));
      }
      return user;
    },
    updateProfile: async (data: any) => {
      const response = await apiClient.put('/admin/auth/profile', data);
      return response.data;
    },
    changePassword: async (arg1: any, arg2?: string) => {
      if (typeof arg1 === 'object') {
        const response = await apiClient.post('/admin/auth/change-password', arg1);
        return response.data;
      }
      const response = await apiClient.post('/admin/auth/change-password', { currentPassword: arg1, newPassword: arg2 });
      return response.data;
    },

    // Audit Logs
    getAuditLogs: async () => {
      const response = await apiClient.get('/admin/audit-logs');
      return response.data.data || [];
    },

    // Settings
    getSettings: async () => {
      const response = await apiClient.get('/admin/settings');
      return response.data.data;
    },
    saveSettings: async (data: any) => {
      const response = await apiClient.put('/admin/settings', data);
      return response.data;
    },
    updateSettings: async (data: any) => {
      const response = await apiClient.put('/admin/settings', data);
      return response.data;
    },

    // Backup & Restore
    createBackup: async (label?: string) => {
      const response = await apiClient.post('/admin/backup', { label });
      return response.data;
    },
    exportFullBackup: async () => {
      const response = await apiClient.post('/admin/backup');
      return response.data;
    },

    listBackups: async () => {
      const response = await apiClient.get('/admin/backups');
      return response.data.data || [];
    },

    restoreBackup: async (backupFilename: string) => {
      const response = await apiClient.post('/admin/restore', { backupFilename });
      return response.data;
    },
    restoreFullBackup: async (backupFilename: string) => {
      const response = await apiClient.post('/admin/restore', { backupFilename });
      return response.data;
    }
  }
};
