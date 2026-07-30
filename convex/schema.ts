import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export const orderStatusValidator = v.union(
  v.literal("placed"),
  v.literal("preparing"),
  v.literal("on_the_way"),
  v.literal("delivered"),
);

export const orderItemValidator = v.object({
  menuItemId: v.string(),
  qty: v.number(),
});

export const orderValidator = v.object({
  _id: v.id("orders"),
  _creationTime: v.number(),
  orderNumber: v.number(),
  aisle: v.string(),
  seat: v.string(),
  items: v.array(orderItemValidator),
  status: orderStatusValidator,
  placedAt: v.number(),
  deliveredAt: v.optional(v.number()),
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
    placedAt: v.number(),
    deliveredAt: v.optional(v.number()),
  })
    .index("by_status", ["status"])
    .index("by_placedAt", ["placedAt"])
    .index("by_orderNumber", ["orderNumber"]),

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
