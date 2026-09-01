# Runner Operate — design brief (swarm 2/4)

**Slice:** Runner queue, QR scan modal (shop demo), advance flow  
**Sources:** `apps/runner/src/**`, `packages/db` order service, `DESIGN.md` § Runner Order Card, [demo.stadiyums.shop](https://demo.stadiyums.shop) Runner tab  
**Audience:** Implementers closing pilot parity with the live shop demo

---

## Operate spec (target)

Runner Operate is the game-day fulfillment loop: see what's ready, claim a run, move through handoff steps, confirm delivery. One order active at a time; queue stays glanceable in sun.

### Screens

| Screen | Route | Purpose |
|--------|-------|---------|
| **Queue** | `/` | Ready orders for runner's zone; shift availability; live stats |
| **Active** | `/active` | Claimed order — seat, items, step CTAs, optional QR confirm |
| **Shift** | `/shift` | Identity, zone, stats, end shift |
| **QR Scan** | modal | Claim or confirm delivery by scanning fan order QR (camera + demo simulate) |

### Primary flow

```
Zone check-in → Queue (available) → Claim order [tap or QR]
  → Active (runnerAssigned → atVendor → pickedUp → atSection)
  → Delivered → back to Queue
```

**Claim sources (demo parity):**

1. **Tap advance** on a `readyForPickup` card → `runnerAssigned`, order moves to Active.
2. **Scan Fan's QR** (header CTA or Active confirm) → resolve order token → same claim/deliver transition.

**Queue eligibility:** Only `readyForPickup` orders matching runner zone/vendor. Hide `placed` / `preparing` (vendor-owned). Retire demo shortcut of advancing `placed` from runner queue.

### Runner Order Card (DESIGN.md)

Per card in queue:

- White card, 14px radius, 1px `line` border (no 4px left stripe).
- **Seat block:** Space Mono / display — `Aisle X · Seat Y`, order `#` in mono label.
- **Items:** 13px, `#5A5348` (muted brown), comma-separated summary + item count.
- **Status:** `StatusBadge` only; optional full-border tint for `pickedUp` / active (orange border — current app pattern is acceptable).
- **Advance CTA:** Orange `advance` button, min 44px height; label matches next runner transition (`Claim order`, `Mark picked up`, etc.).
- **Elapsed:** Mono uppercase, operational (e.g. `Ready 3m`).

### QR Scan modal (shop demo)

Mirrors demo.stadiyums.shop Runner tab:

- **Title:** Scan Fan's QR Code
- **Body:** Point camera at fan's order QR, or simulate for demo.
- **Actions:** Enable camera (permission flow) · Simulate scan (demo) · Close
- **Success:** Resolve order → claim if `readyForPickup`, or confirm `atSection → delivered` when invoked from Active.
- **Errors:** Wrong zone, already claimed, invalid token — inline alert, queue refresh.

### Chrome

- Venue + zone context in header: `Chukchansi Park · Sections 101–115` (config-driven).
- Bottom nav: Queue · Active · Shift (keep; demo uses tab switcher — separate apps stay, landing links fan/runner).
- Availability toggle stays on Queue; paused state hides list (current behavior OK).

---

## Current state (`apps/runner`)

| Area | Today |
|------|--------|
| Queue | Polls 2s; lists `placed`, `preparing`, `on_the_way` via `getQueue()` |
| Advance | `DEMO_STATUS_FLOW` linear bump — no actor checks, no claim lock |
| Active | Placeholder copy only |
| QR | Not implemented |
| Auth | Client PIN `1234`; zone in memory only |
| Card UI | Close to DESIGN.md; items use `text-sm text-ink` not 13px brown |
| Zone filter | Zone selected at check-in but **not** applied to queue query |

Backend: `advanceOrder()` in `order-service.ts` ignores `order-transitions.ts` / HEX-62 table. Runner advance labels in `OrderQueue` mix vendor and runner verbs (`Claim order` on `placed`, etc.).

---

## Gap analysis

### vs demo.stadiyums.shop

| Gap | Demo | Monorepo |
|-----|------|----------|
| QR scan modal | Header CTA + camera/simulate | Missing |
| Venue label | `Chukchansi Park · Section 100s` | Generic "StadiYums" text header |
| Queue scope | Section-oriented runner queue | All demo statuses, no zone filter |
| Active delivery | Implied post-claim workflow | Empty `/active` |
| App shell | Fan/Runner tab in one URL | Standalone `:3001` app (OK for pilot; landing links) |

### vs DESIGN.md

| Gap | Spec | Monorepo |
|-----|------|----------|
| Item line color | 13px `#5A5348` | `text-sm font-semibold text-ink` |
| Left stripe | Deprecated | Not used (good) |
| Ticket Stub Rule | Mono 700 for order ID, seat, ETA | Mostly compliant |
| Brand header | Navy bar, logo, tagline chip | `RunnerShell` text-only header |

### vs HEX-62 / product intent

| Gap | Target | Monorepo |
|-----|--------|----------|
| Claim source | `readyForPickup → runnerAssigned` only | Runner can advance from `placed` |
| Granular steps | atVendor, pickedUp, atSection | Skips to `on_the_way` |
| Assignment | One active order per runner | No persistence |
| Transition guard | `evaluateTransition` + version | Blind status index bump |

---

## P0 / P1 / P2

### P0 — pilot credibility (6)

1. **QR Scan modal** — camera permission UI + demo simulate; wire to claim/confirm actions.
2. **Queue shows `readyForPickup` only** — runner-facing queue, not vendor prep states.
3. **Claim → Active** — claiming moves order to `/active`; one active order enforced.
4. **Runner advance via HEX-62** — replace `DEMO_STATUS_FLOW` with `evaluateTransition` actor `runner`.
5. **Zone-scoped queue** — filter orders by runner zone (and vendor when schema supports it).
6. **Order card item styling** — 13px muted brown per DESIGN.md.

### P1 — polish & ops truth

1. Venue + zone label in runner header (config/venue SSOT).
2. Active screen stepper — granular CTAs: At vendor → Picked up → At section → Delivered.
3. Navy brand header component (shared with fan; see swarm 3).
4. Server-side runner session (replace client-only PIN).
5. Claim conflict UX — extend existing advance error banner; optimistic lock / version mismatch.

### P2 — later

1. Production QR only (remove simulate); deep link from fan order tracker.
2. Push/subscription instead of 2s poll.
3. Shift stats semantics (today vs current shift).
4. Offline queue replay / explicit offline banner behavior spec.

---

## Implementation notes

- Reuse `StatusBadge`, `Button variant="advance"`, `SectionLabel` from `@stadiyums/ui`.
- `OrderQueue` advance handler should branch: queue cards claim; Active page advances fulfillment.
- Fan app should expose order QR payload (order id + HMAC or short token) — coordinate with swarm 1 / 4.
- `ensureSeededAction` seed data should include `readyForPickup` rows for runner QA.

---

## STATUS

**Complete** — brief written from repo audit + live demo fetch.

### Top 5 gaps

1. **No QR scan modal** — demo's signature runner affordance is missing entirely.
2. **Wrong queue statuses** — runners see `placed`/`preparing` instead of `readyForPickup` claim pool.
3. **Active delivery screen is a stub** — no post-claim operate surface.
4. **Legacy advance path** — `DEMO_STATUS_FLOW` bypasses HEX-62 runner transitions and claim rules.
5. **Zone not enforced on queue** — check-in is cosmetic; all orders surface to every runner.

### P0 count

**6**
