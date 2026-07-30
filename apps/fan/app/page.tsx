import { Button, Card, SectionLabel } from "@stadiyums/ui";

export default function HomePage() {
  return (
    <main className="mx-auto max-w-[40rem] px-5 py-10">
      <p className="mono text-[11.5px] font-bold uppercase tracking-[0.08em] text-label-muted">
        StadiYums
      </p>
      <h1 className="mt-2 text-[2rem] text-navy">Fan app</h1>
      <p className="mt-3 text-sm text-ink/80">
        Shared design system via <code className="mono text-[13px]">@stadiyums/ui</code>.
        Product UI lands in HEX-144 / HEX-147.
      </p>
      <Card className="mt-8">
        <SectionLabel>Design tokens</SectionLabel>
        <p className="text-sm text-ink/80">
          Navy, orange, and cream render from the shared package. Use Grizzlies mode
          (bottom-left) to verify theme switching.
        </p>
        <Button className="mt-4" type="button">
          Primary button
        </Button>
      </Card>
    </main>
  );
}
