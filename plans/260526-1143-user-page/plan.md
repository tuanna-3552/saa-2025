---
title: "User Page Implementation"
description: "Admin User management page: list all users/profiles with kudos stats, filters, export. Nav item renamed from Role → User."
status: completed
priority: P2
effort: 4h
branch: main
tags: [frontend, feature, admin]
blockedBy: []
blocks: []
created: 2026-05-26
completed: 2026-05-26
---

# User Page Implementation

## Overview

Implements the **User** section of the admin panel (nav "Role" renamed to "User" → `/users`).
Displays a table of all user profiles with aggregated kudos/badge stats, department/level/role filters, column sorting, search, and CSV export.

## MoMorph References

| Screen | fileKey | screenId | URL |
|--------|---------|----------|-----|
| User list | `9ypp4enmFmdK3YAFJLIu6C` | `-u1lKib0JL` | https://momorph.ai/files/9ypp4enmFmdK3YAFJLIu6C/screens/-u1lKib0JL |

## Design Analysis (from screenshot)

### Navigation change
- Nav item label: `"Role"` → `"User"`
- Nav item href: `/roles` → `/users`

### Page layout
- Title: **"User"**
- Export button (gold, top-right)
- Filter bar: Department dropdown | Level dropdown | Role dropdown | Search input
- Data table with 11 columns + actions
- No pagination visible in design (show all or implement like nominations)

### Table columns
| Column | Data source | Notes |
|--------|-------------|-------|
| ID | row index (1-based) | Sequential display number |
| User | profiles.full_name + profiles.email + profiles.avatar_url | Avatar + name stacked |
| # sent kudos | COUNT(nominations WHERE nominator_id=user AND status='approved') | Sortable |
| # Received Kudos (%) | COUNT(nominations WHERE nominee_id=user AND status='approved') / total * 100 | Shown as % or highlighted orange if high |
| Total Heart | COUNT(votes WHERE nominee_id=user) | Sortable |
| Level | NOT IN SCHEMA — show "-" | Placeholder until schema extended |
| Number of Badges | COUNT(results WHERE winner_id=user) | Sortable |
| Time to get 4 badges | Date of 4th result win or "-" | Derived from results |
| Last Logged in | NOT IN SCHEMA — show "-" | Requires auth admin API |
| Role | profiles.role (admin → "Admin", employee → "User") | |
| Actions | Dropdown or button | Placeholder (no spec for action behavior) |

### Data gaps (require future work or DB migration)
- `Level` — not in schema; plan shows "-"
- `Last Logged in` — `auth.users.last_sign_in_at` requires service-role key (not safe client-side); show "-"

### Filters
- **Department**: from `departments` table (dynamic list)
- **Level**: static options (N/A since not in schema — show placeholder "All levels")
- **Role**: All | Admin | User (maps to admin | employee)
- **Search**: full_name or email (client-side)

## Phases

| # | Phase | Status | File |
|---|-------|--------|------|
| 1 | [Nav item update](./phase-01-nav-update.md) | ✅ Completed | phase-01-nav-update.md |
| 2 | [User page + hook + components](./phase-02-users-page.md) | ✅ Completed | phase-02-users-page.md |

Phase 1 and 2 are sequential (nav must exist before page is reachable).

## Key Files

**Modify:**
- `front-end/admin/src/components/layout/admin-header.tsx` — nav item label + href

**Create:**
- `front-end/admin/src/app/(admin)/users/page.tsx`
- `front-end/admin/src/hooks/use-users.ts`
- `front-end/admin/src/components/users/users-table.tsx`
- `front-end/admin/src/components/users/user-row.tsx`
- `front-end/admin/src/components/users/users-filter-bar.tsx`

## Key Dependencies

- `front-end/shared-ui/src/types/database.ts` — `profiles`, `nominations`, `votes`, `results`, `departments` types
- `front-end/admin/src/lib/supabase.ts` — Supabase client
- Existing UI primitives: `Button`, `DropdownMenu`, `Input` from `@/components/ui/`
- Existing pattern: nominations page for structural reference
