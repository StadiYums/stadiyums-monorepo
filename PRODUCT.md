# Product

## Register

product

## Users

**Fans in their seats** want concessions without leaving the action or standing in long lines. They are on mobile, often one-handed, in a loud and bright environment, checking the score between taps.

**Concession runners and stadium staff** need a clear queue of orders by seat, fast status updates, and zero ambiguity about what to deliver and where.

**Venue operators evaluating pilots** need to see the full loop in one demo: fan orders from seat, kitchen/runner fulfills, fan tracks delivery. They are deciding whether this fits their operations and brand, not browsing a marketing site.

## Product Purpose

StadiYums is in-seat concession ordering for live events. Fans order from their seat, staff fulfill via a runner queue, and everyone spends less time in lines and more time in the game.

The current live demo exists to **close venue pilots**: prove the workflow is real, stadium-appropriate, and operationally credible in a single session.

Success looks like a venue operator understanding the fan and runner flows within minutes and wanting to talk about a pilot.

## Brand Personality

**Game-day energy.** Confident, loud when it counts, never corporate. The product should feel like part of the stadium experience: navy and orange conviction, monospace ticket details, bold headlines that read at arm's length in daylight.

Emotional goal: fans feel they are still *in* the game while ordering; staff feel the tool keeps pace with a rush; buyers feel this was built for venues, not adapted from generic delivery software.

## Anti-references

**Generic SaaS landing patterns.** No purple gradients, hero metric blocks, identical icon-card feature grids, or "modern startup" chrome that could belong to any B2B tool. StadiYums should not look like it was generated from a SaaS template.

Also avoid feeling like a fast-food delivery app clone (DoorDash/Uber Eats UI patterns). This is in-venue, seat-specific ordering, not curbside delivery.

## Design Principles

1. **The game stays center stage.** Ordering is a means, not the experience. Flows are short, defaults are smart, and copy stays out of the way.
2. **Built for the bowl.** Design for bright sun, glare, noise, and one-handed use: high contrast, large tap targets, readable type at a glance.
3. **Show the whole loop.** The demo must make fan ordering and runner fulfillment equally legible so venue buyers trust the operational model.
4. **Stadium-native, not SaaS-generic.** Visual language should feel like game day and venue ops, not a horizontal software product pitch.
5. **Speed is the feature.** Every screen should answer "what do I do next?" immediately. Less lines is the promise; the UI must feel fast before the food arrives.

## Accessibility & Inclusion

**Outdoor and bright-stadium context** is the primary constraint: strong contrast between text and background, touch targets sized for gloves or hurried taps, and type that remains readable in direct sunlight.

Prefer static status over motion-dependent information. Respect `prefers-reduced-motion` for any animations added later.

Target WCAG 2.1 AA contrast for core UI; aim higher on primary actions and order status where sun glare is likely.
