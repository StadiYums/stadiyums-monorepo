#!/usr/bin/env node
import { existsSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { spawnSync } from "node:child_process";
import {
  artifactsDir,
  fanPort,
  fanUrl,
  pidsDir,
  readDatabaseUrl,
  REPO_ROOT,
  runId,
} from "./lib.mjs";

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

function fail(message) {
  console.error(`doctor: FAIL — ${message}`);
  process.exit(1);
}

function ok(message) {
  console.log(`doctor: OK — ${message}`);
}

const id = runId();
const port = fanPort();
const url = fanUrl();
console.log(`doctor: run ${id}`);

if (!existsSync(join(REPO_ROOT, "node_modules"))) {
  fail("node_modules missing — run `pnpm install` at repo root.");
}

const databaseUrl = readDatabaseUrl();
if (!databaseUrl) {
  fail(
    "DATABASE_URL not set — copy .env.example to .env.local and set a Neon PostgreSQL URL, or export DATABASE_URL.",
  );
}
ok("DATABASE_URL configured");

const migrate = spawnSync("pnpm", ["db:migrate"], {
  cwd: REPO_ROOT,
  encoding: "utf8",
  timeout: 60000,
  env: { ...process.env, DATABASE_URL: databaseUrl },
});
if (migrate.status !== 0) {
  fail(`db:migrate failed — ${(migrate.stderr || migrate.stdout || "").trim()}`);
}
ok("Drizzle migrations applied");

const seed = spawnSync("pnpm", ["db:seed"], {
  cwd: REPO_ROOT,
  encoding: "utf8",
  timeout: 30000,
  env: { ...process.env, DATABASE_URL: databaseUrl },
});
if (seed.status !== 0) {
  fail(`db:seed failed — ${(seed.stderr || seed.stdout || "").trim()}`);
}
ok("Demo seed reachable (ensureSeeded)");

const fanUp = await portOpen(port);
if (fanUp) {
  const fanPid = existsSync(join(pidsDir(id), "fan.pid"))
    ? " (launched by verify)"
    : " (not launched by verify)";
  ok(`Fan app responding at ${url}${fanPid}`);
} else {
  fail(`Fan app not reachable at ${url}/ — run launch.sh or pnpm dev:fan`);
}

const fanHtml = await fetch(`${url}/`).then((r) => r.text());
if (!fanHtml.includes("Find your seat")) {
  fail('Fan home did not render "Find your seat".');
}
ok('Fan home shows "Find your seat"');

mkdirSync(artifactsDir(id), { recursive: true });
ok(`Artifacts directory ready at ${artifactsDir(id)}`);

for (const [name, optionalPort] of [
  ["landing", LANDING_PORT],
  ["runner", RUNNER_PORT],
  ["vendor", VENDOR_PORT],
]) {
  if (await portOpen(optionalPort)) {
    console.log(`doctor: note — ${name} also up on :${optionalPort}`);
  }
}

console.log("doctor: all required checks passed");
