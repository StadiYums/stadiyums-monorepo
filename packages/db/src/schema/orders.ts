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
import { orderActorRoleEnum, orderStatusEnum } from "./enums";
import type { OrderItem } from "../types";

export const orders = pgTable(
  "orders",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    orderNumber: integer("order_number").notNull(),
    aisle: text("aisle").notNull(),
    seat: text("seat").notNull(),
    items: jsonb("items").$type<OrderItem[]>().notNull(),
    status: orderStatusEnum("status").notNull(),
    statusVersion: integer("status_version"),
    placedAt: timestamp("placed_at", { withTimezone: true }).notNull(),
    deliveredAt: timestamp("delivered_at", { withTimezone: true }),
    vendorAcceptedAt: timestamp("vendor_accepted_at", { withTimezone: true }),
    preparationStartedAt: timestamp("preparation_started_at", {
      withTimezone: true,
    }),
    readyForPickupAt: timestamp("ready_for_pickup_at", { withTimezone: true }),
    runnerAssignedAt: timestamp("runner_assigned_at", { withTimezone: true }),
    arrivedAtVendorAt: timestamp("arrived_at_vendor_at", { withTimezone: true }),
    pickedUpAt: timestamp("picked_up_at", { withTimezone: true }),
    arrivedAtSectionAt: timestamp("arrived_at_section_at", {
      withTimezone: true,
    }),
    vendorRejectedAt: timestamp("vendor_rejected_at", { withTimezone: true }),
    canceledAt: timestamp("canceled_at", { withTimezone: true }),
    vendorDelayReportedAt: timestamp("vendor_delay_reported_at", {
      withTimezone: true,
    }),
    vendorDelayReason: text("vendor_delay_reason"),
    vendorDelayNoteId: text("vendor_delay_note_id"),
    stadiumAccountId: text("stadium_account_id"),
    venueId: text("venue_id"),
    eventId: text("event_id"),
    salesAuthorizationId: text("sales_authorization_id"),
    vendorId: uuid("vendor_id"),
    concessionLocationId: text("concession_location_id"),
    menuVersionId: text("menu_version_id"),
    guestSessionId: text("guest_session_id"),
    section: text("section"),
    row: text("row"),
    runnerId: uuid("runner_id"),
    shiftId: uuid("shift_id"),
    rejectionReason: text("rejection_reason"),
    cancellationReason: text("cancellation_reason"),
    canceledByRole: orderActorRoleEnum("canceled_by_role"),
    refundedAt: timestamp("refunded_at", { withTimezone: true }),
    vendorPausedAtPlace: boolean("vendor_paused_at_place"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    index("orders_by_status_idx").on(table.status),
    index("orders_by_placed_at_idx").on(table.placedAt),
    index("orders_by_order_number_idx").on(table.orderNumber),
    index("orders_by_vendor_and_status_idx").on(table.vendorId, table.status),
    index("orders_by_runner_and_status_idx").on(table.runnerId, table.status),
    index("orders_by_event_and_status_idx").on(table.eventId, table.status),
    index("orders_by_stadium_and_status_idx").on(
      table.stadiumAccountId,
      table.status,
    ),
  ],
);
