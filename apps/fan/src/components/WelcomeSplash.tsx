"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@stadiyums/ui";
import { useFan } from "../providers/FanProvider";

const STEPS = [
  {
    title: "Set your seat",
    body: "Tell us where you are, or scan the QR code beside you.",
  },
  {
    title: "Order in a few taps",
    body: "Pick what you want from the concessions around you.",
  },
  {
    title: "Your vendor gets the order",
    body: "The right stand sees your ticket and gets to work.",
  },
  {
    title: "A runner brings it over",
    body: "Your order leaves the stand and heads for your section.",
  },
  {
    title: "Keep watching",
    body: "Follow the action while your food comes to you.",
  },
  {
    title: "Leave the line behind",
    body: "More game. Less lines.",
  },
] as const;

export function WelcomeSplash() {
  const router = useRouter();
  const { hasSeat } = useFan();

  return (
    <main className="mx-auto flex w-full max-w-[1120px] flex-col gap-[var(--space-section)] pb-[var(--space-4)] lg:justify-center">
      <section
        aria-labelledby="splash-hero-heading"
        className="overflow-hidden rounded-[16px] border border-navy bg-navy text-cream"
      >
        <div className="px-[var(--space-6)] pb-0 pt-[var(--space-8)] sm:px-[var(--space-8)] lg:px-[var(--space-10)] lg:pt-[var(--space-10)]">
          <h1
            id="splash-hero-heading"
            className="mx-auto max-w-[18ch] text-center font-display text-[clamp(2.35rem,7vw,5.25rem)] leading-[0.94] tracking-[-0.035em] text-cream"
          >
            Your seat is the best place to order.
          </h1>
        </div>
        <div className="grid lg:grid-cols-[1.07fr_0.93fr]">
          <div className="flex flex-col px-[var(--space-6)] pb-[var(--space-8)] pt-[var(--space-6)] sm:px-[var(--space-8)] lg:px-[var(--space-10)] lg:pb-[var(--space-10)] lg:pt-[var(--space-8)]">
            <p className="max-w-[47ch] text-[15px] leading-relaxed text-cream/75 sm:text-base">
              Concessions come to your seat, so you can keep your eyes on the action.
              Your vendor and a stadium runner take it from there.
            </p>

            <div className="mt-[var(--space-8)] flex flex-col gap-[var(--space-3)] sm:flex-row">
              <Button
                type="button"
                className="min-h-14 flex-1 bg-orange text-[15px] text-cream hover:bg-orange-2 active:bg-orange-dim sm:flex-none sm:px-8"
                onClick={() => router.push("/seat")}
              >
                Find my seat
              </Button>
              <Button
                type="button"
                variant="secondary"
                className="min-h-14 flex-1 border-cream/30 bg-transparent text-[15px] text-cream hover:bg-cream/10 active:bg-cream/15 sm:flex-none sm:px-8"
                onClick={() => router.push("/seat?via=qr")}
              >
                Scan a QR code
              </Button>
            </div>

            {hasSeat ? (
              <p className="mt-[var(--space-5)] text-sm text-cream/70">
                Your seat is saved. {" "}
                <Link
                  href="/order"
                  className="font-semibold text-orange underline decoration-orange/50 underline-offset-4 hover:text-orange-2"
                >
                  Start your order
                </Link>
              </p>
            ) : null}
          </div>

          <div className="relative border-t border-cream/15 bg-navy-deep px-[var(--space-6)] py-[var(--space-6)] sm:px-[var(--space-8)] lg:min-h-[290px] lg:border-l lg:border-t-0 lg:px-[var(--space-10)] lg:py-[var(--space-8)]">
            <div className="absolute -right-20 -top-24 h-56 w-56 rounded-full border-[28px] border-orange/15" />
            <p className="mono relative text-[11px] font-bold uppercase tracking-[0.12em] text-cream/55">
              The play call
            </p>
            <div className="relative mt-[var(--space-5)] flex items-end justify-between border-b border-cream/25 pb-[var(--space-5)]">
              <div>
                <p className="mono text-[12px] font-bold uppercase tracking-[0.1em] text-orange">
                  Home section
                </p>
                <p className="mono mt-1 text-3xl font-bold tracking-[-0.05em] text-cream sm:text-4xl">
                  YOUR SEAT
                </p>
              </div>
              <span className="mono mb-1 rounded-pill border border-orange/50 bg-orange/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.08em] text-orange">
                In the action
              </span>
            </div>
            <div className="relative mt-[var(--space-4)] grid grid-cols-2 gap-[var(--space-3)] lg:hidden">
              <div>
                <p className="mono text-[10px] font-bold uppercase tracking-[0.1em] text-orange">From</p>
                <p className="mt-1 text-sm font-semibold text-cream">Your seat</p>
              </div>
              <div className="border-l border-cream/15 pl-3">
                <p className="mono text-[10px] font-bold uppercase tracking-[0.1em] text-orange">To</p>
                <p className="mt-1 text-sm font-semibold text-cream">Your hands</p>
              </div>
            </div>
            <div className="relative mt-[var(--space-5)] hidden grid-cols-[auto_1fr] gap-x-[var(--space-4)] gap-y-[var(--space-3)] text-sm lg:grid">
              <span className="mono text-orange">01</span>
              <span className="text-cream/80">You order from where you&apos;re sitting.</span>
              <span className="mono text-orange">02</span>
              <span className="text-cream/80">The stand makes it. A runner delivers it.</span>
              <span className="mono text-orange">03</span>
              <span className="font-semibold text-cream">You stay for the next big moment.</span>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="how-it-works-heading">
        <div className="flex items-end justify-between gap-[var(--space-4)] border-b border-line pb-[var(--space-4)]">
          <div>
            <h2 id="how-it-works-heading" className="font-display text-[1.6rem] leading-none text-navy sm:text-[1.85rem]">
              The line you want to be in
            </h2>
            <p className="mt-[var(--space-2)] max-w-[60ch] text-[14px] leading-relaxed text-label-muted sm:text-[15px]">
              Six quick moves from your seat to your hands.
            </p>
          </div>
          <span className="mono hidden shrink-0 text-[11px] font-bold uppercase tracking-[0.1em] text-orange sm:block">
            Game on
          </span>
        </div>

        <ol className="mt-[var(--space-5)] grid gap-x-[var(--space-5)] gap-y-[var(--space-6)] sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-[var(--space-8)] lg:gap-y-[var(--space-8)]">
          {STEPS.map((step, index) => (
            <li key={step.title} className="grid grid-cols-[2.75rem_1fr] gap-x-[var(--space-3)]">
              <span
                className={`mono flex h-11 w-11 items-center justify-center rounded-full border text-[12px] font-bold ${
                  index === STEPS.length - 1
                    ? "border-orange bg-orange text-cream"
                    : "border-line bg-surface-white text-navy"
                }`}
                aria-hidden="true"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="pt-0.5">
                <h3 className="text-[16px] leading-tight text-navy">{step.title}</h3>
                <p className="mt-[var(--space-2)] max-w-[32ch] text-[14px] leading-relaxed text-label-muted">
                  {step.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>
    </main>
  );
}
