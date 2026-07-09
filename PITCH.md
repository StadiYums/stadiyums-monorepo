# StadiYums — Vendor Pitch Script

## Positioning

StadiYums is the **ordering platform**. The venue is the **experience**. Fans see the Fresno Grizzlies brand at Chukchansi Park; StadiYums powers the rails underneath.

---

## 5-minute demo flow

| Step | Action | What to say |
|------|--------|-------------|
| 1 | Open demo (StadiYums default) | "We built the in-seat ordering platform — fan app, runner queue, and live order tracking." |
| 2 | Click **Grizzlies mode** (bottom-left) | "This is what it looks like under your brand. Fans see Fresno Grizzlies — not StadiYums." |
| 3 | Point at navbar | "Powered by StadiYums in the header — we're infrastructure, you're the experience." |
| 4 | **Fan app** tab | "A fan enters their aisle and seat, browses the menu, and places an order without leaving their seat." |
| 5 | Place a sample order | Add a hot dog and drink → Place order → tracker appears |
| 6 | **Runner app** tab | "Your concession staff see a clear queue: seat number, items, time in queue, and one-tap status updates." |
| 7 | Advance the order | Tap through Preparing → On the way → Delivered |
| 8 | **Fan app** tab | "The fan's tracker updates in real time — no refresh, no leaving the game." |
| 9 | Click **Exit Grizzlies** (optional) | "Same platform, any venue — we white-label the full experience." |
| 10 | Close | Pilot scope, KPIs, and next step |

**Reset demo** (header) clears cart and orders if you need to run the flow again in the same meeting.

---

## Pilot proposal (verbal close)

- **Scope:** 1 section, 1–2 concession stands, 2–4 games, 4–6 weeks
- **Your team provides:** branded fan + runner experience, order routing, delivery tracking, pilot reporting
- **Venue provides:** menu/POS data, runner staffing, alcohol policy, WiFi/cellular reliability
- **KPIs:** average delivery time, orders per seat section, runner utilization, fan satisfaction (1-tap post-order survey)
- **Ask:** LOI for a co-funded pilot, or intro to concessions director for a scoped follow-up

---

## Objection handling

### "How do fans pay?"

Pilot: mobile wallet or Stripe checkout under the venue's brand. Production integrates with existing POS settlement. The demo skips payment to focus on the fulfillment loop — that's the operational bet.

### "How does this connect to our kitchen?"

The runner queue is the MVP kitchen display. Production pushes orders to stand printers or POS KDS via API. What you're seeing is proof that staff get seat, items, and status without decoding a generic delivery app.

### "What about beer / ID verification?"

Policy gate for pilot: alcohol items disabled in-app, or runner verifies ID at handoff. Configurable per venue. Not shown in demo scope.

### "We already use Fan Food / Bypass / CHEQ / etc."

Those tools optimize mobile ordering. StadiYums is built for **seat-native runner fulfillment** in a stadium context — high contrast, one-handed, game-day UX. Not a DoorDash clone adapted for venues.

### "What does a pilot cost us?"

Low lift: 2–4 runners, 1 stand, your team on-site for games 1–2. You bring tablets or they use existing devices. Co-funded pilot keeps risk low for both sides.

### "Is this production-ready?"

This is a pilot prototype with a clear production path: real-time sync, payments, POS integration, and ticket QR seat verification. The workflow is real; the integrations are phased.

---

## White-label story (key line)

> "Your fans order from the **Fresno Grizzlies** at Chukchansi Park. We power the ordering, routing, and tracking behind the scenes. You own the brand; we own the rails."

---

## Before the meeting

- [ ] Set Grizzlies mode once to confirm branding loads correctly
- [ ] Run fan → runner → fan loop once with Reset demo
- [ ] Confirm demo URL loads on venue WiFi or use phone hotspot
- [ ] Know the venue's concession vendor (Aramark, Levy, Delaware North, etc.) and POS if possible
