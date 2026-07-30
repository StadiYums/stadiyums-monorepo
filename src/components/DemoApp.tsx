"use client";

import { useEffect, useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Header } from "@/components/layout/Header";
import { TabSwitcher } from "@/components/layout/TabSwitcher";
import { RunnerView } from "@/components/runner/RunnerView";
import { VendorToggle } from "@/components/shared/VendorToggle";
import { ConvexOfflineBanner } from "@/components/shared/ConvexOfflineBanner";
import { useTheme } from "@/providers/ThemeProvider";
import { useDemo } from "@/providers/DemoProvider";

/** Fan tab moved to apps/fan (HEX-147) — this legacy demo now only renders runner. */
function FanMigratedNotice() {
  return (
    <div className="mono rounded-md border border-line bg-surface-white p-5 text-sm text-label-muted">
      The fan demo now lives in <b>apps/fan</b>. Run{" "}
      <code className="rounded bg-cream px-1.5 py-0.5">pnpm dev:fan</code> to view it.
    </div>
  );
}

export function DemoApp() {
  const { activeTab } = useDemo();
  const { theme } = useTheme();
  const ensureSeeded = useMutation(api.demo.ensureSeeded);
  const [backendOffline, setBackendOffline] = useState(false);

  useEffect(() => {
    void ensureSeeded()
      .then(() => setBackendOffline(false))
      .catch(() => setBackendOffline(true));
  }, [ensureSeeded]);

  return (
    <>
      {backendOffline && <ConvexOfflineBanner />}
      <Header />
      <div className="mx-auto max-w-[880px] px-5">
        <TabSwitcher />
      </div>
      <main className="mx-auto max-w-[880px] px-5 pb-20 pt-2">
        {activeTab === "fan" ? <FanMigratedNotice /> : <RunnerView />}
      </main>
      {theme.showPoweredBy && (
        <footer className="mono px-5 pb-6 pt-3.5 text-center text-[11px] font-bold uppercase tracking-[0.08em] text-label-muted">
          Powered by <span className="text-navy/70">StadiYums</span>
        </footer>
      )}
      <VendorToggle />
    </>
  );
}
