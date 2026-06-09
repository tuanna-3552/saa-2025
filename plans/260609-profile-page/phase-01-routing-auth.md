---
phase: 01
title: Routing & Auth
status: completed
priority: P1
---

# Phase 01 — Routing & Auth

## Overview

Create the two Next.js route files. Both are thin server-component wrappers; all logic lives in the shared client component `ProfilePageContent`.

## Context Links

- Plan: [plan.md](./plan.md)
- MoMorph: https://momorph.ai/files/9ypp4enmFmdK3YAFJLIu6C/screens/3FoIx6ALVb
- Auth pattern reference: `front-end/landing-page/src/components/award-system/auth-guard.tsx`
- Home page pattern: `front-end/landing-page/src/app/home/page.tsx`

## Requirements

- Both routes export `runtime = "edge"` (Cloudflare Pages)
- Both routes wrap content in `<AuthGuard>` → unauthenticated users redirect to `/login`
- `/profile` renders `<ProfilePageContent />` (isOwn resolved client-side via session)
- `/profile/[userId]` renders `<ProfilePageContent userId={resolvedUserId} />`
- Read Next.js 15 params API from `node_modules/next/dist/docs/` — params may be a Promise in this version

## Files to Create

- `front-end/landing-page/src/app/profile/page.tsx`
- `front-end/landing-page/src/app/profile/[userId]/page.tsx`

## Implementation Steps

1. Read `node_modules/next/dist/docs/` for dynamic params API in the current Next.js version
2. Create `app/profile/page.tsx`:
   ```tsx
   export const runtime = "edge";
   import AuthGuard from "@/components/award-system/auth-guard";
   import ProfilePageContent from "@/components/profile/profile-page-content";

   export default function ProfilePage() {
     return (
       <AuthGuard>
         <ProfilePageContent />
       </AuthGuard>
     );
   }
   ```
3. Create `app/profile/[userId]/page.tsx` — follow current Next.js 15 dynamic params pattern (may need `await params` or use `use(params)`):
   ```tsx
   export const runtime = "edge";
   import AuthGuard from "@/components/award-system/auth-guard";
   import ProfilePageContent from "@/components/profile/profile-page-content";

   export default async function UserProfilePage({ params }: { params: Promise<{ userId: string }> }) {
     const { userId } = await params;
     return (
       <AuthGuard>
         <ProfilePageContent userId={userId} />
       </AuthGuard>
     );
   }
   ```
4. Run `pnpm --filter landing-page build` (or type-check) to confirm no compile errors

## Todo

- [ ] Read Next.js 15 dynamic params docs
- [ ] Create `app/profile/page.tsx`
- [ ] Create `app/profile/[userId]/page.tsx`
- [ ] Verify TypeScript compiles without errors

## Success Criteria

- Both routes exist and compile
- `AuthGuard` wraps both pages
- `ProfilePageContent` imported (even if not yet created — TS will error, fix in Phase 02)
