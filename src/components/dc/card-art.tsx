import * as React from "react";

import { cn } from "@/lib/utils";

type CardArtProps = React.ComponentProps<"div"> & {
  /** Hue 0–360 — seeds the radial-gradient art + holo shimmer. */
  hue?: number;
  /** Set / number caption rendered in the corner (e.g. "151 · 199/165"). */
  label?: string;
  /** Render the holo shimmer overlay. */
  holo?: boolean;
};

/**
 * `.tcard` placeholder — generates a hue-tinted card-art background from a
 * single CSS variable `--h`. Stand-in for real card imagery; swap the gradient
 * for an <img> when art is available.
 */
export function CardArt({
  hue = 320,
  label,
  holo = true,
  className,
  style,
  ...props
}: CardArtProps) {
  return (
    <div
      className={cn("tcard", className)}
      style={{ ["--h" as string]: hue, ...style }}
      {...props}
    >
      {holo && <span className="holo" />}
      {label && (
        <span className="label">
          <span className="ph">{label}</span>
        </span>
      )}
    </div>
  );
}
