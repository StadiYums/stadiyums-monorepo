"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FAN_TRACKER_STEPS } from "@stadiyums/types";
import type { MenuItemId } from "@stadiyums/types";
import { Button, Card, SectionLabel } from "@stadiyums/ui";
import { FanShell } from "../../components/FanShell";
import { useFan } from "../../providers/FanProvider";

export default function OrderPage() {
  const router = useRouter();
  const { activeOrderId, hasSeat, ticket, cart } = useFan();
  const cartCount = Object.values(cart).reduce((sum, qty) => sum + qty, 0);
  const cartIds = Object.keys(cart) as MenuItemId[];

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
      description="Marketplace and cart UI migrate here in HEX-147. This route is the fan shell only."
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
        <SectionLabel>Marketplace</SectionLabel>
        <p className="mt-2 text-sm text-ink/80">
          Vendor grid and menu screens land in F2. Cart items in session:{" "}
          {cartCount}
          {cartIds.length > 0 ? ` (${cartIds.join(", ")})` : ""}. Tracker steps:{" "}
          {FAN_TRACKER_STEPS.length}.
        </p>
        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <Button
            type="button"
            variant="secondary"
            className="w-full sm:w-auto"
            disabled
          >
            Browse vendors (soon)
          </Button>
          <Button
            type="button"
            className="w-full sm:w-auto"
            onClick={() => router.push("/receipt")}
          >
            Preview receipt route
          </Button>
        </div>
      </Card>
    </FanShell>
  );
}
