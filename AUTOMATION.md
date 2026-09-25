# Wanda Central - Automated Deployment

## 🚀 Fully Automated Setup

This project uses **GitHub Actions** for automated database migrations and deployments.

### First-Time Setup (5 minutes)

1. **Push to GitHub**
   ```bash
   cd /Users/northsea/ClaudeProjects/wanda-central
   git remote add origin https://github.com/your-username/wanda-central.git
   git push -u origin main
   ```

2. **Add GitHub Secrets**
   Go to: Repository → Settings → Secrets and variables → Actions
   
   Add these secrets:
   - `SUPABASE_URL`: `https://mouycpybovknqrhknoiv.supabase.co`
   - `SUPABASE_SERVICE_ROLE_KEY`: (from credentials)
   - `DATABASE_URL`: `postgresql://postgres:2sh-6WE/=tS3@db.mouycpybovknqrhknoiv.supabase.co:5432/postgres`
   - `VERCEL_TOKEN`: Get from https://vercel.com/account/tokens
   - `VERCEL_ORG_ID`: Your Vercel org ID
   - `VERCEL_PROJECT_ID`: Your project ID

3. **Done!** 

Every push to `main` will automatically:
- ✅ Run database migrations
- ✅ Build the application
- ✅ Deploy to Vercel

## 🔄 Deployment Flow

```
Push to GitHub → GitHub Actions
                      ↓
              Install Dependencies
                      ↓
              Run DB Migration (psql)
                      ↓
              Build Frontend
                      ↓
              Deploy to Vercel
                      ↓
                   ✅ Live!
```

## 🗄️ Database Migration

Migrations are stored in `supabase/migrations/` and run automatically via psql in GitHub Actions.

**Local migration** (if needed):
```bash
export DATABASE_URL="postgresql://..."
bash scripts/migrate-ci.sh
```

## 🎯 Why This Approach?

- ✅ Fully automated - zero manual steps
- ✅ Works with Supabase free tier
- ✅ Database migrations in CI/CD
- ✅ Safe: uses timestamped migration files
- ✅ Standard: psql is universal PostgreSQL client

## 📦 What's Automated

| Step | Tool | Status |
|------|------|--------|
| Database Schema | psql + GitHub Actions | ✅ Automated |
| Frontend Build | Vite | ✅ Automated |
| Deployment | Vercel | ✅ Automated |
| Environment | GitHub Secrets | ✅ Automated |

## 🔧 Manual Fallback

If GitHub Actions can't run for any reason, you can still deploy manually:

```bash
# Run migration via Supabase Dashboard
# https://supabase.com/dashboard/project/mouycpybovknqrhknoiv/sql/new
# Copy contents of: supabase/migrations/20260925000000_initial_wanda_schema.sql

# Deploy via Vercel CLI
npm run build
vercel --prod
```

## 🎉 Result

**Zero-touch deployment**: Just push code, everything else is automatic!
