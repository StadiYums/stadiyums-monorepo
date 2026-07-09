"use client";

import { useEffect, useState } from "react";
import { IconArmchair } from "@tabler/icons-react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import type { Id } from "../../../convex/_generated/dataModel";
import { elapsed } from "@/lib/format";
import { getMenuItem, nextStatusLabel, statusLabel } from "@/lib/menu";
import { StatusBadge } from "@/components/shared/ui/StatusBadge";
import { Button } from "@/components/shared/ui/Button";

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
    return <p className="py-5 text-center text-[13.5px] text-label-muted">Loading queue…</p>;
  }

  if (queue.length === 0) {
    return (
      <p className="py-5 text-center text-[13.5px] text-label-muted">
        Queue is clear - no open orders right now.
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
      {advanceError && (
        <p role="alert" className="text-center text-sm font-medium text-red-600">
          {advanceError}
        </p>
      )}
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
            className={`flex flex-wrap items-center justify-between gap-3.5 rounded-md border border-line border-l-4 bg-surface-white px-[18px] py-4 ${
              order.status === "preparing"
                ? "border-l-orange"
                : order.status === "on_the_way"
                  ? "border-l-navy"
                  : order.status === "delivered"
                    ? "border-l-green opacity-60"
                    : "border-l-orange"
            }`}
          >
            <div className="mono min-w-[130px] text-[15px] font-bold text-navy">
              <IconArmchair size={16} className="mr-1 inline" aria-hidden />
              Aisle {order.aisle} - Seat {order.seat}
            </div>
            <div className="min-w-[160px] flex-1 text-[13px] text-[#5a5348]">
              {itemsSummary}
            </div>
            <div className="mono min-w-20 text-[11.5px] text-label-muted">
              {elapsed(order.placedAt, now)}
            </div>
            <StatusBadge status={order.status} label={statusLabel(order.status)} />
            <Button
              variant="advance"
              className="w-full min-[561px]:w-auto"
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
