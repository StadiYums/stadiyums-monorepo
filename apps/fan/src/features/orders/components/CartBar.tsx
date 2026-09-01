"use client";

import { useState } from "react";
import { OperateCartBar, money } from "@stadiyums/ui";
import { useRouter } from "next/navigation";
import { placeOrderAction } from "../actions/place-order";
import { getMenuItem } from "../../../lib/menu";
import { useFan } from "../../../providers/FanProvider";

export function CartBar() {
  const router = useRouter();
  const { cart, ticket, setActiveOrderId, setSeatValidationError, setCart } =
    useFan();
  const [isPlacing, setIsPlacing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const count = Object.values(cart).reduce((sum, qty) => sum + qty, 0);
  const total = Object.entries(cart).reduce((sum, [id, qty]) => {
    const item = getMenuItem(id);
    return sum + (item?.price ?? 0) * qty;
  }, 0);

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
      const result = await placeOrderAction({
        aisle: ticket.aisle,
        seat: ticket.seat,
        items,
      });

      if (!result.success) {
        setError(result.error);
        return;
      }

      setCart({});
      setActiveOrderId(result.data.id);
      router.push("/tracker");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Could not place order. Check your database connection.",
      );
    } finally {
      setIsPlacing(false);
    }
  };

  return (
    <OperateCartBar
      visible={count > 0}
      itemCount={count}
      totalLabel={money(total)}
      actionLabel={isPlacing ? "Placing…" : "Place order →"}
      onAction={() => void handlePlaceOrder()}
      actionDisabled={isPlacing}
      error={error}
    />
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
