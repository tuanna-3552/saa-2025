# Phase 1 — Schema Migration

**File:** `back-end/supabase/migrations/20260525000000_initial_schema.sql`

## Overview

Creates all enums, tables, indexes, and the `updated_at` auto-trigger.

## Tables

| Table | Purpose |
|-------|---------|
| `departments` | Company departments |
| `profiles` | Employee profiles (linked to auth.users) |
| `seasons` | Award seasons (one per year) |
| `award_categories` | Award types per season |
| `nominations` | Nomination records |
| `votes` | Votes during voting phase |
| `results` | Announced winners |

## Implementation Steps

1. Enable extensions: `uuid-ossp`, `pgcrypto`
2. Create enum types: `season_status`, `nomination_status`, `user_role`
3. Create `departments` table
4. Create `profiles` table (FK → auth.users)
5. Create `seasons` table
6. Create `award_categories` table (FK → seasons)
7. Create `nominations` table (FK → seasons, award_categories, profiles×3)
8. Create `votes` table (FK → seasons, award_categories, profiles×2)
9. Create `results` table (FK → seasons, award_categories, profiles×2)
10. Create `set_updated_at()` trigger function
11. Apply trigger to all tables with `updated_at`
12. Create indexes

## Constraints

- `nominations`: UNIQUE(season_id, category_id, nominee_id, nominator_id)
- `votes`: UNIQUE(season_id, category_id, voter_id) — one vote per voter per category per season

## Success Criteria

- `pnpm db:reset` runs without errors
- Supabase Studio shows all 7 tables in `public` schema
