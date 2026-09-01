"use client";

import { useRouter } from "next/navigation";
import { Button, Card, SectionLabel } from "@stadiyums/ui";
import { RunnerShell } from "../../components/RunnerShell";
import { useRunner, type RunnerZone } from "../../providers/RunnerProvider";

const ZONES: RunnerZone[] = [
  { id: "101-115", label: "Sections 101–115" },
  { id: "116-130", label: "Sections 116–130" },
  { id: "suites-left", label: "Luxury Suites Left" },
  { id: "suites-right", label: "Luxury Suites Right" },
];

export default function CheckInPage() {
  const router = useRouter();
  const { setZone, zone } = useRunner();

  return (
    <RunnerShell
      title="Zone check-in"
      description="Choose the area you are authorized to cover today."
    >
      <Card className="mt-8 border-2 border-navy">
        <SectionLabel variant="action">Select zone</SectionLabel>
        <ul className="mt-4 flex flex-col gap-3">
          {ZONES.map((option) => {
            const selected = zone?.id === option.id;
            return (
              <li key={option.id}>
                <button
                  type="button"
                  onClick={() => setZone(option)}
                  className={`w-full min-h-14 rounded-md border-2 px-4 text-left text-base font-bold ${
                    selected
                      ? "border-navy bg-navy text-cream"
                      : "border-navy bg-cream text-navy hover:bg-navy/10"
                  }`}
                >
                  {option.label}
                </button>
              </li>
            );
          })}
        </ul>
        <Button
          className="mt-6 w-full min-h-14 text-base"
          type="button"
          disabled={!zone}
          onClick={() => router.replace("/")}
        >
          Enter queue
        </Button>
      </Card>
    </RunnerShell>
  );
}
