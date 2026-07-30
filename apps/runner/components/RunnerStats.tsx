"use client";

import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

export function RunnerStats() {
  const stats = useQuery(api.orders.getStats);

  if (!stats) {
    return (
      <div className="mb-6 grid grid-cols-3 divide-x divide-cream/20 rounded-xl bg-navy px-2 py-3">
        {[0, 1, 2].map((key) => (
          <div
            key={key}
            className="h-12 animate-pulse rounded-md bg-cream/10 px-3"
          />
        ))}
      </div>
    );
  }

  const avgTime =
    stats.avgDeliveryMinutes != null
      ? `${Math.round(stats.avgDeliveryMinutes)}m`
      : "-";

  const chips = [
    { value: stats.openCount, label: "Open orders" },
    { value: stats.deliveredCount, label: "Delivered today" },
    { value: avgTime, label: "Avg. delivery time" },
  ];

  return (
    <div className="mb-6 grid grid-cols-3 divide-x divide-cream/20 rounded-xl bg-navy px-2 py-3">
      {chips.map((chip) => (
        <div
          key={chip.label}
          className="min-w-0 px-3 text-cream"
        >
          <div className="mono text-[22px] font-bold text-orange">{chip.value}</div>
          <div className="mt-1 text-[10px] font-bold uppercase leading-tight tracking-[0.03em] text-cream/70">
            {chip.label}
          </div>
        </div>
      ))}
    </div>
  );
}
