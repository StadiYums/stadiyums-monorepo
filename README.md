# StadiYums

In-seat concession ordering for live events. Fans order from their seat, runners fulfill via a live queue, and everyone spends less time in lines.

This monorepo hosts three deployable Next.js apps plus a shared Convex backend.

## Apps

| App | Package | Port | Role |
|-----|---------|------|------|
| Fan | `@stadiyums/fan` | 3000 | Fan ordering PWA |
| Runner | `@stadiyums/runner` | 3001 | Runner fulfillment |
| Admin | `@stadiyums/admin` | 3002 | Stadium ops console |

Shared packages live under `packages/` (`ui`, `types`, `config`). Convex stays at the repo root and is shared by all apps.

Legacy demo UI remains under `src/` until migration tickets (HEX-147 / HEX-148) complete. Prefer the apps above for new work.

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

# Terminal 1 — Convex backend (creates .env.local with NEXT_PUBLIC_CONVEX_URL)
npx convex dev

# Terminal 2 — all apps via Turbo
pnpm dev
```

- Fan: [http://localhost:3000](http://localhost:3000)
- Runner: [http://localhost:3001](http://localhost:3001)
- Admin: [http://localhost:3002](http://localhost:3002)

### Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start fan, runner, and admin concurrently |
| `pnpm dev:fan` / `dev:runner` / `dev:admin` | Start one app |
| `pnpm build` | Build all apps |
| `pnpm build --filter=@stadiyums/fan` | Build one app |
| `pnpm lint` | Lint all packages |
| `pnpm typecheck` | TypeScript check all packages |
| `npx convex dev` | Convex dev deployment + type generation |

## Project docs

- [`AGENTS.md`](AGENTS.md) / [`CLAUDE.md`](CLAUDE.md) — agent rules (Linear branch-per-ticket required)
- [`PRODUCT.md`](PRODUCT.md) — users, brand, design principles
- [`DESIGN.md`](DESIGN.md) — design system tokens and component specs
- [`PITCH.md`](PITCH.md) — vendor demo script

## Out of scope (scaffold)

Payments, POS integration, alcohol ID verification, and multi-venue tenancy are deferred per the pilot scope in `PITCH.md`.
