import { type InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  invalid?: boolean;
};

export function Input({
  label,
  invalid = false,
  className = "",
  ...props
}: InputProps) {
  return (
    <div>
      <label className="mono mb-1.5 block text-[11.5px] font-bold uppercase tracking-[0.04em] text-label-muted">
        {label}
      </label>
      <input
        className={`mono min-h-11 w-full rounded-[10px] border bg-input-bg px-3 py-3 text-[15px] font-bold text-navy placeholder:font-normal placeholder:text-placeholder focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus-ring)] ${
          invalid ? "border-orange" : "border-line"
        } ${className}`}
        {...props}
      />
    </div>
  );
}
