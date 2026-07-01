/**
 * WCAG 2 relative-luminance / contrast-ratio math (1.4.3 / 1.4.11).
 * https://www.w3.org/TR/WCAG21/#dfn-relative-luminance
 */

export type Hex = `#${string}`;

function hexToRgb(hex: Hex): [number, number, number] {
  let h = hex.slice(1);
  if (h.length === 3) {
    h = h
      .split("")
      .map((c) => c + c)
      .join("");
  }
  const n = parseInt(h, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function srgbToLinear(c: number): number {
  const v = c / 255;
  return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
}

function relativeLuminance(hex: Hex): number {
  const [r, g, b] = hexToRgb(hex).map(srgbToLinear);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/** WCAG contrast ratio between two opaque colors, 1–21. */
export function contrastRatio(fg: Hex, bg: Hex): number {
  const l1 = relativeLuminance(fg);
  const l2 = relativeLuminance(bg);
  const [lighter, darker] = l1 > l2 ? [l1, l2] : [l2, l1];
  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Alpha-composite `fg` (at `alpha`, 0–1) over opaque `bg`, returning the
 * resulting opaque hex. Correct for plain `rgba()`/alpha-blended colors
 * (e.g. the `.nu-link`/`.nu-btn` translucent text). NOT a substitute for
 * `color-mix(in oklch, fg N%, transparent)` — oklch's polar interpolation
 * composites differently than a flat sRGB blend and can diverge enough to
 * flip an AA verdict (confirmed against real rendered pixels while tuning
 * the `--*-text` tokens). For those cases, measure the rendered color
 * directly instead — see `measuredTints` in `contrast.test.ts`.
 */
export function compositeOver(fg: Hex, alpha: number, bg: Hex): Hex {
  const [r1, g1, b1] = hexToRgb(fg);
  const [r2, g2, b2] = hexToRgb(bg);
  const mix = (a: number, b: number) => Math.round(a * alpha + b * (1 - alpha));
  const toHex = (n: number) => n.toString(16).padStart(2, "0");
  return `#${toHex(mix(r1, r2))}${toHex(mix(g1, g2))}${toHex(mix(b1, b2))}` as Hex;
}

export type TextSizeClass =
  /** Default body/UI text — requires 4.5:1. */
  | "normal"
  /** >=24px regular or >=18.66px (14pt) bold — requires 3:1. */
  | "large"
  /** Non-text UI component boundaries (borders, icons, focus rings) — requires 3:1. */
  | "ui";

const AA_THRESHOLD: Record<TextSizeClass, number> = {
  normal: 4.5,
  large: 3,
  ui: 3,
};

export function requiredRatio(sizeClass: TextSizeClass): number {
  return AA_THRESHOLD[sizeClass];
}

export function meetsWcagAA(ratio: number, sizeClass: TextSizeClass): boolean {
  return ratio >= requiredRatio(sizeClass);
}
