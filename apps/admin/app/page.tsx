"use client";

import { Card, SectionLabel } from "@stadiyums/ui";
import { AdminShell } from "../components/AdminShell";

export default function DashboardPage() {
  return (
    <AdminShell
      title="Dispatch dashboard"
      description="Live orders and runner statuses are read-only placeholders until A1 ops tickets land."
    >
      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        <Card>
          <SectionLabel>Active orders</SectionLabel>
          <p className="mt-3 text-sm text-ink/80">
            No live feed wired yet. This panel will list all open orders across vendors.
          </p>
          <p className="mt-4 mono text-[11.5px] font-bold uppercase tracking-[0.08em] text-label-muted">
            Open · 0
          </p>
        </Card>
        <Card>
          <SectionLabel>Runners</SectionLabel>
          <p className="mt-3 text-sm text-ink/80">
            On-shift runner roster and availability will stream here.
          </p>
          <p className="mt-4 mono text-[11.5px] font-bold uppercase tracking-[0.08em] text-label-muted">
            Active · 0
          </p>
        </Card>
      </div>
    </AdminShell>
  );
}
