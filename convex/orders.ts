import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { orderItemValidator, orderStatusValidator, orderValidator } from "./schema";

const DEMO_META_KEY = "state" as const;
const INITIAL_COUNTER = 1000;

const STATUS_FLOW = ["placed", "preparing", "on_the_way", "delivered"] as const;

export const listQueue = query({
  args: {},
  returns: v.array(orderValidator),
  handler: async (ctx) => {
    const activeStatuses = ["placed", "preparing", "on_the_way"] as const;
    const orders = [];

    for (const status of activeStatuses) {
      const batch = await ctx.db
        .query("orders")
        .withIndex("by_status", (q) => q.eq("status", status))
        .collect();
      orders.push(...batch);
    }

    return orders.sort((a, b) => a.placedAt - b.placedAt);
  },
});

export const getOrder = query({
  args: { orderId: v.id("orders") },
  returns: v.union(orderValidator, v.null()),
  handler: async (ctx, args) => {
    return await ctx.db.get("orders", args.orderId);
  },
});

export const getStats = query({
  args: {},
  returns: v.object({
    openCount: v.number(),
    deliveredCount: v.number(),
    avgDeliveryMinutes: v.union(v.number(), v.null()),
  }),
  handler: async (ctx) => {
    const activeStatuses = ["placed", "preparing", "on_the_way"] as const;
    let openCount = 0;

    for (const status of activeStatuses) {
      const batch = await ctx.db
        .query("orders")
        .withIndex("by_status", (q) => q.eq("status", status))
        .collect();
      openCount += batch.length;
    }

    const delivered = await ctx.db
      .query("orders")
      .withIndex("by_status", (q) => q.eq("status", "delivered"))
      .collect();

    const withDeliveryTime = delivered.filter((order) => order.deliveredAt !== undefined);
    const avgDeliveryMinutes =
      withDeliveryTime.length === 0
        ? null
        : withDeliveryTime.reduce((sum, order) => {
            return sum + (order.deliveredAt! - order.placedAt) / 60000;
          }, 0) / withDeliveryTime.length;

    return {
      openCount,
      deliveredCount: delivered.length,
      avgDeliveryMinutes,
    };
  },
});

export const placeOrder = mutation({
  args: {
    aisle: v.string(),
    seat: v.string(),
    items: v.array(orderItemValidator),
  },
  returns: v.id("orders"),
  handler: async (ctx, args) => {
    const aisle = args.aisle.trim();
    const seat = args.seat.trim();

    if (!aisle || !seat) {
      throw new Error("Enter your aisle and seat number to place an order.");
    }

    if (args.items.length === 0) {
      throw new Error("Add at least one item to your cart.");
    }

    const meta =
      (await ctx.db
        .query("demoMeta")
        .withIndex("by_key", (q) => q.eq("key", DEMO_META_KEY))
        .unique()) ??
      (await (async () => {
        const id = await ctx.db.insert("demoMeta", {
          key: DEMO_META_KEY,
          orderCounter: INITIAL_COUNTER,
        });
        return { _id: id, orderCounter: INITIAL_COUNTER };
      })());

    const orderNumber = meta.orderCounter;
    await ctx.db.patch(meta._id, { orderCounter: orderNumber + 1 });

    return await ctx.db.insert("orders", {
      orderNumber,
      aisle,
      seat,
      items: args.items,
      status: "placed",
      placedAt: Date.now(),
    });
  },
});

export const advanceOrder = mutation({
  args: { orderId: v.id("orders") },
  returns: v.null(),
  handler: async (ctx, args) => {
    const order = await ctx.db.get("orders", args.orderId);
    if (!order) {
      throw new Error("Order not found");
    }

    const currentIndex = STATUS_FLOW.indexOf(
      order.status as (typeof STATUS_FLOW)[number],
    );
    if (currentIndex === -1 || currentIndex >= STATUS_FLOW.length - 1) {
      return null;
    }

    const nextStatus = STATUS_FLOW[currentIndex + 1];
    const patch: {
      status: (typeof STATUS_FLOW)[number];
      deliveredAt?: number;
    } = { status: nextStatus };

    if (nextStatus === "delivered") {
      patch.deliveredAt = Date.now();
    }

    await ctx.db.patch(args.orderId, patch);
    return null;
  },
});

export const listByStatus = query({
  args: { status: orderStatusValidator },
  returns: v.array(orderValidator),
  handler: async (ctx, args) => {
    return await ctx.db
      .query("orders")
      .withIndex("by_status", (q) => q.eq("status", args.status))
      .collect();
  },
});
