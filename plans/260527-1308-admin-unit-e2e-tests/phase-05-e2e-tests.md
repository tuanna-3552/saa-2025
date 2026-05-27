# Phase 05: E2E Tests

**Status:** completed

## Files to create

### `tests/e2e/auth.spec.ts`
- successful admin login → redirects to /dashboard
- invalid credentials → shows error message on login page
- non-admin user login → shows "Access denied" error
- logged-out user visiting /dashboard → redirects to /login

### `tests/e2e/admin-navigation.spec.ts`
Fixture: authenticated admin session (storageState)
- /dashboard renders dashboard heading
- nav link to /nominations works
- nav link to /users works
- nav link to /settings works
- sign out → redirects to /login

## Auth helper

Use Playwright `storageState` to avoid re-logging in for every test:
```ts
// tests/e2e/fixtures/admin-auth.setup.ts
// Logs in once, saves auth cookies to file
// playwright.config.ts references this as a setup project
```
