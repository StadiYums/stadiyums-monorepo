"use server";

import { safeAction } from "@stadiyums/core/safe-action";
import { getOrderService } from "@stadiyums/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const advanceOrderSchema = z.object({
  orderId: z.string().uuid(),
});

export async function advanceOrderAction(
  input: z.infer<typeof advanceOrderSchema>,
) {
  return safeAction(async () => {
    const { orderId } = advanceOrderSchema.parse(input);
    const order = await getOrderService().advanceOrder(orderId);
    revalidatePath("/");
    revalidatePath("/active");
    return order;
  });
}

export async function getQueueAction() {
  return safeAction(async () => getOrderService().getQueue());
}

export async function getStatsAction() {
  return safeAction(async () => getOrderService().getStats());
}

export async function ensureSeededAction() {
  return safeAction(async () => getOrderService().ensureSeeded());
}

export async function resetDemoAction() {
  return safeAction(async () => {
    await getOrderService().resetDemo();
    revalidatePath("/");
  });
}
