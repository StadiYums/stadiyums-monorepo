"use client";

import { useEffect, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAdmin } from "../providers/AdminProvider";

const PUBLIC_PATHS = new Set(["/login"]);

/** Placeholder auth gate — real admin auth lands in a later ticket. */
export function AuthGate({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated } = useAdmin();

  useEffect(() => {
    if (!isAuthenticated && !PUBLIC_PATHS.has(pathname)) {
      router.replace("/login");
      return;
    }
    if (isAuthenticated && pathname === "/login") {
      router.replace("/");
    }
  }, [isAuthenticated, pathname, router]);

  if (!isAuthenticated && !PUBLIC_PATHS.has(pathname)) {
    return (
      <div className="flex min-h-full flex-1 items-center justify-center px-6 py-16">
        <p className="mono text-sm font-bold uppercase tracking-[0.08em] text-navy">
          Checking session…
        </p>
      </div>
    );
  }

  return <>{children}</>;
}
