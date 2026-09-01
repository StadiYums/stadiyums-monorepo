# UI Review Standards

## Uniformity before novelty

StadiYums reviews product UI in two passes. The first pass catches mechanical
problems: accessibility, overflow, invalid interaction states, and generic UI
anti-patterns. The second is a uniformity pass. It asks whether the design reads
as one deliberate system rather than a sequence of individually reasonable
decisions.

Neither pass replaces the other.

The executable companion is the local
[`rendered-uniformity-review`](../../.agents/skills/rendered-uniformity-review/SKILL.md)
skill. Use it for every Impeccable layout or refinement change; where a route
has a visual test harness, encode the observed contract so future changes cannot
silently reintroduce the same defect.

Run the fan order contract with `pnpm test:visual:order-layout`. It checks
rendered dock positioning and insets, seat-card icon inset, card-media density,
the responsive menu topology, and horizontal overflow at phone and desktop
sizes.

## Reviewer checklist

For every changed UI surface, compare the change with the rest of the page and
the shared UI system.

| Lens | Questions to answer |
| --- | --- |
| Spacing | Does it use the same spacing roles as nearby content? Are tight groups tight and major sections clearly separated? |
| Alignment | Do shared edges, baselines, and content widths line up? Is any inset a component padding or an accidental second page gutter? |
| Pattern | Does the control, heading, card, or status treatment match its equivalent elsewhere? If not, does hierarchy make the difference necessary? |
| Sequence | Does the visual order match the user’s task order, DOM order, and keyboard order? Is the primary action where a fan or runner expects it? |
| Responsive behavior | At narrow and wide layouts, do the same relationships hold after stacking, reflowing, or showing fixed controls? |
| Shared ownership | Could the decision recur? If so, is it expressed through a `@stadiyums/ui` token or primitive and documented in `DESIGN.md`? |

## Spacing roles

Use the shared spacing contract in `packages/ui/src/globals.css`:

- Local component rhythm: `--space-1` through `--space-16` on a 4px scale.
- Header clearance: `--space-header-block-start` and
  `--space-header-block-end`.
- Page shell: `--space-page-inline` and `--space-page-block`.
- Pages with a fixed cart or action dock: `--space-page-block-with-dock`.
- Major content groups: `--space-section`.

Do not introduce a one-off layout spacing value when an existing role describes
the relationship. If no role fits and the relationship will recur, add a named
role to `@stadiyums/ui` and update `DESIGN.md` in the same change.

## Reporting standard

Every UI handoff or design-review result must include a brief uniformity verdict:

- **Uniform:** the change matches the relevant shared pattern and page rhythm.
- **Intentional exception:** name the difference, why hierarchy requires it, and
  the viewport(s) where it was checked.
- **Open inconsistency:** name the mismatched peers, the user impact, and the
  recommended owner or next action.

A review that only says “no AI slop,” “detector clean,” or “looks good” is
incomplete. The reviewer must say whether the change matches the rest of the
page and shared system, and must surface any mismatch to the user.
