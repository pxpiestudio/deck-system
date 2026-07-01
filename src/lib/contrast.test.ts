import { describe, it, expect } from "vitest";
import {
  contrastRatio,
  compositeOver,
  meetsWcagAA,
  requiredRatio,
  type Hex,
  type TextSizeClass,
} from "@/lib/contrast";

/**
 * Design tokens mirrored from `src/app/globals.css`. Keep these two literal
 * objects in sync with `:root` / `.dark` by hand — they're the source of
 * truth this test checks *against*, so they must not import the live CSS.
 *
 * `*Text` fields are the WCAG-AA-safe variants of the brand/signal colors,
 * used wherever the color is the *text* itself rather than a decorative
 * fill (dot, icon, background). They diverge from the base color and from
 * each other per theme — see the comment above `--accent-text` in
 * globals.css for why a single shared value can't satisfy both themes.
 */
const light = {
  navy: "#121427",
  accent: "#de0e7f",
  purple: "#8a2bb8",
  success: "#1fad66",
  danger: "#e0466b",
  amber: "#f0a030",
  info: "#2a6fdb",
  bg: "#f4f6fc",
  bg2: "#eaeefa",
  surface: "#ffffff",
  surface2: "#f3f5fc",
  text: "#14172b",
  muted: "#616892",
  faint: "#666a82",
  navySurface: "#14172b",
  onNavy: "#e8edf9",
  accentText: "#b20b66",
  successText: "#147042",
  dangerText: "#ce4163",
  amberText: "#895b1b",
  infoText: "#235db8",
  purpleText: "#8a2bb8",
} as const satisfies Record<string, Hex>;

const dark = {
  accent: "#de0e7f",
  purple: "#8a2bb8",
  success: "#1fad66",
  danger: "#e0466b",
  amber: "#f0a030",
  info: "#2a6fdb",
  bg: "#0a0c18",
  bg2: "#0e1124",
  surface: "#15182c",
  surface2: "#1c2038",
  text: "#e8edf9",
  muted: "#9aa0c4",
  faint: "#8388aa",
  navySurface: "#1c2038",
  onNavy: "#e8edf9",
  accentText: "#e85ba8",
  successText: "#1fad66",
  dangerText: "#e14d70",
  amberText: "#f0a030",
  infoText: "#4b85e1",
  purpleText: "#ac6acd",
} as const satisfies Record<string, Hex>;

/**
 * `color-mix(in oklch, X N%, transparent)` does NOT darken/desaturate the
 * same way plain alpha-blending a flattened hex would suggest — mixing
 * toward `transparent` in a polar space like oklch interpolates lightness
 * and chroma premultiplied by alpha, which the browser then composites
 * differently than a naive sRGB blend. Rather than re-deriving that math
 * (verified to drift from real rendering), these are the actual pixel
 * colors sampled from the rendered badges/chips via Playwright — see the
 * "sample tint backgrounds" note in AGENTS.md if these ever need
 * re-measuring after a token change.
 *
 * `accentSoft` is the worst (lightest, in dark mode) of its real
 * occurrences — `.ds-code`/`.ds-nav a.on` render `--accent-soft` over
 * whichever of `--bg`/`--surface`/`--bg-2`/`--surface-2` happens to be the
 * immediate ancestor, and a translucent color-mix composites differently
 * over each one. The `.sb-*`/`.badge.grade` tints don't have this problem —
 * they're only ever rendered over `--bg-2` in this design system (confined
 * to the `#badges`/`#status` demo canvases), so a single measurement covers
 * them.
 */
const measuredTints = {
  light: {
    accentSoft: "#e8cee8",
    pending: "#ebe2db",
    confirmed: "#d0ddf5",
    delivered: "#cde4e4",
    shipped: "#dcd2f0",
    grade: "#daceef",
  },
  dark: {
    accentSoft: "#371d42",
    pending: "#2f2625",
    confirmed: "#111c3b",
    delivered: "#10262c",
    shipped: "#1f1438",
    grade: "#21153c",
  },
} as const satisfies Record<"light" | "dark", Record<string, Hex>>;

type Fixture = {
  /** CSS rule / component this pair comes from, for traceability. */
  source: string;
  fg: Hex;
  bg: Hex;
  size: TextSizeClass;
};

function buildFixtures(t: typeof light | typeof dark, theme: "light" | "dark"): Fixture[] {
  const tint = measuredTints[theme];
  const navyChipBg = compositeOver(t.navySurface, 0.88, t.surface);
  const nuBtnFg = compositeOver(t.onNavy, 0.65, t.navySurface);
  const nuLinkFg = compositeOver(t.onNavy, 0.58, t.navySurface);

  return [
    { source: "body on --bg", fg: t.text, bg: t.bg, size: "normal" },
    { source: "body on --surface", fg: t.text, bg: t.surface, size: "normal" },
    { source: ".ds-nav a / .pcard-meta — muted on --surface", fg: t.muted, bg: t.surface, size: "normal" },
    { source: ".badge / .rs-opt / .sb-sold — muted on --surface-2", fg: t.muted, bg: t.surface2, size: "normal" },
    { source: ".ds-lead — muted on --bg", fg: t.muted, bg: t.bg, size: "normal" },
    { source: ".cmp-footer — muted on --bg-2", fg: t.muted, bg: t.bg2, size: "normal" },
    { source: ".ds-logo-sub / .pcard-price .lbl — faint on --surface", fg: t.faint, bg: t.surface, size: "normal" },
    { source: "faint on --bg", fg: t.faint, bg: t.bg, size: "normal" },
    { source: "faint on --bg-2 (e.g. icon-name captions inside .ds-canvas)", fg: t.faint, bg: t.bg2, size: "normal" },
    { source: ".cmp-over — faint on --surface-2", fg: t.faint, bg: t.surface2, size: "normal" },
    { source: ".ds-eyebrow — accent-text on --bg", fg: t.accentText, bg: t.bg, size: "normal" },
    { source: ".ds-code / .sb-active / .ds-nav a.on — accent-text on --accent-soft (measured)", fg: t.accentText, bg: tint.accentSoft, size: "normal" },
    { source: ".delta.up — success-text on --surface", fg: t.successText, bg: t.surface, size: "normal" },
    { source: ".delta.down — danger-text on --surface", fg: t.dangerText, bg: t.surface, size: "normal" },
    { source: "--amber-text on --surface (signal token guard)", fg: t.amberText, bg: t.surface, size: "normal" },
    { source: "--info-text on --surface (signal token guard)", fg: t.infoText, bg: t.surface, size: "normal" },
    { source: ".badge.grade — purple-text on its tint (measured)", fg: t.purpleText, bg: tint.grade, size: "normal" },
    { source: ".sb-pending — amber-text on amber tint (measured)", fg: t.amberText, bg: tint.pending, size: "normal" },
    { source: ".sb-confirmed — info-text on its tint (measured)", fg: t.infoText, bg: tint.confirmed, size: "normal" },
    { source: ".sb-shipped — purple-text on its tint (measured)", fg: t.purpleText, bg: tint.shipped, size: "normal" },
    { source: ".sb-delivered — success-text on its tint (measured)", fg: t.successText, bg: tint.delivered, size: "normal" },
    { source: ".lang-opt.on / .rs-opt.on / .nav-avatar / .nav-cart-badge — white on accent", fg: "#ffffff", bg: t.accent, size: "normal" },
    { source: ".pcard-chip (RarityChip) — on-navy on navy chip tint", fg: t.onNavy, bg: navyChipBg, size: "normal" },
    { source: ".nu-link — on-navy @ 58% on navy-surface", fg: nuLinkFg, bg: t.navySurface, size: "normal" },
    { source: ".nu-btn — on-navy @ 65% on navy-surface", fg: nuBtnFg, bg: t.navySurface, size: "normal" },
    { source: ".cmp-price — text on --surface-2, 20px/700 (large)", fg: t.text, bg: t.surface2, size: "large" },
  ];
}

describe.each([
  ["light", buildFixtures(light, "light")],
  ["dark", buildFixtures(dark, "dark")],
] as const)("WCAG 2 AA contrast — %s theme", (_theme, fixtures) => {
  it.each(fixtures)("$source ($fg on $bg) meets AA for $size text", ({ fg, bg, size }) => {
    const ratio = contrastRatio(fg, bg);
    const required = requiredRatio(size);
    expect(
      meetsWcagAA(ratio, size),
      `expected ${fg} on ${bg} to reach ${required}:1 for ${size} text, got ${ratio.toFixed(2)}:1`,
    ).toBe(true);
  });
});
