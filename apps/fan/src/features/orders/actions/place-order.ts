"use server";

import { safeAction } from "@stadiyums/core/safe-action";
import { getOrderService } from "@stadiyums/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const placeOrderSchema = z.object({
  aisle: z.string(),
  seat: z.string(),
  items: z.array(
    z.object({
      menuItemId: z.string(),
      qty: z.number().int().positive(),
    }),
  ),
});

export async function placeOrderAction(input: z.infer<typeof placeOrderSchema>) {
  return safeAction(async () => {
    const parsed = placeOrderSchema.parse(input);
    const order = await getOrderService().placeOrder(parsed);
    revalidatePath("/tracker");
    revalidatePath("/order");
    return order;
  });
}
