# Admin Portal — Unit Tests + E2E Tests

**Status:** Completed  
**Branch:** main  
**Scope:** `front-end/admin`

## Overview

Add Jest + React Testing Library unit/component tests and Playwright E2E tests for the admin portal. No tests currently exist.

## Tech Choices

- **Unit/Component:** Jest 29 + `@swc/jest` (fast TS transpilation) + `@testing-library/react` v16 (React 19 support) + `@testing-library/jest-dom`
- **E2E:** `@playwright/test` with Chromium

## Phases

| Phase | Description | Status |
|-------|-------------|--------|
| [Phase 01](phase-01-jest-setup.md) | Jest + RTL setup (config, deps, scripts) | completed |
| [Phase 02](phase-02-unit-tests.md) | Unit tests: lib/format, lib/review-nomination | completed |
| [Phase 03](phase-03-component-tests.md) | Component tests: NominationStatusBadge, LoginForm, AuthContext | completed |
| [Phase 04](phase-04-playwright-setup.md) | Playwright setup (config, deps, scripts) | completed |
| [Phase 05](phase-05-e2e-tests.md) | E2E tests: login flow, protected routes | completed |

## Test Coverage Targets

- `src/lib/format.ts` — 100% (pure functions)
- `src/lib/review-nomination.ts` — happy path + error path
- `src/components/nominations/nomination-status-badge.tsx` — all 3 statuses
- `src/components/auth/login-form.tsx` — submit, error states, password toggle
- `src/contexts/auth-context.tsx` — auth state, signOut
- **E2E:** login flow, non-admin rejection, route protection
