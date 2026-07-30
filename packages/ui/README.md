# `@stadiyums/ui`

Shared design system for fan, runner, and admin apps (HEX-143 / HEX-174).

## Tokens

Defined in `src/globals.css`:

| Token | Role |
| --- | --- |
| `--navy` / `--navy-2` / `--navy-soft` | Brand surfaces, primary controls |
| `--orange` / `--orange-2` | Accent, active nav, conversion |
| `--cream` | Page surround |
| `--line` | Warm borders |
| `--label-muted` | Section labels, secondary copy |
| `--green` / `--green-2` | Success / delivered |
| `--radius` (16px) | Default card radius via `--radius-lg` |

Semantic aliases: `--color-surface`, `--color-foreground`, `--color-accent`, `--color-success`, `--color-border`, `--color-muted`, `--color-focus-ring`.

## Primitives

- `AppShell` — cream surround + white frame (`mobile` ≈520px, `wide` ops)
- `BrandHeader` — navy brand block
- `Card` — variants: `default` \| `menu` \| `workflow` \| `metric` \| `alert`
- `Button` — `primary` \| `secondary` \| `advance` \| `icon` \| `destructive` (min 44px)
- `Input`, `SectionLabel`, `StatusBadge`

Apps should not hardcode the core palette; use Tailwind theme colors (`bg-navy`, `border-line`, …) or CSS variables.
