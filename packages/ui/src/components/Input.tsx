import { type InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  invalid?: boolean;
};

export function Input({ label, invalid = false, className = "", ...props }: InputProps) {
  return (
    <div>
      <label className="mono mb-1.5 block text-[11.5px] uppercase tracking-[0.04em] text-label-muted">
        {label}
      </label>
      <input
        className={`mono w-full rounded-sm border-[1.5px] bg-input-bg px-3 py-[13px] text-base font-bold text-navy placeholder:font-normal placeholder:text-placeholder ${
          invalid ? "border-orange" : "border-line"
        } ${className}`}
        {...props}
      />
    </div>
  );
}
