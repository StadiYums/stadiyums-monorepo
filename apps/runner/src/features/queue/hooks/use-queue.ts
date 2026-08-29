"use client";

import { useCallback, useEffect, useState } from "react";
import type { OrderDto } from "@stadiyums/db";
import {
  advanceOrderAction,
  getQueueAction,
  getStatsAction,
} from "../actions/order-actions";

type QueueStats = {
  openCount: number;
  deliveredCount: number;
  avgDeliveryMinutes: number | null;
};

export function useQueue(intervalMs = 2000) {
  const [queue, setQueue] = useState<OrderDto[] | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    const result = await getQueueAction();
    if (result.success) {
      setQueue(result.data);
      setError(null);
    } else {
      setError(result.error);
      setQueue([]);
    }
  }, []);

  useEffect(() => {
    void refresh();

    const interval = window.setInterval(() => {
      void refresh();
    }, intervalMs);

    return () => window.clearInterval(interval);
  }, [intervalMs, refresh]);

  const advance = useCallback(
    async (orderId: string) => {
      const result = await advanceOrderAction({ orderId });
      if (result.success) {
        await refresh();
        return { success: true as const };
      }
      return { success: false as const, error: result.error };
    },
    [refresh],
  );

  return { queue, error, refresh, advance };
}

export function useStats(intervalMs = 2000) {
  const [stats, setStats] = useState<QueueStats | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    const result = await getStatsAction();
    if (result.success) {
      setStats(result.data);
      setError(null);
    } else {
      setError(result.error);
      setStats(undefined);
    }
  }, []);

  useEffect(() => {
    void refresh();

    const interval = window.setInterval(() => {
      void refresh();
    }, intervalMs);

    return () => window.clearInterval(interval);
  }, [intervalMs, refresh]);

  return { stats, error, refresh };
}
