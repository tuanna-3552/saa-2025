---
track: B
status: completed
blockedBy: [phase-01, phase-02]
---

# Phase 03 — Integration

## Context

- Plan: plans/260529-1510-kudos-live-board/plan.md
- Phase 01 output: UI components with mock data props
- Phase 02 output: `kudos-api.ts` + `kudos-types.ts`
- Clarifications: plans/260529-1510-kudos-live-board/clarifications.md

## Overview

Wire real Supabase data into the UI components. Replace mock constants with API calls. Page is server-rendered where possible; interactive sections use `"use client"`.

## Architecture

```
src/app/kudos/page.tsx  (SSR, export const runtime = "edge")
  ├── AuthGuard (client)
  ├── Header
  ├── KudosBanner (static, no data)
  ├── WriteKudosInput (client, local state for dialog)
  ├── HighlightSection (client — filters need interactivity)
  │     data: getHighlightKudos(), getHashtags(), getDepartments()
  ├── SpotlightBoard (client — d3 canvas)
  │     data: getSpotlightRecipients(), getTotalKudosCount()
  ├── KudosFeed (client — infinite scroll + like toggles)
  │     data: getAllKudos(), getLikedKudosIds(userId)
  │     sidebar data: getUserStats(userId), getRecentPrizeRecipients()
  └── Footer
```

## Implementation Steps

1. **`src/app/kudos/page.tsx`**
   - `export const runtime = "edge"`
   - `AuthGuard` wraps entire content
   - Fetch initial data server-side: highlight kudos, hashtags, departments, spotlight recipients, total count, first page of all kudos, user stats, prize recipients
   - Pass as props to client components

2. **HighlightSection** — add `activeHashtag` / `activeDepartment` state; on filter change call `getHighlightKudos(filters)` client-side; reset pagination to slide 1

3. **KudosFeed** — Intersection Observer at list bottom triggers `getAllKudos(filters, cursor)` appending to existing list; filters shared with HighlightSection via lifted state or URL params

4. **Like toggle** — call `toggleLike(kudosId, userId)` on heart click; optimistic UI update (increment count + flip icon color immediately, revert on error); toast on error

5. **Copy link** — `navigator.clipboard.writeText(window.location.origin + '/kudos/' + kudosId)`; show toast `"Link copied — ready to share!"`

6. **Hashtag click** — sets filter state, updates both Highlight carousel and All Kudos feed

7. **Profile tooltip** — on hover show tooltip with name, department, star count (fetched or passed from card data)

8. **WriteKudosInput** → placeholder dialog: modal with text "Tính năng ghi nhận sẽ sớm ra mắt."

9. **SecretBoxDialog** → placeholder modal on "Mở quà" click: "Tính năng mở quà sẽ sớm ra mắt."

10. Run `pnpm --filter landing-page build` — must pass with no errors

## Filter State Sharing

Both HighlightSection and KudosFeed share the same `hashtag` + `department` filter. Lift state to page-level client wrapper or use URL search params (`?hashtag=x&dept=y`) for shareability.

**Decision:** URL search params (better UX — filters survive refresh, are shareable).

## Success Criteria

- `/kudos` loads with real data from Supabase
- Filters update both Highlight carousel and All Kudos feed
- Like toggle works with optimistic UI + error revert
- Copy link writes to clipboard + shows toast
- Infinite scroll loads next page on bottom of feed
- Hashtag click in card sets filter
- Build passes, no runtime errors
