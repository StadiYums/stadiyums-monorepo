"use client";

import { Button, SectionLabel } from "@stadiyums/ui";
import { OrderQueue } from "../components/OrderQueue";
import { RunnerShell } from "../components/RunnerShell";
import { RunnerStats } from "../components/RunnerStats";
import { useRunner } from "../providers/RunnerProvider";

export default function QueuePage() {
  const { isAvailable, setAvailable } = useRunner();

  return (
    <RunnerShell title="Queue" description="Your next delivery, at a glance.">
      <section className="mt-6 rounded-xl border border-line bg-surface-white p-4" aria-labelledby="availability-heading">
        <div className="flex items-center justify-between gap-3">
          <div>
            <SectionLabel>Shift status</SectionLabel>
            <h2 id="availability-heading" className="mt-2 text-base font-bold text-navy">
              {isAvailable ? "Listening for orders" : "Taking a break"}
            </h2>
          </div>
          <span className={`h-3 w-3 rounded-full ${isAvailable ? "bg-green" : "bg-label-muted"}`} aria-hidden="true" />
        </div>
        <p className="mt-2 text-sm font-medium leading-relaxed text-label-muted">
          {isAvailable ? "Ready orders for your assigned zone will appear here." : "Go available when you are ready for the next pickup."}
        </p>
        <Button
          className="mt-4 min-h-14 w-full text-base"
          type="button"
          variant={isAvailable ? "secondary" : "advance"}
          onClick={() => setAvailable(!isAvailable)}
          aria-pressed={isAvailable}
        >
          {isAvailable ? "Go on break" : "Go available"}
        </Button>
      </section>

      <div className="mt-7">
        <RunnerStats />
        <div className="flex items-end justify-between gap-3">
          <div>
            <SectionLabel>Ready orders</SectionLabel>
            <h2 className="mt-2 font-display text-xl text-navy">Choose your next run</h2>
          </div>
          <span className="mono text-[10px] font-bold uppercase tracking-[0.06em] text-label-muted">Live queue</span>
        </div>
        {isAvailable ? (
          <div className="mt-3">
            <OrderQueue />
          </div>
        ) : (
          <div className="mt-3 rounded-xl border border-line bg-cream p-5">
            <p className="text-base font-bold text-navy">Your queue is paused.</p>
            <p className="mt-2 text-sm font-medium leading-relaxed text-label-muted">Your zone and shift are saved. Go available when you are ready to receive orders.</p>
          </div>
        )}
      </div>
    </RunnerShell>
  );
}
