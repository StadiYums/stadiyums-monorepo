"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card, SectionLabel } from "@stadiyums/ui";
import { CartBar } from "../../features/orders/components/CartBar";
import { FanOperateLayout } from "../../components/FanOperateLayout";
import { MenuGrid } from "../../features/orders/components/MenuGrid";
import { useFan } from "../../providers/FanProvider";

export default function OrderPage() {
  const router = useRouter();
  const { activeOrderId, hasSeat, ticket } = useFan();

  useEffect(() => {
    if (activeOrderId) {
      router.replace("/tracker");
      return;
    }
    if (!hasSeat) {
      router.replace("/");
    }
  }, [activeOrderId, hasSeat, router]);

  if (activeOrderId || !hasSeat) {
    return (
      <FanOperateLayout>
        <p className="text-sm text-label-muted">Checking seat and order state…</p>
      </FanOperateLayout>
    );
  }

  const seatLabel = ticket.section
    ? `Section ${ticket.section} · Row ${ticket.aisle} · Seat ${ticket.seat}`
    : `Row ${ticket.aisle} · Seat ${ticket.seat}`;

  return (
    <FanOperateLayout>
      <Card className="mt-2">
        <SectionLabel variant="action">Your seat</SectionLabel>
        <p className="text-sm font-semibold text-navy">{seatLabel}</p>
        <Link
          href="/"
          className="mt-3 inline-block text-sm font-semibold text-orange-dim underline-offset-2 hover:underline"
        >
          Change seat
        </Link>
      </Card>

      <Card className="mt-4">
        <MenuGrid />
      </Card>

      <CartBar />
    </FanOperateLayout>
  );
}
