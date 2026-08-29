"use client";

import { useRouter } from "next/navigation";
import { Button, Card, Input, SectionLabel } from "@stadiyums/ui";
import { useFan } from "../providers/FanProvider";

export function SeatForm() {
  const router = useRouter();
  const {
    ticket,
    setTicket,
    seatValidationError,
    setSeatValidationError,
  } = useFan();

  const continueToOrder = () => {
    if (!ticket.aisle.trim() || !ticket.seat.trim()) {
      setSeatValidationError(true);
      return;
    }
    setSeatValidationError(false);
    router.push("/order");
  };

  return (
    <Card className="mt-8">
      <SectionLabel>Enter your ticket info</SectionLabel>
      <div className="mt-3 grid grid-cols-2 gap-3">
        <Input
          label="Aisle #"
          type="number"
          min={1}
          inputMode="numeric"
          value={ticket.aisle}
          invalid={seatValidationError && !ticket.aisle.trim()}
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
          invalid={seatValidationError && !ticket.seat.trim()}
          placeholder="e.g. 8"
          onChange={(event) => {
            setSeatValidationError(false);
            setTicket((current) => ({ ...current, seat: event.target.value }));
          }}
        />
      </div>
      {seatValidationError ? (
        <p className="mt-3 text-sm text-orange">Aisle and seat are required.</p>
      ) : (
        <div className="mono mt-4 flex items-center gap-2.5 rounded-md bg-navy px-4 py-3.5 text-sm text-cream">
          We&apos;ll deliver straight to Aisle {ticket.aisle || "—"}, Seat{" "}
          {ticket.seat || "—"}.
        </div>
      )}
      <Button className="mt-5 w-full" type="button" onClick={continueToOrder}>
        Continue to order
      </Button>
    </Card>
  );
}
