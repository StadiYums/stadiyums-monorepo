import type { ReactNode } from "react";
import { BrandHeader, PLATFORM_HEADER_CONTEXT, PLATFORM_TAGLINE } from "@stadiyums/ui";

type FanOperateLayoutProps = {
  children: ReactNode;
  className?: string;
  width?: "mobile" | "wide";
};

export function FanOperateLayout({
  children,
  className = "",
  width = "mobile",
}: FanOperateLayoutProps) {
  return (
    <div className="flex min-h-full flex-col bg-cream">
      <BrandHeader context={PLATFORM_HEADER_CONTEXT} tagline={PLATFORM_TAGLINE} />
      <div
        className={`mx-auto w-full flex-1 px-[var(--space-page-inline)] pt-[var(--space-page-block)] ${
          width === "wide"
            ? "max-w-[1240px] pb-[calc(var(--space-page-block)+env(safe-area-inset-bottom))]"
            : "max-w-[520px] pb-[var(--space-page-block-with-dock)]"
        } ${className}`}
      >
        {children}
      </div>
    </div>
  );
}
