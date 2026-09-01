import type { ReactNode } from "react";
import { Button } from "./Button";

type OperateCartBarProps = {
  visible: boolean;
  itemCount: number;
  totalLabel: string;
  actionLabel: string;
  onAction: () => void;
  actionDisabled?: boolean;
  error?: string | null;
  summary?: ReactNode;
};

export function OperateCartBar({
  visible,
  itemCount,
  totalLabel,
  actionLabel,
  onAction,
  actionDisabled = false,
  error = null,
  summary,
}: OperateCartBarProps) {
  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 bg-orange py-4 text-white transition-transform duration-[250ms] ease-out ${
        visible ? "translate-y-0" : "translate-y-[110%]"
      }`}
    >
      <div className="mx-auto max-w-[520px] px-5">
        {error ? (
          <p
            role="alert"
            className="mb-2 text-center text-sm font-medium text-white/95"
          >
            {error}
          </p>
        ) : null}
        <div className="flex items-center justify-between gap-3">
          {summary ?? (
            <div className="text-sm">
              <b className="mono">{itemCount}</b> items ·{" "}
              <b className="mono">{totalLabel}</b>
            </div>
          )}
          <Button
            type="button"
            variant="checkout"
            disabled={actionDisabled}
            onClick={onAction}
          >
            {actionLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}
