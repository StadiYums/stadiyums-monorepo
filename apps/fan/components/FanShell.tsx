import type { ReactNode } from "react";

type FanShellProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
};

/** Mobile-first page chrome shared by fan route placeholders. */
export function FanShell({
  eyebrow = "StadiYums",
  title,
  description,
  children,
}: FanShellProps) {
  return (
    <main className="mx-auto min-h-full w-full max-w-[40rem] px-5 py-8 pb-24">
      <p className="mono text-[11.5px] font-bold uppercase tracking-[0.08em] text-label-muted">
        {eyebrow}
      </p>
      <h1 className="mt-2 font-display text-[1.75rem] leading-tight text-navy sm:text-[2rem]">
        {title}
      </h1>
      {description ? (
        <p className="mt-3 max-w-prose text-sm leading-relaxed text-ink/80">
          {description}
        </p>
      ) : null}
      {children}
    </main>
  );
}
