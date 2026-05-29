/**
 * E2E tests for /award-system page.
 *
 * Requires Playwright + authenticated test session.
 * Run with: pnpm --filter landing-page test:e2e
 *
 * TODO: Add @playwright/test as devDependency and configure playwright.config.ts
 * TODO: Set E2E_USER_EMAIL and E2E_USER_PASSWORD in .env.test for auth setup
 */

import { test, expect } from "@playwright/test";

const BASE_URL = process.env.E2E_BASE_URL ?? "http://localhost:3000";

// Auth setup — runs before each test in this file
test.beforeEach(async ({ page }) => {
  // Sign in via the login page using test credentials
  await page.goto(`${BASE_URL}/login`);
  await page.fill('[name="email"]', process.env.E2E_USER_EMAIL ?? "");
  await page.fill('[name="password"]', process.env.E2E_USER_PASSWORD ?? "");
  await page.click('[type="submit"]');
  await page.waitForURL(`${BASE_URL}/home`);
});

test("ID-2: navigate to /award-system from header 'Award Information' link", async ({
  page,
}) => {
  await page.goto(`${BASE_URL}/home`);
  await page.click('a:has-text("Award Information")');
  await expect(page).toHaveURL(`${BASE_URL}/award-system`);
});

test("ID-3: overall layout — header, nav, main sections, kudos all visible", async ({
  page,
}) => {
  await page.goto(`${BASE_URL}/award-system`);
  await expect(page.locator("header")).toBeVisible();
  await expect(page.locator("nav[aria-label='Danh mục giải thưởng']")).toBeVisible();
  await expect(page.locator("main")).toBeVisible();
  await expect(page.locator("#kudos")).toBeVisible();
});

test("ID-4: title text is displayed correctly", async ({ page }) => {
  await page.goto(`${BASE_URL}/award-system`);
  await expect(page.getByText("Sun* annual awards 2025")).toBeVisible();
  await expect(page.getByText("Hệ thống giải thưởng SAA 2025")).toBeVisible();
});

test("ID-8: Sun* Kudos banner visible with correct content", async ({
  page,
}) => {
  await page.goto(`${BASE_URL}/award-system`);
  await page.locator("#kudos").scrollIntoViewIfNeeded();
  await expect(page.getByText("Sun* Kudos")).toBeVisible();
  await expect(page.getByText("Phong trào ghi nhận")).toBeVisible();
  await expect(page.getByRole("link", { name: /chi tiết/i })).toBeVisible();
});

test("ID-9: clicking nav item scrolls to corresponding award section", async ({
  page,
}) => {
  await page.goto(`${BASE_URL}/award-system`);
  await page.click("button:has-text('Top Project')");
  // After smooth scroll, the top-project section should be in viewport
  const section = page.locator("#top-project");
  await expect(section).toBeInViewport();
});

test("ID-12: Chi tiết button navigates to /kudos", async ({ page }) => {
  await page.goto(`${BASE_URL}/award-system`);
  await page.locator("#kudos").scrollIntoViewIfNeeded();
  // Note: kudos-section.tsx currently links to '#' — update href to '/kudos' to pass this test
  await page.click("a:has-text('Chi tiết')");
  await expect(page).toHaveURL(`${BASE_URL}/kudos`);
});

test("ID-13: page loads without JS errors when sections are present", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (err) => errors.push(err.message));
  await page.goto(`${BASE_URL}/award-system`);
  await page.waitForLoadState("networkidle");
  expect(errors).toHaveLength(0);
});

test("ID-14: /kudos route not found shows graceful error, not uncaught exception", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (err) => errors.push(err.message));
  await page.goto(`${BASE_URL}/kudos`);
  // Should load with 404 or redirect — no uncaught JS error
  expect(errors).toHaveLength(0);
});
