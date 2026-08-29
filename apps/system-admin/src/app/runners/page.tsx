"use client";

import { Card, SectionLabel } from "@stadiyums/ui";
import { AdminShell } from "../../components/AdminShell";

export default function RunnersPage() {
  return (
    <AdminShell
      title="Runners"
      description="Provision and manage stadium runners. Product UI lands in A1 roster tickets."
    >
      <Card className="mt-8">
        <SectionLabel>Roster</SectionLabel>
        <p className="mt-3 text-sm text-ink/80">
          No runners provisioned in this scaffold. Use HEX-151 when ready.
        </p>
      </Card>
    </AdminShell>
  );
}
