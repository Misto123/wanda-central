# Google Search Console MCP Server

MCP server for importing and querying Google Search Console data in Wanda Central.

## Features

- Daily automated data import from GSC
- Query search performance metrics
- Keyword analysis and recommendations
- URL performance tracking
- Click/impression/CTR/position data

## Setup

1. **Get GSC API Credentials**
   - Go to: https://console.cloud.google.com/
   - Enable Google Search Console API
   - Create OAuth 2.0 credentials
   - Download credentials.json

2. **Configure Environment**
   ```bash
   export GSC_CLIENT_ID="your-client-id"
   export GSC_CLIENT_SECRET="your-client-secret"
   export GSC_REFRESH_TOKEN="your-refresh-token"
   ```

3. **Install Dependencies**
   ```bash
   npm install googleapis
   ```

## MCP Tools

- `gsc_import_data` - Import GSC data for a domain
- `gsc_query_keywords` - Query keyword performance
- `gsc_get_top_pages` - Get top performing pages
- `gsc_keyword_opportunities` - Find keyword optimization opportunities
- `gsc_compare_periods` - Compare performance across time periods

## Database Schema

See `supabase/migrations/` for GSC data tables.
