# Phase 04: Playwright E2E Setup

**Status:** completed

## Dependencies to install (admin package)

```
@playwright/test
```

## Files to create

- `front-end/admin/playwright.config.ts`
- `front-end/admin/tests/e2e/` directory

## Files to modify

- `front-end/admin/package.json` — add scripts:
  - `"test:e2e": "playwright test"`
  - `"test:e2e:ui": "playwright test --ui"`

## playwright.config.ts key config

```ts
{
  testDir: './tests/e2e',
  use: {
    baseURL: 'http://localhost:3001',
    headless: true,
  },
  webServer: {
    command: 'pnpm dev',
    url: 'http://localhost:3001',
    reuseExistingServer: !process.env.CI,
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
}
```

## Notes

- E2E tests run against the real dev server (not mocked)
- Need `NEXT_PUBLIC_SUPABASE_URL` + `NEXT_PUBLIC_SUPABASE_ANON_KEY` set in `.env` for dev server
- Tests use a dedicated test admin account (email/password from env vars `E2E_ADMIN_EMAIL`, `E2E_ADMIN_PASSWORD`)
- Non-admin test account credentials: `E2E_USER_EMAIL`, `E2E_USER_PASSWORD`
