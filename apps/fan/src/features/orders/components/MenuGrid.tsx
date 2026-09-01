"use client";

import { MenuIcon, QtyStepper, money } from "@stadiyums/ui";
import { MENU } from "../../../lib/menu";
import { useFan } from "../../../providers/FanProvider";

export function MenuGrid() {
  const { cart, setCart } = useFan();

  const changeQty = (id: string, nextQty: number) => {
    setCart((current) => {
      if (nextQty <= 0) {
        const next = { ...current };
        delete next[id];
        return next;
      }
      return { ...current, [id]: nextQty };
    });
  };

  return (
    <section aria-labelledby="menu-heading">
      <div className="flex flex-col gap-[var(--space-2)]">
        <h1
          id="menu-heading"
          className="font-display text-[1.75rem] font-bold leading-[1.05] tracking-[-0.035em] text-navy"
        >
          Pick your game-day favorites
        </h1>
        <p className="max-w-[38ch] text-sm leading-relaxed text-label-muted">
          Add what you want—we&apos;ll bring it straight to your seat.
        </p>
      </div>

      <div className="mt-[var(--space-5)] grid grid-cols-1 gap-[var(--space-3)] min-[400px]:grid-cols-2">
        {MENU.map((item) => {
          const qty = cart[item.id] ?? 0;
          return (
            <div
              key={item.id}
              className="flex flex-col gap-[var(--space-3)] rounded-lg border border-line bg-surface-white p-[var(--space-4)]"
            >
              <div className="flex aspect-[1.5/1] w-full items-center justify-center rounded-[9px] bg-cream">
                <div className="h-[64%] w-[64%]">
                  <MenuIcon icon={item.icon} />
                </div>
              </div>
              <div>
                <h2 className="text-[15px] font-semibold">{item.name}</h2>
                <p className="text-[13px] leading-snug text-label-muted">{item.desc}</p>
                <p className="mono mt-[var(--space-1)] text-[13.5px] font-bold text-navy">
                  {money(item.price)}
                </p>
              </div>
              <QtyStepper value={qty} onChange={(next) => changeQty(item.id, next)} />
            </div>
          );
        })}
      </div>
    </section>
  );
}
