"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import type { Id } from "../../convex/_generated/dataModel";

type DemoContextValue = {
  activeTab: "fan" | "runner";
  setActiveTab: (tab: "fan" | "runner") => void;
  activeOrderId: Id<"orders"> | null;
  setActiveOrderId: (id: Id<"orders"> | null) => void;
  cart: Record<string, number>;
  setCart: React.Dispatch<React.SetStateAction<Record<string, number>>>;
  ticket: { aisle: string; seat: string };
  setTicket: React.Dispatch<React.SetStateAction<{ aisle: string; seat: string }>>;
  seatValidationError: boolean;
  setSeatValidationError: (value: boolean) => void;
  resetLocalState: () => void;
};

const DemoContext = createContext<DemoContextValue | null>(null);

export function DemoProvider({ children }: { children: ReactNode }) {
  const [activeTab, setActiveTab] = useState<"fan" | "runner">("fan");
  const [activeOrderId, setActiveOrderId] = useState<Id<"orders"> | null>(null);
  const [cart, setCart] = useState<Record<string, number>>({});
  const [ticket, setTicket] = useState({ aisle: "12", seat: "8" });
  const [seatValidationError, setSeatValidationError] = useState(false);

  const resetLocalState = () => {
    setCart({});
    setActiveOrderId(null);
    setTicket({ aisle: "12", seat: "8" });
    setSeatValidationError(false);
  };

  const value = useMemo(
    () => ({
      activeTab,
      setActiveTab,
      activeOrderId,
      setActiveOrderId,
      cart,
      setCart,
      ticket,
      setTicket,
      seatValidationError,
      setSeatValidationError,
      resetLocalState,
    }),
    [activeTab, activeOrderId, cart, seatValidationError, ticket],
  );

  return <DemoContext.Provider value={value}>{children}</DemoContext.Provider>;
}

export function useDemo() {
  const context = useContext(DemoContext);
  if (!context) {
    throw new Error("useDemo must be used within DemoProvider");
  }
  return context;
}
