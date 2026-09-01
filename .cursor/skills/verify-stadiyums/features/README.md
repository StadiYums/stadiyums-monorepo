# StadiYums verification map

Read this index before driving. Each feature file is the recipe for one user-facing behavior.

## Baseline preconditions

- `pnpm install` at repo root.
- `DATABASE_URL` in `.env.local` (Neon PostgreSQL).
- `pnpm db:migrate` and `pnpm db:seed` applied (launch runs both).
- Fan at `http://127.0.0.1:3000` (`pnpm dev:fan` or `launch.sh`).
- Playwright: `npx playwright install chromium`.
- Set `VERIFY_RUN_ID` for every launch / drive / cleanup cycle.
- Fresh browser context per fan order proof (in-memory cart/seat state).

## Driving conventions

- Start from Fan home unless a feature says otherwise.
- Prefer roles, headings, and placeholders over CSS classes.
- Runner demo PIN: `1234` (any non-empty employee ID).
- Vendor login: any email containing `@`.
- Orders written to PostgreSQL are not rolled back by `cleanup.sh`.
- Use unique aisle/seat when parallelizing proofs.

## Proof and skip reporting

- Capture user action and resulting UI state.
- UI proof: ARIA snapshot + screenshot with StadiYums chrome.
- Mutation proof: tracker or runner queue shows the new order (`#SY-` number, aisle/seat, items).
- Record feature id and entry point with every artifact.
- Report unreachable entry points with the attempted URL and unmet precondition.

## Feature entry contract

Each feature file uses four H2 sections: `Sub-features`, `How to get to it (user POV)`, `Driving it with Playwright`, `Gotchas`.

## Features

- [Fan place order](./fan-place-order.md) — seat setup, menu cart, Server Action place, live tracker.
- [Runner sign in](./runner-sign-in.md) — scaffold employee ID + PIN gate.
- [Runner queue](./runner-queue.md) — zone check-in, concession queue, advance status.
- [Vendor sign in](./vendor-sign-in.md) — scaffold email gate.
- [Landing dev hub](./landing-dev-hub.md) — local jump links to all apps.
