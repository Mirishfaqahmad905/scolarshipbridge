import { BackupService } from './services/backupService';

async function runBackup() {
  console.log('💾 [Backup] Starting ScholarBridge JSON database snapshot...');
  try {
    const result = await BackupService.createBackup('cli');
    console.log('✅ [Backup] Backup created successfully:');
    console.log(`   - Backup ID: ${result.backupId}`);
    console.log(`   - Filename: ${result.filename}`);
    console.log(`   - Files included: ${result.filesIncluded}`);
    console.log(`   - Size: ${(result.sizeBytes / 1024).toFixed(2)} KB`);
    console.log(`   - Path: ${result.filePath}`);
    process.exit(0);
  } catch (err) {
    console.error('❌ [Backup] Error during backup:', err);
    process.exit(1);
  }
}

runBackup();
