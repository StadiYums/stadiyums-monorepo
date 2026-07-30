/** Shared menu catalog types — no React. */

export type MenuItemId =
  | "popcorn"
  | "crackerjack"
  | "drink"
  | "pretzel"
  | "hotdog"
  | "burger";

export type MenuModifier = {
  id: string;
  label: string;
  priceDelta: number;
};

export type MenuItem = {
  id: MenuItemId;
  name: string;
  desc: string;
  price: number;
  icon: MenuItemId;
  modifiers?: MenuModifier[];
};
