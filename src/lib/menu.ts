export type MenuItemId =
  | "popcorn"
  | "crackerjack"
  | "drink"
  | "pretzel"
  | "hotdog"
  | "burger";

export type MenuItem = {
  id: MenuItemId;
  name: string;
  desc: string;
  price: number;
  icon: MenuItemId;
};

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

export const ORDER_STEPS = [
  { key: "placed" as const, label: "Ordered", icon: "receipt" },
  { key: "preparing" as const, label: "Preparing", icon: "soup" },
  { key: "on_the_way" as const, label: "On the way", icon: "walk" },
  { key: "delivered" as const, label: "Delivered", icon: "check" },
];

export type OrderStatus = (typeof ORDER_STEPS)[number]["key"];

export function statusLabel(status: OrderStatus): string {
  return ORDER_STEPS.find((step) => step.key === status)?.label ?? status;
}

export function nextStatusLabel(status: OrderStatus): string {
  switch (status) {
    case "placed":
      return "Start preparing";
    case "preparing":
      return "Send to seat";
    case "on_the_way":
      return "Mark delivered";
    default:
      return "Advance";
  }
}
