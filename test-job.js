import { createClient } from '@supabase/supabase-js';
import { getGCTRAdapter } from './src/adapters/gctr/adapter.js';

const supabaseUrl = process.env.SUPABASE_URL || 'https://mouycpybovknqrhknoiv.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const gctrApiKey = process.env.GCTR_API_KEY;

if (!supabaseKey) {
  console.error('❌ SUPABASE_SERVICE_ROLE_KEY not set');
  process.exit(1);
}

if (!gctrApiKey) {
  console.error('❌ GCTR_API_KEY not set');
  console.log('\n💡 Set your GCTR API key:');
  console.log('   export GCTR_API_KEY="your-key-here"');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function createTestJob() {
  console.log('🧪 Wanda Central - QA Test Job');
  console.log('================================\n');

  try {
    // 1. Create test user
    console.log('👤 Creating test user...');
    const { data: user, error: userError } = await supabase
      .from('users')
      .upsert({ 
        email: 'test@wandacentral.com',
        name: 'Test User',
        role: 'admin'
      }, { onConflict: 'email' })
      .select()
      .single();

    if (userError) throw userError;
    console.log(`   ✅ User created: ${user.id}\n`);

    // 2. Create test project
    console.log('📁 Creating test project...');
    const { data: project, error: projectError } = await supabase
      .from('projects')
      .insert({
        name: 'Test Project - Example.com',
        domain: 'example.com',
        status: 'active',
        owner_id: user.id,
        config: {}
      })
      .select()
      .single();

    if (projectError) throw projectError;
    console.log(`   ✅ Project created: ${project.id}\n`);

    // 3. Enable GCTR module
    console.log('🔧 Enabling GCTR module...');
    const { error: moduleError } = await supabase
      .from('project_modules')
      .insert({
        project_id: project.id,
        module_name: 'GCTR',
        enabled: true,
        config: {}
      });

    if (moduleError && !moduleError.message.includes('duplicate')) {
      throw moduleError;
    }
    console.log('   ✅ GCTR module enabled\n');

    // 4. Create job in database
    console.log('📝 Creating job record...');
    const { data: job, error: jobError } = await supabase
      .from('jobs')
      .insert({
        project_id: project.id,
        tool: 'GCTR',
        type: 'gctr_campaign',
        status: 'queued',
        priority: 5,
        input: {
          name: 'Test Campaign - Example.com',
          targetUrl: 'https://example.com',
          type: 'gctr',
          locations: ['us'],
          keywords: [
            { keyword: 'test keyword', dailyClicks: 5 }
          ],
          duration: {
            length: 1,
            unit: 'month'
          },
          anonymousPercent: 50
        }
      })
      .select()
      .single();

    if (jobError) throw jobError;
    console.log(`   ✅ Job created: ${job.id}\n`);

    // 5. Initialize GCTR adapter and create campaign
    console.log('🚀 Submitting job to GCTR...');
    const gctr = getGCTRAdapter(gctrApiKey);
    
    const externalJobId = await gctr.createJob({
      project_id: project.id,
      type: 'gctr_campaign',
      input: job.input
    });

    console.log(`   ✅ GCTR campaign created: ${externalJobId}\n`);

    // 6. Update job with external ID and status
    console.log('📊 Updating job status...');
    const { error: updateError } = await supabase
      .from('jobs')
      .update({
        external_job_id: externalJobId,
        status: 'running',
        started_at: new Date().toISOString()
      })
      .eq('id', job.id);

    if (updateError) throw updateError;
    console.log('   ✅ Job status updated\n');

    // 7. Create log entry
    await supabase.from('logs').insert({
      project_id: project.id,
      tool: 'GCTR',
      job_id: job.id,
      level: 'info',
      action: 'Job started',
      status: 'success',
      message: `GCTR campaign ${externalJobId} started successfully`,
      metadata: { external_job_id: externalJobId }
    });

    // 8. Get job status
    console.log('🔍 Checking GCTR campaign status...');
    const status = await gctr.getJobStatus(externalJobId);
    console.log(`   Status: ${status.status}`);
    console.log(`   Progress: ${status.progress}%`);
    console.log(`   Message: ${status.message}\n`);

    // Summary
    console.log('✅ QA TEST COMPLETED SUCCESSFULLY!\n');
    console.log('📊 Summary:');
    console.log(`   User ID: ${user.id}`);
    console.log(`   Project ID: ${project.id}`);
    console.log(`   Job ID: ${job.id}`);
    console.log(`   GCTR Campaign ID: ${externalJobId}`);
    console.log(`   Status: ${status.status}`);
    console.log('\n🌐 View in dashboard:');
    console.log(`   https://wanda-central.vercel.app`);
    console.log('\n🎉 First job successfully created and started!');

  } catch (error) {
    console.error('\n❌ Test failed:', error.message);
    process.exit(1);
  }
}

createTestJob();
