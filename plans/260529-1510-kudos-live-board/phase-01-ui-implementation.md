---
track: A
status: completed
---

# Phase 01 — UI Implementation

## MoMorph Ref

- Sun* Kudos - Live board: https://momorph.ai/files/9ypp4enmFmdK3YAFJLIu6C/screens/MaZUn5xHXZ
- Clarifications: plans/260529-1510-kudos-live-board/clarifications.md

## Goal

Pixel-perfect UI for the full Kudos live board using `momorph-implement-design` skill. All data from mock constants — no API calls in this phase.

## Out of Scope

- Real Supabase queries (Phase 02)
- Submission dialog form (deferred — separate plan)
- Secret Box dialog internals (deferred)
- Kudos detail page `/kudos/[id]` (deferred)
- Supabase Realtime subscriptions

## Integration Contract (props expected by each component)

```ts
// kudos-banner.tsx — no props (static)

// write-kudos-input.tsx — no props (opens placeholder dialog internally)

// highlight-section.tsx
{ kudos: HighlightKudo[]; hashtags: string[]; departments: string[] }

// highlight-card.tsx
{ kudo: HighlightKudo; isActive: boolean; onLike(): void; onCopyLink(): void }

// spotlight-board.tsx
{ recipients: { id: string; name: string; kudosCount: number }[]; totalCount: number }

// kudos-feed.tsx
{ kudos: KudoPost[]; hasMore: boolean; onLoadMore(): void; hashtags: string[]; departments: string[] }

// kudos-card.tsx
{ kudo: KudoPost; onLike(): void; onCopyLink(): void }

// kudos-sidebar.tsx
{ stats: UserStats; recentPrizeRecipients: PrizeRecipient[] }

// user-info-block.tsx
{ avatar: string; name: string; department: string; stars: number; profileUrl: string }

// profile-tooltip.tsx
{ avatar: string; name: string; department: string; stars: number; children: ReactNode }

// hashtag-label.tsx
{ tag: string; onClick(tag: string): void }
```
