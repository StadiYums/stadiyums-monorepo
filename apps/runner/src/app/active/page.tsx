"use client";

import { Card, SectionLabel } from "@stadiyums/ui";
import { RunnerShell } from "../../components/RunnerShell";

export default function ActivePage() {
  return (
    <RunnerShell
      title="Active"
      description="Keep your next handoff visible while you move through the bowl."
    >
      <Card className="mt-8 border-2 border-navy">
        <SectionLabel>Current order</SectionLabel>
        <p className="mt-3 text-base font-medium text-ink">
          No active delivery right now. Your next claimed order will appear here with its handoff steps.
        </p>
      </Card>
    </RunnerShell>
  );
}
