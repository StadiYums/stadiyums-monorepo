"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { FanOperateLayout } from "../components/FanOperateLayout";
import { WelcomeSplash } from "../components/WelcomeSplash";
import { useFan } from "../providers/FanProvider";

export default function HomePage() {
  const router = useRouter();
  const { activeOrderId, sessionReady } = useFan();

  useEffect(() => {
    if (!sessionReady) {
      return;
    }
    if (activeOrderId) {
      router.replace("/tracker");
    }
  }, [activeOrderId, router, sessionReady]);

  if (!sessionReady || activeOrderId) {
    return (
      <FanOperateLayout width="wide">
        <p className="text-sm text-label-muted">Opening your live order tracker…</p>
      </FanOperateLayout>
    );
  }

  return (
    <FanOperateLayout width="wide">
      <WelcomeSplash />
    </FanOperateLayout>
  );
}
