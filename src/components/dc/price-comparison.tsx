import * as React from "react";

import { cn } from "@/lib/utils";

export type StorePrice = {
  store: string;
  /** Small square logo: a brand colour + single glyph. */
  logo: { color: string; glyph: string };
  price: string;
  /** Delta vs. the best (Deckcenter) price, e.g. "+$45.50". */
  over: string;
  /** Tag this row as a market-average reference. */
  marketAvg?: boolean;
};

function StoreLogo({ color, glyph }: StorePrice["logo"]) {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true">
      <rect width="22" height="22" rx="6" fill={color} />
      <text
        x="11"
        y="15.5"
        textAnchor="middle"
        fill="white"
        fontSize={glyph.length > 1 ? 11 : 13}
        fontWeight="800"
        fontFamily="system-ui"
      >
        {glyph}
      </text>
    </svg>
  );
}

type PriceComparisonProps = {
  stores: StorePrice[];
  /** Footer summary line, e.g. best price + savings. */
  footer?: React.ReactNode;
  className?: string;
};

/**
 * Horizontal tiles comparing price across external marketplaces. Deckcenter is
 * implied as the context, so it's omitted from the list and surfaced in the
 * footer as the best price.
 */
export function PriceComparison({
  stores,
  footer,
  className,
}: PriceComparisonProps) {
  return (
    <div className={cn(className)}>
      <div className="cmp-table">
        {stores.map((s) => (
          <div key={s.store} className="cmp-row">
            <div className="flex w-full items-center justify-between gap-1">
              <div className="flex items-center gap-[7px]">
                <StoreLogo {...s.logo} />
                <span className="cmp-store">{s.store}</span>
              </div>
              {s.marketAvg && <span className="cmp-market-tag">Mkt avg</span>}
            </div>
            <span className="cmp-price">{s.price}</span>
            <span className="cmp-over">{s.over}</span>
          </div>
        ))}
      </div>
      {footer && <div className="cmp-footer">{footer}</div>}
    </div>
  );
}
