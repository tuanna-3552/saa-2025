---
title: "Landing Page — Thể lệ panel (float button)"
description: "Implement the Thể lệ right-side drawer triggered by the float button's Thể lệ action."
status: complete
priority: P2
effort: 3h
issue:
branch: main
tags: [frontend, feature, landing-page]
blockedBy: []
blocks: []
created: 2026-05-29
---

# Landing Page — Thể lệ Panel

## Overview

When user clicks "Thể lệ" in the expanded float widget button, a 553px right-side drawer slides in. It shows full program rules (hero badge tiers, 6 Kudos icon collection, Kudos Quốc Dân), with scrollable content and two footer actions: "Đóng" (close) and "Viết KUDOS" (navigate to Kudos form).

## MoMorph Refs

| Screen | fileKey | screenId | URL |
|--------|---------|----------|-----|
| Thể lệ UPDATE | `9ypp4enmFmdK3YAFJLIu6C` | `b1Filzi9i6` | https://momorph.ai/files/9ypp4enmFmdK3YAFJLIu6C/screens/b1Filzi9i6 |

## Scope Decisions

- **Panel type**: Fixed right-side drawer, full viewport height, z-index 300
- **No backdrop**: Design shows no semi-transparent overlay behind panel
- **Scroll**: Content area scrolls; footer buttons stay pinned at bottom
- **Badge pills**: Pure CSS (no image assets) — pill shape with `#FFEA9E` border
- **6 Kudos icon images**: Extract from Figma via MoMorph `get_figma_image` during implementation (node IDs listed in phase-01)
- **"Viết KUDOS" button**: Placeholder href `#` (linked Kudos form frame `520:11602` not built yet)
- **Trigger**: Update `widget-button.tsx` "Thể lệ" button to open panel; reuse existing `PenIcon`

## Phases

| # | Phase | Status |
|---|-------|--------|
| 01 | [UI Implementation](./phase-01-ui-implementation.md) | Complete |
| 02 | [Tests](./phase-02-tests.md) | Complete |

## Key Files

**Create:**
- `front-end/landing-page/src/components/home/the-le-panel.tsx`
- `front-end/landing-page/public/kudos-icons/` (6 × badge PNG extracted from Figma)

**Modify:**
- `front-end/landing-page/src/components/home/widget-button.tsx` (add state + panel render)

## Dependencies

- MoMorph `get_figma_image` — 6 Kudos badge icon images
- `@saa/shared-ui` / `var(--font-montserrat)` — already wired
