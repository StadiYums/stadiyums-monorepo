import type { ReactNode } from "react";

type BrandHeaderProps = {
  title?: string;
  context?: string;
  tagline?: string;
  trailing?: ReactNode;
  logoSrc?: string;
  logoAlt?: string;
};

/** Deep navy brand block — venue context and optional tagline chip. */
export function BrandHeader({
  title = "StadiYums",
  context,
  tagline,
  trailing,
  logoSrc,
  logoAlt = "",
}: BrandHeaderProps) {
  return (
    <header className="stadiyums-brand-header bg-navy text-cream">
      <div className="mx-auto flex w-full max-w-[520px] items-start justify-between gap-3 md:max-w-6xl">
        <div className="flex min-w-0 items-center gap-3">
          {logoSrc ? (
            <img
              src={logoSrc}
              alt={logoAlt}
              className="h-10 w-10 shrink-0 rounded-full border border-cream/20"
            />
          ) : null}
          <div>
            <p className="font-display text-lg leading-none tracking-tight">{title}</p>
            {context ? (
              <p className="mono mt-2 text-[11px] font-bold uppercase tracking-[0.1em] text-cream/70">
                {context}
              </p>
            ) : null}
          </div>
        </div>
        {tagline ? (
          <span className="mono shrink-0 rounded-pill border border-accent-border px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.06em] text-orange">
            {tagline}
          </span>
        ) : (
          trailing
        )}
      </div>
    </header>
  );
}
