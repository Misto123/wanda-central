# 📘 Wanda Central Content Creator API - Blog Integration Guide

## 🚀 Quick Start

Generate AI-powered articles for your blog with SEO optimization, statistics, human experiences, and keyword targeting.

---

## 🔑 API Credentials

**Endpoint:**
```
POST https://wanda-central.vercel.app/api/content/generate
```

**Authentication:**
```
Content-Type: application/json
```

**Rate Limit:** 200 requests per day (shared across all your blogs)

---

## 📝 Basic Request

### Minimum Required Fields

```javascript
const response = await fetch('https://wanda-central.vercel.app/api/content/generate', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    website_domain: 'yourblog.com',           // Required: Your blog domain
    main_keyword: 'best coffee makers 2026',  // Required: Primary keyword
  })
});

const data = await response.json();
console.log(data.content);
```

---

## 🎯 Complete Request Options

### All Available Parameters

```javascript
{
  // REQUIRED FIELDS
  "website_domain": "yourblog.com",
  "main_keyword": "best coffee makers 2026",
  
  // KEYWORDS & TARGETING
  "secondary_keywords": [
    "drip coffee maker",
    "espresso machine",
    "automatic coffee maker"
  ],
  "search_intent": "commercial",  // "informational" | "commercial" | "mixed"
  
  // CONTENT SETTINGS
  "language": "English",          // Any language name
  "article_length_words": 800,    // 300 to 900
  "paragraph_count": 4,           // 2 to 4
  "tone": "conversational",       // "conversational" | "authoritative" | "neutral" | "persuasive"
  "audience_level": "intermediate", // "beginner" | "intermediate" | "expert"
  
  // CONTENT MODES (select multiple)
  "content_mode": [
    "humanizer",              // Removes AI patterns
    "sales_architecture",     // Adds persuasive structure
    "quality_optimization"    // Enhances readability
  ],
  
  // BRAND VOICE
  "brand_voice_notes": "Write in a friendly, helpful tone. Use short sentences. Include practical tips.",
  
  // HUMAN EXPERIENCE & E-E-A-T
  "enable_first_hand_experience": true,
  "first_hand_experience": "I've personally tested 15 coffee makers over the past 3 years. The Breville Precision Brewer consistently produces the best-tasting coffee with minimal cleanup. I use it daily for both single cups and full pots.",
  
  // ADVANCED FEATURES
  "enable_no_ai_slop": true,          // Removes 20+ AI writing patterns (RECOMMENDED)
  "enable_enhanced_humanizer": true,  // Factual consensus style for AI Overviews
  "enable_seo_optimization": true,    // Adds LSI terms & People Also Ask questions
  "enable_post_processing": true,     // Natural language pass (English only)
  "include_seo_insights": true,       // Returns related keywords & questions
  
  // REWRITE OPTIONS (instead of new content)
  "input_source": "new_content",      // "new_content" | "rewrite_article" | "scrape_url"
  "existing_content": "",             // Required when input_source = "rewrite_article"
  "source_url": "",                   // Required when input_source = "scrape_url"
  
  // ADVANCED PARAMETERS
  "temperature": 0.7,                 // 0 to 2 (creativity level)
  "max_tokens": 4000,                 // 500 to 8000
  
  // TRACKING (optional)
  "project_id": "uuid-here"           // Your Wanda Central project ID
}
```

---

## 📊 Response Format

### Success Response (200 OK)

```json
{
  "success": true,
  "request_id": "550e8400-e29b-41d4-a716-446655440000",
  "remaining_quota": 199,
  "execution_time_ms": 12450,
  "content": {
    "meta": {
      "title": "Best Coffee Makers 2026: Expert Reviews & Buying Guide",
      "description": "Discover the top 10 coffee makers of 2026. Expert-tested reviews, comparison charts, and buying tips to find your perfect brewer.",
      "slug": "best-coffee-makers-2026"
    },
    "content": {
      "h1": "Best Coffee Makers 2026: Complete Buying Guide",
      "intro": "Finding the perfect coffee maker can transform your morning routine...",
      "sections": [
        {
          "heading": "Top 5 Coffee Makers for 2026",
          "body": "**1. Breville Precision Brewer**\n\nThe Breville Precision Brewer stands out..."
        },
        {
          "heading": "How to Choose the Right Coffee Maker",
          "body": "Consider these key factors when shopping..."
        }
      ],
      "cta": "Ready to upgrade your morning coffee? Check out our top recommendation..."
    },
    "faqs": [
      {
        "question": "What is the best coffee maker for home use?",
        "answer": "The Breville Precision Brewer is our top pick for home use..."
      },
      {
        "question": "How much should I spend on a coffee maker?",
        "answer": "Quality coffee makers range from $50 to $300..."
      }
    ],
    "schema": {
      "article_jsonld": "{\"@context\":\"https://schema.org\",\"@type\":\"Article\"...}",
      "faq_jsonld": "{\"@context\":\"https://schema.org\",\"@type\":\"FAQPage\"...}"
    },
    "schema_hints": {
      "intent": "commercial",
      "content_type": "product_review"
    },
    "seo_insights": {
      "relatedTerms": [
        "coffee brewing methods",
        "single serve coffee maker",
        "programmable coffee maker"
      ],
      "questions": [
        "How do I clean my coffee maker?",
        "What's the difference between drip and pour over?"
      ],
      "boldedKeywords": [
        "best coffee makers",
        "drip coffee maker",
        "espresso machine"
      ]
    }
  }
}
```

### Error Responses

**400 Bad Request:**
```json
{
  "success": false,
  "error": "main_keyword is required",
  "validation_errors": [
    "main_keyword must be at least 2 characters"
  ]
}
```

**429 Too Many Requests:**
```json
{
  "success": false,
  "error": "Daily quota exceeded. Resets at midnight UTC."
}
```

**500 Server Error:**
```json
{
  "success": false,
  "error": "Content generation failed. Request ID: abc123"
}
```

---

## 💡 Usage Examples

### Example 1: Basic Article

```javascript
// Generate a simple informational article
const article = await generateArticle({
  website_domain: 'myblog.com',
  main_keyword: 'how to make cold brew coffee',
  article_length_words: 600,
  tone: 'conversational'
});

// Use the content
const html = `
  <article>
    <h1>${article.content.content.h1}</h1>
    <p>${article.content.content.intro}</p>
    ${article.content.content.sections.map(section => `
      <h2>${section.heading}</h2>
      <div>${markdownToHtml(section.body)}</div>
    `).join('')}
  </article>
`;
```

### Example 2: Product Review with Statistics

```javascript
// Generate product review with data and personal experience
const review = await generateArticle({
  website_domain: 'techblog.com',
  main_keyword: 'iPhone 15 Pro review',
  secondary_keywords: ['camera quality', 'battery life', 'performance'],
  search_intent: 'commercial',
  tone: 'authoritative',
  article_length_words: 900,
  
  // Add personal testing experience
  enable_first_hand_experience: true,
  first_hand_experience: `
    I tested the iPhone 15 Pro for 30 days with real-world usage:
    - Battery lasted average 14.5 hours (measured with AccuBattery)
    - Camera captured 1,200+ photos in various lighting conditions
    - Processing speed: 42% faster than iPhone 14 Pro in benchmark tests
    - 5G speeds averaged 340 Mbps download (tested on Verizon)
    - Dropped once from 4 feet onto concrete - no damage
  `,
  
  // Optimize for SEO
  enable_seo_optimization: true,
  enable_no_ai_slop: true,
  enable_enhanced_humanizer: true
});
```

### Example 3: Comparison Article with Numbers

```javascript
// Generate data-rich comparison article
const comparison = await generateArticle({
  website_domain: 'gadgets.com',
  main_keyword: 'best laptops under $1000',
  secondary_keywords: ['budget laptop', 'student laptop', 'work from home'],
  search_intent: 'commercial',
  tone: 'authoritative',
  article_length_words: 800,
  audience_level: 'intermediate',
  
  // Brand voice guidelines
  brand_voice_notes: `
    - Always include specific prices and specifications
    - Use comparison tables
    - Mention tested performance metrics
    - Include pros/cons lists
    - Add "Best for" recommendations
  `,
  
  // Add real test data
  enable_first_hand_experience: true,
  first_hand_experience: `
    Tested 8 laptops under $1000 for 2 weeks each:
    - Dell Inspiron 15: 11.2 hours battery (video playback test)
    - HP Pavilion: Rendered 4K video in 8 minutes 34 seconds
    - Lenovo IdeaPad: Scored 3,245 in Geekbench 5
    - ASUS VivoBook: Weight: 3.7 lbs, Thickness: 0.7 inches
    - Acer Aspire: Boot time: 12 seconds (from cold start)
  `,
  
  // Enable all quality features
  content_mode: ['humanizer', 'quality_optimization'],
  enable_seo_optimization: true,
  include_seo_insights: true
});

// Access the structured data
console.log(comparison.content.seo_insights.relatedTerms);
console.log(comparison.content.faqs);
```

### Example 4: Tutorial with Step-by-Step Instructions

```javascript
// Generate how-to guide with detailed steps
const tutorial = await generateArticle({
  website_domain: 'diyguide.com',
  main_keyword: 'how to build a raised garden bed',
  secondary_keywords: ['garden bed plans', 'wood garden bed', 'DIY gardening'],
  search_intent: 'informational',
  tone: 'conversational',
  paragraph_count: 4,
  article_length_words: 700,
  
  // Personal experience with specific details
  enable_first_hand_experience: true,
  first_hand_experience: `
    I built 3 raised garden beds last spring. Each bed:
    - Cost $67 in materials (8 cedar boards at $6.50 each, screws $14)
    - Took 2.5 hours to construct
    - Dimensions: 8 feet long × 4 feet wide × 12 inches deep
    - Yielded 45 lbs of tomatoes, 18 lbs of peppers in first season
    - Cedar lasted 4+ years without rot (vs pine which rotted in 18 months)
  `,
  
  brand_voice_notes: `
    - Use numbered steps
    - Include material quantities and costs
    - Add safety warnings where needed
    - Mention time requirements
    - Include beginner-friendly tips
  `
});
```

---

## 🎨 Rendering the Content

### Convert Markdown to HTML

The section bodies and FAQ answers use Markdown. Convert them:

```javascript
// Using a markdown library (e.g., marked, markdown-it)
import { marked } from 'marked';

function renderArticle(content) {
  return `
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
      
      ${content.faqs.length > 0 ? `
        <section class="faqs">
          <h2>Frequently Asked Questions</h2>
          ${content.faqs.map(faq => `
            <div class="faq-item">
              <h3>${faq.question}</h3>
              <div>${marked(faq.answer)}</div>
            </div>
          `).join('')}
        </section>
      ` : ''}
    </body>
    </html>
  `;
}
```

---

## 📈 SEO Optimization Tips

### Use the SEO Insights

```javascript
const { seo_insights } = response.content;

// 1. Add related terms to your content
const relatedTerms = seo_insights.relatedTerms;
// Use these in subheadings, alt text, and naturally in content

// 2. Answer common questions
const questions = seo_insights.questions;
// Create FAQ section or answer in content

// 3. Bold important keywords
const keywords = seo_insights.boldedKeywords;
// Highlight these in your HTML
```

### Implement Structured Data

```javascript
// Add JSON-LD schemas to your page <head>
<script type="application/ld+json">
  {content.schema.article_jsonld}
</script>

<script type="application/ld+json">
  {content.schema.faq_jsonld}
</script>
```

---

## 🔄 Error Handling & Retry Logic

```javascript
async function generateArticleWithRetry(params, maxRetries = 2) {
  let lastError;
  
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const response = await fetch('https://wanda-central.vercel.app/api/content/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
        signal: AbortSignal.timeout(90000), // 90 second timeout
      });
      
      const data = await response.json();
      
      if (response.status === 429) {
        // Quota exceeded - stop trying, wait until tomorrow
        throw new Error('Daily quota exceeded. Try again tomorrow.');
      }
      
      if (response.status === 400 || response.status === 401) {
        // Client error - don't retry
        throw new Error(data.error);
      }
      
      if (!response.ok) {
        // Server error - retry with exponential backoff
        if (attempt < maxRetries) {
          await sleep(1000 * Math.pow(2, attempt)); // 1s, 2s, 4s
          continue;
        }
        throw new Error(data.error || 'Generation failed');
      }
      
      return data;
      
    } catch (error) {
      lastError = error;
      if (attempt < maxRetries && error.message !== 'Daily quota exceeded') {
        await sleep(1000 * Math.pow(2, attempt));
        continue;
      }
    }
  }
  
  throw lastError;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
```

---

## 📊 Track Your Usage

### Monitor Quota

```javascript
// Each response includes remaining quota
const response = await generateArticle(params);
console.log('Remaining quota:', response.remaining_quota);

// Store the request_id for support
console.log('Request ID:', response.request_id);
```

### View in Wanda Central Dashboard

1. Go to https://wanda-central.vercel.app
2. Click "Content" tab
3. See your requests listed by domain
4. View quota usage and generation times

---

## 🎯 Best Practices

### 1. **Always Include First-Hand Experience**
```javascript
enable_first_hand_experience: true,
first_hand_experience: "Real data from your testing, usage, or research"
```
This adds E-E-A-T signals and makes content more credible.

### 2. **Use Specific Numbers and Statistics**
```javascript
first_hand_experience: `
  - Tested for 30 days
  - Battery lasted 14.5 hours average
  - Scored 3,245 in Geekbench
  - Cost $67 in materials
  - 45 lbs of tomatoes harvested
`
```

### 3. **Enable Quality Features**
```javascript
enable_no_ai_slop: true,           // Always recommended
enable_enhanced_humanizer: true,   // For Google AI Overviews
enable_seo_optimization: true,     // Adds LSI terms
enable_post_processing: true       // Natural language polish
```

### 4. **Set Clear Brand Voice**
```javascript
brand_voice_notes: `
  - Short sentences (under 20 words)
  - Use active voice
  - Include specific examples
  - Add data and numbers
  - Conversational but professional
`
```

### 5. **Match Intent to Content Type**
```javascript
// Informational: how-to, guides, tutorials
search_intent: 'informational'

// Commercial: reviews, comparisons, "best X"
search_intent: 'commercial'

// Mixed: comprehensive guides with recommendations
search_intent: 'mixed'
```

---

## 🚀 Integration Code Examples

### WordPress Integration

```php
<?php
function wanda_generate_article($keyword, $domain) {
    $response = wp_remote_post('https://wanda-central.vercel.app/api/content/generate', [
        'headers' => ['Content-Type' => 'application/json'],
        'body' => json_encode([
            'website_domain' => $domain,
            'main_keyword' => $keyword,
            'article_length_words' => 800,
            'enable_first_hand_experience' => true,
            'enable_no_ai_slop' => true,
        ]),
        'timeout' => 90,
    ]);
    
    if (is_wp_error($response)) {
        return ['error' => $response->get_error_message()];
    }
    
    return json_decode(wp_remote_retrieve_body($response), true);
}

// Create post from generated content
$article = wanda_generate_article('best coffee makers', 'myblog.com');

if ($article['success']) {
    $post_id = wp_insert_post([
        'post_title' => $article['content']['meta']['title'],
        'post_content' => render_wanda_content($article['content']),
        'post_status' => 'draft',
        'meta_input' => [
            'description' => $article['content']['meta']['description'],
        ]
    ]);
}
?>
```

### Node.js/Express Integration

```javascript
const express = require('express');
const app = express();

app.post('/generate-content', async (req, res) => {
  const { keyword } = req.body;
  
  try {
    const response = await fetch('https://wanda-central.vercel.app/api/content/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        website_domain: 'myblog.com',
        main_keyword: keyword,
        enable_no_ai_slop: true,
      })
    });
    
    const data = await response.json();
    res.json(data);
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
```

### Python Integration

```python
import requests

def generate_article(keyword, domain):
    response = requests.post(
        'https://wanda-central.vercel.app/api/content/generate',
        json={
            'website_domain': domain,
            'main_keyword': keyword,
            'article_length_words': 800,
            'enable_no_ai_slop': True,
            'enable_seo_optimization': True,
        },
        timeout=90
    )
    
    return response.json()

# Usage
article = generate_article('best coffee makers', 'myblog.com')

if article['success']:
    print(f"Title: {article['content']['meta']['title']}")
    print(f"Quota remaining: {article['remaining_quota']}")
```

---

## 📞 Support

**Dashboard:** https://wanda-central.vercel.app/content
**GitHub:** https://github.com/Misto123/wanda-central

For support, include the `request_id` from the response.

---

## 🎉 Ready to Start!

```javascript
// Your first API call
const firstArticle = await fetch('https://wanda-central.vercel.app/api/content/generate', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    website_domain: 'yourblog.com',
    main_keyword: 'your target keyword here',
    enable_first_hand_experience: true,
    first_hand_experience: 'Your real experience and data here',
    enable_no_ai_slop: true,
    enable_seo_optimization: true,
  })
});

const article = await firstArticle.json();
console.log('Article generated!', article.content.meta.title);
```

**Start generating high-quality, SEO-optimized content for your blog now!**
