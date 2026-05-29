# Project Changelog

---

## [Unreleased]

---

## 2026-05-29 — Kudos Live Board — Landing Page

### Added — Landing Page `/kudos`

- Full Kudos live board page (`src/app/kudos/page.tsx`, edge runtime) with 4 sections: KV banner, Highlight carousel, Spotlight word cloud, All Kudos feed + sidebar
- **UI Components:** 14 components created covering banner, write input, carousel with filters, spotlight board, infinite-scroll feed, sidebar with stats, cards, tooltips, labels
- **Data Layer:** `kudos-types.ts` with 5 core interfaces (KudoPost, HighlightKudo, SpotlightRecipient, UserStats, PrizeRecipient); `kudos-api.ts` with 10 Supabase query functions (getHighlightKudos, getAllKudos, getSpotlightRecipients, toggleLike, etc.)
- **Integration:** Real Supabase data wired via SSR + client-side state; URL search params for filter sharing (`?hashtag=x&dept=y`); optimistic like toggle; Intersection Observer infinite scroll; copy-to-clipboard link sharing; hashtag filtering across both sections
- **Auth Guard:** AuthGuard wrapper; unauthenticated users redirected to `/login`
- **Star System:** 4-tier star badge (0 stars < 10 kudos, 1 star ≥ 10, 2 stars ≥ 20, 3 stars ≥ 50) implemented in kudos-api
- **Tests:** 223 Jest tests across 13 test files (12 component tests + 1 API test), all passing. Coverage: GUI layout, interaction (like/unlike, copy link, filters, tooltips), validation (spotlight search 100-char limit), API unit tests (star thresholds, pagination, likes)
- **Build:** Passes clean, no TypeScript errors, no console warnings

---

## 2026-05-29 — Award System Page — Landing Page

### Added — Landing Page `/he-thong-giai`

- Full award system page (`src/app/he-thong-giai/page.tsx`, edge runtime) showcasing 6 SAA 2025 awards with specs: Top Talent, Top Project, Top Project Leader, Best Manager, Signature 2025 - Creator, MVP
- `AuthGuard` client-side auth wrapper: redirects unauthenticated users to `/login`; loading state during session check prevents content flash
- UI components: `award-info-card` (image + metadata), `award-nav` (sticky left sidebar with IntersectionObserver active tracking), `section-title` (heading + divider), `keyvisual` (decorative banner)
- `award-data.ts`: shared AWARDS constant with qty, unit, value, valueNote per spec
- 16 unit tests: 3 for auth-guard (session handling), 4 for award-nav (rendering + active state), 9 for award-info-card (data + image)
- E2E test skeleton (`he-thong-giai.e2e.ts`, Playwright) with case IDs for integration testing
- 5 award images as placeholders; 1 image extracted from Figma (TODO: extract remaining 5 via MoMorph `get_design_item_image`)

---

## 2026-05-27 — Homepage — Landing Page

### Added — Landing Page `/home`

- Full homepage (`src/app/home/page.tsx`, edge runtime) with 7 sections: header, hero, root-further-content, awards (6 cards), kudos, widget button, footer
- UI components: `header`, `footer`, `hero-section`, `root-further-content`, `awards-section`, `award-card`, `kudos-section`, `widget-button`
- Auth-conditional header: bell + language toggle (VN/EN visual) + account menu shown when authenticated
- `user-menu`: Supabase client-side session + profile fetch for role-based rendering
- `account-menu`: employee vs admin role distinction; admin URL driven by `NEXT_PUBLIC_ADMIN_URL`
- `notification-badge`: stub — count hardcoded to 0 pending notifications table
- `language-toggle`: visual VN/EN switch (no i18n wired yet)
- Event date driven by `NEXT_PUBLIC_EVENT_DATE` env var (shared with prelaunch page)
- 12 image assets downloaded from Figma → `public/home/`
- Jest + `@swc/jest` + `@testing-library/react` test infrastructure added to `front-end/landing-page`
- 29 unit tests covering homepage components; all passing

---

## 2026-05-27 — Login Page — Landing Page

### Added — Landing Page Auth

- `/login` route with "Sign in with Google" button (`front-end/landing-page/src/app/login/page.tsx`, `src/components/auth/login-form.tsx`)
- Supabase client helper for landing page (`src/lib/supabase.ts`)
- `/api/auth/dev-login` edge route handler: dev-only stub that signs in via `supabase.auth.signInWithPassword` using `DEV_USER_EMAIL` / `DEV_USER_PASSWORD` env vars; returns 404 in production
- Post-login redirect target: `/home`

---

## 2026-05-26 — Prelaunch Countdown Page — Landing Page

### Added — Landing Page

- Implemented full-screen countdown Prelaunch page matching Figma design (`front-end/landing-page/src/app/page.tsx`)
- `CountdownTimer` component shows Days/Hours/Minutes; redirects to configurable `redirectTo` prop on expiry (`front-end/landing-page/src/components/countdown-timer.tsx`)
- Background: colorful abstract art overlay with dark gradient, flipped vertically per design
- Fonts: Montserrat Bold (labels) + Share Tech Mono (digits) via `next/font/google`, added to `app/layout.tsx`
- Target date driven by `NEXT_PUBLIC_EVENT_DATE` env var (`next.config.ts`)

### Fixed — Landing Page

- Pre-existing CJS/ESM plugin import bug in `front-end/landing-page/eslint.config.mjs`

---

## 2026-05-26 — Admin User Page & DB Upgrades (Phase 3, completed)

### Added — Admin User Management Page
- Created `/users` page showcasing a dense data table matching Figma specifications.
- Filter bar with live filtering by Unit (Department), Level, and Role.
- Live searching by name or email (case-insensitive).
- Bi-directional sorting on numeric and date columns (Sent Kudos, Received Kudos, Total Hearts, Badges, Time to get 6 Badges).
- Dynamic CSV Export functionality exporting formatted, exact user data matching current search/filter criteria.
- Complete responsive support using container widths of `min-w-[1540px]` allowing smooth horizontal scrolling on smaller viewports.

### Added — Database Schema Upgrades & Reseeding
- Added `level` (INTEGER, default 1) and `last_logged_in` (TIMESTAMPTZ, nullable) columns to the `profiles` table schema in PostgreSQL migration (`20260525000000_initial_schema.sql`).
- Updated local seed script `seed.sql` to populate realistic user levels and last login dates matching the mockup.
- Regenerated monorepo TypeScript typings using Supabase CLI (`pnpm db:types`), ensuring 100% TS query safety for new properties.
- Successfully reset and reseeded local postgres DB via `supabase db reset`.

### Fixed & Redesigned — Table UI & Figma Icons
- Changed `sent Kudos` and `Received Kudos` columns from percentage metrics to raw counts (`approved` nominations count), matching the Figma spec.
- Added summation symbol `Σ` and static limit inside headers: `Σ sent Kudos (100)` and `Σ Received Kudos (100)`.
- Restructured sort indicator icon (`SortIcon`) to draw vertically separated solid filled triangles (pointing up and down with a clean 4px gap), matching the Figma design exactly instead of overlapping chevrons.
- Unified table and row cells to use identical custom pixel arbitrary widths (e.g. `w-[170px]`, `w-[210px]`), eliminating misalignments due to uncompiled standard tailwind spacing classes.
- Standardized Vietnam display format (`dd/MM/yyyy HH:mm`) using `formatDateTime` for `last_logged_in` timestamps.

---

## 2026-05-25 — Admin Auth + Dashboard (Phase 3, partial)

### Added — Admin Authentication

- Supabase Auth email/password login at `/login` with admin-role guard
- `AuthProvider` context + `useAuth()` hook for session management across admin shell
- `(admin)/layout.tsx` route group: checks `profile.role === "admin"`, redirects to `/login` if not authorized, shows full-page spinner while loading
- Login form styled with dark admin theme (Shadcn UI components: Card, Input, Label, Button, Alert)
- TailwindCSS v4 properly configured: migrated from `@tailwind` (v3 compat) to `@import "tailwindcss"` + `@theme inline` + `@tailwindcss/postcss`
- Shadcn UI components added: Button, Input, Label, Card, Alert, Popover, Calendar, DropdownMenu

### Added — Admin Dashboard (Overview)

- `/dashboard` page: per-department stats table matching MoMorph Figma spec (node `620:7712`)
- Columns: No, Unit, Total members, Total sent kudos, Total received kudos, Total users with kudos, Total received secret box
- Stats aggregated client-side from 4 parallel Supabase queries (departments, profiles, nominations, votes)
- Interactive date range picker (Radix Popover + react-day-picker): Today shortcut + Apply button
- Export button (UI only, no-op)

### Added — Admin Shell

- `AdminHeader`: sticky dark header with logo slot (`public/logo.svg`), nav tabs, bell/language/account
- Active nav item: gold text glow (`text-shadow`) + gold underline bar with box-shadow glow (Figma spec)
- Account button: 40×40px, radius 4px (Figma spec), opens DropdownMenu with user name/role + Sign out
- Bell and Language buttons: placeholder, no-op

### Fixed — Supabase Local Dev

- `auth.users` seed rows had NULL `confirmation_token`, `recovery_token`, `email_change`, etc. — GoTrue threw "Database error querying schema" (500). Fixed by setting these varchar columns to `''` in seed.sql and in the live DB.
- Updated `NEXT_PUBLIC_SUPABASE_ANON_KEY` to new `sb_publishable_*` format from Supabase CLI v2+

---

## 2026-05-25 — Database Structure (Phase 2)

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
