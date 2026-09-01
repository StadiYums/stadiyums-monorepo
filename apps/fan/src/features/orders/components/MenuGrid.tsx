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
    <section aria-labelledby="menu-heading" className="flex flex-col gap-[var(--space-5)]">
      <div className="flex flex-wrap items-baseline justify-between gap-x-[var(--space-4)] gap-y-[var(--space-1)]">
        <h2 id="menu-heading" className="text-xl leading-tight text-navy">
          Game-day menu
        </h2>
        <p className="mono text-[11.5px] font-bold uppercase tracking-[0.08em] text-label-muted">
          {MENU.length} favorites
        </p>
      </div>
      <div className="grid grid-cols-1 gap-[var(--space-3)] min-[480px]:grid-cols-2 lg:grid-cols-3">
        {MENU.map((item) => {
          const qty = cart[item.id] ?? 0;
          return (
            <div
              key={item.id}
              className="flex flex-col gap-[var(--space-3)] rounded-lg border border-line bg-surface-white p-[var(--space-4)]"
            >
              <div className="flex h-36 w-full items-center justify-center rounded-[9px] bg-cream min-[480px]:h-32 lg:h-36">
                <div className="h-[56%] w-[56%] min-[480px]:h-[64%] min-[480px]:w-[64%]">
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
