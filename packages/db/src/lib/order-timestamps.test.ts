import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  applyMilestone,
  computeDurations,
  type OrderTiming,
} from "./order-timestamps.js";

describe("applyMilestone", () => {
  it("sets a missing milestone", () => {
    const base: OrderTiming = { placedAt: 1000 };
    const { next, applied } = applyMilestone(base, "vendorAcceptedAt", 1500);
    assert.equal(applied, true);
    assert.equal(next.vendorAcceptedAt, 1500);
  });

  it("never overwrites an existing milestone (idempotent)", () => {
    const base: OrderTiming = { placedAt: 1000, vendorAcceptedAt: 1500 };
    const { next, applied } = applyMilestone(base, "vendorAcceptedAt", 9999);
    assert.equal(applied, false);
    assert.equal(next.vendorAcceptedAt, 1500);
  });

  it("allows same-millisecond first write then no-ops", () => {
    const base: OrderTiming = { placedAt: 1000 };
    const first = applyMilestone(base, "readyForPickupAt", 2000);
    const second = applyMilestone(first.next, "readyForPickupAt", 2000);
    assert.equal(first.applied, true);
    assert.equal(second.applied, false);
  });
});

describe("computeDurations", () => {
  it("returns nulls when milestones are missing", () => {
    const d = computeDurations({ placedAt: 1000 });
    assert.equal(d.vendorResponseMs, null);
    assert.equal(d.preparationMs, null);
    assert.equal(d.readyWaitMs, null);
    assert.equal(d.runnerTravelToVendorMs, null);
    assert.equal(d.pickupServiceMs, null);
    assert.equal(d.deliveryMs, null);
    assert.equal(d.totalFulfillmentMs, null);
  });

  it("computes happy-path durations", () => {
    const d = computeDurations({
      placedAt: 0,
      vendorAcceptedAt: 100,
      preparationStartedAt: 120,
      readyForPickupAt: 500,
      runnerAssignedAt: 600,
      arrivedAtVendorAt: 800,
      pickedUpAt: 900,
      arrivedAtSectionAt: 1100,
      deliveredAt: 1200,
    });
    assert.equal(d.vendorResponseMs, 100);
    assert.equal(d.preparationMs, 380);
    assert.equal(d.readyWaitMs, 100);
    assert.equal(d.runnerTravelToVendorMs, 200);
    assert.equal(d.pickupServiceMs, 100);
    assert.equal(d.deliveryMs, 200);
    assert.equal(d.totalFulfillmentMs, 1200);
  });

  it("handles rejection response without fabricating prep", () => {
    const d = computeDurations({
      placedAt: 0,
      vendorRejectedAt: 50,
    });
    assert.equal(d.vendorResponseMs, 50);
    assert.equal(d.preparationMs, null);
    assert.equal(d.totalFulfillmentMs, null);
  });

  it("handles cancellation without delivery duration", () => {
    const d = computeDurations({
      placedAt: 10,
      vendorAcceptedAt: 20,
      canceledAt: 30,
    });
    assert.equal(d.vendorResponseMs, 10);
    assert.equal(d.totalFulfillmentMs, null);
  });

  it("tolerates out-of-order timestamps (negative elapsed, no fabrication)", () => {
    const d = computeDurations({
      placedAt: 100,
      vendorAcceptedAt: 50,
      deliveredAt: 200,
    });
    assert.equal(d.vendorResponseMs, -50);
    assert.equal(d.totalFulfillmentMs, 100);
    assert.equal(d.preparationMs, null);
  });

  it("uses pickedUp as ready-wait end when assignment missing", () => {
    const d = computeDurations({
      placedAt: 0,
      readyForPickupAt: 100,
      pickedUpAt: 250,
    });
    assert.equal(d.readyWaitMs, 150);
  });
});
