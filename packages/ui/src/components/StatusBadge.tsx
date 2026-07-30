import type { OrderStatus } from "@stadiyums/types";
import { ORDER_STATUS_LABELS } from "@stadiyums/types";

const STATUS_STYLES: Partial<Record<OrderStatus, string>> = {
  placed: "bg-accent-tint-10 text-orange-dim",
  vendorAccepted: "bg-accent-tint-10 text-orange-dim",
  preparing: "bg-accent-tint-15 text-orange-dim",
  readyForPickup: "bg-[rgba(48,124,39,0.12)] text-green",
  runnerAssigned: "bg-[rgba(48,124,39,0.12)] text-green",
  atVendor: "bg-accent-tint-15 text-orange-dim",
  pickedUp: "bg-[rgba(11,29,51,0.1)] text-navy",
  on_the_way: "bg-[rgba(11,29,51,0.1)] text-navy",
  atSection: "bg-[rgba(48,124,39,0.12)] text-green",
  delivered: "bg-[rgba(48,124,39,0.12)] text-green",
  vendorRejected: "bg-accent-tint-15 text-orange-dim",
  customerCanceled: "bg-[rgba(11,29,51,0.1)] text-navy",
  operatorCanceled: "bg-[rgba(11,29,51,0.1)] text-navy",
  refunded: "bg-[rgba(11,29,51,0.1)] text-navy",
};

const FALLBACK_STYLE = "bg-[rgba(11,29,51,0.1)] text-navy";

export function StatusBadge({
  status,
  label,
}: {
  status: OrderStatus;
  label?: string;
}) {
  return (
    <span
      className={`mono rounded-pill px-2.5 py-[5px] text-[11px] font-bold uppercase tracking-[0.03em] ${STATUS_STYLES[status] ?? FALLBACK_STYLE}`}
    >
      {label ?? ORDER_STATUS_LABELS[status]}
    </span>
  );
}
