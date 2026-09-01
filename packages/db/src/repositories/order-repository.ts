import { eq, inArray } from "drizzle-orm";
import type { Db } from "../client";
import { orders } from "../schema/orders";
import type { OrderDto, OrderItem } from "../types";
import type { OrderStatus } from "@stadiyums/types";

function toMillis(date: Date | null | undefined): number | undefined {
  return date ? date.getTime() : undefined;
}

export function orderToDto(row: typeof orders.$inferSelect): OrderDto {
  return {
    id: row.id,
    orderNumber: row.orderNumber,
    aisle: row.aisle,
    seat: row.seat,
    items: row.items,
    status: row.status,
    statusVersion: row.statusVersion ?? undefined,
    placedAt: row.placedAt.getTime(),
    deliveredAt: toMillis(row.deliveredAt),
    vendorAcceptedAt: toMillis(row.vendorAcceptedAt),
    preparationStartedAt: toMillis(row.preparationStartedAt),
    readyForPickupAt: toMillis(row.readyForPickupAt),
    runnerAssignedAt: toMillis(row.runnerAssignedAt),
    arrivedAtVendorAt: toMillis(row.arrivedAtVendorAt),
    pickedUpAt: toMillis(row.pickedUpAt),
    arrivedAtSectionAt: toMillis(row.arrivedAtSectionAt),
    vendorRejectedAt: toMillis(row.vendorRejectedAt),
    canceledAt: toMillis(row.canceledAt),
    vendorDelayReportedAt: toMillis(row.vendorDelayReportedAt),
    vendorDelayReason: row.vendorDelayReason ?? undefined,
    vendorDelayNoteId: row.vendorDelayNoteId ?? undefined,
    stadiumAccountId: row.stadiumAccountId ?? undefined,
    venueId: row.venueId ?? undefined,
    eventId: row.eventId ?? undefined,
    salesAuthorizationId: row.salesAuthorizationId ?? undefined,
    vendorId: row.vendorId ?? undefined,
    concessionLocationId: row.concessionLocationId ?? undefined,
    menuVersionId: row.menuVersionId ?? undefined,
    guestSessionId: row.guestSessionId ?? undefined,
    section: row.section ?? undefined,
    row: row.row ?? undefined,
    runnerId: row.runnerId ?? undefined,
    shiftId: row.shiftId ?? undefined,
    rejectionReason: row.rejectionReason ?? undefined,
    cancellationReason: row.cancellationReason ?? undefined,
    canceledByRole: row.canceledByRole ?? undefined,
    refundedAt: toMillis(row.refundedAt),
    vendorPausedAtPlace: row.vendorPausedAtPlace ?? undefined,
  };
}

export function createOrderRepository(db: Db) {
  return {
    async findById(id: string): Promise<OrderDto | null> {
      const row = await db.query.orders.findFirst({
        where: eq(orders.id, id),
      });
      return row ? orderToDto(row) : null;
    },

    async listByStatuses(statuses: OrderStatus[]): Promise<OrderDto[]> {
      const rows = await db.query.orders.findMany({
        where: inArray(orders.status, statuses),
      });
      return rows.map(orderToDto);
    },

    async listByStatus(status: OrderStatus): Promise<OrderDto[]> {
      const rows = await db.query.orders.findMany({
        where: eq(orders.status, status),
      });
      return rows.map(orderToDto);
    },

    async insert(data: {
      orderNumber: number;
      aisle: string;
      seat: string;
      items: OrderItem[];
      status: OrderStatus;
      placedAt: Date;
    }): Promise<OrderDto> {
      const [row] = await db
        .insert(orders)
        .values({
          orderNumber: data.orderNumber,
          aisle: data.aisle,
          seat: data.seat,
          items: data.items,
          status: data.status,
          placedAt: data.placedAt,
        })
        .returning();
      if (!row) {
        throw new Error("Failed to insert order");
      }
      return orderToDto(row);
    },

    async updateStatus(
      id: string,
      patch: {
        status: OrderStatus;
        deliveredAt?: Date;
      },
    ): Promise<OrderDto | null> {
      const [row] = await db
        .update(orders)
        .set({
          status: patch.status,
          deliveredAt: patch.deliveredAt,
          updatedAt: new Date(),
        })
        .where(eq(orders.id, id))
        .returning();
      return row ? orderToDto(row) : null;
    },

    async deleteAll(): Promise<void> {
      await db.delete(orders);
    },

    async countByStatuses(statuses: OrderStatus[]): Promise<number> {
      const rows = await db.query.orders.findMany({
        where: inArray(orders.status, statuses),
        columns: { id: true },
      });
      return rows.length;
    },

    async first(): Promise<OrderDto | null> {
      const row = await db.query.orders.findFirst();
      return row ? orderToDto(row) : null;
    },
  };
}

export type OrderRepository = ReturnType<typeof createOrderRepository>;
