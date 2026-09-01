"use client";

import { useEffect, useState, type ReactNode } from "react";
import { useRunner } from "../providers/RunnerProvider";

type RunnerShellProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
};

/** Stadium-native runner chrome — ~520px, direct-sun readable and one-hand friendly. */
export function RunnerShell({
  eyebrow = "Runner",
  title,
  description,
  children,
}: RunnerShellProps) {
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

  return (
    <main className="mx-auto min-h-full w-full max-w-[520px] px-4 pb-[calc(6.5rem+env(safe-area-inset-bottom))] pt-[max(1rem,env(safe-area-inset-top))]">
      <header className="border-b border-line pb-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="mono text-[11px] font-bold uppercase tracking-[0.1em] text-orange-dim">
              {eyebrow}
            </p>
            <p className="mt-1 font-display text-lg leading-none text-navy">StadiYums</p>
          </div>
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
        </div>
        {employeeId ? (
          <div className="mt-4 flex items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="mono truncate text-[12px] font-bold text-navy">Runner {employeeId}</p>
              <p className="mt-1 truncate text-[13px] font-medium text-label-muted">
                Grizzlies · {zone?.label ?? "Zone pending"}
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
      </header>
      <div className="pt-5">
        <h1 className="font-display text-[1.875rem] leading-none text-navy sm:text-[2rem]">
          {title}
        </h1>
        {description ? (
          <p className="mt-2 max-w-prose text-[15px] font-semibold leading-snug text-ink">
            {description}
          </p>
        ) : null}
        {children}
      </div>
    </main>
  );
}
