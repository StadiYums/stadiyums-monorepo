"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Button, money } from "@stadiyums/ui";
import { getMenuItem } from "../lib/menu";
import { useFan } from "../providers/FanProvider";

export function CartBar() {
  const { cart, ticket, setActiveOrderId, setSeatValidationError, setCart } = useFan();
  const placeOrder = useMutation(api.orders.placeOrder);
  const [isPlacing, setIsPlacing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const count = Object.values(cart).reduce((sum, qty) => sum + qty, 0);
  const total = Object.entries(cart).reduce((sum, [id, qty]) => {
    const item = getMenuItem(id);
    return sum + (item?.price ?? 0) * qty;
  }, 0);

  const visible = count > 0;

  const handlePlaceOrder = async () => {
    if (!ticket.aisle.trim() || !ticket.seat.trim()) {
      setSeatValidationError(true);
      return;
    }

    const items = Object.entries(cart).map(([menuItemId, qty]) => ({
      menuItemId,
      qty,
    }));

    setError(null);
    setIsPlacing(true);
    try {
      const orderId = await placeOrder({
        aisle: ticket.aisle,
        seat: ticket.seat,
        items,
      });

      setCart({});
      setActiveOrderId(orderId);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Could not place order. Is the Convex backend running?",
      );
    } finally {
      setIsPlacing(false);
    }
  };

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 bg-orange py-4 text-white transition-transform duration-[250ms] ease-out ${
        visible ? "translate-y-0" : "translate-y-[110%]"
      }`}
    >
      <div className="mx-auto max-w-[520px] px-5">
        {error && (
          <p role="alert" className="mb-2 text-center text-sm font-medium text-white/95">
            {error}
          </p>
        )}
        <div className="flex items-center justify-between">
          <div className="text-sm">
            <b className="mono">{count}</b> items · <b className="mono">{money(total)}</b>
          </div>
          <Button
            type="button"
            disabled={isPlacing}
            onClick={() => void handlePlaceOrder()}
          >
            {isPlacing ? "Placing…" : "Place order →"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export function useCartCount() {
  const { cart } = useFan();
  return Object.values(cart).reduce((sum, qty) => sum + qty, 0);
}

export function useCartTotal() {
  const { cart } = useFan();
  return Object.entries(cart).reduce((sum, [id, qty]) => {
    const item = getMenuItem(id);
    return sum + (item?.price ?? 0) * qty;
  }, 0);
}
