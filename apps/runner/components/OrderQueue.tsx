"use client";

import { useEffect, useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { Button, StatusBadge, elapsed } from "@stadiyums/ui";
import type { OrderStatus } from "@stadiyums/types";
import { api } from "../../../convex/_generated/api";
import type { Id } from "../../../convex/_generated/dataModel";
import { getMenuItem, nextStatusLabel, statusLabel } from "../lib/menu";

function actionLabel(status: OrderStatus): string {
  if (status === "placed") return "Claim order";
  if (status === "preparing") return "Start delivery";
  return nextStatusLabel(status);
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
      <div className="space-y-3" aria-label="Loading ready orders" aria-busy="true">
        {[0, 1].map((key) => <div key={key} className="h-36 animate-pulse rounded-xl border border-line bg-surface-white" />)}
      </div>
    );
  }

  if (queue.length === 0) {
    return (
      <div className="rounded-xl border border-line bg-cream p-5">
        <p className="text-base font-bold text-navy">No ready orders yet.</p>
        <p className="mt-2 text-sm font-medium leading-relaxed text-label-muted">You are listening for Sections 101–115. We will surface the next pickup here.</p>
        <p className="mono mt-4 text-[10px] font-bold uppercase tracking-[0.06em] text-green">Live · last checked just now</p>
      </div>
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
      <p role="alert" className="rounded-lg border border-orange/30 bg-orange/10 px-4 py-3 text-sm font-semibold text-orange-dim">
          We could not claim that order. It may have just been taken — the queue is refreshing.
        </p>
      ) : null}
      {queue.map((order) => {
        const itemsSummary = order.items
          .map((item) => {
            const menuItem = getMenuItem(item.menuItemId);
            return `${item.qty}x ${menuItem?.name ?? item.menuItemId}`;
          })
          .join(", ");

        const itemCount = order.items.reduce((total, item) => total + item.qty, 0);
        return (
          <article
            key={order._id}
            className={`rounded-xl border bg-surface-white p-4 ${order.status === "on_the_way" ? "border-orange" : "border-line"}`}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="mono text-[10px] font-bold uppercase tracking-[0.06em] text-label-muted">Order {order.orderNumber}</p>
                <p className="mt-2 font-display text-[1.65rem] leading-none text-navy">Aisle {order.aisle} · Seat {order.seat}</p>
              </div>
              <StatusBadge status={order.status} label={statusLabel(order.status)} />
            </div>
            <div className="mt-4 flex items-center justify-between gap-3 border-t border-line pt-3">
              <p className="min-w-0 text-sm font-semibold text-ink">{itemsSummary}</p>
              <p className="mono shrink-0 text-[11px] font-bold text-label-muted">{itemCount} {itemCount === 1 ? "item" : "items"}</p>
            </div>
            <div className="mt-4 flex items-center justify-between gap-3">
              <p className="mono text-[11px] font-bold uppercase tracking-[0.04em] text-orange-dim">Ready {elapsed(order.placedAt, now)}</p>
              <Button
                variant="advance"
                className="min-h-12 min-w-[138px]"
                disabled={advancingId === order._id}
                onClick={() => void handleAdvance(order._id)}
              >
                {advancingId === order._id ? "Claiming…" : actionLabel(order.status)}
              </Button>
            </div>
          </article>
        );
      })}
    </div>
  );
}
