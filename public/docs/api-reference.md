# Wanda Central API Reference

## Content Generation API

### Endpoint
```
POST https://wanda-central.vercel.app/api/content/generate
```

### Brand-Specific Content Generation

This API uses a comprehensive brand-specific content strategy system designed for marketplace seller blogs. It follows a rigorous workflow for creating credible, SEO-optimized articles.

### Supported Brands

1. **Marketplacestudio** (marketplacestudio.nl) - Dutch Bol seller content
2. **OtGeeks** (otgeeks.org) - English OTTO seller content  
3. **HomeGeeks** (homegeeks.org) - Multi-marketplace seller content
4. **Kaufrank** (kaufrank.com) - English Kaufland seller content
5. **EtsyGeeks** (etsygeeks.org) - English Etsy seller content

### Request Format

```typescript
{
  // REQUIRED
  "brand": "Marketplacestudio" | "OtGeeks" | "HomeGeeks" | "Kaufrank" | "EtsyGeeks",
  "keywords": {
    "main_keyword": "your primary keyword",
    "secondary_keywords": ["keyword 2", "keyword 3"] // optional
  },
  "proposed_title": "Your Article Title",
  
  // OPTIONAL
  "marketplace": "Home24", // Required for HomeGeeks, optional for others
  "target_market": "DE", // e.g., "DE", "UK", "US"
  "publication_language": "nl", // Default varies by brand
  "existing_articles": ["url1", "url2"], // For internal linking
  "specific_cta": "https://...", // Custom CTA destination
  "article_length_words": 1800, // Default 1800, range 800-2300
  
  // IMAGE GENERATION
  "enable_images": true, // Default true
  "image_generation_method": "dalle3" | "placeholders", // Default "dalle3"
  "images_per_article": 3 // Default 3, range 2-5
}
```

### Response Format

```typescript
{
  "success": true,
  "content": {
    "title": "Final article title",
    "meta_description": "SEO meta description (150-160 chars)",
    "slug": "url-friendly-slug",
    "excerpt": "1-2 sentence excerpt",
    "h1": "Main H1 heading",
    "sections": [
      {
        "h2": "Section heading",
        "content": "<p>HTML content...</p>",
        "subsections": [
          {
            "h3": "Subsection heading",
            "content": "<p>HTML content...</p>"
          }
        ]
      }
    ],
    "faqs": [
      {
        "question": "FAQ question text",
        "answer": "FAQ answer text"
      }
    ],
    "images": [
      {
        "position": "after_intro" | "after_section_1" | "after_section_2" | "before_cta",
        "alt_text": "Descriptive alt text",
        "caption": "Image caption text",
        "image_url": "https://oaidalleapiprodscus.blob.core.windows.net/...", // DALL-E 3 URL
        "dalle3_prompt": "Prompt used to generate this image"
      }
    ],
    "cta_html": "<div style=\"...\">CTA block HTML</div>",
    "json_ld_article": {
      "@context": "https://schema.org",
      "@type": "Article",
      ...
    },
    "json_ld_faq": {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      ...
    }
  },
  "metadata": {
    "brand": "Marketplacestudio",
    "marketplace": "Bol",
    "keyword": "your keyword",
    "language": "nl",
    "word_count": 1850,
    "images_generated": true,
    "image_method": "dalle3"
  }
}
```

### Image Generation

#### DALL-E 3 (Recommended - Best Value)

**Cost:** ~$0.04 per image (standard quality, 1792x1024)  
**Quality:** Professional, AI-generated illustrations  
**Speed:** 5-10 seconds per image  

```json
{
  "enable_images": true,
  "image_generation_method": "dalle3",
  "images_per_article": 3
}
```

Images are automatically generated using brand-specific prompts and returned as `image_url` fields.

#### Placeholders (Free Alternative)

```json
{
  "enable_images": true,
  "image_generation_method": "placeholders",
  "images_per_article": 3
}
```

Returns placeholder URLs and DALL-E prompts. You can:
1. Use placeholders initially
2. Generate images manually later using the provided `dalle3_prompt`
3. Replace placeholders with real images

### Brand-Specific Rules

#### Marketplacestudio (Dutch Bol Content)
- **Language:** Dutch by default
- **Colors:** #1E6BFF (blue), #FF7A00 (orange)
- **HTML:** NO `<ul>` or `<li>` tags (editor limitation)
- Use bullet characters (•) with `<br>` instead
- URLs: rank tracker, pricing, product descriptions
- Terms: "BOL verkopers", "zoekwoorden", "organische positie"

#### OtGeeks (English OTTO Content)
- **Language:** English
- **Marketplace:** OTTO (Germany)
- Distinguish "Sponsored" vs "Normale Suchergebnisse"
- Use correct German search terms in examples
- No official OTTO affiliation claims

#### HomeGeeks (Multi-Marketplace Content)
- **Language:** English
- **Color:** #F97015 (orange accent)
- **Marketplaces:** Home24, ManoMano, Cdiscount, Darty, XXXLutz, OBI, eMAG, etc.
- Focus on ONE marketplace per article
- Marketplace-specific seller controls (e.g., Home24 title restrictions)

#### Kaufrank (English Kaufland Content)
- **Language:** English
- **Colors:** #EE792B (orange), #0F1729 (dark navy)
- **Marketplace:** Kaufland (Germany)
- Accurate German terms and examples
- URLs: rank tracker, pricing

#### EtsyGeeks (English Etsy Content)
- **Language:** English
- **Marketplace:** Etsy
- Specify search market (US, UK, etc.)
- Distinguish unpaid search vs Etsy Ads
- Use current Etsy seller documentation

### Content Quality Rules

✅ **DO:**
- Focus on practical seller advice
- Write 2-4 sentence paragraphs
- Distinguish organic vs paid placements
- Use official marketplace documentation
- Include relevant internal links (existing articles)
- Add CTAs naturally before conclusion
- Provide factual, verifiable information

❌ **DON'T:**
- Promise sales, revenue, or specific results
- Claim official marketplace relationships
- Invent statistics or conversion data
- Use keyword stuffing or AI clichés
- Add marketplace logos without permission
- Use decorative dashes or excessive punctuation
- Create fake screenshots or interfaces

### Rate Limits

- **200 requests per day** per API key
- **Max article length:** 2,300 words
- **Images:** 2-5 per article

### Error Responses

```json
{
  "success": false,
  "error": "Error message description"
}
```

Common errors:
- Missing required fields (`brand`, `keywords`, `proposed_title`)
- Invalid brand name
- Article length out of range (50-2300 words)
- Image generation failure (falls back to placeholders)
- Rate limit exceeded

### Example cURL Request

```bash
curl -X POST https://wanda-central.vercel.app/api/content/generate \
  -H "Content-Type: application/json" \
  -d '{
    "brand": "Marketplacestudio",
    "keywords": {
      "main_keyword": "Bol SEO",
      "secondary_keywords": ["Bol ranking", "product optimization"]
    },
    "proposed_title": "Bol SEO Gids 2026: Verhoog Je Organische Vindbaarheid",
    "publication_language": "nl",
    "article_length_words": 1800,
    "enable_images": true,
    "image_generation_method": "dalle3",
    "images_per_article": 3
  }'
```

### Integration Example (TypeScript/Lovable)

```typescript
const response = await fetch('https://wanda-central.vercel.app/api/content/generate', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    brand: 'Marketplacestudio',
    keywords: {
      main_keyword: 'Bol product beschrijvingen',
      secondary_keywords: ['SEO teksten', 'content optimalisatie']
    },
    proposed_title: 'Perfecte Bol Product Beschrijvingen Schrijven',
    publication_language: 'nl',
    enable_images: true,
    image_generation_method: 'dalle3',
    images_per_article: 3
  })
});

const data = await response.json();

if (data.success) {
  // Create draft blog post
  const article = {
    title: data.content.title,
    slug: data.content.slug,
    excerpt: data.content.excerpt,
    content: buildHTML(data.content),
    meta_description: data.content.meta_description,
    images: data.content.images,
    schemas: [
      data.content.json_ld_article,
      data.content.json_ld_faq
    ],
    status: 'draft'
  };
  
  // Save to your CMS
  await createBlogPost(article);
}
```

### Image URL Handling

DALL-E 3 URLs expire after ~1 hour. **Download images immediately:**

```typescript
async function downloadImage(url: string, filename: string) {
  const response = await fetch(url);
  const blob = await response.blob();
  // Upload to your storage (S3, Cloudinary, etc.)
  return await uploadToStorage(blob, filename);
}

// After getting API response
for (const image of data.content.images) {
  if (image.image_url) {
    const permanentUrl = await downloadImage(
      image.image_url,
      `${data.content.slug}-${image.position}.jpg`
    );
    image.image_url = permanentUrl;
  }
}
```

### Cost Optimization

**Standard Quality (Recommended):**
- Size: 1792x1024 (wide format, perfect for blogs)
- Cost: ~$0.04 per image
- 3 images per article = ~$0.12 per article
- 100 articles = ~$12

**HD Quality (Optional):**
- Cost: ~$0.08 per image (2x standard)
- 3 images = ~$0.24 per article
- Use only when image quality is critical

**Placeholder Mode (Free):**
- Set `image_generation_method: "placeholders"`
- Generate images manually later using provided prompts
- Good for bulk generation + selective image creation

### Support

- **Integration Guide:** https://wanda-central.vercel.app/docs/integration-guide.html
- **Dashboard:** https://wanda-central.vercel.app/app
- **GitHub:** https://github.com/Misto123/wanda-central

### Changelog

**v2.0 (Current)**
- ✅ Brand-specific content generation system
- ✅ DALL-E 3 image generation
- ✅ 5-brand support (Marketplacestudio, OtGeeks, HomeGeeks, Kaufrank, EtsyGeeks)
- ✅ Comprehensive editorial rules
- ✅ JSON-LD schema generation
- ✅ TypeScript/Lovable CMS workflow

**v1.0**
- ✅ Basic content generation
- ✅ Generic SEO optimization
- ✅ Placeholder images only
