---
name: project-stack
description: Admin panel stack, DB schema, and key architectural patterns used across features
metadata:
  type: project
---

Stack: Next.js 16, React 19, TypeScript 5, Supabase (PostgreSQL + RLS + Auth), TailwindCSS v4, CSR only.

DB tables: profiles, departments, seasons, award_categories, nominations, votes, results.
- `results` has a UNIQUE constraint on (season_id, category_id) — one winner per category per season.
- `results.announced_at` is a TIMESTAMPTZ, not nullable.
- RLS: admin role gets full access to all tables via `get_my_role()` SECURITY DEFINER function.

Pattern: custom hook (useEffect + Promise.all + cancelled flag) → useMemo filter/sort in page → presentational components.
CSV export uses BOM prefix for Excel Vietnamese compatibility.

**Why:** All new feature pages should follow this exact pattern for consistency.
**How to apply:** When reviewing new hooks, check cancelled-flag cleanup, error propagation, and that filters are applied client-side via useMemo not re-fetching.
