import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/visual",
  testMatch: "order-layout.spec.ts",
  reporter: "list",
  use: {
    baseURL: "http://127.0.0.1:3100",
    colorScheme: "light",
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: {
    command: "pnpm --filter @stadiyums/fan exec next dev --port 3100",
    url: "http://127.0.0.1:3100",
    reuseExistingServer: false,
  },
});
