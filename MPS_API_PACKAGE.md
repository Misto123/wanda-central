# 🚀 Marketplace Studio API Integration Package
## Start Generating Articles Now!

---

## 🔑 YOUR API KEY

```
hfc_2x8RueOc4ptHsJaAuaCbHbyJU2X9RzP4
```

**Copy this key** - You'll need it for every request.

---

## 📡 API ENDPOINT

```
POST https://wanda-central.vercel.app/api/content/generate
```

---

## ⚡ QUICK START - Generate Your First Article

### Copy-Paste This Code:

```javascript
// Generate article for Marketplace Studio
const response = await fetch('https://wanda-central.vercel.app/api/content/generate', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    website_domain: 'marketplacestudio.nl',
    main_keyword: 'marketplace solutions',
    enable_no_ai_slop: true,
    enable_seo_optimization: true
  })
});

const article = await response.json();
console.log(article.content.meta.title);
console.log(article.content.content.h1);
```

---

## 📝 FULL EXAMPLE - With All Features

```javascript
// Full-featured article generation
const generateArticle = async (keyword) => {
  const response = await fetch('https://wanda-central.vercel.app/api/content/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      // REQUIRED
      website_domain: 'marketplacestudio.nl',
      main_keyword: keyword,
      
      // OPTIONAL - Add more keywords
      secondary_keywords: [
        'online marketplace',
        'e-commerce platform',
        'digital marketplace'
      ],
      
      // CONTENT SETTINGS
      language: 'English',
      article_length_words: 800,
      paragraph_count: 4,
      tone: 'professional',
      search_intent: 'commercial',
      audience_level: 'intermediate',
      
      // ADD REAL DATA & STATISTICS
      enable_first_hand_experience: true,
      first_hand_experience: `
        We've helped 150+ businesses build their marketplaces:
        - Average setup time: 14 days
        - Transaction processing: 99.9% uptime
        - Client satisfaction: 4.8/5 stars
        - Cost savings: 40% compared to custom development
      `,
      
      // QUALITY FEATURES (HIGHLY RECOMMENDED)
      enable_no_ai_slop: true,           // Removes 20+ AI patterns
      enable_enhanced_humanizer: true,   // Google AI Overviews style
      enable_seo_optimization: true,     // LSI terms + PAA questions
      enable_post_processing: true,      // Natural language polish
      include_seo_insights: true,        // Get related keywords
      
      // ADVANCED
      temperature: 0.7,
      max_tokens: 4000
    })
  });

  return await response.json();
};

// USE IT
const article = await generateArticle('marketplace software');
```

---

## 📊 RESPONSE FORMAT

```json
{
  "success": true,
  "request_id": "550e8400-e29b-41d4-a716-446655440000",
  "remaining_quota": 199,
  "execution_time_ms": 12450,
  "content": {
    "meta": {
      "title": "Best Marketplace Software 2026: Complete Guide",
      "description": "Discover top marketplace platforms. Compare features, pricing, and find the perfect solution for your business.",
      "slug": "best-marketplace-software-2026"
    },
    "content": {
      "h1": "Best Marketplace Software 2026",
      "intro": "Building a successful online marketplace requires...",
      "sections": [
        {
          "heading": "Top 5 Marketplace Platforms",
          "body": "**1. Sharetribe**\n\nSharetribe offers a no-code solution..."
        },
        {
          "heading": "How to Choose the Right Platform",
          "body": "Consider these key factors when selecting..."
        }
      ],
      "cta": "Ready to launch your marketplace? Contact us for a free consultation."
    },
    "faqs": [
      {
        "question": "What is marketplace software?",
        "answer": "Marketplace software is a platform that connects buyers and sellers..."
      }
    ],
    "schema": {
      "article_jsonld": "{\"@context\":\"https://schema.org\",\"@type\":\"Article\"...}",
      "faq_jsonld": "{\"@context\":\"https://schema.org\",\"@type\":\"FAQPage\"...}"
    },
    "seo_insights": {
      "relatedTerms": [
        "multi-vendor platform",
        "peer-to-peer marketplace",
        "marketplace builder"
      ],
      "questions": [
        "How much does marketplace software cost?",
        "What features should a marketplace have?"
      ],
      "boldedKeywords": [
        "marketplace software",
        "online marketplace",
        "marketplace platform"
      ]
    }
  }
}
```

---

## 🎯 HOW TO USE THE RESPONSE

### 1. Extract Content

```javascript
const { content } = article;

// Meta tags
const title = content.meta.title;
const description = content.meta.description;
const slug = content.meta.slug;

// Main content
const h1 = content.content.h1;
const intro = content.content.intro;
const sections = content.content.sections;
const cta = content.content.cta;

// SEO data
const faqs = content.faqs;
const articleSchema = content.schema.article_jsonld;
const faqSchema = content.schema.faq_jsonld;
```

### 2. Render as HTML

```javascript
// Convert Markdown to HTML (sections use Markdown)
import { marked } from 'marked';

const html = `
<!DOCTYPE html>
<html>
<head>
  <title>${content.meta.title}</title>
  <meta name="description" content="${content.meta.description}">
  
  <!-- Article Schema -->
  <script type="application/ld+json">
    ${content.schema.article_jsonld}
  </script>
  
  <!-- FAQ Schema -->
  <script type="application/ld+json">
    ${content.schema.faq_jsonld}
  </script>
</head>
<body>
  <article>
    <h1>${content.content.h1}</h1>
    
    <div class="intro">
      ${marked(content.content.intro)}
    </div>
    
    ${content.content.sections.map(section => `
      <section>
        <h2>${section.heading}</h2>
        <div>${marked(section.body)}</div>
      </section>
    `).join('')}
    
    ${content.content.cta ? `
      <div class="cta">
        ${marked(content.content.cta)}
      </div>
    ` : ''}
  </article>
  
  <section class="faqs">
    <h2>Frequently Asked Questions</h2>
    ${content.faqs.map(faq => `
      <div class="faq">
        <h3>${faq.question}</h3>
        <div>${marked(faq.answer)}</div>
      </div>
    `).join('')}
  </section>
</body>
</html>
`;
```

### 3. Use SEO Insights

```javascript
// Get related terms for internal linking
const relatedTerms = content.seo_insights.relatedTerms;
// ["multi-vendor platform", "peer-to-peer marketplace", ...]

// Get questions for FAQ expansion
const questions = content.seo_insights.questions;
// ["How much does marketplace software cost?", ...]

// Get keywords to bold in text
const keywords = content.seo_insights.boldedKeywords;
// ["marketplace software", "online marketplace", ...]
```

---

## 📊 RATE LIMITS

- **200 requests per day**
- Shared across all domains using this API key
- Resets at midnight UTC
- Check `remaining_quota` in each response

---

## 🔧 ERROR HANDLING

```javascript
async function generateArticleSafe(keyword) {
  try {
    const response = await fetch('https://wanda-central.vercel.app/api/content/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        website_domain: 'marketplacestudio.nl',
        main_keyword: keyword,
        enable_no_ai_slop: true
      }),
      signal: AbortSignal.timeout(90000) // 90 second timeout
    });

    const data = await response.json();

    if (!response.ok) {
      if (response.status === 429) {
        throw new Error('Daily quota exceeded. Try again tomorrow.');
      }
      throw new Error(data.error || 'Generation failed');
    }

    return data;

  } catch (error) {
    console.error('Error generating article:', error.message);
    throw error;
  }
}
```

---

## 🎨 EXAMPLE USE CASES

### 1. Generate Blog Post

```javascript
const blogPost = await generateArticle('how to build a marketplace');
// Use for: Blog articles, guides, tutorials
```

### 2. Generate Product Page

```javascript
const productPage = await fetch('https://wanda-central.vercel.app/api/content/generate', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    website_domain: 'marketplacestudio.nl',
    main_keyword: 'marketplace studio features',
    secondary_keywords: ['pricing', 'integrations', 'support'],
    tone: 'professional',
    search_intent: 'commercial',
    enable_no_ai_slop: true
  })
});
```

### 3. Generate SEO Landing Page

```javascript
const landingPage = await fetch('https://wanda-central.vercel.app/api/content/generate', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    website_domain: 'marketplacestudio.nl',
    main_keyword: 'best marketplace platform',
    secondary_keywords: ['sharetribe alternative', 'marketplace software'],
    article_length_words: 1200,
    enable_seo_optimization: true,
    enable_first_hand_experience: true,
    first_hand_experience: 'Our platform powers 150+ marketplaces with 99.9% uptime',
    include_seo_insights: true
  })
});
```

---

## 🔐 SECURITY BEST PRACTICES

1. **Store API key server-side only**
   - Never expose in client-side JavaScript
   - Use environment variables

2. **Use in backend API routes**
   ```javascript
   // ❌ Don't do this (client-side)
   // fetch('https://wanda-central.vercel.app/api/content/generate', ...)
   
   // ✅ Do this (server-side)
   // /api/generate-content.js
   export default async function handler(req, res) {
     const article = await fetch('https://wanda-central.vercel.app/api/content/generate', {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify({
         website_domain: 'marketplacestudio.nl',
         main_keyword: req.body.keyword
       })
     });
     res.json(await article.json());
   }
   ```

3. **Monitor usage**
   - Track `remaining_quota` in responses
   - Set up alerts when quota is low

---

## 📞 SUPPORT

**Dashboard:** https://wanda-central.vercel.app/app  
**GitHub:** https://github.com/Misto123/wanda-central

Include `request_id` from responses when reporting issues.

---

## 🚀 START NOW!

### Test the API Right Now:

```bash
curl -X POST https://wanda-central.vercel.app/api/content/generate \
  -H "Content-Type: application/json" \
  -d '{
    "website_domain": "marketplacestudio.nl",
    "main_keyword": "marketplace software",
    "enable_no_ai_slop": true,
    "enable_seo_optimization": true
  }'
```

### Or use this JavaScript snippet:

```javascript
fetch('https://wanda-central.vercel.app/api/content/generate', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    website_domain: 'marketplacestudio.nl',
    main_keyword: 'marketplace software',
    enable_no_ai_slop: true,
    enable_seo_optimization: true
  })
})
.then(r => r.json())
.then(data => console.log(data.content.meta.title));
```

---

## ✅ CHECKLIST FOR MPS

- [ ] Save API key: `hfc_2x8RueOc4ptHsJaAuaCbHbyJU2X9RzP4`
- [ ] Test with curl or JavaScript
- [ ] Integrate into your backend
- [ ] Set up error handling
- [ ] Monitor daily quota usage
- [ ] Start generating articles!

---

**🎉 YOU'RE READY TO GENERATE CONTENT FOR MARKETPLACESTUDIO.NL!**

**Endpoint:** `https://wanda-central.vercel.app/api/content/generate`  
**Key:** `hfc_2x8RueOc4ptHsJaAuaCbHbyJU2X9RzP4`  
**Quota:** 200 requests/day

**Start generating articles now!** 🚀
