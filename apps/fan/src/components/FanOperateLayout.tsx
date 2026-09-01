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
        className={`mx-auto w-full flex-1 px-5 pb-[calc(2rem+env(safe-area-inset-bottom))] pt-5 sm:px-6 sm:pt-6 md:pt-8 ${
          width === "wide" ? "max-w-[1240px] lg:px-10" : "max-w-[520px] pb-[calc(6rem+env(safe-area-inset-bottom))]"
        } ${className}`}
      >
        {children}
      </div>
    </div>
  );
}
