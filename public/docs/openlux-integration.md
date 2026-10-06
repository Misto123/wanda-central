# OpenLux API Integration

## Overview

Wanda Central now uses **OpenLux API** for content generation, providing:
- ✅ **Claude Opus 4-7** for high-quality content
- ✅ **Cost-effective pricing** compared to direct Anthropic API
- ✅ **Smart routing** with `:nitro` suffix for fastest speed
- ✅ **OpenRouter compatibility** for easy migration

## API Configuration

### Base URL
```
https://api.openlux.ai
```

### API Key
```
sk-DYWu3AGFZhU5HC6bWO1kIlR6RbBD9A3jx0lb1TWsLSqwgUTq
```

## Model Routing

OpenLux supports smart routing via model suffixes:

| Suffix | Mode | Description |
|--------|------|-------------|
| `:floor` | price | Lowest price |
| `:nitro` | speed | Fastest speed (Wanda uses this) |
| `:stable` | success_rate | Highest success rate |

**Wanda uses:** `claude-opus-4-7:nitro` for optimal speed.

## Image Generation

OpenLux doesn't provide direct image generation. Instead, Wanda:

1. **Generates detailed image prompts** via Claude
2. **Returns placeholder URLs** (via.placeholder.com)
3. **Includes generation prompts** for use with any image service

Users can:
- Use prompts with ChatGPT/DALL-E
- Use prompts with Midjourney
- Use prompts with any AI image generator
- Generate images later at their convenience

## API Endpoints

### Content Generation
```
POST https://wanda-central.vercel.app/api/content/generate
```

### Request Format
```json
{
  "brand": "Marketplacestudio",
  "keywords": {
    "main_keyword": "Bol SEO",
    "secondary_keywords": ["Bol ranking", "product optimalisatie"]
  },
  "proposed_title": "Bol SEO Gids 2026",
  "publication_language": "nl",
  "article_length_words": 1800,
  "enable_images": true,
  "images_per_article": 3
}
```

### Response Format
```json
{
  "success": true,
  "content": {
    "title": "...",
    "sections": [...],
    "images": [
      {
        "position": "after_intro",
        "alt_text": "Bol zoekresultaten",
        "caption": "Voorbeeld van organische zoekresultaten",
        "placeholder_url": "https://via.placeholder.com/1792x1024?text=...",
        "generation_prompt": "Professional Bol.com search results mockup, clean UI, modern design..."
      }
    ]
  },
  "metadata": {
    "api_provider": "openlux"
  }
}
```

## Cost Comparison

### OpenLux (Current)
- **Model:** claude-opus-4-7:nitro
- **Routing:** Speed-optimized
- **Cost:** Competitive pricing vs direct Anthropic
- **Images:** Prompts only (free)

### Previous (DALL-E 3)
- **Model:** dall-e-3
- **Cost:** $0.04 per image (standard)
- **Images:** Direct generation

## Integration Code

### TypeScript/JavaScript
```typescript
import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({ 
  apiKey: "sk-DYWu3AGFZhU5HC6bWO1kIlR6RbBD9A3jx0lb1TWsLSqwgUTq",
  baseURL: "https://api.openlux.ai"
});

const msg = await client.messages.create({
  model: "claude-opus-4-7:nitro",
  max_tokens: 16000,
  system: BRAND_SYSTEM_PROMPT,
  messages: [{ role: "user", content: userPrompt }]
});
```

### cURL
```bash
curl -X POST https://api.openlux.ai/v1/messages \
  -H "Authorization: Bearer sk-DYWu3AGFZhU5HC6bWO1kIlR6RbBD9A3jx0lb1TWsLSqwgUTq" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "claude-opus-4-7:nitro",
    "max_tokens": 16000,
    "messages": [{"role": "user", "content": "Hello"}]
  }'
```

## Authentication

**Header:**
```
Authorization: Bearer sk-DYWu3AGFZhU5HC6bWO1kIlR6RbBD9A3jx0lb1TWsLSqwgUTq
```

## OpenRouter Compatibility

OpenLux is fully compatible with OpenRouter routing:

| OpenRouter | OpenLux |
|------------|---------|
| `throughput` | `:nitro` |
| `speed` | `:nitro` |
| `latency` | `:stable` |
| `success_rate` | `:stable` |
| `price` | `:floor` |

## Migration Notes

### From OpenAI DALL-E 3
- ✅ No more image generation costs
- ✅ Detailed prompts provided instead
- ✅ More flexibility in image generation
- ⚠️ Manual image generation step required

### From Direct Anthropic API
- ✅ Same model quality (Claude Opus 4)
- ✅ Faster routing with `:nitro`
- ✅ Cost-effective pricing
- ✅ No code changes needed (same SDK)

## Best Practices

1. **Always use `:nitro` suffix** for speed-optimized routing
2. **Cache generated content** to avoid regeneration
3. **Download placeholder images** and replace with real images later
4. **Use generation prompts** with your preferred image service
5. **Monitor API usage** via OpenLux dashboard

## Support

- **OpenLux Dashboard:** https://openlux.ai
- **API Documentation:** https://docs.openlux.ai
- **Wanda Dashboard:** https://wanda-central.vercel.app/app

## Rate Limits

Same as configured on OpenLux:
- Check your OpenLux account for current limits
- Default: 200 requests per day
- Contact OpenLux support for increases

## Changelog

**v2.1 (Current - OpenLux Integration)**
- ✅ Switched to OpenLux API
- ✅ Using claude-opus-4-7:nitro for speed
- ✅ Image prompts instead of direct generation
- ✅ Cost-effective content generation

**v2.0 (Previous - DALL-E 3)**
- ✅ Direct image generation via DALL-E 3
- ✅ Brand-specific content system
- ✅ 5-brand support
