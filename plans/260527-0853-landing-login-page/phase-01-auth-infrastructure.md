---
phase: 01
title: Auth Infrastructure
track: B
status: completed
priority: high
effort: small
---

# Phase 01 — Auth Infrastructure

## Context Links

- Admin Supabase client reference: `front-end/admin/src/lib/supabase.ts`
- Admin login form reference: `front-end/admin/src/components/auth/login-form.tsx`
- Landing page next.config: `front-end/landing-page/next.config.ts` (Supabase env vars already forwarded)
- Plan: `plans/260527-0853-landing-login-page/plan.md`

## Overview

Set up the Supabase browser client for the landing page and create the `/login` route shell. This enables Phase 02 (UI) to wire up auth logic.

## Requirements

- Supabase browser-only singleton client typed with `Database` from `@saa/shared-ui`
- `/login` page: Server Component, `export const runtime = "edge"`, renders `<LoginForm />`
- Login form: Client Component — single "Sign in with Google" button (matches Figma design)
- **Dev-stage stub**: clicking the button calls `signInWithPassword` with hardcoded test credentials (env vars) instead of real OAuth
- On success: redirect to `/home`; on error: show error message

## Architecture

```
src/lib/supabase.ts          ← Browser-only singleton (same as admin)
src/app/login/
  └── page.tsx               ← Server Component, edge runtime, renders <LoginForm>
src/components/auth/
  └── login-form.tsx         ← Client Component, all auth logic here
```

## Implementation Steps

### 1. Create `src/lib/supabase.ts`

Copy the admin pattern exactly — lazy browser singleton:

```ts
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@saa/shared-ui";

let instance: ReturnType<typeof createClient<Database>> | null = null;

export function getSupabase() {
  if (typeof window === "undefined") throw new Error("Browser only");
  if (!instance) {
    instance = createClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
  }
  return instance;
}

export const supabase = new Proxy({} as ReturnType<typeof createClient<Database>>, {
  get: (_, prop) => getSupabase()[prop as keyof ReturnType<typeof createClient<Database>>],
});
```

### 2. Create `src/app/login/page.tsx`

```tsx
export const runtime = "edge";
import LoginForm from "@/components/auth/login-form";

export default function LoginPage() {
  return <LoginForm />;
}
```

### 3. Create `src/components/auth/login-form.tsx` (auth logic shell)

Client component with:
- `useState` for `loading`, `error`
- Single `handleGoogleLogin` handler — **no email/password fields**:
  ```ts
  const email = process.env.NEXT_PUBLIC_DEV_USER_EMAIL!;
  const password = process.env.NEXT_PUBLIC_DEV_USER_PASSWORD!;
  await supabase.auth.signInWithPassword({ email, password });
  router.push("/home");
  ```
- On error: display error message
- UI markup: placeholder structure (one button), filled by Phase 02 from MoMorph design

### 4. Add dev credentials to `next.config.ts`

Add two new env vars to the `env` block in `front-end/landing-page/next.config.ts`:
```ts
NEXT_PUBLIC_DEV_USER_EMAIL: process.env.NEXT_PUBLIC_DEV_USER_EMAIL || "",
NEXT_PUBLIC_DEV_USER_PASSWORD: process.env.NEXT_PUBLIC_DEV_USER_PASSWORD || "",
```

> Dev `.env.local` must have a real Supabase user with these credentials. The seed data already creates test users — confirm email/password with team.

## Success Criteria

- [x] `src/lib/supabase.ts` created, typed, browser-only guard
- [x] `src/app/login/page.tsx` renders with edge runtime
- [x] `login-form.tsx` — "Sign in with Google" button signs in via hardcoded env credentials
- [x] `next.config.ts` forwards `NEXT_PUBLIC_DEV_USER_EMAIL` and `NEXT_PUBLIC_DEV_USER_PASSWORD`
- [x] `pnpm --filter @saa/landing-page type-check` passes

## Security

- Supabase credentials never exposed beyond `NEXT_PUBLIC_*` env vars
- No tokens stored in localStorage manually — Supabase SDK handles session
- Dev stub credentials are **not** committed — kept in `.env.local` only
- Replace stub with real `supabase.auth.signInWithOAuth({ provider: "google" })` when OAuth is configured
