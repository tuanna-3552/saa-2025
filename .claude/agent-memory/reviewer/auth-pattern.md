---
name: auth-pattern
description: Landing-page auth pattern — browser-only Supabase session fetch, UserMenu renders null when unauthenticated, isAdmin via profiles.role query
metadata:
  type: project
---

Auth is entirely client-side. No SSR session exists on the landing page (edge runtime incompatibility).

- `getSupabase()` in `src/lib/supabase.ts` is a singleton factory; throws if called server-side (`window === undefined`)
- `UserMenu` fetches session in `useEffect`, renders `null` until mounted AND session is confirmed
- `isAdmin` is derived from a second Supabase query: `profiles.role === "admin"` — NOT from JWT claims
- `AccountMenu` reads `NEXT_PUBLIC_ADMIN_URL` (defaults to `http://localhost:3001`) to build the admin dashboard link
- No auth checks on the public homepage — correct, page is public

**Why:** Edge runtime on Cloudflare Pages does not support Node.js `crypto`/`fs` used by Supabase SSR helpers. Browser-only client is the deliberate workaround.

**How to apply:** Do not suggest SSR session patterns for this app. Any Supabase call must live inside `"use client"` components behind `useEffect`. Flag if `getSupabase()` is ever called in a Server Component or route handler.
