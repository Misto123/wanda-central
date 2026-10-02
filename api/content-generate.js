/**
 * Wanda Central - Content Generator API Proxy
 * Proxies requests to Supabase Edge Function
 */

const SUPABASE_ENDPOINT = 'https://kalswipohwljtousvacy.supabase.co/functions/v1/public-api';
const API_KEY = 'hfc_Q2eeLra9LWtpQBXmTVFliUbukobVZuYj';

export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    // Forward request to Supabase
    const response = await fetch(SUPABASE_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
      },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();

    // Return response
    res.status(response.status).json(data);
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to generate content',
    });
  }
}
