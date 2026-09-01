"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Card, Input, SectionLabel } from "@stadiyums/ui";
import { RunnerShell } from "../../components/RunnerShell";
import { useRunner } from "../../providers/RunnerProvider";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useRunner();
  const [employeeId, setEmployeeId] = useState("");
  const [pin, setPin] = useState("");
  const [error, setError] = useState(false);

  const submit = () => {
    const ok = login(employeeId, pin);
    if (!ok) {
      setError(true);
      return;
    }
    setError(false);
    router.replace("/check-in");
  };

  return (
    <RunnerShell
      eyebrow="StadiYums Runner"
      title="Sign in"
      description="Use your assigned employee credentials to start a shift."
    >
      <Card className="mt-8 border-2 border-navy">
        <SectionLabel>Credentials</SectionLabel>
        <div className="mt-4 flex flex-col gap-4">
          <Input
            label="Employee ID"
            value={employeeId}
            invalid={error && !employeeId.trim()}
            autoComplete="username"
            placeholder="e.g. R-1042"
            onChange={(event) => {
              setError(false);
              setEmployeeId(event.target.value);
            }}
          />
          <Input
            label="PIN"
            type="password"
            inputMode="numeric"
            value={pin}
            invalid={error}
            autoComplete="current-password"
            placeholder="4-digit PIN"
            onChange={(event) => {
              setError(false);
              setPin(event.target.value);
            }}
          />
        </div>
        {error ? (
          <p className="mt-3 text-base font-semibold text-orange">
            Check your Employee ID and PIN, then try again.
          </p>
        ) : null}
        <Button className="mt-6 w-full min-h-14 text-base" type="button" onClick={submit}>
          Continue
        </Button>
      </Card>
    </RunnerShell>
  );
}
