---
title: "Landing Page — Sun* Kudos Live Board (/kudos)"
description: "Implement the Kudos live board page with KV banner, Highlight carousel, Spotlight word cloud, All Kudos feed, and right sidebar."
status: completed
priority: P1
effort: 12h
issue:
branch: main
tags: [frontend, feature, landing-page, kudos]
blockedBy: []
blocks: []
created: 2026-05-29
completed: 2026-05-29
---

# Landing Page — Kudos Live Board

## Overview

Implement `/kudos` route on the landing portal. Auth-gated (redirect to `/login` if unauthenticated). Full live board showing top Kudos, spotlight word cloud, full feed with filtering, and personal stats sidebar.

## MoMorph Refs

| Screen | fileKey | screenId | URL |
|--------|---------|----------|-----|
| Sun* Kudos - Live board | `9ypp4enmFmdK3YAFJLIu6C` | `MaZUn5xHXZ` | https://momorph.ai/files/9ypp4enmFmdK3YAFJLIu6C/screens/MaZUn5xHXZ |

## Clarifications

See [clarifications.md](./clarifications.md) for all resolved decisions.

## Phases

| # | Phase | Track | Status |
|---|-------|-------|--------|
| 01 | [UI Implementation](./phase-01-ui-implementation.md) | A (UI) | ✅ Completed |
| 02 | [Data Layer](./phase-02-data-layer.md) | B (backend) | ✅ Completed |
| 03 | [Integration](./phase-03-integration.md) | B (wire) | ✅ Completed |
| 04 | [Tests](./phase-04-tests.md) | B (QA) | ✅ Completed |

Track A and Track B are parallel (A=UI with mock data, B=data layer). Integration merges them.

## Key Files

**Create:**
- `front-end/landing-page/src/app/kudos/page.tsx`
- `front-end/landing-page/src/components/kudos/kudos-banner.tsx`
- `front-end/landing-page/src/components/kudos/write-kudos-input.tsx`
- `front-end/landing-page/src/components/kudos/highlight-section.tsx`
- `front-end/landing-page/src/components/kudos/highlight-card.tsx`
- `front-end/landing-page/src/components/kudos/filter-dropdown.tsx`
- `front-end/landing-page/src/components/kudos/spotlight-board.tsx`
- `front-end/landing-page/src/components/kudos/kudos-feed.tsx`
- `front-end/landing-page/src/components/kudos/kudos-card.tsx`
- `front-end/landing-page/src/components/kudos/kudos-sidebar.tsx`
- `front-end/landing-page/src/components/kudos/user-info-block.tsx`
- `front-end/landing-page/src/components/kudos/hashtag-label.tsx`
- `front-end/landing-page/src/components/kudos/profile-tooltip.tsx`
- `front-end/landing-page/src/components/kudos/secret-box-dialog.tsx`
- `front-end/landing-page/src/lib/kudos-api.ts`

**Reuse (no changes):**
- `front-end/landing-page/src/components/award-system/auth-guard.tsx`
- `front-end/landing-page/src/components/layout/header.tsx`
- `front-end/landing-page/src/components/layout/footer.tsx`
- `front-end/landing-page/src/lib/supabase.ts`

## Dependencies

- `react-force-graph-2d` or `d3-force` — Spotlight word cloud
- `@supabase/supabase-js` — data fetching
- MoMorph `get_figma_image` / `get_design_item_image` — extract KV banner background image
- `@saa/shared-ui` — `cn()` utility
