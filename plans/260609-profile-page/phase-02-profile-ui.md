---
phase: 02
title: Profile UI Components
status: completed
priority: P1
track: A (UI)
---

# Phase 02 — Profile UI Components

## Overview

Build the 4 visual components and the top-level `ProfilePageContent` orchestrator.  
Use MoMorph design tokens — **never guess values**.

## Context Links

- MoMorph design: https://momorph.ai/files/9ypp4enmFmdK3YAFJLIu6C/screens/3FoIx6ALVb
- Skill to activate: `momorph-implement-design`
- Existing pattern: `front-end/landing-page/src/components/kudos/kudos-card.tsx`
- Reuse: `header.tsx`, `footer.tsx`, `kudos-card.tsx`, `secret-box-dialog.tsx`
- Types: `front-end/landing-page/src/lib/kudos-types.ts` — `UserStats`, `KudoPost`

## Files to Create

| File | Purpose |
|------|---------|
| `components/profile/profile-page-content.tsx` | Orchestrator — session resolution, data loading, layout |
| `components/profile/profile-hero.tsx` | Section A: keyvisual BG, avatar, name, badge row |
| `components/profile/profile-stats.tsx` | Section B: stats card + Secret Box button |
| `components/profile/profile-feed-section.tsx` | Sections C+D: header, filter dropdown, kudos feed |

## Architecture

```
ProfilePageContent (client, "use client")
  ├── resolves session userId vs prop userId → determines isOwn
  ├── fetches: useProfile, useProfileStats, useProfileFeed (Phase 03 hooks)
  ├── Header
  ├── ProfileHero   (avatar, name, badge collection)
  ├── ProfileStats  (stats card, Secret Box button if isOwn)
  ├── ProfileFeedSection  (filter dropdown + KudosCard feed)
  └── Footer
```

## Component Specs

### ProfileHero
- Full-width keyvisual background (same image as homepage: `public/home/keyvisual-bg.png`)
- Centered avatar: 120px circle, `profiles.avatar_url` with grey fallback
- Name below avatar: `profiles.full_name`, bold white, ~28px
- Badge row: 6 grey circle icons (32×32), label "Bộ sưu tập icon của tôi" below
  - Use `rgba(255,255,255,0.15)` filled circles with grey border — no images (no schema yet)
- Props: `{ avatarUrl: string | null; fullName: string }`

### ProfileStats
- Dark card (bg `#00101A`, border `1px solid #998C5F`, border-radius 12px)
- 5 stat rows, each: label left, value right (bold gold `#FFEA9E`)
  1. "Kudos bạn nhận được:" → `stats.kudosReceived`
  2. "Kudos bạn đã gửi:" → `stats.kudosSent`
  3. "Số tim bạn nhận được:" → `stats.heartsReceived`
  4. "Secret Box bạn đã mở:" → `stats.secretBoxesOpened`
  5. "Secret Box chưa mở:" → `stats.secretBoxesUnopened`
- "Mở Secret Box 🎁" gold CTA button — only if `isOwn === true`; opens `SecretBoxDialog`
- Props: `{ stats: UserStats; isOwn: boolean }`

### ProfileFeedSection
- Header: "Sun* Annual Awards 2025" (label), "KUDOS" (large title)
- Filter dropdown button: shows active filter label + count + chevron-down
  - Options: "Đã nhận ({count})" | "Đã gửi ({count})"
  - Default: "Đã nhận"
  - Simple state toggle (no external library) — dropdown closes on outside click
- Feed: list of `KudosCard` components (reuse existing)
- Infinite scroll / load more: "Xem thêm" button if more records exist (cursor-based, same pattern as kudos page)
- Props: `{ userId: string; receivedCount: number; sentCount: number }`
- Internal state: `filter: 'received' | 'sent'`

### ProfilePageContent
- `"use client"` — all data fetching is client-side
- If `userId` prop omitted → read from `supabase.auth.getSession()` to get own userId
- `isOwn = !userId || userId === session.user.id`
- Shows loading skeleton while data fetches
- Renders full page with Header + sections + Footer

## Implementation Steps

1. Activate `momorph-implement-design` skill
2. Use `mcp__momorph__get_frame_image` with `showDesignItems=true` for pixel-perfect tokens
3. Build `profile-hero.tsx` first (static, no data)
4. Build `profile-stats.tsx` (static with mock props)
5. Build `profile-feed-section.tsx` (with filter state, stub feed list)
6. Build `profile-page-content.tsx` (wires all sections + session logic + auth)
7. Connect real data hooks (Phase 03) in `profile-page-content.tsx`
8. Run visual validation: compare screenshot with Figma design

## Todo

- [ ] Activate momorph-implement-design skill
- [ ] Fetch design tokens via MoMorph MCP
- [ ] Create `profile-hero.tsx`
- [ ] Create `profile-stats.tsx`
- [ ] Create `profile-feed-section.tsx`
- [ ] Create `profile-page-content.tsx`
- [ ] Visual validation loop against Figma frame

## Success Criteria

- Page renders at `/profile` and `/profile/[userId]` without runtime errors
- Visual match to Figma design (keyvisual, stats card, feed layout)
- Filter dropdown switches between Received/Sent
- Secret Box button only visible on own profile
