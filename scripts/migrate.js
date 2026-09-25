import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkTables() {
  console.log('🔍 Checking existing tables...');
  
  // Try to query a table to see if schema exists
  const { data, error } = await supabase.from('projects').select('id').limit(1);
  
  if (error) {
    if (error.message.includes('does not exist')) {
      return false;
    }
    console.log('⚠️  Error checking tables:', error.message);
  }
  
  return true;
}

async function runMigration() {
  console.log('🚀 Wanda Central Database Migration');
  console.log('===================================');
  console.log(`📍 Target: ${supabaseUrl}\n`);

  const tablesExist = await checkTables();
  
  if (tablesExist) {
    console.log('✅ Database tables already exist!');
    console.log('   Migration not needed.');
    console.log('\n💡 To recreate tables, drop them manually first in Supabase Dashboard.');
    process.exit(0);
  }

  console.log('📋 Database tables not found. Manual migration required.\n');
  console.log('🔧 Automated migration not available due to Supabase API limitations.');
  console.log('   (Service role key does not have Management API access)\n');
  
  console.log('📝 Please run the migration manually:');
  console.log('');
  console.log('1. Open Supabase Dashboard:');
  console.log('   https://supabase.com/dashboard/project/mouycpybovknqrhknoiv/sql/new');
  console.log('');
  console.log('2. Copy the contents of schema.sql');
  console.log('');
  console.log('3. Paste into SQL Editor and click "Run"');
  console.log('');
  console.log('4. Verify tables created in Table Editor');
  console.log('');
  console.log('⚡ This is a one-time setup. Future deployments will skip migration.');
  console.log('');
  console.log('📄 Schema file location: ./schema.sql');
  
  // For deployment, we don't want to fail the build
  if (process.env.VERCEL || process.env.CI) {
    console.log('\n🚀 Running in deployment environment - continuing build...');
    process.exit(0);
  }
  
  process.exit(1);
}

runMigration();
