import type { ReactNode } from "react";
import { MapPin } from "lucide-react";

type SeatPreviewBlockProps = {
  aisle: string;
  seat: string;
  section?: string;
  icon?: ReactNode;
  action?: ReactNode;
  className?: string;
};

function formatLocation(section: string | undefined, aisle: string, seat: string) {
  if (section?.trim()) {
    return `Section ${section}, Row ${aisle}, Seat ${seat}`;
  }
  return `Row ${aisle}, Seat ${seat}`;
}

export function SeatPreviewBlock({
  aisle,
  seat,
  section,
  icon = <MapPin aria-hidden="true" strokeWidth={2.5} />,
  action,
  className = "",
}: SeatPreviewBlockProps) {
  const hasSeat = aisle.trim().length > 0 && seat.trim().length > 0;
  if (!hasSeat) {
    return null;
  }

  return (
    <div
      className={`rounded-lg bg-navy px-[var(--space-5)] py-[var(--space-4)] text-cream ${className}`}
    >
      <div className="flex items-start gap-3">
        <span
          className="mt-0.5 grid size-5 shrink-0 place-items-center text-orange [&>svg]:size-4"
          aria-hidden="true"
        >
          {icon}
        </span>
        <div className="min-w-0 flex-1">
          <p className="mono m-0 text-[13px] font-bold leading-snug">
            We&apos;ll deliver straight to {formatLocation(section, aisle, seat)}.
          </p>
          {action ? <div className="mt-2.5">{action}</div> : null}
        </div>
      </div>
    </div>
  );
}
