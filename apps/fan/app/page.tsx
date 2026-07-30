"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FanShell } from "../components/FanShell";
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
      <FanShell title="Loading…" description="Opening your live order tracker." />
    );
  }

  return (
    <FanShell
      title="Find your seat"
      description="Confirm aisle and seat before browsing vendors. Full seat localization lands in F1."
    >
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
    </FanShell>
  );
}
