"use client";

import Link from "next/link";
import { Card, SectionLabel } from "@stadiyums/ui";
import { ConvexConnectionProbe } from "../../components/ConvexConnectionProbe";
import { FanShell } from "../../components/FanShell";
import { useFan } from "../../providers/FanProvider";

export default function TrackerPage() {
  const { activeOrderId, ticket } = useFan();

  return (
    <FanShell
      title="Order tracker"
      description="Live milestone timeline migrates from legacy OrderTracker in HEX-147 / F4."
    >
      <Card className="mt-8">
        <SectionLabel>Status</SectionLabel>
        <p className="mt-2 text-sm text-ink">
          {activeOrderId
            ? `Tracking order ${activeOrderId}`
            : "No active order yet — place an order from the marketplace flow once HEX-147 lands."}
        </p>
        {ticket.aisle && ticket.seat ? (
          <p className="mt-2 text-sm text-ink/80">
            Delivering to aisle {ticket.aisle}, seat {ticket.seat}.
          </p>
        ) : null}
        <div className="mt-4">
          <ConvexConnectionProbe />
        </div>
        <Link
          href="/order"
          className="mt-5 inline-block text-sm font-semibold text-orange-dim underline-offset-2 hover:underline"
        >
          Back to order
        </Link>
      </Card>
    </FanShell>
  );
}
