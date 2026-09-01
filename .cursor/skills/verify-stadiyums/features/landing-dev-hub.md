# Landing dev hub

Local jump page listing all product apps with ports and filter commands.

## Sub-features

- `app-links` four cards (Fan, Runner, System admin, Vendor).
- `dev-hints` footer with `pnpm dev`.

## How to get to it (user POV)

- Open `http://127.0.0.1:3003/` with `pnpm dev:landing` or `pnpm dev`.

## Driving it with Playwright

Preconditions:

- Landing on `:3003`.

- **Open hub.** Heading **StadiYums** and standalone-apps copy visible.
- **Links.** `a` with **Fan** has `href` `http://localhost:3000`; Runner `3001`; System admin `3002`; Vendor `3004`.
- **Proof.** Screenshot shows all four cards.

## Gotchas

- Dev-only surface.
- Links use `localhost`, not `127.0.0.1`.
- Footer no longer mentions Convex — backend is PostgreSQL + Drizzle.
