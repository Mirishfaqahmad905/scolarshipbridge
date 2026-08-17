import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  Scholarship, 
  CountryInfo, 
  UniversityInfo, 
  NewsArticle, 
  User, 
  AnnouncementConfig, 
  ToastMessage, 
  UserComment, 
  ContactMessage, 
  Subscriber, 
  FilterState 
} from '../types';
import { scholarshipApi } from '../services/api';
import { mockCountries } from '../data/mockCountries';
import { mockUniversities } from '../data/mockUniversities';
import { mockNewsArticles } from '../data/mockNews';

interface AppContextType {
  scholarships: Scholarship[];
  loading: boolean;
  countries: CountryInfo[];
  universities: UniversityInfo[];
  news: NewsArticle[];
  bookmarks: string[];
  recentlyViewed: string[];
  currentUser: User | null;
  user: User | null;
  announcement: AnnouncementConfig;
  comments: UserComment[];
  subscribers: Subscriber[];
  contactMessages: ContactMessage[];
  toasts: ToastMessage[];
  activeFilters: FilterState;
  
  // Actions
  toggleBookmark: (scholarshipId: string) => void;
  isBookmarked: (scholarshipId: string) => boolean;
  clearBookmarks: () => void;
  addRecentlyViewed: (scholarshipId: string) => void;
  addToast: (toast: Omit<ToastMessage, 'id'>) => void;
  removeToast: (id: string) => void;
  login: (email: string, role?: 'admin' | 'editor' | 'user') => void;
  logout: () => void;
  updateUserProfile: (data: Partial<User>) => void;
  updateAnnouncement: (config: AnnouncementConfig) => void;
  addComment: (scholarshipId: string, authorName: string, authorEmail: string, content: string) => void;
  subscribeNewsletter: (email: string) => boolean;
  submitContactForm: (data: Omit<ContactMessage, 'id' | 'submittedAt' | 'read'>) => void;
  
  // Admin CRUD Actions
  saveScholarship: (scholarship: Scholarship) => Promise<Scholarship>;
  deleteScholarship: (id: string) => Promise<boolean>;
  toggleScholarshipFeatured: (id: string) => Promise<void>;
  updateCommentStatus: (id: string, status: 'approved' | 'rejected') => void;
  refreshScholarships: () => Promise<void>;
  setFilter: (key: keyof FilterState, value: string) => void;
  resetFilters: () => void;
}

const defaultAnnouncement: AnnouncementConfig = {
  enabled: true,
  badge: '🔥 HOT 2026/2027 INTAKE',
  text: 'Explore Over 500+ Fully Funded International Scholarships & Study Abroad Opportunities',
  linkText: 'Explore Fully Funded',
  linkUrl: '/category/fully-funded',
  bgStyle: 'primary'
};

const defaultFilters: FilterState = {
  search: '',
  country: 'all',
  region: 'all',
  degree: 'all',
  funding: 'all',
  field: 'all',
  category: 'all',
  type: 'all',
  ielts: 'all',
  fee: 'all',
  deadlineStatus: 'all',
  sortBy: 'newest'
};

const defaultUser: User = {
  id: 'usr-admin-1',
  name: 'Alex Vance',
  email: 'alex.vance@scholarbridge.org',
  role: 'admin',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
  createdAt: '2026-01-15',
  country: 'International',
  targetDegree: 'Master',
  savedScholarshipIds: ['sch-001', 'sch-002'],
  recentlyViewedIds: ['sch-001', 'sch-003'],
  notificationsEnabled: true
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [scholarships, setScholarships] = useState<Scholarship[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [countries] = useState<CountryInfo[]>(mockCountries);
  const [universities] = useState<UniversityInfo[]>(mockUniversities);
  const [news] = useState<NewsArticle[]>(mockNewsArticles);
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(defaultUser);
  const [announcement, setAnnouncement] = useState<AnnouncementConfig>(defaultAnnouncement);
  const [comments, setComments] = useState<UserComment[]>([]);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [contactMessages, setContactMessages] = useState<ContactMessage[]>([]);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [activeFilters, setActiveFilters] = useState<FilterState>(defaultFilters);

  // Initialize data on mount
  useEffect(() => {
    // Load scholarships
    scholarshipApi.getAll().then(data => {
      setScholarships(data);
      setLoading(false);
    });

    // Load saved bookmarks
    try {
      const savedBookmarks = localStorage.getItem('scholarbridge_bookmarks_v1');
      if (savedBookmarks) setBookmarks(JSON.parse(savedBookmarks));
      
      const savedRecent = localStorage.getItem('scholarbridge_recently_viewed_v1');
      if (savedRecent) setRecentlyViewed(JSON.parse(savedRecent));

      const savedAnnouncement = localStorage.getItem('scholarbridge_announcement_v1');
      if (savedAnnouncement) setAnnouncement(JSON.parse(savedAnnouncement));

      const savedSubscribers = localStorage.getItem('scholarbridge_subscribers_v1');
      if (savedSubscribers) setSubscribers(JSON.parse(savedSubscribers));

      const savedComments = localStorage.getItem('scholarbridge_comments_v1');
      if (savedComments) setComments(JSON.parse(savedComments));
    } catch {
      // Ignore local storage parse error
    }
  }, []);

  const addToast = (toast: Omit<ToastMessage, 'id'>) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    const newToast: ToastMessage = { ...toast, id };
    setToasts(prev => [...prev, newToast]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const toggleBookmark = (scholarshipId: string) => {
    setBookmarks(prev => {
      const exists = prev.includes(scholarshipId);
      let updated: string[];
      if (exists) {
        updated = prev.filter(id => id !== scholarshipId);
        addToast({
          type: 'info',
          title: 'Bookmark Removed',
          message: 'Scholarship removed from your saved list.'
        });
      } else {
        updated = [...prev, scholarshipId];
        addToast({
          type: 'success',
          title: 'Saved to Bookmarks',
          message: 'Scholarship saved! Track deadlines in your bookmarks.'
        });
      }
      localStorage.setItem('scholarbridge_bookmarks_v1', JSON.stringify(updated));
      return updated;
    });
  };

  const isBookmarked = (scholarshipId: string) => bookmarks.includes(scholarshipId);

  const clearBookmarks = () => {
    setBookmarks([]);
    localStorage.removeItem('scholarbridge_bookmarks_v1');
    addToast({
      type: 'info',
      title: 'Bookmarks Cleared',
      message: 'All saved scholarships have been removed.'
    });
  };

  const addRecentlyViewed = (scholarshipId: string) => {
    setRecentlyViewed(prev => {
      const filtered = prev.filter(id => id !== scholarshipId);
      const updated = [scholarshipId, ...filtered].slice(0, 10);
      localStorage.setItem('scholarbridge_recently_viewed_v1', JSON.stringify(updated));
      return updated;
    });
    // Increment view count in API
    scholarshipApi.incrementViewCount(scholarshipId);
  };

  const login = (email: string, role: 'admin' | 'editor' | 'user' = 'user') => {
    const newUser: User = {
      id: `usr-${Date.now()}`,
      name: email.split('@')[0].replace('.', ' ').replace(/\b\w/g, l => l.toUpperCase()),
      email,
      role,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      createdAt: new Date().toISOString().split('T')[0],
      savedScholarshipIds: bookmarks,
      recentlyViewedIds: recentlyViewed,
      notificationsEnabled: true
    };
    setCurrentUser(newUser);
    localStorage.setItem('scholarbridge_auth_user_v1', JSON.stringify(newUser));
    addToast({
      type: 'success',
      title: 'Welcome Back!',
      message: `Signed in successfully as ${newUser.name} (${role.toUpperCase()}).`
    });
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('scholarbridge_auth_user_v1');
    addToast({
      type: 'info',
      title: 'Signed Out',
      message: 'You have been safely signed out.'
    });
  };

  const updateUserProfile = (data: Partial<User>) => {
    if (!currentUser) return;
    const updated = { ...currentUser, ...data };
    setCurrentUser(updated);
    localStorage.setItem('scholarbridge_auth_user_v1', JSON.stringify(updated));
    addToast({
      type: 'success',
      title: 'Profile Updated',
      message: 'Your personal preferences have been saved.'
    });
  };

  const updateAnnouncement = (config: AnnouncementConfig) => {
    setAnnouncement(config);
    localStorage.setItem('scholarbridge_announcement_v1', JSON.stringify(config));
    addToast({
      type: 'success',
      title: 'Announcement Updated',
      message: 'Header notification bar has been updated.'
    });
  };

  const addComment = (scholarshipId: string, authorName: string, authorEmail: string, content: string) => {
    const newComment: UserComment = {
      id: `comm-${Date.now()}`,
      scholarshipId,
      authorName,
      authorEmail,
      content,
      createdAt: new Date().toISOString(),
      status: 'approved',
      likes: 0
    };
    const updated = [newComment, ...comments];
    setComments(updated);
    localStorage.setItem('scholarbridge_comments_v1', JSON.stringify(updated));
    addToast({
      type: 'success',
      title: 'Comment Published',
      message: 'Thank you for sharing your experience and inquiry!'
    });
  };

  const subscribeNewsletter = (email: string): boolean => {
    if (!email || !email.includes('@')) {
      addToast({
        type: 'error',
        title: 'Invalid Email',
        message: 'Please enter a valid email address.'
      });
      return false;
    }
    const exists = subscribers.some(s => s.email.toLowerCase() === email.toLowerCase());
    if (exists) {
      addToast({
        type: 'info',
        title: 'Already Subscribed',
        message: 'You are already registered for weekly scholarship alerts.'
      });
      return true;
    }
    const newSub: Subscriber = {
      id: `sub-${Date.now()}`,
      email,
      subscribedAt: new Date().toISOString().split('T')[0],
      active: true
    };
    const updated = [newSub, ...subscribers];
    setSubscribers(updated);
    localStorage.setItem('scholarbridge_subscribers_v1', JSON.stringify(updated));
    addToast({
      type: 'success',
      title: 'Subscribed Successfully! 🎉',
      message: 'You will receive the latest verified scholarship alerts in your inbox.'
    });
    return true;
  };

  const submitContactForm = (data: Omit<ContactMessage, 'id' | 'submittedAt' | 'read'>) => {
    const newMsg: ContactMessage = {
      ...data,
      id: `msg-${Date.now()}`,
      submittedAt: new Date().toISOString(),
      read: false
    };
    const updated = [newMsg, ...contactMessages];
    setContactMessages(updated);
    localStorage.setItem('scholarbridge_contact_messages_v1', JSON.stringify(updated));
    addToast({
      type: 'success',
      title: 'Message Sent',
      message: 'Our international education support desk will respond within 24-48 hours.'
    });
  };

  const saveScholarship = async (scholarship: Scholarship): Promise<Scholarship> => {
    const saved = await scholarshipApi.saveScholarship(scholarship);
    await refreshScholarships();
    addToast({
      type: 'success',
      title: 'Scholarship Saved',
      message: `"${scholarship.title}" has been saved to the database.`
    });
    return saved;
  };

  const deleteScholarship = async (id: string): Promise<boolean> => {
    const res = await scholarshipApi.deleteScholarship(id);
    await refreshScholarships();
    addToast({
      type: 'info',
      title: 'Opportunity Deleted',
      message: 'The scholarship record has been permanently removed.'
    });
    return res;
  };

  const toggleScholarshipFeatured = async (id: string) => {
    await scholarshipApi.toggleFeatured(id);
    await refreshScholarships();
    addToast({
      type: 'success',
      title: 'Status Updated',
      message: 'Scholarship featured status toggled.'
    });
  };

  const updateCommentStatus = (id: string, status: 'approved' | 'rejected') => {
    const updated = comments.map(c => c.id === id ? { ...c, status } : c);
    setComments(updated);
    localStorage.setItem('scholarbridge_comments_v1', JSON.stringify(updated));
  };

  const refreshScholarships = async () => {
    const data = await scholarshipApi.getAll();
    setScholarships(data);
  };

  const setFilter = (key: keyof FilterState, value: string) => {
    setActiveFilters(prev => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setActiveFilters(defaultFilters);
  };

  return (
    <AppContext.Provider
      value={{
        scholarships,
        loading,
        countries,
        universities,
        news,
        bookmarks,
        recentlyViewed,
        currentUser,
        user: currentUser,
        announcement,
        comments,
        subscribers,
        contactMessages,
        toasts,
        activeFilters,
        toggleBookmark,
        isBookmarked,
        clearBookmarks,
        addRecentlyViewed,
        addToast,
        removeToast,
        login,
        logout,
        updateUserProfile,
        updateAnnouncement,
        addComment,
        subscribeNewsletter,
        submitContactForm,
        saveScholarship,
        deleteScholarship,
        toggleScholarshipFeatured,
        updateCommentStatus,
        refreshScholarships,
        setFilter,
        resetFilters
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
