# Product

<!-- impeccable:product-schema 1 -->

## Platform

web (multi-app monorepo)

## Stack

Next.js 16 App Router, TypeScript, Tailwind CSS v4, Server Actions, PostgreSQL + Drizzle (`packages/db`). Apps: fan `:3000`, runner `:3001`, system-admin `:3002`, landing `:3003`, vendor `:3004`. Shared UI: `@stadiyums/ui`. Marketing site (Persuade) lives in [StadiYums/stadiyums-marketing](https://github.com/StadiYums/stadiyums-marketing).

## Users

**Fans in their seats** want concessions without leaving the action or standing in long lines. They are on mobile, often one-handed, in a loud and bright environment, checking the score between taps.

**Concession runners and stadium staff** need a clear queue of orders by seat, fast status updates, and zero ambiguity about what to deliver and where.

**Venue operators evaluating pilots** need to see the full loop in one demo: fan orders from seat, kitchen/runner fulfills, fan tracks delivery. They are deciding whether this fits their operations and brand, not browsing a marketing site.

## Product Purpose

StadiYums is in-seat concession ordering for live events. Fans order from their seat, staff fulfill via a runner queue, and everyone spends less time in lines and more time in the game.

The current live demo exists to **close venue pilots**: prove the workflow is real, stadium-appropriate, and operationally credible in a single session.

Success looks like a venue operator understanding the fan and runner flows within minutes and wanting to talk about a pilot.

## Positioning

In-seat delivery fulfilled by the venue’s own vendors — not a generic third-party delivery marketplace. Public line: **More game. Less lines.**

## Operating Context

- Product demo: https://demo.stadiyums.shop/ (fan + runner in one page; Chukchansi Park is a **demo venue**).
- Monorepo runs the same flows as separate apps for pilot development.
- Marketing site links to the demo; palette and mechanism must match what an AE shows.

## Brand Commitments

- Name spelling: **StadiYums** (capital Y).
- Voice line: **More game. Less lines.**
- Palette locked to demo.stadiyums.shop / `packages/ui/src/globals.css`:

  - navy `#0B1D33` — identity, chrome, primary text
  - navy-deep `#071527` / navy-2 `#132A47` — recessed chrome
  - orange `#FD490A` / orange-dim `#E44309` — primary action
  - green `#307C27` — success / delivered
  - cream `#F7F5F0` — page ground
  - line `#E4E0D8` — rules and borders
  - ink `#1A1A1A` / label-muted for secondary copy

  Operate apps use Archivo Black + Inter + Space Mono. Marketing Persuade uses Archivo Narrow — do not mix on product surfaces.

## Evidence on Hand

- Live demo at https://demo.stadiyums.shop/
- Impeccable surface briefs: `.impeccable/surfaces/fan-operate.md`, `runner-operate.md`
- Swarm gap analysis: `docs/design/swarm/`

Must not fabricate: partner stadiums, customer counts, revenue lifts, testimonials.

## Product Principles

1. **The game stays center stage.** Ordering is a means, not the experience. Flows are short, defaults are smart, and copy stays out of the way.
2. **Built for the bowl.** Design for bright sun, glare, noise, and one-handed use: high contrast, large tap targets, readable type at a glance.
3. **Show the whole loop.** The demo must make fan ordering and runner fulfillment equally legible so venue buyers trust the operational model.
4. **Stadium-native, not SaaS-generic.** Visual language should feel like game day and venue ops, not a horizontal software product pitch.
5. **Speed is the feature.** Every screen should answer "what do I do next?" immediately. Less lines is the promise; the UI must feel fast before the food arrives.

## Accessibility & Inclusion

**Outdoor and bright-stadium context** is the primary constraint: strong contrast between text and background, touch targets sized for gloves or hurried taps, and type that remains readable in direct sunlight.

Prefer static status over motion-dependent information. Respect `prefers-reduced-motion` for any animations added later.

Target WCAG 2.1 AA contrast for core UI; aim higher on primary actions and order status where sun glare is likely.
