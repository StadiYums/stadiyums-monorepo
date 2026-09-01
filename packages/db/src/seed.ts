import { getDb } from "./client";
import { createOrderService } from "./services/order-service";

async function main() {
  const db = getDb();
  const orderService = createOrderService(db);
  const seeded = await orderService.ensureSeeded();
  console.log(seeded ? "Demo data seeded." : "Demo data already present.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
