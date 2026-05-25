# Project Changelog

---

## [Unreleased]

---

## 2026-05-25

### Added — Database Structure (Phase 2)

**Migration: `20260525000000_initial_schema.sql`**
- Enums: `user_role` (admin/employee), `season_status` (draft/nomination/voting/closed/announced), `nomination_status` (pending/approved/rejected)
- Table `departments`: company departments
- Table `profiles`: employee profiles linked to `auth.users` via FK
- Table `seasons`: award seasons with nomination and voting date ranges
- Table `award_categories`: award types scoped to a season
- Table `nominations`: nomination records with approval workflow
- Table `votes`: one-vote-per-voter-per-category constraint
- Table `results`: announced winners per category per season
- `set_updated_at()` trigger function applied to all tables with `updated_at`
- Indexes on `nominations(season_id, category_id)`, `nominations(status)`, `nominations(nominee_id)`, `award_categories(season_id, display_order)`

**Migration: `20260525000001_rls_policies.sql`**
- RLS enabled on all 7 tables
- `get_my_role()` security definer function for role-based policy evaluation
- Admin: full access to all tables
- Employee: read-only on public tables; can submit own nominations and votes; can update own profile

**TypeScript types**
- `front-end/shared-ui/src/types/database.ts`: full `Database` type generated from live schema
- `front-end/shared-ui/src/index.ts`: exports `Database` type from `@saa/shared-ui`
- `back-end/package.json`: added `db:types` script (`supabase gen types typescript --local`)

**Seed data (`back-end/supabase/seed.sql`)**
- 3 departments: Engineering, Design, Product
- 2 admin profiles + 3 employee profiles (with auth.users entries)
- 1 season: SAA 2025 (status: nomination)
- 3 award categories: Best Innovator, Team Player, Rising Star
- 6 approved nominations (2 per category)
- 3 votes (1 per category)

---

## 2026-05-XX — Foundation (Phase 1)

### Added
- Monorepo with pnpm workspaces + Turborepo
- Next.js 16 admin app (`front-end/admin`, CSR, port 3001)
- Next.js 16 landing page (`front-end/landing-page`, SSR, port 3000)
- Shared UI library (`@saa/shared-ui`) with Shadcn UI + TailwindCSS v4
- Supabase local dev configuration (`back-end/supabase/config.toml`)
- Docker Compose for direct PostgreSQL access (`docker/docker-compose.yml`)
- GitHub Actions CI (lint + type-check + build)
- GitHub Actions deploy to Cloudflare Pages (admin + landing)
