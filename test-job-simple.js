// Quick test script - Create a GCTR job via API
import fetch from 'node-fetch';

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://mouycpybovknqrhknoiv.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const GCTR_API_KEY = process.env.GCTR_API_KEY || 'JTYDA_7531D_98HGTR_YT154';
const GCTR_BASE_URL = process.env.GCTR_API_URL || 'http://65.21.199.228:3000/api/jobs';

if (!SUPABASE_KEY) {
  console.error('❌ SUPABASE_SERVICE_ROLE_KEY not set');
  process.exit(1);
}

console.log('🧪 Wanda Central - QA Test Job');
console.log('================================\n');

async function createTestJob() {
  try {
    // 1. Create test user
    console.log('👤 Creating test user...');
    const userRes = await fetch(`${SUPABASE_URL}/rest/v1/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Prefer': 'return=representation,resolution=merge-duplicates'
      },
      body: JSON.stringify({
        email: 'test@wandacentral.com',
        name: 'Test User',
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
        name: 'QA Test Project - Example.com',
        domain: 'example.com',
        status: 'active',
        owner_id: user.id,
        config: {}
      })
    });
    const projectData = await projectRes.json();
    const project = Array.isArray(projectData) ? projectData[0] : projectData;
    console.log(`   ✅ Project: ${project.id}\n`);

    // 3. Create job record
    console.log('📝 Creating job in database...');
    const jobInput = {
      name: 'QA Test Campaign - Example.com',
      targetUrl: 'https://example.com',
      type: 'gctr',
      locations: ['us'],
      keywords: [
        { keyword: 'example test keyword', dailyClicks: 5 }
      ],
      duration: { length: 1, unit: 'month' },
      anonymousPercent: 50
    };

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
        tool: 'GCTR',
        type: 'gctr_campaign',
        status: 'queued',
        priority: 5,
        input: jobInput
      })
    });
    const jobData = await jobRes.json();
    const job = Array.isArray(jobData) ? jobData[0] : jobData;
    console.log(`   ✅ Job: ${job.id}\n`);

    // 4. Submit to GCTR API
    console.log('🚀 Submitting campaign to GCTR (Unified Browser API)...');
    const gctrRes = await fetch(GCTR_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': GCTR_API_KEY
      },
      body: JSON.stringify(jobInput)
    });

    if (!gctrRes.ok) {
      const errorText = await gctrRes.text();
      throw new Error(`GCTR API error: ${gctrRes.status} - ${errorText}`);
    }

    const gctrResult = await gctrRes.json();
    console.log(`   ✅ GCTR Campaign ID: ${gctrResult.job?.id || 'created'}\n`);

    // 5. Update job with external ID
    if (gctrResult.job?.id) {
      await fetch(`${SUPABASE_URL}/rest/v1/jobs?id=eq.${job.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'apikey': SUPABASE_KEY,
          'Authorization': `Bearer ${SUPABASE_KEY}`
        },
        body: JSON.stringify({
          external_job_id: gctrResult.job.id,
          status: 'running',
          started_at: new Date().toISOString()
        })
      });
      console.log('📊 Job status updated to "running"\n');
    }

    // 6. Create log entry
    await fetch(`${SUPABASE_URL}/rest/v1/logs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`
      },
      body: JSON.stringify({
        project_id: project.id,
        tool: 'GCTR',
        job_id: job.id,
        level: 'info',
        action: 'Job created',
        status: 'success',
        message: 'GCTR campaign started successfully',
        metadata: { external_job_id: gctrResult.job?.id }
      })
    });

    // Summary
    console.log('✅ QA TEST COMPLETED SUCCESSFULLY!\n');
    console.log('📊 Summary:');
    console.log(`   User ID: ${user.id}`);
    console.log(`   Project ID: ${project.id}`);
    console.log(`   Job ID: ${job.id}`);
    console.log(`   GCTR Campaign: ${gctrResult.job?.id || 'pending'}`);
    console.log(`   Status: running`);
    console.log('\n🌐 View in dashboard:');
    console.log(`   https://wanda-central.vercel.app`);
    console.log('\n🎉 First job successfully created and started!');

  } catch (error) {
    console.error('\n❌ Test failed:', error.message);
    if (error.stack) console.error(error.stack);
    process.exit(1);
  }
}

createTestJob();
