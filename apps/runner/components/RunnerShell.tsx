import type { ReactNode } from "react";

type RunnerShellProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
};

/** High-contrast outdoor-readable chrome for runner routes. */
export function RunnerShell({
  eyebrow = "Runner",
  title,
  description,
  children,
}: RunnerShellProps) {
  return (
    <main className="mx-auto min-h-full w-full max-w-[40rem] px-5 pb-28 pt-8">
      <p className="mono text-[12px] font-bold uppercase tracking-[0.1em] text-navy">
        {eyebrow}
      </p>
      <h1 className="mt-2 font-display text-[2rem] leading-none text-navy sm:text-[2.25rem]">
        {title}
      </h1>
      {description ? (
        <p className="mt-3 max-w-prose text-base font-medium leading-snug text-ink">
          {description}
        </p>
      ) : null}
      {children}
    </main>
  );
}
