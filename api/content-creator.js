// Content Creator API Endpoint for Websites
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const CONTENT_API_URL = 'https://uyrkcolmisxsmnzfsghr.supabase.co/functions/v1/public-api';
const CONTENT_API_KEY = 'hfc_2x8RueOc4ptHsJaAuaCbHbyJU2X9RzP4';

export async function generateContent(req, res) {
  try {
    const { 
      website_domain,
      main_keyword,
      secondary_keywords,
      language,
      article_length_words,
      tone,
      project_id 
    } = req.body;

    // Validate
    if (!website_domain || !main_keyword) {
      return res.status(400).json({
        success: false,
        error: 'website_domain and main_keyword are required'
      });
    }

    // Create content request record
    const { data: request, error: requestError } = await supabase
      .from('content_requests')
      .insert({
        project_id,
        website_domain,
        main_keyword,
        secondary_keywords: secondary_keywords || [],
        language: language || 'English',
        article_length_words: article_length_words || 600,
        tone: tone || 'conversational',
        status: 'processing'
      })
      .select()
      .single();

    if (requestError) throw requestError;

    // Call Content Creator API
    const startTime = Date.now();
    const response = await fetch(CONTENT_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': CONTENT_API_KEY,
      },
      body: JSON.stringify({
        keywords: {
          main_keyword,
          secondary_keywords: secondary_keywords || [],
        },
        language: language || 'English',
        article_length_words: article_length_words || 600,
        tone: tone || 'conversational',
        enable_no_ai_slop: true,
        enable_post_processing: true,
        include_seo_insights: true,
      }),
      signal: AbortSignal.timeout(90000),
    });

    const data = await response.json();
    const executionTime = Date.now() - startTime;

    if (!response.ok || !data.success) {
      await supabase
        .from('content_requests')
        .update({ status: 'failed' })
        .eq('id', request.id);

      return res.status(response.status).json({
        success: false,
        error: data.error || 'Content generation failed',
      });
    }

    // Update request status
    await supabase
      .from('content_requests')
      .update({
        status: 'completed',
        request_id: data.request_id,
        remaining_quota: data.remaining_quota,
        execution_time_ms: executionTime,
        completed_at: new Date().toISOString(),
      })
      .eq('id', request.id);

    // Store generated content
    const wordCount = data.data.content.sections
      .reduce((sum, s) => sum + s.body.split(' ').length, 0);

    await supabase
      .from('generated_content')
      .insert({
        content_request_id: request.id,
        title: data.data.meta.title,
        meta_description: data.data.meta.description,
        slug: data.data.meta.slug,
        h1: data.data.content.h1,
        intro: data.data.content.intro,
        sections: data.data.content.sections,
        cta: data.data.content.cta,
        faqs: data.data.faqs,
        article_schema: data.data.schema.article_jsonld,
        faq_schema: data.data.schema.faq_jsonld,
        seo_insights: data.data.seo_insights,
        word_count: wordCount,
      });

    // Track quota usage
    await supabase
      .from('website_quota_usage')
      .upsert({
        website_domain,
        date: new Date().toISOString().split('T')[0],
        requests_count: 1,
        remaining_quota: data.remaining_quota,
        last_request_at: new Date().toISOString(),
      }, {
        onConflict: 'website_domain,date',
        ignoreDuplicates: false,
      });

    res.json({
      success: true,
      request_id: data.request_id,
      remaining_quota: data.remaining_quota,
      execution_time_ms: executionTime,
      content: data.data,
    });

  } catch (error) {
    console.error('Content generation error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Internal server error',
    });
  }
}

export async function getWebsiteStats(req, res) {
  try {
    const { website_domain, days = 30 } = req.query;

    if (!website_domain) {
      return res.status(400).json({
        success: false,
        error: 'website_domain is required'
      });
    }

    const { data, error } = await supabase
      .rpc('get_website_content_stats', {
        p_website_domain: website_domain,
        p_days: days
      });

    if (error) throw error;

    res.json({
      success: true,
      website_domain,
      period_days: days,
      stats: data[0],
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}
