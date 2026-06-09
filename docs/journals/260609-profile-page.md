# Profile Page Feature Shipped

**Date**: 2026-06-09
**Severity**: Medium
**Component**: landing-page `/profile` routes
**Status**: Resolved

## What Happened

Delivered two nested routes (`/profile` + `/profile/[userId]`) with Kudos feed, stats cards, hero section, and authentication guard. Navigated a two-track architecture: background implementer handled UI components from Figma while main thread built routing + API integration.

## The Brutal Truth

Parallel execution worked well—both tracks shipped simultaneously without blocking. But we hit a wall with incomplete schema: Secret Box stats return 0 because `user_stats` table isn't populated yet. Badge icons missing because icon schema doesn't exist. Shipped with grey placeholder circles and zeroed counters. Not ideal, but gates on real data exist—easy to swap when schema lands.

The off-by-one bug in pagination nearly made it to production. Reviewer caught it: we were checking `hasMore` wrong, would've skipped pages or repeated data. Small catch, huge impact.

## Technical Details

- **Pagination bug (fixed)**: Fetched `PAGE_SIZE` items, then set `hasMore = data.length > PAGE_SIZE`. Wrong threshold. Fixed: fetch `PAGE_SIZE + 1`, slice to `PAGE_SIZE`, check `data.length > PAGE_SIZE` correctly.
- **In-flight guard**: Added `isLoadingMore` boolean to prevent duplicate append on rapid clicks. One-liner but essential.
- **Error handling**: Profile endpoint now returns `profileRes.error` check instead of silently blank screen on user not found. Uncovers DB misses.
- **Unused prop removal**: `ProfileFeedSection` had unused `userId` prop—cleaned up interface and all test renders.

## What We Tried

- Assumed badge schema existed, built grey placeholders, deployed understanding icons come later
- Used `getUserStats()` for Secret Box stats, knew it would return 0 pre-population
- First-pass pagination didn't guard against double-fetch; reviewer flagged, re-tested with load-more hammer

## Root Cause Analysis

Schema incompleteness (user_stats, badge icons) is a deployment blocker, but not for the UI layer. We shipped a robust shell that accepts real data. The pagination and error-handling bugs came from insufficient edge-case testing during implementation—reviewer's second set of eyes caught what unit tests missed.

## Lessons Learned

- **Two-track execution wins**: UI agents working in parallel with backend logic cuts delivery time. No serialization overhead.
- **Pagination is sneaky**: Off-by-one on cursors and limits is easy to miss in happy-path tests. Always test load-more button hammering.
- **Schema dependencies are gates**: Document what data structure each component needs. Don't guess placeholder values.
- **Reviewer as safety net works**: Formal code review caught 3 correctness issues that unit tests let slip through.

## Next Steps

1. Populate `user_stats` table with real Secret Box aggregate counts
2. Define badge icon schema (6 badge types) and add to DB
3. Update `ProfileHero` component to render real icons instead of grey circles
4. E2E test full profile flow with real data (own + other user profiles)

**Commit**: `a835402` feat(landing-page): add profile page with kudos feed and stats
