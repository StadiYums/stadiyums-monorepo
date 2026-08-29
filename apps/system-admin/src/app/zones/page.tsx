"use client";

import { Card, SectionLabel } from "@stadiyums/ui";
import { AdminShell } from "../../components/AdminShell";

export default function ZonesPage() {
  return (
    <AdminShell
      title="Zones"
      description="Section and zone configuration for matching and check-in."
    >
      <Card className="mt-8">
        <SectionLabel>Stadium zones</SectionLabel>
        <p className="mt-3 text-sm text-ink/80">
          Zone editor placeholder. Map real sections in later ops tickets.
        </p>
      </Card>
    </AdminShell>
  );
}
