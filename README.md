# StadiYums

In-seat concession ordering for live events. Fans order from their seat, runners fulfill via a live queue, and everyone spends less time in lines.

This monorepo hosts four deployable Next.js product apps, a small local landing page, plus a shared Convex backend.

## Apps

| App | Package | Port | Role |
|-----|---------|------|------|
| Fan | `@stadiyums/fan` | 3000 | Fan ordering PWA |
| Runner | `@stadiyums/runner` | 3001 | Runner fulfillment |
| System admin | `@stadiyums/system-admin` | 3002 | Stadium account administration and oversight |
| Vendor | `@stadiyums/vendor` | 3004 | Vendor operations, menus, runners, and order desk |
| Landing | `@stadiyums/landing` | 3003 | Local jump page (dev only) |

Shared packages live under `packages/` (`ui`, `types`, `config`). Convex stays at the repo root and is shared by all apps.

There is no unified DemoApp / tab switcher — use the standalone apps (or the landing page links).

## Stack

- **pnpm** workspaces + **Turborepo**
- **Next.js 16** (App Router, TypeScript, Tailwind CSS v4)
- **Convex** — real-time order queue and fan tracker sync
- **Impeccable design context** — `PRODUCT.md`, `DESIGN.md`, `.impeccable/design.json`

## Getting started

### Prerequisites

- Node.js 18+
- pnpm 9+ (`corepack enable && corepack prepare pnpm@9.15.9 --activate`)
- A Convex account (`npx convex login`)

### Setup

```bash
pnpm install

# Terminal 1 — Convex backend (creates repo-root .env.local with NEXT_PUBLIC_CONVEX_URL)
npx convex dev

# Point each Next app at the root env (Next only auto-loads .env* from the app dir)
ln -sfn ../../.env.local apps/fan/.env.local
ln -sfn ../../.env.local apps/runner/.env.local
ln -sfn ../../.env.local apps/system-admin/.env.local
ln -sfn ../../.env.local apps/vendor/.env.local

# Terminal 2 — all apps via Turbo (includes landing on :3003)
pnpm dev
```

- Landing: [http://localhost:3003](http://localhost:3003)
- Fan: [http://localhost:3000](http://localhost:3000)
- Runner: [http://localhost:3001](http://localhost:3001)
- Admin: [http://localhost:3002](http://localhost:3002)

### Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start fan, runner, system-admin, vendor, and landing concurrently |
| `pnpm dev:landing` / `dev:fan` / `dev:runner` / `dev:system-admin` / `dev:vendor` | Start one app |
| `pnpm build` | Build all apps |
| `pnpm build --filter=@stadiyums/fan` | Build one app |
| `pnpm lint` | Lint all packages |
| `pnpm typecheck` | TypeScript check all packages |
| `pnpm test:visual` | Run responsive shell geometry and screenshot regression tests |
| `pnpm test:visual:update` | Intentionally update visual baselines after human review |
| `npx convex dev` | Convex dev deployment + type generation |

### Responsive shell tests

The Playwright suite in `tests/visual/` checks the four app shells at the eight agreed viewport sizes. It asserts viewport-height contracts, prevents page-level horizontal overflow, distinguishes the fan/runner mobile frame from the system-admin/vendor WorkspaceShell, and captures deterministic screenshots.

Run `pnpm exec playwright install chromium` once on a new machine, then run `pnpm test:visual`. Baseline changes require `pnpm test:visual:update`, visual review at the changed viewport, and an intentional commit of the updated snapshots. CI runs the same suite with fresh app servers.

## Project docs

- [`AGENTS.md`](AGENTS.md) / [`CLAUDE.md`](CLAUDE.md) — agent rules (Linear branch-per-ticket required)
- [`PRODUCT.md`](PRODUCT.md) — users, brand, design principles
- [`DESIGN.md`](DESIGN.md) — design system tokens and component specs
- [`PITCH.md`](PITCH.md) — vendor demo script

## Out of scope (scaffold)

Payments, POS integration, alcohol ID verification, and multi-venue tenancy are deferred per the pilot scope in `PITCH.md`.
