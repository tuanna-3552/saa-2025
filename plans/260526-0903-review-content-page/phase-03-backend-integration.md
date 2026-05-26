---
phase: 3
title: "Backend Integration"
track: B
status: completed
blockedBy: []
---

# Phase 3 — Backend Integration

## Context Links
- DB schema: [system-architecture.md](../../docs/system-architecture.md)
- Supabase client: `front-end/admin/src/lib/supabase.ts`
- DB types: `front-end/shared-ui/src/types/database.ts`
- Phase 1 UI output: `front-end/admin/src/app/(admin)/nominations/page.tsx`
- Phase 2 UI output: `front-end/admin/src/app/(admin)/nominations/[id]/page.tsx`

## Overview
- **Priority:** P2
- **Status:** ✅ Completed
- Replaced mock data in both UI pages with real Supabase queries. Wired approve/reject actions. Integrated status filter state.

## Requirements

### Functional
- List page: fetch all nominations with joined `profiles` (nominee + nominator), `award_categories`, `seasons`
- List page: filter by `status` (pending / approved / rejected / all) — client-side filter state
- List page: click row navigates to `/nominations/[id]`
- Detail page: fetch single nomination by `id` with same joins
- Detail page: approve button → `UPDATE nominations SET status='approved', reviewed_by=current_user, reviewed_at=now() WHERE id=?`
- Detail page: reject button → same with `status='rejected'`
- After approve/reject: navigate back to list, show updated status
- Loading/error/empty states on both pages

### Non-Functional
- RLS: admin role has ALL on nominations — no additional backend needed
- No optimistic updates (simple: await mutation, then redirect)
- Keep files ≤ 200 lines; split into hooks if page component grows large

## Architecture

### Data Flow
```
nominations list page
  → useNominations() hook
  → supabase.from("nominations")
       .select(`id, status, reason, created_at,
                nominee:profiles!nominee_id(full_name, avatar_url, department:departments(name)),
                nominator:profiles!nominator_id(full_name),
                category:award_categories(name),
                season:seasons(name)`)
       .order("created_at", { ascending: false })

nominations detail page
  → useNomination(id) hook
  → same select + .eq("id", id).single()

reviewNomination(id, action) fn
  → supabase.from("nominations")
       .update({ status: action, reviewed_by: user.id, reviewed_at: new Date().toISOString() })
       .eq("id", id)
```

### File Structure
```
front-end/admin/src/
  hooks/
    use-nominations.ts          # list query hook
    use-nomination.ts           # single nomination query hook
  lib/
    review-nomination.ts        # approve/reject mutation fn
  app/(admin)/
    nominations/
      page.tsx                  # wire useNominations() into Phase 1 UI
      [id]/
        page.tsx                # wire useNomination(id) + reviewNomination into Phase 2 UI
  components/nominations/
    (Phase 1 + 2 components from UI phases — no new files needed here)
```

## Related Code Files

### Create
- `front-end/admin/src/hooks/use-nominations.ts`
- `front-end/admin/src/hooks/use-nomination.ts`
- `front-end/admin/src/lib/review-nomination.ts`

### Modify
- `front-end/admin/src/app/(admin)/nominations/page.tsx` — replace mock data with `useNominations()`
- `front-end/admin/src/app/(admin)/nominations/[id]/page.tsx` — replace mock data with `useNomination(id)` + wire `reviewNomination`

## Implementation Steps

1. **Create `use-nominations.ts` hook**
   ```ts
   // Returns { nominations, loading, error, statusFilter, setStatusFilter }
   // Fetch all nominations with joins (see Architecture above)
   // Client-side filter: if statusFilter !== "all", filter array locally
   ```

2. **Create `use-nomination.ts` hook**
   ```ts
   // Takes id: string
   // Returns { nomination, loading, error }
   // Single nomination with joins (.eq("id", id).single())
   ```

3. **Create `review-nomination.ts` mutation function**
   ```ts
   export async function reviewNomination(
     id: string,
     action: "approved" | "rejected",
     reviewerId: string
   ): Promise<{ error: string | null }>
   // UPDATE nominations SET status, reviewed_by, reviewed_at WHERE id
   ```

4. **Wire Phase 1 list page**
   - Import `useNominations` hook
   - Replace mock array with `nominations` from hook
   - Add `statusFilter` state passed to hook
   - Add `loading` + `error` states to table (reuse dashboard patterns)
   - `onClick` row → `router.push("/nominations/" + id)`

5. **Wire Phase 2 detail page**
   - Get `id` from `useParams()`
   - Import `useNomination(id)` hook
   - Replace mock data with real nomination
   - Wire approve/reject buttons → call `reviewNomination()` → `router.push("/nominations")`
   - Show "already reviewed" state when `status !== "pending"` (disable buttons, show reviewer info)

6. **Build check**
   ```bash
   cd front-end/admin && pnpm type-check
   ```

## Todo List
- [ ] Create `use-nominations.ts`
- [ ] Create `use-nomination.ts`
- [ ] Create `review-nomination.ts`
- [ ] Wire list page with real data + filter
- [ ] Wire detail page with real data + approve/reject
- [ ] Handle loading/error/empty states
- [ ] Type-check passes

## Success Criteria
- `/nominations` loads all nominations from DB, filter buttons work
- Clicking a row navigates to `/nominations/[id]` with correct data
- Approve/reject updates DB, redirects back to list with updated status
- No TypeScript errors (`pnpm type-check` passes)
- Loading and error states handled on both pages

## Risk Assessment
- **Supabase join aliases** — `profiles!nominee_id` / `profiles!nominator_id` foreign key hints are required for self-referential joins on `profiles`. If Supabase client doesn't resolve the aliases, use two separate queries and merge client-side.
- **RLS check** — confirm `get_my_role()` resolves to `admin` in local dev before testing mutations.
- **Type mismatch** — generated DB types may not include joined shapes; define local interface types extending `Database["public"]["Tables"]["nominations"]["Row"]`.

## Security Considerations
- `reviewed_by` MUST be set to the current authenticated user's ID (from `useAuth()`) — never trust client-provided reviewer ID
- Admin role guard already enforced in `app/(admin)/layout.tsx`
- RLS `admin` policy covers UPDATE on nominations — no extra check needed in app layer
