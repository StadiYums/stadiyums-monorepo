# StadiYums

In-seat concession ordering for live events. Fans order from their seat, runners fulfill via a live queue, and everyone spends less time in lines.

This is the Next.js + Convex scaffold for the [live demo](https://stadiyums.shop/), replacing the original single-file HTML POC.

## Stack

- **Next.js 16** (App Router, TypeScript, Tailwind CSS v4)
- **Convex** — real-time order queue and fan tracker sync
- **Impeccable design context** — `PRODUCT.md`, `DESIGN.md`, `.impeccable/design.json`

## Getting started

### Prerequisites

- Node.js 18+
- A Convex account (`npx convex login`)

### Setup

```bash
npm install

# Terminal 1 — Convex backend (creates .env.local with NEXT_PUBLIC_CONVEX_URL)
npx convex dev

# Terminal 2 — Next.js frontend
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

On first load, the app auto-seeds two sample orders in the runner queue (matching the POC).

### Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Next.js dev server |
| `npm run build` | Production build |
| `npm run lint` | ESLint (includes `@convex-dev/eslint-plugin`) |
| `npm run typecheck` | TypeScript check |
| `npx convex dev` | Convex dev deployment + type generation |

## Project docs

- [`PRODUCT.md`](PRODUCT.md) — users, brand, design principles
- [`DESIGN.md`](DESIGN.md) — design system tokens and component specs
- [`PITCH.md`](PITCH.md) — vendor demo script

## Demo features

- **Fan app** — aisle/seat entry, menu, cart, order tracker
- **Runner app** — live queue with one-tap status advances
- **Grizzlies mode** — white-label theme toggle
- **Reset demo** — clears state and re-seeds sample orders

## Out of scope (scaffold)

Payments, POS integration, alcohol ID verification, and multi-venue tenancy are deferred per the pilot scope in `PITCH.md`.
