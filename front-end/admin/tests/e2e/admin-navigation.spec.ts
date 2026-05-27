import { test, expect } from "@playwright/test";

// All tests here run with the saved admin storageState (see playwright.config.ts)

test.describe("Admin navigation", () => {
  test("dashboard page loads", async ({ page }) => {
    await page.goto("/dashboard");
    await expect(page).toHaveURL(/\/dashboard/);
    // Header should be visible for authenticated admin
    await expect(page.getByRole("banner")).toBeVisible();
  });

  test("navigate to nominations page", async ({ page }) => {
    await page.goto("/dashboard");
    await page.getByRole("link", { name: /nominations/i }).click();
    await expect(page).toHaveURL(/\/nominations/);
  });

  test("navigate to users page", async ({ page }) => {
    await page.goto("/dashboard");
    await page.getByRole("link", { name: /users/i }).click();
    await expect(page).toHaveURL(/\/users/);
  });

  test("navigate to settings page", async ({ page }) => {
    await page.goto("/dashboard");
    await page.getByRole("link", { name: /settings/i }).click();
    await expect(page).toHaveURL(/\/settings/);
  });

  test("sign out redirects to /login", async ({ page }) => {
    await page.goto("/dashboard");
    await page.getByRole("button", { name: /sign out/i }).click();
    await expect(page).toHaveURL(/\/login/, { timeout: 8000 });
  });
});
