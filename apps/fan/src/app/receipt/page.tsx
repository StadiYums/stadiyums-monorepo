"use client";

import Link from "next/link";
import { Card, SectionLabel } from "@stadiyums/ui";
import { FanShell } from "../../components/FanShell";
import { useFan } from "../../providers/FanProvider";

export default function ReceiptPage() {
  const { ticket, cart } = useFan();
  const cartCount = Object.values(cart).reduce((sum, qty) => sum + qty, 0);

  return (
    <FanShell
      title="Receipt"
      description="Mock receipt UI lands in F3. Placeholder confirms the post-checkout route exists."
    >
      <Card className="mt-8">
        <SectionLabel>Order summary</SectionLabel>
        <p className="mt-2 text-sm text-ink">
          {ticket.aisle && ticket.seat
            ? `Aisle ${ticket.aisle} · Seat ${ticket.seat}`
            : "Seat not set yet"}
        </p>
        <p className="mt-2 text-sm text-ink/80">
          Cart line items in session: {cartCount}
        </p>
        <Link
          href="/tracker"
          className="mt-5 inline-block text-sm font-semibold text-orange-dim underline-offset-2 hover:underline"
        >
          View tracker
        </Link>
      </Card>
    </FanShell>
  );
}
