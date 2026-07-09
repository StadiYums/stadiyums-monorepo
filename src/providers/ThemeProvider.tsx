"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  THEMES,
  applyThemeColors,
  type Theme,
  type ThemeId,
} from "@/lib/themes";

type ThemeContextValue = {
  theme: Theme;
  themeId: ThemeId;
  toggleVendorMode: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

const STORAGE_KEY = "stadiyums-theme";

function readStoredTheme(): ThemeId {
  if (typeof window === "undefined") {
    return "default";
  }
  const stored = sessionStorage.getItem(STORAGE_KEY);
  if (stored === "default" || stored === "grizzly") {
    return stored;
  }
  return "default";
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [themeId, setThemeId] = useState<ThemeId>(readStoredTheme);

  const theme = THEMES[themeId];

  useEffect(() => {
    applyThemeColors(theme.colors);
    document.title = theme.pageTitle;
    sessionStorage.setItem(STORAGE_KEY, theme.id);
  }, [theme]);

  const toggleVendorMode = useCallback(() => {
    setThemeId((current) => (current === "grizzly" ? "default" : "grizzly"));
  }, []);

  const value = useMemo(
    () => ({ theme, themeId, toggleVendorMode }),
    [theme, themeId, toggleVendorMode],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}
