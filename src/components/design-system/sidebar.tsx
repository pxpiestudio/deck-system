"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/dc/theme-toggle";

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

  return (
    <aside className="ds-sidebar">
      <div className="ds-logo">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/deckcenter-mark.svg" alt="" />
        <div>
          <span className="ds-logo-text">Deckcenter</span>
          <span className="ds-logo-sub">Design System · v2.0</span>
        </div>
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
              >
                {item.label}
              </a>
            ))}
          </React.Fragment>
        ))}
      </nav>
      <div className="ds-footer">
        <span className="ds-footer-ver">2026 · DC Design</span>
        <ThemeToggle />
      </div>
    </aside>
  );
}
