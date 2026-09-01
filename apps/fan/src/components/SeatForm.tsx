"use client";

import { useRouter } from "next/navigation";
import { Button, Input, SeatPreviewBlock } from "@stadiyums/ui";
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
    if (!ticket.section.trim()) {
      setSeatValidationError(true);
      return;
    }
    if (!ticket.aisle.trim() || !ticket.seat.trim()) {
      setSeatValidationError(true);
      return;
    }
    setSeatValidationError(false);
    router.push("/order");
  };

  const sectionError = seatValidationError && !ticket.section.trim();
  const rowError = seatValidationError && !ticket.aisle.trim();
  const seatError = seatValidationError && !ticket.seat.trim();

  return (
    <div className="flex flex-col gap-[var(--space-6)]">
      <header>
        <h1 className="font-display text-[1.75rem] leading-none text-navy">
          Enter your seat
        </h1>
        <p className="mt-[var(--space-2)] text-[15px] leading-snug text-label-muted">
          Select your section, then row and seat so we know where to deliver.
        </p>
      </header>

      <SectionChips />

      <div className="grid grid-cols-2 gap-[var(--space-3)]">
        <Input
          label="Row"
          type="number"
          min={1}
          inputMode="numeric"
          value={ticket.aisle}
          invalid={rowError}
          placeholder="12"
          onChange={(event) => {
            setSeatValidationError(false);
            setTicket((current) => ({ ...current, aisle: event.target.value }));
          }}
        />
        <Input
          label="Seat"
          type="number"
          min={1}
          inputMode="numeric"
          value={ticket.seat}
          invalid={seatError}
          placeholder="8"
          onChange={(event) => {
            setSeatValidationError(false);
            setTicket((current) => ({ ...current, seat: event.target.value }));
          }}
        />
      </div>

      {seatValidationError ? (
        <p className="text-sm font-medium text-orange-dim" role="alert">
          {sectionError
            ? "Select a section to continue."
            : "Enter your row and seat to continue."}
        </p>
      ) : null}

      <SeatPreviewBlock
        section={ticket.section}
        aisle={ticket.aisle}
        seat={ticket.seat}
      />

      <Button
        className="min-h-14 w-full text-[15px]"
        type="button"
        onClick={continueToOrder}
      >
        Continue to order
      </Button>
    </div>
  );
}
