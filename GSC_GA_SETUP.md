# GSC & GA Integration Setup Guide

## 📊 Features

Wanda Central now imports and analyzes:
- ✅ Google Search Console data (clicks, impressions, CTR, position)
- ✅ Google Analytics data (pageviews, sessions, bounce rate)
- ✅ Daily automated imports
- ✅ Keyword optimization recommendations
- ✅ REST API for website integration

## 🔧 Setup

### 1. Google Search Console API

1. **Enable GSC API:**
   - Go to: https://console.cloud.google.com/
   - Enable "Google Search Console API"

2. **Create OAuth Credentials:**
   - APIs & Services → Credentials
   - Create OAuth 2.0 Client ID
   - Application type: Desktop app
   - Download `credentials.json`

3. **Get Refresh Token:**
   ```bash
   cd mcp-servers/gsc
   npm install
   node get-token.js
   # Follow browser prompts
   # Copy refresh_token from output
   ```

4. **Add to Environment:**
   ```bash
   export GSC_CLIENT_ID="your-client-id.apps.googleusercontent.com"
   export GSC_CLIENT_SECRET="your-client-secret"
   export GSC_REFRESH_TOKEN="your-refresh-token"
   ```

### 2. Google Analytics API

1. **Enable GA4 API:**
   - Google Cloud Console
   - Enable "Google Analytics Data API"

2. **Create Service Account:**
   - IAM → Service Accounts → Create
   - Download JSON key file

3. **Grant Access:**
   - GA4 Admin → Property Access Management
   - Add service account email
   - Role: Viewer

4. **Add to Environment:**
   ```bash
   export GA_SERVICE_ACCOUNT_EMAIL="your-sa@project.iam.gserviceaccount.com"
   export GA_PRIVATE_KEY="your-private-key"
   ```

### 3. Run Database Migration

```bash
bash scripts/migrate-api.sh
```

This creates:
- `gsc_properties` - GSC website properties
- `gsc_search_analytics` - Search performance data
- `ga_properties` - GA4 properties
- `ga_page_analytics` - Page performance data
- `keyword_opportunities` - AI recommendations

### 4. Setup Daily Import

Add to crontab:
```bash
crontab -e

# Add this line (runs at 2 AM daily):
0 2 * * * /path/to/wanda-central/scripts/daily-import.sh >> /var/log/wanda-import.log 2>&1
```

Or use GitHub Actions (see `.github/workflows/daily-import.yml`)

### 5. Start API Server

```bash
export WANDA_API_KEY="your-secure-api-key-here"
cd api
npm install
npm start
```

API runs on http://localhost:3001

## 🚀 Usage

### Import GSC Data (Manual)

```bash
# Via MCP
node mcp-servers/gsc/index.js

# Or via API
curl -X POST http://localhost:3001/api/gsc/sync \
  -H "x-api-key: YOUR_KEY" \
  -H "Content-Type: application/json" \
  -d '{"project_id": "your-project-uuid"}'
```

### Query Keyword Opportunities

```bash
curl -H "x-api-key: YOUR_KEY" \
  http://localhost:3001/api/keywords/PROJECT_ID?min_score=100
```

Response:
```json
{
  "success": true,
  "count": 25,
  "keywords": [
    {
      "keyword": "example keyword",
      "current_position": 8.5,
      "current_clicks": 45,
      "potential_clicks": 180,
      "opportunity_score": 250,
      "recommendation": "Optimize content - high impressions, needs better content"
    }
  ]
}
```

### Get Top Keywords

```bash
curl -H "x-api-key: YOUR_KEY" \
  "http://localhost:3001/api/gsc/PROJECT_ID/top-keywords?days=30&limit=50"
```

### AI Recommendations

```bash
curl -H "x-api-key: YOUR_KEY" \
  http://localhost:3001/api/recommendations/PROJECT_ID
```

## 📊 MCP Tools for AI Agents

When using Wanda with AI assistants:

1. **gsc_import_data** - Import fresh GSC data
2. **gsc_query_keywords** - Query keyword performance
3. **gsc_keyword_opportunities** - Find optimization targets
4. **gsc_top_pages** - Get top performing pages

Example prompts:
- "Import last 7 days of GSC data for example.com"
- "Show me keyword opportunities for project X"
- "What are the top pages by traffic?"
- "Which keywords should we optimize next?"

## 🔄 Automation Flow

```
Daily 2 AM
    ↓
Import GSC data (all enabled properties)
    ↓
Import GA data (all enabled properties)
    ↓
Calculate opportunity scores
    ↓
Update keyword_opportunities table
    ↓
Available via API for websites
```

## 🌐 Website Integration

Your websites can now query Wanda API for:

1. **Current keyword performance**
2. **Optimization recommendations**
3. **Content gaps**
4. **Traffic trends**

Example integration:
```javascript
// In your website's admin panel
fetch('https://wanda-central.vercel.app/api/keywords/PROJECT_ID', {
  headers: { 'x-api-key': 'YOUR_KEY' }
})
.then(r => r.json())
.then(data => {
  // Show keyword opportunities in dashboard
  console.log('Top opportunities:', data.keywords);
});
```

## 📁 File Structure

```
wanda-central/
├── mcp-servers/
│   ├── gsc/
│   │   ├── index.js          # MCP server
│   │   └── package.json
│   └── ga/
│       ├── index.js          # GA MCP server
│       └── package.json
├── api/
│   └── index.js              # REST API server
├── scripts/
│   ├── daily-import.sh       # Cron job
│   └── migrate-api.sh        # Database migration
└── supabase/migrations/
    ├── *_gsc_ga_integration.sql   # Tables
    └── *_gsc_functions.sql        # SQL functions
```

## 🔐 Security

- ✅ API key authentication on all endpoints
- ✅ Service role keys for Supabase (server-side only)
- ✅ OAuth tokens stored in environment variables
- ✅ No credentials in code or git

## 📝 Notes

- **Always use `migrate-api.sh`** for database changes (NOT Supabase CLI)
- Daily imports run automatically via cron
- API rate limits: GSC = 1000 calls/day, GA = 25000 calls/day
- Data refreshes daily, query from database for instant results

## 🎯 Roadmap

- [ ] Competitor keyword analysis
- [ ] Content gap detection
- [ ] Automated content recommendations
- [ ] Backlink opportunity detection
- [ ] Integration with GCTR campaigns
- [ ] Real-time keyword tracking

## 🆘 Troubleshooting

**Import fails:**
- Check OAuth tokens are valid
- Verify GSC/GA property access
- Check API quotas

**API returns 401:**
- Verify `x-api-key` header
- Check `WANDA_API_KEY` environment variable

**No data returned:**
- Run manual import first
- Check `gsc_properties.sync_enabled = true`
- Verify project has GSC property linked

---

**Ready to optimize! 🚀**
