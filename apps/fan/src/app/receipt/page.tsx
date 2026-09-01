"use client";

import Link from "next/link";
import { Card, SectionLabel } from "@stadiyums/ui";
import { FanOperateLayout } from "../../components/FanOperateLayout";
import { useFan } from "../../providers/FanProvider";

export default function ReceiptPage() {
  const { ticket, cart } = useFan();
  const cartCount = Object.values(cart).reduce((sum, qty) => sum + qty, 0);

  const seatLabel =
    ticket.aisle && ticket.seat
      ? ticket.section
        ? `Section ${ticket.section} · Row ${ticket.aisle} · Seat ${ticket.seat}`
        : `Row ${ticket.aisle} · Seat ${ticket.seat}`
      : "Seat not set yet";

  return (
    <FanOperateLayout>
      <Card className="mt-2">
        <SectionLabel variant="action">Order summary</SectionLabel>
        <p className="text-sm font-semibold text-navy">{seatLabel}</p>
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
    </FanOperateLayout>
  );
}
