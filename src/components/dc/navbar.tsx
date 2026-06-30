"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Icon } from "@/components/dc/icon";
import { Button } from "@/components/ui/button";
import { RoleSwitcher } from "@/components/dc/role-switcher";
import { useLanguage } from "@/components/providers/language-provider";

export type NavState = "guest" | "buyer" | "seller";

type NavbarProps = {
  state?: NavState;
  cartCount?: number;
  avatar?: string;
  className?: string;
};

const NAV_LINKS = ["nav.browse", "nav.sets", "nav.priceGuide", "nav.sell"] as const;

function LangPills() {
  const { lang, setLang } = useLanguage();
  return (
    <>
      <button
        type="button"
        className={cn("nu-btn", lang === "en" && "on")}
        aria-pressed={lang === "en"}
        onClick={() => setLang("en")}
      >
        EN
      </button>
      <span className="nu-sep" />
      <button
        type="button"
        className={cn("nu-btn", lang === "es" && "on")}
        aria-pressed={lang === "es"}
        onClick={() => setLang("es")}
      >
        ES
      </button>
    </>
  );
}

function CartButton({ count }: { count: number }) {
  return (
    <button type="button" className="nav-cart-btn" aria-label={`Cart, ${count} items`}>
      <Icon name="cart" size={20} />
      {count > 0 && <span className="nav-cart-badge">{count}</span>}
    </button>
  );
}

/**
 * Marketplace navigation — a thin navy utility strip above the main bar.
 * Auth state drives the right-side slot: guest, buyer and seller each render a
 * distinct action group.
 */
export function Navbar({
  state = "guest",
  cartCount = 6,
  avatar = "VK",
  className,
}: NavbarProps) {
  const { t } = useLanguage();

  return (
    <div className={cn("overflow-hidden rounded-[var(--radius)] border border-border-soft", className)}>
      {/* Utility strip */}
      <div className="nav-utility">
        <div className="nav-utility-inner">
          {state === "seller" && (
            <>
              <button type="button" className="nu-link font-bold text-accent">
                {t("nav.myDashboard")}
              </button>
              <span className="nu-sep" />
            </>
          )}
          {state === "guest" && (
            <>
              <button type="button" className="nu-link">
                {t("nav.sellerPortal")}
              </button>
              <span className="nu-sep" />
            </>
          )}
          <button type="button" className="nu-link">
            {t("nav.howItWorks")}
          </button>
          <span className="nu-sp flex-1" />
          <LangPills />
        </div>
      </div>

      {/* Main bar */}
      <div className="nav-main">
        <div className="nav-inner">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="nav-logo" src="/assets/deckcenter-logo.svg" alt="Deckcenter" />
          <div className="nav-links">
            {NAV_LINKS.map((key) => (
              <button key={key} type="button" className="nav-link">
                {t(key)}
              </button>
            ))}
          </div>
          <span className="nav-spacer" />
          <div className="nav-actions">
            <CartButton count={cartCount} />

            {state === "guest" && (
              <>
                <Button variant="quiet" size="sm">
                  {t("nav.signIn")}
                </Button>
                <Button variant="primary" size="sm">
                  {t("nav.sellCards")}
                </Button>
              </>
            )}

            {state === "buyer" && (
              <>
                <Button variant="quiet" size="sm" className="gap-1.5 text-[13px] text-muted">
                  {t("nav.startSelling")} <span className="opacity-50">→</span>
                </Button>
                <div className="nav-avatar">{avatar}</div>
              </>
            )}

            {state === "seller" && (
              <>
                <RoleSwitcher
                  defaultValue="seller"
                  labels={{ buyer: t("role.buyer"), seller: t("role.seller") }}
                />
                <div className="nav-avatar">{avatar}</div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
