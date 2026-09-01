"use client";

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

export type AdminRole = "vendor-admin" | "menu-manager" | "runner-manager" | "order-desk" | "analyst";

export type AdminSession = {
  email: string;
  role: AdminRole;
  stadiumId: string;
};

type AdminContextValue = {
  session: AdminSession | null;
  isAuthenticated: boolean;
  login: (email: string) => boolean;
  logout: () => void;
};

const AdminContext = createContext<AdminContextValue | null>(null);

/** Scaffold-only vendor session until dedicated vendor auth lands. */
const DEMO_SESSION: AdminSession = {
  email: "ops@stadiyums.demo",
  role: "vendor-admin",
  stadiumId: "stadium-demo",
};

export function AdminProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<AdminSession | null>(null);

  const login = (email: string) => {
    const trimmed = email.trim();
    if (!trimmed.includes("@")) {
      return false;
    }
    setSession({
      ...DEMO_SESSION,
      email: trimmed,
    });
    return true;
  };

  const logout = () => {
    setSession(null);
  };

  return (
    <AdminContext.Provider
      value={{
        session,
        isAuthenticated: session !== null,
        login,
        logout,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdmin must be used within AdminProvider");
  }
  return context;
}
