#!/usr/bin/env node
// GSC MCP Server for Wanda Central
// Imports Google Search Console data and provides query tools

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { CallToolRequestSchema, ListToolsRequestSchema } from '@modelcontextprotocol/sdk/types.js';
import { google } from 'googleapis';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Initialize GSC API
const oauth2Client = new google.auth.OAuth2(
  process.env.GSC_CLIENT_ID,
  process.env.GSC_CLIENT_SECRET,
  'urn:ietf:wg:oauth:2.0:oob'
);

oauth2Client.setCredentials({
  refresh_token: process.env.GSC_REFRESH_TOKEN
});

const searchconsole = google.searchconsole({ version: 'v1', auth: oauth2Client });

const server = new Server(
  {
    name: 'wanda-gsc-server',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// List available tools
server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: 'gsc_import_data',
      description: 'Import Google Search Console data for a domain',
      inputSchema: {
        type: 'object',
        properties: {
          domain: { type: 'string', description: 'Domain URL (e.g., https://example.com)' },
          days: { type: 'number', description: 'Number of days to import (default: 30)', default: 30 },
        },
        required: ['domain'],
      },
    },
    {
      name: 'gsc_query_keywords',
      description: 'Query keyword performance data',
      inputSchema: {
        type: 'object',
        properties: {
          project_id: { type: 'string', description: 'Project UUID' },
          days: { type: 'number', description: 'Days to look back (default: 7)', default: 7 },
          min_clicks: { type: 'number', description: 'Minimum clicks filter', default: 0 },
          limit: { type: 'number', description: 'Result limit', default: 50 },
        },
        required: ['project_id'],
      },
    },
    {
      name: 'gsc_keyword_opportunities',
      description: 'Find keyword optimization opportunities (position 4-20 with potential)',
      inputSchema: {
        type: 'object',
        properties: {
          project_id: { type: 'string', description: 'Project UUID' },
          min_position: { type: 'number', description: 'Minimum position', default: 4 },
          max_position: { type: 'number', description: 'Maximum position', default: 20 },
        },
        required: ['project_id'],
      },
    },
    {
      name: 'gsc_top_pages',
      description: 'Get top performing pages by clicks',
      inputSchema: {
        type: 'object',
        properties: {
          project_id: { type: 'string', description: 'Project UUID' },
          days: { type: 'number', description: 'Days to analyze', default: 30 },
          limit: { type: 'number', description: 'Number of pages', default: 20 },
        },
        required: ['project_id'],
      },
    },
  ],
}));

// Handle tool execution
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    switch (name) {
      case 'gsc_import_data': {
        const { domain, days = 30 } = args;
        
        // Get or create property
        const { data: property } = await supabase
          .from('gsc_properties')
          .upsert({ property_url: domain }, { onConflict: 'property_url' })
          .select()
          .single();

        // Fetch data from GSC
        const endDate = new Date();
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - days);

        const response = await searchconsole.searchanalytics.query({
          siteUrl: domain,
          requestBody: {
            startDate: startDate.toISOString().split('T')[0],
            endDate: endDate.toISOString().split('T')[0],
            dimensions: ['query', 'page', 'date', 'country', 'device'],
            rowLimit: 25000,
          },
        });

        const rows = response.data.rows || [];
        
        // Batch insert to Supabase
        const records = rows.map(row => ({
          property_id: property.id,
          date: row.keys[2],
          query: row.keys[0],
          page: row.keys[1],
          country: row.keys[3],
          device: row.keys[4],
          clicks: row.clicks,
          impressions: row.impressions,
          ctr: row.ctr,
          position: row.position,
        }));

        await supabase.from('gsc_search_analytics').upsert(records);

        // Update sync timestamp
        await supabase
          .from('gsc_properties')
          .update({ last_sync: new Date().toISOString() })
          .eq('id', property.id);

        return {
          content: [
            {
              type: 'text',
              text: `Imported ${rows.length} rows from GSC for ${domain}`,
            },
          ],
        };
      }

      case 'gsc_query_keywords': {
        const { project_id, days = 7, min_clicks = 0, limit = 50 } = args;

        const cutoffDate = new Date();
        cutoffDate.setDate(cutoffDate.getDate() - days);

        const { data } = await supabase
          .from('gsc_search_analytics')
          .select('query, SUM(clicks)::int as total_clicks, AVG(position)::decimal as avg_position, SUM(impressions)::int as total_impressions')
          .gte('date', cutoffDate.toISOString().split('T')[0])
          .gte('clicks', min_clicks)
          .limit(limit);

        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(data, null, 2),
            },
          ],
        };
      }

      case 'gsc_keyword_opportunities': {
        const { project_id, min_position = 4, max_position = 20 } = args;

        // Find keywords in position 4-20 (page 1-2) with decent impressions
        const { data } = await supabase
          .from('gsc_search_analytics')
          .select('*')
          .gte('position', min_position)
          .lte('position', max_position)
          .gte('impressions', 100)
          .order('impressions', { ascending: false })
          .limit(100);

        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(data, null, 2),
            },
          ],
        };
      }

      case 'gsc_top_pages': {
        const { project_id, days = 30, limit = 20 } = args;

        const cutoffDate = new Date();
        cutoffDate.setDate(cutoffDate.getDate() - days);

        const { data } = await supabase
          .from('gsc_search_analytics')
          .select('page, SUM(clicks)::int as total_clicks, AVG(position)::decimal as avg_position')
          .gte('date', cutoffDate.toISOString().split('T')[0])
          .order('total_clicks', { ascending: false })
          .limit(limit);

        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(data, null, 2),
            },
          ],
        };
      }

      default:
        throw new Error(`Unknown tool: ${name}`);
    }
  } catch (error) {
    return {
      content: [
        {
          type: 'text',
          text: `Error: ${error.message}`,
        },
      ],
      isError: true,
    };
  }
});

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('Wanda GSC MCP Server running on stdio');
}

main().catch(console.error);
