---
phase: 2
title: "User page — hook, components, and route"
status: completed
effort: 3.5h
priority: P2
blockedBy: [phase-01]
---

# Phase 02 — User Page

## Context Links
- Plan: [plan.md](./plan.md)
- Design: https://momorph.ai/files/9ypp4enmFmdK3YAFJLIu6C/screens/-u1lKib0JL
- Reference pattern: `front-end/admin/src/app/(admin)/nominations/page.tsx`
- Reference hook: `front-end/admin/src/hooks/use-nominations.ts`

## Overview

Create the `/users` admin page matching the Figma design: a data table showing all user profiles with aggregated stats, filters (department / role / search), sortable columns, and CSV export.

## Architecture

```
app/(admin)/users/page.tsx          ← CSR client component, state, export
  └── components/users/
        ├── users-filter-bar.tsx    ← department dropdown, role dropdown, search
        ├── users-table.tsx         ← table shell + header with sort controls
        └── user-row.tsx            ← single table row
hooks/use-users.ts                  ← Supabase query: profiles + aggregates
```

## Data Strategy

### Hook: `use-users.ts`

Fetches all profiles with their department, then runs parallel aggregate queries:

```typescript
// 1. All profiles with department
const { data: profiles } = await supabase
  .from("profiles")
  .select("id, full_name, email, avatar_url, role, is_active, department_id, departments(id, name)")
  .order("created_at");

// 2. Kudos sent (approved nominations sent by each user)
const { data: kudosSent } = await supabase
  .from("nominations")
  .select("nominator_id")
  .eq("status", "approved");

// 3. Kudos received (approved nominations received by each user)
const { data: kudosReceived } = await supabase
  .from("nominations")
  .select("nominee_id, nominator_id");
// kudos_received_pct = approved_received / total_received * 100 (per user)

// 4. Total hearts (votes received)
const { data: votes } = await supabase
  .from("votes")
  .select("nominee_id");

// 5. Badges won (results)
const { data: results } = await supabase
  .from("results")
  .select("winner_id, announced_at")
  .order("announced_at");
```

Merge in JS: build a Map keyed by `profile.id`, compute aggregates.

### Derived columns
| Column | Derivation |
|--------|-----------|
| `kudos_sent` | count where nominator_id = user.id AND status = 'approved' |
| `kudos_received_pct` | (approved_received / total_received * 100) rounded; 0 if total=0 |
| `total_hearts` | count where votes.nominee_id = user.id |
| `badge_count` | count where results.winner_id = user.id |
| `time_to_4_badges` | announced_at of the 4th result win; null if <4 wins |
| `level` | `null` — not in schema; render "-" |
| `last_logged_in` | `null` — requires auth admin API; render "-" |

### UserRow type
```typescript
type UserRow = {
  id: string;
  full_name: string;
  email: string;
  avatar_url: string | null;
  role: "admin" | "employee";
  department: string | null;
  kudos_sent: number;
  kudos_received_pct: number;
  total_hearts: number;
  level: null;
  badge_count: number;
  time_to_4_badges: string | null; // ISO date string
  last_logged_in: null;
};
```

## Filter Logic (client-side, useMemo)

```typescript
const filtered = useMemo(() => {
  let rows = users;
  if (deptFilter) rows = rows.filter(u => u.department === deptFilter);
  if (roleFilter) rows = rows.filter(u => u.role === roleFilter);
  if (search) {
    const q = search.toLowerCase();
    rows = rows.filter(u =>
      u.full_name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)
    );
  }
  if (sortCol) rows = [...rows].sort(/* by sortCol, sortDir */);
  return rows;
}, [users, deptFilter, roleFilter, search, sortCol, sortDir]);
```

## Sortable Columns

Clicking a sortable column header toggles: asc → desc → none.
Sortable: `kudos_sent`, `kudos_received_pct`, `total_hearts`, `badge_count`, `time_to_4_badges`.

## CSV Export

```
ID,Name,Email,Department,Kudos Sent,Kudos Received (%),Total Hearts,Badges,Time to 4 Badges,Role
```
Same BOM + blob pattern as nominations export.

## Related Code Files

**Create:**
- `front-end/admin/src/hooks/use-users.ts`
- `front-end/admin/src/app/(admin)/users/page.tsx`
- `front-end/admin/src/components/users/users-filter-bar.tsx`
- `front-end/admin/src/components/users/users-table.tsx`
- `front-end/admin/src/components/users/user-row.tsx`

**Read for reference (do not modify):**
- `front-end/admin/src/hooks/use-nominations.ts`
- `front-end/admin/src/app/(admin)/nominations/page.tsx`
- `front-end/admin/src/components/nominations/nominations-table.tsx`
- `front-end/admin/src/components/nominations/nomination-row.tsx`

## Implementation Steps

### Step 1 — Hook (`use-users.ts`)
1. Create `front-end/admin/src/hooks/use-users.ts`
2. Define `UserRow` type (exported)
3. Define `UserListFilters` type: `{ department?: string; role?: string; refreshToken?: number }`
4. Run 5 parallel Supabase queries (profiles + 4 aggregates)
5. Build per-user aggregate maps with `Map<string, ...>`
6. Merge into `UserRow[]`, sort by full_name alphabetically by default
7. Return `{ users, loading, error, departments }` where `departments` = unique dept list for filter dropdown

### Step 2 — Filter bar (`users-filter-bar.tsx`)
Props: `departments: string[]`, `deptFilter`, `roleFilter`, `search`, and their setters.

Render:
- Department `<select>` or `DropdownMenu` — "Chọn phòng ban" placeholder — options from `departments` prop
- Level `<select>` — static, placeholder only ("Chọn Level"), no functional filter (level not in schema)
- Role `<select>` — All / Admin / User
- Search `<input>` with magnifier icon

Style: match nominations filter bar dark theme.

### Step 3 — Table shell (`users-table.tsx`)
Props: `users: UserRow[]`, `loading: boolean`, `sortCol`, `sortDir`, `onSort`.

Renders:
- Header row with 11 columns matching design
- Sort indicator (▲/▼) on sortable columns, click calls `onSort(col)`
- Maps `users` → `<UserRow>` components
- Loading skeleton or spinner state
- Empty state message if `users.length === 0`

### Step 4 — Row component (`user-row.tsx`)
Props: `user: UserRow`, `index: number`.

Renders single `<tr>`:
- ID: `index + 1`
- User: avatar circle (initials fallback) + full_name + email stacked
- `kudos_sent`, `kudos_received_pct` (with % suffix), `total_hearts`
- `level`: render `"-"`
- `badge_count`
- `time_to_4_badges`: format `dd/MM/yyyy HH:mm` or `"-"`
- `last_logged_in`: `"-"`
- Role: `admin` → "Admin", `employee` → "User"
- Actions: icon button (disabled / placeholder — no action spec)

Color rule from design: `kudos_received_pct` values that appear orange/highlighted — apply `text-orange-400` when value > 50 (threshold approximated from screenshot).

### Step 5 — Page (`users/page.tsx`)
```typescript
"use client";
// State: deptFilter, roleFilter, search, sortCol, sortDir
// Hook: useUsers()
// Memo: filtered + sorted users
// CSV export handler
// Render: title "User" + Export button + UsersFilterBar + UsersTable
```

### Step 6 — TypeScript check
Run: `pnpm --filter @saa/admin tsc --noEmit`
Fix any type errors before done.

## Todo List

- [x] Create `use-users.ts` hook with all 5 parallel queries and merge logic
- [x] Create `users-filter-bar.tsx`
- [x] Create `users-table.tsx`
- [x] Create `user-row.tsx`
- [x] Create `app/(admin)/users/page.tsx`
- [x] Run `pnpm --filter @saa/admin tsc --noEmit` — fix all errors

## Success Criteria

- `/users` route renders without errors
- Table shows all profiles with correct aggregated counts
- Department, role, search filters work client-side
- Clicking sortable column headers sorts the table
- Export button downloads a valid CSV
- Nav "User" item is active/glowing when on `/users`
- TypeScript compiles with no errors

## Risk Assessment

| Risk | Likelihood | Mitigation |
|------|-----------|------------|
| Large number of nominations/votes causes slow parallel queries | Low | All queries are aggregate-light; no pagination needed at this scale |
| `departments` relation query syntax | Low | Follow nominations hook pattern for nested select |
| Missing `level`/`last_logged_in` breaks expected UI | None | Render "-" with comment noting future extension |

## Security Considerations

- Page is protected by `(admin)/layout.tsx` auth guard (admin role check)
- No mutation operations on this page — read-only
- No service-role key needed (reads from `profiles`, `nominations`, `votes`, `results` via anon/user key with RLS)
