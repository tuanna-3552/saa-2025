---
phase: 2
title: "UI — Nomination Detail / Review Page"
track: A
status: completed
---

# Phase 2 — UI: Nomination Detail / Review Page

## MoMorph Refs
- Screen: https://momorph.ai/files/9ypp4enmFmdK3YAFJLIu6C/screens/kO5qYafrMh
- fileKey: `9ypp4enmFmdK3YAFJLIu6C` · screenId: `kO5qYafrMh`
- Clarifications: [clarifications.md](./clarifications.md)

## Goal
Pixel-perfect static UI for the nomination detail/review page at route `/nominations/[id]`.

## Execution
Activate `momorph-implement-design` skill with the screen refs above.
Use Figma design content as mock data. Do NOT invent data.

## Out of Scope
- Real Supabase queries (Phase 3)
- Approve/reject mutation logic (Phase 3)
- Back navigation wiring (Phase 3)

## Integration Contract (for Phase 3)
Expected props/data shape:
```ts
interface NominationDetail {
  id: string;
  nominee: { full_name: string; avatar_url: string | null; department: string };
  nominator: { full_name: string; department: string };
  category: { name: string; description: string | null };
  season: { name: string };
  reason: string | null;
  status: "pending" | "approved" | "rejected";
  reviewed_by: string | null;
  reviewed_at: string | null;
  created_at: string;
}
type ReviewAction = (id: string, action: "approved" | "rejected") => Promise<void>;
```
Output: component at `front-end/admin/src/app/(admin)/nominations/[id]/page.tsx` + components under `front-end/admin/src/components/nominations/`.
