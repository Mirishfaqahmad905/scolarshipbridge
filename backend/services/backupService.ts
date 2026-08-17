import fs from 'fs/promises';
import path from 'path';
import { DATA_DIR, BACKUPS_DIR, JsonDatabase } from './jsonDatabase';

const REQUIRED_FILES = [
  'admins.json',
  'scholarships.json',
  'universities.json',
  'countries.json',
  'categories.json',
  'posts.json',
  'pages.json',
  'about.json',
  'contact.json',
  'contactMessages.json',
  'socialMedia.json',
  'media.json',
  'settings.json',
  'seo.json',
  'advertisements.json',
  'navigation.json',
  'auditLogs.json',
  'subscribers.json'
];

export class BackupService {
  /**
   * Create a full snapshot backup of all JSON database files
   */
  public static async createBackup(label: string = 'manual'): Promise<{
    backupId: string;
    filename: string;
    filePath: string;
    filesIncluded: number;
    createdAt: string;
    sizeBytes: number;
  }> {
    await JsonDatabase.ensureDirectories();

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupId = `backup-${label}-${timestamp}`;
    const filename = `${backupId}.json`;
    const filePath = path.join(BACKUPS_DIR, filename);

    const snapshot: Record<string, any> = {
      meta: {
        backupId,
        label,
        createdAt: new Date().toISOString(),
        version: '1.0.0'
      },
      data: {}
    };

    let filesIncluded = 0;
    for (const file of REQUIRED_FILES) {
      const baseName = file.replace('.json', '');
      const data = await JsonDatabase.readData(baseName, null);
      if (data !== null) {
        snapshot.data[baseName] = data;
        filesIncluded++;
      }
    }

    const jsonString = JSON.stringify(snapshot, null, 2);
    await fs.writeFile(filePath, jsonString, 'utf-8');
    const stats = await fs.stat(filePath);

    return {
      backupId,
      filename,
      filePath,
      filesIncluded,
      createdAt: snapshot.meta.createdAt,
      sizeBytes: stats.size
    };
  }

  /**
   * List all available backups
   */
  public static async listBackups(): Promise<
    Array<{
      backupId: string;
      filename: string;
      createdAt: string;
      sizeBytes: number;
    }>
  > {
    await JsonDatabase.ensureDirectories();
    const files = await fs.readdir(BACKUPS_DIR);
    const jsonBackups = files.filter((f) => f.endsWith('.json'));

    const list = [];
    for (const f of jsonBackups) {
      const filePath = path.join(BACKUPS_DIR, f);
      const stat = await fs.stat(filePath);
      list.push({
        backupId: f.replace('.json', ''),
        filename: f,
        createdAt: stat.mtime.toISOString(),
        sizeBytes: stat.size
      });
    }

    return list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  /**
   * Restore database from a backup file or JSON object
   */
  public static async restoreBackup(
    backupFilenameOrData: string | Record<string, any>
  ): Promise<{ success: boolean; filesRestored: number; message: string }> {
    let snapshot: Record<string, any>;

    if (typeof backupFilenameOrData === 'string') {
      const filePath = path.join(BACKUPS_DIR, backupFilenameOrData);
      const content = await fs.readFile(filePath, 'utf-8');
      snapshot = JSON.parse(content);
    } else {
      snapshot = backupFilenameOrData;
    }

    if (!snapshot || !snapshot.data || typeof snapshot.data !== 'object') {
      throw new Error('Invalid backup file format: missing database payload');
    }

    // Create an automatic safety snapshot of current state before overwrite
    await this.createBackup('pre-restore-safety');

    let filesRestored = 0;
    for (const [key, data] of Object.entries(snapshot.data)) {
      await JsonDatabase.writeData(key, data);
      filesRestored++;
    }

    return {
      success: true,
      filesRestored,
      message: `Successfully restored ${filesRestored} JSON files from backup.`
    };
  }
}
