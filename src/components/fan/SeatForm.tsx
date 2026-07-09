"use client";

import { IconArmchair } from "@tabler/icons-react";
import { Input } from "@/components/shared/ui/Input";
import { SectionLabel } from "@/components/shared/ui/Card";
import { useDemo } from "@/providers/DemoProvider";

export function SeatForm() {
  const {
    ticket,
    setTicket,
    seatValidationError,
    setSeatValidationError,
  } = useDemo();

  return (
    <>
      <SectionLabel>Enter your ticket info</SectionLabel>
      <div className="mb-[18px] grid grid-cols-2 gap-3">
        <Input
          label="Aisle #"
          type="number"
          min={1}
          inputMode="numeric"
          value={ticket.aisle}
          invalid={seatValidationError && !ticket.aisle}
          placeholder="e.g. 12"
          onChange={(event) => {
            setSeatValidationError(false);
            setTicket((current) => ({ ...current, aisle: event.target.value }));
          }}
        />
        <Input
          label="Seat #"
          type="number"
          min={1}
          inputMode="numeric"
          value={ticket.seat}
          invalid={seatValidationError && !ticket.seat}
          placeholder="e.g. 8"
          onChange={(event) => {
            setSeatValidationError(false);
            setTicket((current) => ({ ...current, seat: event.target.value }));
          }}
        />
      </div>
      {seatValidationError && (
        <p className="mono -mt-2.5 mb-3.5 text-[11px] font-bold text-orange-dim">
          Enter your aisle and seat number to place an order.
        </p>
      )}
      <div className="mono mb-6 flex items-center gap-2.5 rounded-md bg-navy px-4 py-3.5 text-sm text-cream">
        <IconArmchair size={20} className="text-orange" />
        We&apos;ll deliver straight to Aisle {ticket.aisle || "—"}, Seat{" "}
        {ticket.seat || "—"}.
      </div>
    </>
  );
}
