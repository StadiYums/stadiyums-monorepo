"use client";

import { Card, SectionLabel } from "@stadiyums/ui";
import { AdminShell } from "../../components/AdminShell";

export default function RunnersPage() {
  return (
    <AdminShell
      title="Runner roster"
      description="Provision and manage this vendor's runners. Product UI lands in A1 roster tickets."
    >
      <Card className="mt-8">
          <SectionLabel>Vendor roster</SectionLabel>
          <p className="mt-3 text-sm text-ink/80">
          No runners provisioned in this scaffold. Use HEX-151 when ready.
        </p>
      </Card>
    </AdminShell>
  );
}
