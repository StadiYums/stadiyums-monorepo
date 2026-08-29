import type { MenuItem, MenuItemId, OrderStatus } from "@stadiyums/types";
import { ORDER_STATUS_LABELS } from "@stadiyums/types";

export type { MenuItem, MenuItemId, OrderStatus };

/** Demo concession catalog — SSOT for the fan app until vendor menus land. */
export const MENU: MenuItem[] = [
  {
    id: "popcorn",
    name: "Popcorn",
    desc: "Fresh popped, buttered",
    price: 6.0,
    icon: "popcorn",
  },
  {
    id: "crackerjack",
    name: "Cracker Jacks",
    desc: "Caramel corn & peanuts",
    price: 5.5,
    icon: "crackerjack",
  },
  {
    id: "drink",
    name: "Fountain Drink",
    desc: "Souvenir cup, free refill",
    price: 5.5,
    icon: "drink",
  },
  {
    id: "pretzel",
    name: "Soft Pretzel",
    desc: "Warm, salted",
    price: 6.5,
    icon: "pretzel",
  },
  {
    id: "hotdog",
    name: "Hot Dog",
    desc: "All-beef, classic toppings",
    price: 6.5,
    icon: "hotdog",
  },
  {
    id: "burger",
    name: "Hamburger",
    desc: "Quarter-pound, grilled",
    price: 9.0,
    icon: "burger",
  },
];

export function getMenuItem(id: string): MenuItem | undefined {
  return MENU.find((item) => item.id === id);
}

/**
 * Tracker steps mirror the Convex demo backend's status flow (placed →
 * preparing → on_the_way → delivered). This intentionally differs from the
 * granular `FAN_TRACKER_STEPS` in @stadiyums/types, which isn't wired to
 * `orderService.advanceOrder` demo flow (legacy statuses).
 */
const TRACKER_STATUSES = [
  "placed",
  "preparing",
  "on_the_way",
  "delivered",
] as const satisfies readonly OrderStatus[];

export const ORDER_STEPS = TRACKER_STATUSES.map((key) => ({
  key,
  label: ORDER_STATUS_LABELS[key],
}));
