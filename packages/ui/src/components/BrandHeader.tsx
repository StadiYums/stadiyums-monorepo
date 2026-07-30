import type { ReactNode } from "react";

type BrandHeaderProps = {
  title?: string;
  context?: string;
  trailing?: ReactNode;
};

/** Deep navy brand block — orange reserved for active nav elsewhere. */
export function BrandHeader({
  title = "StadiYums",
  context,
  trailing,
}: BrandHeaderProps) {
  return (
    <header className="bg-navy px-4 py-4 text-cream safe-area-pad">
      <div className="mx-auto flex w-full max-w-[520px] items-start justify-between gap-3 md:max-w-6xl">
        <div>
          <p className="font-display text-lg leading-none tracking-tight">{title}</p>
          {context ? (
            <p className="mono mt-2 text-[11px] font-bold uppercase tracking-[0.1em] text-cream/70">
              {context}
            </p>
          ) : null}
        </div>
        {trailing}
      </div>
    </header>
  );
}
