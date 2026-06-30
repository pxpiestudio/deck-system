"use client";

import * as React from "react";

export type Lang = "en" | "es";

type Dict = Record<string, string>;

/**
 * Minimal i18n layer mirroring the prototype's `useT` hook. The Design System
 * documentation copy stays in English; this powers the EN/ES toggle demo and
 * any component label that ships bilingual.
 */
const STRINGS: Record<Lang, Dict> = {
  en: {
    "nav.browse": "Browse",
    "nav.sets": "Sets",
    "nav.priceGuide": "Price guide",
    "nav.sell": "Sell",
    "nav.signIn": "Sign in",
    "nav.sellCards": "Sell cards",
    "nav.howItWorks": "How it works",
    "nav.sellerPortal": "Seller portal",
    "nav.myDashboard": "My Dashboard",
    "nav.startSelling": "Start selling",
    "search.placeholder": "Search Charizard ex, sets, sealed product…",
    "search.cta": "Search",
    "role.buyer": "Buyer",
    "role.seller": "Seller",
  },
  es: {
    "nav.browse": "Explorar",
    "nav.sets": "Sets",
    "nav.priceGuide": "Guía de precios",
    "nav.sell": "Vender",
    "nav.signIn": "Iniciar sesión",
    "nav.sellCards": "Vender cartas",
    "nav.howItWorks": "Cómo funciona",
    "nav.sellerPortal": "Portal vendedor",
    "nav.myDashboard": "Mi Panel",
    "nav.startSelling": "Empezar a vender",
    "search.placeholder": "Busca Charizard ex, sets, producto sellado…",
    "search.cta": "Buscar",
    "role.buyer": "Comprador",
    "role.seller": "Vendedor",
  },
};

type LanguageContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: string) => string;
};

const LanguageContext = React.createContext<LanguageContextValue | null>(null);

export function LanguageProvider({
  children,
  defaultLang = "en",
}: {
  children: React.ReactNode;
  defaultLang?: Lang;
}) {
  const [lang, setLang] = React.useState<Lang>(defaultLang);

  const value = React.useMemo<LanguageContextValue>(
    () => ({
      lang,
      setLang,
      t: (key: string) => STRINGS[lang][key] ?? STRINGS.en[key] ?? key,
    }),
    [lang],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = React.useContext(LanguageContext);
  if (!ctx)
    throw new Error("useLanguage must be used within a LanguageProvider");
  return ctx;
}
