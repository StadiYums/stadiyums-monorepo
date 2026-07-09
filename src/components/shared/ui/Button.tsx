import { type ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "advance";
};

export function Button({
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  const base =
    "cursor-pointer border-none font-body text-sm font-bold transition-colors duration-150 disabled:cursor-default";

  const variants = {
    primary:
      "rounded-sm bg-surface-white px-[22px] py-3 text-orange-dim hover:bg-cream disabled:bg-[var(--disabled-bg)] disabled:text-placeholder",
    secondary:
      "rounded-sm bg-navy px-4 py-3.5 text-cream hover:opacity-90 disabled:bg-[var(--disabled-bg)] disabled:text-placeholder",
    advance:
      "rounded-sm bg-navy px-4 py-2.5 text-[13px] text-cream whitespace-nowrap hover:opacity-90 disabled:bg-[var(--disabled-bg)] disabled:text-placeholder",
  };

  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props} />
  );
}
