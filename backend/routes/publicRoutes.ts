import { Router, Request, Response } from 'express';
import { JsonDatabase } from '../services/jsonDatabase';
import { 
  ScholarshipRecord, 
  PostRecord, 
  UniversityRecord, 
  CountryRecord, 
  CategoryRecord, 
  AboutPageData, 
  ContactSettingsData, 
  ContactMessageRecord, 
  SocialMediaRecord, 
  SettingsData, 
  NavigationRecord, 
  SeoSettingsData, 
  AdvertisementRecord, 
  PageRecord, 
  SubscriberRecord,
  MediaRecord
} from '../types';

export const publicRouter = Router();

// ==========================================
// SCHOLARSHIPS (PUBLIC)
// ==========================================
publicRouter.get('/scholarships', async (req: Request, res: Response) => {
  try {
    const list = await JsonDatabase.findAll<ScholarshipRecord>('scholarships');
    
    // Query params
    const search = ((req.query.search || req.query.q || '') as string).toLowerCase().trim();
    const country = (req.query.country || 'all') as string;
    const region = (req.query.region || 'all') as string;
    const degree = (req.query.degree || 'all') as string;
    const funding = (req.query.funding || 'all') as string;
    const field = (req.query.field || 'all') as string;
    const category = (req.query.category || 'all') as string;
    const type = (req.query.type || 'all') as string;
    const ielts = (req.query.ielts || 'all') as string;
    const fee = (req.query.fee || 'all') as string;
    const deadlineStatus = (req.query.deadlineStatus || 'all') as string;
    const sortBy = (req.query.sortBy || 'newest') as string;
    const status = (req.query.status || 'published') as string;

    const page = Math.max(1, parseInt((req.query.page as string) || '1', 10));
    const limit = Math.max(1, Math.min(100, parseInt((req.query.limit as string) || '50', 10)));

    let filtered = list.filter((item) => {
      if (status !== 'all' && item.status !== status && !(status === 'published' && item.status === 'expired')) {
        return false;
      }

      if (search) {
        const matchesTitle = item.title?.toLowerCase().includes(search);
        const matchesOrg = item.organization?.toLowerCase().includes(search);
        const matchesUni = item.university?.toLowerCase().includes(search);
        const matchesCountry = item.country?.toLowerCase().includes(search);
        const matchesDesc = item.description?.toLowerCase().includes(search);
        const matchesFields = item.fields?.some((f) => f.toLowerCase().includes(search));
        const matchesTags = item.tags?.some((t) => t.toLowerCase().includes(search));

        if (!matchesTitle && !matchesOrg && !matchesUni && !matchesCountry && !matchesDesc && !matchesFields && !matchesTags) {
          return false;
        }
      }

      if (country !== 'all' && item.country?.toLowerCase() !== country.toLowerCase()) {
        return false;
      }

      if (region !== 'all' && item.region?.toLowerCase() !== region.toLowerCase()) {
        return false;
      }

      if (degree !== 'all') {
        const dLower = degree.toLowerCase();
        const hasDegree = item.degreeLevels?.some((d) => d.toLowerCase() === dLower || (dLower === 'bachelor' && d === 'Undergraduate'));
        if (!hasDegree) return false;
      }

      if (funding !== 'all') {
        const fLower = funding.toLowerCase();
        if (fLower === 'fully-funded' && item.fundingType !== 'Fully Funded') return false;
        if (fLower === 'partial' && item.fundingType !== 'Partial Funding') return false;
        if (fLower === 'tuition-free' && !item.tuitionCoverage?.toLowerCase().includes('free') && !item.tuitionCoverage?.toLowerCase().includes('100%')) return false;
        if (fLower === 'stipend' && !item.monthlyStipend) return false;
      }

      if (field !== 'all') {
        const fTarget = field.toLowerCase();
        if (!item.fields?.some((f) => f.toLowerCase().includes(fTarget))) return false;
      }

      if (category !== 'all' && item.category !== category) {
        return false;
      }

      if (type !== 'all' && item.type?.toLowerCase() !== type.toLowerCase()) {
        return false;
      }

      if (ielts !== 'all') {
        if (ielts === 'no-ielts' && item.languageRequirements?.ieltsRequired) return false;
        if (ielts === 'ielts-required' && !item.languageRequirements?.ieltsRequired) return false;
      }

      if (fee !== 'all') {
        if (fee === 'free' && item.applicationFee !== 'Free') return false;
        if (fee === 'paid' && item.applicationFee !== 'Paid') return false;
      }

      if (deadlineStatus !== 'all') {
        const today = new Date();
        const deadlineDate = new Date(item.deadline);
        const diffDays = Math.ceil((deadlineDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
        if (deadlineStatus === 'open' && diffDays < 0) return false;
        if (deadlineStatus === 'closing-soon' && (diffDays < 0 || diffDays > 30)) return false;
        if (deadlineStatus === 'closed' && diffDays >= 0) return false;
      }

      return true;
    });

    // Sorting
    filtered.sort((a, b) => {
      if (sortBy === 'newest') return new Date(b.createdAt || b.publishedAt || 0).getTime() - new Date(a.createdAt || a.publishedAt || 0).getTime();
      if (sortBy === 'deadline') return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
      if (sortBy === 'popular') return (b.bookmarksCount || 0) - (a.bookmarksCount || 0);
      if (sortBy === 'views') return (b.views || 0) - (a.views || 0);
      if (sortBy === 'title-asc') return (a.title || '').localeCompare(b.title || '');
      if (sortBy === 'title-desc') return (b.title || '').localeCompare(a.title || '');
      return 0;
    });

    const total = filtered.length;
    const startIndex = (page - 1) * limit;
    const paginated = filtered.slice(startIndex, startIndex + limit);

    res.json({
      success: true,
      data: paginated,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

publicRouter.get('/scholarships/:slug', async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const list = await JsonDatabase.findAll<ScholarshipRecord>('scholarships');
    const item = list.find((s) => s.slug === slug || s.id === slug);

    if (!item) {
      res.status(404).json({ success: false, message: 'Scholarship opportunity not found' });
      return;
    }

    // Increment view count asynchronously
    item.views = (item.views || 0) + 1;
    JsonDatabase.update<ScholarshipRecord>('scholarships', item.id, { views: item.views }).catch(() => {});

    res.json({ success: true, data: item });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ==========================================
// POSTS & GUIDES (PUBLIC)
// ==========================================
publicRouter.get('/posts', async (req: Request, res: Response) => {
  try {
    const list = await JsonDatabase.findAll<PostRecord>('posts');
    const category = req.query.category as string;
    const search = ((req.query.search || '') as string).toLowerCase();

    let filtered = list.filter((p) => {
      if (p.status !== 'published') return false;
      if (category && category !== 'all' && p.category !== category) return false;
      if (search && !p.title.toLowerCase().includes(search) && !p.excerpt?.toLowerCase().includes(search)) return false;
      return true;
    });

    filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    res.json({ success: true, data: filtered });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

publicRouter.get('/posts/:slug', async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const list = await JsonDatabase.findAll<PostRecord>('posts');
    const item = list.find((p) => p.slug === slug || p.id === slug);

    if (!item) {
      res.status(404).json({ success: false, message: 'Post or guide article not found' });
      return;
    }

    item.views = (item.views || 0) + 1;
    JsonDatabase.update<PostRecord>('posts', item.id, { views: item.views }).catch(() => {});

    res.json({ success: true, data: item });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ==========================================
// UNIVERSITIES (PUBLIC)
// ==========================================
publicRouter.get('/universities', async (_req: Request, res: Response) => {
  try {
    const list = await JsonDatabase.findAll<UniversityRecord>('universities');
    res.json({ success: true, data: list });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ==========================================
// COUNTRIES (PUBLIC)
// ==========================================
publicRouter.get('/countries', async (_req: Request, res: Response) => {
  try {
    const list = await JsonDatabase.findAll<CountryRecord>('countries');
    res.json({ success: true, data: list });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ==========================================
// CATEGORIES (PUBLIC)
// ==========================================
publicRouter.get('/categories', async (_req: Request, res: Response) => {
  try {
    const list = await JsonDatabase.findAll<CategoryRecord>('categories');
    const active = list.filter((c) => c.status !== 'inactive').sort((a, b) => (a.position || 0) - (b.position || 0));
    res.json({ success: true, data: active });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ==========================================
// ABOUT PAGE (PUBLIC)
// ==========================================
publicRouter.get('/about', async (_req: Request, res: Response) => {
  try {
    const data = await JsonDatabase.readData<AboutPageData>('about');
    res.json({ success: true, data });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ==========================================
// CONTACT SETTINGS & SUBMISSION (PUBLIC)
// ==========================================
publicRouter.get('/contact/settings', async (_req: Request, res: Response) => {
  try {
    const data = await JsonDatabase.readData<ContactSettingsData>('contact');
    res.json({ success: true, data });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

publicRouter.post('/contact/messages', async (req: Request, res: Response) => {
  try {
    const { name, email, subject, message, category } = req.body;

    if (!name || !email || !message) {
      res.status(400).json({ success: false, message: 'Name, email, and message content are required.' });
      return;
    }

    const newMessage: ContactMessageRecord = {
      id: `msg-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      name: name.trim(),
      email: email.trim(),
      subject: (subject || 'Inquiry from Portal').trim(),
      message: message.trim(),
      category: category || 'General Inquiry',
      status: 'new',
      submittedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const created = await JsonDatabase.create('contactMessages', newMessage);

    res.status(201).json({
      success: true,
      message: 'Your message has been sent to our admissions advisory desk.',
      data: created
    });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ==========================================
// SOCIAL MEDIA (PUBLIC)
// ==========================================
publicRouter.get('/social', async (req: Request, res: Response) => {
  try {
    const list = await JsonDatabase.findAll<SocialMediaRecord>('socialMedia');
    const location = req.query.location as string;

    const enabled = list
      .filter((s) => s.enabled)
      .filter((s) => !location || s.location === 'all' || s.location === location)
      .sort((a, b) => (a.position || 0) - (b.position || 0));

    res.json({ success: true, data: enabled });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ==========================================
// SETTINGS (PUBLIC)
// ==========================================
publicRouter.get('/settings', async (_req: Request, res: Response) => {
  try {
    const data = await JsonDatabase.readData<SettingsData>('settings');
    res.json({ success: true, data });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ==========================================
// NAVIGATION (PUBLIC)
// ==========================================
publicRouter.get('/navigation', async (_req: Request, res: Response) => {
  try {
    const list = await JsonDatabase.findAll<NavigationRecord>('navigation');
    const enabled = list.filter((n) => n.enabled).sort((a, b) => (a.position || 0) - (b.position || 0));
    res.json({ success: true, data: enabled });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ==========================================
// SEO SETTINGS (PUBLIC)
// ==========================================
publicRouter.get('/seo', async (_req: Request, res: Response) => {
  try {
    const data = await JsonDatabase.readData<SeoSettingsData>('seo');
    res.json({ success: true, data });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ==========================================
// ADVERTISEMENTS (PUBLIC)
// ==========================================
publicRouter.get('/ads', async (req: Request, res: Response) => {
  try {
    const list = await JsonDatabase.findAll<AdvertisementRecord>('advertisements');
    const placement = req.query.placement as string;
    const page = req.query.page as string;

    const active = list.filter((ad) => {
      if (ad.status !== 'active') return false;
      if (placement && ad.placement !== placement) return false;
      if (page && !ad.pages?.includes('all') && !ad.pages?.includes(page)) return false;
      return true;
    }).sort((a, b) => (a.priority || 0) - (b.priority || 0));

    res.json({ success: true, data: active });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ==========================================
// CUSTOM PAGES (PUBLIC)
// ==========================================
publicRouter.get('/pages/:slug', async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const list = await JsonDatabase.findAll<PageRecord>('pages');
    const page = list.find((p) => p.slug === slug && p.status === 'published');

    if (!page) {
      res.status(404).json({ success: false, message: 'Page not found' });
      return;
    }

    res.json({ success: true, data: page });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ==========================================
// GLOBAL MULTI-RESOURCE SEARCH (PUBLIC)
// ==========================================
publicRouter.get('/search', async (req: Request, res: Response) => {
  try {
    const q = ((req.query.q || req.query.search || '') as string).toLowerCase().trim();

    if (!q) {
      res.json({
        success: true,
        data: {
          scholarships: [],
          posts: [],
          universities: [],
          countries: [],
          categories: []
        }
      });
      return;
    }

    const [scholarships, posts, universities, countries, categories] = await Promise.all([
      JsonDatabase.findAll<ScholarshipRecord>('scholarships'),
      JsonDatabase.findAll<PostRecord>('posts'),
      JsonDatabase.findAll<UniversityRecord>('universities'),
      JsonDatabase.findAll<CountryRecord>('countries'),
      JsonDatabase.findAll<CategoryRecord>('categories')
    ]);

    const matchingScholarships = scholarships
      .filter((s) => s.title?.toLowerCase().includes(q) || s.country?.toLowerCase().includes(q) || s.fields?.some((f) => f.toLowerCase().includes(q)))
      .slice(0, 10);

    const matchingPosts = posts
      .filter((p) => p.title?.toLowerCase().includes(q) || p.excerpt?.toLowerCase().includes(q))
      .slice(0, 5);

    const matchingUnis = universities
      .filter((u) => u.name?.toLowerCase().includes(q) || u.country?.toLowerCase().includes(q))
      .slice(0, 5);

    const matchingCountries = countries
      .filter((c) => c.name?.toLowerCase().includes(q) || c.region?.toLowerCase().includes(q))
      .slice(0, 5);

    const matchingCategories = categories
      .filter((cat) => cat.name?.toLowerCase().includes(q) || cat.description?.toLowerCase().includes(q))
      .slice(0, 5);

    res.json({
      success: true,
      data: {
        scholarships: matchingScholarships,
        posts: matchingPosts,
        universities: matchingUnis,
        countries: matchingCountries,
        categories: matchingCategories
      }
    });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ==========================================
// NEWSLETTER SUBSCRIBER (PUBLIC)
// ==========================================
publicRouter.post('/newsletter/subscribe', async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    if (!email || !email.includes('@')) {
      res.status(400).json({ success: false, message: 'Valid email address is required' });
      return;
    }

    const list = await JsonDatabase.findAll<SubscriberRecord>('subscribers');
    const existing = list.find((s) => s.email.toLowerCase() === email.toLowerCase().trim());

    if (existing) {
      res.json({ success: true, message: 'You are already registered for weekly scholarship alerts.' });
      return;
    }

    const newSub: SubscriberRecord = {
      id: `sub-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      email: email.toLowerCase().trim(),
      subscribedAt: new Date().toISOString().split('T')[0],
      active: true
    };

    await JsonDatabase.create('subscribers', newSub);

    res.status(201).json({
      success: true,
      message: 'Subscribed successfully to scholarship deadline alerts!'
    });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ==========================================
// MEDIA (PUBLIC RETRIEVAL)
// ==========================================
publicRouter.get('/media/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const media = await JsonDatabase.findById<MediaRecord>('media', id);

    if (!media) {
      res.status(404).json({ success: false, message: 'Media item not found' });
      return;
    }

    res.json({ success: true, data: media });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});
