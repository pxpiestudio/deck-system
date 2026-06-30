import * as React from "react";

/**
 * Hand-drawn, Lucide-style stroke icons rendered inline as SVG — no icon font
 * or sprite, so each icon is directly editable and colour-inheritable
 * (`stroke="currentColor"`). Paths ported verbatim from the prototype.
 */
export const ICON_PATHS = {
  search: ["M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14z", "m20 20-3.2-3.2"],
  arrow: ["M5 12h14", "m13 6 6 6-6 6"],
  arrowL: ["M19 12H5", "m11 18-6-6 6-6"],
  bolt: ["M13 2 4.5 13.5H11l-1 8.5L18.5 10H12z"],
  heart: [
    "M12 20s-7-4.6-9.3-9C1.2 8 2.6 4.5 6 4.5c2 0 3.2 1.2 4 2.3.8-1.1 2-2.3 4-2.3 3.4 0 4.8 3.5 3.3 6.5C19 15.4 12 20 12 20z",
  ],
  up: ["m6 15 6-6 6 6"],
  down: ["m6 9 6 6 6-6"],
  check: ["m4 12 5 5L20 6"],
  shield: ["M12 3 5 6v5c0 4.5 3 7.5 7 9 4-1.5 7-4.5 7-9V6z", "m9 12 2 2 4-4"],
  tag: ["M3 12V5a2 2 0 0 1 2-2h7l9 9-9 9z", "M7.5 7.5h.01"],
  bag: ["M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z", "M3 6h18", "M16 10a4 4 0 0 1-8 0"],
  layers: ["m12 3 9 5-9 5-9-5z", "m3 13 9 5 9-5"],
  scale: ["M12 4v16", "M5 8h14", "m5 8-2.5 6a3 3 0 0 0 5 0z", "m19 8-2.5 6a3 3 0 0 0 5 0z"],
  sun: [
    "M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10z",
    "M12 2v2M12 20v2M4 12H2M22 12h-2M5 5 4 4M20 20l-1-1M19 5l1-1M4 20l1-1",
  ],
  moon: ["M20 14A8 8 0 0 1 10 4a8 8 0 1 0 10 10z"],
  upload: [
    "M12 16V4",
    "m7 9 5-5 5 5",
    "M4 17v2a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-2",
  ],
  spark: [
    "M12 3v4M12 17v4M3 12h4M17 12h4",
    "m6 6 2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18",
  ],
  store: ["M4 9h16l-1-5H5z", "M5 9v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9", "M9 20v-6h6v6"],
  user: ["M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8z", "M5 20c0-3.3 3-6 7-6s7 2.7 7 6"],
  cart: ["M3 4h2l2 12h11l2-8H7", "M9 20a1 1 0 1 0 0 .01M18 20a1 1 0 1 0 0 .01"],
  cart2: [
    "M9 19a1 1 0 1 0 0 .01M20 19a1 1 0 1 0 0 .01",
    "M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6",
  ],
  globe: [
    "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z",
    "M3 12h18",
    "M12 3c2.5 2.4 2.5 15.6 0 18M12 3c-2.5 2.4-2.5 15.6 0 18",
  ],
  menu: ["M4 6h16", "M4 12h16", "M4 18h16"],
  close: ["M18 6 6 18", "m6 6 12 12"],
  instagram: [
    "M2 7a5 5 0 0 1 5-5h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7z",
    "M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z",
    "M17.5 6.5h.01",
  ],
  xtwitter: ["M4 4 20 20", "M20 4 4 20"],
  discord: [
    "M9 12h.01M15 12h.01",
    "M7.5 4.5A13 13 0 0 0 3 11c0 5.3 4 9.5 9 9.5S21 16.3 21 11a13 13 0 0 0-4.5-6.5",
    "M7.5 19.5c0 1 .4 2 .5 2.5M16.5 19.5c0 1-.4 2-.5 2.5",
  ],
} as const;

export type IconName = keyof typeof ICON_PATHS;

type IconProps = Omit<React.SVGProps<SVGSVGElement>, "name"> & {
  name: IconName;
  size?: number;
  /** Stroke width — defaults to 2. */
  sw?: number;
};

export function Icon({ name, size = 18, sw = 2, ...props }: IconProps) {
  const d = ICON_PATHS[name] ?? [];
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={sw}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {d.map((p, i) => (
        <path key={i} d={p} />
      ))}
    </svg>
  );
}
