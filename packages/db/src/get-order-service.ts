import { getDb } from "./client";
import { createOrderService } from "./services/order-service";

export function getOrderService() {
  return createOrderService(getDb());
}
