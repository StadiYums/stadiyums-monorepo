---
name: rendered-uniformity-review
description: Verify a web UI’s rendered spacing, alignment, responsive structure, and fixed or sticky controls before declaring a design change uniform. Use alongside Impeccable layout work or when a page looks inconsistent despite clean source checks.
---

# Rendered uniformity review

Use this review for a changed UI route after the implementation exists. It is a
release gate, not a source-code style check: a design token, screenshot, build,
or detector result cannot prove the output is uniform.

## Inspect the real route

1. Load the route with representative data and exercise the changed state.
2. Inspect the exact changed region at a narrow viewport, a wide viewport, and
   each breakpoint where its topology changes. Use the requested viewports when
   provided; otherwise use 390px, 1440px, and the viewport on either side of a
   responsive column or navigation transition.
3. Compare rendered boxes, not class names. Confirm shared page edges, component
   padding, card internals, text baselines, and control heights follow the same
   relationship as their nearest peers.
4. For fixed or sticky UI, inspect computed positioning and bounds. It must be
   fixed or sticky in the rendered CSS, remain within the viewport, retain the
   page inset on both sides, and avoid obscuring the required content.
5. Inspect content extremes that affect the changed area: one- vs multi-line
   labels, an empty and populated dock, long item names, and keyboard focus when
   interactive controls are involved.

## Make a verdict

Before handoff, record one of these outcomes with viewport evidence:

- **Uniform:** shared edges, rhythm, and responsive structure match the page.
- **Intentional exception:** name the difference and why the task hierarchy
  requires it.
- **Open inconsistency:** name the mismatch and do not claim the review passed.

If the route has a visual test harness, encode the observed contract as a
geometry assertion or screenshot test. Prefer semantic `data-ui` markers on
shared primitives so the test is resilient to copy and class-name changes.

## Stop condition

Do not call the page uniform until all changed regions have rendered evidence at
the required viewports and any automated layout contract passes. A clean
anti-pattern detector is supporting evidence only.
