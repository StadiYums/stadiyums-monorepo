"use client";

import { Button, Card, SectionLabel } from "@stadiyums/ui";
import { OrderQueue } from "../components/OrderQueue";
import { RunnerShell } from "../components/RunnerShell";
import { RunnerStats } from "../components/RunnerStats";
import { useRunner } from "../providers/RunnerProvider";

export default function QueuePage() {
  const { employeeId, zone, isAvailable, setAvailable } = useRunner();

  return (
    <RunnerShell
      title="Queue"
      description="Claim and advance ready orders for your zone."
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

      <div className="mt-6">
        <RunnerStats />
        <SectionLabel>Concession queue</SectionLabel>
        {isAvailable ? (
          <div className="mt-3">
            <OrderQueue />
          </div>
        ) : (
          <p className="mt-3 text-base font-medium text-ink">
            You are inactive. Toggle active to receive matches.
          </p>
        )}
      </div>
    </RunnerShell>
  );
}
