---
phase: 1
title: "Nav item update — Role → User"
status: completed
effort: 15m
priority: P1
---

# Phase 01 — Nav Item Update

## Context Links
- Plan: [plan.md](./plan.md)
- File to modify: `front-end/admin/src/components/layout/admin-header.tsx`

## Overview

Single change: rename the "Role" nav item to "User" and update its href to `/users`.

## Related Code Files

**Modify:**
- `front-end/admin/src/components/layout/admin-header.tsx`

## Implementation Steps

1. Open `admin-header.tsx`
2. In the `navItems` array, find the entry `{ label: "Role", href: "/roles" }`
3. Change to `{ label: "User", href: "/users" }`

**Before:**
```typescript
const navItems = [
  { label: "Overview", href: "/dashboard" },
  { label: "Review content", href: "/nominations" },
  { label: "Role", href: "/roles" },
  { label: "Settings", href: "/settings" },
];
```

**After:**
```typescript
const navItems = [
  { label: "Overview", href: "/dashboard" },
  { label: "Review content", href: "/nominations" },
  { label: "User", href: "/users" },
  { label: "Settings", href: "/settings" },
];
```

4. No other changes needed — active state detection is path-based (`pathname.startsWith(item.href)`) and will work correctly for `/users`.

## Todo List

- [x] Change `{ label: "Role", href: "/roles" }` → `{ label: "User", href: "/users" }` in `admin-header.tsx`
- [x] Verify TypeScript compiles with no errors

## Success Criteria

- Nav renders "User" instead of "Role"
- Clicking "User" navigates to `/users`
- Active underline glow appears when on `/users` or any `/users/*` route
