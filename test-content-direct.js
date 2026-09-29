// Direct test of Content Creator API
import fetch from 'node-fetch';

const API_KEY = 'hfc_2x8RueOc4ptHsJaAuaCbHbyJU2X9RzP4';

async function testAPI() {
  console.log('🧪 Testing Content Creator API - Direct Call\n');

  try {
    console.log('Making request to Content Creator API...\n');
    
    const response = await fetch('https://uyrkcolmisxsmnzfsghr.supabase.co/functions/v1/public-api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
      },
      body: JSON.stringify({
        keywords: {
          main_keyword: 'best coffee makers 2026',
          secondary_keywords: ['drip coffee'],
        },
        language: 'English',
        article_length_words: 400,
        tone: 'conversational',
        enable_no_ai_slop: true,
      }),
    });

    console.log('Response status:', response.status);
    console.log('Response headers:', Object.fromEntries(response.headers.entries()));

    const data = await response.json();
    console.log('\n✅ Response received:');
    console.log(JSON.stringify(data, null, 2).substring(0, 500));

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

testAPI();
