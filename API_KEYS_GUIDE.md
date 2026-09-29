# 🔑 Wanda Central API Keys & Integration Guide
## For marketplacestudio.nl Implementation

---

## 🎯 Overview

Wanda Central provides 5 main API integrations. Each has its own API key and domain configuration.

---

## 1️⃣ Content Creator API

### What It Does
Generate SEO-optimized articles with statistics, human experiences, and multiple keywords.

### API Key
```
hfc_2x8RueOc4ptHsJaAuaCbHbyJU2X9RzP4
```

### Endpoint
```
POST https://wanda-central.vercel.app/api/content/generate
```

### Rate Limit
200 requests per day (shared across all domains)

### Domain Configuration
No domain restriction - works for any website. Specify your domain in the request:

```json
{
  "website_domain": "marketplacestudio.nl",
  "main_keyword": "your keyword here"
}
```

### Copy-Paste Integration
```javascript
// Content Creator API - Ready to use
const CONTENT_API = {
  endpoint: 'https://wanda-central.vercel.app/api/content/generate',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  domain: 'marketplacestudio.nl'
};

// Generate article
fetch(CONTENT_API.endpoint, {
  method: CONTENT_API.method,
  headers: CONTENT_API.headers,
  body: JSON.stringify({
    website_domain: CONTENT_API.domain,
    main_keyword: 'your keyword',
    enable_no_ai_slop: true
  })
});
```

---

## 2️⃣ Google Search Console & Analytics

### What It Does
Import GSC and GA data daily, track keyword rankings, find opportunities.

### Authentication
OAuth 2.0 (Google Sign-in)

### Setup Process
1. Click "Import GSC/GA Data" in Wanda Central
2. Enter project name: "marketplacestudio.nl"
3. Select "Google Search Console" and/or "Google Analytics"
4. **Sign in with Google account that owns the GSC property**
5. Grant permissions
6. Data syncs automatically at 2 AM daily

### API Endpoints
```
GET /api/gsc/:project_id/top-keywords
GET /api/keywords/:project_id
GET /api/recommendations/:project_id
```

### API Key
Use your Wanda Central session token (obtained after login)

### Domain Configuration
Configured during import wizard - select your GSC property for marketplacestudio.nl

### Copy-Paste Integration
```javascript
// GSC & GA API - After OAuth setup
const GSC_API = {
  baseUrl: 'https://wanda-central.vercel.app/api',
  projectId: 'your-project-id', // From import wizard
  
  async getTopKeywords() {
    return fetch(`${this.baseUrl}/gsc/${this.projectId}/top-keywords`);
  },
  
  async getRecommendations() {
    return fetch(`${this.baseUrl}/recommendations/${this.projectId}`);
  }
};
```

---

## 3️⃣ YouTube Integration

### What It Does
Track YouTube channel metrics, video performance, and growth trends.

### API Key
YouTube Data API v3 key (you provide your own)

### Setup
1. Go to Google Cloud Console
2. Create project
3. Enable YouTube Data API v3
4. Create credentials → API Key
5. Restrict key to YouTube Data API v3
6. Add in Wanda Central settings

### Endpoint
```
GET /api/youtube/:channel_id/stats
```

### Domain Configuration
API key restriction in Google Cloud Console

### Copy-Paste Integration
```javascript
// YouTube API
const YOUTUBE_API = {
  endpoint: 'https://wanda-central.vercel.app/api/youtube',
  channelId: 'your-channel-id',
  
  async getStats() {
    return fetch(`${this.endpoint}/${this.channelId}/stats`);
  }
};
```

---

## 4️⃣ Mentions Tracking

### What It Does
Monitor brand mentions across web, social media, and forums.

### API Key
Integration with mention tracking services (Brand24, Mention.com, etc.)

### Setup
1. Connect your mention tracking service
2. Add API key in Wanda Central
3. Configure keywords to track

### Endpoint
```
GET /api/mentions?domain=marketplacestudio.nl
```

### Copy-Paste Integration
```javascript
// Mentions API
const MENTIONS_API = {
  endpoint: 'https://wanda-central.vercel.app/api/mentions',
  domain: 'marketplacestudio.nl',
  
  async getMentions() {
    return fetch(`${this.endpoint}?domain=${this.domain}`);
  }
};
```

---

## 5️⃣ Google & Traffic (Remote Browser)

### What It Does
Automate browser sessions, generate organic traffic, execute actions.

### API Key
```
JTYDA_7531D_98HGTR_YT154
```

### Endpoint
```
POST http://65.21.199.228:3000/api/browser/start
```

### Domain Configuration
Specify target URL in each request

### Copy-Paste Integration
```javascript
// Remote Browser API
const BROWSER_API = {
  endpoint: 'http://65.21.199.228:3000/api/browser',
  apiKey: 'JTYDA_7531D_98HGTR_YT154',
  domain: 'https://marketplacestudio.nl',
  
  async startSession() {
    return fetch(`${this.endpoint}/start`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': this.apiKey
      },
      body: JSON.stringify({
        provider: 'puppeteer',
        url: this.domain
      })
    });
  }
};
```

---

## 📦 Complete Integration Package for marketplacestudio.nl

### All APIs in One Place
```javascript
// marketplacestudio.nl - Wanda Central Integration
const WandaCentral = {
  domain: 'marketplacestudio.nl',
  
  // 1. Content Creator
  content: {
    endpoint: 'https://wanda-central.vercel.app/api/content/generate',
    
    async generate(keyword) {
      return fetch(this.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          website_domain: WandaCentral.domain,
          main_keyword: keyword,
          enable_no_ai_slop: true,
          enable_seo_optimization: true
        })
      });
    }
  },
  
  // 2. GSC & GA
  gsc: {
    baseUrl: 'https://wanda-central.vercel.app/api',
    projectId: null, // Set after import wizard
    
    async getKeywords() {
      return fetch(`${this.baseUrl}/keywords/${this.projectId}`);
    }
  },
  
  // 3. YouTube
  youtube: {
    endpoint: 'https://wanda-central.vercel.app/api/youtube',
    channelId: null, // Your channel ID
    
    async getStats() {
      return fetch(`${this.endpoint}/${this.channelId}/stats`);
    }
  },
  
  // 4. Mentions
  mentions: {
    endpoint: 'https://wanda-central.vercel.app/api/mentions',
    
    async get() {
      return fetch(`${this.endpoint}?domain=${WandaCentral.domain}`);
    }
  },
  
  // 5. Browser Automation
  browser: {
    endpoint: 'http://65.21.199.228:3000/api/browser',
    apiKey: 'JTYDA_7531D_98HGTR_YT154',
    
    async start() {
      return fetch(`${this.endpoint}/start`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': this.apiKey
        },
        body: JSON.stringify({
          provider: 'puppeteer',
          url: `https://${WandaCentral.domain}`
        })
      });
    }
  }
};

// Usage Examples
await WandaCentral.content.generate('marketplace solutions');
await WandaCentral.gsc.getKeywords();
await WandaCentral.youtube.getStats();
await WandaCentral.mentions.get();
await WandaCentral.browser.start();
```

---

## 🔐 Security Best Practices

1. **Store API keys server-side only**
2. **Never expose keys in client-side code**
3. **Use environment variables**
4. **Rotate keys regularly**
5. **Monitor usage in Wanda Central dashboard**

---

## 📊 Rate Limits Summary

| API | Rate Limit | Quota Reset |
|-----|-----------|-------------|
| Content Creator | 200/day | Midnight UTC |
| GSC & GA | Unlimited | - |
| YouTube | 10,000 units/day | Google quota |
| Mentions | Varies by service | Service-dependent |
| Browser | Unlimited | - |

---

## 🚀 Quick Start for marketplacestudio.nl

1. Copy the complete integration package above
2. Replace `WandaCentral.domain` with your domain
3. Set `gsc.projectId` after running import wizard
4. Set `youtube.channelId` if using YouTube
5. Store all code server-side
6. Monitor in Wanda Central dashboard

**All APIs are ready to use immediately!**
