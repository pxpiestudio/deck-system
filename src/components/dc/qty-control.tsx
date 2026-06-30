"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

type QtyControlProps = {
  value?: number;
  defaultValue?: number;
  min?: number;
  max?: number;
  onValueChange?: (value: number) => void;
  className?: string;
};

/** Borderless +/- stepper used in cart rows and the product detail page. */
export function QtyControl({
  value,
  defaultValue = 1,
  min = 1,
  max = 99,
  onValueChange,
  className,
}: QtyControlProps) {
  const isControlled = value !== undefined;
  const [internal, setInternal] = React.useState(defaultValue);
  const current = isControlled ? value : internal;

  const set = (next: number) => {
    const clamped = Math.min(max, Math.max(min, next));
    if (!isControlled) setInternal(clamped);
    onValueChange?.(clamped);
  };

  return (
    <span className={cn("qty-ctrl", className)}>
      <button
        type="button"
        onClick={() => set(current - 1)}
        disabled={current <= min}
        aria-label="Decrease quantity"
      >
        −
      </button>
      <span aria-live="polite">{current}</span>
      <button
        type="button"
        onClick={() => set(current + 1)}
        disabled={current >= max}
        aria-label="Increase quantity"
      >
        +
      </button>
    </span>
  );
}
