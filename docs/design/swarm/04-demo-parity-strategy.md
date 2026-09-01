# Demo Parity Strategy — unified shop vs separate apps

**Slice:** Swarm 4/4 — cross-cutting pilot strategy  
**Sources:** [demo.stadiyums.shop](https://demo.stadiyums.shop), `apps/landing`, `DESIGN.md`, `PRODUCT.md`, swarm 01–03  
**Audience:** Product, design, and engineering deciding how the live shop demo and monorepo apps converge for venue pilots

---

## Executive summary

The live shop demo exists to **close venue pilots** in one browser session: a buyer sees fan ordering and runner fulfillment without context-switching. The monorepo intentionally split that experience into standalone apps (`apps/fan`, `apps/runner`, `apps/vendor`, `apps/system-admin`) with `apps/landing` as the local dev hub. Parity work is not “rebuild DemoApp in one URL” — it is **make each role app feel like the shop demo** while preserving separate deploy surfaces, auth boundaries, and PWA install paths.

This doc resolves four open alignment questions — app topology, seat addressing, venue labeling, and QR handoff — and proposes a three-phase pilot rollout.

---

## 1. Unified demo vs separate apps

### What each surface optimizes for

| Surface | URL / entry | Strength | Weakness |
| --- | --- | --- | --- |
| **Shop demo** | `demo.stadiyums.shop` — Fan/Runner tabs in one page | Venue buyer sees the full loop in &lt;2 minutes; zero install; single bookmark for sales | Not role-scoped; shared in-memory state; no vendor desk or admin; tab switcher is a sales affordance, not ops architecture |
| **Monorepo apps** | Fan `:3000`, Runner `:3001`, Vendor `:3004`, Landing `:3003` | Real pilot topology: separate PWAs, credentials, zone check-in, backend-backed orders | Buyer must open two URLs or use landing hub; visual chrome still on `FanShell` / text headers |
| **Landing hub** | `apps/landing` | Honest dev/pilot jump page; documents `pnpm --filter` ports | Not a production fan/runner shell; no embedded demo tabs |

### Recommendation: **separate apps in production, unified narrative in demo**

1. **Keep separate apps as the pilot and production architecture.** PRODUCT.md principle 3 — “show the whole loop” — is satisfied at the **story** level (sales deck + landing links + side-by-side phones), not by collapsing roles into one SPA.
2. **Preserve `demo.stadiyums.shop` as the sales demo** until monorepo fan + runner reach visual and flow parity (swarm 01–02 P0). The shop demo remains the reference implementation for `BrandHeader`, section chips, cart bar, runner QR modal, and venue context strings.
3. **Do not resurrect the in-app Fan/Runner tab switcher** inside `apps/fan` or `apps/runner`. The legacy DemoApp tab switcher was removed on purpose (`apps/landing` copy: “Run each product surface as its own app”). A `TabSwitcher` primitive may still ship in `@stadiyums/ui` for **demo-only** or **landing** use — not for fan PWA navigation.
4. **Pilot entry pattern:** venue staff get role-specific URLs (or installed PWAs). Buyers in a walkthrough get a **curated link pair** or a lightweight **pilot landing page** (extend `apps/landing` or a `/pilot` route) that opens Fan and Runner in two tabs with venue name pre-filled — not a merged single app.

```text
Sales / evaluation          Pilot / game day
──────────────────          ─────────────────
demo.stadiyums.shop    →    fan.venue.com  (PWA)
  (tabs, in-memory)         runner.venue.com (PWA)
                            vendor.venue.com (desk)
```

### Parity definition

**Demo parity** = a venue operator comparing fan + runner side-by-side cannot tell which codebase they are on, except for the intentional absence of in-app role tabs.

| Dimension | Shop demo | Monorepo target |
| --- | --- | --- |
| Visual chrome | Navy `BrandHeader`, orange labels, navy seat block, orange cart bar | Same via shared `@stadiyums/ui` primitives (swarm 03) |
| Fan flow | Section chips → menu → cart → tracker | Same routes; replace `FanShell` scaffold |
| Runner flow | Queue + QR scan + advance | Same; standalone app at `:3001` |
| State | Client in-memory | Server-backed orders + optional localStorage for seat |
| Role switch | Tab switcher | Landing links or two bookmarks |

---

## 2. Section picker vs aisle / seat

### Current divergence

| Layer | Shop demo | Monorepo fan today | Product spec (`docs/features/fan-app.md`) |
| --- | --- | --- | --- |
| Fan seat UX | Horizontal **section chips** (108, 109, 112, 115, 204) under “Delivering to” | Numeric **Aisle #** + **Seat #** inputs | **Section**, **Row**, **Seat** — mandatory before browse |
| Tracker headline | Section-oriented delivery context | “Aisle {a} · Seat {s}” | Section → row → seat |
| Runner queue | “Chukchansi Park · Section 100s” | Zone check-in: “Sections 101–115” | Zone / section bands |
| DESIGN.md | “Aisle X – Seat Y” in tracker display tier | Same copy in `OrderTracker` | — |

“Aisle” in the monorepo is a **demo shortcut**, not stadium-native language. Venue ops, runners, and Chukchansi signage think in **sections and rows**. The shop demo’s section chips are the correct fan affordance for pilot.

### Canonical address model (pilot)

```text
section (required)  →  row (required for pilot)  →  seat (required)
```

- **Fan UI:** Section chip picker (static Chukchansi list OK for phase 1) + row + seat fields. Retire “Aisle #” labels; map legacy `aisle` field to `row` in API/schema when migrating.
- **Display copy (Ticket Stub Rule):** Space Mono — `Sec {section} · Row {row} · Seat {seat}` on tracker and runner cards. Archivo Black headline may shorten to `Section {section}` when row/seat are confirmed below.
- **Runner matching:** Queue filters by runner zone ↔ order `section` (section ranges already modeled in check-in). No separate “aisle” dimension.
- **Demo bridge:** Until schema migration, fan app can label row input “Row” while still posting `aisle` in the payload — **UI copy must not say “aisle”** in pilot-facing builds.

### Why not ship aisle/seat for pilot

Runners cannot match “Aisle 12” to a zone gate. Section chips align fan entry with runner zone check-in and match what the live shop demo already proves to buyers.

---

## 3. Venue label

### Shop demo behavior

- **Fan header:** `Chukchansi Park · Demo` (venue + mode)
- **Runner header:** `Chukchansi Park · Section 100s` (venue + active zone band)

Venue context answers “where am I?” in one glance — critical in a pilot with multiple stadiums or a white-label buyer evaluation.

### Monorepo today

- **Fan:** `FanShell` eyebrow is generic “StadiYums”; no venue string.
- **Runner:** `RunnerShell` hardcodes `Grizzlies · {zone}` — theme name, not venue.
- **Landing:** No venue; lists local ports only.

### Target: venue config SSOT

Single source per deployment (env or `venues` table), consumed by fan, runner, and vendor shells:

```ts
type VenueContext = {
  id: string;
  displayName: string;      // "Chukchansi Park"
  modeLabel?: string;       // "Demo" | "Pilot" | event name
  sections: string[];       // fan chip list
  runnerZones: { id: string; label: string; sectionRange: string }[];
};
```

**Rendering rules**

| App | Header context line | Example |
| --- | --- | --- |
| Fan | `{displayName} · {modeLabel}` | Chukchansi Park · Demo |
| Runner | `{displayName} · {zone.label}` | Chukchansi Park · Sections 101–115 |
| Vendor | `{displayName} · {vendorName}` | Chukchansi Park · Grizzlies Grill |

Implementation: pass `context` into `BrandHeader` (swarm 03). Remove hardcoded “Grizzlies” from runner chrome unless it is the **vendor** name on vendor routes.

**Pilot default:** One venue record seeded for Chukchansi; `modeLabel` = “Pilot” in production pilots, “Demo” on `demo.stadiyums.shop`.

---

## 4. QR scan

### Shop demo behavior

Runner tab exposes **Scan Fan's QR Code**:

- Modal with camera permission (“Enable camera”)
- **Simulate scan (demo)** for sales environments without hardware
- Copy: point camera at fan’s order QR

QR is the signature **trust + speed** affordance: runner confirms the right order without scrolling a long queue.

### Monorepo gap

Runner app has **no QR modal** (swarm 02 P0-1). Fan tracker does **not render an order QR** yet.

### Target flow (pilot)

```text
Fan places order → Tracker shows order QR (encode orderId + short HMAC/token)
Runner opens Scan → camera OR simulate → resolve token
  → if readyForPickup: claim (runnerAssigned) → Active
  → if atSection on Active: confirm delivered
```

| Concern | Pilot (phase 2) | Production (phase 3) |
| --- | --- | --- |
| Payload | `stadiyums://order/{id}?t={signedToken}` or compact JSON | Same; rotate signing secret per venue |
| Fan surface | QR on `/tracker` below status stepper; large enough for camera at arm’s length | + optional wallet / lock screen |
| Runner surface | Modal matching shop demo strings; **simulate** button required for demos | Camera-only; simulate behind `DEMO_MODE` env |
| Errors | Wrong zone, already claimed, expired token — inline alert | Same + audit log |
| Security | Short-lived token (e.g. 24h); no PII in QR | Rate limit scan endpoint |

**Coordination:** Fan swarm 01 (tracker) generates payload; runner swarm 02 (modal) consumes it; shared helper in `packages/core` or `packages/db` for sign/verify.

---

## 5. Phasing for pilot

Phases are ordered by **buyer credibility first**, then **ops truth**, then **pilot extras**. Counts reference swarm 01–02 P0 lists (6 items each).

### Phase 1 — Demo look-and-feel (buyer session)

**Goal:** Side-by-side fan + runner match `demo.stadiyums.shop` visually; venue label and section chips present.

| Workstream | Deliverables |
| --- | --- |
| Shared UI (swarm 03) | `BrandHeader` with logo + tagline chip; orange `SectionLabel`; `SeatPreviewBlock`; cart checkout variant; extract stepper/qty/cart bar |
| Fan (swarm 01 P0) | Retire `FanShell` on operate routes; navy seat block on order; tracker typography |
| Runner (swarm 02 partial) | Venue + zone in header; order card item color |
| Seat model | Section chips + row + seat UI; static Chukchansi sections |
| Venue | `VenueContext` from env; fan/runner headers show `Chukchansi Park · …` |

**Exit criteria:** A stakeholder opening `:3000` and `:3001` alongside the shop demo sees matching palette, headers, section selection, and seat blocks. Landing hub links both apps with venue name in page title or meta.

**Explicitly not in phase 1:** QR, HEX-62 transitions, vendor desk, PIN handoff.

---

### Phase 2 — Ops loop truth (runnable pilot)

**Goal:** One real order flows fan → vendor ready → runner claim → delivered with correct statuses and zone scope.

| Workstream | Deliverables |
| --- | --- |
| Fan | Persist seat + `activeOrderId`; receipt screen; section/row/seat on create order payload |
| Runner (swarm 02 P0) | Queue = `readyForPickup` only; zone-filtered; claim → `/active`; HEX-62 runner transitions |
| QR | Fan tracker QR + runner scan modal (camera + simulate) |
| Backend | Seed `readyForPickup` orders; `evaluateTransition` + version; one active order per runner |
| Vendor | Minimal desk to advance prep → `readyForPickup` (can be system-admin scaffold initially) |

**Exit criteria:** End-to-end dry run at a venue: fan orders from section 108, vendor marks ready, runner in zone claims via tap or QR simulate, fan tracker updates through delivered.

---

### Phase 3 — Pilot hardening (venue-ready)

**Goal:** Features venue staff need for a live event night; deprecate shop demo as reference.

| Workstream | Deliverables |
| --- | --- |
| Handoff | 4-digit PIN on fan tracker when `pickedUp` / `atSection` (per fan-app spec) |
| Comms | Runner quick templates; optional masked chat stub |
| Vendor | Full vendor app: menus, delay reporting, order desk |
| Admin | Operator cancel / audit; shift reporting |
| Demo | `demo.stadiyums.shop` redirects or embeds links to hosted pilot fan/runner **or** stays frozen as sales sandbox with “simulate” only |
| Security | Production QR (no simulate in prod); runner server session; token rotation |

**Exit criteria:** Paid pilot can run a game with multiple runners and one concession stand without engineering on call.

---

## 6. Decision log

| Decision | Choice | Rationale |
| --- | --- | --- |
| Single URL vs split apps | **Split apps** + pilot landing links | PRODUCT.md ops credibility; PWAs per role; demo tabs stay on shop only |
| Tab switcher in fan/runner | **No** | Removed with DemoApp; landing / sales demo owns role switching |
| Seat addressing | **Section + row + seat** | Matches shop demo chips, runner zones, and fan-app spec; retire “aisle” in UI |
| Venue string | **Config SSOT** in `BrandHeader` | Fan `Venue · Mode`, runner `Venue · Zone` |
| QR simulate | **Required through phase 2** | Sales and pilot rehearsal without camera hardware |
| Aisle in schema | **Map to row** internally | Avoid breaking changes; UI never says “aisle” in pilot |

---

## 7. Dependencies between swarm slices

```text
swarm 03 (shared UI) ──► swarm 01 (fan operate) ──┐
        │                                          ├──► phase 1 exit
        └──────────► swarm 02 (runner operate) ───┘
                              │
                    QR payload ◄── fan tracker
                              │
                    phase 2 ◄─┴── HEX-62 + vendor ready
```

---

## STATUS

**Doc complete.** Strategy aligns monorepo split-app architecture with `demo.stadiyums.shop` as the visual and narrative reference, resolves section-vs-aisle in favor of section/row/seat, defines venue labeling and QR handoff, and sequences pilot work in three phases.

### Recommendation

Keep **separate fan and runner apps** for pilot and production; use the shop demo and an optional pilot landing page to tell the whole-loop story for buyers. Converge on **section chip + row + seat**, **venue-aware `BrandHeader`**, and a **fan QR / runner scan pair** (with simulate through phase 2) before calling the monorepo pilot-ready. Do not merge roles back into one SPA — extract shared chrome into `@stadiyums/ui` so both URLs feel like the demo.

### Phase plan

1. **Phase 1 — Look-and-feel parity:** Shared `BrandHeader`, section chips, navy seat blocks, orange operate labels, and Chukchansi venue strings on fan and runner; retire `FanShell` / text-only runner headers.
2. **Phase 2 — Ops loop truth:** Zone-scoped `readyForPickup` queue, HEX-62 runner claim/advance, active delivery screen, fan order QR + runner scan modal (simulate included), vendor path to ready.
3. **Phase 3 — Pilot hardening:** PIN handoff, vendor desk, admin audit, production QR and sessions; shop demo frozen or linked as sales sandbox only.
