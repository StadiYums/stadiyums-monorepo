"use client";

import { useCallback, useEffect, useState } from "react";
import type { OrderDto } from "@stadiyums/db";
import { getOrderAction } from "../actions/get-order";

export function useOrder(orderId: string | null, intervalMs = 2000) {
  const [order, setOrder] = useState<OrderDto | null | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    if (!orderId) {
      setOrder(undefined);
      return;
    }

    const result = await getOrderAction({ orderId });
    if (result.success) {
      setOrder(result.data);
      setError(null);
    } else {
      setError(result.error);
      setOrder(null);
    }
  }, [orderId]);

  useEffect(() => {
    void refresh();
    if (!orderId) return;

    const interval = window.setInterval(() => {
      void refresh();
    }, intervalMs);

    return () => window.clearInterval(interval);
  }, [orderId, intervalMs, refresh]);

  return { order, error, refresh };
}
