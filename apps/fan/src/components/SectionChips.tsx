"use client";

import { SectionLabel } from "@stadiyums/ui";
import { useFan } from "../providers/FanProvider";

export const DEMO_SECTIONS = ["108", "109", "112", "115", "204"] as const;

export function SectionChips() {
  const { ticket, setTicket, setSeatValidationError } = useFan();

  return (
    <div className="mt-4">
      <SectionLabel variant="action">Delivering to</SectionLabel>
      <div className="flex flex-wrap gap-2">
        {DEMO_SECTIONS.map((section) => {
          const selected = ticket.section === section;
          return (
            <button
              key={section}
              type="button"
              onClick={() => {
                setSeatValidationError(false);
                setTicket((current) => ({
                  ...current,
                  section,
                  aisle: section,
                }));
              }}
              className={`mono rounded-md border px-3 py-2 text-[13px] font-bold transition-colors ${
                selected
                  ? "border-orange bg-orange text-white"
                  : "border-line bg-surface-white text-navy hover:bg-cream"
              }`}
            >
              Section {section}
            </button>
          );
        })}
      </div>
    </div>
  );
}
