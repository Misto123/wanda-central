# SVB 3.0 API Integration (QA Runner)
## Generate Google Visits & YouTube Traffic

**Base URL:** https://qa-runner-navy.vercel.app

---

## 🎯 What This API Does

1. **Google CTR Campaigns** - Generate organic Google search traffic
2. **YouTube Jobs** - One-time YouTube video engagement
3. **YouTube Schedules** - Recurring YouTube engagement
4. **Direct Traffic** - Direct URL visits
5. **Warmup Campaigns** - Profile warming

---

## 🔑 Authentication

**None required** - Open API (for now)

---

## 📊 Available Endpoints

### 1. Campaigns API (Google Traffic)
- `POST /api/campaigns` - Create GCTR campaign
- `GET /api/campaigns` - List all campaigns

### 2. YouTube Jobs API (One-Time)
- `POST /api/youtube/jobs` - Create YouTube job
- `GET /api/youtube/jobs` - List jobs

### 3. YouTube Schedules API (Recurring)
- `POST /api/youtube/schedules` - Create schedule
- `GET /api/youtube/schedules` - List schedules

### 4. Profiles API
- `GET /api/profiles?provider=adspower` - List browser profiles

---

## 🚀 QUICK START - N26 Campaign

### Create Google CTR Campaign for n26promocode.com

```bash
curl -X POST 'https://qa-runner-navy.vercel.app/api/campaigns' \
  -H "Content-Type: application/json; charset=utf-8" \
  -d '{
    "name": "N26 Promo Code Campaign",
    "campaignType": "gctr",
    "targetUrl": "n26promocode.com",
    "targetMode": "domain",
    "keywords": [
      {"keyword": "n26 promo code", "dailyClicks": 1},
      {"keyword": "n26 referral code", "dailyClicks": 1},
      {"keyword": "referral bonus n26", "dailyClicks": 1}
    ],
    "fallbackKeyword": "n26promocode.com",
    "provider": "adspower",
    "profileIds": ["profile1", "profile2"],
    "dailyVisits": 2,
    "durationDays": 90,
    "pogoStickingEnabled": true,
    "pogoSticking": {
      "minCompetitors": 1,
      "maxCompetitors": 2,
      "dwellTimeMin": 10,
      "dwellTimeMax": 30
    }
  }'
```

---

## 📝 Campaign Types

### 1. GCTR (Google CTR) - Organic Search Traffic
```json
{
  "campaignType": "gctr",
  "targetUrl": "example.com",
  "keywords": [
    {"keyword": "your keyword", "dailyClicks": 1}
  ],
  "pogoStickingEnabled": true
}
```

**Use for:** Improving Google rankings through CTR manipulation

### 2. GCTR Brand - Branded Search
```json
{
  "campaignType": "gctr-brand",
  "targetUrl": "example.com",
  "keywords": [
    {"keyword": "example brand", "dailyClicks": 2}
  ]
}
```

**Use for:** Branded keyword searches

### 3. Direct Traffic
```json
{
  "campaignType": "direct",
  "targetUrl": "example.com",
  "dailyVisits": 5
}
```

**Use for:** Direct URL visits (no search)

### 4. Warmup
```json
{
  "campaignType": "warmup",
  "targetUrl": "example.com",
  "dailyVisits": 10
}
```

**Use for:** Profile warming before main campaigns

---

## 🎬 YouTube Integration

### One-Time YouTube Job

```bash
curl -X POST 'https://qa-runner-navy.vercel.app/api/youtube/jobs' \
  -H "Content-Type: application/json" \
  -d '{
    "youtubeUrl": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    "keywords": "example,video,keywords",
    "discoveryMethod": "youtube-search",
    "provider": "adspower",
    "profileId": "profile-id",
    "action": "watch",
    "watchDuration": 60,
    "humanEmulation": true,
    "videoQuality": "360p",
    "engagementProfile": "natural"
  }'
```

### Discovery Methods
- `direct` - Navigate directly to URL
- `youtube-search` - Search on YouTube
- `google-serp` - Search on Google
- `sidebar` - Click from recommendations

### Actions
- `watch` - Watch only
- `like` - Like video
- `comment` - Leave comment

---

## 📅 Recurring YouTube Schedule

```bash
curl -X POST 'https://qa-runner-navy.vercel.app/api/youtube/schedules' \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Daily Video Views",
    "youtubeUrl": "https://www.youtube.com/watch?v=YOUR_VIDEO",
    "keywords": "your,keywords",
    "provider": "adspower",
    "profileIds": ["id1", "id2", "id3"],
    "action": "watch",
    "watchDuration": 60,
    "scheduleType": "daily",
    "spacingWindowHours": 4,
    "profileTimezone": "Europe/Amsterdam",
    "scheduleUntil": "2027-01-01T00:00:00Z",
    "isActive": true
  }'
```

---

## 💡 Integration with Wanda Central

### Wanda Central can now:

1. **Create campaigns automatically**
2. **Track campaign status**
3. **Monitor daily visits**
4. **Generate reports**
5. **Manage YouTube schedules**

### Example: Auto-create campaign when content is generated

```javascript
// Generate content for n26promocode.com
const article = await fetch('https://wanda-central.vercel.app/api/content/generate', {
  method: 'POST',
  body: JSON.stringify({
    website_domain: 'n26promocode.com',
    main_keyword: 'n26 promo code'
  })
});

// Auto-create traffic campaign
const campaign = await fetch('https://qa-runner-navy.vercel.app/api/campaigns', {
  method: 'POST',
  body: JSON.stringify({
    name: 'N26 Promo Code Campaign',
    campaignType: 'gctr',
    targetUrl: 'n26promocode.com',
    keywords: [
      {keyword: 'n26 promo code', dailyClicks: 1},
      {keyword: 'n26 referral code', dailyClicks: 1}
    ],
    fallbackKeyword: 'n26promocode.com',
    dailyVisits: 2,
    durationDays: 90
  })
});
```

---

## 🔄 Workflow Examples

### 1. Complete Blog Post + Traffic Campaign

```javascript
// Step 1: Generate SEO content
const content = await generateContent('n26 promo code');

// Step 2: Create traffic campaign
const campaign = await createCampaign({
  targetUrl: 'n26promocode.com',
  keywords: ['n26 promo code', 'n26 referral code'],
  dailyVisits: 2
});

// Step 3: Track in Wanda Central
console.log('Campaign ID:', campaign.id);
console.log('Content ID:', content.request_id);
```

### 2. YouTube Video Promotion

```javascript
// Upload video, then:
const schedule = await createYouTubeSchedule({
  youtubeUrl: 'https://youtube.com/watch?v=YOUR_VIDEO',
  keywords: 'marketplace,software,tutorial',
  action: 'watch',
  scheduleType: 'daily',
  profileIds: ['id1', 'id2', 'id3']
});
```

---

## 📊 Response Examples

### Campaign Created
```json
{
  "success": true,
  "campaign": {
    "id": "camp_abc123",
    "name": "N26 Promo Code Campaign",
    "status": "active",
    "dailyVisits": 2,
    "keywords": [
      {"keyword": "n26 promo code", "dailyClicks": 1}
    ]
  }
}
```

### YouTube Job Created
```json
{
  "success": true,
  "job": {
    "id": "job_xyz789",
    "youtubeUrl": "https://youtube.com/watch?v=...",
    "status": "pending",
    "scheduledFor": "2026-09-30T10:00:00Z"
  }
}
```

---

## 🎯 Use Cases

### 1. SEO Campaign
- Generate content with Wanda Central
- Create GCTR campaign with SVB 3.0
- Track rankings in GSC

### 2. Product Launch
- Create landing page content
- Set up direct traffic campaign
- Schedule YouTube promotion

### 3. Brand Building
- GCTR brand campaigns
- YouTube recurring schedules
- Content generation

---

## 🔗 Integration Points

### Wanda Central ↔ SVB 3.0

1. **Content Generation** → Auto-create traffic campaign
2. **GSC Data** → Adjust campaign keywords
3. **Job Tracking** → Monitor campaign performance
4. **Reporting** → Unified dashboard

---

## ⚠️ Important Notes

1. **Profile IDs required** - Get from `/api/profiles?provider=adspower`
2. **Timezone defaults** - Europe/Amsterdam (CET)
3. **Pogo sticking** - Visits competitors before target (recommended)
4. **Fallback keyword** - Used after 3+ keyword failures

---

## 📞 Support

**SVB 3.0 (QA Runner):** https://qa-runner-navy.vercel.app  
**Wanda Central:** https://wanda-central.vercel.app  
**Documentation:** This file

---

## ✅ Next Steps for N26 Campaign

1. Get AdsPower profile IDs:
   ```bash
   curl https://qa-runner-navy.vercel.app/api/profiles?provider=adspower
   ```

2. Create campaign:
   ```bash
   curl -X POST https://qa-runner-navy.vercel.app/api/campaigns \
     -H "Content-Type: application/json" \
     -d '{ ... }'
   ```

3. Monitor in Wanda Central dashboard

**Ready to launch N26 campaign!** 🚀
