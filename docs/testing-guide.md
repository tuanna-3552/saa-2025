# SAA-2025 Testing Guide

This guide describes how to run, write, and manage tests for the SAA-2025 workspace, with a focus on the **Admin Portal** (`front-end/admin`).

---

## 📋 Overview

The project uses a two-tier testing system to ensure robustness, regression safety, and design-to-code accuracy:

1. **Unit & Component Tests (Jest + React Testing Library):** Fast, isolated tests for utilities, state contexts, and UI components.
2. **End-to-End Tests (Playwright):** Full-browser tests validating critical user flows, page transitions, and auth security.

---

## 🛠️ Prerequisites

Running E2E tests locally requires:
- **Node.js** >= 20
- **pnpm** >= 9
- **Docker Desktop** (active, for running local Supabase database services)
- **Supabase CLI** (installed automatically via node dev dependencies in `@saa/backend`)

---

## 🧪 Unit & Component Testing (Jest)

Unit and component tests validate logic in complete isolation from external services (e.g., database network calls are fully mocked).

### Test Coverage Areas
- **Pure Helpers:** `src/lib/format.ts` (100% covered)
- **Supabase Mutations:** `src/lib/review-nomination.ts` (happy/error paths mocked)
- **Context State:** `src/contexts/auth-context.tsx` (login status, token handling, signOut)
- **UI Components:**
  - `LoginForm` (email validation, state mutations, password mask toggle)
  - `NominationStatusBadge` (displays different classes for pending, approved, and rejected styles)

### How to Run Unit Tests

#### From the Monorepo Root:
```bash
# Run all unit tests across all workspaces via Turborepo
pnpm test
```

#### Scoped to the Admin Portal:
```bash
# Run Jest only for the admin project
pnpm --filter @saa/admin test

# Run a specific unit test file
pnpm --filter @saa/admin test -- src/lib/format.test.ts

# Watch mode (great for active development)
pnpm --filter @saa/admin exec jest --watch
```

---

## 🚀 End-to-End Testing (Playwright)

E2E tests boot a Chromium browser and interact with the live Admin Portal Next.js application, which connects to a local Supabase backend.

### Test Scenarios
- **Route Guard Protection:** Attempts to visit `/dashboard` when logged out automatically redirects to `/login`.
- **Authentication Flows:**
  - Standard admin credentials log in successfully and redirect to `/dashboard`.
  - Non-admin employee accounts display "Access denied" alert.
  - Invalid credentials show validation alerts.
- **Admin Navigation:** Fully navigates throughout administrative portals (Dashboard, Review content, Users, Settings).

### Local Setup & Run

#### Step 1: Start the Local Backend (Supabase)
Playwright E2E tests require database interactions. You must start the local Supabase stack and ensure the test accounts are seeded:

```bash
# Start local Supabase containers (Auth, DB, Studio)
cd back-end
pnpm db:start

# Reset database schema, run migrations, and inject seed data
pnpm db:reset
```

#### Step 2: Define E2E Environment Variables
Create or append the following E2E test account credentials to your root `.env` or `front-end/admin/.env.local` (default seed credentials already fit these values, making them plug-and-play):

```env
E2E_ADMIN_EMAIL=admin1@saa.local
E2E_ADMIN_PASSWORD=password123
E2E_USER_EMAIL=emp1@saa.local
E2E_USER_PASSWORD=password123
```

#### Step 3: Run the Playwright Suite

##### Headless Mode (Command Line):
```bash
# Run from monorepo root (automatically orchestrates pnpm dev server setup via Playwright)
pnpm test:e2e

# Or from front-end/admin folder directly
cd front-end/admin
pnpm test:e2e
```

##### Interactive UI Mode (Highly Recommended for Debugging):
Playwright's UI mode provides time-travel debugging, screenshots, network tracers, and live locator selection.
```bash
# Start Playwright interactive test runner
pnpm --filter @saa/admin test:e2e:ui
```

---

## 🔄 Test Authentication Flow (Caching Session State)

To avoid logging in before every single test (which is slow and adds network overhead), Playwright is configured with a **global setup** project:

1. **Setup Dependency:** `tests/e2e/fixtures/admin-auth.setup.ts` runs first. It fills the login form using `E2E_ADMIN_EMAIL`, submits it, and verifies it successfully loads the `/dashboard` route.
2. **Session Storage:** Playwright saves the session cookies and localStorage to `tests/e2e/.auth/admin.json`.
3. **Session Inject:** Subsequent E2E test suites (like `admin-navigation.spec.ts`) are configured to automatically load this saved authentication state, starting the test already logged in.

---

## 🤖 CI/CD Automation (GitHub Actions)

All unit and E2E tests run automatically on every Pull Request targetting `main` via the **CI workflow** (`.github/workflows/ci.yml`).

### CI Pipeline Steps:
1. **Checkout & Node setup:** Clones the repository, configures Node 20, and restores `pnpm` caches.
2. **Workspace Lint & Types:** Verifies that no syntax or compiler issues exist.
3. **Execute Unit Tests:** Run `pnpm test` (Jest).
4. **Boot Supabase Stack:** Installs `supabase-cli`, spins up Docker containers, applies migrations, and seeds the test database.
5. **Install Playwright Browsers:** Sets up Playwright's headless Chromium binaries.
6. **Execute E2E Tests:** Launches the dev server and runs full-browser tests against the seeded database, passing target seed credentials via environment variables.

---

## 💡 Developer Guidelines for Writing New Tests

Follow these standards to maintain clean, reliable test suites:

### 1. AAA Pattern (Arrange, Act, Assert)
Write tests clearly divided into Setup, Action, and Assertion stages:
```ts
// Example: src/lib/format.test.ts
test("formatDate formats UTC timestamp to Vietnam Date string", () => {
  // Arrange
  const dateStr = "2026-05-25T15:28:00.000Z";

  // Act
  const result = formatDate(dateStr);

  // Assert
  expect(result).toBe("26/05/2026");
});
```

### 2. Mocking External Services (Unit Tests)
Never make real network requests in unit tests. Mock database clients like Supabase:
```ts
// Mock the supabase client module
jest.mock("@/lib/supabase", () => ({
  supabase: {
    from: jest.fn().mockReturnThis(),
    update: jest.fn().mockReturnThis(),
    eq: jest.fn().mockResolvedValue({ data: null, error: null }),
  },
}));
```

### 3. Cleanup After Tests
Prevent test cross-contamination by restoring mock states in standard hooks:
```ts
afterEach(() => {
  jest.clearAllMocks();
});
```
