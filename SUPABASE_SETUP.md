# Supabase Database Setup Guide

## Database Credentials
- **URL:** https://mouycpybovknqrhknoiv.supabase.co
- **Project:** Wanda SEO Database
- **Email:** wassithe1977@speedpost.net
- **Password:** 2sh-6WE/=tS3

## Setup Instructions

### Option 1: Via Supabase Dashboard (Easiest)

1. **Login to Supabase**
   - Go to: https://supabase.com/dashboard
   - Email: `wassithe1977@speedpost.net`
   - Password: `2sh-6WE/=tS3`

2. **Open SQL Editor**
   - Click on your project: "Wanda SEO Database"
   - Navigate to: SQL Editor (left sidebar)
   - Click: "+ New query"

3. **Run the Schema**
   - Copy the entire contents of `schema.sql`
   - Paste into the SQL editor
   - Click: "Run" or press Cmd/Ctrl + Enter

4. **Verify Tables Created**
   - Go to: Table Editor (left sidebar)
   - You should see all tables:
     - users
     - projects
     - project_modules
     - integrations
     - integration_credentials
     - jobs
     - job_attempts
     - job_events
     - experiments
     - experiment_results
     - tasks
     - trello_links
     - insights
     - logs
     - audit_log

### Option 2: Via psql Command Line

```bash
PGPASSWORD='2sh-6WE/=tS3' psql \
  -h db.mouycpybovknqrhknoiv.supabase.co \
  -U postgres \
  -d postgres \
  -f schema.sql
```

### Option 3: Via Node.js Script

```bash
npm install @supabase/supabase-js
node scripts/setup-database.js
```

## Verify Setup

After running the schema, you can verify with:

```sql
-- Check all tables exist
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;

-- Check indexes
SELECT indexname, tablename 
FROM pg_indexes 
WHERE schemaname = 'public'
ORDER BY tablename, indexname;
```

## Environment Variables (Already Configured in Vercel)

✅ `SUPABASE_URL` - Project URL
✅ `SUPABASE_ANON_KEY` - Public anon key  
✅ `DATABASE_URL` - PostgreSQL connection string

## Next Steps

Once the schema is created:

1. **Create your first user** (via Supabase Auth or directly in DB)
2. **Add a test project** to verify everything works
3. **Configure GCTR_API_KEY** in Vercel if you have one
4. **Test the integration** by creating a job

## Troubleshooting

**"Permission denied"**: Make sure you're logged in with the correct account  
**"Table already exists"**: The schema uses `IF NOT EXISTS`, so it's safe to re-run  
**"Connection refused"**: Check your IP is allowed in Supabase project settings

## Direct Links

- **Dashboard:** https://supabase.com/dashboard/project/mouycpybovknqrhknoiv
- **SQL Editor:** https://supabase.com/dashboard/project/mouycpybovknqrhknoiv/sql/new
- **Table Editor:** https://supabase.com/dashboard/project/mouycpybovknqrhknoiv/editor
