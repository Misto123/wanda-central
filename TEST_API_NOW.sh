#!/bin/bash
# Test Content Creator API for Marketplace Studio

echo "🧪 Testing Wanda Central API for marketplacestudio.nl"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "API Key: hfc_2x8RueOc4ptHsJaAuaCbHbyJU2X9RzP4"
echo "Endpoint: https://wanda-central.vercel.app/api/content/generate"
echo ""
echo "Generating test article..."
echo ""

curl -X POST https://wanda-central.vercel.app/api/content/generate \
  -H "Content-Type: application/json" \
  -d '{
    "website_domain": "marketplacestudio.nl",
    "main_keyword": "marketplace software",
    "secondary_keywords": ["online marketplace", "e-commerce platform"],
    "article_length_words": 400,
    "tone": "professional",
    "enable_no_ai_slop": true,
    "enable_seo_optimization": true
  }' \
  2>/dev/null | jq -r '
    if .success then
      "✅ SUCCESS!\n",
      "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n",
      "Title: " + .content.meta.title,
      "Description: " + .content.meta.description,
      "Slug: " + .content.meta.slug,
      "\nH1: " + .content.content.h1,
      "\nIntro Preview: " + (.content.content.intro[:150]) + "...",
      "\nSections: " + (.content.content.sections | length | tostring),
      "FAQs: " + (.content.faqs | length | tostring),
      "\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
      "Request ID: " + .request_id,
      "Remaining Quota: " + (.remaining_quota | tostring),
      "Execution Time: " + (.execution_time_ms | tostring) + "ms",
      "\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
      "\n🎉 API is working! Ready for production use."
    else
      "❌ ERROR: " + .error
    end
  '
