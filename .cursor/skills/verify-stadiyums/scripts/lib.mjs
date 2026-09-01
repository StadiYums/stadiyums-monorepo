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

export function readConvexUrl() {
  const envPath = join(REPO_ROOT, ".env.local");
  if (!existsSync(envPath)) {
    throw new Error("Missing repo-root .env.local — run `npx convex dev` once to create it.");
  }
  const match = readFileSync(envPath, "utf8").match(/^NEXT_PUBLIC_CONVEX_URL=(.+)$/m);
  if (!match?.[1]) {
    throw new Error("NEXT_PUBLIC_CONVEX_URL not found in .env.local");
  }
  return match[1].trim();
}
