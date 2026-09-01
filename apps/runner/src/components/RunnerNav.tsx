"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { href: "/", label: "Queue", icon: "queue" },
  { href: "/active", label: "Active", icon: "active" },
  { href: "/shift", label: "Shift", icon: "shift" },
] as const;

function NavIcon({ name }: { name: (typeof NAV_ITEMS)[number]["icon"] }) {
  const common = { fill: "none", stroke: "currentColor", strokeWidth: 1.8 };
  if (name === "queue") {
    return <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" {...common}><path d="M4 6.5h16M4 12h16M4 17.5h10" strokeLinecap="round" /></svg>;
  }
  if (name === "active") {
    return <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" {...common}><path d="m13.5 3-7 10h5l-1 8 7-10h-5l1-8Z" strokeLinejoin="round" /></svg>;
  }
  return <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" {...common}><circle cx="12" cy="12" r="8.5" /><path d="M12 7v5l3 2" strokeLinecap="round" /></svg>;
}

/** Bounded bottom nav for authenticated runner routes. */
export function RunnerNav() {
  const pathname = usePathname();

  if (pathname === "/login" || pathname === "/check-in") {
    return null;
  }

  return (
    <nav aria-label="Runner" className="pointer-events-none fixed inset-x-0 bottom-0 z-40 px-3 pb-[env(safe-area-inset-bottom)]">
      <ul className="pointer-events-auto mx-auto flex max-w-[520px] items-stretch overflow-hidden rounded-t-xl border-2 border-b-0 border-navy bg-cream">
        {NAV_ITEMS.map((item) => {
          const active =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);
          return (
            <li key={item.href} className="flex-1">
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`flex min-h-16 flex-1 flex-col items-center justify-center gap-1 border-t-2 px-2 text-center text-[11px] font-bold uppercase tracking-[0.06em] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-orange ${
                  active
                    ? "border-orange bg-navy text-cream"
                    : "border-transparent bg-cream text-navy hover:bg-navy/10"
                }`}
                >
                  <NavIcon name={item.icon} />
                  {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
