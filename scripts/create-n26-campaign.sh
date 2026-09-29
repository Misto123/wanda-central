#!/bin/bash
# Create N26 Promo Code Campaign using SVB 3.0 API

echo "🚀 Creating N26 Campaign..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# First, get available profiles
echo "📋 Getting AdsPower profiles..."
PROFILES=$(curl -s 'https://qa-runner-navy.vercel.app/api/profiles?provider=adspower')
echo "Available profiles:"
echo "$PROFILES" | jq -r '.profiles[] | .id' | head -5

echo ""
echo "🎯 Creating campaign for n26promocode.com..."
echo ""

# Create the campaign
RESPONSE=$(curl -s -X POST 'https://qa-runner-navy.vercel.app/api/campaigns' \
  -H "Content-Type: application/json; charset=utf-8" \
  -d '{
    "name": "N26 Promo Code - 2 visits/day",
    "campaignType": "gctr",
    "targetUrl": "n26promocode.com",
    "targetMode": "domain",
    "keywords": [
      {"keyword": "n26 promo code", "dailyClicks": 1},
      {"keyword": "n26 referral code", "dailyClicks": 1},
      {"keyword": "referral bonus n26", "dailyClicks": 0}
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
  }')

echo "📊 Campaign Response:"
echo "$RESPONSE" | jq '.'

if echo "$RESPONSE" | jq -e '.success' > /dev/null 2>&1; then
  echo ""
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo "✅ SUCCESS! Campaign created"
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo ""
  echo "Campaign ID: $(echo "$RESPONSE" | jq -r '.campaign.id')"
  echo "Name: $(echo "$RESPONSE" | jq -r '.campaign.name')"
  echo "Status: $(echo "$RESPONSE" | jq -r '.campaign.status')"
  echo "Daily Visits: 2"
  echo "Duration: 90 days"
  echo ""
  echo "Keywords:"
  echo "  - n26 promo code (1 click/day)"
  echo "  - n26 referral code (1 click/day)"
  echo "  - referral bonus n26 (backup)"
  echo "Fallback: n26promocode.com"
  echo ""
  echo "🎉 Campaign is now active!"
else
  echo ""
  echo "❌ Campaign creation failed"
  echo "Error: $(echo "$RESPONSE" | jq -r '.error // "Unknown error"')"
fi
