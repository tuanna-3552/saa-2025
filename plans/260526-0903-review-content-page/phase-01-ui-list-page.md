---
phase: 1
title: "UI — Nominations List Page"
track: A
status: completed
---

# Phase 1 — UI: Nominations List Page

## MoMorph Refs
- Screen: https://momorph.ai/files/9ypp4enmFmdK3YAFJLIu6C/screens/MTExSUSdUn
- fileKey: `9ypp4enmFmdK3YAFJLIu6C` · screenId: `MTExSUSdUn`
- Clarifications: [clarifications.md](./clarifications.md)

## Goal
Pixel-perfect static UI for the nominations list page at route `/nominations`.

## Execution
Activate `momorph-implement-design` skill with the screen refs above.
Use Figma design content as mock data. Do NOT invent data.

## Out of Scope
- Real Supabase queries (Phase 3)
- Approve/reject actions (Phase 3)
- Navigation to detail page wiring (Phase 3)

## Integration Contract (for Phase 3)
Expected props/data shape:
```ts
interface NominationRow {
  id: string;
  nominee: { full_name: string; avatar_url: string | null };
  nominator: { full_name: string };
  category: { name: string };
  season: { name: string };
  reason: string | null;
  status: "pending" | "approved" | "rejected";
  created_at: string;
}
```
Output: component at `front-end/admin/src/app/(admin)/nominations/page.tsx` + components under `front-end/admin/src/components/nominations/`.
