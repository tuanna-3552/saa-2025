---
title: "Landing Page — Hệ thống giải (/he-thong-giai)"
description: "Implement the authenticated award system page showing 6 award categories with left-nav scroll, keyvisual, and Sun* Kudos promo."
status: complete
priority: P2
effort: 6h
issue:
branch: main
tags: [frontend, feature, landing-page]
blockedBy: []
blocks: []
created: 2026-05-29
completed: 2026-05-29
---

# Landing Page — Hệ thống giải

## Overview

Implement the `/he-thong-giai` route on the landing portal. Auth-gated (unauthenticated → redirect to `/login`). Shows award system overview with 6 award categories using a left-nav + scroll interaction, plus a Sun* Kudos promotional section.

## MoMorph Refs

| Screen | fileKey | screenId | URL |
|--------|---------|----------|-----|
| Hệ thống giải | `9ypp4enmFmdK3YAFJLIu6C` | `zFYDgyj_pD` | https://momorph.ai/files/9ypp4enmFmdK3YAFJLIu6C/screens/zFYDgyj_pD |

## Scope Decisions

- **Auth**: Client-side guard — Supabase browser client checks session on mount, redirects to `/login` if none. (Note: current `supabase.ts` is browser-only; server-side check not feasible without `@supabase/ssr`.)
- **Kudos "Chi tiết" button**: Links to `/kudos` route (page built later — no 404 until that route is missing)
- **Award images**: Extract 336×336px images from Figma via MoMorph `get_design_item_image` for all 6 awards
- **Keyvisual**: Reuse `/home/keyvisual-bg.png` background; different overlay content (no countdown, just title)
- **Left nav sticky**: `position: sticky; top: header-height (80px)` while scrolling
- **KudosSection**: Reuse existing `components/home/kudos-section.tsx` as-is

## Phases

| # | Phase | Track | Status | Date |
|---|-------|-------|--------|------|
| 01 | [UI Implementation](./phase-01-ui-implementation.md) | A (UI) | ✅ Complete | 2026-05-29 |
| 02 | [Auth Guard + Tests](./phase-02-auth-guard-tests.md) | B (logic + QA) | ✅ Complete | 2026-05-29 |

## Key Files

**Create:**
- `front-end/landing-page/src/app/he-thong-giai/page.tsx`
- `front-end/landing-page/src/components/award-system/auth-guard.tsx`
- `front-end/landing-page/src/components/award-system/keyvisual.tsx`
- `front-end/landing-page/src/components/award-system/section-title.tsx`
- `front-end/landing-page/src/components/award-system/award-nav.tsx`
- `front-end/landing-page/src/components/award-system/award-info-card.tsx`
- `front-end/landing-page/public/awards/` (6 × 336×336px images from Figma)

**Reuse (no changes):**
- `front-end/landing-page/src/components/layout/header.tsx`
- `front-end/landing-page/src/components/layout/footer.tsx`
- `front-end/landing-page/src/components/home/kudos-section.tsx`
- `front-end/landing-page/src/components/home/widget-button.tsx`

## Dependencies

- `@supabase/supabase-js` — session check (client-side)
- `@saa/shared-ui` — `cn()` utility
- MoMorph `get_design_item_image` — award image extraction
