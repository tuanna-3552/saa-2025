import { defineConfig, devices } from "@playwright/test";
import path from "path";

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "list",

  use: {
    baseURL: "http://localhost:3001",
    trace: "on-first-retry",
  },

  projects: [
    // Auth setup project — logs in once and saves session
    {
      name: "setup",
      testMatch: /admin-auth\.setup\.ts/,
    },
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        storageState: path.join(__dirname, "tests/e2e/.auth/admin.json"),
      },
      dependencies: ["setup"],
      // auth.spec.ts is covered by chromium-public (unauthenticated); skip here
      testIgnore: [/admin-auth\.setup\.ts/, /auth\.spec\.ts/],
    },
    // Unauthenticated tests (auth flow itself) run without stored state
    {
      name: "chromium-public",
      use: { ...devices["Desktop Chrome"] },
      testMatch: /auth\.spec\.ts/,
    },
  ],

  webServer: {
    command: "pnpm dev",
    url: "http://localhost:3001",
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
  },
});
