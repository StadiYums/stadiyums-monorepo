"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Card, Input, SectionLabel } from "@stadiyums/ui";
import { AdminShell } from "../../components/AdminShell";
import { useAdmin } from "../../providers/AdminProvider";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAdmin();
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);

  const submit = () => {
    const ok = login(email);
    if (!ok) {
      setError(true);
      return;
    }
    setError(false);
    router.replace("/");
  };

  return (
    <AdminShell
      title="Admin sign in"
      description="Scaffold gate only — stadium admin auth lands in a later ticket. Any email with @ works."
    >
      <Card className="mt-8 max-w-md">
        <SectionLabel>Email</SectionLabel>
        <div className="mt-3">
          <Input
            label="Work email"
            type="email"
            value={email}
            invalid={error}
            placeholder="you@stadium.com"
            onChange={(event) => {
              setError(false);
              setEmail(event.target.value);
            }}
          />
        </div>
        {error ? (
          <p className="mt-3 text-sm text-orange">Enter a valid email address.</p>
        ) : null}
        <Button className="mt-5 w-full" type="button" onClick={submit}>
          Enter console
        </Button>
      </Card>
    </AdminShell>
  );
}
