/**
 * Shared order status labels and step config for fan tracker + runner badges.
 * Backend validators/transitions remain HEX-62; this module is the UI/constants SSOT.
 */

export const ORDER_STATUSES = [
  "placed",
  "vendorAccepted",
  "preparing",
  "readyForPickup",
  "runnerAssigned",
  "atVendor",
  "pickedUp",
  /** @deprecated Prefer `pickedUp` — retained until HEX-62 migrates demo data. */
  "on_the_way",
  "atSection",
  "delivered",
  "vendorRejected",
  "customerCanceled",
  "operatorCanceled",
  "refunded",
] as const;

export type OrderStatus = (typeof ORDER_STATUSES)[number];

/** Happy-path fulfillment statuses (excludes terminal exceptions). */
export const FULFILLMENT_STATUSES = [
  "placed",
  "vendorAccepted",
  "preparing",
  "readyForPickup",
  "runnerAssigned",
  "atVendor",
  "pickedUp",
  "atSection",
  "delivered",
] as const satisfies readonly OrderStatus[];

/**
 * Fan-facing timeline milestones (granular subset for tracker UI).
 * Maps the vendor/runner lifecycle into six spectator-readable steps.
 */
export const FAN_TRACKER_STEPS = [
  "placed",
  "preparing",
  "readyForPickup",
  "pickedUp",
  "atSection",
  "delivered",
] as const satisfies readonly OrderStatus[];

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  placed: "Ordered",
  vendorAccepted: "Vendor accepted",
  preparing: "Preparing",
  readyForPickup: "Ready for pickup",
  runnerAssigned: "Runner assigned",
  atVendor: "At vendor",
  pickedUp: "On the way",
  on_the_way: "On the way",
  atSection: "At your section",
  delivered: "Delivered",
  vendorRejected: "Vendor rejected",
  customerCanceled: "Canceled",
  operatorCanceled: "Canceled by ops",
  refunded: "Refunded",
};

/** Tailwind-friendly token hints for runner queue badges (apps apply classes). */
export const RUNNER_BADGE_COLORS: Record<OrderStatus, string> = {
  placed: "navy",
  vendorAccepted: "navy",
  preparing: "orange",
  readyForPickup: "green",
  runnerAssigned: "green",
  atVendor: "orange",
  pickedUp: "orange",
  on_the_way: "orange",
  atSection: "green",
  delivered: "green",
  vendorRejected: "orange",
  customerCanceled: "navy",
  operatorCanceled: "navy",
  refunded: "navy",
};

export function statusLabel(status: OrderStatus): string {
  return ORDER_STATUS_LABELS[status];
}

/** Map a legacy demo status onto the granular set until HEX-62 migrates data. */
export function fromLegacyOrderStatus(
  status: "placed" | "preparing" | "on_the_way" | "delivered",
): OrderStatus {
  switch (status) {
    case "on_the_way":
      return "pickedUp";
    default:
      return status;
  }
}
