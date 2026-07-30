"use client";

import { Card, SectionLabel } from "@stadiyums/ui";
import { RunnerShell } from "../../components/RunnerShell";

export default function ActivePage() {
  return (
    <RunnerShell
      title="Active"
      description="Pickup checklist and delivery workflow migrate in later M tickets. Placeholder confirms the route."
    >
      <Card className="mt-8 border-2 border-navy">
        <SectionLabel>Current order</SectionLabel>
        <p className="mt-3 text-base font-medium text-ink">
          No active order. Advance one from Queue when you are available.
        </p>
      </Card>
    </RunnerShell>
  );
}
