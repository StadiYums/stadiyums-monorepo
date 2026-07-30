export function money(amount: number): string {
  return `$${amount.toFixed(2)}`;
}

export function elapsed(placedAt: number, now: number): string {
  const seconds = Math.floor((now - placedAt) / 1000);
  if (seconds < 60) {
    return `${seconds}s ago`;
  }
  return `${Math.floor(seconds / 60)}m ago`;
}

export function averageDeliveryMinutes(
  deliveredOrders: Array<{ placedAt: number; deliveredAt?: number }>,
): string {
  const completed = deliveredOrders.filter((order) => order.deliveredAt !== undefined);
  if (completed.length === 0) {
    return "-";
  }
  const totalMinutes = completed.reduce((sum, order) => {
    return sum + (order.deliveredAt! - order.placedAt) / 60000;
  }, 0);
  return `${Math.round(totalMinutes / completed.length)}m`;
}
