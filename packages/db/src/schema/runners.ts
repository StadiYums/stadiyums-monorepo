import {
  boolean,
  index,
  integer,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

export const runners = pgTable(
  "runners",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    employeeId: text("employee_id").notNull(),
    pinHash: text("pin_hash").notNull(),
    name: text("name").notNull(),
    isActive: boolean("is_active").notNull().default(true),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [index("runners_by_employee_id_idx").on(table.employeeId)],
);

export const zones = pgTable(
  "zones",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    stadiumId: text("stadium_id").notNull(),
    name: text("name").notNull(),
    sectionMin: integer("section_min").notNull(),
    sectionMax: integer("section_max").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [index("zones_by_stadium_idx").on(table.stadiumId)],
);

export const shifts = pgTable(
  "shifts",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    runnerId: uuid("runner_id")
      .notNull()
      .references(() => runners.id),
    zoneId: uuid("zone_id")
      .notNull()
      .references(() => zones.id),
    startedAt: timestamp("started_at", { withTimezone: true }).notNull(),
    endedAt: timestamp("ended_at", { withTimezone: true }),
    isAvailable: boolean("is_available").notNull().default(true),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    index("shifts_by_runner_active_idx").on(table.runnerId, table.isAvailable),
    index("shifts_by_zone_idx").on(table.zoneId),
  ],
);
