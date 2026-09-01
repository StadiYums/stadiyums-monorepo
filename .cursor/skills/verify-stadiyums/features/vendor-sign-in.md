# Vendor sign in

Vendor operators pass a scaffold email gate to reach the dispatch dashboard and sidebar navigation.

## Sub-features

- `email-gate` requires an address containing `@`.
- `console-entry` redirects to `/` dashboard after login.

## How to get to it (user POV)

- Open `http://127.0.0.1:3004/login`.
- Enter a work email with `@`, tap **Enter vendor console**.

## Driving it with Playwright

Preconditions:

- Vendor app on `:3004` (`pnpm dev:vendor`).
- Fresh browser context.

- **Open login.** `page.goto('http://127.0.0.1:3004/login')`. Heading **Vendor sign in** is visible.
- **Invalid email.** Enter `not-an-email`, click **Enter vendor console**. Error **Enter a valid email address.**
- **Valid login.** Enter `ops@stadium.com`, click **Enter vendor console**. Heading **Dispatch dashboard** appears.
- **Proof.** Screenshot shows dashboard cards **Active orders** and **Runners**.

## Gotchas

- No password and no Convex auth — any `user@domain` works.
- Dashboard metrics are placeholders (read-only copy, zeros) until later ops tickets land.
- Sidebar routes (`/menus`, `/runners`, `/settings`) require passing this gate first.
