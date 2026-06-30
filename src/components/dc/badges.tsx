import * as React from "react";

import { cn } from "@/lib/utils";

/* ── Grade / condition badge ──────────────────────────────────────────────
   `graded` (PSA / CGC numeric grades) reads purple; raw conditions (NM/LP/MP)
   read neutral. Both consume the mapped `--purple` / surface tokens.
-------------------------------------------------------------------------- */
export function GradeBadge({
  className,
  graded = false,
  ...props
}: React.ComponentProps<"span"> & { graded?: boolean }) {
  return (
    <span className={cn("badge", graded && "grade", className)} {...props} />
  );
}

/* ── Rarity / card-type chip ──────────────────────────────────────────────
   The navy chip that sits over card art. Static by default; ProductCard
   positions it absolutely.
-------------------------------------------------------------------------- */
export function RarityChip({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-[7px] bg-[color-mix(in_oklch,var(--navy-surface)_88%,transparent)] px-[9px] py-[5px] font-head text-[10.5px] font-bold uppercase tracking-[0.04em] text-on-navy",
        className,
      )}
      {...props}
    />
  );
}

/* ── Order status bar label (.sb) ─────────────────────────────────────────
   Drives both the buyer Purchases lifecycle and the seller Selling lifecycle.
-------------------------------------------------------------------------- */
export const STATUS_TONES = [
  "active",
  "sold",
  "pending",
  "confirmed",
  "shipped",
  "delivered",
] as const;

export type StatusTone = (typeof STATUS_TONES)[number];

export function StatusBadge({
  tone,
  className,
  children,
  ...props
}: React.ComponentProps<"span"> & { tone: StatusTone }) {
  return (
    <span className={cn("sb", `sb-${tone}`, className)} {...props}>
      {children}
    </span>
  );
}
