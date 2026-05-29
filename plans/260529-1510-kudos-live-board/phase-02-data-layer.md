---
track: B
status: completed
blockedBy: []
---

# Phase 02 — Data Layer

## Context

- Plan: plans/260529-1510-kudos-live-board/plan.md
- Clarifications: plans/260529-1510-kudos-live-board/clarifications.md
- Supabase client: `front-end/landing-page/src/lib/supabase.ts`

## Overview

Create all TypeScript types and Supabase query functions needed by the Kudos page. No UI changes — pure data layer.

## Requirements

### Types (`front-end/landing-page/src/lib/kudos-types.ts`)

```ts
export interface KudoPost {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  senderDepartment: string;
  senderStars: number;         // 0-3 based on received kudos count thresholds
  receiverId: string;
  receiverName: string;
  receiverAvatar: string;
  receiverDepartment: string;
  receiverStars: number;
  content: string;             // max 5 lines displayed in card
  hashtags: string[];          // max 5 shown
  attachmentImages: string[];  // max 5 thumbnails
  likeCount: number;
  likedByCurrentUser: boolean;
  createdAt: string;           // ISO string, display as 'HH:mm - MM/DD/YYYY'
}

export interface HighlightKudo extends KudoPost {}  // top 5 by likeCount

export interface SpotlightRecipient {
  id: string;
  name: string;
  kudosCount: number;
  lastReceivedAt: string;
}

export interface UserStats {
  kudosReceived: number;
  kudosSent: number;
  heartsReceived: number;
  secretBoxesOpened: number;
  secretBoxesUnopened: number;
}

export interface PrizeRecipient {
  id: string;
  name: string;
  avatar: string;
  prizeDescription: string;
  profileUrl: string;
}
```

### Star threshold logic

| Stars | Condition |
|-------|-----------|
| 0 | < 10 kudos received |
| 1 | ≥ 10 kudos received |
| 2 | ≥ 20 kudos received |
| 3 | ≥ 50 kudos received |

### Queries (`front-end/landing-page/src/lib/kudos-api.ts`)

| Function | SQL / Notes |
|----------|-------------|
| `getHighlightKudos(filters)` | Top 5 kudos by like_count; filter by hashtag/department |
| `getAllKudos(filters, cursor)` | Paginated feed (page size 10); cursor = last `created_at` |
| `getSpotlightRecipients()` | All distinct receivers + their kudos count |
| `getTotalKudosCount()` | `SELECT COUNT(*) FROM kudos` |
| `getHashtags()` | Distinct hashtags from DB |
| `getDepartments()` | Distinct sender departments |
| `getUserStats(userId)` | 5 stat values from kudos + secret_boxes tables |
| `getRecentPrizeRecipients()` | Latest 10 secret box winners |
| `toggleLike(kudosId, userId)` | Upsert/delete in kudos_likes; return new like count |
| `getLikedKudosIds(userId)` | Set of kudos IDs current user has liked |

### Like business rules (in `toggleLike`)

- Sender cannot like own kudos (validated server-side)
- One like per user per kudos
- Normal like: +1 heart to sender's profile
- Special day (admin config `special_days` table): +2 hearts
- Unlike: reverse delta (-1 or -2 depending on original like date)

## Implementation Steps

1. Create `front-end/landing-page/src/lib/kudos-types.ts` with all interfaces above
2. Create `front-end/landing-page/src/lib/kudos-api.ts` with all query functions
3. Each function uses `supabase` client from `./supabase.ts`
4. Use `select` with joins where needed (kudos → profiles for sender/receiver info)
5. Run `pnpm --filter landing-page build` to verify no TypeScript errors

## Assumed DB Schema

```sql
-- kudos: id, sender_id, receiver_id, content, hashtags (text[]),
--        attachment_urls (text[]), created_at
-- kudos_likes: id, kudos_id, user_id, created_at
-- profiles: id, full_name, avatar_url, department, kudos_received_count
-- secret_boxes: id, user_id, prize_description, opened_at, created_at
-- special_days: id, date, multiplier (int, e.g. 2)
```

## Success Criteria

- All types compile without errors
- Each API function returns correctly typed data
- `getHighlightKudos` respects hashtag + department filters
- `toggleLike` enforces one-like-per-user, sender-cannot-like-own
- Build passes
