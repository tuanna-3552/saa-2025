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

## Phase 3 — Admin UI 🔄 In Progress

| Task | Status | Notes |
|------|--------|-------|
| Auth setup (Supabase Auth + admin guard) | ✅ Done | Email/password login, role guard, session persistence |
| Dashboard — Overview page | ✅ Done | Per-department stats table (MoMorph spec), date range picker, admin header |
| Admin shell (header, layout) | ✅ Done | Logo, nav glow, bell/language/account dropdown |
| Employee management CRUD | 🔲 | |
| Department management CRUD | 🔲 | |
| Season management | 🔲 | |
| Award categories management | 🔲 | |
| Nomination review (approve/reject) | 🔲 | |
| Voting management (open/close periods) | 🔲 | |
| Results announcement | 🔲 | |

**Plan:** [260525-1528-admin-pages-auth-dashboard](../plans/260525-1528-admin-pages-auth-dashboard/plan.md)

---

## Phase 4 — Landing Page 🔲 Not Started

| Task | Status |
|------|--------|
| Public home page | 🔲 |
| Nomination form (authenticated employees) | 🔲 |
| Voting page (authenticated employees) | 🔲 |
| Results page | 🔲 |

---

## Phase 5 — Testing & QA 🔲 Not Started

| Task | Status |
|------|--------|
| Unit tests (business logic, hooks) | 🔲 |
| E2E tests (critical flows) | 🔲 |
| RLS policy verification | 🔲 |
| Performance review | 🔲 |

---

## Phase 6 — Production Deploy 🔲 Not Started

| Task | Status |
|------|--------|
| Supabase production project setup | 🔲 |
| Push migrations to remote | 🔲 |
| Cloudflare Pages production deploy | 🔲 |
| Domain configuration | 🔲 |
| Monitoring setup | 🔲 |
