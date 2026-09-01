# Vendor sign in

Vendor operators pass a scaffold email gate to reach the dispatch dashboard.

## Sub-features

- `email-gate` requires `@` in the address.
- `console-entry` redirects to `/` after login.

## How to get to it (user POV)

- Open `http://127.0.0.1:3004/login`.
- Enter work email with `@`, tap **Enter vendor console**.

## Driving it with Playwright

Preconditions:

- Vendor on `:3004`, fresh context.

- **Open login.** Heading **Vendor sign in**.
- **Invalid.** `not-an-email` → **Enter a valid email address.**
- **Valid.** `ops@stadium.com` → **Dispatch dashboard**.
- **Proof.** Screenshot shows dashboard cards.

## Gotchas

- No password; any `user@domain` works.
- Dashboard metrics are placeholders until later ops tickets.
