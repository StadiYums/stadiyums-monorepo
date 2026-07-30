import type { MenuItemId, OrderStatus } from "@stadiyums/types";
import {
  FAN_TRACKER_STEPS,
  ORDER_STATUS_LABELS,
} from "@stadiyums/types";

export type { MenuItemId, OrderStatus };
export type { MenuItem } from "@stadiyums/types";

export type MenuItemLocal = {
  id: MenuItemId;
  name: string;
  desc: string;
  price: number;
  icon: MenuItemId;
};

export const MENU: MenuItemLocal[] = [
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

export function getMenuItem(id: string): MenuItemLocal | undefined {
  return MENU.find((item) => item.id === id);
}

/** Fan tracker steps — shared SSOT from @stadiyums/types (HEX-141). */
export const ORDER_STEPS = FAN_TRACKER_STEPS.map((key) => ({
  key,
  label: ORDER_STATUS_LABELS[key],
}));

export function statusLabel(status: OrderStatus): string {
  return ORDER_STATUS_LABELS[status] ?? status;
}

export function nextStatusLabel(status: OrderStatus): string {
  switch (status) {
    case "placed":
    case "vendorAccepted":
      return "Start preparing";
    case "preparing":
      return "Mark ready";
    case "readyForPickup":
    case "runnerAssigned":
    case "atVendor":
      return "Confirm pickup";
    case "pickedUp":
      return "Arrived at section";
    case "atSection":
      return "Mark delivered";
    default:
      return "Advance";
  }
}
