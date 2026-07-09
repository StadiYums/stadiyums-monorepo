# StadiYums - Runner Application Feature Specifications

The Runner Application is a core component of the StadiYums ecosystem. It empowers stadium delivery personnel (runners) to efficiently accept, pick up, navigate, and deliver food and beverage orders directly to fans' seats.

---

## 1. Authentication & Shift Management
Features to handle onboarding, security, and tracking active stadium delivery staff using internal credentials.

*   **Employee ID Login:** Secure authentication using a unique stadium-issued Employee ID and a supervisor-provided temporary or permanent PIN/password.
*   **Zone/Section Check-in:** Upon logging in, runners manually select or are assigned to specific stadium zones (e.g., *Sections 101-115*, *Luxury Suites Left*). This optimizes the matching algorithm to keep runners near specific concourse kitchens.
*   **Availability Toggle:** A simple "Go Active / Go Inactive" toggle to pause incoming order assignments for breaks or end-of-shift.

---

## 2. Order Queue & Dispatch Dashboard
The central hub where runners manage their current workload.

*   **Order Matching & Acceptance:** Incoming order alerts based on the runner's selected zone. Runners must explicitly tap **"Accept Order"** to claim it.
*   **Batching Support:** Ability to accept multiple orders simultaneously if they originate from the same vendor and are going to the same or adjacent stadium sections.
*   **Order Overview Cards:** At-a-glance view of essential details before accepting:
    *   Vendor name/location
    *   Target delivery section
    *   Item count
    *   Estimated prep completion time

---

## 3. Vendor Pickup Workflow
Ensures order accuracy at the concession stand and relies on explicit manual updates to track the runner's progress.

*   **Arrived at Vendor Button:** A manual **"Arrived at Vendor"** click that updates the backend and notifies the customer that the runner is at the stand waiting for the pickup.
*   **Itemized Checklist:** Interactive checkboxes for runners to manually verify all items (e.g., ensuring drinks, lids, straws, and condiments are included) before leaving the counter.
*   **Confirm Pickup Button:** A mandatory **"Order Picked Up"** click after verification. This action triggers the food status to change to "In Transit" and lets the fan know their order is on the way.
*   **Delay Reporting:** A manual button to report vendor delays, protecting the runner's performance metrics if a kitchen is backed up.

---

## 4. Stadium Navigation & Seat Wayfinding
Clear UI elements to help runners locate fans quickly without automated background tracking.

*   **Structured Seat Address:** Large, high-contrast display of the destination: **Section → Row → Seat** (e.g., *Sec 108, Row H, Seat 12*).
*   **Concourse Wayfinding:** Static stadium map reference indicating the location of the concession stands relative to the target section entry tunnels (gates/vomitories).

---

## 5. Fan Delivery & Verification
Closing out the order securely using manual actions to trigger fan communication and complete the handoff.

*   **Manual "Arrived at Section" Update:** A deliberate click by the runner when they reach the fan's section entrance (e.g., clicking **"I'm at Section [X]"**). This explicitly sends a notification to the fan's app saying: *"Your runner has arrived at your section! Watch for them walking down the aisle."*
*   **Secure Handoff Verification:** 
    *   *Option A:* A unique 4-digit PIN provided by the fan's app that the runner must manually type in to complete the order.
    *   *Option B:* A manual **"Complete Delivery"** slide-to-confirm button once the items are in the fan's hands.
*   **Issue Escalation:** Quick reporting buttons for manually flagging issues like "Fan not at seat" or "Wrong person in seat."

---

## 6. Communication Hub
Safe, structured communication lines within the stadium.

*   **In-App Masked Chat:** Allows the runner to text the fan if a seat is hard to find, using anonymized phone routing to protect privacy.
*   **Quick Templates:** Pre-written messages such as:
    *   *"I'm at your row but don't see your seat number."*
    *   *"The line at the vendor is slightly backed up, but I have your food now!"*
*   **Support Hotline:** Direct link to contact stadium dispatch or tech support for immediate on-the-ground issues.

---

## 7. Performance & Earnings Tracking
Motivates runners and provides clear transparent metrics.

*   **Shift Summary:** Total deliveries completed, total active hours, and average delivery time (tracked via the manual status clicks).
*   **Earnings & Tips Breakdown:** Real-time visibility into base pay, completed delivery bonuses, and 100% transparent digital tips provided by fans.