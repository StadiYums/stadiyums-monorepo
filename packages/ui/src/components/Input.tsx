import { type InputHTMLAttributes } from "react";
import { Input as UiInput } from "./ui/input";

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
      <UiInput
        className={`${invalid ? "border-orange" : ""} ${className}`}
        {...props}
      />
    </div>
  );
}
