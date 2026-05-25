# Phase 3 — Dashboard (MoMorph)

## Status: pending

## MoMorph Reference
- URL: `https://momorph.ai/files/9ypp4enmFmdK3YAFJLIu6C/screens/9ja9g9iJLW`
- fileKey: `9ypp4enmFmdK3YAFJLIu6C`
- screenId: `9ja9g9iJLW`

## Goal
Pixel-perfect dashboard overview screen from Figma design.

## Files to Create
- `src/app/(admin)/dashboard/page.tsx`
- `src/components/dashboard/stats-card.tsx`
- `src/components/dashboard/season-status-badge.tsx`
- `src/components/layout/sidebar.tsx`
- `src/components/layout/header.tsx`

## Dashboard Data

| Stat | Source |
|------|--------|
| Total active employees | `profiles` WHERE `is_active=true` COUNT |
| Pending nominations | `nominations` WHERE `status='pending'` COUNT |
| Approved nominations | `nominations` WHERE `status='approved'` COUNT |
| Active season | `seasons` WHERE `status IN ('nomination','voting')` |
| Total votes (current season) | `votes` WHERE `season_id=activeSeasonId` COUNT |

## Pre-implementation
Fetch MoMorph design FIRST: `get_frame("9ja9g9iJLW")` + `download_specs` + `download_test_cases`

## Success Criteria
- Dashboard displays all 5 stats from Supabase
- Layout matches MoMorph design pixel-perfectly
- No console errors
