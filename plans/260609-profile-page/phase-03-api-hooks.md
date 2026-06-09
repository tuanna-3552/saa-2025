---
phase: 03
title: API Extension & Data Hooks
status: completed
priority: P1
track: B
---

# Phase 03 — API Extension & Data Hooks

## Overview

Extend `kudos-api.ts` with one new function and wire real data into `ProfilePageContent`.  
All existing types (`UserStats`, `KudoPost`) and helpers (`getUserStats`, `KUDOS_SELECT`, `mapKudo`) are already in place — reuse them.

## Context Links

- API file: `front-end/landing-page/src/lib/kudos-api.ts`
- Types: `front-end/landing-page/src/lib/kudos-types.ts`
- Profile component: `front-end/landing-page/src/components/profile/profile-page-content.tsx`

## What Already Exists (Do NOT recreate)

| Symbol | File | Used for |
|--------|------|---------|
| `KUDOS_SELECT` | `kudos-api.ts` | Nomination select with joined sender/receiver |
| `mapKudo(row)` | `kudos-api.ts` | Maps DB row → `KudoPost` |
| `getUserStats(userId)` | `kudos-api.ts` | Returns `UserStats` (kudosReceived, kudosSent, heartsReceived, secretBoxes) |
| `getAllKudos(filters, cursor)` | `kudos-api.ts` | General feed — NOT used here (no userId filter) |
| `UserStats`, `KudoPost` | `kudos-types.ts` | All needed types |

## New Function to Add

Add to `front-end/landing-page/src/lib/kudos-api.ts`:

```ts
/**
 * Fetch approved kudos for a user's profile feed.
 * filter='received' → nominations where nominee_id=userId
 * filter='sent'     → nominations where nominator_id=userId
 * Cursor-based pagination (created_at DESC, limit 10).
 */
export async function getProfileKudosFeed(
  userId: string,
  filter: 'received' | 'sent',
  cursor?: string
): Promise<KudoPost[]> {
  const col = filter === 'received' ? 'nominee_id' : 'nominator_id';
  let q = raw()
    .from('nominations')
    .select(KUDOS_SELECT)
    .eq('status', 'approved')
    .eq(col, userId)
    .order('created_at', { ascending: false })
    .limit(10);
  if (cursor) q = q.lt('created_at', cursor);
  const { data } = await q;
  return (data ?? []).map((r: any) => mapKudo(r));
}
```

## Data Wiring in ProfilePageContent

`profile-page-content.tsx` manages state and calls:

```ts
// On mount + when userId changes
const [profile, setProfile] = useState<Profile | null>(null);
const [stats, setStats]     = useState<UserStats | null>(null);
const [feed, setFeed]       = useState<KudoPost[]>([]);
const [filter, setFilter]   = useState<'received' | 'sent'>('received');
const [cursor, setCursor]   = useState<string | undefined>();
const [hasMore, setHasMore] = useState(true);

// Load profile row
const { data } = await getSupabase().from('profiles').select('id, full_name, avatar_url').eq('id', resolvedUserId).single();

// Load stats
const statsData = await getUserStats(resolvedUserId);

// Load initial feed
const feedData = await getProfileKudosFeed(resolvedUserId, filter);
```

When filter changes → reset feed, cursor, hasMore, re-fetch.  
"Xem thêm" / load more → append next page using last item's `createdAt` as cursor.

## Count for Filter Button Labels

`stats.kudosReceived` → count for "Đã nhận" badge  
`stats.kudosSent` → count for "Đã gửi" badge

## Implementation Steps

1. Open `front-end/landing-page/src/lib/kudos-api.ts`
2. Add `getProfileKudosFeed` function (as above) — keep it minimal, reuse `raw()`, `KUDOS_SELECT`, `mapKudo`
3. Update `profile-page-content.tsx` to call real API functions
4. Handle loading state (skeleton / spinner) and empty state ("Chưa có kudos nào")
5. Run `pnpm --filter landing-page typecheck` — fix any type errors

## Todo

- [ ] Add `getProfileKudosFeed()` to `kudos-api.ts`
- [ ] Wire `getUserStats()` into `ProfilePageContent`
- [ ] Wire `getProfileKudosFeed()` into `ProfilePageContent` with filter state
- [ ] Implement load-more (cursor pagination)
- [ ] Handle loading + empty states
- [ ] Typecheck passes with no errors

## Success Criteria

- Profile page shows real data (name, avatar, stats) from Supabase
- Feed loads and filters correctly between Received / Sent
- Load more appends next page without duplicates
- TypeScript compiles cleanly
