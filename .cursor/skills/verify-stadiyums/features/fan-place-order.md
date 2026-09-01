# Fan place order

Fans confirm aisle and seat, add concessions from the demo menu, place an order, and land on a live order tracker backed by Convex.

## Sub-features

- `seat-setup` validates aisle/seat and navigates to the menu.
- `menu-cart` increments item quantities and shows the cart bar.
- `place-order` calls `orders.placeOrder` and clears the cart.
- `tracker-live` subscribes to `orders.getOrder` and shows status timeline.

## How to get to it (user POV)

- Open `http://127.0.0.1:3000/` (Fan home — **Find your seat**).
- Enter aisle and seat, tap **Continue to order**.
- On `/order`, tap **+** on a menu item, then **Place order →** in the orange cart bar.
- After place, the app redirects to `/tracker` automatically.

## Driving it with Playwright

Preconditions:

- `doctor.mjs` passes for this `VERIFY_RUN_ID`.
- No in-memory active order in the browser session (fresh context).
- Convex dev deployment reachable.

- **Open home.** `page.goto('http://127.0.0.1:3000/')`. Heading **Find your seat** is visible.
- **Enter seat.** Fill placeholder `e.g. 12` with aisle, `e.g. 8` with seat. Click **Continue to order**. Heading **Order** appears; text `Aisle <aisle> · Seat <seat>` is visible.
- **Add item.** Locate card with heading **Hot Dog**. Click **+** inside that card. Cart bar shows `1 items`.
- **Place order.** Click **Place order →**. Within 15s, heading **Order tracker** appears (redirect from `/order` to `/tracker`).
- **Tracker proof.** Text `Aisle <aisle> · Seat <seat>`, regex `#SY-\d+`, and line `1 x Hot Dog` are visible.
- **Artifacts.** Run `node drive-fan-place-order.mjs` or save `ariaSnapshot` of `main` plus full-page screenshot to `.verification/stadiyums/$VERIFY_RUN_ID/artifacts/fan-place-order.{aria.txt,png}`.

## Gotchas

- Empty aisle/seat shows **Aisle and seat are required.** and blocks navigation.
- If Convex is down, **Place order →** surfaces `Could not place order. Is the Convex backend running?`
- An active order in React state redirects home and `/order` to `/tracker` — use a fresh browser context per run.
- Placing an order writes to the shared dev database; it is not rolled back by `cleanup.sh`.
- Input labels are visual only (no `htmlFor`); use placeholders `e.g. 12` / `e.g. 8` rather than `getByLabel`.
