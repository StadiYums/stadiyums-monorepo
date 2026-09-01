# Fan Operate Flow — Gap Analysis & Screen Spec

**Slice:** Fan Operate (seat → menu → cart → place → track)  
**References:** `apps/fan/src/**`, `packages/ui`, `DESIGN.md`, [demo.stadiyums.shop](https://demo.stadiyums.shop)  
**Date:** 2026-08-31

---

## What “Operate mode” means

The in-event fan ordering loop: confirm seat, browse concessions, build cart, place order, watch live milestones. Visual language is **scoreboard-first** — navy authority blocks, orange action surfaces, Space Mono for operational data. Not marketing chrome, not generic SaaS headers.

The shop demo implements this as a single mobile column with a fixed **navy header**, **section chips**, **orange cart bar**, **qty steppers**, **navy seat block**, and a **stepper tracker**. The monorepo fan app (`apps/fan`) has the same route graph and partial components but wraps every screen in `FanShell` text headers instead of the demo chrome.

---

## Current state (monorepo)

| Route | Purpose | Shell |
| --- | --- | --- |
| `/` | Aisle + seat entry | `FanShell` + `SeatForm` |
| `/order` | Menu grid + cart | `FanShell` + `MenuGrid` + `CartBar` |
| `/tracker` | Live order timeline | `FanShell` + `OrderTracker` |
| `/receipt` | Post-checkout stub | `FanShell` placeholder |

**What already matches the demo / DESIGN.md**

- Cream page via `AppShell` (~520px mobile frame)
- Menu cards with icon well, Inter title, mono price, 30px circular qty steppers (`MenuGrid`)
- Fixed orange cart bar with slide-up transform (`CartBar`)
- Order stepper dots: 34px, green done / orange current + focus ring (`OrderTracker`)
- Navy seat preview block on seat form only (`SeatForm`)
- Typography stack loaded (Archivo Black, Inter, Space Mono)
- `BrandHeader`, `SectionLabel`, `StatusBadge` exist in `@stadiyums/ui` but fan app does not compose them into Operate chrome

**What diverges**

| Area | Demo + DESIGN.md | Fan app today |
| --- | --- | --- |
| **Header** | Full-width navy bar, logo circle, venue context, tagline chip | `FanShell`: muted eyebrow + Archivo title on cream — no navy block |
| **Section labels** | Orange uppercase Space Mono (`#FD490A`) | `SectionLabel` uses `text-label-muted` (gray) |
| **Seat selection** | Horizontal **section chips** (108, 109, 112…) | Numeric aisle + seat inputs only; no section/row model |
| **Seat display (order)** | Full-width **navy block**, cream mono text, orange icon accent | White `Card` with plain `text-sm` aisle/seat line |
| **Cart CTA** | White button, orange-dim text inside orange bar | `Button` default `primary` = **navy** fill inside orange bar |
| **Tracker headline** | Archivo Black display: “Aisle X – Seat Y” | `text-2xl text-navy` (Inter weight, not display) inside white card |
| **Tracker chrome** | Status-first; seat headline prominent below header | Entire tracker buried in `FanShell` title “Order tracker” + description |
| **Vendor scope** | Section-filtered concessions | Static `MENU` in `lib/menu.ts`; no vendor picker |
| **Checkout label** | “Checkout” / simulate | “Place order →” (acceptable copy; wrong button styling) |
| **Receipt** | Mock receipt with order # | Placeholder card (“lands in F3”) |
| **State** | Demo in-memory | `activeOrderId` + cart in React only — lost on refresh |
| **Dev chrome** | N/A in prod | `VendorToggle` (Grizzlies theme) fixed bottom-left on all fan screens |

---

## Gap analysis vs `DESIGN.md` rules

| Rule | Gap |
| --- | --- |
| **Orange Clock** — orange on every act-now surface | Section labels gray; checkout button navy not white-on-orange |
| **Ticket Stub** — seats/prices/IDs in Space Mono 700 | Order-page seat line uses Inter `text-sm`; tracker headline not mono/display split |
| **Signage** — Archivo Black headings only | Tracker seat line uses wrong tier |
| **Flat Bowl** — no card shadows | `AppShell` uses `shadow-[0_0_0_1px_var(--line)]` (hairline OK); otherwise flat ✓ |
| **Navigation** — navy-deep tab switcher | Fan app has no in-app mode switcher (demo-only Fan/Runner tabs) — OK to omit in fan PWA |

---

## Operate-mode screen spec

Shared chrome for all Operate screens (replace `FanShell`):

```
┌─────────────────────────────────────┐
│ BrandHeader (navy)                  │
│  StadiYums · Chukchansi Park        │
│  [tagline chip]                     │
├─────────────────────────────────────┤
│ cream content area, 20px gutter     │
│                                     │
│  [screen body]                      │
│                                     │
├─────────────────────────────────────┤
│ CartBar (orange, fixed) — order only│
└─────────────────────────────────────┘
```

### F1 — Seat setup (`/`)

**Goal:** Lock delivery location before menu.

| Element | Spec |
| --- | --- |
| Header | `BrandHeader` — title “StadiYums”, context “Chukchansi Park · Demo” (or venue from config) |
| Section label | Orange mono: “DELIVERING TO” |
| Section chips | Horizontally scrollable pills; active = orange fill / white text; inactive = cream on navy-deep container (per DESIGN.md tab pattern) |
| Row + seat | Two `Input` fields (cream fill, mono values) — row optional until section model lands |
| Seat preview | Full-width navy block, cream mono: “We'll deliver to Section {s}, Row {r}, Seat {n}” |
| Primary CTA | Navy full-width button: “Continue to order” |
| Validation | Orange inline error; block navigate until section + seat resolved |
| Redirect | If `activeOrderId` → `/tracker` |

**Gap note:** Demo uses section chips; current uses aisle/seat numbers. Align naming in UI copy until schema supports section/row/seat.

### F2 — Order (`/order`)

**Goal:** Add items, review seat, checkout.

| Element | Spec |
| --- | --- |
| Header | Same `BrandHeader` |
| Seat block | Navy full-width block (not white card): mono cream text + orange map-pin accent; “Change seat” as cream/underline link |
| Section label | Orange mono: “WHAT CAN WE BRING YOU?” |
| Menu grid | 1-col mobile / 2-col ≥400px; white cards, cream icon well, qty steppers (existing `MenuGrid` structure) |
| Cart bar | Fixed orange; left: “{n} items · ${total}” mono bold; right: **white** checkout button, orange-dim text |
| Empty cart | Bar hidden (`translate-y-[110%]`) |
| Guard | No seat → `/`; active order → `/tracker` |

### F3 — Tracker (`/tracker`)

**Goal:** Read order status at a glance in sunlight.

| Element | Spec |
| --- | --- |
| Header | `BrandHeader` — no redundant page title in body |
| Seat headline | Archivo Black 24px: “Aisle {a} · Seat {s}” (or section variant) |
| Order ID | Space Mono 11px muted: `#SY-{n}` top-right |
| Section label | Orange mono: “ORDER STATUS” |
| Stepper | 4 steps: Placed → Preparing → On the way → Delivered; dot spec per DESIGN.md |
| ETA banner | Green-tint border block; mono ETA + body copy |
| Line items | Mono prices; total row bold |
| Terminal | `delivered` → navy full-width “Order again” clears `activeOrderId` |
| Polling | 2s interval via `useOrder` (keep) |

### F4 — Receipt (`/receipt`) — P1

**Goal:** Confirm placement before/alongside tracker.

| Element | Spec |
| --- | --- |
| Header | `BrandHeader` |
| Card | Order #, seat block (navy inset or mono), item list, total |
| CTA | Link to `/tracker` |

---

## Implementation notes (no code)

1. Introduce `FanOperateLayout` composing `BrandHeader` + scroll body + optional `CartBar` — retire `FanShell` for Operate routes.
2. Fix `SectionLabel` token: orange for Operate contexts (or add `variant="action"`).
3. Add `checkout` button variant: white/orange-dim for use inside `CartBar` only.
4. Extract `SeatBlock` shared primitive (navy) — used on F1 preview, F2 summary, F3 headline area.
5. Hide `VendorToggle` behind dev flag or remove from fan production layout.
6. Section chips can ship with static Chukchansi sections before DB-backed venue config.

---

## P0 / P1 / P2 checklist

### P0 — Visual parity & Operate chrome (blocks demo alignment)

- [ ] **P0-1** Replace `FanShell` with `BrandHeader` + content layout on `/`, `/order`, `/tracker`
- [ ] **P0-2** Orange `SectionLabel` on Operate screens (match DESIGN.md + shop demo)
- [ ] **P0-3** Navy `SeatBlock` on `/order` (replace white seat card)
- [ ] **P0-4** Cart bar checkout button: white fill, orange-dim text (not navy primary)
- [ ] **P0-5** Tracker seat headline: Archivo Black display tier; demote redundant “Order tracker” page title
- [ ] **P0-6** Remove or gate `VendorToggle` on fan Operate surfaces

### P1 — Operate flow completeness

- [ ] **P1-1** Section chip row on seat screen (static demo sections OK)
- [ ] **P1-2** Receipt screen with real order data post-place
- [ ] **P1-3** Persist `activeOrderId` (and seat) across refresh — localStorage or server session
- [ ] **P1-4** `StatusBadge` on tracker for current milestone text
- [ ] **P1-5** Align seat copy: section/row/seat vs aisle/seat (types + UI)
- [ ] **P1-6** Menu item descriptions visible (demo shows desc under title; `MenuGrid` omits `desc`)

### P2 — Pilot features (from `docs/features/fan-app.md`)

- [ ] **P2-1** Vendor marketplace filtered by section
- [ ] **P2-2** Menu modifiers (“no onions”, etc.)
- [ ] **P2-3** 4-digit delivery PIN on tracker when `on_the_way`
- [ ] **P2-4** Simulated push notifications on milestone change
- [ ] **P2-5** Runner chat + post-delivery rating
- [ ] **P2-6** Guest sign-in / quick entry
- [ ] **P2-7** GPS / QR seat localization (“F1” note on home page)

---

## STATUS

**Doc complete.** Fan Operate flow is functionally wired (seat → menu → place → poll tracker) but visually still on the `FanShell` scaffold. Shared UI primitives (`BrandHeader`, tokens, stepper, cart bar, qty steppers) exist; composition and token application are the main lift. No `docs/design/swarm/` prior art; this is the first swarm slice doc.

### Top 5 gaps

1. **No navy `BrandHeader`** — every screen uses cream `FanShell` text headers instead of the demo’s authority bar.
2. **Gray section labels** — `SectionLabel` is muted gray; DESIGN.md and demo require orange action labels.
3. **Seat shown in white card on `/order`** — demo uses a full-width navy seat block with mono cream text.
4. **Wrong checkout button treatment** — navy primary button inside orange cart bar; spec is white/orange-dim.
5. **Tracker typography hierarchy** — seat headline not Archivo Black display; status buried under generic page title.

### P0 count

**6** (P0-1 through P0-6)
