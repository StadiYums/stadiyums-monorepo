export type OrderStep = {
  key: string;
  label: string;
};

type OrderStepperProps = {
  steps: readonly OrderStep[];
  currentIndex: number;
  className?: string;
};

export function OrderStepper({ steps, currentIndex, className = "" }: OrderStepperProps) {
  return (
    <div className={`flex ${className}`}>
      {steps.map((step, index) => {
        const done = index < currentIndex;
        const current = index === currentIndex;
        return (
          <div key={step.key} className="relative flex-1 text-center">
            {index > 0 ? (
              <div
                className={`absolute top-[17px] left-[-50%] z-[1] h-[3px] w-full ${
                  done ? "bg-green" : "bg-[var(--step-inactive)]"
                }`}
                aria-hidden="true"
              />
            ) : null}
            <div
              className={`relative z-[2] mx-auto mb-2.5 flex h-[34px] w-[34px] items-center justify-center rounded-full text-sm font-bold transition-colors duration-300 ${
                done
                  ? "bg-green text-white"
                  : current
                    ? "bg-orange text-white shadow-[0_0_0_5px_var(--accent-ring)]"
                    : "bg-[var(--step-inactive)] text-[var(--step-inactive-text)]"
              }`}
            >
              {index <= currentIndex ? "✓" : index + 1}
            </div>
            <span className="mono text-[11px] font-bold uppercase tracking-[0.03em] text-label-muted">
              {step.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
