import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/visual",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? "github" : "list",
  use: {
    colorScheme: "light",
    baseURL: "http://127.0.0.1:3000",
    trace: "on-first-retry",
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: [
    { command: "pnpm dev:fan", url: "http://127.0.0.1:3000", reuseExistingServer: !process.env.CI },
    { command: "pnpm dev:runner", url: "http://127.0.0.1:3001", reuseExistingServer: !process.env.CI },
    { command: "pnpm dev:system-admin", url: "http://127.0.0.1:3002", reuseExistingServer: !process.env.CI },
    { command: "pnpm dev:vendor", url: "http://127.0.0.1:3004", reuseExistingServer: !process.env.CI },
  ],
});
