"use client";

import { Card, SectionLabel } from "@stadiyums/ui";
import { AdminShell } from "../../components/AdminShell";

export default function SettingsPage() {
  return (
    <AdminShell
      title="Vendor settings"
      description="Vendor profile, concession locations, and order-desk settings."
    >
      <Card className="mt-8">
        <SectionLabel>Vendor profile</SectionLabel>
        <p className="mt-3 text-sm text-ink/80">
          Demo reset and venue config will live here. No destructive actions in the scaffold.
        </p>
      </Card>
    </AdminShell>
  );
}
