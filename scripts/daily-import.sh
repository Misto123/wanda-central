#!/bin/bash
# Daily GSC & GA Data Import Cron Job
# Add to crontab: 0 2 * * * /path/to/daily-import.sh

set -e

echo "🕐 $(date) - Starting daily GSC/GA import"

cd "$(dirname "$0")/.."

# Load environment variables
export $(cat .env | grep -v '^#' | xargs)

# Import GSC data for all active properties
echo "📊 Importing GSC data..."
psql "$DATABASE_URL" -c "
  SELECT property_url FROM gsc_properties 
  WHERE sync_enabled = true;
" -t | while read domain; do
  if [ ! -z "$domain" ]; then
    echo "  - Importing $domain"
    node mcp-servers/gsc/import-single.js "$domain" 1
  fi
done

# Import GA data for all active properties
echo "📈 Importing GA data..."
psql "$DATABASE_URL" -c "
  SELECT property_id FROM ga_properties 
  WHERE sync_enabled = true;
" -t | while read property; do
  if [ ! -z "$property" ]; then
    echo "  - Importing $property"
    node mcp-servers/ga/import-single.js "$property" 1
  fi
done

# Generate keyword opportunities
echo "🎯 Generating keyword opportunities..."
node scripts/generate-keyword-opportunities.js

echo "✅ Daily import completed at $(date)"
