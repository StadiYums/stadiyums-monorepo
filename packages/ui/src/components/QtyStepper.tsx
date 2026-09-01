type QtyStepperProps = {
  value: number;
  min?: number;
  max?: number;
  onChange: (next: number) => void;
  className?: string;
};

export function QtyStepper({
  value,
  min = 0,
  max,
  onChange,
  className = "",
}: QtyStepperProps) {
  const atMin = value <= min;

  return (
    <div className={`flex items-center justify-between gap-2.5 ${className}`}>
      <button
        type="button"
        disabled={atMin}
        onClick={() => onChange(Math.max(min, value - 1))}
        className="flex h-[30px] w-[30px] items-center justify-center rounded-full border-[1.5px] border-line bg-cream text-base font-bold text-navy disabled:cursor-default disabled:opacity-30"
        aria-label="Decrease quantity"
      >
        −
      </button>
      <span className="mono min-w-4 text-center text-sm font-bold">{value}</span>
      <button
        type="button"
        disabled={max !== undefined && value >= max}
        onClick={() => onChange(max !== undefined ? Math.min(max, value + 1) : value + 1)}
        className="flex h-[30px] w-[30px] items-center justify-center rounded-full border-[1.5px] border-line bg-cream text-base font-bold text-navy disabled:cursor-default disabled:opacity-30"
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
}
