import { createContext, useEffect, useState } from "react";

export const Theme = {
  light: "light",
  dark: "dark",
  system: "system",
};

export const ThemeProviderState = {
  theme: Theme.system,
  setTheme: () => null,
};

const initialState = {
  theme: Theme.system,
  setTheme: () => null,
};

export const ThemeProviderContext = createContext(initialState);

export function ThemeProvider({
  children,
  defaultTheme = Theme.system,
  storageKey = "ui-theme",
  ...props
}) {
  const [theme, setTheme] = useState(
    () => localStorage.getItem(storageKey) || defaultTheme
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
    setTheme: (theme) => {
      localStorage.setItem(storageKey, theme);
      setTheme(theme);
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}
