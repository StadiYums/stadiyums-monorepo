"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { href: "/", label: "Queue" },
  { href: "/active", label: "Active" },
  { href: "/shift", label: "Shift" },
] as const;

/** Bottom nav for authenticated runner routes (Queue / Active / Shift). */
export function RunnerNav() {
  const pathname = usePathname();

  if (pathname === "/login" || pathname === "/check-in") {
    return null;
  }

  return (
    <nav
      aria-label="Runner"
      className="fixed inset-x-0 bottom-0 z-40 border-t-2 border-navy bg-cream"
    >
      <ul className="mx-auto flex max-w-[40rem] items-stretch">
        {NAV_ITEMS.map((item) => {
          const active =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);
          return (
            <li key={item.href} className="flex-1">
              <Link
                href={item.href}
                className={`flex min-h-14 items-center justify-center px-2 text-center text-sm font-bold uppercase tracking-[0.06em] ${
                  active
                    ? "bg-navy text-cream"
                    : "bg-cream text-navy hover:bg-navy/10"
                }`}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
