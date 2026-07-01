"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/dc/theme-toggle";
import { Icon } from "@/components/dc/icon";

export type NavItem = { id: string; label: string };
export type NavGroup = { title: string; items: NavItem[] };

export const DS_NAV: NavGroup[] = [
  {
    title: "Foundations",
    items: [
      { id: "brand", label: "Brand & Logo" },
      { id: "color", label: "Color" },
      { id: "type", label: "Typography" },
      { id: "spacing", label: "Spacing & Radius" },
      { id: "elevation", label: "Elevation" },
      { id: "motion", label: "Motion" },
    ],
  },
  {
    title: "Components",
    items: [
      { id: "buttons", label: "Buttons" },
      { id: "badges", label: "Badges & Chips" },
      { id: "status", label: "Status System" },
      { id: "forms", label: "Forms" },
      { id: "nav-comp", label: "Navigation" },
      { id: "cards", label: "Product Cards" },
      { id: "price-cmp", label: "Price Comparison" },
      { id: "inbox", label: "Inbox Rows" },
      { id: "cardart", label: "Card Art" },
      { id: "icons", label: "Iconography" },
    ],
  },
];

/** Tracks which section is in view to drive the active nav link. */
function useScrollSpy(ids: string[]) {
  const [active, setActive] = React.useState(ids[0]);

  React.useEffect(() => {
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-20% 0px -70% 0px" },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [ids]);

  return active;
}

export function Sidebar() {
  const ids = React.useMemo(
    () => DS_NAV.flatMap((g) => g.items.map((i) => i.id)),
    [],
  );
  const active = useScrollSpy(ids);

  // Mobile: the sidebar collapses into an off-canvas drawer opened from the
  // sticky mobile header. Desktop keeps the always-visible fixed sidebar and
  // ignores this state entirely (the drawer/header CSS is media-query gated).
  const [open, setOpen] = React.useState(false);
  const menuBtnRef = React.useRef<HTMLButtonElement>(null);
  const closeRef = React.useRef<HTMLButtonElement>(null);
  const closeDrawer = React.useCallback(() => setOpen(false), []);

  React.useEffect(() => {
    if (!open) return;
    const menuEl = menuBtnRef.current;
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
      menuEl?.focus();
    };
  }, [open]);

  return (
    <>
      {/* Mobile-only sticky header — theme + version always reachable, plus a
          menu button that opens the section-nav drawer. */}
      <header className="ds-mobile-header">
        <div className="ds-mobile-brand">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/deckcenter-mark.svg" alt="" />
          <div>
            <span className="ds-logo-text">Sleeve System</span>
            <span className="ds-logo-sub">v2.1</span>
          </div>
        </div>
        <div className="ds-mobile-actions">
          <ThemeToggle />
          <button
            type="button"
            className="ds-mobile-menu-btn"
            aria-label="Open sections menu"
            aria-expanded={open}
            ref={menuBtnRef}
            onClick={() => setOpen(true)}
          >
            <Icon name="menu" size={22} />
          </button>
        </div>
      </header>

      <div
        className={cn("ds-sidebar-backdrop", open && "open")}
        aria-hidden="true"
        onClick={closeDrawer}
      />

      <aside className={cn("ds-sidebar", open && "open")}>
        <div className="ds-logo">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/deckcenter-mark.svg" alt="" />
          <div>
            <span className="ds-logo-text">Sleeve System</span>
            <span className="ds-logo-sub">Design System · v2.1</span>
          </div>
          <button
            type="button"
            className="ds-sidebar-close"
            aria-label="Close sections menu"
            ref={closeRef}
            onClick={closeDrawer}
          >
            <Icon name="close" size={20} />
          </button>
        </div>
        <nav className="ds-nav" aria-label="Design system sections">
          {DS_NAV.map((group) => (
            <React.Fragment key={group.title}>
              <div className="ds-nav-group">{group.title}</div>
              {group.items.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={cn(active === item.id && "on")}
                  onClick={closeDrawer}
                >
                  {item.label}
                </a>
              ))}
            </React.Fragment>
          ))}
        </nav>
        <div className="ds-footer">
          <span className="ds-footer-ver">2026 · PixelPie Studio</span>
          <ThemeToggle />
        </div>
      </aside>
    </>
  );
}
