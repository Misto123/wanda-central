#!/bin/bash
set -e

echo "🚀 Deploying Wanda Central Database Migrations"
echo "=============================================="
echo ""

# Check if we're in the right directory
if [ ! -f "supabase/config.toml" ]; then
  echo "❌ Error: supabase/config.toml not found"
  echo "   Run this script from the project root"
  exit 1
fi

# Check if supabase CLI is installed
if ! command -v supabase &> /dev/null; then
  echo "📦 Installing Supabase CLI..."
  brew install supabase/tap/supabase
fi

echo "✅ Supabase CLI available"
echo ""

# Link to remote project
echo "🔗 Linking to remote Supabase project..."
supabase link --project-ref mouycpybovknqrhknoiv

# Push migrations
echo ""
echo "📤 Pushing migrations to remote database..."
supabase db push

echo ""
echo "✅ Database migrations deployed successfully!"
echo ""
echo "🎉 Wanda Central database is ready!"
