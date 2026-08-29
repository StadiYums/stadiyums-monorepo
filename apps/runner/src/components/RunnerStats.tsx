"use client";

import { useStats } from "../features/queue/hooks/use-queue";

export function RunnerStats() {
  const { stats } = useStats();

  if (!stats) {
    return (
      <div className="mb-[22px] flex flex-wrap gap-3">
        {[0, 1, 2].map((key) => (
          <div
            key={key}
            className="min-w-[130px] flex-1 animate-pulse rounded-md bg-navy/60 px-4 py-3.5"
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
    <div className="mb-[22px] flex flex-wrap gap-3">
      {chips.map((chip) => (
        <div
          key={chip.label}
          className="min-w-[130px] flex-1 rounded-md border-2 border-navy bg-navy px-4 py-3.5 text-cream"
        >
          <div className="mono text-[22px] font-bold text-orange">{chip.value}</div>
          <div className="text-[11px] font-bold uppercase tracking-[0.04em] text-cream/65">
            {chip.label}
          </div>
        </div>
      ))}
    </div>
  );
}
