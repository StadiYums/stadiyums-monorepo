"use client";

import { useRouter } from "next/navigation";
import { Button, Card, Input, SectionLabel, SeatPreviewBlock } from "@stadiyums/ui";
import { SectionChips } from "./SectionChips";
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
    <Card className="mt-2">
      <SectionLabel variant="action">Find your seat</SectionLabel>
      <SectionChips />
      <div className="mt-4 grid grid-cols-2 gap-3">
        <Input
          label="Row #"
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
        <p className="mt-3 text-sm text-orange-dim">Row and seat are required.</p>
      ) : (
        <SeatPreviewBlock
          className="mt-4"
          section={ticket.section}
          aisle={ticket.aisle}
          seat={ticket.seat}
        />
      )}
      <Button className="mt-5 w-full" type="button" onClick={continueToOrder}>
        Continue to order
      </Button>
    </Card>
  );
}
