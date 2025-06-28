# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the Georgia Public Trust & Compliance Platform - a hackathon project for the Codegen Speed Trials 2025. The goal is to transform Georgia's cryptic public water quality data into a user-friendly platform for citizens, water system operators, and regulators.

## Tech Stack

- **Framework**: Next.js 15 (App Router) with TypeScript
- **UI**: ShadCN/UI components with Tailwind CSS
- **Database**: Originally specified for Neon (Postgres), but use SQLite locally for development
- **ORM**: Drizzle ORM
- **Package Manager**: pnpm

## Commands

### Development
```bash
cd app
pnpm install
pnpm run dev        # Runs on http://localhost:3000 with Turbopack
```

### Build & Production
```bash
cd app
pnpm run build      # Production build
pnpm run start      # Start production server
```

### Code Quality
```bash
cd app
pnpm run lint       # Run Next.js linter
```

## Architecture

### Project Structure
- `/app` - Main Next.js application
  - `/src/app` - App Router pages and layouts
  - `/src/components` - React components (using ShadCN/UI)
  - `/src/lib` - Utilities and database configuration
- `/data` - Raw CSV data files from Georgia's water quality system
- Documentation files at root level (various .md files)

### Key Architectural Decisions

1. **Server-First Approach**: Use Next.js Server Components and Server Actions for data fetching and mutations
2. **Type Safety**: End-to-end type safety with TypeScript, from database schema (Drizzle) to frontend
3. **Component-Driven**: Modular UI built with ShadCN/UI components
4. **Local Development**: For the hackathon, use SQLite instead of Neon Postgres for easier local setup

### Database Schema

The schema (to be implemented in `src/lib/db/schema.ts`) should handle:
- Water systems data (`SDWA_PUB_WATER_SYSTEMS.csv`)
- Violations and enforcement (`SDWA_VIOLATIONS_ENFORCEMENT.csv`)
- Geographic data (`SDWA_GEOGRAPHIC_AREAS.csv`, `SDWA_SERVICE_AREAS.csv`)
- Water quality samples (`SDWA_LCR_SAMPLES.csv`)
- Site visits (`SDWA_SITE_VISITS.csv`)
- Reference codes (`SDWA_REF_CODE_VALUES.csv`)

### User Interfaces

Build three distinct interfaces:
1. **Public Interface**: Easy-to-understand water quality information for Georgia residents
2. **Operator Dashboard**: System management and compliance tracking for water system operators
3. **Regulator Tools**: Field kit for inspectors with live status and detailed drill-downs

## Implementation Notes

- Data ingestion scripts should process CSV files from `/data` directory
- Use Server Actions for all data operations (avoid traditional API routes unless necessary)
- Implement responsive design for mobile access (important for field inspectors)
- Consider using React Server Components for better performance
- The existing Georgia system (https://gadrinkingwater.net/DWWPUB/) should be significantly improved upon

## Running with Uzi

When using the Uzi tool for multi-agent development:
- The `uzi.yaml` is configured to run the Next.js app on ports 3010-3020
- Each agent gets its own git worktree and isolated dependencies
- Use `uzi checkpoint <agent-name> "commit message"` to merge agent work back to main branch