#!/bin/bash
set -e

echo "🚀 Automated Supabase Migration via psql"
echo "========================================"
echo ""

# Check environment variables
if [ -z "$DATABASE_URL" ]; then
  echo "❌ DATABASE_URL not set"
  exit 1
fi

echo "✅ Database connection configured"
echo ""

# Install psql if not available
if ! command -v psql &> /dev/null; then
  echo "📦 Installing PostgreSQL client..."
  sudo apt-get update -qq
  sudo apt-get install -y postgresql-client
fi

echo "✅ PostgreSQL client available"
echo ""

# Run migration
echo "📝 Executing migration..."
psql "$DATABASE_URL" -f supabase/migrations/20260925000000_initial_wanda_schema.sql

echo ""
echo "✅ Migration completed successfully!"
echo "🎉 Database schema deployed!"
