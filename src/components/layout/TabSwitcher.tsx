"use client";

import { IconDeviceMobile, IconWalk } from "@tabler/icons-react";
import { useDemo } from "@/providers/DemoProvider";

export function TabSwitcher() {
  const { activeTab, setActiveTab } = useDemo();

  return (
    <div className="mx-auto my-5 flex max-w-[340px] gap-0 rounded-md bg-navy-deep p-1">
      <button
        type="button"
        onClick={() => setActiveTab("fan")}
        className={`flex flex-1 items-center justify-center gap-1.5 rounded-[7px] px-3.5 py-2.5 text-[13.5px] font-semibold transition-colors duration-150 ${
          activeTab === "fan"
            ? "bg-orange text-white"
            : "bg-transparent text-cream/60"
        }`}
      >
        <IconDeviceMobile size={16} />
        Fan app
      </button>
      <button
        type="button"
        onClick={() => setActiveTab("runner")}
        className={`flex flex-1 items-center justify-center gap-1.5 rounded-[7px] px-3.5 py-2.5 text-[13.5px] font-semibold transition-colors duration-150 ${
          activeTab === "runner"
            ? "bg-orange text-white"
            : "bg-transparent text-cream/60"
        }`}
      >
        <IconWalk size={16} />
        Runner app
      </button>
    </div>
  );
}
