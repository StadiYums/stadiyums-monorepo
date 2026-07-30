"use client";

import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

/** Lightweight probe that shared Convex queries resolve in the fan app. */
export function ConvexConnectionProbe() {
  const stats = useQuery(api.orders.getStats);

  if (stats === undefined) {
    return (
      <p className="mono text-[11.5px] uppercase tracking-[0.08em] text-label-muted">
        Connecting to Convex…
      </p>
    );
  }

  return (
    <p className="mono text-[11.5px] uppercase tracking-[0.08em] text-label-muted">
      Convex live · {stats.openCount} open · {stats.deliveredCount} delivered
    </p>
  );
}
