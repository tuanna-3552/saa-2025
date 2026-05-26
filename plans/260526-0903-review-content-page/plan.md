---
title: "Review Content Page"
description: "Admin nomination review: list of all nominations + detail/approve/reject page."
status: completed
priority: P2
effort: 6h
branch: main
tags: [frontend, feature]
blockedBy: []
blocks: []
created: 2026-05-26
completed: 2026-05-26
---

# Review Content Page

## Overview

Implements the "Review content" section of the admin panel (nav → `/nominations`).
Two screens from MoMorph spec: nominations list + nomination detail/review.
Admin can filter by status, open a nomination, then approve or reject it.

## MoMorph References

| Screen | fileKey | screenId | URL |
|--------|---------|----------|-----|
| Review content list | `9ypp4enmFmdK3YAFJLIu6C` | `MTExSUSdUn` | https://momorph.ai/files/9ypp4enmFmdK3YAFJLIu6C/screens/MTExSUSdUn |
| Review content detail | `9ypp4enmFmdK3YAFJLIu6C` | `kO5qYafrMh` | https://momorph.ai/files/9ypp4enmFmdK3YAFJLIu6C/screens/kO5qYafrMh |

## Phases

| # | Phase | Track | Status | File |
|---|-------|-------|--------|------|
| 1 | [UI — Nominations List Page](./phase-01-ui-list-page.md) | A (UI) | ✅ Completed | phase-01-ui-list-page.md |
| 2 | [UI — Nomination Detail / Review Page](./phase-02-ui-detail-page.md) | A (UI) | ✅ Completed | phase-02-ui-detail-page.md |
| 3 | [Backend Integration](./phase-03-backend-integration.md) | B (Backend) | ✅ Completed | phase-03-backend-integration.md |

Phases 1 & 2 run in parallel (independent UI screens). Phase 3 integrates both.

## Key Dependencies

- `back-end/supabase/` — `nominations` table, RLS (admin ALL), seed data
- `front-end/shared-ui/src/types/database.ts` — `Database` type (nominations, profiles, seasons, award_categories)
- `front-end/admin/src/lib/supabase.ts` — Supabase client
- `front-end/admin/src/components/layout/admin-header.tsx` — nav already has `Review content → /nominations`
