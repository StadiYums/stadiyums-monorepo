"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FanOperateLayout } from "../components/FanOperateLayout";
import { SeatForm } from "../components/SeatForm";
import { useFan } from "../providers/FanProvider";

export default function HomePage() {
  const router = useRouter();
  const { activeOrderId, hasSeat } = useFan();

  useEffect(() => {
    if (activeOrderId) {
      router.replace("/tracker");
    }
  }, [activeOrderId, router]);

  if (activeOrderId) {
    return (
      <FanOperateLayout>
        <p className="text-sm text-label-muted">Opening your live order tracker…</p>
      </FanOperateLayout>
    );
  }

  return (
    <FanOperateLayout>
      <SeatForm />
      {hasSeat ? (
        <p className="mt-4 text-center text-sm text-ink/70">
          Seat already set.{" "}
          <Link
            href="/order"
            className="font-semibold text-orange-dim underline-offset-2 hover:underline"
          >
            Continue to order
          </Link>
        </p>
      ) : null}
    </FanOperateLayout>
  );
}
