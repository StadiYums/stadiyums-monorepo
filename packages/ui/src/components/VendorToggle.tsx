"use client";

import { useTheme } from "../providers/ThemeProvider";

type VendorToggleProps = {
  /** Lift above a bottom cart bar when true (fan app). */
  elevate?: boolean;
};

/**
 * Theme switcher for fan, system-admin, and vendor. Do not mount in the runner app.
 */
export function VendorToggle({ elevate = false }: VendorToggleProps) {
  const { themeId, toggleVendorMode } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleVendorMode}
      className={`mono fixed left-4 z-50 rounded-pill border border-cream/15 bg-navy px-3.5 py-2 text-[10.5px] font-bold uppercase tracking-[0.06em] text-cream/55 transition-all duration-[250ms] ease-out hover:border-cream/35 hover:text-cream ${
        elevate ? "bottom-[88px]" : "bottom-4"
      }`}
    >
      {themeId === "grizzly" ? "Exit Grizzlies" : "Grizzlies mode"}
    </button>
  );
}
