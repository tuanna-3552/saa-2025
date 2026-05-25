# Phase 2 — Authentication

## Status: pending

## Goal
Login page + admin-role guard protecting all `(admin)/**` routes.

## Files to Create
- `src/contexts/auth-context.tsx`
- `src/hooks/use-auth.ts`
- `src/components/auth/login-form.tsx`
- `src/app/(auth)/login/page.tsx`
- `src/app/(admin)/layout.tsx`

## Files to Modify
- `src/app/layout.tsx` — add `<AuthProvider>`
- `src/app/page.tsx` — redirect to `/dashboard`

## Auth Flow

```
/ → redirect → /dashboard → (admin)/layout checks auth
  not auth → /login
  login form → signInWithPassword → check profile.role
    non-admin → signOut + error
    admin → /dashboard
```

## Success Criteria
- `/` redirects to `/login` when unauthenticated
- Login with employee account → "Access denied" shown
- Login with admin account → redirects to `/dashboard`
- Browser refresh keeps session alive
