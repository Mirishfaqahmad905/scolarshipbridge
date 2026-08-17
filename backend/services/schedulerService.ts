import { JsonDatabase } from './jsonDatabase';
import { ScholarshipRecord, PostRecord } from '../types';
import { logAdminAction } from '../middleware/auditLog';

export class SchedulerService {
  private static intervalId: NodeJS.Timeout | null = null;

  public static start(intervalMs: number = 60 * 1000): void {
    if (this.intervalId) return;

    // Run initial check immediately
    this.runChecks().catch((err) => console.error('[Scheduler] Initial run error:', err));

    // Schedule regular check loop
    this.intervalId = setInterval(() => {
      this.runChecks().catch((err) => console.error('[Scheduler] Execution error:', err));
    }, intervalMs);

    console.log(`[Scheduler] Automation service started (interval: ${intervalMs / 1000}s)`);
  }

  public static stop(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  public static async runChecks(): Promise<void> {
    const now = new Date();
    const todayStr = now.toISOString().split('T')[0];

    // 1. Check Scholarship Expiration & Publishing
    const scholarships = await JsonDatabase.findAll<ScholarshipRecord>('scholarships');
    let scholarshipsChanged = false;

    for (let i = 0; i < scholarships.length; i++) {
      const s = scholarships[i];

      // Auto Expiration: deadline passed and published
      if (s.status === 'published' && s.deadline && s.deadline < todayStr) {
        s.status = 'expired';
        s.updatedAt = now.toISOString();
        scholarshipsChanged = true;
        await logAdminAction({
          adminId: 'system-scheduler',
          username: 'SystemScheduler',
          action: 'expire',
          resource: 'scholarship',
          resourceId: s.id,
          details: { title: s.title, deadline: s.deadline }
        });
      }

      // Auto Publish scheduled scholarships
      if (s.status === 'scheduled' && s.scheduledAt && new Date(s.scheduledAt) <= now) {
        s.status = 'published';
        s.publishedAt = now.toISOString();
        s.updatedAt = now.toISOString();
        scholarshipsChanged = true;
        await logAdminAction({
          adminId: 'system-scheduler',
          username: 'SystemScheduler',
          action: 'publish_scheduled',
          resource: 'scholarship',
          resourceId: s.id,
          details: { title: s.title, scheduledAt: s.scheduledAt }
        });
      }
    }

    if (scholarshipsChanged) {
      await JsonDatabase.writeData('scholarships', scholarships);
    }

    // 2. Check Scheduled Posts Publishing
    const posts = await JsonDatabase.findAll<PostRecord>('posts');
    let postsChanged = false;

    for (let i = 0; i < posts.length; i++) {
      const p = posts[i];
      if (p.status === 'scheduled' && p.scheduledAt && new Date(p.scheduledAt) <= now) {
        p.status = 'published';
        p.publishedAt = now.toISOString();
        p.updatedAt = now.toISOString();
        postsChanged = true;
        await logAdminAction({
          adminId: 'system-scheduler',
          username: 'SystemScheduler',
          action: 'publish_scheduled',
          resource: 'post',
          resourceId: p.id,
          details: { title: p.title, scheduledAt: p.scheduledAt }
        });
      }
    }

    if (postsChanged) {
      await JsonDatabase.writeData('posts', posts);
    }
  }
}
