const APPS = [
  {
    name: "Fan",
    port: 3000,
    href: "http://localhost:3000",
    blurb: "Seat setup, menu, cart, live order tracker",
    filter: "@stadiyums/fan",
  },
  {
    name: "Runner",
    port: 3001,
    href: "http://localhost:3001",
    blurb: "Queue, active delivery, shift stats",
    filter: "@stadiyums/runner",
  },
  {
    name: "System admin",
    port: 3002,
    href: "http://localhost:3002",
    blurb: "Stadium ops console scaffold",
    filter: "@stadiyums/system-admin",
  },
  {
    name: "Vendor",
    port: 3004,
    href: "http://localhost:3004",
    blurb: "Menus, runners, readiness, order desk, and reporting",
    filter: "@stadiyums/vendor",
  },
] as const;

export default function LandingPage() {
  return (
    <main className="mx-auto flex min-h-full w-full max-w-3xl flex-col justify-center px-6 py-16">
      <p className="mono text-[12px] font-bold uppercase tracking-[0.1em] text-navy">
        StadiYums monorepo
      </p>
      <h1 className="mt-3 font-display text-[2.5rem] leading-none text-navy sm:text-[3rem]">
        StadiYums
      </h1>
      <p className="mt-4 max-w-xl text-base font-medium leading-snug text-ink">
        The unified DemoApp tab switcher is gone. Run each product surface as its
        own app — fan, runner, system admin, and vendor share one Convex backend.
      </p>

      <ul className="mt-10 space-y-4">
        {APPS.map((app) => (
          <li key={app.port}>
            <a
              href={app.href}
              className="block rounded-md border-2 border-navy bg-surface-white px-5 py-4 transition-colors hover:bg-navy hover:text-cream focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <span className="font-display text-2xl leading-none">{app.name}</span>
                <span className="mono text-[12px] font-bold uppercase tracking-[0.06em] opacity-80">
                  :{app.port}
                </span>
              </div>
              <p className="mt-2 text-sm font-medium opacity-90">{app.blurb}</p>
              <p className="mono mt-2 text-[11px] font-bold opacity-70">
                pnpm --filter {app.filter} dev
              </p>
            </a>
          </li>
        ))}
      </ul>

      <p className="mono mt-10 text-[11px] font-bold uppercase tracking-[0.08em] text-label-muted">
        Start all apps · <span className="text-navy">pnpm dev</span> · Convex ·{" "}
        <span className="text-navy">npx convex dev</span>
      </p>
    </main>
  );
}
