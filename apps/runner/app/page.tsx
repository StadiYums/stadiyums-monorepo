import { Button, Card, SectionLabel } from "@stadiyums/ui";

export default function HomePage() {
  return (
    <main className="mx-auto max-w-[40rem] px-5 py-10">
      <p className="mono text-[11.5px] font-bold uppercase tracking-[0.08em] text-label-muted">
        StadiYums
      </p>
      <h1 className="mt-2 text-[2rem] text-navy">Runner app</h1>
      <p className="mt-3 text-sm text-ink/80">
        Shared design system via <code className="mono text-[13px]">@stadiyums/ui</code>.
        No vendor theme toggle — runner stays on stadium defaults.
      </p>
      <Card className="mt-8">
        <SectionLabel>Queue shell</SectionLabel>
        <p className="text-sm text-ink/80">
          Product UI lands in HEX-145 / HEX-148.
        </p>
        <Button className="mt-4" type="button" variant="advance">
          Advance
        </Button>
      </Card>
    </main>
  );
}
