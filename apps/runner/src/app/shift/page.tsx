"use client";

import { useRouter } from "next/navigation";
import { Button, Card, SectionLabel } from "@stadiyums/ui";
import { RunnerShell } from "../../components/RunnerShell";
import { RunnerStats } from "../../components/RunnerStats";
import { useRunner } from "../../providers/RunnerProvider";

export default function ShiftPage() {
  const router = useRouter();
  const { employeeId, zone, logout } = useRunner();

  return (
    <RunnerShell
      title="Shift"
      description="Your shift context, performance, and sign-out controls."
    >
      <div className="mt-8">
        <RunnerStats />
      </div>
      <Card className="border-2 border-navy">
        <SectionLabel variant="action">Session</SectionLabel>
        <p className="mt-3 text-base font-semibold text-ink">
          Runner {employeeId}
        </p>
        <p className="mt-2 text-base font-medium text-ink">
          Zone: {zone?.label ?? "—"}
        </p>
        <p className="mt-2 text-base font-medium text-ink">Tips: Tracking unavailable</p>
        <Button
          className="mt-6 w-full min-h-14 text-base"
          type="button"
          variant="secondary"
          onClick={() => {
            logout();
            router.replace("/login");
          }}
        >
          End shift / sign out
        </Button>
      </Card>
    </RunnerShell>
  );
}
