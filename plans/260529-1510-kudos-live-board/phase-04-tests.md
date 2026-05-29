---
track: B
status: completed
blockedBy: [phase-03]
---

# Phase 04 — Tests

## Context

- Plan: plans/260529-1510-kudos-live-board/plan.md
- Clarifications: plans/260529-1510-kudos-live-board/clarifications.md
- Run via: `pnpm --filter landing-page test`

## Test Files to Create

```
front-end/landing-page/src/components/kudos/
  kudos-banner.test.tsx
  write-kudos-input.test.tsx
  highlight-section.test.tsx
  highlight-card.test.tsx
  filter-dropdown.test.tsx
  spotlight-board.test.tsx
  kudos-feed.test.tsx
  kudos-card.test.tsx
  kudos-sidebar.test.tsx
  user-info-block.test.tsx
  hashtag-label.test.tsx
  profile-tooltip.test.tsx
front-end/landing-page/src/lib/
  kudos-api.test.ts
```

## Key Test Cases (from 41 MoMorph TCs)

### GUI / Layout

| Component | Test |
|-----------|------|
| KudosBanner | Renders title "Hệ thống ghi nhận lời cảm ơn" and KUDOS logo |
| WriteKudosInput | Shows pencil icon + pill shape + placeholder text "Hôm nay, bạn muốn gửi lời cảm ơn và ghi nhận đến ai?" |
| WriteKudosInput | Click opens placeholder dialog |
| HighlightSection | Shows subtitle "Sun* Annual Awards 2025" + title "HIGHLIGHT KUDOS" |
| HighlightSection | Shows Hashtag and Phòng ban filter buttons |
| HighlightCard | Renders sender info, receiver info, time, content (3-line truncation), hashtags, like count, Copy Link, Xem chi tiết |
| HighlightCard | Active card visible; inactive cards faded (aria/class check) |
| HighlightSection | Shows carousel with prev/next arrows |
| HighlightSection | Prev arrow disabled on first slide; Next arrow disabled on last slide |
| HighlightSection | Page counter shows "1/5" format |
| SpotlightBoard | Renders total count label (e.g. "388 KUDOS") |
| SpotlightBoard | Search bar shows placeholder "Tìm kiếm" |
| KudosFeed | Shows subtitle "Sun* Annual Awards 2025" + "ALL KUDOS" title |
| KudosFeed | Empty state: renders "Hiện tại chưa có Kudos nào." |
| KudosSidebar | Shows all 5 stat rows (received, sent, hearts, opened boxes, unopened) |
| KudosSidebar | "Mở quà" button visible |
| KudosSidebar | "10 SUNNER NHẬN QUÀ MỚI NHẤT" section visible |
| KudosSidebar | Empty leaderboard shows "Chưa có dữ liệu" |

### Functional / Interaction

| Component | Test |
|-----------|------|
| FilterDropdown (hashtag) | Click opens dropdown; select filters list; clear shows all |
| FilterDropdown (dept) | Click opens dropdown; select filters list; clear shows all |
| HashtagLabel | Click calls onHashtagClick with tag value |
| HighlightCard | Like button click: increments count + changes icon to red (liked state) |
| HighlightCard | Like button click again: decrements count + reverts to gray (unliked) |
| HighlightCard | Sender cannot like own kudos: like button disabled |
| HighlightCard | Copy Link click: calls clipboard.writeText + shows toast |
| HighlightCard | Xem chi tiết: has correct href `/kudos/[id]` |
| KudosCard | Like toggle works same as HighlightCard |
| KudosCard | Copy Link works same |
| KudosSidebar | Mở quà click: opens placeholder dialog |
| ProfileTooltip | Hover shows tooltip with name, department |
| SpotlightBoard | Search input max 100 chars enforced |
| WriteKudosInput | Click opens dialog |

### Validation

| Test |
|------|
| SpotlightBoard search: 100 chars accepted, 101 chars rejected |
| SpotlightBoard search: empty input blocked |

### kudos-api.ts unit tests

| Test |
|------|
| `getHighlightKudos()` returns max 5 items |
| `getHighlightKudos({ hashtag: 'x' })` calls supabase with correct filter |
| `getAllKudos({}, undefined)` returns first 10 items |
| `getAllKudos({}, cursor)` returns items after cursor |
| `toggleLike` — mock supabase — returns updated count |
| Star threshold: 9 kudos → 0 stars, 10 → 1, 20 → 2, 50 → 3 |

## Test Strategy

- Use Vitest + React Testing Library (existing test setup)
- Mock Supabase client in `kudos-api.test.ts`
- Use `vi.fn()` for `navigator.clipboard.writeText`
- Mock `d3-force` / `react-force-graph-2d` in spotlight tests (canvas not available in jsdom)

## Success Criteria

- All tests pass: `pnpm --filter landing-page test`
- No tests skipped to force pass
- Key interaction flows covered per MoMorph TCs
