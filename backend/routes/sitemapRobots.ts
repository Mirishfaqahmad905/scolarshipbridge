import { Router, Request, Response } from 'express';
import { JsonDatabase } from '../services/jsonDatabase';
import { ScholarshipRecord, PostRecord, UniversityRecord, CountryRecord, CategoryRecord, SettingsData } from '../types';

export const sitemapRobotsRouter = Router();

// ==========================================
// DYNAMIC SITEMAP.XML
// ==========================================
sitemapRobotsRouter.get('/sitemap.xml', async (req: Request, res: Response) => {
  try {
    const settings = await JsonDatabase.readData<SettingsData>('settings', { siteUrl: 'https://scholarbridge.org' } as any);
    const baseUrl = settings.siteUrl?.replace(/\/$/, '') || `${req.protocol}://${req.get('host')}`;

    const [scholarships, posts, universities, countries, categories] = await Promise.all([
      JsonDatabase.findAll<ScholarshipRecord>('scholarships'),
      JsonDatabase.findAll<PostRecord>('posts'),
      JsonDatabase.findAll<UniversityRecord>('universities'),
      JsonDatabase.findAll<CountryRecord>('countries'),
      JsonDatabase.findAll<CategoryRecord>('categories')
    ]);

    const staticUrls = [
      { loc: `${baseUrl}/`, priority: '1.0', changefreq: 'daily' },
      { loc: `${baseUrl}/scholarships`, priority: '0.9', changefreq: 'daily' },
      { loc: `${baseUrl}/countries`, priority: '0.8', changefreq: 'weekly' },
      { loc: `${baseUrl}/universities`, priority: '0.8', changefreq: 'weekly' },
      { loc: `${baseUrl}/news`, priority: '0.8', changefreq: 'daily' },
      { loc: `${baseUrl}/calendar`, priority: '0.7', changefreq: 'daily' },
      { loc: `${baseUrl}/about`, priority: '0.6', changefreq: 'monthly' },
      { loc: `${baseUrl}/contact`, priority: '0.6', changefreq: 'monthly' }
    ];

    const scholarshipUrls = scholarships
      .filter((s) => s.status === 'published')
      .map((s) => ({
        loc: `${baseUrl}/scholarships/${s.slug || s.id}`,
        lastmod: s.updatedAt || s.createdAt,
        priority: '0.8',
        changefreq: 'weekly'
      }));

    const postUrls = posts
      .filter((p) => p.status === 'published')
      .map((p) => ({
        loc: `${baseUrl}/guides/${p.slug || p.id}`,
        lastmod: p.updatedAt || p.createdAt,
        priority: '0.7',
        changefreq: 'weekly'
      }));

    const countryUrls = countries.map((c) => ({
      loc: `${baseUrl}/countries/${c.slug || c.id}`,
      lastmod: c.updatedAt || c.createdAt,
      priority: '0.7',
      changefreq: 'monthly'
    }));

    const categoryUrls = categories
      .filter((cat) => cat.status !== 'inactive')
      .map((cat) => ({
        loc: `${baseUrl}/category/${cat.slug || cat.id}`,
        lastmod: cat.updatedAt || cat.createdAt,
        priority: '0.7',
        changefreq: 'weekly'
      }));

    const allUrls = [...staticUrls, ...scholarshipUrls, ...postUrls, ...countryUrls, ...categoryUrls];

    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

    for (const u of allUrls) {
      xml += `  <url>\n`;
      xml += `    <loc>${u.loc}</loc>\n`;
      if ((u as any).lastmod) {
        xml += `    <lastmod>${new Date((u as any).lastmod).toISOString().split('T')[0]}</lastmod>\n`;
      }
      xml += `    <changefreq>${u.changefreq}</changefreq>\n`;
      xml += `    <priority>${u.priority}</priority>\n`;
      xml += `  </url>\n`;
    }

    xml += `</urlset>`;

    res.header('Content-Type', 'application/xml');
    res.send(xml);
  } catch (err: any) {
    res.status(500).send(`Error generating sitemap: ${err.message}`);
  }
});

// ==========================================
// ROBOTS.TXT
// ==========================================
sitemapRobotsRouter.get('/robots.txt', async (req: Request, res: Response) => {
  try {
    const settings = await JsonDatabase.readData<SettingsData>('settings', { siteUrl: 'https://scholarbridge.org' } as any);
    const baseUrl = settings.siteUrl?.replace(/\/$/, '') || `${req.protocol}://${req.get('host')}`;

    const txt = [
      'User-agent: *',
      'Allow: /',
      'Disallow: /admin',
      'Disallow: /api/admin',
      'Disallow: /backend',
      '',
      `Sitemap: ${baseUrl}/sitemap.xml`
    ].join('\n');

    res.header('Content-Type', 'text/plain');
    res.send(txt);
  } catch (err: any) {
    res.status(500).send(`Error: ${err.message}`);
  }
});
