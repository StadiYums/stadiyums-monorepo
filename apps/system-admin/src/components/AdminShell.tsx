import type { ReactNode } from "react";

type AdminShellProps = {
  title: string;
  description?: string;
  children?: ReactNode;
};

/** Content frame inside the shared full-viewport operational workspace. */
export function AdminShell({ title, description, children }: AdminShellProps) {
  return (
    <section className="w-full">
      <h1 className="font-display text-[1.75rem] leading-tight text-navy md:text-[1.875rem]">
        {title}
      </h1>
      {description ? (
        <p className="mt-2 max-w-3xl text-[13px] leading-relaxed text-label-muted">
          {description}
        </p>
      ) : null}
      {children}
    </section>
  );
}
