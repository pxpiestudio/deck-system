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
 * Dense list row: `checkbox · thumbnail · info · status · trailing`.
 * Scales to hundreds of orders without a card grid.
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
        "grid items-center gap-3 border-b border-border-soft px-[14px] py-[11px] last:border-b-0",
        selected
          ? "bg-[color-mix(in_oklch,var(--accent)_5%,transparent)]"
          : "bg-surface",
        dim && "opacity-55",
        className,
      )}
      style={{
        gridTemplateColumns: checkbox
          ? "20px 32px 1fr auto auto"
          : "32px 1fr auto auto",
      }}
    >
      {checkbox && (
        <button
          type="button"
          role="checkbox"
          aria-checked={checkbox.checked}
          aria-label={`Select ${title}`}
          onClick={() => checkbox.onChange(!checkbox.checked)}
          className={cn(
            "grid size-4 place-items-center rounded text-[9px] font-extrabold text-white transition-colors",
            checkbox.checked
              ? "bg-accent"
              : "border-[1.5px] border-border-strong bg-transparent",
          )}
        >
          {checkbox.checked ? "✓" : ""}
        </button>
      )}

      <CardArt
        hue={hue}
        holo={false}
        className="h-11 w-8 shrink-0 rounded-md"
      />

      <div className="min-w-0">
        <div className="truncate font-head text-[13.5px] font-bold">{title}</div>
        <div className="mt-[3px] truncate text-[11px] text-muted">{subtitle}</div>
        {note && (
          <div className="mt-[5px] inline-flex items-center gap-1 rounded-full bg-[color-mix(in_oklch,var(--purple)_12%,transparent)] px-[9px] py-0.5 font-head text-[11px] font-semibold text-purple">
            {note}
          </div>
        )}
      </div>

      {status ?? <span />}

      <div className="text-right">{trailing}</div>
    </div>
  );
}
