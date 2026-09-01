# Design swarm — consolidated plan

Four parallel audits vs [demo.stadiyums.shop](https://demo.stadiyums.shop) and `DESIGN.md`. Impeccable surface briefs live in `.impeccable/surfaces/`.

## Briefs

| Doc | Slice |
| --- | --- |
| [01-fan-operate.md](./01-fan-operate.md) | Fan PWA chrome and Operate flow |
| [02-runner-operate.md](./02-runner-operate.md) | Runner queue, QR, Active screen |
| [03-shared-ui-extract.md](./03-shared-ui-extract.md) | `@stadiyums/ui` primitives and token drift |
| [04-demo-parity-strategy.md](./04-demo-parity-strategy.md) | Separate apps vs unified demo; phasing |

## Strategy ([04](./04-demo-parity-strategy.md))

Keep **separate fan and runner apps** for pilot/production. Match the shop demo visually and operationally. Do **not** bring back the in-app Fan/Runner tab switcher. Use landing links or a pilot hub for buyers who need both URLs.

## Phased rollout

### Phase 1 — Look-and-feel parity

Shared `BrandHeader`, section chips, navy seat blocks, orange operate labels, Chukchansi venue strings. Retire `FanShell` / text-only runner headers. **Start here:** fan P0 + shared UI extract (03).

### Phase 2 — Ops loop truth

Zone-scoped `readyForPickup` queue, HEX-62 claim/advance, Active delivery screen, fan order QR + runner scan modal (simulate OK), vendor path to ready. **Depends on:** `order-service` + runner P0 (02).

### Phase 3 — Pilot hardening

4-digit PIN handoff, vendor desk, admin audit, production QR and server sessions. Shop demo stays sales sandbox or frozen link.

## Next action

**Implement Phase 1 / fan P0** using `.impeccable/design.json` and `.impeccable/surfaces/fan-operate.md`.
