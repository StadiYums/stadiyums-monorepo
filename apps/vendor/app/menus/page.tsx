"use client";

import { Card, SectionLabel } from "@stadiyums/ui";
import { AdminShell } from "../../components/AdminShell";

export default function VendorsPage() {
  return (
    <AdminShell
      title="Menus"
      description="Manage this vendor's menus and menu versions for A1 workflows."
    >
      <Card className="mt-8">
        <SectionLabel>Menu catalog</SectionLabel>
        <p className="mt-3 text-sm text-ink/80">
          Menu authoring and submission arrive with A1 vendor tickets.
        </p>
      </Card>
    </AdminShell>
  );
}
