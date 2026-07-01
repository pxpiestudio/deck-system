"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { CardArt } from "@/components/dc/card-art";

export type InboxCheckbox = {
  checked: boolean;
  onChange: (checked: boolean) => void;
};

type InboxRowProps = {
  hue: number;
  title: string;
  subtitle: string;
  /** Optional pickup / context note rendered as a purple pill. */
  note?: string;
  /** Status chip on the right (already a node, e.g. <StatusBadge/>). */
  status?: React.ReactNode;
  /** Trailing column — price + date, or an action button. */
  trailing?: React.ReactNode;
  /** Renders a leading bulk-select checkbox. */
  checkbox?: InboxCheckbox;
  /** Dim the row (e.g. completed / past orders). */
  dim?: boolean;
  /** Tint the row background (e.g. selected). */
  selected?: boolean;
  className?: string;
};

/**
 * Dense list row: `checkbox · thumbnail · title/subtitle · status · trailing`.
 * Named CSS grid areas (`.ib-row` in globals.css) let the same markup reflow
 * from one dense desktop line to a stacked mobile card without duplicating
 * JSX — see the `max-width: 640px` override there.
 */
export function InboxRow({
  hue,
  title,
  subtitle,
  note,
  status,
  trailing,
  checkbox,
  dim = false,
  selected = false,
  className,
}: InboxRowProps) {
  return (
    <div
      className={cn(
        "ib-row border-b border-border-soft px-[14px] py-[11px] last:border-b-0",
        checkbox && "ib-row--checkbox",
        selected
          ? "bg-[color-mix(in_oklch,var(--accent)_5%,transparent)]"
          : "bg-surface",
        className,
      )}
    >
      {checkbox && (
        <button
          type="button"
          role="checkbox"
          aria-checked={checkbox.checked}
          aria-label={`Select ${title}`}
          onClick={() => checkbox.onChange(!checkbox.checked)}
          className={cn(
            "ib-checkbox grid size-4 place-items-center rounded text-[9px] font-extrabold text-white transition-colors",
            checkbox.checked
              ? "bg-accent"
              : "border-[1.5px] border-border-strong bg-transparent",
          )}
        >
          {checkbox.checked ? "✓" : ""}
        </button>
      )}

      {/*
       * `dim` fades only the thumbnail, not text — opacity on text content
       * scales every text color toward the background and reliably drops
       * otherwise-AA-compliant colors (muted, faint) below 4.5:1, since they
       * already sit close to the threshold at full opacity.
       */}
      <CardArt
        hue={hue}
        holo={false}
        className={cn("ib-thumb h-11 w-8 shrink-0 rounded-md", dim && "opacity-55")}
      />

      <div className="ib-title min-w-0 truncate font-head text-[13.5px] font-bold">{title}</div>
      <div className="ib-subtitle min-w-0 truncate text-[11px] text-muted">{subtitle}</div>
      {note && (
        <div className="ib-note min-w-0 truncate inline-flex items-center gap-1 rounded-full bg-[color-mix(in_oklch,var(--purple)_12%,transparent)] px-[9px] py-0.5 font-head text-[11px] font-semibold text-purple-text">
          {note}
        </div>
      )}

      <div className="ib-status">{status ?? <span />}</div>

      <div className="ib-trailing text-right">{trailing}</div>
    </div>
  );
}
