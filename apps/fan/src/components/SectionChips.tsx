"use client";

import { SectionLabel } from "@stadiyums/ui";
import { useFan } from "../providers/FanProvider";

/** Placeholder sections until tenant venue config supplies the real bowl map. */
export const SAMPLE_SECTIONS = ["108", "109", "112", "115", "204"] as const;

export function SectionChips() {
  const { ticket, setTicket, setSeatValidationError } = useFan();

  return (
    <section aria-label="Stadium section" className="flex flex-col gap-[var(--space-2)]">
      <SectionLabel variant="action">Delivering to</SectionLabel>
      <div className="flex gap-[var(--space-2)] overflow-x-auto rounded-lg bg-navy-deep p-[var(--space-2)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {SAMPLE_SECTIONS.map((section) => {
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
                }));
              }}
              className={`mono min-h-11 shrink-0 rounded-[7px] px-[var(--space-3)] text-[12.5px] font-bold tracking-tight transition-colors ${
                selected
                  ? "bg-orange text-white"
                  : "bg-navy-2 text-cream/80 hover:bg-navy-soft hover:text-cream"
              }`}
            >
              Section {section}
            </button>
          );
        })}
      </div>
    </section>
  );
}
