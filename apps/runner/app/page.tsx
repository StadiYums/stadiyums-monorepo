"use client";

import { ORDER_STATUSES } from "@stadiyums/types";
import { Button, Card, SectionLabel } from "@stadiyums/ui";
import { RunnerShell } from "../components/RunnerShell";
import { useRunner } from "../providers/RunnerProvider";

export default function QueuePage() {
  const { employeeId, zone, isAvailable, setAvailable } = useRunner();

  return (
    <RunnerShell
      title="Queue"
      description="Ready-order matching UI migrates here in HEX-148. This is the dispatch shell only."
    >
      <Card className="mt-8 border-2 border-navy">
        <SectionLabel>On shift</SectionLabel>
        <p className="mt-3 text-base font-semibold text-ink">
          {employeeId} · {zone?.label ?? "No zone"}
        </p>
        <Button
          className="mt-5 w-full min-h-14 text-base"
          type="button"
          variant={isAvailable ? "secondary" : "advance"}
          onClick={() => setAvailable(!isAvailable)}
        >
          {isAvailable ? "Go inactive" : "Go active"}
        </Button>
      </Card>

      <Card className="mt-4 border-2 border-navy">
        <SectionLabel>Ready orders</SectionLabel>
        <p className="mt-3 text-base font-medium text-ink">
          {isAvailable
            ? "No claims yet — OrderQueue lands in HEX-148."
            : "You are inactive. Toggle active to receive matches."}
        </p>
        <p className="mt-3 mono text-[11.5px] font-bold uppercase tracking-[0.08em] text-label-muted">
          Status keys · {ORDER_STATUSES.length}
        </p>
      </Card>
    </RunnerShell>
  );
}
