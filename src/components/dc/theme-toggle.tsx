"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { useTheme } from "@/components/providers/theme-provider";
import { Icon } from "@/components/dc/icon";

/**
 * Pill theme toggle matching the Design System footer control. Theme is read
 * via `useSyncExternalStore` in the provider, so SSR (light) reconciles to the
 * real theme on the client without a hydration warning.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle color theme"
      className={cn(
        "inline-flex items-center gap-1.5 rounded-[var(--radius-pill)] border border-border-strong bg-surface-2 px-3 py-1.5 font-head text-xs font-semibold text-text transition-colors hover:bg-surface",
        className,
      )}
    >
      <Icon name={isDark ? "sun" : "moon"} size={14} />
      <span>{isDark ? "Light" : "Dark"}</span>
    </button>
  );
}
