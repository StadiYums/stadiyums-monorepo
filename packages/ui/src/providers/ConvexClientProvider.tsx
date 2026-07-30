"use client";

import { ConvexProvider, ConvexReactClient } from "convex/react";
import { type ReactNode, useMemo } from "react";

declare const process: { env: Record<string, string | undefined> };

export function ConvexClientProvider({ children }: { children: ReactNode }) {
  const client = useMemo(() => {
    const url = process.env.NEXT_PUBLIC_CONVEX_URL;
    if (!url) {
      console.warn("NEXT_PUBLIC_CONVEX_URL is not set. Run `npx convex dev` first.");
    }
    return new ConvexReactClient(url ?? "https://placeholder.convex.cloud");
  }, []);

  return <ConvexProvider client={client}>{children}</ConvexProvider>;
}
