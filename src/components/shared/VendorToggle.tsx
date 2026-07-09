"use client";

import { useCartCount } from "@/components/fan/CartBar";
import { useTheme } from "@/providers/ThemeProvider";
import { useDemo } from "@/providers/DemoProvider";

export function VendorToggle() {
  const { themeId, toggleVendorMode } = useTheme();
  const { activeTab } = useDemo();
  const cartCount = useCartCount();

  const aboveCart = activeTab === "fan" && cartCount > 0;

  return (
    <button
      type="button"
      onClick={toggleVendorMode}
      className={`mono fixed left-4 z-50 rounded-pill border border-cream/15 bg-navy px-3.5 py-2 text-[10.5px] font-bold uppercase tracking-[0.06em] text-cream/55 transition-all duration-[250ms] ease-out hover:border-cream/35 hover:text-cream ${
        aboveCart ? "bottom-[88px]" : "bottom-4"
      }`}
    >
      {themeId === "grizzly" ? "Exit Grizzlies" : "Grizzlies mode"}
    </button>
  );
}
