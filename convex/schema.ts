import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

/**
 * Full fulfillment + exception statuses (HEX-62).
 * Legacy demo values `preparing` / `on_the_way` remain valid until data migrates.
 * See `convex/lib/orderTransitions.ts` and `docs/order-lifecycle.md`.
 */
export const orderStatusValidator = v.union(
  v.literal("placed"),
  v.literal("vendorAccepted"),
  v.literal("preparing"),
  v.literal("readyForPickup"),
  v.literal("runnerAssigned"),
  v.literal("atVendor"),
  v.literal("pickedUp"),
  /** @deprecated Prefer `pickedUp` — demo STATUS_FLOW until migration. */
  v.literal("on_the_way"),
  v.literal("atSection"),
  v.literal("delivered"),
  v.literal("vendorRejected"),
  v.literal("customerCanceled"),
  v.literal("operatorCanceled"),
  v.literal("refunded"),
);

export const orderItemValidator = v.object({
  menuItemId: v.string(),
  qty: v.number(),
});

export const orderActorRoleValidator = v.union(
  v.literal("fan"),
  v.literal("vendor"),
  v.literal("runner"),
  v.literal("stadium_operator"),
);

export const orderValidator = v.object({
  _id: v.id("orders"),
  _creationTime: v.number(),
  orderNumber: v.number(),
  /** @deprecated Prefer `section` — retained for demo seat strings. */
  aisle: v.string(),
  seat: v.string(),
  items: v.array(orderItemValidator),
  status: orderStatusValidator,
  statusVersion: v.optional(v.number()),
  placedAt: v.number(),
  deliveredAt: v.optional(v.number()),
  // Attribution (optional until tenancy/catalog wiring)
  stadiumAccountId: v.optional(v.string()),
  venueId: v.optional(v.string()),
  eventId: v.optional(v.string()),
  salesAuthorizationId: v.optional(v.string()),
  vendorId: v.optional(v.id("vendors")),
  concessionLocationId: v.optional(v.string()),
  menuVersionId: v.optional(v.string()),
  guestSessionId: v.optional(v.string()),
  section: v.optional(v.string()),
  row: v.optional(v.string()),
  runnerId: v.optional(v.id("runners")),
  shiftId: v.optional(v.id("shifts")),
  // Exception metadata
  rejectionReason: v.optional(v.string()),
  cancellationReason: v.optional(v.string()),
  canceledByRole: v.optional(orderActorRoleValidator),
  refundedAt: v.optional(v.number()),
  vendorPausedAtPlace: v.optional(v.boolean()),
});

/** Staffing domain — L1 (HEX-61). */
export const runnerValidator = v.object({
  _id: v.id("runners"),
  _creationTime: v.number(),
  employeeId: v.string(),
  pinHash: v.string(),
  name: v.string(),
  isActive: v.boolean(),
});

export const zoneValidator = v.object({
  _id: v.id("zones"),
  _creationTime: v.number(),
  stadiumId: v.string(),
  name: v.string(),
  sectionMin: v.number(),
  sectionMax: v.number(),
});

export const shiftValidator = v.object({
  _id: v.id("shifts"),
  _creationTime: v.number(),
  runnerId: v.id("runners"),
  zoneId: v.id("zones"),
  startedAt: v.number(),
  endedAt: v.optional(v.number()),
  isAvailable: v.boolean(),
});

/** Catalog domain — L2 (HEX-117). */
export const menuModifierValidator = v.object({
  id: v.string(),
  label: v.string(),
  options: v.array(v.string()),
});

export const vendorValidator = v.object({
  _id: v.id("vendors"),
  _creationTime: v.number(),
  zoneId: v.id("zones"),
  name: v.string(),
  location: v.string(),
  prepTimeMinutes: v.number(),
  isActive: v.boolean(),
});

export const menuItemValidator = v.object({
  _id: v.id("menuItems"),
  _creationTime: v.number(),
  vendorId: v.id("vendors"),
  name: v.string(),
  description: v.string(),
  price: v.number(),
  imageUrl: v.optional(v.string()),
  modifiers: v.array(menuModifierValidator),
});

export default defineSchema({
  orders: defineTable({
    orderNumber: v.number(),
    aisle: v.string(),
    seat: v.string(),
    items: v.array(orderItemValidator),
    status: orderStatusValidator,
    statusVersion: v.optional(v.number()),
    placedAt: v.number(),
    deliveredAt: v.optional(v.number()),
    stadiumAccountId: v.optional(v.string()),
    venueId: v.optional(v.string()),
    eventId: v.optional(v.string()),
    salesAuthorizationId: v.optional(v.string()),
    vendorId: v.optional(v.id("vendors")),
    concessionLocationId: v.optional(v.string()),
    menuVersionId: v.optional(v.string()),
    guestSessionId: v.optional(v.string()),
    section: v.optional(v.string()),
    row: v.optional(v.string()),
    runnerId: v.optional(v.id("runners")),
    shiftId: v.optional(v.id("shifts")),
    rejectionReason: v.optional(v.string()),
    cancellationReason: v.optional(v.string()),
    canceledByRole: v.optional(orderActorRoleValidator),
    refundedAt: v.optional(v.number()),
    vendorPausedAtPlace: v.optional(v.boolean()),
  })
    .index("by_status", ["status"])
    .index("by_placedAt", ["placedAt"])
    .index("by_orderNumber", ["orderNumber"])
    .index("by_vendor_and_status", ["vendorId", "status"])
    .index("by_runner_and_status", ["runnerId", "status"])
    .index("by_event_and_status", ["eventId", "status"])
    .index("by_stadium_and_status", ["stadiumAccountId", "status"]),

  demoMeta: defineTable({
    key: v.literal("state"),
    orderCounter: v.number(),
  }).index("by_key", ["key"]),

  runners: defineTable({
    employeeId: v.string(),
    pinHash: v.string(),
    name: v.string(),
    isActive: v.boolean(),
  }).index("by_employeeId", ["employeeId"]),

  zones: defineTable({
    stadiumId: v.string(),
    name: v.string(),
    sectionMin: v.number(),
    sectionMax: v.number(),
  }).index("by_stadium", ["stadiumId"]),

  shifts: defineTable({
    runnerId: v.id("runners"),
    zoneId: v.id("zones"),
    startedAt: v.number(),
    endedAt: v.optional(v.number()),
    isAvailable: v.boolean(),
  })
    .index("by_runner_active", ["runnerId", "isAvailable"])
    .index("by_zone", ["zoneId"]),

  vendors: defineTable({
    zoneId: v.id("zones"),
    name: v.string(),
    location: v.string(),
    prepTimeMinutes: v.number(),
    isActive: v.boolean(),
  }).index("by_zone", ["zoneId"]),

  menuItems: defineTable({
    vendorId: v.id("vendors"),
    name: v.string(),
    description: v.string(),
    price: v.number(),
    imageUrl: v.optional(v.string()),
    modifiers: v.array(menuModifierValidator),
  }).index("by_vendor", ["vendorId"]),
});
