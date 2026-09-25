#!/bin/bash
set -e

echo "🚀 Wanda Central Deployment Script"
echo "=================================="
echo ""

# Check environment
if [ -z "$SUPABASE_URL" ]; then
  echo "❌ SUPABASE_URL not set"
  exit 1
fi

if [ -z "$SUPABASE_SERVICE_ROLE_KEY" ]; then
  echo "❌ SUPABASE_SERVICE_ROLE_KEY not set"
  exit 1
fi

echo "✅ Environment variables configured"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm ci --silent

# Run database migration
echo ""
echo "🗄️  Running database migration..."
node scripts/migrate.js

# Build frontend
echo ""
echo "🏗️  Building frontend..."
npm run build

echo ""
echo "✅ Deployment preparation complete!"
echo ""
echo "📊 Build output:"
ls -lh dist/

echo ""
echo "🎉 Ready for deployment!"
