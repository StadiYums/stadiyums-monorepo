import type { ReactNode } from "react";

type SeatPreviewBlockProps = {
  aisle: string;
  seat: string;
  section?: string;
  icon?: ReactNode;
  className?: string;
};

export function SeatPreviewBlock({
  aisle,
  seat,
  section,
  icon = "📍",
  className = "",
}: SeatPreviewBlockProps) {
  const location =
    section && section.trim()
      ? `Section ${section}, Row ${aisle || "—"}, Seat ${seat || "—"}`
      : `Aisle ${aisle || "—"}, Seat ${seat || "—"}`;

  return (
    <div
      className={`flex items-center gap-3 rounded-md bg-navy px-4 py-3.5 text-sm font-bold text-cream ${className}`}
    >
      <span className="text-orange" aria-hidden="true">
        {icon}
      </span>
      <p className="mono m-0 leading-snug">
        We&apos;ll deliver straight to {location}.
      </p>
    </div>
  );
}
