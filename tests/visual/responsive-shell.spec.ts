import { expect, test } from "@playwright/test";

const viewports = [
  [360, 800],
  [390, 844],
  [768, 1024],
  [1024, 768],
  [1280, 800],
  [1440, 900],
  [1800, 888],
  [2560, 1440],
] as const;

const surfaces = [
  { app: "fan", port: 3000, route: "/", shell: "mobile" },
  { app: "runner", port: 3001, route: "/login", shell: "mobile" },
  { app: "system-admin", port: 3002, route: "/login", shell: "workspace" },
  { app: "vendor", port: 3004, route: "/login", shell: "workspace" },
] as const;

for (const [width, height] of viewports) {
  test.describe(`${width}x${height}`, () => {
    test.use({ viewport: { width, height } });

    for (const surface of surfaces) {
      test(`${surface.app} ${surface.route} keeps its ${surface.shell} shell`, async ({ page }) => {
        await page.goto(`http://127.0.0.1:${surface.port}${surface.route}`);
        await expect(page).toHaveTitle(/StadiYums/);

        const geometry = await page.evaluate(() => {
          const viewportHeight = window.innerHeight;
          const viewportShell = Array.from(document.querySelectorAll("[class]"))
            .find((element) => String(element.className).includes("min-h-[100dvh]"));
          return {
            bodyScrollWidth: document.body.scrollWidth,
            viewportWidth: window.innerWidth,
            documentHeight: Math.max(document.documentElement.scrollHeight, document.body.scrollHeight),
            viewportShellHeight: viewportShell?.getBoundingClientRect().height ?? viewportHeight,
            workspace: Boolean(document.querySelector("#workspace-content")),
            mobileFrame: Array.from(document.querySelectorAll("[class]"))
              .some((element) => String(element.className).includes("max-w-[520px]")),
          };
        });

        expect(geometry.bodyScrollWidth).toBeLessThanOrEqual(geometry.viewportWidth);
        expect(geometry.documentHeight).toBeGreaterThanOrEqual(height);
        expect(geometry.viewportShellHeight).toBeGreaterThanOrEqual(height);

        if (surface.shell === "workspace") {
          expect(geometry.workspace).toBe(true);
          expect(geometry.mobileFrame).toBe(false);
        } else {
          expect(geometry.mobileFrame).toBe(true);
        }

        await expect(page).toHaveScreenshot(
          `${width}x${height}-${surface.app}-${surface.route.slice(1) || "home"}.png`,
          {
          fullPage: true,
          animations: "disabled",
          },
        );
      });
    }
  });
}
