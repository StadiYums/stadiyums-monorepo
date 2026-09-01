"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";

export type FanTicket = {
  section: string;
  aisle: string;
  seat: string;
};

type FanContextValue = {
  activeOrderId: string | null;
  setActiveOrderId: (id: string | null) => void;
  cart: Record<string, number>;
  setCart: Dispatch<SetStateAction<Record<string, number>>>;
  ticket: FanTicket;
  setTicket: Dispatch<SetStateAction<FanTicket>>;
  seatValidationError: boolean;
  setSeatValidationError: (value: boolean) => void;
  hasSeat: boolean;
  resetLocalState: () => void;
};

const FanContext = createContext<FanContextValue | null>(null);

const EMPTY_TICKET: FanTicket = { section: "", aisle: "", seat: "" };

export function FanProvider({ children }: { children: ReactNode }) {
  const [activeOrderId, setActiveOrderId] = useState<string | null>(null);
  const [cart, setCart] = useState<Record<string, number>>({});
  const [ticket, setTicket] = useState<FanTicket>(EMPTY_TICKET);
  const [seatValidationError, setSeatValidationError] = useState(false);

  const hasSeat =
    ticket.aisle.trim().length > 0 && ticket.seat.trim().length > 0;

  const resetLocalState = () => {
    setCart({});
    setActiveOrderId(null);
    setTicket(EMPTY_TICKET);
    setSeatValidationError(false);
  };

  const value = useMemo(
    () => ({
      activeOrderId,
      setActiveOrderId,
      cart,
      setCart,
      ticket,
      setTicket,
      seatValidationError,
      setSeatValidationError,
      hasSeat,
      resetLocalState,
    }),
    [activeOrderId, cart, hasSeat, seatValidationError, ticket],
  );

  return <FanContext.Provider value={value}>{children}</FanContext.Provider>;
}

export function useFan() {
  const context = useContext(FanContext);
  if (!context) {
    throw new Error("useFan must be used within FanProvider");
  }
  return context;
}
