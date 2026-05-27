---
name: project-stack
description: Core tech stack — Next.js 16, React 19, Supabase browser-only client, Cloudflare Pages edge runtime
metadata:
  type: project
---

Next.js 16 / React 19 / TypeScript 5 monorepo (pnpm workspaces + Turborepo).

- `front-end/landing-page` — SSR, edge runtime (`export const runtime = "edge"` on route segments), deployed to Cloudflare Pages via `@cloudflare/next-on-pages`
- `front-end/admin` — CSR only, protected admin panel
- `front-end/shared-ui` — shared Shadcn UI + TailwindCSS v4 preset (`@saa/shared-ui`)
- Backend: Supabase (PostgreSQL, Auth, Realtime, Edge Functions)

**Why:** Edge runtime constraint means no Node.js APIs (no `fs`, no server-side Supabase SSR session). Supabase client is browser-only (`getSupabase()` throws if `window === undefined`).

**How to apply:** Flag any attempt to use Node.js APIs or SSR Supabase session in landing-page route handlers. Client components must be `"use client"` to call `getSupabase()`.
