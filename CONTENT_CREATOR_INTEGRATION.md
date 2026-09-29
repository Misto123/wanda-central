# Content Creator API Integration

## 🚀 Overview

Wanda Central now integrates with the Content Creator API to generate AI-powered articles for connected websites.

## 🔑 API Key

```
hfc_2x8RueOc4ptHsJaAuaCbHbyJU2X9RzP4
```

**Daily Quota:** 200 requests per day

## 📡 Endpoint

```
POST https://uyrkcolmisxsmnzfsghr.supabase.co/functions/v1/public-api
```

## 🏗️ Architecture

### Database Tables

**content_requests**
- Tracks all content generation requests
- Fields: website_domain, main_keyword, status, request_id, remaining_quota
- Indexed by website_domain and created_at

**generated_content**
- Stores the generated article data
- Fields: title, meta_description, h1, intro, sections, faqs, schemas
- Linked to content_requests via foreign key

**website_quota_usage**
- Monitors daily usage per domain
- Fields: website_domain, date, requests_count, remaining_quota
- Unique constraint on (website_domain, date)

### API Endpoints

**POST /api/content/generate**
Generate a new article for a website.

Request:
```json
{
  "website_domain": "example.com",
  "main_keyword": "best coffee makers",
  "secondary_keywords": ["drip", "espresso"],
  "language": "English",
  "article_length_words": 600,
  "tone": "conversational",
  "project_id": "uuid-here"
}
```

Response:
```json
{
  "success": true,
  "request_id": "uuid",
  "remaining_quota": 199,
  "execution_time_ms": 8421,
  "content": {
    "meta": { "title": "...", "description": "...", "slug": "..." },
    "content": { "h1": "...", "intro": "...", "sections": [...] },
    "faqs": [...],
    "schema": { "article_jsonld": "...", "faq_jsonld": "..." }
  }
}
```

**GET /api/content/stats?website_domain=example.com**
Get content generation statistics for a website.

Response:
```json
{
  "success": true,
  "website_domain": "example.com",
  "period_days": 30,
  "stats": {
    "total_requests": 42,
    "completed_requests": 40,
    "pending_requests": 2,
    "avg_execution_time_ms": 8234,
    "total_words_generated": 25200
  }
}
```

## 💻 Dashboard Features

**Content Tab:**
- Real-time request monitoring
- Website domain list
- Quota usage tracking
- Request history
- API configuration display

**Metrics:**
- Total requests counter
- Remaining quota display
- Connected websites count

**Integration Panel:**
- Shows Content Creator API status
- Displays remaining quota
- API endpoint information

## 🔄 Request Flow

1. **Website makes request** → POST /api/content/generate
2. **Wanda creates record** → content_requests table
3. **Call Content Creator API** → Generate article
4. **Store result** → generated_content table
5. **Update quota** → website_quota_usage table
6. **Return to website** → Full article data

## 📊 Tracking Features

### Per Website

- Total requests made
- Completed vs pending
- Average generation time
- Total words generated
- Daily quota usage

### Global

- All website domains listed
- Total API calls
- Quota consumption rate
- Request success rate

## 🎯 Use Cases

1. **Blog automation** - Websites auto-generate articles
2. **Content at scale** - Multiple sites sharing quota
3. **SEO content** - Optimized articles with schemas
4. **Multi-language** - Generate in any language

## 🛡️ Security

- API key stored server-side only
- Not exposed in client code
- Request validation
- Domain tracking for audit
- Quota enforcement

## 📈 Monitoring

**Dashboard shows:**
- Which websites are requesting content
- When requests are made
- Success/failure rates
- Quota consumption trends

**Logs track:**
- Every request with request_id
- Execution times
- Error messages
- Quota changes

## 🔧 Configuration

**Environment Variables:**
```bash
CONTENT_CREATOR_API_KEY=hfc_2x8RueOc4ptHsJaAuaCbHbyJU2X9RzP4
```

**Timeout:**
- 90 seconds (API can take 10-60 seconds)

**Retry Logic:**
- 429 (quota exceeded): Wait until next day
- 500 (server error): Retry twice with backoff
- 400/401 (client error): Don't retry

## 📝 Example Usage

```javascript
// Website calls Wanda API
const response = await fetch('https://wanda-central.vercel.app/api/content/generate', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': 'website-specific-key'
  },
  body: JSON.stringify({
    website_domain: 'myblog.com',
    main_keyword: 'best laptops 2026',
    article_length_words: 800,
    tone: 'authoritative'
  })
});

const { content } = await response.json();
// Use content.meta.title, content.content.sections, etc.
```

## 🎨 Dashboard UI

- **Light theme** (default)
- Clean, professional design
- Real-time updates
- Website list with stats
- Quota visualization

## 🚦 Status

- ✅ API integrated
- ✅ Database schema deployed
- ✅ Dashboard UI live
- ✅ Tracking active
- ✅ Ready for production use

**View Dashboard:** https://wanda-central.vercel.app → Content tab
