---
phase: 02
title: Login UI — MoMorph Design
track: A
status: completed
priority: high
effort: medium
---

# Phase 02 — Login UI (MoMorph)

## MoMorph Refs

- Login screen: https://momorph.ai/files/9ypp4enmFmdK3YAFJLIu6C/screens/GzbNeVGJHz
- fileKey: `9ypp4enmFmdK3YAFJLIu6C` | screenId: `GzbNeVGJHz`
- Clarifications: `plans/260527-0853-landing-login-page/clarifications.md`

## Goal

Implement pixel-perfect login UI in `src/components/auth/login-form.tsx` matching the Figma design exactly. Activate `momorph-implement-design` skill to extract all design tokens, layout, and assets from MoMorph.

## Integration Contract (from Phase 01)

The `login-form.tsx` component shell is created in Phase 01 with auth logic. Phase 02 replaces the placeholder markup with the pixel-perfect Figma layout — **auth logic must not be removed**.

Props/callbacks wired up by Phase 01:
- `email`, `password`, `error`, `loading`, `showPassword` state
- `handleSubmit(e)` form handler
- `router.push("/home")` on success

## Out of Scope

- Shadcn component installation — custom elements per Figma only
- Dark/light mode toggle — landing page is always dark theme
- Forgot password flow — not in this screen spec
- `/home` page implementation — placeholder redirect only
