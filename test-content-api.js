// Test Content Creator API Integration
import fetch from 'node-fetch';

const WANDA_API = 'https://uyrkcolmisxsmnzfsghr.supabase.co/functions/v1/public-api';
const API_KEY = 'hfc_2x8RueOc4ptHsJaAuaCbHbyJU2X9RzP4';

async function testContentGeneration() {
  console.log('🧪 Testing Content Creator API\n');
  console.log('Endpoint:', WANDA_API);
  console.log('Generating article for: "best coffee makers 2026"\n');

  try {
    const startTime = Date.now();
    
    const response = await fetch(WANDA_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
      },
      body: JSON.stringify({
        keywords: {
          main_keyword: 'best coffee makers 2026',
          secondary_keywords: ['drip coffee', 'espresso machine'],
        },
        language: 'English',
        article_length_words: 400,
        paragraph_count: 3,
        search_intent: 'commercial',
        tone: 'conversational',
        audience_level: 'intermediate',
        content_mode: ['humanizer'],
        enable_no_ai_slop: true,
        enable_post_processing: true,
        include_seo_insights: true,
        temperature: 0.7,
        max_tokens: 4000,
      }),
      signal: AbortSignal.timeout(90000),
    });

    const executionTime = Date.now() - startTime;
    const data = await response.json();

    if (!response.ok || !data.success) {
      console.error('❌ API Error:', data.error || response.statusText);
      console.error('Status:', response.status);
      return;
    }

    console.log('✅ Content Generated Successfully!\n');
    console.log('📊 Response Details:');
    console.log('   Request ID:', data.request_id);
    console.log('   Remaining Quota:', data.remaining_quota);
    console.log('   Execution Time:', executionTime, 'ms');
    console.log('   API Execution Time:', data.execution_time_ms, 'ms\n');

    console.log('📝 Generated Content:');
    console.log('   Title:', data.data.meta.title);
    console.log('   Description:', data.data.meta.description);
    console.log('   Slug:', data.data.meta.slug);
    console.log('   H1:', data.data.content.h1);
    console.log('   Sections:', data.data.content.sections.length);
    console.log('   FAQs:', data.data.faqs.length);
    
    if (data.data.seo_insights) {
      console.log('\n🎯 SEO Insights:');
      console.log('   Related Terms:', data.data.seo_insights.relatedTerms?.slice(0, 5).join(', '));
      console.log('   Questions:', data.data.seo_insights.questions?.length || 0);
    }

    console.log('\n📄 Article Preview:');
    console.log('─'.repeat(60));
    console.log(data.data.content.intro.substring(0, 200) + '...');
    console.log('─'.repeat(60));

    console.log('\n🎉 Test Completed Successfully!');
    console.log('Website domain: test-website.com');
    console.log('This request would appear in Wanda Central dashboard.');

  } catch (error) {
    console.error('❌ Test Failed:', error.message);
    if (error.cause) {
      console.error('Cause:', error.cause);
    }
  }
}

testContentGeneration();
