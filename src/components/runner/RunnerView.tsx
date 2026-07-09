"use client";

import { RunnerStats } from "@/components/runner/RunnerStats";
import { OrderQueue } from "@/components/runner/OrderQueue";

export function RunnerView() {
  return (
    <div>
      <RunnerStats />
      <p className="mono mb-3 mt-6 text-xs font-bold uppercase tracking-[0.06em] text-label-muted">
        Concession queue
      </p>
      <OrderQueue />
    </div>
  );
}
