#!/usr/bin/env node
/**
 * Fan PWA proof: seat → menu → place order → tracker (Drizzle / Server Actions).
 * Run from repo root: node .cursor/skills/verify-stadiyums/scripts/drive-fan-place-order.mjs
 */
import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { chromium } from "@playwright/test";
import { artifactsDir, ensureRunLayout, fanUrl, runId } from "./lib.mjs";

const AISLE = process.env.VERIFY_AISLE ?? "42";
const SEAT = process.env.VERIFY_SEAT ?? "7";
const FAN_URL = fanUrl();

const id = runId();
ensureRunLayout(id);
const out = artifactsDir(id);
const feature = "fan-place-order";

async function main() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  const log = [];
  const step = async (name, fn) => {
    log.push(`STEP ${name}`);
    await fn();
  };

  await step("open-home", async () => {
    await page.goto(FAN_URL, { waitUntil: "networkidle" });
    await page.getByRole("heading", { name: "Find your seat" }).waitFor();
  });

  await step("enter-seat", async () => {
    await page.getByPlaceholder("e.g. 12").fill(AISLE);
    await page.getByPlaceholder("e.g. 8").fill(SEAT);
    await page.getByRole("button", { name: "Continue to order" }).click();
    await page.getByRole("heading", { name: "Order" }).waitFor();
    await page.getByText(`Aisle ${AISLE} · Seat ${SEAT}`).waitFor();
  });

  await step("add-hot-dog", async () => {
    const card = page
      .locator("div")
      .filter({ has: page.getByRole("heading", { name: "Hot Dog" }) })
      .first();
    await card.getByRole("button", { name: "+" }).click();
    await page.getByText("1 items").waitFor();
  });

  await step("place-order", async () => {
    await page.getByRole("button", { name: "Place order →" }).click();
    await page.getByRole("heading", { name: "Order tracker" }).waitFor({
      timeout: 20000,
    });
  });

  await step("tracker-proof", async () => {
    await page.getByText(`Aisle ${AISLE} · Seat ${SEAT}`).waitFor();
    await page.getByText(/#SY-\d+/).waitFor();
    await page.getByText("1 x Hot Dog").waitFor();
  });

  const ariaPath = join(out, `${feature}.aria.txt`);
  const shotPath = join(out, `${feature}.png`);
  const logPath = join(out, `${feature}.log`);

  const snapshot = await page.locator("main").ariaSnapshot();
  writeFileSync(ariaPath, snapshot, "utf8");
  await page.screenshot({ path: shotPath, fullPage: true });
  writeFileSync(logPath, `${log.join("\n")}\n`, "utf8");

  await browser.close();
  console.log(
    JSON.stringify({ feature, runId: id, ariaPath, shotPath, logPath }, null, 2),
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
