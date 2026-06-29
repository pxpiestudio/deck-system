import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Badge } from "./badge"
import { Heart } from "lucide-react"

interface CardProps {
  name: string
  set?: string
  num?: string
  price?: number
  listings?: number
  delta?: number
  hue?: number
  chip?: string
  image?: string
  className?: string
  style?: React.CSSProperties
  onClick?: () => void
}

function CardArt({ hue = 200 }: { hue?: number }) {
  return (
    <div
      className="relative rounded-[9px] overflow-hidden w-full"
      style={{
        aspectRatio: "5/7",
        background: `linear-gradient(160deg, color-mix(in oklch, hsl(${hue} 70% 55%) 90%, white) 0%, hsl(${hue} 72% 42%) 55%, color-mix(in oklch, hsl(${hue} 70% 40%) 80%, #121427) 100%)`,
        boxShadow: "inset 0 0 0 1.5px rgba(255,255,255,.18), inset 0 -40px 60px rgba(0,0,0,.25)",
      }}
    >
      <span className="absolute inset-0 mix-blend-overlay opacity-45"
        style={{
          background: "linear-gradient(115deg, transparent 30%, rgba(255,255,255,.55) 46%, transparent 60%)",
        }}
      />
      <span className="absolute inset-[7px] rounded-[6px] border-[1.5px] border-white/[0.28]"
        style={{
          background: "repeating-linear-gradient(135deg, rgba(255,255,255,.06) 0 9px, transparent 9px 18px)",
        }}
      />
      <span className="absolute left-1/2 top-[46%] -translate-x-1/2 -translate-y-1/2 w-[42%] aspect-square rounded-[22%]"
        style={{
          background: "radial-gradient(circle at 38% 32%, rgba(255,255,255,.9), rgba(255,255,255,.15) 60%, transparent 72%)",
          opacity: 0.5,
        }}
      />
    </div>
  )
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ name, set, num, price, listings, delta, hue = 200, chip, image, className, style, onClick }, ref) => {
    return (
      <motion.div
        ref={ref}
        className={cn(
          "group relative bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius)] p-3.5 shadow-[var(--shadow)] cursor-pointer",
          className
        )}
        style={style}
        onClick={onClick}
        whileHover={{ y: -4, boxShadow: "var(--shadow-lg)" }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="relative rounded-[var(--radius-sm)] overflow-hidden mb-3.5">
          {chip && (
            <Badge
              variant="default"
              className="absolute top-2.5 left-2.5 z-[4] !bg-[color-mix(in_oklch,var(--navy-surface)_88%,transparent)] !text-[var(--on-navy)]"
            >
              {chip}
            </Badge>
          )}
          <button
            className="absolute top-2.5 right-2.5 z-[4] w-[34px] h-[34px] rounded-full grid place-items-center text-[var(--text)] transition-transform duration-200 hover:scale-110 hover:text-[var(--accent)]"
            style={{
              background: "color-mix(in oklch, var(--surface) 80%, transparent)",
              backdropFilter: "blur(6px)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <Heart size={14} />
          </button>
          {image ? (
            <img src={image} alt={name} className="w-full aspect-[5/7] object-cover rounded-[var(--radius-sm)]" />
          ) : (
            <CardArt hue={hue} />
          )}
        </div>
        <div className="font-heading font-bold text-[15.5px] text-[var(--text)]">{name}</div>
        <div className="text-[12.5px] text-[var(--muted)] mt-0.5">
          {set && num ? `${set} · ${num}` : set || num}
        </div>
        {(price !== undefined || delta !== undefined) && (
          <div className="flex items-end justify-between mt-3">
            <div>
              {price !== undefined && (
                <>
                  <div className="text-[11px] text-[var(--faint)]">from</div>
                  <div className="font-heading font-bold text-[19px] text-[var(--text)]">
                    ${price.toFixed(2)}
                  </div>
                  {listings !== undefined && (
                    <div className="text-[11.5px] text-[var(--muted)] mt-0.5">{listings} listings</div>
                  )}
                </>
              )}
            </div>
            {delta !== undefined && (
              <span
                className={cn(
                  "text-[12.5px] font-heading font-semibold inline-flex items-center gap-0.5",
                  delta >= 0 ? "text-[#1fad66]" : "text-[#e0466b]"
                )}
              >
                {delta >= 0 ? "↑" : "↓"} {Math.abs(delta)}%
              </span>
            )}
          </div>
        )}
      </motion.div>
    )
  }
)
Card.displayName = "Card"

export { Card }
