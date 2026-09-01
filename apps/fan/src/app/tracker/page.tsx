"use client";

import Link from "next/link";
import { FanOperateLayout } from "../../components/FanOperateLayout";
import { OrderTracker } from "../../features/orders/components/OrderTracker";
import { useFan } from "../../providers/FanProvider";

export default function TrackerPage() {
  const { activeOrderId } = useFan();

  return (
    <FanOperateLayout>
      {activeOrderId ? (
        <OrderTracker />
      ) : (
        <p className="mt-2 text-sm text-ink/70">
          No active order yet.{" "}
          <Link
            href="/order"
            className="font-semibold text-orange-dim underline-offset-2 hover:underline"
          >
            Back to order
          </Link>
        </p>
      )}
    </FanOperateLayout>
  );
}
