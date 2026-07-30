"use client";

import Link from "next/link";
import { FanShell } from "../../components/FanShell";
import { OrderTracker } from "../../components/OrderTracker";
import { useFan } from "../../providers/FanProvider";

export default function TrackerPage() {
  const { activeOrderId } = useFan();

  return (
    <FanShell
      title="Order tracker"
      description="Live milestone timeline for your order."
    >
      {activeOrderId ? (
        <OrderTracker />
      ) : (
        <p className="mt-8 text-sm text-ink/70">
          No active order yet.{" "}
          <Link
            href="/order"
            className="font-semibold text-orange-dim underline-offset-2 hover:underline"
          >
            Back to order
          </Link>
        </p>
      )}
    </FanShell>
  );
}
