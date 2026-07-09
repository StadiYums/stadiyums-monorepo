"use client";

import { MENU } from "@/lib/menu";
import { money } from "@/lib/format";
import { MenuIcon } from "@/components/shared/MenuIcon";
import { SectionLabel } from "@/components/shared/ui/Card";
import { useDemo } from "@/providers/DemoProvider";

export function MenuGrid() {
  const { cart, setCart } = useDemo();

  const changeQty = (id: string, delta: number) => {
    setCart((current) => {
      const nextQty = Math.max(0, (current[id] ?? 0) + delta);
      if (nextQty === 0) {
        const next = { ...current };
        delete next[id];
        return next;
      }
      return { ...current, [id]: nextQty };
    });
  };

  return (
    <>
      <SectionLabel>What can we bring you?</SectionLabel>
      <div className="grid grid-cols-1 gap-3.5 min-[400px]:grid-cols-2">
        {MENU.map((item) => {
          const qty = cart[item.id] ?? 0;
          return (
            <div
              key={item.id}
              className="flex flex-col gap-2.5 rounded-lg border border-line bg-surface-white p-3.5"
            >
              <div className="flex aspect-[1.5/1] w-full items-center justify-center rounded-[9px] bg-cream">
                <div className="h-[64%] w-[64%]">
                  <MenuIcon icon={item.icon} />
                </div>
              </div>
              <div>
                <h3 className="mb-0.5 text-[15px] font-semibold">{item.name}</h3>
                <p className="mono text-[13.5px] font-bold text-navy">{money(item.price)}</p>
              </div>
              <div className="flex items-center justify-between gap-2.5">
                <button
                  type="button"
                  disabled={qty === 0}
                  onClick={() => changeQty(item.id, -1)}
                  className="flex h-[30px] w-[30px] items-center justify-center rounded-full border-[1.5px] border-line bg-cream text-base font-bold text-navy disabled:cursor-default disabled:opacity-30"
                >
                  -
                </button>
                <span className="mono min-w-4 text-center text-sm font-bold">{qty}</span>
                <button
                  type="button"
                  onClick={() => changeQty(item.id, 1)}
                  className="flex h-[30px] w-[30px] items-center justify-center rounded-full border-[1.5px] border-line bg-cream text-base font-bold text-navy"
                >
                  +
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
