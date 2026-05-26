# Nominations Review Implementation

**Date**: 2026-05-26 14:30
**Severity**: Medium
**Component**: Admin Panel - Nominations Management
**Status**: Resolved

## What Happened

Implemented the Review Content (Nominations) feature end-to-end: list page with filtering, detail page with approve/reject actions, and all supporting components and hooks. Full cycle from Figma specs through testing and code review.

## The Brutal Truth

This session felt like a masterclass in catching problems before they hit production. The MoMorph tools failed mid-stream, which meant UI agents had to adapt without visual references—they did anyway, which was actually good because it forced stricter adherence to existing design patterns rather than inventing new ones. The real win was the **testing and review stages catching everything that would have been a nightmare later**. Silent auth failures, unhandled mutation errors, unsafe nullable casts—all surface-level implementation mistakes that looked fine in isolation but would have created support tickets if deployed.

## Technical Details

**Supabase FK hint syntax for multi-join:**
```typescript
const { data } = await supabase
  .from('nominations')
  .select(`
    *,
    nominee:profiles!nominations_nominee_id_fkey(id, full_name, email),
    nominator:profiles!nominations_nominator_id_fkey(id, full_name, email),
    reviewed_by_user:profiles!nominations_reviewed_by_fkey(id, full_name, email)
  `)
```

Without explicit FK hints, Supabase assumes all three joins use the same foreign key—breaking data model.

**Silent auth failure pattern fixed:**
```typescript
// Before: mutation accepted client-submitted reviewed_by
reviewNomination({ ...data, reviewed_by: userId })

// After: server-side guard, client cannot override
const reviewError = useRef<string | null>(null);
if (!auth.user?.id) return { error: 'Must be authenticated' };
reviewNomination({ ...data }) // userId sourced server-side only
```

**Nullable join handling:**
```typescript
// Profiles can be null if FK constraint is soft-deleted or missing
nominee: { id: string; full_name: string; email: string } | null
reviewed_by_user: { id: string; full_name: string; email: string } | null
```

All casts removed; types match actual Supabase response shape.

## What We Tried

1. **MoMorph MCP unavailable** → Fallback to existing token set. Agents verified spacing, typography, color against Figma design patterns already in repo. Result: stricter consistency than if they'd had direct visual access.

2. **Initial loading state in `useNomination`** → Set to `true` unconditionally. Tester caught: empty ID still triggers spinner. Changed to `!!id` so unloaded state doesn't appear as "loading." Caught mutation error thrown uncaught—replaced with reviewError state + banner.

3. **Duplicate `formatDate` utility** → Reviewer flagged—extracted to `@saa/shared-ui` to avoid duplication across nominations, applicants, and future features.

4. **Unsafe nullable casts** → Reviewer caught `as unknown as Profile`. Removed all casts, made types explicit. Cost: more verbose but eliminates hidden bugs from type erasure.

## Root Cause Analysis

The real issue was **insufficient defensive programming in the first implementation pass**. Components were written assuming happy-path data shape, with fallbacks added only when tests failed. This is faster to code initially but creates a pile of technical debt that gets addressed in PR review—wasting reviewer time and delaying merge.

The tester and reviewer were essentially doing the job the initial implementation should have done: considering error states, null safety, auth invariants, and code duplication before merging.

## Lessons Learned

1. **Nullable joins are the default in Supabase.** Always check the actual response shape before typing. `as unknown as` is a smell that typing wasn't thought through upfront.

2. **Auth state is a server-side concern.** Never accept sensitive user IDs from client input. Always re-derive from `useAuth()` within mutations or API routes. This one would have become a security debt marker if missed.

3. **FK hint syntax is non-obvious.** For multiple joins to the same table, Supabase requires explicit `!fk_name` syntax. Without it, the query silently returns wrong data. Worth documenting in a shared patterns file for the next developer.

4. **Error states need to live in the component,** not just thrown. UI errors (mutation failures, validation, empty states) should be UI state, not exceptions. Thrown errors are for truly unrecoverable failures, not form validation or business logic rejection.

5. **Duplicate utilities are quick tech debt.** Spotted `formatDate` in three places across two features. Future refactors will have to revisit this. Extract shared patterns early.

## Next Steps

1. **Document Supabase FK hint syntax** in `docs/code-standards.md` under "Data Fetching Patterns"—specifically multi-join and self-join examples.

2. **Add nullable join handling to TypeScript patterns**—show before/after of unsafe casts vs. explicit nullable types.

3. **Monitor for similar auth bypass patterns** in future features. Create a lint rule or PR template checklist: "Auth state always server-side derived?"

4. **Consider shared error-state pattern** for mutations. Current approach (useRef + conditional render) works but could be extracted to a custom hook for consistency.

All work merged to main via commit `be566ad`. Nominations review feature live and ready for staging testing.
