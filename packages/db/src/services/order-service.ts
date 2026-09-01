import type { Db } from "../client";
import { createDemoMetaRepository } from "../repositories/demo-meta-repository";
import { createOrderRepository } from "../repositories/order-repository";
import type { OrderDto, OrderItem } from "../types";
import type { OrderStatus } from "@stadiyums/types";

const DEMO_STATUS_FLOW = ["placed", "preparing", "on_the_way", "delivered"] as const;
const ACTIVE_STATUSES: OrderStatus[] = ["placed", "preparing", "on_the_way"];

export function createOrderService(db: Db) {
  const orderRepository = createOrderRepository(db);
  const demoMetaRepository = createDemoMetaRepository(db);

  return {
    async getOrder(orderId: string): Promise<OrderDto | null> {
      return orderRepository.findById(orderId);
    },

    async getQueue(): Promise<OrderDto[]> {
      const orders = await orderRepository.listByStatuses(ACTIVE_STATUSES);
      return orders.sort((a, b) => a.placedAt - b.placedAt);
    },

    async placeOrder(args: {
      aisle: string;
      seat: string;
      items: OrderItem[];
    }): Promise<OrderDto> {
      const aisle = args.aisle.trim();
      const seat = args.seat.trim();

      if (!aisle || !seat) {
        throw new Error("Enter your aisle and seat number to place an order.");
      }

      if (args.items.length === 0) {
        throw new Error("Add at least one item to your cart.");
      }

      const orderNumber = await demoMetaRepository.nextOrderNumber();

      return orderRepository.insert({
        orderNumber,
        aisle,
        seat,
        items: args.items,
        status: "placed",
        placedAt: new Date(),
      });
    },

    async advanceOrder(orderId: string): Promise<OrderDto | null> {
      const order = await orderRepository.findById(orderId);
      if (!order) {
        throw new Error("Order not found");
      }

      const currentIndex = DEMO_STATUS_FLOW.indexOf(
        order.status as (typeof DEMO_STATUS_FLOW)[number],
      );
      if (currentIndex === -1 || currentIndex >= DEMO_STATUS_FLOW.length - 1) {
        return order;
      }

      const nextStatus = DEMO_STATUS_FLOW[currentIndex + 1];
      return orderRepository.updateStatus(orderId, {
        status: nextStatus,
        deliveredAt: nextStatus === "delivered" ? new Date() : undefined,
      });
    },

    async getStats(): Promise<{
      openCount: number;
      deliveredCount: number;
      avgDeliveryMinutes: number | null;
    }> {
      const openCount = await orderRepository.countByStatuses(ACTIVE_STATUSES);
      const delivered = await orderRepository.listByStatus("delivered");

      const withDeliveryTime = delivered.filter(
        (order) => order.deliveredAt !== undefined,
      );
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

    async resetDemo(): Promise<void> {
      await orderRepository.deleteAll();
      await demoMetaRepository.resetCounter();

      const now = Date.now();
      const seeds = [
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

      let counter = 1000;
      for (const seed of seeds) {
        await orderRepository.insert({
          orderNumber: counter++,
          aisle: seed.aisle,
          seat: seed.seat,
          items: seed.items,
          status: seed.status,
          placedAt: new Date(now - seed.ageMs),
        });
      }

      await demoMetaRepository.setCounter(counter);
    },

    async ensureSeeded(): Promise<boolean> {
      const anyOrder = await orderRepository.first();
      if (anyOrder) {
        return false;
      }
      await this.resetDemo();
      return true;
    },
  };
}

export type OrderService = ReturnType<typeof createOrderService>;
