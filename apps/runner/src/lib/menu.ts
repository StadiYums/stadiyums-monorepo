import type { MenuItem, OrderStatus } from "@stadiyums/types";
import { ORDER_STATUS_LABELS } from "@stadiyums/types";

export type { MenuItem, OrderStatus };

/** Demo concession catalog — shared with fan until vendor menus land. */
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

export function statusLabel(status: OrderStatus): string {
  return ORDER_STATUS_LABELS[status] ?? status;
}

/**
 * Advance CTA labels for the demo STATUS_FLOW
 * (placed → preparing → on_the_way → delivered). Granular labels land with HEX-62.
 */
export function nextStatusLabel(status: OrderStatus): string {
  switch (status) {
    case "placed":
      return "Start preparing";
    case "preparing":
      return "Mark on the way";
    case "on_the_way":
    case "pickedUp":
      return "Mark delivered";
    default:
      return "Advance";
  }
}
