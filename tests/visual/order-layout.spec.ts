import { expect, test } from "@playwright/test";

const session = {
  v: 1,
  tenant: "platform-default",
  ticket: { section: "108", aisle: "12", seat: "8" },
  cart: { popcorn: 1 },
  activeOrderId: null,
  updatedAt: Date.now(),
};

const fanUrl = process.env.FAN_VISUAL_URL ?? "http://127.0.0.1:3000";

const viewports = [
  { name: "phone", width: 390, height: 844, columns: 1 },
  { name: "desktop", width: 1440, height: 900, columns: 3 },
] as const;

for (const viewport of viewports) {
  test(`fan order layout contracts at ${viewport.name}`, async ({ page }) => {
    await page.setViewportSize(viewport);
    await page.addInitScript((savedSession) => {
      localStorage.setItem("stadiyums.fan.session", JSON.stringify(savedSession));
    }, session);
    await page.goto(`${fanUrl}/order`);

    await expect(page.getByRole("heading", { name: "Order from your seat" })).toBeVisible();
    await expect(page.getByRole("button", { name: /Place order/ })).toBeVisible();

    const geometry = await page.evaluate(() => {
      const rect = (element: Element) => element.getBoundingClientRect();
      const checkout = Array.from(document.querySelectorAll("button")).find((button) =>
        button.textContent?.includes("Place order"),
      );
      const dock = checkout?.closest(".fixed");
      const summary = dock?.querySelector("div.text-sm");
      const seatText = Array.from(document.querySelectorAll("p")).find((paragraph) =>
        paragraph.textContent?.includes("deliver straight to"),
      );
      const seat = seatText?.parentElement?.parentElement;
      const seatIcon = seat?.querySelector("svg");
      const grid = document.querySelector("section > div:last-child");
      const art = grid?.querySelector("div[class*='bg-cream']");

      if (!dock || !summary || !checkout || !seat || !seatIcon || !grid || !art) {
        throw new Error("Order layout markers are missing");
      }

      const dockRect = rect(dock);
      const checkoutRect = rect(checkout);
      const summaryRect = rect(summary);
      const seatRect = rect(seat);
      const iconRect = rect(seatIcon);
      const artRect = rect(art);

      return {
        viewportWidth: window.innerWidth,
        viewportHeight: window.innerHeight,
        scrollWidth: document.documentElement.scrollWidth,
        dockPosition: getComputedStyle(dock).position,
        dock: { left: dockRect.left, right: dockRect.right, bottom: dockRect.bottom },
        checkout: { left: checkoutRect.left, right: checkoutRect.right, bottom: checkoutRect.bottom },
        summary: { left: summaryRect.left, right: summaryRect.right },
        seatIconInset: iconRect.left - seatRect.left,
        columns: getComputedStyle(grid).gridTemplateColumns.trim().split(/\s+/).length,
        artHeight: artRect.height,
      };
    });

    expect(geometry.scrollWidth).toBeLessThanOrEqual(geometry.viewportWidth);
    expect(geometry.dockPosition).toBe("fixed");
    expect(geometry.dock.left).toBe(0);
    expect(geometry.dock.right).toBe(geometry.viewportWidth);
    expect(geometry.dock.bottom).toBe(geometry.viewportHeight);
    expect(geometry.summary.left).toBeGreaterThanOrEqual(20);
    expect(geometry.checkout.right).toBeLessThanOrEqual(geometry.viewportWidth - 20);
    expect(geometry.checkout.bottom).toBeLessThanOrEqual(geometry.viewportHeight - 16);
    expect(geometry.seatIconInset).toBeGreaterThanOrEqual(20);
    expect(geometry.columns).toBe(viewport.columns);
    expect(geometry.artHeight).toBeLessThanOrEqual(144);
  });
}
