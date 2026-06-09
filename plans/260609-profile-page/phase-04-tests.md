---
phase: 04
title: Tests
status: completed
priority: P1
track: B (QA)
---

# Phase 04 — Tests

## Overview

Unit tests for the new API function and component tests for the profile UI.  
Follow existing test patterns in the codebase (e.g. `kudos-card.test.tsx`, `user-info-block.test.tsx`).

## Context Links

- Existing test patterns: `front-end/landing-page/src/components/kudos/kudos-card.test.tsx`
- API under test: `front-end/landing-page/src/lib/kudos-api.ts`
- Components under test: `front-end/landing-page/src/components/profile/`

## Files to Create

| File | Scope |
|------|-------|
| `components/profile/profile-hero.test.tsx` | Renders avatar, name, badge row |
| `components/profile/profile-stats.test.tsx` | Renders all 5 stat rows; Secret Box button shown only when isOwn |
| `components/profile/profile-feed-section.test.tsx` | Filter dropdown toggles; feed renders KudosCard items |

## Test Cases

### ProfileHero
- Renders `full_name` as heading
- Shows fallback when `avatarUrl` is null
- Renders exactly 6 badge circles

### ProfileStats
- Renders all 5 stat labels and their values
- "Mở Secret Box" button present when `isOwn=true`
- "Mở Secret Box" button absent when `isOwn=false`
- Clicking "Mở Secret Box" opens `SecretBoxDialog`

### ProfileFeedSection
- Renders "Đã nhận" as default active filter
- Clicking "Đã gửi" switches active filter label
- Renders a `KudosCard` per item in the feed prop
- Shows empty state message when feed is empty

## Implementation Steps

1. Read existing test files to match mocking and render patterns
2. Write `profile-hero.test.tsx`
3. Write `profile-stats.test.tsx`
4. Write `profile-feed-section.test.tsx`
5. Run `pnpm --filter landing-page test` — all tests must pass
6. Fix any failures; do NOT ignore or skip failing tests

## Todo

- [ ] Write `profile-hero.test.tsx`
- [ ] Write `profile-stats.test.tsx`
- [ ] Write `profile-feed-section.test.tsx`
- [ ] Run full test suite and confirm all pass

## Success Criteria

- All new tests pass
- No pre-existing tests broken
- No mocks used to force-pass failing assertions
