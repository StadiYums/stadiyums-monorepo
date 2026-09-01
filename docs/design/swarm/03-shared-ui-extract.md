# Swarm 03 — Shared UI Extract (`@stadiyums/ui` vs `DESIGN.md`)

Audit of `packages/ui/src/**` against the canonical design spec in [`DESIGN.md`](../../../DESIGN.md) (HEX-174 / HEX-143). Focus: fan-flow primitives named in the swarm brief and token alignment in `globals.css`.

**Sources read:** `packages/ui/src/index.ts`, `globals.css`, all exported components, `apps/fan` inline implementations (`CartBar`, `MenuGrid`, `OrderTracker`, `SeatForm`).

---

## STATUS

| Area | State |
| --- | --- |
| Package exports | 11 public symbols (shells, form, badge, theme) — **no** `CartBar`, `OrderStepper`, `SeatPreviewBlock`, `TabSwitcher`, `QtyStepper` |
| `BrandHeader` | **Partial** — exported but missing logo circle + tagline chip per spec |
| Fan primitives | **App-local** — stepper, qty, cart bar, seat preview duplicated inline in `apps/fan` |
| `TabSwitcher` | **Missing everywhere** — legacy DemoApp tab switcher removed; not re-scaffolded |
| Design tokens | **Drifted** — `globals.css` follows stadiyums.shop / HEX-174 palette extensions, not raw `DESIGN.md` YAML |
| Button semantics | **Inverted vs spec** — `primary` is navy/cream in code; spec `button-primary` is white/orange-dim (checkout) |

**Recommendation:** Extract presentational primitives into `@stadiyums/ui`, align tokens to `DESIGN.md` (or update `DESIGN.md` to codify HEX-174 extensions), add a `checkout` button variant for cart-bar CTA.

---

## Missing components list

| Component | In `@stadiyums/ui`? | Current location | Gap vs `DESIGN.md` |
| --- | --- | --- | --- |
| **BrandHeader** | Partial (`BrandHeader.tsx`) | Exported | No 42px logo circle; no tagline chip; `trailing` slot is generic, not spec-shaped |
| **CartBar** | No | `apps/fan/.../CartBar.tsx` | Presentational shell + slide transition not shared; couples to `placeOrderAction`, router, `FanProvider` |
| **OrderStepper** | No | Inline in `OrderTracker.tsx` (~30 lines) | Logic tied to `ORDER_STEPS`; dots/labels match spec visually but not reusable |
| **SeatPreviewBlock** | No | Inline in `SeatForm.tsx`; plain text in `order/page.tsx` | Navy block + mono cream text exists only in seat form; no orange icon accent prop |
| **TabSwitcher** | No | None (removed with DemoApp) | Full spec: navy-deep container, active orange tab, Tabler icons 16px |
| **QtyStepper** | No | Inline in `MenuGrid.tsx` | 30px circular ± buttons match spec; not extracted |

### Already in package (context)

| Export | Notes |
| --- | --- |
| `AppShell`, `WorkspaceShell` | Layout frames — not in swarm brief |
| `Button`, `Card`, `Input`, `SectionLabel`, `StatusBadge` | Core form/surface primitives |
| `MenuIcon`, `ConnectionBanner`, `VendorToggle` | App-specific helpers |
| `ThemeProvider`, `THEMES`, `money`, `OrderStatus` | Theme + formatting utilities |

---

## Props API sketch (per target primitive)

Sketches are **presentational** — apps own data, routing, and mutations.

### `BrandHeader`

```tsx
type BrandHeaderProps = {
  /** Wordmark text or custom node; default "StadiYums" */
  title?: ReactNode;
  /** Space Mono context line under wordmark (section / venue) */
  context?: string;
  /** 42px circle — image URL or ReactNode; DESIGN: brand logo */
  logo?: ReactNode;
  /** Tagline chip — DESIGN: "More game. Less lines." pill on the right */
  tagline?: string;
  /** Escape hatch when layout diverges (e.g. Grizzlies theme) */
  trailing?: ReactNode;
  className?: string;
};
```

**Spec alignment:** Full-width navy bar, cream text, Archivo Black wordmark, tagline chip (Space Mono, orange text, orange-tint border, pill).

---

### `CartBar`

```tsx
type CartBarProps = {
  /** Item count for summary line */
  itemCount: number;
  /** Formatted total — use `money()` from package */
  totalLabel: string;
  /** Controls slide-up visibility (transform 0.25s ease) */
  visible: boolean;
  /** Checkout CTA — white fill, orange-dim text per DESIGN */
  actionLabel: string;
  onAction: () => void;
  actionDisabled?: boolean;
  /** Optional error above summary */
  error?: string | null;
  className?: string;
};
```

**Spec alignment:** Fixed bottom, full-width orange, white checkout button right, mono count/price.

**Fan migration:** Keep `placeOrderAction` + validation in `apps/fan`; pass computed `itemCount`, `totalLabel`, handlers into shared `CartBar`.

---

### `OrderStepper`

```tsx
type OrderStepKey = string; // or import OrderStatus subset from @stadiyums/types

type OrderStep = {
  key: OrderStepKey;
  label: string; // Space Mono 11px uppercase below dot
};

type OrderStepperProps = {
  steps: readonly OrderStep[];
  /** Index of current step (0-based) */
  currentIndex: number;
  /** Optional connector line between dots */
  showConnectors?: boolean;
  className?: string;
};
```

**Spec alignment:** 34px dots — inactive `#E7E1D3`, done green, current orange + `box-shadow: 0 0 0 5px rgba(253,73,10,0.15)`. Labels below each dot.

**Fan migration:** `OrderTracker` passes `ORDER_STEPS` + computed `currentIndex` from `order.status`.

---

### `SeatPreviewBlock`

```tsx
type SeatPreviewBlockProps = {
  aisle: string;
  seat: string;
  /** Resolved display when empty — default "—" */
  emptyPlaceholder?: string;
  /** Optional Tabler icon or emoji — DESIGN: orange accent */
  icon?: ReactNode;
  /** Template override; default: "We'll deliver straight to Aisle {aisle}, Seat {seat}." */
  children?: ReactNode;
  className?: string;
};
```

**Spec alignment:** Full-width navy block, cream Space Mono 14px, orange icon accent.

**Fan migration:** Replace navy `div` in `SeatForm`; use on `order/page.tsx` instead of plain `Card` text.

---

### `TabSwitcher`

```tsx
type TabOption<T extends string = string> = {
  id: T;
  label: string;
  icon?: ReactNode; // Tabler 16px per DESIGN
};

type TabSwitcherProps<T extends string = string> = {
  tabs: readonly TabOption<T>[];
  value: T;
  onChange: (id: T) => void;
  /** Accessible name for the tablist */
  "aria-label"?: string;
  className?: string;
};
```

**Spec alignment:** Navy-deep container (`10px` radius, `4px` padding). Inactive: transparent, 60% cream text. Active: orange fill, white text, `7px` inner radius.

**Note:** No current consumer in monorepo; needed for multi-surface demos (fan / runner / vendor jump) or in-app section nav.

---

### `QtyStepper`

```tsx
type QtyStepperProps = {
  value: number;
  min?: number; // default 0
  max?: number;
  onChange: (next: number) => void;
  /** Disable decrement at min (default true) */
  disableAtMin?: boolean;
  className?: string;
};
```

**Spec alignment:** 30px circular buttons, cream fill, 1.5px line border, navy text; mono centered quantity.

**Fan migration:** Replace ± buttons in `MenuGrid` with `<QtyStepper value={qty} onChange={...} />`.

---

## Token drifts (`globals.css` vs `DESIGN.md`)

### Colors

| Token | `DESIGN.md` | `packages/ui/src/globals.css` | Severity |
| --- | --- | --- | --- |
| `--cream` | `#F5F3EF` | `#f7f5f0` | Medium — page surround warmer in spec |
| `--line` | `rgba(11,29,51,0.1)` (`#0B1D331A`) | `#e4e0d8` (opaque warm gray) | **High** — borders not navy-tinted |
| `--label-muted` | `#6B6459` (warm brown) | `#6b7280` (cool gray) | Medium |
| `--placeholder` | `#A89F8C` | `#9ca3af` | Medium |
| `--input-bg` | (same as cream `#F5F3EF`) | `#f7f5f0` | Low — duplicates drifted cream |
| `--navy-2`, `--navy-soft`, `--orange-2`, `--green-2` | Not in spec | Present | Extension — document or prune |
| `--color-focus-ring` | Not defined (future: 2px orange) | `rgba(253,73,10, 0.35)` | Spec gap — implementation ahead of doc |

**Aligned:** `--navy`, `--navy-deep`, `--orange`, `--orange-dim`, `--green`, `--ink`, `--surface-white`, stepper inactive vars, disabled `#d8d2c4`.

### Radius

| Token | `DESIGN.md` | `globals.css` `@theme` |
| --- | --- | --- |
| `sm` | `8px` | `10px` |
| `md` | `10px` | `12px` |
| `lg` | `12px` | `16px` |
| `xl` | `14px` | `16px` |
| `pill` | `100px` | `100px` ✓ |
| `--radius` (root) | — | `16px` (undocumented) |

Cards use `rounded-lg` (maps to drifted `--radius-lg` 16px); spec main cards want **14px**.

### Spacing

`DESIGN.md` defines `xs` 6px → `page-gutter` 20px. **`globals.css` has no spacing scale** — apps hardcode Tailwind (`px-4`, `p-3.5`, `gap-3.5`).

### Typography

Fonts load in app layouts (`Archivo_Black`, `Inter`, `Space_Mono`) and map to `--font-display`, `--font-body`, `--font-mono` in `@theme`. **No size/weight tokens** for display/headline/title/body/label scales from `DESIGN.md` YAML.

### Component-level token usage

| Pattern | `DESIGN.md` | Current implementation |
| --- | --- | --- |
| Checkout / primary CTA | White bg, orange-dim text | `Button` `primary` = navy bg, cream text |
| Secondary CTA | Navy bg, cream text | `Button` `secondary` = white bordered |
| Tab active | Orange bg, white text | N/A — no `TabSwitcher` |
| Input value | Space Mono **16px** bold | `ui/input.tsx` uses **15px** |
| Section label | 11.5px label, 0.08em tracking | `SectionLabel` uses **13px** |
| Card padding | 14px menu / 22px main | `ui/card.tsx` default `p-3.5` (14px) ✓ menu; wrapper cards add variants |

### `themes.ts` vs `globals.css`

`THEMES.default.colors.cream` and `line` match **globals** (`#F7F5F0`, `rgba(11,29,51,0.1)` for line in theme) while **root CSS `--line`** is `#e4e0d8`. Runtime `applyThemeColors()` updates navy/orange/cream/line but initial paint uses drifted CSS defaults.

---

## Extraction order (suggested)

1. **Token pass** — reconcile `globals.css` with `DESIGN.md` (or amend `DESIGN.md` for HEX-174 shop tokens); add spacing scale.
2. **`QtyStepper`** + **`OrderStepper`** — lowest coupling; immediate `MenuGrid` / `OrderTracker` wins.
3. **`SeatPreviewBlock`** + presentational **`CartBar`** — unify fan seat + checkout chrome.
4. **`BrandHeader`** — add `logo` + `tagline`; align runner/vendor headers.
5. **`TabSwitcher`** — when multi-tab fan nav or landing hub needs it.
6. **`Button`** — add `checkout` variant (white/orange-dim) without breaking existing `primary`/`secondary` call sites.

---

## File map (today)

```
packages/ui/src/
  components/
    BrandHeader.tsx          ← partial
    Button.tsx / ui/button.tsx
    Card.tsx / ui/card.tsx
    Input.tsx / ui/input.tsx
    StatusBadge.tsx
    AppShell.tsx
    WorkspaceShell.tsx
    …
  globals.css                ← token source of truth (drifted)
  index.ts                   ← no CartBar, OrderStepper, SeatPreviewBlock, TabSwitcher, QtyStepper

apps/fan/src/features/orders/components/
  CartBar.tsx                ← extract shell
  MenuGrid.tsx               ← extract QtyStepper
  OrderTracker.tsx           ← extract OrderStepper

apps/fan/src/components/
  SeatForm.tsx               ← extract SeatPreviewBlock
```
