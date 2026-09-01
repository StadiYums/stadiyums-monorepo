---
name: verify-stadiyums
description: Launch and drive the StadiYums monorepo (Fan PWA primary; Runner, Vendor, Landing secondary) against the shared Convex dev backend. Use when you need scripted proof of user-facing behavior — seat setup, ordering, queue, scaffold logins — with screenshots and ARIA snapshots.
---

# Verify StadiYums

StadiYums is a **pnpm + Turborepo** monorepo with four Next.js product apps and one local landing page, all backed by **Convex** at the repo root. The primary verification surface is the **Fan PWA** (`http://127.0.0.1:3000`). Secondary surfaces: Runner (`:3001`), System admin (`:3002`), Landing (`:3003`), Vendor (`:3004`).

Read [features/README.md](./features/README.md) before driving. Each feature file is the recipe; this skill covers launch, health checks, harness setup, evidence, and teardown.

**Isolation:** Fan cart/seat state lives in React memory only (fresh browser = clean session). **Convex orders persist** in your dev deployment — verification places real rows. Use distinctive aisle/seat values (defaults `42` / `7`) and avoid `demo.resetDemo` unless you intend to wipe seed data.

**Do not double-drive:** Ports are fixed. If Fan (`3000`) or Convex is already owned by your personal `pnpm dev` / `npx convex dev`, either use that stack (skip `launch.sh`) or stop it first. `launch.sh` refuses to bind when a foreign process holds `:3000`.

## Launch

From repo root, with helpers on your path or via explicit paths under `.cursor/skills/verify-stadiyums/scripts/`.

```bash
export VERIFY_RUN_ID="verify-$(date +%s)"
bash .cursor/skills/verify-stadiyums/scripts/launch.sh
```

`launch.sh`:

1. Creates `.verification/stadiyums/$VERIFY_RUN_ID/{pids,artifacts,logs}`.
2. Ensures `apps/fan/.env.local` symlinks to repo-root `.env.local`.
3. Starts `npx convex dev` only if nothing is listening on Convex's local port and no foreign blocker — otherwise assumes your existing Convex dev process.
4. Starts `pnpm --filter @stadiyums/fan dev` on **:3000** if the port is free.
5. Waits until `curl -fsS http://127.0.0.1:3000/` succeeds.

**Ready signals:** Fan home returns HTTP 200 and renders the heading **Find your seat**. Convex responds at `NEXT_PUBLIC_CONVEX_URL` from `.env.local`.

**Prerequisites (one-time):**

```bash
pnpm install
npx convex dev   # creates .env.local; keep running or let launch.sh start it
ln -sfn ../../.env.local apps/fan/.env.local
cd .cursor/skills/verify-stadiyums/scripts && npm install && npx playwright install chromium
```

**Teardown** (see Cleanup) — always export the same `VERIFY_RUN_ID` you used for launch.

## Doctor

Run after launch (or when reusing an already-running dev stack):

```bash
export VERIFY_RUN_ID="verify-..."   # same id if you launched via launch.sh
node .cursor/skills/verify-stadiyums/scripts/doctor.mjs
```

Doctor is read-only. It checks:

- `pnpm install` has been run (`node_modules` exists).
- `apps/fan/.env.local` exists.
- `NEXT_PUBLIC_CONVEX_URL` is set and the deployment answers.
- Fan `:3000` serves HTML containing **Find your seat**.
- The artifacts directory for this run exists.

Exit code `0` = safe to drive. Non-zero = fix the reported precondition before continuing.

## Drive

Harness: **Playwright** (Chromium) via scripts in `.cursor/skills/verify-stadiyums/scripts/`. Install deps once in that directory (`npm install`, `npx playwright install chromium`).

Pick a feature from [features/](./features/). Run its scripted driver or follow its labeled browser steps.

**Bundled driver — fan place order** (baseline proof):

```bash
export VERIFY_RUN_ID="verify-..."
node .cursor/skills/verify-stadiyums/scripts/drive-fan-place-order.mjs
```

This script:

1. Opens Fan home.
2. Fills aisle `42`, seat `7` (override with `VERIFY_AISLE` / `VERIFY_SEAT`).
3. Adds one **Hot Dog**, places the order.
4. Waits for **Order tracker** with order line items and `#SY-` order number.

Override base URL with `FAN_URL` if needed.

For Runner/Vendor/Landing features without bundled drivers, use Playwright interactively or extend `scripts/` following the selectors in each feature file. Prefer:

- `getByRole('heading', { name: '...' })`
- `getByRole('button', { name: '...' })`
- `getByPlaceholder('e.g. 12')` for fan seat fields
- Menu cards located via `getByRole('heading', { name: 'Hot Dog' })` then `+` within the card

## Evidence

Artifacts for run `$VERIFY_RUN_ID` live at:

```text
.verification/stadiyums/$VERIFY_RUN_ID/artifacts/
```

**Proof standards:**

- Exercise the real user path (browser UI → Convex mutation), not internal-only helpers.
- Capture **action + resulting state**: e.g. cart count before place, tracker heading and line items after.
- Include app identity in screenshots (Fan shell eyebrow **StadiYums**, page title).
- For mutations, prefer a second read-only view (tracker query UI) over trusting the click alone.
- Record `feature` id and entry point in the log file beside each artifact set.

Bundled `drive-fan-place-order.mjs` writes:

- `fan-place-order.aria.txt` — main landmark snapshot
- `fan-place-order.png` — full-page screenshot
- `fan-place-order.log` — step list

## Cleanup

Stops only processes whose PIDs were recorded under this run's `pids/` directory. **Does not delete artifacts.**

```bash
export VERIFY_RUN_ID="verify-..."   # must match launch
bash .cursor/skills/verify-stadiyums/scripts/cleanup.sh
```

After cleanup, confirm proof files still exist under `.verification/stadiyums/$VERIFY_RUN_ID/artifacts/`. If cleanup removed them, fix `cleanup.sh` before relying on the skill.

Never `killall node` or kill by port alone without checking ownership — you may terminate the user's unrelated dev stack.

## Helpers

| Script | Purpose |
|--------|---------|
| `scripts/launch.sh` | Start Convex (if needed) + Fan; write PIDs |
| `scripts/doctor.mjs` | Read-only health gate |
| `scripts/drive-fan-place-order.mjs` | End-to-end fan order proof |
| `scripts/cleanup.sh` | Stop PIDs from this run; keep artifacts |
| `scripts/lib.mjs` | Shared paths (`REPO_ROOT`, `runDir`, `readConvexUrl`) |

Run Playwright drivers from `scripts/` so `import 'playwright'` resolves:

```bash
cd .cursor/skills/verify-stadiyums/scripts
export VERIFY_RUN_ID=...
node drive-fan-place-order.mjs
```

## Maintenance

When routes, copy, or auth rules change, update the matching file under [features/](./features/). Use `/maintain-verification-skill` to audit the map against the codebase.
