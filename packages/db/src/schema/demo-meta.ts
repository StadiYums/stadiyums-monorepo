import { index, integer, pgTable, text, uuid } from "drizzle-orm/pg-core";

export const demoMeta = pgTable(
  "demo_meta",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    key: text("key").notNull(),
    orderCounter: integer("order_counter").notNull(),
  },
  (table) => [index("demo_meta_by_key_idx").on(table.key)],
);
