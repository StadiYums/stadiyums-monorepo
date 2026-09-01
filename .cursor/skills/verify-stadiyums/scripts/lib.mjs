import { existsSync, mkdirSync, readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
export const REPO_ROOT = resolve(__dirname, "../../../..");
export const SCRIPTS_DIR = __dirname;

export function runId() {
  const fromEnv = process.env.VERIFY_RUN_ID?.trim();
  if (fromEnv) return fromEnv;
  return `run-${Date.now()}`;
}

export function runDir(id = runId()) {
  return join(REPO_ROOT, ".verification", "stadiyums", id);
}

export function artifactsDir(id = runId()) {
  return join(runDir(id), "artifacts");
}

export function pidsDir(id = runId()) {
  return join(runDir(id), "pids");
}

export function ensureRunLayout(id = runId()) {
  mkdirSync(artifactsDir(id), { recursive: true });
  mkdirSync(pidsDir(id), { recursive: true });
}

export function fanPort() {
  return Number(process.env.VERIFY_FAN_PORT ?? process.env.FAN_PORT ?? 3000);
}

export function fanUrl() {
  return process.env.FAN_URL ?? `http://127.0.0.1:${fanPort()}`;
}

export function readDatabaseUrl() {
  if (process.env.DATABASE_URL?.trim()) {
    return process.env.DATABASE_URL.trim();
  }
  const runStateUrl = join(runDir(), "database.url");
  if (existsSync(runStateUrl)) {
    return readFileSync(runStateUrl, "utf8").trim();
  }
  const envPath = join(REPO_ROOT, ".env.local");
  if (!existsSync(envPath)) {
    return null;
  }
  const match = readFileSync(envPath, "utf8").match(/^DATABASE_URL=(.+)$/m);
  return match?.[1]?.trim() ?? null;
}
