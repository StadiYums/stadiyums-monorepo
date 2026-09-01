# Fan place order

Fans confirm aisle and seat, add concessions, place an order via a Server Action, and view a polling order tracker backed by PostgreSQL.

## Sub-features

- `seat-setup` validates aisle/seat and navigates to the menu.
- `menu-cart` increments item quantities and shows the orange cart bar.
- `place-order` calls `placeOrderAction` → `getOrderService().placeOrder`.
- `tracker-live` polls `getOrderAction` every 2s via `useOrder`.

## How to get to it (user POV)

- Open `http://127.0.0.1:3000/` (**Find your seat**).
- Enter aisle and seat, tap **Continue to order**.
- On `/order`, tap **+** on a menu item, then **Place order →**.
- App navigates to `/tracker` with the live timeline.

## Driving it with Playwright

Preconditions:

- `doctor.mjs` passes for this `VERIFY_RUN_ID`.
- Fresh browser context (no in-memory active order).
- `DATABASE_URL` reachable; demo seed applied.

- **Open home.** `page.goto(FAN_URL)`. Heading **Find your seat** visible.
- **Enter seat.** Fill `e.g. 12` / `e.g. 8`, click **Continue to order**. Heading **Order** and `Aisle <n> · Seat <n>` visible.
- **Add item.** Card with heading **Hot Dog**, click **+**. Cart shows `1 items`.
- **Place order.** Click **Place order →**. Within 20s, heading **Order tracker** appears.
- **Tracker proof.** `Aisle <n> · Seat <n>`, `#SY-<number>`, and `1 x Hot Dog` visible.
- **Artifacts.** `node drive-fan-place-order.mjs` or save snapshot/screenshot to `.verification/stadiyums/$VERIFY_RUN_ID/artifacts/fan-place-order.{aria.txt,png}`.

## Gotchas

- Empty aisle/seat shows **Aisle and seat are required.**
- Missing `DATABASE_URL` surfaces **Check your database connection.** on place.
- Active order in React state redirects `/` and `/order` to `/tracker` — use a fresh context.
- Placing an order inserts a PostgreSQL row; cleanup does not delete it.
- Input labels lack `htmlFor` — use placeholders `e.g. 12` / `e.g. 8`.
