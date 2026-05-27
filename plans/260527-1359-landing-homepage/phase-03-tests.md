---
phase: 3
title: "Tests"
track: B
status: completed
effort: 1h
completedDate: 2026-05-27
blockedBy: []
---

# Phase 03 — Tests (Track B)

## Context

- Test framework: Jest + React Testing Library (landing-page)
- E2E: Playwright (if configured) or Jest DOM
- Pattern: follow `front-end/landing-page` existing test setup

## Unit Tests

### `hero-section.test.tsx`

| Test | Case |
|------|------|
| Renders ROOT FURTHER title | always visible |
| Shows "Coming soon" when `eventDate` is in the future | ID-13, ID-43 |
| Hides "Coming soon" when `eventDate` is past | ID-41, ID-42 |
| Renders ABOUT AWARDS + ABOUT KUDOS buttons | ID-12 |

### `award-card.test.tsx`

| Test | Case |
|------|------|
| Renders title + description + "Chi tiết" link | ID-15 |
| Description truncated at 2 lines (line-clamp-2) | spec C2.1.3 |
| Click image/title/Chi tiết → correct href with hash | ID-47–50 |

### `awards-section.test.tsx`

| Test | Case |
|------|------|
| Renders 6 award cards | spec C2 |
| Grid has 3-col class on desktop | ID-15 |
| Grid has 2-col class on tablet/mobile | ID-16 |

### `user-menu.test.tsx`

| Test | Case |
|------|------|
| Hidden when no session | ID-0 |
| Renders bell + account icon when session exists | ID-1 |
| Account menu: employee → no Admin Dashboard | ID-38 |
| Account menu: admin → Admin Dashboard present | ID-37 |
| Sign out calls `supabase.auth.signOut` | ID-36 |

### `language-toggle.test.tsx`

| Test | Case |
|------|------|
| Shows "VN" by default | ID-10 |
| Click opens VN/EN dropdown | ID-24 |
| Selecting EN updates displayed value | ID-25 |
| Selecting VN from EN updates displayed value | ID-26 |

### `countdown-timer.test.tsx` (already exists — verify integration)

| Test | Case |
|------|------|
| Shows 2-digit zero-padded values | ID-40 |
| `NEXT_PUBLIC_EVENT_DATE` drives calculation | ID-56, ID-57 |

## Test Setup Requirements

- Mock `supabase.ts` for `user-menu` tests (avoid real network)
- Mock `NEXT_PUBLIC_EVENT_DATE` env var in hero-section tests
- Use `@testing-library/user-event` for click/keyboard interactions

## Todo

- [x] Write `hero-section.test.tsx`
- [x] Write `award-card.test.tsx`
- [x] Write `awards-section.test.tsx`
- [x] Write `user-menu.test.tsx` (mock Supabase)
- [x] Write `language-toggle.test.tsx`
- [x] Verify existing `countdown-timer.test.tsx` covers ID-40/56/57 — created
- [x] Run full test suite — all 29 tests pass

## Deferred

- Test ID-28 (notification badge with real unread count) — deferred until notifications table exists
- E2E Playwright tests — deferred to a dedicated E2E plan
- Test ID-60 (invalid env datetime fallback) — edge case, add as stretch goal

## Tests Delivered

- **language-toggle.test.tsx**: 5 tests (ID-10, ID-24, ID-25, ID-26, default state)
- **user-menu.test.tsx**: 5 tests (ID-0, ID-1, ID-36, ID-37, ID-38)
- **hero-section.test.tsx**: 5 tests (title, coming soon logic, CTA buttons)
- **award-card.test.tsx**: 6 tests (ID-15, ID-47–50, line-clamp validation)
- **awards-section.test.tsx**: 4 tests (grid rendering, responsive columns)
- **countdown-timer.test.tsx**: 4 tests (ID-40, ID-56, ID-57, zero-padding)

## Success Criteria

- All listed unit tests pass
- No mocked assertions bypassing real logic
- `pnpm test --filter=landing-page` exits 0
