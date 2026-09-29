// Keyword Optimization API for Wanda Central
// Provides recommendations based on GSC data

import express from 'express';
import { createClient } from '@supabase/supabase-js';

const app = express();
app.use(express.json());

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Middleware: API key authentication
app.use((req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  if (!apiKey || apiKey !== process.env.WANDA_API_KEY) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
});

// GET /api/keywords/:project_id - Get keyword opportunities
app.get('/api/keywords/:project_id', async (req, res) => {
  try {
    const { project_id } = req.params;
    const { limit = 50, min_score = 50 } = req.query;

    const { data, error } = await supabase
      .from('keyword_opportunities')
      .select('*')
      .eq('project_id', project_id)
      .gte('opportunity_score', min_score)
      .order('opportunity_score', { ascending: false })
      .limit(limit);

    if (error) throw error;

    res.json({
      success: true,
      count: data.length,
      keywords: data
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET /api/gsc/:project_id/top-keywords - Top performing keywords
app.get('/api/gsc/:project_id/top-keywords', async (req, res) => {
  try {
    const { project_id } = req.params;
    const { days = 30, limit = 100 } = req.query;

    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);

    // Get property for project
    const { data: property } = await supabase
      .from('gsc_properties')
      .select('id')
      .eq('project_id', project_id)
      .single();

    if (!property) {
      return res.status(404).json({ error: 'Project not found' });
    }

    // Aggregate keyword data
    const { data, error } = await supabase.rpc('get_top_keywords', {
      p_property_id: property.id,
      p_days: days,
      p_limit: limit
    });

    if (error) throw error;

    res.json({
      success: true,
      project_id,
      period_days: days,
      keywords: data
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET /api/gsc/:project_id/pages - Top pages
app.get('/api/gsc/:project_id/pages', async (req, res) => {
  try {
    const { project_id } = req.params;
    const { days = 30, limit = 50 } = req.query;

    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);

    const { data: property } = await supabase
      .from('gsc_properties')
      .select('id')
      .eq('project_id', project_id)
      .single();

    if (!property) {
      return res.status(404).json({ error: 'Project not found' });
    }

    const { data, error } = await supabase
      .from('gsc_search_analytics')
      .select('page')
      .eq('property_id', property.id)
      .gte('date', cutoffDate.toISOString().split('T')[0])
      .order('clicks', { ascending: false })
      .limit(limit);

    if (error) throw error;

    res.json({
      success: true,
      pages: data
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST /api/gsc/sync - Trigger manual sync
app.post('/api/gsc/sync', async (req, res) => {
  try {
    const { project_id } = req.body;

    const { data: property } = await supabase
      .from('gsc_properties')
      .select('*')
      .eq('project_id', project_id)
      .single();

    if (!property) {
      return res.status(404).json({ error: 'GSC property not found for project' });
    }

    // Queue import job
    const { data: job } = await supabase
      .from('jobs')
      .insert({
        project_id,
        tool: 'GSC',
        type: 'data_import',
        status: 'queued',
        input: {
          property_url: property.property_url,
          days: 7
        }
      })
      .select()
      .single();

    res.json({
      success: true,
      message: 'GSC sync queued',
      job_id: job.id
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET /api/recommendations/:project_id - AI-powered keyword recommendations
app.get('/api/recommendations/:project_id', async (req, res) => {
  try {
    const { project_id } = req.params;

    // Get keywords in position 4-20 with high impressions
    const { data: property } = await supabase
      .from('gsc_properties')
      .select('id')
      .eq('project_id', project_id)
      .single();

    if (!property) {
      return res.status(404).json({ error: 'Project not found' });
    }

    const { data: keywords } = await supabase
      .from('gsc_search_analytics')
      .select('*')
      .eq('property_id', property.id)
      .gte('position', 4)
      .lte('position', 20)
      .gte('impressions', 100)
      .order('impressions', { ascending: false })
      .limit(50);

    // Calculate opportunity score
    const recommendations = keywords.map(k => ({
      keyword: k.query,
      current_position: k.position,
      current_clicks: k.clicks,
      impressions: k.impressions,
      ctr: k.ctr,
      potential_clicks: Math.round(k.impressions * 0.3), // Rough estimate if moved to top 3
      opportunity_score: Math.round((k.impressions / k.position) * (1 - k.ctr) * 100),
      recommendation: generateRecommendation(k)
    }));

    res.json({
      success: true,
      count: recommendations.length,
      recommendations: recommendations.sort((a, b) => b.opportunity_score - a.opportunity_score)
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

function generateRecommendation(keyword) {
  if (keyword.position <= 5) {
    return `Optimize content for "${keyword.query}" - you're on page 1, push for top 3`;
  } else if (keyword.position <= 10) {
    return `Target "${keyword.query}" - high impressions, needs better content`;
  } else {
    return `Long-term opportunity for "${keyword.query}" - build topical authority`;
  }
}

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Wanda API running on port ${PORT}`);
});

export default app;
