import { v } from "convex/values";
import { internalMutation, mutation, query } from "./_generated/server";
import { orderValidator } from "./schema";

const DEMO_META_KEY = "state" as const;
const INITIAL_COUNTER = 1000;

const SEED_ORDERS = [
  {
    aisle: "7",
    seat: "14",
    items: [
      { menuItemId: "hotdog", qty: 1 },
      { menuItemId: "drink", qty: 1 },
    ],
    status: "placed" as const,
    ageMs: 40_000,
  },
  {
    aisle: "21",
    seat: "3",
    items: [
      { menuItemId: "burger", qty: 1 },
      { menuItemId: "popcorn", qty: 1 },
      { menuItemId: "drink", qty: 2 },
    ],
    status: "preparing" as const,
    ageMs: 3 * 60_000,
  },
];

async function getOrCreateMeta(ctx: { db: import("./_generated/server").MutationCtx["db"] }) {
  const existing = await ctx.db
    .query("demoMeta")
    .withIndex("by_key", (q) => q.eq("key", DEMO_META_KEY))
    .unique();

  if (existing) {
    return existing;
  }

  const id = await ctx.db.insert("demoMeta", {
    key: DEMO_META_KEY,
    orderCounter: INITIAL_COUNTER,
  });

  return { _id: id, orderCounter: INITIAL_COUNTER };
}

export const seedDemo = internalMutation({
  args: {},
  returns: v.null(),
  handler: async (ctx) => {
    const now = Date.now();
    let counter = INITIAL_COUNTER;

    for (const seed of SEED_ORDERS) {
      await ctx.db.insert("orders", {
        orderNumber: counter++,
        aisle: seed.aisle,
        seat: seed.seat,
        items: seed.items,
        status: seed.status,
        placedAt: now - seed.ageMs,
      });
    }

    const meta = await getOrCreateMeta(ctx);
    await ctx.db.patch(meta._id, { orderCounter: counter });

    return null;
  },
});

export const resetDemo = mutation({
  args: {},
  returns: v.null(),
  handler: async (ctx) => {
    const existingOrders = await ctx.db.query("orders").collect();
    for (const order of existingOrders) {
      await ctx.db.delete("orders", order._id);
    }

    const meta = await getOrCreateMeta(ctx);
    await ctx.db.patch(meta._id, { orderCounter: INITIAL_COUNTER });

    const now = Date.now();
    let counter = INITIAL_COUNTER;

    for (const seed of SEED_ORDERS) {
      await ctx.db.insert("orders", {
        orderNumber: counter++,
        aisle: seed.aisle,
        seat: seed.seat,
        items: seed.items,
        status: seed.status,
        placedAt: now - seed.ageMs,
      });
    }

    await ctx.db.patch(meta._id, { orderCounter: counter });

    return null;
  },
});

export const ensureSeeded = mutation({
  args: {},
  returns: v.boolean(),
  handler: async (ctx) => {
    const anyOrder = await ctx.db.query("orders").first();
    if (anyOrder) {
      return false;
    }

    await ctx.db.insert("demoMeta", {
      key: DEMO_META_KEY,
      orderCounter: INITIAL_COUNTER,
    });

    const now = Date.now();
    let counter = INITIAL_COUNTER;

    for (const seed of SEED_ORDERS) {
      await ctx.db.insert("orders", {
        orderNumber: counter++,
        aisle: seed.aisle,
        seat: seed.seat,
        items: seed.items,
        status: seed.status,
        placedAt: now - seed.ageMs,
      });
    }

    const meta = await ctx.db
      .query("demoMeta")
      .withIndex("by_key", (q) => q.eq("key", DEMO_META_KEY))
      .unique();

    if (meta) {
      await ctx.db.patch(meta._id, { orderCounter: counter });
    }

    return true;
  },
});

export const listDeliveredToday = query({
  args: {},
  returns: v.array(orderValidator),
  handler: async (ctx) => {
    const delivered = await ctx.db
      .query("orders")
      .withIndex("by_status", (q) => q.eq("status", "delivered"))
      .collect();

    return delivered;
  },
});
