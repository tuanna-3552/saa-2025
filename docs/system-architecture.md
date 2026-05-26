# System Architecture

## Stack Overview

| Layer | Technology | Notes |
|-------|-----------|-------|
| Monorepo | pnpm workspaces + Turborepo | Root: `d:/repo/saa-2025` |
| Admin Frontend | Next.js 16, React 19, TypeScript 5 (CSR) | `front-end/admin`, port 3001 |
| Landing Page | Next.js 16, React 19, TypeScript 5 (SSR) | `front-end/landing-page`, port 3000 |
| Shared UI | Shadcn UI + TailwindCSS v4 | `front-end/shared-ui`, pkg `@saa/shared-ui` |
| Backend | Supabase (PostgreSQL 15, Auth, Realtime, Storage) | `back-end/supabase` |
| Deployment | Cloudflare Pages + Workers | `@cloudflare/next-on-pages` |
| CI/CD | GitHub Actions | `.github/workflows/` |

---

## Database Schema

**Supabase project ID:** `saa-2025`
**Local dev:** API `localhost:54321` · DB `localhost:54322` · Studio `localhost:54323`

### Enums

| Enum | Values |
|------|--------|
| `user_role` | `admin`, `employee` |
| `season_status` | `draft`, `nomination`, `voting`, `closed`, `announced` |
| `nomination_status` | `pending`, `approved`, `rejected` |

### Tables

#### `departments`
| Column | Type | Notes |
|--------|------|-------|
| id | uuid PK | `gen_random_uuid()` |
| name | text UNIQUE | |
| description | text | nullable |
| created_at / updated_at | timestamptz | auto-managed |

#### `profiles`
| Column | Type | Notes |
|--------|------|-------|
| id | uuid PK | FK → `auth.users(id)` ON DELETE CASCADE |
| full_name | text | |
| email | text UNIQUE | |
| avatar_url | text | nullable |
| department_id | uuid | FK → `departments(id)` ON DELETE SET NULL |
| role | user_role | DEFAULT `employee` |
| is_active | boolean | DEFAULT `true` |
| created_at / updated_at | timestamptz | |

#### `seasons`
| Column | Type | Notes |
|--------|------|-------|
| id | uuid PK | |
| name | text | e.g. "SAA 2025" |
| year | integer | |
| nomination_start / nomination_end | timestamptz | nullable |
| voting_start / voting_end | timestamptz | nullable |
| status | season_status | DEFAULT `draft` |
| created_at / updated_at | timestamptz | |

#### `award_categories`
| Column | Type | Notes |
|--------|------|-------|
| id | uuid PK | |
| season_id | uuid | FK → `seasons(id)` ON DELETE CASCADE |
| name | text | |
| description | text | nullable |
| icon | text | nullable |
| max_votes_per_voter | integer | DEFAULT 1 |
| display_order | integer | DEFAULT 0 |
| created_at / updated_at | timestamptz | |

**Index:** `(season_id, display_order)`

#### `nominations`
| Column | Type | Notes |
|--------|------|-------|
| id | uuid PK | |
| season_id | uuid | FK → `seasons(id)` |
| category_id | uuid | FK → `award_categories(id)` |
| nominee_id | uuid | FK → `profiles(id)` |
| nominator_id | uuid | FK → `profiles(id)` |
| reason | text | nullable |
| status | nomination_status | DEFAULT `pending` |
| reviewed_by | uuid | FK → `profiles(id)` nullable |
| reviewed_at | timestamptz | nullable |
| created_at / updated_at | timestamptz | |

**Unique:** `(season_id, category_id, nominee_id, nominator_id)`
**Indexes:** `(season_id, category_id)`, `(status)`, `(nominee_id)`

#### `votes`
| Column | Type | Notes |
|--------|------|-------|
| id | uuid PK | |
| season_id | uuid | FK → `seasons(id)` |
| category_id | uuid | FK → `award_categories(id)` |
| voter_id | uuid | FK → `profiles(id)` |
| nominee_id | uuid | FK → `profiles(id)` |
| created_at | timestamptz | |

**Unique:** `(season_id, category_id, voter_id)` — one vote per voter per category

#### `results`
| Column | Type | Notes |
|--------|------|-------|
| id | uuid PK | |
| season_id | uuid | FK → `seasons(id)` |
| category_id | uuid | FK → `award_categories(id)` |
| winner_id | uuid | FK → `profiles(id)` |
| vote_count | integer | DEFAULT 0 |
| announced_by | uuid | FK → `profiles(id)` nullable |
| announced_at | timestamptz | |
| created_at | timestamptz | |

**Unique:** `(season_id, category_id)` — one winner per category

---

## Row Level Security

All 7 tables have RLS enabled. Helper function `get_my_role()` reads `profiles.role`.

| Table | admin | employee |
|-------|-------|----------|
| departments | ALL | SELECT |
| profiles | ALL | SELECT all + UPDATE own |
| seasons | ALL | SELECT |
| award_categories | ALL | SELECT |
| nominations | ALL | SELECT + INSERT (nominator=self) |
| votes | ALL | SELECT own + INSERT (voter=self) |
| results | ALL | SELECT |

---

## TypeScript Types

Generated types live in `front-end/shared-ui/src/types/database.ts`.

To regenerate after schema changes:
```bash
cd back-end && pnpm db:types
```

Import in any app:
```ts
import type { Database } from "@saa/shared-ui";
type Profile = Database["public"]["Tables"]["profiles"]["Row"];
```

---

## Local Development

```bash
# Start full Supabase stack (stop docker-compose db first if running)
cd back-end && pnpm db:start

# Apply migrations + seed
pnpm db:reset

# Regenerate TypeScript types
pnpm db:types

# Studio UI
open http://localhost:54323
```

---

## Admin Panel — Implemented Pages

`front-end/admin` (CSR, port 3001)

| Route | File | Description |
|-------|------|-------------|
| `/login` | `app/(auth)/login/page.tsx` | Email/password login, redirects to dashboard |
| `/` (dashboard) | `app/(admin)/page.tsx` | Overview: per-department stats, date range picker |
| `/nominations` | `app/(admin)/nominations/page.tsx` | Nominations list with status filter (all/pending/approved/rejected) |
| `/nominations/[id]` | `app/(admin)/nominations/[id]/page.tsx` | Nomination detail; approve/reject actions |

### Key Frontend Modules

| Path | Purpose |
|------|---------|
| `components/nominations/` | Table, row, status badge, detail card, review actions, detail sections, status filter |
| `hooks/use-nominations.ts` | Fetch nominations list with status filter |
| `hooks/use-nomination.ts` | Fetch single nomination detail |
| `lib/review-nomination.ts` | Supabase mutations: approve / reject |
| `lib/format.ts` | Shared `formatDate` utility |

---

## Migration Files

| File | Description |
|------|-------------|
| `back-end/supabase/migrations/20260525000000_initial_schema.sql` | Enums, tables, indexes, triggers |
| `back-end/supabase/migrations/20260525000001_rls_policies.sql` | RLS + `get_my_role()` function |
| `back-end/supabase/seed.sql` | Dev seed: 3 depts, 5 users, 1 season, 3 categories, 6 nominations, 3 votes |
