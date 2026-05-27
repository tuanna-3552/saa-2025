---
title: Landing Page — Login Screen
status: completed
created: 2026-05-27
completed: 2026-05-27
blockedBy: []
blocks: []
---

# Landing Page — Login Screen

## Overview

Implement the `/login` route on the landing portal (public site) so employees and admins can authenticate before accessing `/home`. The route already exists as a redirect target from the prelaunch countdown page.

## MoMorph Refs

| Screen | fileKey | screenId | URL |
|--------|---------|----------|-----|
| Login | `9ypp4enmFmdK3YAFJLIu6C` | `GzbNeVGJHz` | https://momorph.ai/files/9ypp4enmFmdK3YAFJLIu6C/screens/GzbNeVGJHz |

## Key Decisions

- **Post-login redirect**: `/home` (placeholder; voting page built later)
- **Role access**: Employees + Admins both accepted (any valid authenticated user)
- **Supabase client**: Browser-only singleton, same pattern as admin app
- **Auth method**: "Sign in with Google" button (per Figma design); dev-stage stub uses `signInWithPassword` with `NEXT_PUBLIC_DEV_USER_EMAIL` / `NEXT_PUBLIC_DEV_USER_PASSWORD` env vars — no real OAuth
- **No shadcn**: Landing page has no shadcn setup; UI built from scratch per Figma design tokens
- **Edge runtime**: Required — deployed on Cloudflare Pages via `@cloudflare/next-on-pages`

## Phases

| # | Phase | Track | Status |
|---|-------|-------|--------|
| 01 | [Auth Infrastructure](./phase-01-auth-infrastructure.md) | B (logic) | ✅ completed |
| 02 | [Login UI — MoMorph](./phase-02-login-ui.md) | A (UI) | ✅ completed |

## Key Files

**Create:**
- `front-end/landing-page/src/lib/supabase.ts`
- `front-end/landing-page/src/app/login/page.tsx`
- `front-end/landing-page/src/components/auth/login-form.tsx`

**No modifications** to existing files beyond adding the auth client.
