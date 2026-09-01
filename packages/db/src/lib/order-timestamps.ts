/**
 * Order milestone timestamps + pure duration helpers (HEX-65).
 * Mutations wire timestamps; this module never talks to the database.
 *
 * Elapsed durations are always `end - start` in milliseconds and ignore venue
 * timezone. Venue TZ only affects calendar aggregation buckets elsewhere.
 */

export const ORDER_MILESTONE_FIELDS = [
  "placedAt",
  "vendorAcceptedAt",
  "preparationStartedAt",
  "readyForPickupAt",
  "runnerAssignedAt",
  "arrivedAtVendorAt",
  "pickedUpAt",
  "arrivedAtSectionAt",
  "deliveredAt",
  "vendorRejectedAt",
  "canceledAt",
  "vendorDelayReportedAt",
] as const;

export type OrderMilestoneField = (typeof ORDER_MILESTONE_FIELDS)[number];

export type OrderTiming = {
  placedAt: number;
  vendorAcceptedAt?: number;
  preparationStartedAt?: number;
  readyForPickupAt?: number;
  runnerAssignedAt?: number;
  arrivedAtVendorAt?: number;
  pickedUpAt?: number;
  arrivedAtSectionAt?: number;
  deliveredAt?: number;
  vendorRejectedAt?: number;
  canceledAt?: number;
  vendorDelayReportedAt?: number;
  vendorDelayReason?: string;
  vendorDelayNoteId?: string;
};

export type OrderDurations = {
  /** placed → accepted or rejected */
  vendorResponseMs: number | null;
  /** accepted or preparationStarted → ready */
  preparationMs: number | null;
  /** ready → runner assigned (or pickedUp if assigned missing) */
  readyWaitMs: number | null;
  /** assigned → at vendor */
  runnerTravelToVendorMs: number | null;
  /** at vendor → picked up */
  pickupServiceMs: number | null;
  /** picked up → section or delivered */
  deliveryMs: number | null;
  /** placed → delivered */
  totalFulfillmentMs: number | null;
};

function elapsed(start: number | undefined, end: number | undefined): number | null {
  if (start === undefined || end === undefined) {
    return null;
  }
  return end - start;
}

/**
 * Idempotent milestone write: never overwrites an existing timestamp.
 * Same-millisecond re-application is a no-op once set.
 */
export function applyMilestone(
  current: OrderTiming,
  field: Exclude<OrderMilestoneField, "placedAt">,
  at: number,
): { next: OrderTiming; applied: boolean } {
  if (current[field] !== undefined) {
    return { next: current, applied: false };
  }
  return { next: { ...current, [field]: at }, applied: true };
}

export function computeDurations(order: OrderTiming): OrderDurations {
  const vendorResponseEnd = order.vendorAcceptedAt ?? order.vendorRejectedAt;
  const preparationStart = order.preparationStartedAt ?? order.vendorAcceptedAt;
  const readyWaitEnd = order.runnerAssignedAt ?? order.pickedUpAt;
  const deliveryEnd = order.arrivedAtSectionAt ?? order.deliveredAt;

  return {
    vendorResponseMs: elapsed(order.placedAt, vendorResponseEnd),
    preparationMs: elapsed(preparationStart, order.readyForPickupAt),
    readyWaitMs: elapsed(order.readyForPickupAt, readyWaitEnd),
    runnerTravelToVendorMs: elapsed(order.runnerAssignedAt, order.arrivedAtVendorAt),
    pickupServiceMs: elapsed(order.arrivedAtVendorAt, order.pickedUpAt),
    deliveryMs: elapsed(order.pickedUpAt, deliveryEnd),
    totalFulfillmentMs: elapsed(order.placedAt, order.deliveredAt),
  };
}
