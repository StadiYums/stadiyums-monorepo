"use client";

import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Button, Card, SectionLabel, money } from "@stadiyums/ui";
import { getMenuItem, ORDER_STEPS } from "../lib/menu";
import { useFan } from "../providers/FanProvider";

export function OrderTracker() {
  const { activeOrderId, setActiveOrderId } = useFan();
  const order = useQuery(
    api.orders.getOrder,
    activeOrderId ? { orderId: activeOrderId } : "skip",
  );

  if (!activeOrderId || order === undefined) {
    return null;
  }

  if (order === null) {
    return (
      <Card className="mt-8">
        <p className="text-sm text-label-muted">Order not found.</p>
        <Button
          className="mt-4 w-full"
          variant="secondary"
          onClick={() => setActiveOrderId(null)}
        >
          Order again
        </Button>
      </Card>
    );
  }

  const stepIdx = ORDER_STEPS.findIndex((step) => step.key === order.status);
  const total = order.items.reduce((sum, item) => {
    const menuItem = getMenuItem(item.menuItemId);
    return sum + (menuItem?.price ?? 0) * item.qty;
  }, 0);

  const etaText =
    order.status === "delivered"
      ? "Delivered to your seat, enjoy the game!"
      : order.status === "on_the_way"
        ? "Your runner is on the concourse, headed your way."
        : order.status === "preparing"
          ? "The stand is firing up your order now."
          : "Your order just hit the kitchen queue.";

  return (
    <Card className="mt-8">
      <div className="mb-7 flex flex-wrap items-center justify-between gap-3">
        <div>
          <SectionLabel>Order status</SectionLabel>
          <h2 className="text-2xl text-navy">
            Aisle {order.aisle} · Seat {order.seat}
          </h2>
        </div>
        <span className="mono text-xs text-label-muted">#SY-{order.orderNumber}</span>
      </div>

      <div className="mb-8 flex">
        {ORDER_STEPS.map((step, index) => {
          const done = index < stepIdx;
          const current = index === stepIdx;
          return (
            <div key={step.key} className="relative flex-1 text-center">
              {index > 0 && (
                <div
                  className={`absolute top-[17px] left-[-50%] z-[1] h-[3px] w-full ${
                    done ? "bg-green" : "bg-[var(--step-inactive)]"
                  }`}
                />
              )}
              <div
                className={`relative z-[2] mx-auto mb-2.5 flex h-[34px] w-[34px] items-center justify-center rounded-full text-sm font-bold transition-colors duration-300 ${
                  done
                    ? "bg-green text-white"
                    : current
                      ? "bg-orange text-white shadow-[0_0_0_5px_var(--accent-ring)]"
                      : "bg-[var(--step-inactive)] text-[var(--step-inactive-text)]"
                }`}
              >
                {index <= stepIdx ? "✓" : index + 1}
              </div>
              <span className="mono text-[11px] font-bold uppercase tracking-[0.03em] text-label-muted">
                {step.label}
              </span>
            </div>
          );
        })}
      </div>

      <div className="mb-6 flex items-center gap-3 rounded-md border border-[var(--green-border)] bg-[var(--green-tint)] px-[18px] py-4">
        <div>
          <b className="mono text-green">
            {order.status === "delivered"
              ? "Delivered"
              : `~${Math.max(1, 8 - stepIdx * 2)} min`}
          </b>{" "}
          · {etaText}
        </div>
      </div>

      <div>
        {order.items.map((item) => {
          const menuItem = getMenuItem(item.menuItemId);
          if (!menuItem) return null;
          return (
            <div
              key={item.menuItemId}
              className="flex justify-between border-t border-line py-2 text-sm"
            >
              <span>
                {item.qty} x {menuItem.name}
              </span>
              <span className="mono">{money(menuItem.price * item.qty)}</span>
            </div>
          );
        })}
        <div className="flex justify-between border-y border-line py-2 text-sm font-bold">
          <span>Total</span>
          <span className="mono">{money(total)}</span>
        </div>
      </div>

      {order.status === "delivered" && (
        <Button
          variant="secondary"
          className="mt-5 w-full"
          onClick={() => setActiveOrderId(null)}
        >
          Order again
        </Button>
      )}
    </Card>
  );
}
