---
phase: 1
title: "UI Implementation — Homepage SAA"
track: A
status: completed
effort: 6h
completedDate: 2026-05-27
---

# Phase 01 — UI Implementation (Track A)

## MoMorph Refs
- Homepage SAA: https://momorph.ai/files/9ypp4enmFmdK3YAFJLIu6C/screens/i87tDx10uM
- fileKey: `9ypp4enmFmdK3YAFJLIu6C` · screenId: `i87tDx10uM`
- Clarifications: [clarifications.md](./clarifications.md)

## Goal

Implement the full `/home` page UI pixel-perfect per Figma design using `momorph-implement-design` skill.

## Sections to Implement

| Section | Spec Item | Description |
|---------|-----------|-------------|
| Header | A1 | Sticky nav: logo, links, notification bell, language toggle, user account icon |
| Hero / Keyvisual | 3.5, B1–B4 | BG image, ROOT FURTHER title, Coming soon, Countdown, Event info, CTA buttons |
| Root Further Content | B4 | Decorative large type + body paragraphs + quote |
| Awards Section | C1, C2 | Section header + 3-col grid of 6 award cards |
| Sun* Kudos | D1, D2 | Left content block + right illustration image |
| Widget Button | 6 | Fixed pill bottom-right |
| Footer | 7 | Logo + nav links + copyright |

## Key Constraints

- **Runtime:** `export const runtime = 'edge'` on `app/home/page.tsx`
- **Reuse:** `<CountdownTimer>` from `src/components/countdown-timer.tsx` — do not recreate
- **Award images:** Download 6 thumbnails via `mcp__momorph__get_design_item_image` or `get_figma_image`; save to `public/awards/{slug}.png`
- **Language toggle:** VN/EN dropdown, visual only — no translation applied
- **Auth-conditional UI:** Header notification bell + account icon rendered via `<UserMenu>` client component (phase 02 owns implementation; phase 01 uses a shell/placeholder)
- **Linked pages** `/awards`, `/kudos` do not exist yet — use `href="#"` with `TODO` comment

## Out of Scope for This Phase

- Auth session check logic (Phase 02)
- Notification count Supabase query (Phase 02)
- User menu sign-out / admin redirect (Phase 02)
- Widget button action panel contents (Phase 02)
- Tests (Phase 03)

## Integration Contract (for Phase 02)

```typescript
// Header expects:
interface UserMenuProps {
  session: Session | null  // pass null → hides bell + account icon
}

// Notification badge expects:
interface NotificationBadgeProps {
  count: number  // 0 → no badge shown
}
```

## Todo

- [x] Create `app/home/page.tsx` (edge runtime, imports all section components)
- [x] Create `src/components/layout/header.tsx` with UserMenu slot
- [x] Create `src/components/layout/footer.tsx`
- [x] Create `src/components/home/hero-section.tsx` (reuse CountdownTimer)
- [x] Create `src/components/home/root-further-content.tsx`
- [x] Create `src/components/home/awards-section.tsx` + `award-card.tsx`
- [x] Download 6 award thumbnails via MoMorph → `public/awards/`
- [x] Create `src/components/home/kudos-section.tsx`
- [x] Create `src/components/home/widget-button.tsx`
- [x] Create `src/components/auth/user-menu.tsx` shell (Phase 02 fills logic)
- [x] Run visual validation against Figma frame

## Success Criteria

- Page renders at `/home` with all 7 sections visible
- Countdown reuses existing component, reads `NEXT_PUBLIC_EVENT_DATE`
- Award grid: 3-col desktop / 2-col tablet+mobile
- All hover states applied (nav links, award cards, CTA buttons)
- Header is sticky/fixed at top
- Widget button fixed bottom-right
