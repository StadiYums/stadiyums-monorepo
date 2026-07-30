/**
 * Order status constants live here as the shared source of truth.
 * HEX-141 populates labels, fan tracker steps, and runner badge colors.
 */

/** Current demo statuses; HEX-62 / HEX-141 expand to the full granular set. */
export const ORDER_STATUSES = [
  "placed",
  "preparing",
  "on_the_way",
  "delivered",
] as const;

export type OrderStatus = (typeof ORDER_STATUSES)[number];

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  placed: "Ordered",
  preparing: "Preparing",
  on_the_way: "On the way",
  delivered: "Delivered",
};
