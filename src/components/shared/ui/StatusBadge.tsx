import type { OrderStatus } from "@/lib/menu";

const STATUS_STYLES: Record<OrderStatus, string> = {
  placed: "bg-accent-tint-10 text-orange-dim",
  preparing: "bg-accent-tint-15 text-orange-dim",
  on_the_way: "bg-[rgba(11,29,51,0.1)] text-navy",
  delivered: "bg-[rgba(48,124,39,0.12)] text-green",
};

export function StatusBadge({
  status,
  label,
}: {
  status: OrderStatus;
  label: string;
}) {
  return (
    <span
      className={`mono rounded-pill px-2.5 py-[5px] text-[11px] font-bold uppercase tracking-[0.03em] ${STATUS_STYLES[status]}`}
    >
      {label}
    </span>
  );
}
