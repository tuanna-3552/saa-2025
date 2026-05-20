# SAA Awards 2025

Sun Asterisk Award System — celebrating excellence and innovation across the organization.

## Overview

SAA-2025 is a monorepo containing the full award nomination and voting platform. It is built code-first from Figma designs and MoMorph screen specs using the Takumi toolset.

| App | Description | URL (local) |
|---|---|---|
| `landing-page` | Public SSR site — nominations, results, SEO | http://localhost:3000 |
| `admin` | Protected CSR panel — manage awards, voters, results | http://localhost:3001 |

## Tech Stack

| Layer | Technology |
|---|---|
| Monorepo | pnpm workspaces + Turborepo |
| Frontend | Next.js 16, React 19, TypeScript 5 |
| Styling | TailwindCSS v4 + Shadcn UI (`@saa/shared-ui`) |
| Backend | Supabase (PostgreSQL, Auth, Realtime, Edge Functions) |
| Deployment | Cloudflare Pages + Workers |
| CI/CD | GitHub Actions |
| Local dev | Docker Compose (Supabase local stack) |

## Project Structure

```
saa-2025/
├── back-end/
│   └── supabase/            # Migrations, Edge Functions, seed, config
├── front-end/
│   ├── admin/               # Next.js CSR admin panel (port 3001)
│   ├── landing-page/        # Next.js SSR public site (port 3000)
│   └── shared-ui/           # Shared Shadcn UI + Tailwind preset (@saa/shared-ui)
├── docker/
│   └── docker-compose.yml   # Local Supabase stack
├── .github/workflows/       # CI (lint+build on PR) + deploy (push to main)
├── turbo.json               # Turborepo pipeline
└── pnpm-workspace.yaml      # Workspace roots
```

## Prerequisites

- **Node.js** >= 20
- **pnpm** >= 9 — `npm install -g pnpm`
- **Docker + Docker Compose** — for local Supabase stack

## Getting Started

### 1. Clone and install

```bash
git clone <repo-url>
cd saa-2025
pnpm install
```

### 2. Set up environment variables

```bash
# Next.js apps (single root file, loaded automatically by Turborepo)
cp .env.example .env

# Docker local stack (separate file for Docker Compose secrets)
cp docker/.env.example docker/.env
```

> Both files already contain the correct values for local development. No edits needed to get started.

### 3. Start local Supabase

**Full stack** (API, Auth, Studio, Realtime) — recommended for app development:

```bash
cd back-end && pnpm db:start
```

| Service | URL |
|---|---|
| Supabase API | http://localhost:54321 |
| Supabase Studio | http://localhost:54323 |
| PostgreSQL | postgresql://postgres:postgres@localhost:54322/postgres |

**PostgreSQL only** — for direct DB access and running migrations without the full stack:

```bash
docker compose -f docker/docker-compose.yml up -d
```

### 4. Start development servers

```bash
pnpm dev
```

Both apps start concurrently — landing-page on port 3000, admin on port 3001.

## Available Scripts

Run from the repo root:

| Command | Description |
|---|---|
| `pnpm dev` | Start all apps in dev mode |
| `pnpm build` | Build all packages and apps |
| `pnpm lint` | Lint all workspaces |
| `pnpm type-check` | TypeScript type-check all workspaces |
| `pnpm test` | Run unit tests across all workspaces |
| `pnpm test:e2e` | Run end-to-end tests |
| `pnpm format` | Format all TypeScript and Markdown files |

Run scoped (Turborepo filter):

```bash
pnpm turbo dev --filter=@saa/landing-page
pnpm turbo build --filter=@saa/admin
```

## Environment Variables

| Variable | Used in | Description |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | admin, landing-page | Supabase project API URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | admin, landing-page | Supabase anonymous key |
| `NEXT_PUBLIC_SITE_URL` | landing-page | Canonical site URL for SEO/sitemap |
| `NEXT_PUBLIC_APP_ENV` | admin, landing-page | `development` or `production` |
| `POSTGRES_PASSWORD` | docker | Local PostgreSQL password |
| `JWT_SECRET` | docker | Local Supabase JWT signing secret |
| `ANON_KEY` | docker | Local Supabase anonymous JWT |
| `SERVICE_ROLE_KEY` | docker | Local Supabase service role JWT |

See `.env.example` at the repo root for a consolidated reference of all variables.

## Deployment

Apps deploy automatically to Cloudflare Pages on push to `main`:

- `front-end/admin/**` changes → deploys to `saa-admin` Cloudflare Pages project
- `front-end/landing-page/**` changes → deploys to `saa-landing` Cloudflare Pages project
- `front-end/shared-ui/**` changes → triggers both deploy workflows

Required GitHub Actions secrets: `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`, `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `NEXT_PUBLIC_SITE_URL`.

## Database

Supabase migrations live in `back-end/supabase/migrations/`. Use the Supabase CLI (installed as a dev dependency in `back-end/`):

```bash
cd back-end
pnpm db:start    # start local Supabase (alternative to Docker Compose)
pnpm db:reset    # reset local DB and re-run migrations
pnpm db:push     # push migrations to remote project
```
