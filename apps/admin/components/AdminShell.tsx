import type { ReactNode } from "react";

type AdminShellProps = {
  title: string;
  description?: string;
  children?: ReactNode;
};

/** Wide ops content frame — same tokens, denser layout (HEX-174). */
export function AdminShell({ title, description, children }: AdminShellProps) {
  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-8 lg:px-10">
      <h1 className="font-display text-[1.75rem] leading-tight text-navy md:text-[1.875rem]">
        {title}
      </h1>
      {description ? (
        <p className="mt-2 max-w-3xl text-[13px] leading-relaxed text-label-muted">
          {description}
        </p>
      ) : null}
      {children}
    </main>
  );
}
