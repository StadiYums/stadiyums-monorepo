#!/usr/bin/env node
import { existsSync, mkdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { spawnSync } from "node:child_process";
import { artifactsDir, pidsDir, readConvexUrl, REPO_ROOT, runId } from "./lib.mjs";

const FAN_PORT = Number(process.env.VERIFY_FAN_PORT ?? process.env.FAN_PORT ?? 3000);
const FAN_URL = process.env.FAN_URL ?? `http://127.0.0.1:${FAN_PORT}`;
const RUNNER_PORT = 3001;
const LANDING_PORT = 3003;
const VENDOR_PORT = 3004;

async function portOpen(port) {
  try {
    const response = await fetch(`http://127.0.0.1:${port}/`, {
      redirect: "manual",
      signal: AbortSignal.timeout(3000),
    });
    return response.status >= 200 && response.status < 500;
  } catch {
    return false;
  }
}

function readPid(name) {
  const path = join(pidsDir(), `${name}.pid`);
  if (!existsSync(path)) return null;
  const value = readFileSync(path, "utf8").trim();
  return value || null;
}

function fail(message) {
  console.error(`doctor: FAIL — ${message}`);
  process.exit(1);
}

function ok(message) {
  console.log(`doctor: OK — ${message}`);
}

const id = runId();
console.log(`doctor: run ${id}`);

if (!existsSync(join(REPO_ROOT, "node_modules"))) {
  fail("node_modules missing — run `pnpm install` at repo root.");
}

if (!existsSync(join(REPO_ROOT, "apps/fan/.env.local"))) {
  fail(
    "apps/fan/.env.local missing — symlink to repo root: `ln -sfn ../../.env.local apps/fan/.env.local`",
  );
}

let convexUrl;
try {
  convexUrl = readConvexUrl();
  ok(`Convex URL configured (${convexUrl})`);
} catch (error) {
  fail(error instanceof Error ? error.message : String(error));
}

const fanUp = await portOpen(FAN_PORT);
const fanPid = readPid("fan");
if (fanUp) {
  ok(`Fan app responding on ${FAN_URL}${fanPid ? ` (pid ${fanPid})` : " (not launched by verify)"}`);
} else {
  fail(`Fan app not reachable at ${FAN_URL}/ — run launch.sh or pnpm dev:fan`);
}

try {
  const result = spawnSync(
    "npx",
    ["convex", "run", "orders:getStats"],
    { cwd: REPO_ROOT, encoding: "utf8", timeout: 15000 },
  );
  if (result.status !== 0) {
    fail(
      `Convex query failed — is \`npx convex dev\` running? ${(result.stderr || result.stdout || "").trim()}`,
    );
  }
  ok("Convex deployment answered orders:getStats");
} catch (error) {
  fail(
    `Convex CLI check failed (${error instanceof Error ? error.message : error})`,
  );
}

const fanHtml = await fetch(`${FAN_URL}/`).then((r) => r.text());
if (!fanHtml.includes("Find your seat")) {
  fail("Fan home page did not render seat setup copy.");
}
ok('Fan home shows "Find your seat"');

mkdirSync(artifactsDir(), { recursive: true });
ok(`Artifacts directory ready at ${artifactsDir()}`);

const optional = [
  ["landing", LANDING_PORT],
  ["runner", RUNNER_PORT],
  ["vendor", VENDOR_PORT],
];
for (const [name, port] of optional) {
  if (await portOpen(port)) {
    console.log(`doctor: note — ${name} also up on :${port}`);
  }
}

console.log("doctor: all required checks passed");
