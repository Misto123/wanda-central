# Wanda Central

**Central SEO operations, experimentation, orchestration, monitoring and insights platform**

Wanda Central is the brain and orchestration layer that manages multiple SEO projects and coordinates existing SEO tools (GCTR, Mentions, GSC, etc.) without rebuilding them.

## Architecture Principle

```
Wanda Central = Brain + Orchestration + Queue + Monitoring + Logging + Insights
Existing Tools = Execution Engines
```

**Do NOT unnecessarily rebuild existing tools.** Wanda integrates and orchestrates them.

## Tech Stack

- **Frontend:** React 18 + TypeScript + Vite + Tailwind CSS
- **Backend:** TypeScript + Node.js
- **Database:** PostgreSQL / Supabase
- **Queue:** To be implemented (BullMQ or similar)
- **Theme:** Light mode, modern shadcn-inspired operations dashboard

## Current Status

✅ Frontend foundation with dashboard UI  
✅ Project structure and configuration  
⏳ Backend API routes  
⏳ Database schema  
⏳ GCTR adapter (Unified Browser API)  
⏳ Mentions adapter  
⏳ Job queue system  
⏳ Authentication  

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Type check
npm run typecheck
```

## Project Structure

```
src/
  App.tsx              # Main dashboard component
  main.tsx             # App entry point
  index.css            # Wanda visual system
  lib/                 # Utilities and helpers
  adapters/            # External tool adapters
    gctr/              # GCTR adapter
    mentions/          # Mentions adapter
  types/               # TypeScript interfaces
```

## Core Entities

```
PROJECT → MODULE → JOB → EXECUTION → RESULT → LOG → INSIGHT → TASK
```

Every action is traceable: what happened, to which project, using which tool, when, with what input, what was the result, and what happens next.

## Features

### Dashboard
- Portfolio metrics (active projects, job success rate, errors)
- Live queue visualization with progress bars
- Integration health monitoring
- Project portfolio overview
- Recent insights panel
- Traceable activity log

### Projects (Planned)
- Create and manage SEO projects
- Connect websites
- Enable/disable tools per project
- Configure integration credentials
- View project activity and health

### Job Queue (Planned)
- Queue jobs from API requests
- Execute via background workers
- Track status, progress, and results
- Retry with exponential backoff
- Schedule recurring jobs

### Adapters (Planned)
- **GCTR Adapter:** Unified Browser API integration
- **Mentions Adapter:** Brand monitoring integration
- Future: GSC, Analytics, Trello, Keyword tools

### Logging (Planned)
- Structured event logging
- Project/tool/job filtering
- Severity levels (DEBUG, INFO, WARNING, ERROR, CRITICAL)
- Audit trail for user actions

### Insights (Planned)
- Data-driven observations
- Pattern detection
- Cross-project analysis
- Traceable to source jobs/experiments

## Integration Pattern

All external tools follow a consistent adapter interface:

```typescript
interface ExternalToolAdapter {
  connect(): Promise<void>;
  testConnection(): Promise<boolean>;
  createJob(config: JobConfig): Promise<string>;
  getJobStatus(jobId: string): Promise<JobStatus>;
  getResult(jobId: string): Promise<Result>;
  cancelJob(jobId: string): Promise<void>;
  healthCheck(): Promise<HealthStatus>;
}
```

## Next Steps

1. Implement database schema (projects, jobs, logs, integrations)
2. Build API routes for project and job management
3. Create GCTR adapter with Unified Browser API
4. Implement job queue with background workers
5. Add authentication and authorization
6. Build project management UI
7. Create Mentions adapter
8. Implement structured logging system

## Development Notes

- Light theme only (as specified)
- Clean modern operations layout
- Responsive mobile-first design
- No dark mode toggle needed

## License

MIT
