---
version: 1
slug: "runner-operate"
primary_target: "apps/runner/src/app/**"
related_targets:
  - "packages/ui/src/**"
  - "docs/design/swarm/02-runner-operate.md"
  - "docs/design/swarm/04-demo-parity-strategy.md"
---

# Surface: Runner Operate

## Scope and mode

Operate. Runner app at `:3001` — zone check-in → queue → claim → active delivery → delivered. Routes: `/login`, `/check-in`, `/`, `/active`, `/shift`. QR scan modal (demo parity).

## Audience, job, action

Concession runners during a rush. Must see ready orders by seat, claim one run, advance handoff steps, confirm delivery. Success: zero ambiguity on what and where; one active order at a time.

## Direction

Same **End Zone Rush** Operate system as fan (`DESIGN.md`). Runner order cards: white, badge-only status (no left stripe), mono seat block, orange `advance` CTA. Venue + zone in header (`Chukchansi Park · Sections 101–115` for demo).

## Memorable moment

“Scan Fan’s QR Code” modal with camera permission + demo simulate — matches demo.stadiyums.shop runner tab.

## Composition inventory

| Region | Medium |
| --- | --- |
| `BrandHeader` | Venue + zone context |
| Queue | `OrderQueue` — `readyForPickup` only (target) |
| QR modal | New — claim / confirm delivery |
| Active | `/active` — post-claim step CTAs |
| Stats | `RunnerStats` on shift screen |
| Nav | Bottom `RunnerNav` — Queue · Active · Shift |

## Constraints

Queue must not show vendor prep states (`placed` / `preparing`) at pilot parity. Zone filter server-side when schema supports it. HEX-62 transitions replace `DEMO_STATUS_FLOW`. Item lines 13px `#5A5348` per DESIGN.md. Client PIN demo only until server session lands.

## P0 checklist

1. QR scan modal (camera + simulate)
2. Queue `readyForPickup` only
3. Claim → Active with one active order
4. Runner advance via `evaluateTransition`
5. Zone-scoped queue
6. Order card item styling
