import type { ReactNode } from "react";
import {
  BrandHeader,
  DEMO_TAGLINE,
  DEMO_VENUE_CONTEXT,
} from "@stadiyums/ui";

type FanOperateLayoutProps = {
  children: ReactNode;
  className?: string;
};

export function FanOperateLayout({ children, className = "" }: FanOperateLayoutProps) {
  return (
    <>
      <BrandHeader context={DEMO_VENUE_CONTEXT} tagline={DEMO_TAGLINE} />
      <div
        className={`px-4 pb-[calc(6rem+env(safe-area-inset-bottom))] pt-5 ${className}`}
      >
        {children}
      </div>
    </>
  );
}
