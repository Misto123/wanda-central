// Wanda Central QA Test - Remote Browser Integration
import fetch from 'node-fetch';

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://mouycpybovknqrhknoiv.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const BROWSER_API_KEY = 'JTYDA_7531D_98HGTR_YT154';
const BROWSER_API_URL = 'http://65.21.199.228:3000';

console.log('🧪 Wanda Central - Remote Browser QA Test');
console.log('==========================================\n');

async function testRemoteBrowserIntegration() {
  try {
    // 1. Create test user
    console.log('👤 Creating test user in Wanda...');
    const userRes = await fetch(`${SUPABASE_URL}/rest/v1/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Prefer': 'return=representation,resolution=merge-duplicates'
      },
      body: JSON.stringify({
        email: 'qa-test@wandacentral.com',
        name: 'QA Test User',
        role: 'admin'
      })
    });
    const userData = await userRes.json();
    const user = Array.isArray(userData) ? userData[0] : userData;
    console.log(`   ✅ User: ${user.id}\n`);

    // 2. Create test project
    console.log('📁 Creating test project...');
    const projectRes = await fetch(`${SUPABASE_URL}/rest/v1/projects`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Prefer': 'return=representation'
      },
      body: JSON.stringify({
        name: 'QA Test - Remote Browser',
        domain: 'example.com',
        status: 'active',
        owner_id: user.id
      })
    });
    const projectData = await projectRes.json();
    const project = Array.isArray(projectData) ? projectData[0] : projectData;
    console.log(`   ✅ Project: ${project.id}\n`);

    // 3. Check Remote Browser API status
    console.log('🔍 Checking Remote Browser API status...');
    const statusRes = await fetch(`${BROWSER_API_URL}/browsers/status?x_api_key=${BROWSER_API_KEY}`);
    const statusData = await statusRes.json();
    
    if (statusData.success) {
      console.log('   ✅ Remote Browser API is online');
      console.log(`   Providers: ${statusData.data.providers.map(p => p.name).join(', ')}\n`);
    } else {
      throw new Error('Remote Browser API is not available');
    }

    // 4. Start a Puppeteer browser
    console.log('🚀 Starting remote browser instance...');
    const startRes = await fetch(`${BROWSER_API_URL}/browsers/start?x_api_key=${BROWSER_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        provider: 'puppeteer',
        headless: false,
        timeout: 300000 // 5 minutes
      })
    });
    
    const startData = await startRes.json();
    if (!startData.success) {
      throw new Error(`Failed to start browser: ${startData.error}`);
    }

    const { browserId, puppeteerUrl } = startData.data;
    console.log(`   ✅ Browser started: ${browserId}`);
    console.log(`   WebSocket: ${puppeteerUrl}\n`);

    // 5. Create job record in Wanda
    console.log('📝 Recording job in Wanda Central...');
    const jobRes = await fetch(`${SUPABASE_URL}/rest/v1/jobs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Prefer': 'return=representation'
      },
      body: JSON.stringify({
        project_id: project.id,
        tool: 'Remote Browser',
        type: 'puppeteer_session',
        status: 'running',
        priority: 5,
        input: {
          provider: 'puppeteer',
          browserId: browserId
        },
        external_job_id: browserId,
        started_at: new Date().toISOString()
      })
    });
    const jobData = await jobRes.json();
    const job = Array.isArray(jobData) ? jobData[0] : jobData;
    console.log(`   ✅ Job recorded: ${job.id}\n`);

    // 6. Log the activity
    await fetch(`${SUPABASE_URL}/rest/v1/logs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`
      },
      body: JSON.stringify({
        project_id: project.id,
        tool: 'Remote Browser',
        job_id: job.id,
        level: 'info',
        action: 'Browser started',
        status: 'success',
        message: `Puppeteer browser ${browserId} started successfully`,
        metadata: { browserId, puppeteerUrl }
      })
    });

    console.log('⏱️  Browser running for 10 seconds...\n');
    await new Promise(resolve => setTimeout(resolve, 10000));

    // 7. Stop the browser
    console.log('🛑 Stopping browser...');
    const stopRes = await fetch(`${BROWSER_API_URL}/browsers/stop?x_api_key=${BROWSER_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        provider: 'puppeteer',
        browserId: browserId
      })
    });
    
    const stopData = await stopRes.json();
    console.log('   ✅ Browser stopped\n');

    // 8. Update job status
    await fetch(`${SUPABASE_URL}/rest/v1/jobs?id=eq.${job.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`
      },
      body: JSON.stringify({
        status: 'completed',
        completed_at: new Date().toISOString(),
        result: stopData.data
      })
    });

    // Summary
    console.log('✅ QA TEST COMPLETED SUCCESSFULLY!\n');
    console.log('📊 Test Summary:');
    console.log(`   User: ${user.email}`);
    console.log(`   Project: ${project.name}`);
    console.log(`   Job ID: ${job.id}`);
    console.log(`   Browser ID: ${browserId}`);
    console.log(`   Duration: ~10 seconds`);
    console.log(`   Status: Completed`);
    console.log('\n🌐 View in Wanda Central:');
    console.log(`   https://wanda-central.vercel.app`);
    console.log('\n🎉 Remote Browser integration test successful!');

  } catch (error) {
    console.error('\n❌ Test failed:', error.message);
    process.exit(1);
  }
}

testRemoteBrowserIntegration();
