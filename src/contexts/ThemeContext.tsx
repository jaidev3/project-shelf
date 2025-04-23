import React, { createContext, useEffect, useState, ReactNode } from "react";

export const Theme = {
  light: "light",
  dark: "dark",
  system: "system",
} as const;

export type ThemeType = (typeof Theme)[keyof typeof Theme];

export interface ThemeContextType {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
}

const initialState: ThemeContextType = {
  theme: Theme.system,
  setTheme: () => null,
};

export const ThemeProviderContext =
  createContext<ThemeContextType>(initialState);

interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: ThemeType;
  storageKey?: string;
}

export function ThemeProvider({
  children,
  defaultTheme = Theme.system,
  storageKey = "ui-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<ThemeType>(
    () => (localStorage.getItem(storageKey) as ThemeType) || defaultTheme
  );

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");

    if (theme === Theme.system) {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? Theme.dark
        : Theme.light;
      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
  }, [theme]);

  const value = {
    theme,
    setTheme: (newTheme: ThemeType) => {
      localStorage.setItem(storageKey, newTheme);
      setTheme(newTheme);
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}
