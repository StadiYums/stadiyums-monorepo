"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card, SectionLabel } from "@stadiyums/ui";
import { CartBar } from "../../features/orders/components/CartBar";
import { FanShell } from "../../components/FanShell";
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
      <FanShell title="Loading…" description="Checking seat and order state." />
    );
  }

  return (
    <FanShell
      title="Order"
      description="Pick your concessions and we'll bring them straight to your seat."
    >
      <Card className="mt-8">
        <SectionLabel>Seat</SectionLabel>
        <p className="mt-2 text-sm text-ink">
          Aisle {ticket.aisle} · Seat {ticket.seat}
        </p>
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
    </FanShell>
  );
}
