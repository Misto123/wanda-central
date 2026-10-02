/**
 * Wanda Central - Content Generator API Proxy
 * Proxies requests to Supabase Edge Function with correct authentication
 */

const SUPABASE_ENDPOINT = 'https://kalswipohwljtousvacy.supabase.co/functions/v1/public-api';
const API_KEY = 'hfc_Q2eeLra9LWtpQBXmTVFliUbukobVZuYj';

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, x-api-key');

  // Handle OPTIONS preflight
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false, 
      error: 'Method not allowed. Use POST.' 
    });
  }

  try {
    console.log('Proxying request to Supabase Edge Function...');
    console.log('Request body:', JSON.stringify(req.body, null, 2));

    // Forward request to Supabase Edge Function with correct header format
    const response = await fetch(SUPABASE_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,  // Supabase expects x-api-key, not Authorization
      },
      body: JSON.stringify(req.body),
    });

    console.log('Supabase response status:', response.status);

    const data = await response.json();
    console.log('Supabase response:', JSON.stringify(data, null, 2));

    // Return the exact response from Supabase
    return res.status(response.status).json(data);

  } catch (error) {
    console.error('Proxy error:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to generate content',
      details: error.message,
    });
  }
}
