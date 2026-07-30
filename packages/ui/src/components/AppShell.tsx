import type { ReactNode } from "react";

type AppShellProps = {
  /** Fan/runner: ~520px. Ops dashboards: wider. */
  width?: "mobile" | "wide";
  children: ReactNode;
  className?: string;
};

/**
 * Cream surround + white surface frame.
 * Mobile apps center at ~520px; ops use wide.
 */
export function AppShell({
  width = "mobile",
  children,
  className = "",
}: AppShellProps) {
  const max =
    width === "mobile" ? "max-w-[520px]" : "max-w-6xl";

  return (
    <div className={`min-h-full bg-cream ${className}`}>
      <div
        className={`mx-auto min-h-full w-full bg-surface-white shadow-[0_0_0_1px_var(--line)] ${max}`}
      >
        {children}
      </div>
    </div>
  );
}
