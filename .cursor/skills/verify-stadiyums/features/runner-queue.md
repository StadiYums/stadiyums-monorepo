# Runner queue

Signed-in runners pick a zone, view the live queue (polled from PostgreSQL), and advance order status.

## Sub-features

- `zone-check-in` selects a demo zone.
- `queue-list` shows orders from `getQueueAction` (placed, preparing, on_the_way).
- `advance-status` calls `advanceOrderAction` per row.

## How to get to it (user POV)

- Sign in at `http://127.0.0.1:3001/login` (PIN `1234`).
- Pick a zone on **Zone check-in**, tap **Enter queue**.
- On `/`, stay **active** (not **Go inactive**) to see the concession queue.

## Driving it with Playwright

Preconditions:

- Runner on `:3001`, `DATABASE_URL` set, seed or fan order in queue.

- **Sign in and check in.** Employee ID `R-1042`, PIN `1234`. Select **Sections 101–115**, **Enter queue**.
- **View queue.** **Concession queue** lists orders or **No ready orders yet.**
- **Advance.** Click the advance button on the first card (e.g. **Claim order**). Status badge updates after refresh.
- **Proof.** Screenshot shows aisle/seat and updated badge.

## Gotchas

- **Go inactive** hides the queue list.
- Empty queue does not prove `advanceOrder` — seed data or place a fan order first.
- Queue polls every 2s — wait briefly after advance before asserting.
- Advance errors show the orange alert banner from `OrderQueue`.
