"use client";

import * as React from "react";

type Theme = "light" | "dark";

type ThemeContextValue = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
};

const ThemeContext = React.createContext<ThemeContextValue | null>(null);

const STORAGE_KEY = "dc-theme";
const EVENT = "dc-theme-change";

/**
 * The `.dark` class is the single source of truth — set before first paint by
 * `themeInitScript`, then mutated by `setTheme`. We read it with
 * `useSyncExternalStore` so there's no setState-in-effect and SSR/client hand
 * off cleanly (server renders light, client reconciles to the real theme).
 */
function subscribe(callback: () => void) {
  window.addEventListener(EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

function getSnapshot(): Theme {
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

function getServerSnapshot(): Theme {
  return "light";
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
  root.style.colorScheme = theme;
  window.localStorage.setItem(STORAGE_KEY, theme);
  window.dispatchEvent(new Event(EVENT));
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = React.useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  const value = React.useMemo<ThemeContextValue>(
    () => ({
      theme,
      setTheme: applyTheme,
      toggleTheme: () => applyTheme(getSnapshot() === "dark" ? "light" : "dark"),
    }),
    [theme],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = React.useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within a ThemeProvider");
  return ctx;
}

/**
 * Inline script that sets the `.dark` class before first paint to avoid a
 * flash of the wrong theme. Rendered in the document <head> via layout.
 */
export const themeInitScript = `
(function () {
  try {
    var k = '${STORAGE_KEY}';
    var t = localStorage.getItem(k);
    if (!t) t = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    var el = document.documentElement;
    el.classList.toggle('dark', t === 'dark');
    el.style.colorScheme = t;
  } catch (e) {}
})();
`;
