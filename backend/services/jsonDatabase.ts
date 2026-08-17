import fs from 'fs/promises';
import path from 'path';

// Define the data directory relative to the project root
export const DATA_DIR = path.resolve(process.cwd(), 'backend', 'data');
export const BACKUPS_DIR = path.resolve(process.cwd(), 'backend', 'backups');

export class JsonDatabase {
  private static locks: Map<string, Promise<void>> = new Map();

  /**
   * Resolve full file path inside backend/data/
   */
  private static getFilePath(filename: string): string {
    const cleanName = filename.endsWith('.json') ? filename : `${filename}.json`;
    return path.join(DATA_DIR, cleanName);
  }

  /**
   * Acquire a mutex lock for sequential file writes
   */
  private static async acquireLock(filepath: string): Promise<() => void> {
    while (this.locks.has(filepath)) {
      await this.locks.get(filepath);
    }
    let resolver: () => void;
    const lockPromise = new Promise<void>((resolve) => {
      resolver = resolve;
    });
    this.locks.set(filepath, lockPromise);
    return () => {
      this.locks.delete(filepath);
      resolver!();
    };
  }

  /**
   * Ensure data directory exists
   */
  public static async ensureDirectories(): Promise<void> {
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.mkdir(BACKUPS_DIR, { recursive: true });
  }

  /**
   * Read raw JSON file asynchronously
   */
  public static async readData<T = any>(filename: string, defaultValue: T = [] as any): Promise<T> {
    await this.ensureDirectories();
    const filepath = this.getFilePath(filename);

    try {
      const content = await fs.readFile(filepath, 'utf-8');
      if (!content || !content.trim()) {
        return defaultValue;
      }
      return JSON.parse(content) as T;
    } catch (err: any) {
      if (err.code === 'ENOENT') {
        // File doesn't exist yet, create with default
        await this.writeData(filename, defaultValue);
        return defaultValue;
      }
      console.error(`[JsonDB] Error reading ${filename}:`, err);
      return defaultValue;
    }
  }

  /**
   * Write data safely using atomic write pattern (temp file -> rename)
   */
  public static async writeData<T = any>(filename: string, data: T): Promise<void> {
    await this.ensureDirectories();
    const filepath = this.getFilePath(filename);
    const tempPath = `${filepath}.${Date.now()}.${Math.random().toString(36).slice(2, 7)}.tmp`;

    const unlock = await this.acquireLock(filepath);
    try {
      const jsonString = JSON.stringify(data, null, 2);
      // Write to temp file first
      await fs.writeFile(tempPath, jsonString, 'utf-8');
      // Atomically replace the destination file
      await fs.rename(tempPath, filepath);
    } catch (err) {
      // Clean up temp file if something failed
      try {
        await fs.unlink(tempPath);
      } catch {
        // ignore
      }
      console.error(`[JsonDB] Error writing ${filename}:`, err);
      throw err;
    } finally {
      unlock();
    }
  }

  /**
   * Find all records in an array JSON file
   */
  public static async findAll<T = any>(filename: string): Promise<T[]> {
    const data = await this.readData<T[]>(filename, []);
    return Array.isArray(data) ? data : [];
  }

  /**
   * Find record by ID
   */
  public static async findById<T extends { id: string }>(filename: string, id: string): Promise<T | null> {
    const list = await this.findAll<T>(filename);
    return list.find((item) => item.id === id) || null;
  }

  /**
   * Find single record matching predicate
   */
  public static async findOne<T = any>(
    filename: string,
    predicate: (item: T) => boolean
  ): Promise<T | null> {
    const list = await this.findAll<T>(filename);
    return list.find(predicate) || null;
  }

  /**
   * Find all records matching predicate
   */
  public static async filter<T = any>(
    filename: string,
    predicate: (item: T) => boolean
  ): Promise<T[]> {
    const list = await this.findAll<T>(filename);
    return list.filter(predicate);
  }

  /**
   * Create and insert new record into array file
   */
  public static async create<T extends { id?: string }>(filename: string, item: T): Promise<T> {
    const list = await this.findAll<any>(filename);
    const finalItem = {
      ...item,
      id: item.id || `rec-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`
    };
    list.unshift(finalItem);
    await this.writeData(filename, list);
    return finalItem as T;
  }

  /**
   * Update existing record in array file
   */
  public static async update<T extends { id: string }>(
    filename: string,
    id: string,
    updates: Partial<T>
  ): Promise<T | null> {
    const list = await this.findAll<T>(filename);
    const index = list.findIndex((item) => item.id === id);
    if (index === -1) return null;

    const updated = {
      ...list[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    list[index] = updated;
    await this.writeData(filename, list);
    return updated;
  }

  /**
   * Remove record by ID from array file
   */
  public static async remove<T extends { id: string }>(filename: string, id: string): Promise<boolean> {
    const list = await this.findAll<T>(filename);
    const initialLength = list.length;
    const filtered = list.filter((item) => item.id !== id);
    if (filtered.length === initialLength) {
      return false; // item not found
    }
    await this.writeData(filename, filtered);
    return true;
  }
}
