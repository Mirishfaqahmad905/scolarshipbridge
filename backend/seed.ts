import { initializeJsonDatabase } from './services/initData';

async function runSeed() {
  console.log('🌱 [Seed] Starting ScholarBridge JSON database seed...');
  try {
    await initializeJsonDatabase();
    console.log('✅ [Seed] Database seeded successfully into backend/data/');
    process.exit(0);
  } catch (err) {
    console.error('❌ [Seed] Error during seeding:', err);
    process.exit(1);
  }
}

runSeed();
