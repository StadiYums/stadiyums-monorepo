# StadiYums verification map

Read this index before driving the app. Each feature file is the maintained recipe for one user-facing behavior.

## Baseline preconditions

- Repo root: `pnpm install` completed.
- Convex: `npx convex dev` running; repo-root `.env.local` contains `NEXT_PUBLIC_CONVEX_URL`.
- Fan env symlink: `apps/fan/.env.local` → `../../.env.local`.
- Fan app: `http://127.0.0.1:3000` (via `pnpm dev:fan` or `launch.sh`).
- Playwright harness: `cd .cursor/skills/verify-stadiyums/scripts && npm install && npx playwright install chromium`.
- Set `VERIFY_RUN_ID` for every launch/drive/cleanup cycle.
- Do not drive Fan on `:3000` unless you started it (or explicitly reuse your own dev stack after `doctor` passes).

## Driving conventions

- Start from Fan home unless a feature's preconditions say otherwise.
- Prefer roles, headings, and placeholders over CSS classes.
- Runner demo PIN: `1234` (any non-empty employee ID).
- Vendor login: any email containing `@`.
- After placing orders, expect a new Convex `orders` row — shared dev data.
- Restore nothing automatically after fan orders; use unique aisle/seat per run if parallelizing.

## Proof and skip reporting

- Capture the user action and resulting UI state, not only the final screen.
- UI proof: ARIA snapshot + screenshot with StadiYums chrome visible.
- Mutation proof: tracker or queue shows the new order (aisle/seat, items, `#SY-` number).
- Record feature id and entry point with every artifact.
- If an entry point is unreachable, report the attempted URL and unmet precondition — do not claim coverage via a different path.

## Feature entry contract

Each feature file uses exactly four H2 sections: `Sub-features`, `How to get to it (user POV)`, `Driving it with Playwright`, `Gotchas`.

## Features

- [Fan place order](./fan-place-order.md) — seat setup, menu cart, place order, live tracker.
- [Runner sign in](./runner-sign-in.md) — scaffold employee ID + PIN gate.
- [Runner queue](./runner-queue.md) — zone check-in, concession queue, advance status.
- [Vendor sign in](./vendor-sign-in.md) — scaffold email gate to vendor console.
- [Landing dev hub](./landing-dev-hub.md) — local jump links to all apps.
