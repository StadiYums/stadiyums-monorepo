"use server";

import { safeAction } from "@stadiyums/core/safe-action";
import { getOrderService } from "@stadiyums/db";
import { z } from "zod";

const getOrderSchema = z.object({
  orderId: z.string().uuid(),
});

export async function getOrderAction(input: z.infer<typeof getOrderSchema>) {
  return safeAction(async () => {
    const { orderId } = getOrderSchema.parse(input);
    const order = await getOrderService().getOrder(orderId);
    if (!order) {
      throw new Error("Order not found");
    }
    return order;
  });
}
