"use client";

import Image from "next/image";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useTheme } from "@/providers/ThemeProvider";
import { useDemo } from "@/providers/DemoProvider";
import { Button } from "@/components/shared/ui/Button";

export function Header() {
  const { theme } = useTheme();
  const { resetLocalState } = useDemo();
  const resetDemo = useMutation(api.demo.resetDemo);

  const handleReset = async () => {
    resetLocalState();
    await resetDemo();
  };

  return (
    <header className="bg-navy py-4 text-cream">
      <div className="mx-auto flex max-w-[880px] flex-wrap items-center justify-between gap-3 px-5">
        <div className="flex items-center gap-2.5">
          <Image
            src={theme.logoSrc}
            alt=""
            width={42}
            height={42}
            className="h-[42px] w-[42px] shrink-0 rounded-full"
            unoptimized={theme.logoSrc.startsWith("http")}
          />
          <div className="flex flex-wrap items-baseline gap-2.5">
            <div className="font-display text-lg">
              {theme.wordmark.before}
              <span className="text-orange">{theme.wordmark.accent}</span>
            </div>
            {theme.showPoweredBy && (
              <div className="mono text-[9.5px] font-bold uppercase tracking-[0.06em] text-cream/45">
                Powered by <span className="text-cream/65">StadiYums</span>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2.5">
          <Button
            type="button"
            onClick={() => void handleReset()}
            className="mono rounded-pill border border-cream/20 bg-transparent px-3 py-[5px] text-[10.5px] font-bold uppercase tracking-[0.06em] text-cream/55 hover:border-cream/45 hover:bg-transparent hover:text-cream"
          >
            Reset demo
          </Button>
          <div className="mono rounded-pill border border-[var(--accent-border)] px-3 py-[5px] text-[11.5px] font-bold uppercase tracking-[0.06em] text-orange">
            {theme.tagline}
          </div>
        </div>
      </div>
    </header>
  );
}
