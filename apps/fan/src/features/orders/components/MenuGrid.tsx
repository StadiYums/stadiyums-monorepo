"use client";

import { MenuIcon, QtyStepper, SectionLabel, money } from "@stadiyums/ui";
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
    <>
      <SectionLabel variant="action">What can we bring you?</SectionLabel>
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
                <p className="text-[13px] leading-snug text-label-muted">{item.desc}</p>
                <p className="mono mt-1 text-[13.5px] font-bold text-navy">
                  {money(item.price)}
                </p>
              </div>
              <QtyStepper value={qty} onChange={(next) => changeQty(item.id, next)} />
            </div>
          );
        })}
      </div>
    </>
  );
}
