# Runner queue

Signed-in runners pick a zone, view the live concession queue from Convex, and advance order status along the demo flow.

## Sub-features

- `zone-check-in` selects one of four demo zones.
- `queue-list` shows `orders.listQueue` (placed, preparing, on_the_way).
- `advance-status` calls `orders.advanceOrder` through the per-row action button.

## How to get to it (user POV)

- Sign in at `http://127.0.0.1:3001/login` (PIN `1234`).
- On **Zone check-in**, pick a zone, tap **Enter queue**.
- On the queue page (`/`), ensure **Go inactive** is not toggled — runner must be active to see orders.

## Driving it with Playwright

Preconditions:

- Runner on `:3001`, Convex dev running.
- Queue has at least one open order (seed data from `demo.ensureSeeded` / `demo.resetDemo`, or a fan order placed during the same session).

- **Sign in and check in.** Complete runner sign-in. Click zone button **Sections 101–115**. Click **Enter queue**. Heading **Queue** is visible.
- **View queue.** Section **Concession queue** lists orders or **Queue is clear** if empty.
- **Advance order.** On the first queue card, click the advance button (label varies by status, e.g. **Start preparing** / **Mark on the way**). Status badge updates after Convex round-trip.
- **Proof.** Screenshot shows aisle/seat row and updated status badge; optional second advance until **Delivered**.

## Gotchas

- **Go inactive** hides the queue list even when orders exist.
- Advance button label comes from `nextStatusLabel` — assert status badge change, not button text alone.
- Empty queue is valid but does not prove `advanceOrder` — seed or place a fan order first.
- Queue requires Convex; errors show `Could not update order. Is the Convex backend running?`
