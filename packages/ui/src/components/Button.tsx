import { type ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "advance" | "icon" | "destructive";
};

const variants = {
  primary:
    "rounded-[10px] bg-navy px-5 text-cream hover:bg-navy-2 active:bg-navy-soft disabled:bg-[var(--disabled-bg)] disabled:text-placeholder",
  secondary:
    "rounded-[10px] border border-line bg-surface-white px-5 text-navy hover:bg-cream active:bg-line/40 disabled:bg-[var(--disabled-bg)] disabled:text-placeholder",
  advance:
    "rounded-[10px] bg-orange px-4 text-[13px] text-cream whitespace-nowrap hover:bg-orange-2 active:bg-orange-dim disabled:bg-[var(--disabled-bg)] disabled:text-placeholder",
  icon: "inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-navy p-0 text-cream hover:bg-navy-2 active:bg-navy-soft disabled:bg-[var(--disabled-bg)] disabled:text-placeholder",
  destructive:
    "rounded-[10px] bg-orange-dim px-5 text-cream hover:bg-orange active:bg-orange-dim disabled:bg-[var(--disabled-bg)] disabled:text-placeholder",
} as const;

/**
 * Shared controls — 44px min target, orange reserved for emphasis/conversion.
 */
export function Button({
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  const base =
    "inline-flex min-h-11 cursor-pointer items-center justify-center border-none font-body text-sm font-bold transition-colors duration-150 disabled:cursor-default focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus-ring)]";

  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props} />
  );
}
