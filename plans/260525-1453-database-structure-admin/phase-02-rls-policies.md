# Phase 2 — RLS Policies

**File:** `back-end/supabase/migrations/20260525000001_rls_policies.sql`

## Overview

Enables Row Level Security on all 7 tables. Uses a helper `get_my_role()` function to read the current user's role from `profiles`.

## Policy Matrix

| Table | admin | employee |
|-------|-------|----------|
| `departments` | ALL | SELECT |
| `profiles` | ALL | SELECT all + UPDATE own row |
| `seasons` | ALL | SELECT |
| `award_categories` | ALL | SELECT |
| `nominations` | ALL | SELECT + INSERT (nominator=self) |
| `votes` | ALL | SELECT own + INSERT (voter=self) |
| `results` | ALL | SELECT |

## Helper Function

```sql
CREATE FUNCTION get_my_role()
RETURNS user_role LANGUAGE sql STABLE SECURITY DEFINER AS $$
  SELECT role FROM profiles WHERE id = auth.uid()
$$;
```

## Implementation Steps

1. Create `get_my_role()` security definer function
2. Enable RLS on all 7 tables
3. Create admin bypass policy per table (role = 'admin')
4. Create employee read policies
5. Create employee write policies (nominations, votes — scoped to self)

## Success Criteria

- Anon key: all queries return empty/error
- Employee JWT: can see departments/seasons/categories, own nominations, own votes
- Admin JWT: full access to all tables
