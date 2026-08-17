import { Router, Response } from 'express';
import bcrypt from 'bcryptjs';
import { JsonDatabase } from '../services/jsonDatabase';
import { BackupService } from '../services/backupService';
import { authenticateAdmin, AuthRequest, requireRole, requirePermission } from '../middleware/auth';
import { logAdminAction } from '../middleware/auditLog';
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
  MediaRecord, 
  SettingsData, 
  NavigationRecord, 
  SeoSettingsData, 
  AdvertisementRecord, 
  PageRecord, 
  AdminUser, 
  SubscriberRecord, 
  AuditLogRecord 
} from '../types';

export const adminCrudRouter = Router();

// Protect all admin management endpoints
adminCrudRouter.use(authenticateAdmin);

// ==========================================
// DASHBOARD ANALYTICS (REAL JSON DATA)
// ==========================================
adminCrudRouter.get('/dashboard', async (req: AuthRequest, res: Response) => {
  try {
    const [
      scholarships,
      posts,
      universities,
      countries,
      categories,
      media,
      messages,
      subscribers,
      ads,
      auditLogs
    ] = await Promise.all([
      JsonDatabase.findAll<ScholarshipRecord>('scholarships'),
      JsonDatabase.findAll<PostRecord>('posts'),
      JsonDatabase.findAll<UniversityRecord>('universities'),
      JsonDatabase.findAll<CountryRecord>('countries'),
      JsonDatabase.findAll<CategoryRecord>('categories'),
      JsonDatabase.findAll<MediaRecord>('media'),
      JsonDatabase.findAll<ContactMessageRecord>('contactMessages'),
      JsonDatabase.findAll<SubscriberRecord>('subscribers'),
      JsonDatabase.findAll<AdvertisementRecord>('advertisements'),
      JsonDatabase.findAll<AuditLogRecord>('auditLogs')
    ]);

    const publishedScholarships = scholarships.filter((s) => s.status === 'published').length;
    const draftScholarships = scholarships.filter((s) => s.status === 'draft').length;
    const scheduledScholarships = scholarships.filter((s) => s.status === 'scheduled').length;
    const expiredScholarships = scholarships.filter((s) => s.status === 'expired').length;

    const publishedPosts = posts.filter((p) => p.status === 'published').length;
    const draftPosts = posts.filter((p) => p.status === 'draft').length;

    const activeAdvertisements = ads.filter((a) => a.status === 'active').length;
    const unreadMessages = messages.filter((m) => m.status === 'new').length;

    res.json({
      success: true,
      data: {
        stats: {
          totalScholarships: scholarships.length,
          publishedScholarships,
          draftScholarships,
          scheduledScholarships,
          expiredScholarships,

          totalPosts: posts.length,
          publishedPosts,
          draftPosts,

          totalUniversities: universities.length,
          totalCountries: countries.length,
          totalCategories: categories.length,

          totalMedia: media.length,
          totalMessages: messages.length,
          unreadMessages,
          totalSubscribers: subscribers.length,

          activeAdvertisements
        },
        recentScholarships: scholarships.slice(0, 5),
        recentPosts: posts.slice(0, 5),
        recentMessages: messages.slice(0, 5),
        recentActivity: auditLogs.slice(0, 10)
      }
    });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ==========================================
// SCHOLARSHIPS CRUD
// ==========================================
adminCrudRouter.get('/scholarships', async (req: AuthRequest, res: Response) => {
  try {
    const list = await JsonDatabase.findAll<ScholarshipRecord>('scholarships');
    const search = ((req.query.search || '') as string).toLowerCase();
    const status = (req.query.status || 'all') as string;
    const page = Math.max(1, parseInt((req.query.page as string) || '1', 10));
    const limit = Math.max(1, Math.min(100, parseInt((req.query.limit as string) || '50', 10)));

    let filtered = list.filter((item) => {
      if (status !== 'all' && item.status !== status) return false;
      if (search && !item.title.toLowerCase().includes(search) && !item.country.toLowerCase().includes(search)) return false;
      return true;
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

adminCrudRouter.get('/scholarships/:id', async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const item = await JsonDatabase.findById<ScholarshipRecord>('scholarships', id);
    if (!item) {
      res.status(404).json({ success: false, message: 'Scholarship not found' });
      return;
    }
    res.json({ success: true, data: item });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

adminCrudRouter.post('/scholarships', async (req: AuthRequest, res: Response) => {
  try {
    const body = req.body;
    if (!body.title) {
      res.status(400).json({ success: false, message: 'Scholarship title is required' });
      return;
    }

    const slug = body.slug || body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const now = new Date().toISOString();

    const record: ScholarshipRecord = {
      ...body,
      id: body.id || `sch-${Date.now()}`,
      slug,
      status: body.status || 'published',
      publishedAt: body.status === 'published' ? (body.publishedAt || now) : null,
      createdAt: now,
      updatedAt: now,
      views: 0,
      bookmarksCount: 0
    };

    const created = await JsonDatabase.create('scholarships', record);

    await logAdminAction({
      adminId: req.user!.id,
      username: req.user!.username,
      action: 'create',
      resource: 'scholarship',
      resourceId: created.id,
      details: { title: created.title },
      req
    });

    res.status(201).json({ success: true, message: 'Scholarship created successfully', data: created });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

adminCrudRouter.put('/scholarships/:id', async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const existing = await JsonDatabase.findById<ScholarshipRecord>('scholarships', id);
    if (!existing) {
      res.status(404).json({ success: false, message: 'Scholarship not found' });
      return;
    }

    const updated = await JsonDatabase.update<ScholarshipRecord>('scholarships', id, req.body);

    await logAdminAction({
      adminId: req.user!.id,
      username: req.user!.username,
      action: 'update',
      resource: 'scholarship',
      resourceId: id,
      details: { title: updated?.title },
      req
    });

    res.json({ success: true, message: 'Scholarship updated successfully', data: updated });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

adminCrudRouter.delete('/scholarships/:id', async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const existing = await JsonDatabase.findById<ScholarshipRecord>('scholarships', id);
    if (!existing) {
      res.status(404).json({ success: false, message: 'Scholarship not found' });
      return;
    }

    const removed = await JsonDatabase.remove('scholarships', id);
    if (!removed) {
      res.status(500).json({ success: false, message: 'Failed to remove scholarship record' });
      return;
    }

    await logAdminAction({
      adminId: req.user!.id,
      username: req.user!.username,
      action: 'delete',
      resource: 'scholarship',
      resourceId: id,
      details: { title: existing.title },
      req
    });

    res.json({ success: true, message: `Scholarship "${existing.title}" permanently removed from database.` });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

adminCrudRouter.post('/scholarships/:id/publish', async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const updated = await JsonDatabase.update<ScholarshipRecord>('scholarships', id, {
      status: 'published',
      publishedAt: new Date().toISOString()
    });
    res.json({ success: true, message: 'Scholarship published', data: updated });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

adminCrudRouter.post('/scholarships/:id/unpublish', async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const updated = await JsonDatabase.update<ScholarshipRecord>('scholarships', id, {
      status: 'draft'
    });
    res.json({ success: true, message: 'Scholarship moved to draft', data: updated });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

adminCrudRouter.post('/scholarships/:id/archive', async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const updated = await JsonDatabase.update<ScholarshipRecord>('scholarships', id, {
      status: 'archived'
    });
    res.json({ success: true, message: 'Scholarship archived', data: updated });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

adminCrudRouter.post('/scholarships/:id/duplicate', async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const existing = await JsonDatabase.findById<ScholarshipRecord>('scholarships', id);
    if (!existing) {
      res.status(404).json({ success: false, message: 'Scholarship not found' });
      return;
    }

    const duplicateRecord: ScholarshipRecord = {
      ...existing,
      id: `sch-${Date.now()}`,
      title: `${existing.title} (Copy)`,
      slug: `${existing.slug}-copy-${Date.now()}`,
      status: 'draft',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      views: 0,
      bookmarksCount: 0
    };

    const created = await JsonDatabase.create('scholarships', duplicateRecord);
    res.status(201).json({ success: true, message: 'Scholarship duplicated as draft', data: created });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ==========================================
// UNIVERSITIES CRUD
// ==========================================
adminCrudRouter.get('/universities', async (_req: AuthRequest, res: Response) => {
  try {
    const list = await JsonDatabase.findAll<UniversityRecord>('universities');
    res.json({ success: true, data: list });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

adminCrudRouter.post('/universities', async (req: AuthRequest, res: Response) => {
  try {
    const body = req.body;
    const slug = body.slug || body.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const record: UniversityRecord = {
      ...body,
      id: body.id || `uni-${Date.now()}`,
      slug,
      status: body.status || 'published',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    const created = await JsonDatabase.create('universities', record);
    await logAdminAction({
      adminId: req.user!.id,
      username: req.user!.username,
      action: 'create',
      resource: 'university',
      resourceId: created.id,
      req
    });
    res.status(201).json({ success: true, data: created });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

adminCrudRouter.put('/universities/:id', async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const updated = await JsonDatabase.update<UniversityRecord>('universities', id, req.body);
    await logAdminAction({
      adminId: req.user!.id,
      username: req.user!.username,
      action: 'update',
      resource: 'university',
      resourceId: id,
      req
    });
    res.json({ success: true, data: updated });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

adminCrudRouter.delete('/universities/:id', async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    await JsonDatabase.remove('universities', id);
    await logAdminAction({
      adminId: req.user!.id,
      username: req.user!.username,
      action: 'delete',
      resource: 'university',
      resourceId: id,
      req
    });
    res.json({ success: true, message: 'University removed successfully' });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ==========================================
// COUNTRIES CRUD
// ==========================================
adminCrudRouter.get('/countries', async (_req: AuthRequest, res: Response) => {
  try {
    const list = await JsonDatabase.findAll<CountryRecord>('countries');
    res.json({ success: true, data: list });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

adminCrudRouter.post('/countries', async (req: AuthRequest, res: Response) => {
  try {
    const body = req.body;
    const slug = body.slug || body.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const record: CountryRecord = {
      ...body,
      id: body.id || `country-${Date.now()}`,
      slug,
      status: body.status || 'published',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    const created = await JsonDatabase.create('countries', record);
    await logAdminAction({
      adminId: req.user!.id,
      username: req.user!.username,
      action: 'create',
      resource: 'country',
      resourceId: created.id,
      req
    });
    res.status(201).json({ success: true, data: created });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

adminCrudRouter.put('/countries/:id', async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const updated = await JsonDatabase.update<CountryRecord>('countries', id, req.body);
    res.json({ success: true, data: updated });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

adminCrudRouter.delete('/countries/:id', async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    await JsonDatabase.remove('countries', id);
    res.json({ success: true, message: 'Country removed successfully' });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ==========================================
// CATEGORIES CRUD
// ==========================================
adminCrudRouter.get('/categories', async (_req: AuthRequest, res: Response) => {
  try {
    const list = await JsonDatabase.findAll<CategoryRecord>('categories');
    res.json({ success: true, data: list });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

adminCrudRouter.post('/categories', async (req: AuthRequest, res: Response) => {
  try {
    const body = req.body;
    const slug = body.slug || body.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const record: CategoryRecord = {
      ...body,
      id: body.id || `cat-${Date.now()}`,
      slug,
      status: body.status || 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    const created = await JsonDatabase.create('categories', record);
    res.status(201).json({ success: true, data: created });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

adminCrudRouter.put('/categories/:id', async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const updated = await JsonDatabase.update<CategoryRecord>('categories', id, req.body);
    res.json({ success: true, data: updated });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

adminCrudRouter.delete('/categories/:id', async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    await JsonDatabase.remove('categories', id);
    res.json({ success: true, message: 'Category removed successfully' });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ==========================================
// BLOG POSTS CRUD
// ==========================================
adminCrudRouter.get('/posts', async (_req: AuthRequest, res: Response) => {
  try {
    const list = await JsonDatabase.findAll<PostRecord>('posts');
    res.json({ success: true, data: list });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

adminCrudRouter.post('/posts', async (req: AuthRequest, res: Response) => {
  try {
    const body = req.body;
    const slug = body.slug || body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const record: PostRecord = {
      ...body,
      id: body.id || `post-${Date.now()}`,
      slug,
      status: body.status || 'published',
      publishedAt: body.status === 'published' ? new Date().toISOString() : null,
      views: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    const created = await JsonDatabase.create('posts', record);
    await logAdminAction({
      adminId: req.user!.id,
      username: req.user!.username,
      action: 'create',
      resource: 'post',
      resourceId: created.id,
      req
    });
    res.status(201).json({ success: true, data: created });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

adminCrudRouter.put('/posts/:id', async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const updated = await JsonDatabase.update<PostRecord>('posts', id, req.body);
    res.json({ success: true, data: updated });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

adminCrudRouter.delete('/posts/:id', async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    await JsonDatabase.remove('posts', id);
    await logAdminAction({
      adminId: req.user!.id,
      username: req.user!.username,
      action: 'delete',
      resource: 'post',
      resourceId: id,
      req
    });
    res.json({ success: true, message: 'Post removed successfully' });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ==========================================
// ABOUT PAGE MANAGEMENT
// ==========================================
adminCrudRouter.get('/about', async (_req: AuthRequest, res: Response) => {
  try {
    const data = await JsonDatabase.readData<AboutPageData>('about');
    res.json({ success: true, data });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

adminCrudRouter.put('/about', async (req: AuthRequest, res: Response) => {
  try {
    const body = { ...req.body, updatedAt: new Date().toISOString() };
    await JsonDatabase.writeData('about', body);
    await logAdminAction({
      adminId: req.user!.id,
      username: req.user!.username,
      action: 'update',
      resource: 'about_page',
      req
    });
    res.json({ success: true, message: 'About page updated successfully', data: body });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ==========================================
// CONTACT SETTINGS & MESSAGES MANAGEMENT
// ==========================================
adminCrudRouter.get('/contact/settings', async (_req: AuthRequest, res: Response) => {
  try {
    const data = await JsonDatabase.readData<ContactSettingsData>('contact');
    res.json({ success: true, data });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

adminCrudRouter.put('/contact/settings', async (req: AuthRequest, res: Response) => {
  try {
    const body = { ...req.body, updatedAt: new Date().toISOString() };
    await JsonDatabase.writeData('contact', body);
    res.json({ success: true, message: 'Contact settings updated', data: body });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

adminCrudRouter.get('/contact/messages', async (_req: AuthRequest, res: Response) => {
  try {
    const list = await JsonDatabase.findAll<ContactMessageRecord>('contactMessages');
    res.json({ success: true, data: list });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

adminCrudRouter.put('/contact/messages/:id', async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const updated = await JsonDatabase.update<ContactMessageRecord>('contactMessages', id, req.body);
    res.json({ success: true, data: updated });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

adminCrudRouter.delete('/contact/messages/:id', async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    await JsonDatabase.remove('contactMessages', id);
    res.json({ success: true, message: 'Message permanently removed from database' });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ==========================================
// SOCIAL MEDIA MANAGEMENT
// ==========================================
adminCrudRouter.get('/social', async (_req: AuthRequest, res: Response) => {
  try {
    const list = await JsonDatabase.findAll<SocialMediaRecord>('socialMedia');
    res.json({ success: true, data: list });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

adminCrudRouter.post('/social', async (req: AuthRequest, res: Response) => {
  try {
    const body = req.body;
    const record: SocialMediaRecord = {
      ...body,
      id: body.id || `soc-${Date.now()}`,
      enabled: body.enabled !== undefined ? body.enabled : true,
      position: body.position || 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    const created = await JsonDatabase.create('socialMedia', record);
    res.status(201).json({ success: true, data: created });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

adminCrudRouter.put('/social/:id', async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const updated = await JsonDatabase.update<SocialMediaRecord>('socialMedia', id, req.body);
    res.json({ success: true, data: updated });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

adminCrudRouter.delete('/social/:id', async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    await JsonDatabase.remove('socialMedia', id);
    res.json({ success: true, message: 'Social media link removed' });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ==========================================
// MEDIA LIBRARY (BASE64 IMAGE UPLOAD & DELETE)
// ==========================================
adminCrudRouter.get('/media', async (_req: AuthRequest, res: Response) => {
  try {
    const list = await JsonDatabase.findAll<MediaRecord>('media');
    res.json({ success: true, data: list });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

adminCrudRouter.post('/media', async (req: AuthRequest, res: Response) => {
  try {
    const { fileName, imageData, altText, caption, width, height } = req.body;

    if (!imageData || typeof imageData !== 'string') {
      res.status(400).json({ success: false, message: 'Image data in Base64 format is required.' });
      return;
    }

    // Base64 format validation: data:image/(jpeg|jpg|png|webp|gif);base64,...
    const matches = imageData.match(/^data:(image\/(jpeg|jpg|png|webp|gif));base64,/i);
    if (!matches) {
      res.status(400).json({
        success: false,
        message: 'Invalid image format. Allowed MIME types: JPEG, JPG, PNG, WEBP, GIF encoded as Base64 data URL.'
      });
      return;
    }

    const mimeType = matches[1];
    const base64Body = imageData.replace(/^data:image\/\w+;base64,/, '');
    const fileSize = Buffer.from(base64Body, 'base64').length;

    // 8MB limit for Base64 image
    if (fileSize > 8 * 1024 * 1024) {
      res.status(400).json({ success: false, message: 'Image file size exceeds maximum limit of 8MB.' });
      return;
    }

    const mediaRecord: MediaRecord = {
      id: `media-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      fileName: fileName || `image-${Date.now()}.${mimeType.split('/')[1]}`,
      mimeType,
      imageData,
      fileSize,
      width: width || 800,
      height: height || 600,
      altText: altText || 'Uploaded educational media',
      caption: caption || '',
      uploadedBy: req.user!.id,
      createdAt: new Date().toISOString()
    };

    const created = await JsonDatabase.create('media', mediaRecord);

    await logAdminAction({
      adminId: req.user!.id,
      username: req.user!.username,
      action: 'imageUpload',
      resource: 'media',
      resourceId: created.id,
      details: { fileName: created.fileName, size: fileSize },
      req
    });

    res.status(201).json({
      success: true,
      message: 'Base64 image stored in media library successfully.',
      data: created
    });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

adminCrudRouter.put('/media/:id', async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { altText, caption, fileName } = req.body;
    const updated = await JsonDatabase.update<MediaRecord>('media', id, { altText, caption, fileName });
    res.json({ success: true, data: updated });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

adminCrudRouter.delete('/media/:id', async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const existing = await JsonDatabase.findById<MediaRecord>('media', id);
    if (!existing) {
      res.status(404).json({ success: false, message: 'Media item not found' });
      return;
    }

    // Check if referenced across scholarships, posts, about, universities, countries, settings
    const [scholarships, posts, unis, countries] = await Promise.all([
      JsonDatabase.findAll<ScholarshipRecord>('scholarships'),
      JsonDatabase.findAll<PostRecord>('posts'),
      JsonDatabase.findAll<UniversityRecord>('universities'),
      JsonDatabase.findAll<CountryRecord>('countries')
    ]);

    const isReferencedInScholarship = scholarships.some((s) => s.image?.includes(id) || s.gallery?.some((g) => g.includes(id)));
    const isReferencedInPost = posts.some((p) => p.featuredImage?.includes(id));
    const isReferencedInUni = unis.some((u) => u.image?.includes(id) || u.logo?.includes(id));
    const isReferencedInCountry = countries.some((c) => c.image?.includes(id));

    const isReferenced = isReferencedInScholarship || isReferencedInPost || isReferencedInUni || isReferencedInCountry;

    const removed = await JsonDatabase.remove('media', id);

    await logAdminAction({
      adminId: req.user!.id,
      username: req.user!.username,
      action: 'imageDelete',
      resource: 'media',
      resourceId: id,
      details: { fileName: existing.fileName, wasReferenced: isReferenced },
      req
    });

    res.json({
      success: true,
      message: `Media "${existing.fileName}" removed from database.`,
      warning: isReferenced ? 'Note: This image was previously referenced by content records.' : null
    });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ==========================================
// SETTINGS
// ==========================================
adminCrudRouter.get('/settings', async (_req: AuthRequest, res: Response) => {
  try {
    const data = await JsonDatabase.readData<SettingsData>('settings');
    res.json({ success: true, data });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

adminCrudRouter.put('/settings', async (req: AuthRequest, res: Response) => {
  try {
    const body = { ...req.body, updatedAt: new Date().toISOString() };
    await JsonDatabase.writeData('settings', body);
    await logAdminAction({
      adminId: req.user!.id,
      username: req.user!.username,
      action: 'settingsUpdate',
      resource: 'settings',
      req
    });
    res.json({ success: true, message: 'Settings saved successfully', data: body });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ==========================================
// NAVIGATION
// ==========================================
adminCrudRouter.get('/navigation', async (_req: AuthRequest, res: Response) => {
  try {
    const list = await JsonDatabase.findAll<NavigationRecord>('navigation');
    res.json({ success: true, data: list });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

adminCrudRouter.post('/navigation', async (req: AuthRequest, res: Response) => {
  try {
    const body = req.body;
    const record: NavigationRecord = {
      ...body,
      id: body.id || `nav-${Date.now()}`,
      position: body.position || 1,
      enabled: body.enabled !== undefined ? body.enabled : true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    const created = await JsonDatabase.create('navigation', record);
    res.status(201).json({ success: true, data: created });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

adminCrudRouter.put('/navigation/:id', async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const updated = await JsonDatabase.update<NavigationRecord>('navigation', id, req.body);
    res.json({ success: true, data: updated });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

adminCrudRouter.delete('/navigation/:id', async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    await JsonDatabase.remove('navigation', id);
    res.json({ success: true, message: 'Navigation link removed' });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ==========================================
// SEO SETTINGS
// ==========================================
adminCrudRouter.get('/seo', async (_req: AuthRequest, res: Response) => {
  try {
    const data = await JsonDatabase.readData<SeoSettingsData>('seo');
    res.json({ success: true, data });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

adminCrudRouter.put('/seo', async (req: AuthRequest, res: Response) => {
  try {
    const body = { ...req.body, updatedAt: new Date().toISOString() };
    await JsonDatabase.writeData('seo', body);
    await logAdminAction({
      adminId: req.user!.id,
      username: req.user!.username,
      action: 'seoUpdate',
      resource: 'seo',
      req
    });
    res.json({ success: true, message: 'SEO configuration saved', data: body });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ==========================================
// ADVERTISEMENTS & GOOGLE ADSENSE
// ==========================================
adminCrudRouter.get('/ads', async (_req: AuthRequest, res: Response) => {
  try {
    const list = await JsonDatabase.findAll<AdvertisementRecord>('advertisements');
    res.json({ success: true, data: list });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

adminCrudRouter.post('/ads', async (req: AuthRequest, res: Response) => {
  try {
    const body = req.body;
    const record: AdvertisementRecord = {
      ...body,
      id: body.id || `ad-${Date.now()}`,
      status: body.status || 'active',
      priority: body.priority || 1,
      pages: body.pages || ['all'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    const created = await JsonDatabase.create('advertisements', record);
    await logAdminAction({
      adminId: req.user!.id,
      username: req.user!.username,
      action: 'advertisementUpdate',
      resource: 'advertisements',
      resourceId: created.id,
      req
    });
    res.status(201).json({ success: true, data: created });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

adminCrudRouter.put('/ads/:id', async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const updated = await JsonDatabase.update<AdvertisementRecord>('advertisements', id, req.body);
    res.json({ success: true, data: updated });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

adminCrudRouter.delete('/ads/:id', async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    await JsonDatabase.remove('advertisements', id);
    res.json({ success: true, message: 'Advertisement slot removed' });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ==========================================
// PAGES
// ==========================================
adminCrudRouter.get('/pages', async (_req: AuthRequest, res: Response) => {
  try {
    const list = await JsonDatabase.findAll<PageRecord>('pages');
    res.json({ success: true, data: list });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

adminCrudRouter.post('/pages', async (req: AuthRequest, res: Response) => {
  try {
    const body = req.body;
    const slug = body.slug || body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const record: PageRecord = {
      ...body,
      id: body.id || `page-${Date.now()}`,
      slug,
      status: body.status || 'published',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    const created = await JsonDatabase.create('pages', record);
    res.status(201).json({ success: true, data: created });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

adminCrudRouter.put('/pages/:id', async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const updated = await JsonDatabase.update<PageRecord>('pages', id, req.body);
    res.json({ success: true, data: updated });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

adminCrudRouter.delete('/pages/:id', async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    await JsonDatabase.remove('pages', id);
    res.json({ success: true, message: 'Page removed successfully' });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ==========================================
// SUBSCRIBERS
// ==========================================
adminCrudRouter.get('/subscribers', async (_req: AuthRequest, res: Response) => {
  try {
    const list = await JsonDatabase.findAll<SubscriberRecord>('subscribers');
    res.json({ success: true, data: list });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

adminCrudRouter.delete('/subscribers/:id', async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    await JsonDatabase.remove('subscribers', id);
    res.json({ success: true, message: 'Subscriber removed' });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ==========================================
// AUDIT LOGS
// ==========================================
adminCrudRouter.get('/audit-logs', async (_req: AuthRequest, res: Response) => {
  try {
    const list = await JsonDatabase.findAll<AuditLogRecord>('auditLogs');
    res.json({ success: true, data: list });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ==========================================
// BACKUP & RESTORE
// ==========================================
adminCrudRouter.get('/backups', requireRole('superadmin', 'admin'), async (_req: AuthRequest, res: Response) => {
  try {
    const list = await BackupService.listBackups();
    res.json({ success: true, data: list });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

adminCrudRouter.post('/backup', requireRole('superadmin', 'admin'), async (req: AuthRequest, res: Response) => {
  try {
    const label = req.body.label || 'manual';
    const result = await BackupService.createBackup(label);

    await logAdminAction({
      adminId: req.user!.id,
      username: req.user!.username,
      action: 'backup',
      resource: 'database',
      details: { backupId: result.backupId, filename: result.filename },
      req
    });

    res.status(201).json({
      success: true,
      message: 'JSON database snapshot backup created successfully.',
      data: result
    });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

adminCrudRouter.post('/restore', requireRole('superadmin'), async (req: AuthRequest, res: Response) => {
  try {
    const { backupFilename, backupData } = req.body;

    if (!backupFilename && !backupData) {
      res.status(400).json({ success: false, message: 'backupFilename or backupData payload is required for restore' });
      return;
    }

    const result = await BackupService.restoreBackup(backupFilename || backupData);

    await logAdminAction({
      adminId: req.user!.id,
      username: req.user!.username,
      action: 'restore',
      resource: 'database',
      details: { filesRestored: result.filesRestored },
      req
    });

    res.json({
      success: true,
      message: result.message,
      data: result
    });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ==========================================
// ADMIN USER MANAGEMENT (SUPERADMIN ONLY)
// ==========================================
adminCrudRouter.get('/users', requireRole('superadmin'), async (_req: AuthRequest, res: Response) => {
  try {
    const admins = await JsonDatabase.findAll<AdminUser>('admins');
    // Hide password hashes
    const sanitized = admins.map(({ passwordHash, ...rest }) => rest);
    res.json({ success: true, data: sanitized });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

adminCrudRouter.post('/users', requireRole('superadmin'), async (req: AuthRequest, res: Response) => {
  try {
    const { username, email, password, role, permissions } = req.body;
    if (!username || !password || !email) {
      res.status(400).json({ success: false, message: 'Username, email, and initial password are required' });
      return;
    }

    const admins = await JsonDatabase.findAll<AdminUser>('admins');
    if (admins.some((a) => a.username.toLowerCase() === username.toLowerCase().trim())) {
      res.status(400).json({ success: false, message: 'Username already exists' });
      return;
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const newAdmin: AdminUser = {
      id: `admin-${Date.now()}`,
      username: username.trim(),
      email: email.trim(),
      passwordHash,
      role: role || 'editor',
      permissions: permissions || ['manage_scholarships'],
      status: 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      lastLogin: null
    };

    await JsonDatabase.create('admins', newAdmin);
    await logAdminAction({
      adminId: req.user!.id,
      username: req.user!.username,
      action: 'create',
      resource: 'admin_user',
      resourceId: newAdmin.id,
      details: { username: newAdmin.username, role: newAdmin.role },
      req
    });

    const { passwordHash: _, ...sanitized } = newAdmin;
    res.status(201).json({ success: true, message: 'Admin user created', data: sanitized });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

adminCrudRouter.delete('/users/:id', requireRole('superadmin'), async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    if (id === req.user!.id) {
      res.status(400).json({ success: false, message: 'You cannot delete your own active administrator account.' });
      return;
    }

    await JsonDatabase.remove('admins', id);
    await logAdminAction({
      adminId: req.user!.id,
      username: req.user!.username,
      action: 'delete',
      resource: 'admin_user',
      resourceId: id,
      req
    });

    res.json({ success: true, message: 'Admin account removed successfully.' });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

adminCrudRouter.put('/users/:id', requireRole('superadmin'), async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { email, role, status, permissions, password } = req.body;
    
    const existing = await JsonDatabase.findById<AdminUser>('admins', id);
    if (!existing) {
      res.status(404).json({ success: false, message: 'Admin user not found' });
      return;
    }

    const updates: Partial<AdminUser> = {
      updatedAt: new Date().toISOString()
    };

    if (email) updates.email = email.trim();
    if (role) updates.role = role;
    if (status) updates.status = status;
    if (permissions) updates.permissions = permissions;
    if (password && password.trim().length >= 6) {
      updates.passwordHash = await bcrypt.hash(password.trim(), 10);
    }

    const updated = await JsonDatabase.update<AdminUser>('admins', id, updates);

    await logAdminAction({
      adminId: req.user!.id,
      username: req.user!.username,
      action: 'update',
      resource: 'admin_user',
      resourceId: id,
      details: { role: updated?.role, status: updated?.status },
      req
    });

    if (updated) {
      const { passwordHash: _, ...sanitized } = updated;
      res.json({ success: true, message: 'Admin user updated successfully', data: sanitized });
    } else {
      res.status(500).json({ success: false, message: 'Failed to update admin user' });
    }
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ==========================================
// HOMEPAGE CMS MANAGEMENT
// ==========================================
adminCrudRouter.get('/homepage', async (_req: AuthRequest, res: Response) => {
  try {
    const data = await JsonDatabase.readData<any>('homepage');
    res.json({ success: true, data: data || {} });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

adminCrudRouter.put('/homepage', async (req: AuthRequest, res: Response) => {
  try {
    const body = { ...req.body, updatedAt: new Date().toISOString() };
    await JsonDatabase.writeData('homepage', body);
    await logAdminAction({
      adminId: req.user!.id,
      username: req.user!.username,
      action: 'update',
      resource: 'homepage_cms',
      req
    });
    res.json({ success: true, message: 'Homepage configuration saved successfully', data: body });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ==========================================
// ADMIN GLOBAL MULTI-RESOURCE SEARCH
// ==========================================
adminCrudRouter.get('/search', async (req: AuthRequest, res: Response) => {
  try {
    const q = ((req.query.q || req.query.query || req.query.search || '') as string).toLowerCase().trim();

    if (!q) {
      res.json({
        success: true,
        data: {
          scholarships: [],
          posts: [],
          universities: [],
          countries: [],
          categories: [],
          pages: [],
          messages: []
        }
      });
      return;
    }

    const [
      scholarships,
      posts,
      universities,
      countries,
      categories,
      pages,
      messages
    ] = await Promise.all([
      JsonDatabase.findAll<ScholarshipRecord>('scholarships'),
      JsonDatabase.findAll<PostRecord>('posts'),
      JsonDatabase.findAll<UniversityRecord>('universities'),
      JsonDatabase.findAll<CountryRecord>('countries'),
      JsonDatabase.findAll<CategoryRecord>('categories'),
      JsonDatabase.findAll<PageRecord>('pages'),
      JsonDatabase.findAll<ContactMessageRecord>('contactMessages')
    ]);

    const matchingScholarships = scholarships
      .filter((s) => s.title?.toLowerCase().includes(q) || s.country?.toLowerCase().includes(q) || s.organization?.toLowerCase().includes(q))
      .slice(0, 8);

    const matchingPosts = posts
      .filter((p) => p.title?.toLowerCase().includes(q) || p.category?.toLowerCase().includes(q))
      .slice(0, 8);

    const matchingUnis = universities
      .filter((u) => u.name?.toLowerCase().includes(q) || u.country?.toLowerCase().includes(q))
      .slice(0, 8);

    const matchingCountries = countries
      .filter((c) => c.name?.toLowerCase().includes(q) || c.region?.toLowerCase().includes(q))
      .slice(0, 8);

    const matchingCategories = categories
      .filter((c) => c.name?.toLowerCase().includes(q) || c.slug?.toLowerCase().includes(q))
      .slice(0, 8);

    const matchingPages = pages
      .filter((p) => p.title?.toLowerCase().includes(q) || p.slug?.toLowerCase().includes(q))
      .slice(0, 8);

    const matchingMessages = messages
      .filter((m) => m.name?.toLowerCase().includes(q) || m.email?.toLowerCase().includes(q) || m.subject?.toLowerCase().includes(q) || m.message?.toLowerCase().includes(q))
      .slice(0, 8);

    res.json({
      success: true,
      data: {
        scholarships: matchingScholarships,
        posts: matchingPosts,
        universities: matchingUnis,
        countries: matchingCountries,
        categories: matchingCategories,
        pages: matchingPages,
        messages: matchingMessages
      }
    });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

