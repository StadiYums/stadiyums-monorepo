import { eq } from "drizzle-orm";
import type { Db } from "../client";
import { demoMeta } from "../schema/demo-meta";

const DEMO_META_KEY = "state";
const INITIAL_COUNTER = 1000;

export function createDemoMetaRepository(db: Db) {
  return {
    async getOrCreate(): Promise<{ id: string; orderCounter: number }> {
      const existing = await db.query.demoMeta.findFirst({
        where: eq(demoMeta.key, DEMO_META_KEY),
      });

      if (existing) {
        return { id: existing.id, orderCounter: existing.orderCounter };
      }

      const [row] = await db
        .insert(demoMeta)
        .values({ key: DEMO_META_KEY, orderCounter: INITIAL_COUNTER })
        .returning();

      if (!row) {
        throw new Error("Failed to create demo meta");
      }

      return { id: row.id, orderCounter: row.orderCounter };
    },

    async nextOrderNumber(): Promise<number> {
      const meta = await this.getOrCreate();
      const orderNumber = meta.orderCounter;
      await db
        .update(demoMeta)
        .set({ orderCounter: orderNumber + 1 })
        .where(eq(demoMeta.id, meta.id));
      return orderNumber;
    },

    async setCounter(counter: number): Promise<void> {
      const meta = await this.getOrCreate();
      await db
        .update(demoMeta)
        .set({ orderCounter: counter })
        .where(eq(demoMeta.id, meta.id));
    },

    async resetCounter(): Promise<void> {
      await this.setCounter(INITIAL_COUNTER);
    },
  };
}

export type DemoMetaRepository = ReturnType<typeof createDemoMetaRepository>;

export { DEMO_META_KEY, INITIAL_COUNTER };
