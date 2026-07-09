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
});
