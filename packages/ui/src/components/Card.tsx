import { type HTMLAttributes, type ReactNode } from "react";

export function Card({ className = "", ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`rounded-xl border border-line bg-surface-white p-[22px] text-ink ${className}`}
      {...props}
    />
  );
}

export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p className="mono mb-2.5 text-[11.5px] font-bold uppercase tracking-[0.08em] text-orange">
      {children}
    </p>
  );
}
