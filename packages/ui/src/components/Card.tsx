import { type HTMLAttributes, type ReactNode } from "react";
import { Card as UiCard } from "./ui/card";

type CardVariant = "default" | "menu" | "workflow" | "metric" | "alert";

const VARIANT_CLASS: Record<CardVariant, string> = {
  default: "",
  menu: "gap-3",
  workflow: "border-navy/20",
  metric: "bg-cream/40",
  alert: "border-orange/40 bg-accent-tint-10",
};

type CardProps = HTMLAttributes<HTMLDivElement> & {
  variant?: CardVariant;
};

/** Warm bordered surface — shadcn Card with stadium variants. */
export function Card({
  className = "",
  variant = "default",
  ...props
}: CardProps) {
  return (
    <UiCard className={`${VARIANT_CLASS[variant]} ${className}`} {...props} />
  );
}

/** Uppercase section divider — muted or orange action label. */
export function SectionLabel({
  children,
  variant = "default",
}: {
  children: ReactNode;
  variant?: "default" | "action";
}) {
  const color = variant === "action" ? "text-orange" : "text-label-muted";
  return (
    <p
      className={`mono mb-2.5 text-[11.5px] font-bold uppercase tracking-[0.08em] ${color}`}
    >
      {children}
    </p>
  );
}
