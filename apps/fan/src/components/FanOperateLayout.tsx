import type { ReactNode } from "react";
import { BrandHeader } from "@stadiyums/ui";

type FanOperateLayoutProps = {
  children: ReactNode;
  className?: string;
  width?: "mobile" | "wide";
  hasFixedDock?: boolean;
};

export function FanOperateLayout({
  children,
  className = "",
  width = "mobile",
  hasFixedDock = false,
}: FanOperateLayoutProps) {
  return (
    <div className="flex min-h-full flex-col bg-cream">
      <BrandHeader logoSrc="/stadiyums-mark.png" logoAlt="StadiYums" />
      <div
        className={`mx-auto w-full flex-1 px-[var(--space-page-inline)] pt-[var(--space-page-block)] ${
          width === "wide"
            ? `max-w-[1240px] ${
                hasFixedDock
                  ? "pb-[var(--space-page-block-with-dock)]"
                  : "pb-[calc(var(--space-page-block)+env(safe-area-inset-bottom))]"
              }`
            : "max-w-[520px] pb-[var(--space-page-block-with-dock)]"
        } ${className}`}
      >
        {children}
      </div>
    </div>
  );
}
