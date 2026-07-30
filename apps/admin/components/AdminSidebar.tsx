"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAdmin } from "../providers/AdminProvider";

const NAV_ITEMS = [
  { href: "/", label: "Dashboard" },
  { href: "/runners", label: "Runners" },
  { href: "/zones", label: "Zones" },
  { href: "/vendors", label: "Vendors" },
  { href: "/settings", label: "Settings" },
] as const;

/** Desktop/tablet sidebar for the five admin sections. */
export function AdminSidebar() {
  const pathname = usePathname();
  const { session, logout } = useAdmin();

  if (pathname === "/login") {
    return null;
  }

  return (
    <aside className="flex w-full flex-col border-b border-line bg-navy text-cream md:min-h-full md:w-56 md:shrink-0 md:border-b-0 md:border-r">
      <div className="px-5 py-5">
        <p className="mono text-[11px] font-bold uppercase tracking-[0.1em] text-cream/70">
          StadiYums Admin
        </p>
        <p className="mt-2 font-display text-lg leading-tight">Ops console</p>
        {session ? (
          <p className="mt-3 text-xs text-cream/80">
            {session.role} · {session.stadiumId}
          </p>
        ) : null}
      </div>
      <nav aria-label="Admin" className="flex-1 px-3 pb-4">
        <ul className="flex gap-1 overflow-x-auto md:flex-col md:gap-1">
          {NAV_ITEMS.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <li key={item.href} className="shrink-0">
                <Link
                  href={item.href}
                  className={`block rounded-sm px-3 py-2.5 text-sm font-semibold ${
                    active
                      ? "bg-cream text-navy"
                      : "text-cream/90 hover:bg-cream/10"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      {session ? (
        <div className="border-t border-cream/15 px-5 py-4">
          <p className="truncate text-xs text-cream/75">{session.email}</p>
          <button
            type="button"
            onClick={logout}
            className="mt-2 text-left text-sm font-semibold text-cream underline-offset-2 hover:underline"
          >
            Sign out
          </button>
        </div>
      ) : null}
    </aside>
  );
}
