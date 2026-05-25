# Phase 4 — Seed Data

**File:** `back-end/supabase/seed.sql`

## Overview

Development seed data for local testing. Does not insert into `auth.users` — profiles use placeholder UUIDs that must be created via Supabase Auth or Studio manually, OR the seed uses `INSERT ... ON CONFLICT DO NOTHING` with known test UUIDs.

## Strategy

Use fixed UUIDs for seed profiles so they're reproducible across `db:reset` runs. Seed does NOT create auth.users entries (Auth handles that separately).

## Seed Content

- **3 departments**: Engineering, Design, Product
- **5 profiles**: 2 admins + 3 employees (with known UUIDs)
- **1 season**: SAA 2025 (status: 'nomination')
- **3 award categories**: Best Innovator, Team Player, Rising Star
- **6 nominations**: 2 per category (status: 'approved')
- **3 votes**: 1 per category

## Implementation Steps

1. INSERT departments (3 rows)
2. INSERT profiles with fixed UUIDs (note: FK to auth.users will fail unless users exist — use `ON CONFLICT DO NOTHING`)
3. INSERT season 2025
4. INSERT award_categories linked to season
5. INSERT nominations (approved)
6. INSERT votes

## Note on auth.users FK

The `profiles.id` FK references `auth.users(id)`. For seed data, either:
- Disable FK during seed (not recommended)
- Insert into `auth.users` directly via SQL (Supabase allows this in migrations)
- Use `INSERT INTO auth.users (id, email) VALUES (...)` before profiles

Chosen approach: seed inserts into `auth.users` directly with minimal required fields.

## Success Criteria

- `pnpm db:reset` completes without FK errors
- Studio shows seed rows in all tables
