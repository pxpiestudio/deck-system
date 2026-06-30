import * as React from "react";

import { cn } from "@/lib/utils";
import { CardArt } from "@/components/dc/card-art";
import { RarityChip } from "@/components/dc/badges";
import { Icon } from "@/components/dc/icon";

export type PriceDelta = {
  dir: "up" | "down";
  value: string;
};

type ProductCardProps = React.ComponentProps<"div"> & {
  hue: number;
  name: string;
  meta: string;
  /** Caption shown inside the art placeholder. */
  artLabel?: string;
  rarity?: string;
  priceLabel?: string;
  price: string;
  listings?: string;
  delta?: PriceDelta;
  favorited?: boolean;
  onToggleFavorite?: () => void;
};

/**
 * Core marketplace surface — a hue-tinted art placeholder paired with a
 * heading-font title, monospace-flavoured meta and a magenta price.
 */
export function ProductCard({
  hue,
  name,
  meta,
  artLabel,
  rarity,
  priceLabel = "from",
  price,
  listings,
  delta,
  favorited = false,
  onToggleFavorite,
  className,
  ...props
}: ProductCardProps) {
  return (
    <div className={cn("pcard", className)} {...props}>
      <div className="pcard-art">
        {rarity && <RarityChip className="absolute left-2.5 top-2.5 z-[4]">{rarity}</RarityChip>}
        <button
          type="button"
          className="pcard-fav"
          aria-pressed={favorited}
          aria-label={favorited ? "Remove from favorites" : "Add to favorites"}
          onClick={onToggleFavorite}
        >
          <Icon
            name="heart"
            size={16}
            style={favorited ? { fill: "currentColor" } : undefined}
          />
        </button>
        <CardArt hue={hue} label={artLabel} />
      </div>
      <div className="pcard-name">{name}</div>
      <div className="pcard-meta">{meta}</div>
      <div className="pcard-foot">
        <div className="pcard-price">
          <div className="lbl">{priceLabel}</div>
          <div className="v">{price}</div>
          {listings && <div className="pcard-listings">{listings}</div>}
        </div>
        {delta && (
          <span className={cn("delta", delta.dir)}>
            <Icon name={delta.dir} size={12} sw={2.4} />
            {delta.value}
          </span>
        )}
      </div>
    </div>
  );
}
