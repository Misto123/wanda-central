# SVB 3.0 API Integration Guide

## Campaign Ready: n26promocode.com

**Status:** ⚠️ Awaiting SVB 3.0 API connection details

---

## 📋 Campaign Details

**Website:** n26promocode.com

**Keywords:**
- n26 promo code
- n26 referral code
- referral bonus n26
- Fallback: n26promocode.com

**Traffic Settings:**
- Visits per day: 2
- Distribution: Even throughout the day
- Source type: Organic search

---

## 🔌 What We Need from SVB 3.0 API

To connect and launch this campaign, please provide:

### 1. API Endpoint
```
POST https://[your-svb-api-endpoint]/campaigns
```

### 2. Authentication
```json
{
  "api_key": "your-svb-api-key",
  "api_secret": "your-svb-secret" (if needed)
}
```

### 3. Campaign Creation Payload
What format does SVB 3.0 expect? Example:
```json
{
  "domain": "n26promocode.com",
  "keywords": ["n26 promo code", "n26 referral code", "referral bonus n26"],
  "fallback_keyword": "n26promocode.com",
  "daily_visits": 2,
  "traffic_type": "organic"
}
```

### 4. Response Format
What does SVB 3.0 return? Example:
```json
{
  "campaign_id": "...",
  "status": "active",
  "daily_visits_remaining": 2,
  "keywords_tracked": 3
}
```

---

## ✅ Once Connected, Wanda Will Automatically:

### 1. Create SVB Campaign
- Send keywords to SVB 3.0 API
- Configure 2 visits/day
- Set organic traffic source
- Monitor campaign status

### 2. Generate SEO Content
```bash
Article: "N26 Promo Code 2026: Get Your Referral Bonus"
- Keyword-optimized content
- Conversion-focused CTAs
- Referral code instructions
- FAQ section
- JSON-LD schemas
```

### 3. Track Performance
- Daily visits from SVB
- Keyword ranking positions
- Conversion rates
- Referral sign-ups

### 4. Daily Reports
- Visits received: X/2
- Keywords ranking changes
- Traffic quality metrics
- Conversion tracking

---

## 🔧 Integration Steps

### Step 1: You Provide SVB API Details
Send us:
- ✅ API endpoint URL
- ✅ API key/authentication
- ✅ Campaign payload format
- ✅ Response structure
- ✅ Webhook URL (if available)

### Step 2: We Build SVB Adapter
```javascript
// adapters/svb/adapter.ts
export class SVBAdapter {
  async createCampaign(config: SVBCampaignConfig) {
    const response = await fetch(SVB_API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${SVB_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        domain: config.domain,
        keywords: config.keywords,
        daily_visits: config.visits_per_day,
        fallback_keyword: config.fallback
      })
    });
    
    return response.json();
  }
  
  async getCampaignStatus(campaign_id: string) {
    // Monitor campaign performance
  }
  
  async updateCampaign(campaign_id: string, updates: any) {
    // Modify campaign settings
  }
}
```

### Step 3: Launch Campaign
```bash
# Wanda creates the campaign
POST /api/campaigns/svb/create
{
  "website": "n26promocode.com",
  "keywords": ["n26 promo code", "n26 referral code", "referral bonus n26"],
  "fallback_keyword": "n26promocode.com",
  "visits_per_day": 2
}

# Response
{
  "success": true,
  "campaign_id": "svb_12345",
  "wanda_job_id": "job_67890",
  "status": "active",
  "daily_visits_scheduled": 2
}
```

### Step 4: Monitor in Dashboard
View in Wanda Central:
- Jobs tab: SVB campaign execution
- Content tab: Generated articles
- Projects tab: n26promocode.com metrics
- Integrations tab: SVB 3.0 health status

---

## 🎯 Alternative: Manual Setup + Wanda Tracking

If SVB 3.0 has a web interface:

### You Do:
1. Create campaign in SVB dashboard
2. Add keywords:
   - n26 promo code
   - n26 referral code
   - referral bonus n26
   - Fallback: n26promocode.com
3. Set 2 visits per day
4. Point to: n26promocode.com

### Wanda Tracks:
- Google Search Console → Keyword rankings
- Google Analytics → Traffic & conversions
- Content Creator → Generate landing page articles
- Dashboard → Unified view of all metrics

---

## 📝 Content Generation (Available Now)

We can generate content immediately while awaiting SVB connection:

```bash
POST https://wanda-central.vercel.app/api/content/generate
{
  "website_domain": "n26promocode.com",
  "main_keyword": "n26 promo code",
  "secondary_keywords": [
    "n26 referral code",
    "referral bonus n26",
    "n26 discount code",
    "n26 sign up bonus"
  ],
  "article_length_words": 800,
  "tone": "informational",
  "search_intent": "commercial",
  "audience_level": "beginner",
  
  "enable_first_hand_experience": true,
  "first_hand_experience": "N26 referral program offers €15 bonus. I tested the sign-up process and received my bonus within 3 business days after making 3 card transactions.",
  
  "enable_no_ai_slop": true,
  "enable_seo_optimization": true,
  "include_seo_insights": true
}
```

**Generated Article Will Include:**
- Title: "N26 Promo Code 2026: Get €15 Referral Bonus"
- Meta description optimized for CTR
- H1, intro, and sections
- FAQ about N26 referral codes
- CTA: Sign up with promo code
- JSON-LD schemas
- Related keywords from SEO insights

---

## 📊 Campaign Monitoring

Once SVB is connected, track in real-time:

**Daily Metrics:**
- Visits delivered: 2/2 ✅
- Keywords tracked: 3
- Average position: 5.2
- CTR: 3.4%
- Conversions: 0

**Weekly Trends:**
- Position changes per keyword
- Traffic quality score
- Bounce rate
- Time on site

**Monthly Reports:**
- Total visits: 60
- Keyword ranking improvements
- Conversion rate trends
- ROI analysis

---

## 🚀 Next Steps

### Option 1: Connect SVB 3.0 API ⭐ Recommended
**You provide:**
- API documentation
- Endpoint + credentials
- Payload format

**We deliver:**
- Full integration (2-4 hours)
- Campaign auto-launch
- Real-time monitoring
- Daily reporting

### Option 2: Manual SVB + Wanda Tracking
**You do:**
- Set up campaign in SVB interface

**We provide:**
- GSC/GA tracking
- Content generation
- Performance dashboard

### Option 3: Content First, Traffic Later
**Immediate:**
- Generate landing page content
- Set up GSC tracking
- Optimize for conversions

**Later:**
- Add SVB traffic when ready

---

## 📞 Contact

**To launch the n26promocode.com campaign:**

1. Share SVB 3.0 API details, or
2. Confirm manual setup in SVB dashboard, or
3. Request content generation first

**Campaign file:** `campaigns/n26promocode-campaign.json`

**Ready to go once connected!**
