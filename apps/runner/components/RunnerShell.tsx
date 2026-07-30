import type { ReactNode } from "react";

type RunnerShellProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
};

/** Outdoor-readable runner chrome — ~520px, large hierarchy (HEX-174). */
export function RunnerShell({
  eyebrow = "Runner",
  title,
  description,
  children,
}: RunnerShellProps) {
  return (
    <main className="mx-auto min-h-full w-full max-w-[520px] px-4 pb-[calc(7rem+env(safe-area-inset-bottom))] pt-[max(1.5rem,env(safe-area-inset-top))]">
      <p className="mono text-[12px] font-bold uppercase tracking-[0.1em] text-navy">
        {eyebrow}
      </p>
      <h1 className="mt-2 font-display text-[1.875rem] leading-none text-navy sm:text-[2rem]">
        {title}
      </h1>
      {description ? (
        <p className="mt-2 max-w-prose text-[15px] font-semibold leading-snug text-ink">
          {description}
        </p>
      ) : null}
      {children}
    </main>
  );
}
