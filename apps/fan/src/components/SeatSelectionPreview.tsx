type SeatSelectionPreviewProps = {
  aisle: string;
  seat: string;
  section: string;
};

function valueOrDash(value: string) {
  return value.trim() || "—";
}

/** A live stadium-seat silhouette that turns form values into a destination. */
export function SeatSelectionPreview({
  aisle,
  seat,
  section,
}: SeatSelectionPreviewProps) {
  const sectionValue = valueOrDash(section);
  const aisleValue = valueOrDash(aisle);
  const seatValue = valueOrDash(seat);

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label={`Selected seat: Section ${sectionValue}, Row ${aisleValue}, Seat ${seatValue}`}
      className="block"
    >
      <div className="mx-auto max-w-[320px] pt-[var(--space-2)]">
        <div className="rounded-t-[2rem] border border-navy bg-navy px-[var(--space-6)] pb-[var(--space-5)] pt-[var(--space-6)] text-cream">
          <p className="mono text-[10px] font-bold uppercase tracking-[0.12em] text-orange">
            Section
          </p>
          <p className="mono mt-[var(--space-1)] text-[clamp(2rem,9vw,3rem)] font-bold leading-none tracking-[-0.06em]">
            {sectionValue}
          </p>
        </div>
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-b-[1.5rem] border border-orange bg-orange text-cream">
          <div className="bg-orange px-[var(--space-5)] py-[var(--space-3)]">
            <p className="mono text-[9px] font-bold uppercase tracking-[0.1em] text-cream/75">Row</p>
            <p className="mono mt-[var(--space-1)] text-xl font-bold leading-none">{aisleValue}</p>
          </div>
          <div className="bg-orange px-[var(--space-5)] py-[var(--space-3)]">
            <p className="mono text-[9px] font-bold uppercase tracking-[0.1em] text-cream/75">Seat</p>
            <p className="mono mt-[var(--space-1)] text-xl font-bold leading-none">{seatValue}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
