# Wanda Central

**Central SEO operations, experimentation, orchestration, monitoring and insights platform**

## 🌐 Live Application

**Production:** https://wanda-central.vercel.app

## ⚡ Quick Start

```bash
# Clone repository
git clone <your-repo-url>
cd wanda-central

# Install dependencies
npm install

# Set up environment
cp .env.example .env
# Add your credentials

# Run locally
npm run dev

# Build for production
npm run build
```

## 🚀 Fully Automated Deployment

This project uses **GitHub Actions** for zero-touch deployment:

1. **Push to GitHub** → Triggers automatic workflow
2. **Database migration** → Runs automatically via psql
3. **Build & Deploy** → Deploys to Vercel
4. **Done!** → Live in ~2 minutes

See [AUTOMATION.md](./AUTOMATION.md) for complete setup guide.

## 🗄️ Database

- **Provider:** Supabase (PostgreSQL)
- **Migrations:** `supabase/migrations/`
- **Automation:** GitHub Actions + psql

**Manual migration** (if needed):
```bash
# Via Supabase Dashboard
https://supabase.com/dashboard/project/mouycpybovknqrhknoiv/sql/new

# Or via command line
export DATABASE_URL="postgresql://..."
npm run migrate:ci
```

## 🏗️ Architecture

```
Wanda Central (Brain)
├── Projects Management
├── Job Queue & Orchestration
├── Integration Health Monitoring
├── Structured Logging
└── Insights Generation

External Tools (Execution Engines)
├── GCTR (via Unified Browser API)
├── Mentions (Brand monitoring)
├── GSC (Google Search Console)
└── Future integrations...
```

## 📋 Features

### ✅ Implemented
- Modern operations dashboard (light theme)
- Project portfolio management
- Live job queue visualization
- Integration health monitoring
- Metrics overview
- Activity tracking
- GCTR adapter (Unified Browser API)
- Mentions adapter (stub)
- Complete database schema
- Automated deployments

### 🔜 Coming Soon
- Job queue workers
- Real-time updates
- Authentication
- API routes
- Structured logging
- Insights generation
- Task management
- Trello integration

## 🛠️ Tech Stack

**Frontend**
- React 18
- TypeScript
- Vite
- Tailwind CSS

**Backend**
- Node.js
- TypeScript
- PostgreSQL/Supabase

**Deployment**
- Vercel (frontend)
- GitHub Actions (CI/CD)
- Supabase (database)

## 📝 Scripts

```bash
npm run dev          # Start dev server
npm run build        # Production build
npm run migrate      # Check database status
npm run migrate:ci   # Run migrations (CI/CD)
npm run deploy       # Full deployment script
```

## 🔐 Environment Variables

Required for deployment:
- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `DATABASE_URL`
- `GCTR_API_KEY` (optional)
- `MENTIONS_API_KEY` (optional)

## 📚 Documentation

- [AUTOMATION.md](./AUTOMATION.md) - Automated deployment guide
- [DEPLOYMENT.md](./DEPLOYMENT.md) - Manual deployment steps
- [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) - Database setup guide

## 🎯 Core Principle

**Wanda Central is the brain. External tools are execution engines.**

Don't rebuild existing tools. Integrate and orchestrate them.

## 📂 Project Structure

```
wanda-central/
├── src/
│   ├── App.tsx              # Dashboard UI
│   ├── types/               # TypeScript types
│   └── adapters/            # External tool adapters
├── supabase/
│   ├── config.toml          # Supabase config
│   └── migrations/          # Database migrations
├── scripts/
│   ├── migrate.js           # Migration helper
│   └── migrate-ci.sh        # CI/CD migration
├── .github/
│   └── workflows/           # GitHub Actions
└── [config files]
```

## 🤝 Contributing

This project is designed for easy iteration by both humans and AI coding agents.

Code style:
- TypeScript strict mode
- Small focused modules
- Adapter pattern for integrations
- Clean separation of concerns

## 📄 License

MIT

---

**Built with ❤️ for SEO operations at scale**
