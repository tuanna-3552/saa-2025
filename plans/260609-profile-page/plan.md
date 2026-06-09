---
title: "Landing Page — Profile Page (/profile + /profile/[userId])"
description: "Implement own-profile and user-profile pages with hero, stats, kudos feed filter"
status: completed
priority: P1
effort: 6h
created: 2026-06-09
completedDate: 2026-06-09
branch: main
tags: [frontend, feature, landing-page]
blockedBy: []
blocks: []
---

# Landing Page — Profile Page

## MoMorph Refs

| Screen | fileKey | screenId | URL |
|--------|---------|----------|-----|
| Profile bản thân | `9ypp4enmFmdK3YAFJLIu6C` | `3FoIx6ALVb` | https://momorph.ai/files/9ypp4enmFmdK3YAFJLIu6C/screens/3FoIx6ALVb |

## Overview

Implement the `/profile` (own) and `/profile/[userId]` (others) routes.  
Both routes share the same layout:  
- **Section A** — Hero with avatar, name, badge collection  
- **Section B** — Stats card (kudos sent/received, hearts, secret box)  
- **Section C** — Awards + KUDOS header with Received/Sent filter dropdown  
- **Section D** — Kudos feed filtered by the selected tab  

`/profile/[userId]` is read-only (no "Mở Secret Box" button for others).  
Both routes require authentication → redirect to `/login` if unauthenticated.

## Key Decisions

See [clarifications.md](./clarifications.md) for all resolved spec gaps.

- **Feed filter**: "Đã nhận" (default) / "Đã gửi" — two options, count badge per filter
- **URL**: `/profile` = own + `/profile/[userId]` = others; same `ProfilePageContent` component
- **Spam badge**: Omitted — feed shows only `approved` nominations
- **Secret Box stats**: Display values from `getUserStats()` (shows 0 until schema populated); "Mở Secret Box" button on own profile only → opens existing `SecretBoxDialog`
- **Badge collection**: 6 grey placeholder icons (no schema yet, per spec note "Nếu chưa có icon nào thì để icon xám")
- **New API function**: `getProfileKudosFeed(userId, filter, cursor?)` added to `kudos-api.ts`

## Phases

| # | Phase | Track | Status |
|---|-------|-------|--------|
| 01 | [Routing & Auth](./phase-01-routing-auth.md) | B | ✅ complete |
| 02 | [Profile UI Components](./phase-02-profile-ui.md) | A (UI) | ✅ complete |
| 03 | [API Extension & Data Hooks](./phase-03-api-hooks.md) | B | ✅ complete |
| 04 | [Tests](./phase-04-tests.md) | B (QA) | ✅ complete |

Phases 01 → 02 → 03 are sequential. Phase 04 runs after 03.

## Key Files

**Create:**
- `front-end/landing-page/src/app/profile/page.tsx`
- `front-end/landing-page/src/app/profile/[userId]/page.tsx`
- `front-end/landing-page/src/components/profile/profile-page-content.tsx`
- `front-end/landing-page/src/components/profile/profile-hero.tsx`
- `front-end/landing-page/src/components/profile/profile-stats.tsx`
- `front-end/landing-page/src/components/profile/profile-feed-section.tsx`

**Modify:**
- `front-end/landing-page/src/lib/kudos-api.ts` — add `getProfileKudosFeed()`

**Reuse:**
- `components/layout/header.tsx`, `components/layout/footer.tsx`
- `components/award-system/auth-guard.tsx`
- `components/kudos/kudos-card.tsx`
- `components/kudos/secret-box-dialog.tsx`
- `lib/kudos-api.ts` — `getUserStats()`, `KudoPost`
- `lib/kudos-types.ts` — `UserStats`, `KudoPost`
