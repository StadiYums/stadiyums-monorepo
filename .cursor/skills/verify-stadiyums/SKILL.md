---
name: verify-stadiyums
description: Launch and drive the StadiYums monorepo (Fan PWA primary; Runner, Vendor, Landing secondary) against PostgreSQL + Drizzle. Use when you need scripted proof of user-facing behavior — seat setup, ordering, runner queue, scaffold logins — with screenshots and ARIA snapshots.
---

# Verify StadiYums

StadiYums is a **pnpm + Turborepo** monorepo with four Next.js apps and a local landing page, backed by **PostgreSQL + Drizzle** in `packages/db`. Server Actions in each app call `@stadiyums/db` services.

**Primary surface:** Fan PWA at `http://127.0.0.1:3000`. **Secondary:** Runner (`:3001`), System admin (`:3002`), Landing (`:3003`), Vendor (`:3004`).

Read [features/README.md](./features/README.md) before driving.

**Isolation:** Fan cart/seat/active-order state is React memory only (fresh browser context = clean session). **Orders persist in PostgreSQL** — verification inserts real rows. Use distinctive aisle/seat values (defaults `42` / `7`).

**Do not double-drive:** Ports are fixed. If Fan (`3000`) is already in use by your personal `pnpm dev:fan`, either reuse that stack (skip `launch.sh`, run `doctor` only) or stop it first. `launch.sh` exits when a foreign process owns the port.

## Launch

```bash
export VERIFY_RUN_ID="verify-$(date +%s)"
bash .cursor/skills/verify-stadiyums/scripts/launch.sh
```

`launch.sh`:

1. Creates `.verification/stadiyums/$VERIFY_RUN_ID/{pids,artifacts,logs}`.
2. Resolves `DATABASE_URL` (see **Database** below).
3. Runs `pnpm db:migrate` and `pnpm db:seed`.
4. Symlinks `apps/fan/.env.local` → `../../.env.local` when missing.
5. Starts Fan on **:3000** (override with `VERIFY_FAN_PORT`) and waits for HTTP 200.

**Ready signal:** Fan home returns **Find your seat**.

**One-time setup:**

```bash
pnpm install
cp .env.example .env.local   # set DATABASE_URL to your Neon dev database
npx playwright install chromium
```

**Database:** `DATABASE_URL` must be set in repo-root `.env.local` (see `.env.example`). The app uses `@neondatabase/serverless` — use a **Neon** (or Neon-compatible) connection string. Local Docker Postgres is not supported by the current driver.

`launch.sh` runs `pnpm db:migrate` and `pnpm db:seed` against that URL.

## Doctor

```bash
export VERIFY_RUN_ID="verify-..."   # same id if you used launch.sh
node .cursor/skills/verify-stadiyums/scripts/doctor.mjs
```

Read-only checks:

- `node_modules` exists.
- `DATABASE_URL` is set.
- `pnpm db:migrate` and `pnpm db:seed` succeed.
- Fan serves HTML containing **Find your seat**.
- Artifacts directory exists for this run.

Exit `0` = safe to drive.

## Drive

Harness: **Playwright** (`@playwright/test` at repo root). Install browsers once: `npx playwright install chromium`.

Pick a feature from [features/](./features/). Bundled driver for the baseline proof:

```bash
export VERIFY_RUN_ID="verify-..."
node .cursor/skills/verify-stadiyums/scripts/drive-fan-place-order.mjs
```

Flow: aisle `42`, seat `7` → add **Hot Dog** → **Place order →** → **Order tracker** with `#SY-` number and line items.

Override with `FAN_URL`, `VERIFY_AISLE`, `VERIFY_SEAT`.

Stable selectors:

- `getByRole('heading', { name: 'Find your seat' })`
- `getByPlaceholder('e.g. 12')` / `getByPlaceholder('e.g. 8')`
- `getByRole('button', { name: 'Continue to order' })`
- Menu card via `getByRole('heading', { name: 'Hot Dog' })` then `+`
- `getByRole('button', { name: 'Place order →' })`

Existing visual regression harness: `pnpm test:visual` (geometry + screenshots; starts apps via `playwright.config.ts`).

## Evidence

Artifacts: `.verification/stadiyums/$VERIFY_RUN_ID/artifacts/`

**Proof standards:**

- Exercise the real user path (browser → Server Action → PostgreSQL), not test-only shortcuts.
- Capture action **and** resulting state (tracker line items after place, not just the click).
- Include StadiYums chrome in screenshots.
- Confirm DB side effects via the tracker UI (polls `getOrderAction` every 2s).

`drive-fan-place-order.mjs` writes:

- `fan-place-order.aria.txt`
- `fan-place-order.png`
- `fan-place-order.log`

## Cleanup

Stops only Fan PID and Docker container recorded for this run. **Keeps artifacts.**

```bash
export VERIFY_RUN_ID="verify-..."
bash .cursor/skills/verify-stadiyums/scripts/cleanup.sh
```

After cleanup, confirm artifacts still exist. Never `killall node`.

## Helpers

| Script | Purpose |
|--------|---------|
| `scripts/bootstrap-db.sh` | Resolve `DATABASE_URL` into run state |
| `scripts/launch.sh` | Migrate, seed, start Fan |
| `scripts/doctor.mjs` | Read-only health gate |
| `scripts/drive-fan-place-order.mjs` | End-to-end fan order proof |
| `scripts/cleanup.sh` | Stop Fan started by this run |
| `scripts/lib.mjs` | Shared paths and env helpers |

Run all Node helpers from **repo root** so `@playwright/test` resolves.

## Maintenance

Update [features/](./features/) when routes or copy change. Use `/maintain-verification-skill` to audit the map against the codebase.
