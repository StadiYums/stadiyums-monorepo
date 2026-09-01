"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FanOperateLayout } from "../../components/FanOperateLayout";
import { SeatForm } from "../../components/SeatForm";
import { useFan } from "../../providers/FanProvider";

export function SeatPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const viaQr = searchParams.get("via") === "qr";
  const { activeOrderId, sessionReady } = useFan();

  useEffect(() => {
    if (!sessionReady) {
      return;
    }
    if (activeOrderId) {
      router.replace("/tracker");
    }
  }, [activeOrderId, router, sessionReady]);

  if (!sessionReady || activeOrderId) {
    return (
      <FanOperateLayout>
        <p className="text-sm text-label-muted">Opening your live order tracker…</p>
      </FanOperateLayout>
    );
  }

  return (
    <FanOperateLayout>
      <div className="flex flex-col gap-[var(--space-6)]">
        <Link
          href="/"
          className="inline-flex items-center gap-[var(--space-1)] text-sm font-semibold text-orange-dim underline-offset-2 hover:underline"
        >
          ← Back
        </Link>

        {viaQr ? (
          <div className="rounded-lg border border-line bg-surface-white p-[var(--space-4)]">
            <p className="mono text-[11px] font-bold uppercase tracking-[0.1em] text-orange">
              Scan QR code
            </p>
            <div className="mt-[var(--space-3)] flex aspect-[1.4/1] items-center justify-center rounded-md border-2 border-dashed border-line bg-cream">
              <p className="max-w-[220px] text-center text-sm leading-relaxed text-label-muted">
                Camera scan lands in a future release. Enter your seat below for now.
              </p>
            </div>
          </div>
        ) : null}

        <SeatForm />
      </div>
    </FanOperateLayout>
  );
}
