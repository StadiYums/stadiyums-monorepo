---
name: StadiYums
description: More game. Less lines.
colors:
  navy: "#0B1D33"
  navy-deep: "#071527"
  orange: "#FD490A"
  orange-dim: "#E44309"
  green: "#307C27"
  cream: "#F5F3EF"
  ink: "#1A1A1A"
  line: "#0B1D331A"
  label-muted: "#6B6459"
  placeholder: "#A89F8C"
  surface-white: "#FFFFFF"
typography:
  display:
    fontFamily: "'Archivo Black', sans-serif"
    fontWeight: 400
    lineHeight: 1.2
  headline:
    fontFamily: "'Archivo Black', sans-serif"
    fontSize: "24px"
    fontWeight: 400
    lineHeight: 1.2
  title:
    fontFamily: "'Inter', sans-serif"
    fontSize: "15px"
    fontWeight: 600
    lineHeight: 1.4
  body:
    fontFamily: "'Inter', sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "'Space Mono', monospace"
    fontSize: "11.5px"
    fontWeight: 700
    letterSpacing: "0.08em"
    lineHeight: 1.4
rounded:
  sm: "8px"
  md: "10px"
  lg: "12px"
  xl: "14px"
  pill: "100px"
spacing:
  xs: "6px"
  sm: "12px"
  md: "16px"
  lg: "22px"
  xl: "24px"
  page-gutter: "20px"
components:
  button-primary:
    backgroundColor: "{colors.surface-white}"
    textColor: "{colors.orange-dim}"
    rounded: "{rounded.sm}"
    padding: "12px 22px"
  button-primary-hover:
    backgroundColor: "{colors.cream}"
    textColor: "{colors.orange-dim}"
  button-secondary:
    backgroundColor: "{colors.navy}"
    textColor: "{colors.cream}"
    rounded: "{rounded.sm}"
    padding: "14px 16px"
  button-secondary-disabled:
    backgroundColor: "#D8D2C4"
    textColor: "{colors.placeholder}"
  tab-active:
    backgroundColor: "{colors.orange}"
    textColor: "{colors.surface-white}"
    rounded: "7px"
    padding: "10px 14px"
  card:
    backgroundColor: "{colors.surface-white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.xl}"
    padding: "{spacing.lg}"
  input-field:
    backgroundColor: "{colors.cream}"
    textColor: "{colors.navy}"
    rounded: "{rounded.sm}"
    padding: "13px 12px"
  status-badge:
    backgroundColor: "#FD490A1A"
    textColor: "{colors.orange-dim}"
    rounded: "{rounded.pill}"
    padding: "5px 10px"
---

# Design System: StadiYums

## 1. Overview

**Creative North Star: "The End Zone Rush"**

StadiYums looks like the last two minutes of a close game: navy conviction, orange urgency, numbers you can read at arm's length in daylight. The UI is a scoreboard-first mobile tool, not a marketing site. Fans get in, order, and get back to the action. Runners see seat numbers, items, and status without decoding corporate chrome.

Surfaces stay light (cream and white) because fans use this outdoors in direct sun. Depth comes from tonal blocks (navy header, orange cart bar, green success states), not from drop shadows. Typography splits three ways on purpose: Archivo Black for impact, Inter for readable body copy, Space Mono for seat numbers, prices, and operational labels.

This system explicitly rejects generic SaaS landing patterns and fast-food delivery app clones. No purple gradients, hero metric blocks, identical feature-card grids, or DoorDash-style UI.

**Key Characteristics:**

- Light theme optimized for bright stadium glare
- Orange as the action color: tabs, labels, cart bar, active steps
- Navy as the authority color: headers, primary buttons, seat blocks
- Monospace for anything operational (seats, prices, order IDs, badges)
- Flat elevation: borders and background tints, almost no shadows
- Scoreboard density: high contrast, chunky tap targets, status at a glance

## 2. Colors: The Game-Day Palette

A committed stadium palette: navy and orange carry identity, cream keeps the bowl readable in sun, green confirms delivery.

### Primary

- **Orange** (#FD490A): Primary action and urgency. Active tab, section labels, cart bar, current stepper dot, brand accent in wordmark. This is the "go" signal.
- **Orange Dim** (#E44309): Pressed and secondary orange contexts. Checkout button text, status badge text when orange-tinted.

### Secondary

- **Navy** (#0B1D33): Authority and structure. Header background, seat preview blocks, secondary buttons, stat chips, on-the-way status. Body text on light surfaces uses navy for prices and emphasis.
- **Navy Deep** (#071527): Recessed chrome. Tab container background, one step darker than header navy for nested controls.

### Tertiary

- **Green** (#307C27): Success and completion. Delivered status, done stepper steps, ETA banner accents. Never used for primary actions.

### Neutral

- **Cream** (#F5F3EF): Page background and input fill. The default "paper" of the app in sunlight.
- **Ink** (#1A1A1A): Primary body text on light surfaces.
- **Surface White** (#FFFFFF): Cards, menu items, cart checkout button fill.
- **Line** (rgba(11,29,51,0.1)): Standard 1px borders on cards, inputs, dividers.
- **Label Muted** (#6B6459): Field labels, order IDs, queue titles, empty states.
- **Placeholder** (#A89F8C): Input placeholder text, disabled button labels.

### Named Rules

**The Orange Clock Rule.** Orange appears on every screen where the user must act now: active tab, section label, cart bar, current order step. If orange is decorative, remove it.

**The Sunlight Rule.** Never place low-contrast gray text on cream for anything operational. Seat numbers, prices, and status must pass a squint test in direct sun.

## 3. Typography

**Display Font:** Archivo Black (sans-serif fallback)
**Body Font:** Inter (system sans fallback)
**Label/Mono Font:** Space Mono (monospace fallback)

**Character:** Archivo Black hits like stadium signage. Inter keeps menu copy and descriptions legible. Space Mono makes seat and price data scannable like a ticket stub or scoreboard line.

### Hierarchy

- **Display** (400, 18px brand / 24px tracker headline, 1.2): Brand wordmark, order tracker seat headline ("Aisle X - Seat Y"). Archivo Black only.
- **Headline** (400, 24px, 1.2): Primary screen titles in tracker and runner views.
- **Title** (600, 15px, 1.4): Menu item names. Inter semibold.
- **Body** (400-700, 14px, 1.5): Descriptions, cart copy, order list rows. Max ~65ch where prose appears.
- **Label** (700, 11.5px, 0.08em letter-spacing, uppercase): Section labels ("ORDER STATUS"), field labels, queue titles, status badges, tab buttons at 13.5px semibold.

### Named Rules

**The Ticket Stub Rule.** Anything a runner or fan needs to act on (seat, aisle, price, order ID, status, ETA) is Space Mono, weight 700 where numeric.

**The Signage Rule.** Archivo Black is for headings only. Never use it for body paragraphs or form labels.

## 4. Elevation

This system is flat by default. Depth is communicated through background color steps (cream page, white cards, navy blocks, orange cart bar), 1px hairline borders, and occasional tinted badge backgrounds. Shadows are rare.

The only structural glow is the current stepper dot: a 5px orange ring (`box-shadow: 0 0 0 5px rgba(253,73,10,0.15)`) to mark the active order stage. No card shadows, no glass blur, no floating panels.

### Shadow Vocabulary

- **Stepper focus ring** (`box-shadow: 0 0 0 5px rgba(253,73,10,0.15)`): Current order status step only. Do not reuse on cards or buttons.

### Named Rules

**The Flat Bowl Rule.** Surfaces sit flush. If you need hierarchy, change the background color or add a border. Do not add drop shadows to cards or menu items.

## 5. Components

Scoreboard direct: high contrast blocks, minimal chrome, numbers and status first. Every interactive target is thumb-sized.

### Buttons

- **Shape:** Soft corners (8px radius on primary actions, 9px on full-width navy buttons).
- **Primary (checkout):** White fill, orange-dim text, 12px 22px padding, 700 weight at 14.5px. Lives in the fixed orange cart bar.
- **Secondary (again, advance):** Navy fill, cream text, 700 weight. Full-width on fan "order again"; compact on runner advance.
- **Disabled:** #D8D2C4 background, #A89F8C text. No hover change.
- **Qty steppers:** 30px circular buttons, cream fill, 1.5px line border, navy text.

### Chips / Tags

- **Tagline tag:** Space Mono uppercase, orange text, 1px orange-tinted border, pill radius (100px), 5px 12px padding.
- **Status badge:** Space Mono 11px uppercase, pill radius, tinted background per status (orange for placed/preparing, navy tint for on the way, green tint for delivered).

### Cards / Containers

- **Corner Style:** 12px to 14px radius (menu items 12px, main cards 14px).
- **Background:** White on cream page.
- **Shadow Strategy:** None. See Elevation.
- **Border:** 1px var(--line) on all sides.
- **Internal Padding:** 14px (menu items) to 22px (main cards).

### Inputs / Fields

- **Style:** Cream background, 1.5px line border, 8px radius, Space Mono 16px bold value text, navy color.
- **Label:** Space Mono 11.5px uppercase, label-muted color, 0.04em letter-spacing.
- **Placeholder:** #A89F8C, weight 400.
- **Focus:** Not yet defined in demo. Future: 2px orange outline, no glow blur.

### Navigation

- **Tab switcher:** Navy-deep pill container (10px radius, 4px padding). Inactive tabs: transparent, 60% cream text. Active tab: orange fill, white text, 7px inner radius. Icons from Tabler at 16px.
- **Header:** Full-width navy bar, cream text, brand logo 42px circle, tagline chip on the right.

### Seat Preview Block

- **Style:** Full-width navy block, cream text, Space Mono 14px, orange icon accent. Shows resolved aisle/seat before ordering.

### Order Stepper

- **Dots:** 34px circles. Inactive: #E7E1D3. Done: green fill. Current: orange fill with focus ring.
- **Labels:** Space Mono 11px uppercase below each dot.

### Cart Bar

- **Style:** Fixed bottom, full-width orange bar, slides up with transform transition (0.25s ease). White checkout button on the right.

### Runner Order Card

- **Style:** White card, seat block in mono navy, items in 13px muted brown (#5A5348), status badge, advance button. Status currently indicated by a 4px left border (legacy demo pattern; prefer full-border or badge-only status in new work).

## 6. Do's and Don'ts

Concrete guardrails for anyone extending this demo into a pilot-ready product.

### Do:

- **Do** keep the page background cream (#F5F3EF) and cards white for sun readability.
- **Do** use Space Mono for seats, prices, order IDs, ETAs, and status badges.
- **Do** use orange (#FD490A) only where the user must act or pay attention now.
- **Do** size tap targets at 30px minimum (qty buttons, tabs, checkout).
- **Do** keep transitions short (0.15s to 0.3s ease) on color and transform only.
- **Do** show fan and runner flows with equal visual weight so venue buyers trust the ops loop.

### Don't:

- **Don't** use generic SaaS landing patterns: purple gradients, hero metric blocks, identical icon-card feature grids, or modern startup chrome.
- **Don't** clone fast-food delivery app UI (DoorDash/Uber Eats layouts, cart patterns, or typography).
- **Don't** add drop shadows to cards, menu items, or buttons. This system is flat.
- **Don't** use gradient text, glassmorphism, or decorative blur.
- **Don't** use Archivo Black for body copy or form labels.
- **Don't** add 4px colored left stripes on new cards or list items. Use status badges or full-border tints instead (legacy order cards in the demo still use left stripes; refactor when touched).
- **Don't** rely on motion to communicate status. Order progress must be readable as static color and label.
