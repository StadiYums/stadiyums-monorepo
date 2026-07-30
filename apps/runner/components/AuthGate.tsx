"use client";

import { useEffect, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useRunner } from "../providers/RunnerProvider";

const PUBLIC_PATHS = new Set(["/login"]);

/**
 * Client auth gate for scaffold: unauthenticated users go to /login;
 * authenticated users without a zone go to /check-in.
 */
export function AuthGate({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated, zone } = useRunner();

  useEffect(() => {
    if (!isAuthenticated && !PUBLIC_PATHS.has(pathname)) {
      router.replace("/login");
      return;
    }
    if (isAuthenticated && pathname === "/login") {
      router.replace(zone ? "/" : "/check-in");
      return;
    }
    if (isAuthenticated && !zone && pathname !== "/check-in") {
      router.replace("/check-in");
    }
  }, [isAuthenticated, pathname, router, zone]);

  if (!isAuthenticated && !PUBLIC_PATHS.has(pathname)) {
    return (
      <div className="flex min-h-full items-center justify-center px-5 py-16">
        <p className="mono text-sm font-bold uppercase tracking-[0.08em] text-navy">
          Checking session…
        </p>
      </div>
    );
  }

  if (isAuthenticated && !zone && pathname !== "/check-in") {
    return (
      <div className="flex min-h-full items-center justify-center px-5 py-16">
        <p className="mono text-sm font-bold uppercase tracking-[0.08em] text-navy">
          Opening check-in…
        </p>
      </div>
    );
  }

  return <>{children}</>;
}
