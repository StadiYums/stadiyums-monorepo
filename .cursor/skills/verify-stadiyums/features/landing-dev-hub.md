# Landing dev hub

Local-only jump page listing all product apps with ports and `pnpm --filter` hints for developers.

## Sub-features

- `app-links` four cards linking to Fan, Runner, System admin, Vendor.
- `dev-hints` footer with `pnpm dev` and `npx convex dev`.

## How to get to it (user POV)

- Open `http://127.0.0.1:3003/` while `pnpm dev:landing` or full `pnpm dev` is running.

## Driving it with Playwright

Preconditions:

- Landing on `:3003`.

- **Open hub.** `page.goto('http://127.0.0.1:3003/')`. Heading **StadiYums** and copy about standalone apps appear.
- **Link targets.** Locator `a` with text **Fan** has `href` `http://localhost:3000`. Repeat for Runner (`3001`), System admin (`3002`), Vendor (`3004`).
- **Proof.** Screenshot shows all four app cards and footer **pnpm dev**.

## Gotchas

- Landing is dev-only scaffolding — not a production surface.
- Links use `localhost`, not `127.0.0.1`; both usually work locally.
- Clicking a card leaves the landing origin — use `page.goto` back to re-test the hub.
