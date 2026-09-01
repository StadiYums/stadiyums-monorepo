"use client";

import { useEffect, useState, type ReactNode } from "react";
import { BrandHeader, DEMO_VENUE_CONTEXT } from "@stadiyums/ui";
import { useRunner } from "../providers/RunnerProvider";

type RunnerShellProps = {
  title: string;
  description?: string;
  children?: ReactNode;
};

/** Stadium-native runner chrome — BrandHeader + zone/runner context. */
export function RunnerShell({ title, description, children }: RunnerShellProps) {
  const { employeeId, zone, isAvailable } = useRunner();
  const [isOnline, setIsOnline] = useState(() =>
    typeof window === "undefined" ? true : window.navigator.onLine,
  );

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const context = zone
    ? `${DEMO_VENUE_CONTEXT} · ${zone.label}`
    : DEMO_VENUE_CONTEXT;

  const onlineBadge = (
    <span
      className={`mono inline-flex min-h-9 items-center gap-2 rounded-pill border px-3 text-[10px] font-bold uppercase tracking-[0.06em] ${
        isOnline
          ? "border-green/30 bg-green/10 text-green"
          : "border-orange/40 bg-orange/10 text-orange-dim"
      }`}
      aria-live="polite"
    >
      <span className="h-2 w-2 rounded-full bg-current" aria-hidden="true" />
      {isOnline ? "Connected" : "Offline"}
    </span>
  );

  return (
    <>
      <BrandHeader context={context} trailing={onlineBadge} />
      <main className="mx-auto min-h-full w-full max-w-[520px] px-[var(--space-page-inline)] pb-[var(--space-page-block-with-dock)] pt-[var(--space-page-block)]">
        {employeeId ? (
          <div className="mb-5 flex items-center justify-between gap-3 rounded-lg border border-line bg-surface-white px-4 py-3">
            <div className="min-w-0">
              <p className="mono truncate text-[12px] font-bold text-navy">
                Runner {employeeId}
              </p>
              <p className="mt-1 truncate text-[13px] font-medium text-label-muted">
                {zone?.label ?? "Zone pending"}
              </p>
            </div>
            <span
              className={`mono shrink-0 rounded-pill px-3 py-2 text-[10px] font-bold uppercase tracking-[0.06em] ${
                isAvailable ? "bg-green/10 text-green" : "bg-navy/10 text-navy"
              }`}
            >
              {isAvailable ? "Available" : "On break"}
            </span>
          </div>
        ) : null}
        <h1 className="font-display text-[1.875rem] leading-none text-navy sm:text-[2rem]">
          {title}
        </h1>
        {description ? (
          <p className="mt-2 max-w-prose text-[15px] font-semibold leading-snug text-ink">
            {description}
          </p>
        ) : null}
        {children}
      </main>
    </>
  );
}
