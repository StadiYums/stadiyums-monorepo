"use client";

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

export type RunnerZone = {
  id: string;
  label: string;
};

type RunnerContextValue = {
  employeeId: string | null;
  isAuthenticated: boolean;
  zone: RunnerZone | null;
  isAvailable: boolean;
  login: (employeeId: string, pin: string) => boolean;
  logout: () => void;
  setZone: (zone: RunnerZone) => void;
  setAvailable: (value: boolean) => void;
};

const RunnerContext = createContext<RunnerContextValue | null>(null);

/** Demo PIN for scaffold-only auth until M1 real credentials land. */
const DEMO_PIN = "1234";

export function RunnerProvider({ children }: { children: ReactNode }) {
  const [employeeId, setEmployeeId] = useState<string | null>(null);
  const [zone, setZoneState] = useState<RunnerZone | null>(null);
  const [isAvailable, setAvailable] = useState(true);

  const login = (nextEmployeeId: string, pin: string) => {
    const trimmed = nextEmployeeId.trim();
    if (!trimmed || pin.trim() !== DEMO_PIN) {
      return false;
    }
    setEmployeeId(trimmed);
    setZoneState(null);
    setAvailable(true);
    return true;
  };

  const logout = () => {
    setEmployeeId(null);
    setZoneState(null);
    setAvailable(true);
  };

  const setZone = (next: RunnerZone) => {
    setZoneState(next);
  };

  return (
    <RunnerContext.Provider
      value={{
        employeeId,
        isAuthenticated: employeeId !== null,
        zone,
        isAvailable,
        login,
        logout,
        setZone,
        setAvailable,
      }}
    >
      {children}
    </RunnerContext.Provider>
  );
}

export function useRunner() {
  const context = useContext(RunnerContext);
  if (!context) {
    throw new Error("useRunner must be used within RunnerProvider");
  }
  return context;
}
