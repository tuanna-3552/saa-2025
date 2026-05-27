---
title: "Landing Page — Homepage SAA (/home)"
description: "Implement the authenticated home page with hero, countdown, awards grid, kudos section, header/footer"
status: complete
priority: P1
effort: 10h
completedDate: 2026-05-27
issue:
branch: main
tags: [frontend, feature, landing-page]
blockedBy: []
blocks: []
created: 2026-05-27
---

# Landing Page — Homepage SAA

## Overview

Implement the `/home` route on the landing portal (public page). Accessible unauthenticated (public content) and authenticated (adds notification bell, account menu). Follows MoMorph spec for "Homepage SAA" (screenId: `i87tDx10uM`).

## MoMorph Refs

| Screen | fileKey | screenId | URL |
|--------|---------|----------|-----|
| Homepage SAA | `9ypp4enmFmdK3YAFJLIu6C` | `i87tDx10uM` | https://momorph.ai/files/9ypp4enmFmdK3YAFJLIu6C/screens/i87tDx10uM |

## Scope Decisions

- **Auth**: Public page; notification bell + account menu shown only when session exists
- **Language**: Visual VN/EN toggle (no actual i18n — stub menu only)
- **Award images**: Download from Figma via MoMorph `get_design_item_image`
- **Notification panel**: Badge shows unread count; bell opens stub panel
- **Widget button**: Renders fixed pill; click opens placeholder panel
- **Linked pages** (`/awards`, `/kudos`): Use placeholder `#` hrefs — pages built later

## Phases

| # | Phase | Track | Status |
|---|-------|-------|--------|
| 01 | [UI Implementation](./phase-01-ui-homepage.md) | A (UI) | ✅ complete |
| 02 | [Auth-Conditional Features](./phase-02-auth-features.md) | B (logic) | ✅ complete |
| 03 | [Tests](./phase-03-tests.md) | B (QA) | ✅ complete |

## Key Files

**Create:**
- `front-end/landing-page/src/app/home/page.tsx`
- `front-end/landing-page/src/components/layout/header.tsx`
- `front-end/landing-page/src/components/layout/footer.tsx`
- `front-end/landing-page/src/components/home/hero-section.tsx`
- `front-end/landing-page/src/components/home/root-further-content.tsx`
- `front-end/landing-page/src/components/home/awards-section.tsx`
- `front-end/landing-page/src/components/home/award-card.tsx`
- `front-end/landing-page/src/components/home/kudos-section.tsx`
- `front-end/landing-page/src/components/home/widget-button.tsx`
- `front-end/landing-page/src/components/auth/user-menu.tsx`
- `front-end/landing-page/public/awards/` (6 award thumbnail images from Figma)

**Reuse:**
- `front-end/landing-page/src/components/countdown-timer.tsx`
- `front-end/landing-page/src/lib/supabase.ts`
- `front-end/landing-page/public/logo.svg`, `public/vn-flag.svg`

## Dependencies

- `@saa/shared-ui` — `cn()` utility
- `@supabase/supabase-js` — session + profile + notification count
