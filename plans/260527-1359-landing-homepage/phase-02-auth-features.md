---
phase: 2
title: "Auth-Conditional Features"
track: B
status: completed
effort: 3h
completedDate: 2026-05-27
blockedBy: []
---

# Phase 02 — Auth-Conditional Features (Track B)

## Context

- Supabase client: `front-end/landing-page/src/lib/supabase.ts` (browser-only singleton)
- DB: `profiles` table → `role: user_role` enum (`admin` | `employee`)
- No notifications table in current schema → stub with 0 count

## Requirements

### Header Auth Features (spec A1.6–A1.8)

| Feature | Spec | Behavior |
|---------|------|----------|
| Notification bell | A1.6 | Visible when session exists; badge shows unread count (stub: 0) |
| Language toggle | A1.7 | Opens dropdown with VN/EN options; click updates `lang` state (no translation) |
| Account icon | A1.8 | Opens account menu; content depends on role |

### Account Menu (spec A1.8, test ID-36/37/38)

```
All authenticated users:
  - Profile       → href="#" (page not yet built)
  - Sign out      → supabase.auth.signOut() → redirect to /login

Admin role only:
  - Admin Dashboard → href for admin panel (env: NEXT_PUBLIC_ADMIN_URL or hardcoded)
```

### Widget Button Panel (spec 6, test ID-54)

- Renders fixed pill (phase 01 stub)
- Click: toggle open/close a slide-in panel
- Panel content: placeholder "Coming soon" (no real actions yet)

## Architecture

```
app/home/page.tsx (server component, edge)
  ↓ passes session to:
src/components/layout/header.tsx
  └── src/components/auth/user-menu.tsx   ← client component
        ├── NotificationBadge             ← client, queries Supabase
        ├── LanguageToggle                ← client, local state
        └── AccountMenu                  ← client, role-aware
src/components/home/widget-button.tsx     ← client, toggle panel
```

### Session Fetch Strategy

Since `app/home/page.tsx` runs on edge runtime, use client-side session:

```typescript
// page.tsx — server component shells, passes no session
// user-menu.tsx — client component fetches session itself:
const supabase = createBrowserClient(...)
const { data: { session } } = await supabase.auth.getSession()
```

**Why client-side:** Edge runtime has no server-side cookie access with current supabase.ts setup (browser-only singleton). Consistent with login-form.tsx pattern.

### Role Detection

```typescript
// After getSession(), fetch profile:
const { data: profile } = await supabase
  .from('profiles')
  .select('role')
  .eq('id', session.user.id)
  .single()

const isAdmin = profile?.role === 'admin'
```

### Notification Count (stub)

No `notifications` table in schema. Return 0.

```typescript
// notifications-badge.tsx
// TODO: replace with real query when notifications table exists
const unreadCount = 0
```

### Sign Out

```typescript
await supabase.auth.signOut()
router.push('/login')
```

## Related Code Files

**Create:**
- `src/components/auth/user-menu.tsx` — replaces phase 01 shell; full client implementation
- `src/components/auth/account-menu.tsx` — dropdown with role-based items
- `src/components/auth/notification-badge.tsx` — bell icon + badge
- `src/components/auth/language-toggle.tsx` — VN/EN dropdown

**Modify:**
- `src/components/layout/header.tsx` — wire in `<UserMenu>` replacing shell
- `src/components/home/widget-button.tsx` — add panel toggle state

## Implementation Steps

1. Implement `user-menu.tsx` — `useEffect` fetches session + profile on mount
2. Implement `account-menu.tsx` — dropdown, `signOut()`, conditional Admin Dashboard link
3. Implement `notification-badge.tsx` — bell icon, badge when `unreadCount > 0` (stub 0)
4. Implement `language-toggle.tsx` — `useState('VN')`, dropdown opens VN/EN list
5. Wire `UserMenu` into header replacing phase 01 placeholder
6. Implement widget panel toggle in `widget-button.tsx`
7. Test all auth states: unauthenticated / employee / admin

## Todo

- [x] Implement `user-menu.tsx` with session + profile fetch
- [x] Implement `account-menu.tsx` with role-based items + sign out
- [x] Implement `notification-badge.tsx` (stub count = 0)
- [x] Implement `language-toggle.tsx` (VN/EN visual toggle)
- [x] Wire UserMenu into header
- [x] Add widget panel toggle state
- [x] Verify: unauthenticated → no bell/account shown
- [x] Verify: employee → bell + account (no Admin Dashboard)
- [x] Verify: admin → bell + account + Admin Dashboard

## Success Criteria

- Unauthenticated: header shows logo + nav links + language only
- Authenticated: adds notification bell + account icon
- Admin: account menu contains Admin Dashboard entry
- Sign out navigates to `/login`
- Language toggle opens/closes with VN/EN options
- Widget button toggles panel open/close

## Risk Assessment

- **Edge runtime + Supabase client-side only:** No SSR session hydration → slight flicker on auth-dependent UI. Acceptable for now; fix with server-side cookies when needed.
- **No notifications table:** Stub is safe but test ID-28 (badge visible with unread) cannot pass until table exists. Document in clarifications.
