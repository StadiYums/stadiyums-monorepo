import {
  boolean,
  index,
  integer,
  jsonb,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { zones } from "./runners";
import type { MenuModifier } from "../types";

export const vendors = pgTable(
  "vendors",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    zoneId: uuid("zone_id")
      .notNull()
      .references(() => zones.id),
    name: text("name").notNull(),
    location: text("location").notNull(),
    prepTimeMinutes: integer("prep_time_minutes").notNull(),
    isActive: boolean("is_active").notNull().default(true),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [index("vendors_by_zone_idx").on(table.zoneId)],
);

export const menuItems = pgTable(
  "menu_items",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    vendorId: uuid("vendor_id")
      .notNull()
      .references(() => vendors.id),
    name: text("name").notNull(),
    description: text("description").notNull(),
    price: integer("price").notNull(),
    imageUrl: text("image_url"),
    modifiers: jsonb("modifiers").$type<MenuModifier[]>().notNull().default([]),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [index("menu_items_by_vendor_idx").on(table.vendorId)],
);
