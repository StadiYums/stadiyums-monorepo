# Order lifecycle (HEX-62)

Schema + pure transition table only. Mutations that apply transitions are out of scope for HEX-62.

## Happy path

`placed → vendorAccepted → preparing → readyForPickup → runnerAssigned → atVendor → pickedUp → atSection → delivered`

Shortcut: `vendorAccepted → readyForPickup` for instantly ready items.

## Exception paths

| Status | Meaning |
|--------|---------|
| `vendorRejected` | Vendor declines before prep; requires `rejectionReason` |
| `customerCanceled` | Fan cancel during allowed window |
| `operatorCanceled` | Stadium operator audited cancel |
| `refunded` | Financial outcome; does not erase fulfillment history |

Vendor pause/delay is an attribute/event (`vendorPausedAtPlace`), not a status rewrite.

## Ownership

| Stage | Actor |
|-------|-------|
| Create `placed` | Fan checkout |
| Accept / reject / prep / ready | Vendor desk |
| Claim `readyForPickup` → `runnerAssigned` | Runner (same vendor + location + active shift) |
| `atVendor` → `delivered` | Assigned runner |
| Audited exceptions | Stadium operator |
| Routine transitions | Platform system admin — **none** |

## Concurrency

Writers must pass `expectedStatusVersion` and bump `statusVersion` on success. Retries that see the same from→to after success should be treated as idempotent no-ops by mutation implementers.

## Legacy demo mapping

Demo `orderService.advanceOrder` still advances:

`placed → preparing → on_the_way → delivered`

| Legacy | Granular |
|--------|----------|
| `placed` | `placed` |
| `preparing` | `preparing` (skipping `vendorAccepted` in demo) |
| `on_the_way` | `pickedUp` |
| `delivered` | `delivered` |

`on_the_way` remains in the schema union until demo data and writers migrate. New writers must not emit `on_the_way`.

Source of truth for edges: `packages/db/src/lib/order-transitions.ts`.
