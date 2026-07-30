import { Button, Card, SectionLabel } from "@stadiyums/ui";

export default function HomePage() {
  return (
    <main className="mx-auto max-w-[40rem] px-5 py-10">
      <p className="mono text-[11.5px] font-bold uppercase tracking-[0.08em] text-label-muted">
        StadiYums
      </p>
      <h1 className="mt-2 text-[2rem] text-navy">Admin app</h1>
      <p className="mt-3 text-sm text-ink/80">
        Shared design system via <code className="mono text-[13px]">@stadiyums/ui</code>.
        Product UI lands in HEX-146 / A1 tickets.
      </p>
      <Card className="mt-8">
        <SectionLabel>Ops console</SectionLabel>
        <p className="text-sm text-ink/80">
          Use Grizzlies mode (bottom-left) to verify theme switching for fan + admin.
        </p>
        <Button className="mt-4" type="button" variant="secondary">
          Secondary button
        </Button>
      </Card>
    </main>
  );
}
