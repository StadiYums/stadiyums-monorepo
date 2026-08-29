"use client";

import { useEffect, useState } from "react";
import { Button, StatusBadge, elapsed } from "@stadiyums/ui";
import type { OrderItem } from "@stadiyums/db";
import { useQueue } from "../features/queue/hooks/use-queue";
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
  const { queue, error: queueError, advance } = useQueue();
  const [now, setNow] = useState(() => Date.now());
  const [advanceError, setAdvanceError] = useState<string | null>(null);
  const [advancingId, setAdvancingId] = useState<string | null>(null);

  useEffect(() => {
    const interval = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(interval);
  }, []);

  if (queue === undefined) {
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

  const handleAdvance = async (orderId: string) => {
    setAdvanceError(null);
    setAdvancingId(orderId);
    const result = await advance(orderId);
    if (!result.success) {
      setAdvanceError(result.error);
    }
    setAdvancingId(null);
  };

  const displayError = advanceError ?? queueError;

  return (
    <div className="space-y-3">
      {displayError ? (
        <p role="alert" className="text-center text-sm font-medium text-red-600">
          {displayError}
        </p>
      ) : null}
      {queue.map((order) => {
        const itemsSummary = order.items
          .map((item: OrderItem) => {
            const menuItem = getMenuItem(item.menuItemId);
            return `${item.qty}x ${menuItem?.name ?? item.menuItemId}`;
          })
          .join(", ");

        return (
          <div
            key={order.id}
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
              disabled={advancingId === order.id}
              onClick={() => void handleAdvance(order.id)}
            >
              {advancingId === order.id ? "Updating…" : nextStatusLabel(order.status)}
            </Button>
          </div>
        );
      })}
    </div>
  );
}
