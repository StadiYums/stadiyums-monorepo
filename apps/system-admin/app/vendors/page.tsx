"use client";

import { Card, SectionLabel } from "@stadiyums/ui";
import { AdminShell } from "../../components/AdminShell";

export default function VendorsPage() {
  return (
    <AdminShell
      title="Vendors"
      description="Vendor and menu management console shell for A1 workflows."
    >
      <Card className="mt-8">
        <SectionLabel>Vendor directory</SectionLabel>
        <p className="mt-3 text-sm text-ink/80">
          Approval and menu tooling arrive with A1 vendor tickets.
        </p>
      </Card>
    </AdminShell>
  );
}
