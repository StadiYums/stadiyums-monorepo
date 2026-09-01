# StadiYums

In-seat concession ordering for live events. Fans order from their seat, runners fulfill via a live queue, and everyone spends less time in lines.

This monorepo hosts four deployable Next.js product apps, a small local landing page, and shared packages for database, UI, and core utilities.

## Apps

| App | Package | Port | Role |
|-----|---------|------|------|
| Fan | `@stadiyums/fan` | 3000 | Fan ordering PWA |
| Runner | `@stadiyums/runner` | 3001 | Runner fulfillment |
| System admin | `@stadiyums/system-admin` | 3002 | Stadium account administration and oversight |
| Vendor | `@stadiyums/vendor` | 3004 | Vendor operations, menus, runners, and order desk |
| Landing | `@stadiyums/landing` | 3003 | Local jump page (dev only) |

Shared packages live under `packages/` (`db`, `core`, `ui`, `types`, `config`).

There is no unified DemoApp / tab switcher — use the standalone apps (or the landing page links).

## Stack

- **pnpm** workspaces + **Turborepo**
- **Next.js 16** (App Router, TypeScript, Tailwind CSS v4, Server Actions)
- **PostgreSQL + Drizzle ORM** — `packages/db` (schema, repositories, services)
- **shadcn/ui** primitives in `@stadiyums/ui`
- **Zod** validation + `safeAction` wrapper in `@stadiyums/core`
- **Sentry** (optional, via `SENTRY_DSN` / `NEXT_PUBLIC_SENTRY_DSN`)

## Getting started

### Prerequisites

- Node.js 18+
- pnpm 9+ (`corepack enable && corepack prepare pnpm@9.15.9 --activate`)
- PostgreSQL database (Neon, Supabase, or local)

### Setup

```bash
pnpm install

# Copy env template and set DATABASE_URL
cp .env.example .env.local

# Apply schema and seed demo orders
pnpm db:migrate
pnpm db:seed

# Start all apps via Turbo (includes landing on :3003)
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
| `pnpm lint` | Lint all packages |
| `pnpm typecheck` | TypeScript check all packages |
| `pnpm test` | Run domain unit tests (`packages/db`) |
| `pnpm db:migrate` | Apply Drizzle migrations |
| `pnpm db:seed` | Seed demo orders |
| `pnpm db:studio` | Open Drizzle Studio |
| `pnpm test:visual` | Run responsive shell geometry and screenshot regression tests |

## Project docs

- [`AGENTS.md`](AGENTS.md) / [`CLAUDE.md`](CLAUDE.md) — agent rules
- [`PRODUCT.md`](PRODUCT.md) — users, brand, design principles
- [`PITCH.md`](PITCH.md) — vendor demo script

## Out of scope (scaffold)

Payments, POS integration, alcohol ID verification, and multi-venue tenancy are deferred per the pilot scope in `PITCH.md`.
