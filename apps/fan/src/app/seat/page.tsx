import { Suspense } from "react";
import { FanOperateLayout } from "../../components/FanOperateLayout";
import { SeatPageContent } from "./SeatPageContent";

export default function SeatPage() {
  return (
    <Suspense
      fallback={
        <FanOperateLayout>
          <p className="text-sm text-label-muted">Loading seat entry…</p>
        </FanOperateLayout>
      }
    >
      <SeatPageContent />
    </Suspense>
  );
}
