"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SeatPreviewBlock } from "@stadiyums/ui";
import { CartBar } from "../../features/orders/components/CartBar";
import { FanOperateLayout } from "../../components/FanOperateLayout";
import { MenuGrid } from "../../features/orders/components/MenuGrid";
import { useFan } from "../../providers/FanProvider";

export default function OrderPage() {
  const router = useRouter();
  const { activeOrderId, hasSeat, ticket, sessionReady } = useFan();

  useEffect(() => {
    if (!sessionReady) {
      return;
    }
    if (activeOrderId) {
      router.replace("/tracker");
      return;
    }
    if (!hasSeat) {
      router.replace("/seat");
    }
  }, [activeOrderId, hasSeat, router, sessionReady]);

  if (!sessionReady || activeOrderId || !hasSeat) {
    return (
      <FanOperateLayout>
        <p className="text-sm text-label-muted">Checking seat and order state…</p>
      </FanOperateLayout>
    );
  }

  return (
    <FanOperateLayout>
      <div className="flex flex-col gap-[var(--space-section)]">
        <SeatPreviewBlock
          section={ticket.section}
          aisle={ticket.aisle}
          seat={ticket.seat}
          action={
            <Link
              href="/seat"
              className="text-[13px] font-semibold text-cream/75 underline-offset-2 hover:text-cream hover:underline"
            >
              Change seat
            </Link>
          }
        />

        <MenuGrid />
      </div>

      <CartBar />
    </FanOperateLayout>
  );
}
