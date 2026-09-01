---
version: 1
slug: "fan-operate"
primary_target: "apps/fan/src/app/**"
related_targets:
  - "packages/ui/src/**"
  - "docs/design/swarm/01-fan-operate.md"
  - "docs/design/swarm/04-demo-parity-strategy.md"
---

# Surface: Fan Operate

## Scope and mode

Operate. Fan PWA at `:3000` — seat → menu → place order → live tracker. Routes: `/`, `/order`, `/tracker`, `/receipt` (P1).

## Audience, job, action

Fans in their seats, one-handed, bright sun. Must pick concessions and confirm delivery to aisle/seat without leaving the game. Success: order placed, status readable at a glance, back to watching.

## Direction

**The End Zone Rush** (shared with `DESIGN.md` and demo.stadiyums.shop fan tab). Navy authority bar, orange action labels and cart bar, cream page, white cards, Space Mono for seats and prices. Not the marketing site’s Front-Office Deal Book (Archivo Narrow / letterhead). See `StadiYums/stadiyums-marketing` for Persuade surfaces only.

## Memorable moment

Orange cart bar slides up with white checkout CTA; tracker stepper dot glows orange on the current milestone.

## Composition inventory

| Region | Medium |
| --- | --- |
| `BrandHeader` | `@stadiyums/ui` — navy, venue context, tagline chip |
| Seat entry | Section chips (P1) or aisle/seat inputs + navy `SeatPreviewBlock` |
| Menu grid | `MenuGrid` + shared `QtyStepper` |
| Cart bar | Shared `CartBar` — orange fixed bar, mono totals |
| Tracker | `OrderStepper`, ETA green banner, line items |
| Chrome | Retire `FanShell` text headers on Operate routes |

## Constraints

Palette locked to demo.stadiyums.shop / `packages/ui/src/globals.css` (cream `#F7F5F0`, line `#E4E0D8`). No delivery-app UI. No card drop shadows. `VendorToggle` gated off Operate surfaces (P0-6). Poll 2s until push layer exists.

## P0 checklist

1. `BrandHeader` + content layout (replace `FanShell`)
2. Orange `SectionLabel` on Operate screens
3. Navy `SeatPreviewBlock` on `/order`
4. Checkout button white / orange-dim inside cart bar
5. Tracker seat headline Archivo Black display tier
6. Gate `VendorToggle`
