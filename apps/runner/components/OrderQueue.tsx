"use client";

import { useEffect, useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { Button, StatusBadge, elapsed } from "@stadiyums/ui";
import { api } from "../../../convex/_generated/api";
import type { Id } from "../../../convex/_generated/dataModel";
import { getMenuItem, nextStatusLabel, statusLabel } from "../lib/menu";

function borderAccent(status: string): string {
  switch (status) {
    case "preparing":
      return "border-l-orange";
    case "on_the_way":
    case "pickedUp":
      return "border-l-navy";
    case "delivered":
      return "border-l-green opacity-60";
    default:
      return "border-l-orange";
  }
}

export function OrderQueue() {
  const queue = useQuery(api.orders.listQueue);
  const advanceOrder = useMutation(api.orders.advanceOrder);
  const [now, setNow] = useState(() => Date.now());
  const [advanceError, setAdvanceError] = useState<string | null>(null);
  const [advancingId, setAdvancingId] = useState<Id<"orders"> | null>(null);

  useEffect(() => {
    const interval = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(interval);
  }, []);

  if (!queue) {
    return (
      <p className="py-5 text-center text-[15px] font-medium text-label-muted">
        Loading queue…
      </p>
    );
  }

  if (queue.length === 0) {
    return (
      <p className="py-5 text-center text-[15px] font-medium text-label-muted">
        Queue is clear — no open orders right now.
      </p>
    );
  }

  const handleAdvance = async (orderId: Id<"orders">) => {
    setAdvanceError(null);
    setAdvancingId(orderId);
    try {
      await advanceOrder({ orderId });
    } catch (err) {
      setAdvanceError(
        err instanceof Error
          ? err.message
          : "Could not update order. Is the Convex backend running?",
      );
    } finally {
      setAdvancingId(null);
    }
  };

  return (
    <div className="space-y-3">
      {advanceError ? (
        <p role="alert" className="text-center text-sm font-medium text-red-600">
          {advanceError}
        </p>
      ) : null}
      {queue.map((order) => {
        const itemsSummary = order.items
          .map((item) => {
            const menuItem = getMenuItem(item.menuItemId);
            return `${item.qty}x ${menuItem?.name ?? item.menuItemId}`;
          })
          .join(", ");

        return (
          <div
            key={order._id}
            className={`flex flex-wrap items-center justify-between gap-3.5 rounded-md border-2 border-navy border-l-4 bg-surface-white px-[18px] py-4 ${borderAccent(order.status)}`}
          >
            <div className="mono min-w-[130px] text-[15px] font-bold text-navy">
              Aisle {order.aisle} · Seat {order.seat}
            </div>
            <div className="min-w-[160px] flex-1 text-[13px] font-medium text-ink">
              {itemsSummary}
            </div>
            <div className="mono min-w-20 text-[11.5px] font-bold text-label-muted">
              {elapsed(order.placedAt, now)}
            </div>
            <StatusBadge status={order.status} label={statusLabel(order.status)} />
            <Button
              variant="advance"
              className="w-full min-h-12 min-[561px]:w-auto"
              disabled={advancingId === order._id}
              onClick={() => void handleAdvance(order._id)}
            >
              {advancingId === order._id ? "Updating…" : nextStatusLabel(order.status)}
            </Button>
          </div>
        );
      })}
    </div>
  );
}
