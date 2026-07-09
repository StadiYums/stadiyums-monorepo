"use client";

import { Card } from "@/components/shared/ui/Card";
import { SeatForm } from "@/components/fan/SeatForm";
import { MenuGrid } from "@/components/fan/MenuGrid";
import { OrderTracker } from "@/components/fan/OrderTracker";
import { useDemo } from "@/providers/DemoProvider";

export function FanView() {
  const { activeOrderId } = useDemo();

  if (activeOrderId) {
    return <OrderTracker />;
  }

  return (
    <Card className="mb-5">
      <SeatForm />
      <MenuGrid />
    </Card>
  );
}
