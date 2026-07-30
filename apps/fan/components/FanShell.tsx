import type { ReactNode } from "react";

type FanShellProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
};

/** Mobile-first fan chrome — ~520px content width (HEX-174). */
export function FanShell({
  eyebrow = "StadiYums",
  title,
  description,
  children,
}: FanShellProps) {
  return (
    <main className="mx-auto min-h-full w-full max-w-[520px] px-4 pb-[calc(6rem+env(safe-area-inset-bottom))] pt-[max(1.5rem,env(safe-area-inset-top))]">
      <p className="mono text-[11.5px] font-bold uppercase tracking-[0.08em] text-label-muted">
        {eyebrow}
      </p>
      <h1 className="mt-2 font-display text-[1.75rem] leading-tight text-navy sm:text-[1.875rem]">
        {title}
      </h1>
      {description ? (
        <p className="mt-2 max-w-prose text-[13px] leading-relaxed text-label-muted">
          {description}
        </p>
      ) : null}
      {children}
    </main>
  );
}
