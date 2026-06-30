"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { useLanguage, type Lang } from "@/components/providers/language-provider";

const OPTIONS: Lang[] = ["en", "es"];

/**
 * EN / ES segmented control wired to the LanguageProvider. Self-contained:
 * drop it anywhere inside the provider and the whole tree re-translates.
 */
export function LangToggle({ className }: { className?: string }) {
  const { lang, setLang } = useLanguage();
  return (
    <span className={cn("lang-toggle", className)} role="group" aria-label="Language">
      {OPTIONS.map((opt) => (
        <button
          key={opt}
          type="button"
          className={cn("lang-opt", lang === opt && "on")}
          aria-pressed={lang === opt}
          onClick={() => setLang(opt)}
        >
          {opt.toUpperCase()}
        </button>
      ))}
    </span>
  );
}
