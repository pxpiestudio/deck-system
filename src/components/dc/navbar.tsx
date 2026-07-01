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
  const [open, setOpen] = React.useState(false);
  const hamburgerRef = React.useRef<HTMLButtonElement>(null);
  const closeRef = React.useRef<HTMLButtonElement>(null);
  const closeMenu = React.useCallback(() => setOpen(false), []);

  React.useEffect(() => {
    if (!open) return;
    const hamburgerEl = hamburgerRef.current;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      hamburgerEl?.focus();
    };
  }, [open]);

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
          <button
            type="button"
            className="nav-hamburger"
            aria-label="Open menu"
            aria-expanded={open}
            ref={hamburgerRef}
            onClick={() => setOpen(true)}
          >
            <Icon name="menu" size={22} />
          </button>
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
                <Button variant="quiet" size="sm" className="nav-actions-desktop-only">
                  {t("nav.signIn")}
                </Button>
                <Button variant="primary" size="sm" className="nav-actions-desktop-only">
                  {t("nav.sellCards")}
                </Button>
              </>
            )}

            {state === "buyer" && (
              <>
                <Button
                  variant="quiet"
                  size="sm"
                  className="nav-actions-desktop-only gap-1.5 text-[13px] text-muted"
                >
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
                  className="nav-actions-desktop-only"
                />
                <div className="nav-avatar">{avatar}</div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile nav drawer */}
      <div
        className={cn("nav-drawer-backdrop", open && "open")}
        aria-hidden="true"
        onClick={closeMenu}
      />
      <div
        className={cn("nav-drawer", open && "open")}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        inert={!open || undefined}
      >
        <div className="nav-drawer-head">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="nav-logo" src="/assets/deckcenter-logo.svg" alt="Deckcenter" />
          <button
            type="button"
            className="nav-drawer-close"
            aria-label="Close menu"
            ref={closeRef}
            onClick={closeMenu}
          >
            <Icon name="close" size={20} />
          </button>
        </div>
        <nav className="nav-drawer-links">
          {NAV_LINKS.map((key) => (
            <button key={key} type="button" className="nav-drawer-link" onClick={closeMenu}>
              {t(key)}
            </button>
          ))}
        </nav>
        <div className="nav-drawer-foot">
          {state === "guest" && (
            <>
              <Button variant="ghost" className="w-full" onClick={closeMenu}>
                {t("nav.signIn")}
              </Button>
              <Button variant="primary" className="w-full" onClick={closeMenu}>
                {t("nav.sellCards")}
              </Button>
            </>
          )}
          {state === "buyer" && (
            <Button variant="primary" className="w-full" onClick={closeMenu}>
              {t("nav.startSelling")}
            </Button>
          )}
          {state === "seller" && (
            <RoleSwitcher
              defaultValue="seller"
              labels={{ buyer: t("role.buyer"), seller: t("role.seller") }}
              className="w-full"
            />
          )}
        </div>
      </div>
    </div>
  );
}
