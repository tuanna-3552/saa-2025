# Development Roadmap

## Project: SAA-2025 (Sun Asterisk Award System)

**Goal:** Production-ready award management system with admin panel and public landing page.

---

## Phase 1 — Foundation ✅ Completed

| Task | Status | Date |
|------|--------|------|
| Monorepo setup (pnpm + Turborepo) | ✅ Done | |
| Next.js 16 admin app scaffold | ✅ Done | |
| Next.js 16 landing page scaffold | ✅ Done | |
| Shared UI library (`@saa/shared-ui`) | ✅ Done | |
| CI/CD GitHub Actions | ✅ Done | |
| Cloudflare Pages deploy config | ✅ Done | |
| Supabase local dev config | ✅ Done | |
| Docker compose for direct DB access | ✅ Done | |

---

## Phase 2 — Database Structure ✅ Completed (2026-05-25)

| Task | Status | Notes |
|------|--------|-------|
| Schema design (7 tables) | ✅ Done | departments, profiles, seasons, award_categories, nominations, votes, results |
| Enums (user_role, season_status, nomination_status) | ✅ Done | |
| Indexes + updated_at triggers | ✅ Done | |
| Row Level Security policies | ✅ Done | admin/employee roles via `get_my_role()` |
| TypeScript types in shared-ui | ✅ Done | Generated via `pnpm db:types` |
| Dev seed data | ✅ Done | 5 users, 1 season, 3 categories, 6 nominations, 3 votes |

**Plan:** [260525-1453-database-structure-admin](../plans/260525-1453-database-structure-admin/plan.md)

---

## Phase 3 — Admin UI ✅ Completed (2026-05-26)

| Task | Status | Notes |
|------|--------|-------|
| Auth setup (Supabase Auth + admin guard) | ✅ Done | Email/password login, role guard, session persistence |
| Dashboard — Overview page | ✅ Done | Per-department stats table (MoMorph spec), date range picker, admin header |
| Admin shell (header, layout) | ✅ Done | Logo, nav glow, bell/language/account dropdown |
| Employee management CRUD | ✅ Done | Filter bar (Unit, Level, Role), Search, Table with bi-directional sorting and custom Figma SortIcons, and CSV export |
| Department management CRUD | 🔲 | |
| Season management | ✅ Done | Campaign (Season) CRUD management with name, year, voting start/end datetime boundaries |
| Award categories management | 🔲 | |
| Nomination review (approve/reject) | ✅ Done | List + detail pages, status filter, approve/reject mutations (MoMorph spec) |
| Voting management (open/close periods) | ✅ Done | Direct voting timeframe configuration from Settings screen |
| Results announcement | 🔲 | |

**Plan:** [260526-1358-settings-page](../plans/260526-1358-settings-page/plan.md)

---

## Phase 4 — Landing Page 🔶 In Progress (2026-05-26)

| Task | Status |
|------|--------|
| Public home page (Prelaunch Countdown) | ✅ Done |
| Login page (Google OAuth UI + dev stub) | ✅ Done |
| Homepage (`/home`) — 7-section authenticated landing | ✅ Done (2026-05-27) |
| Award System page (`/he-thong-giai`) — 6 awards + auth guard | ✅ Done (2026-05-29) |
| Kudos Live Board (`/kudos`) — highlight carousel + spotlight + full feed | ✅ Done (2026-05-29) |
| Profile page (`/profile`, `/profile/[userId]`) — hero, stats, kudos feed | ✅ Done (2026-06-09) |
| Nomination form (authenticated employees) | 🔲 |
| Voting page (authenticated employees) | 🔲 |
| Results page | 🔲 |

---

## Phase 5 — Testing & QA 🔶 In Progress (2026-05-27)

| Task | Status | Notes |
|------|--------|-------|
| Unit tests (business logic, hooks) | 🔶 In Progress | ✅ Completed for Admin Portal; ✅ Landing Page homepage (29 tests); 🔲 remaining routes |
| E2E tests (critical flows) | 🔶 In Progress | ✅ Completed for Admin Portal; 🔲 Landing Page pending |
| RLS policy verification | 🔲 Not Started | |
| Performance review | 🔲 Not Started | |

**Plan:** [260527-1308-admin-unit-e2e-tests](../plans/260527-1308-admin-unit-e2e-tests/plan.md)

---

## Phase 6 — Production Deploy 🔲 Not Started

| Task | Status |
|------|--------|
| Supabase production project setup | 🔲 |
| Push migrations to remote | 🔲 |
| Cloudflare Pages production deploy | 🔲 |
| Domain configuration | 🔲 |
| Monitoring setup | 🔲 |
