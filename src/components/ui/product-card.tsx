import * as React from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { cn } from "@/lib/utils"
import { Badge } from "./badge"
import { Heart } from "lucide-react"

function CardArt({ hue = 200 }: { hue?: number }) {
  return (
    <div
      className="relative rounded-sm overflow-hidden w-full"
      style={{
        aspectRatio: "5/7",
        background: `linear-gradient(160deg, color-mix(in oklch, hsl(${hue} 70% 55%) 90%, white) 0%, hsl(${hue} 72% 42%) 55%, color-mix(in oklch, hsl(${hue} 70% 40%) 80%, #121427) 100%)`,
        boxShadow: "inset 0 0 0 1.5px rgba(255,255,255,.18), inset 0 -40px 60px rgba(0,0,0,.25)",
      }}
    >
      <span className="absolute inset-0 mix-blend-overlay opacity-45"
        style={{ background: "linear-gradient(115deg, transparent 30%, rgba(255,255,255,.55) 46%, transparent 60%)" }}
      />
      <span className="absolute inset-[7px] rounded-md border-[1.5px] border-white/[0.28]"
        style={{ background: "repeating-linear-gradient(135deg, rgba(255,255,255,.06) 0 9px, transparent 9px 18px)" }}
      />
      <span className="absolute left-1/2 top-[46%] -translate-x-1/2 -translate-y-1/2 w-[42%] aspect-square rounded-[22%]"
        style={{ background: "radial-gradient(circle at 38% 32%, rgba(255,255,255,.9), rgba(255,255,255,.15) 60%, transparent 72%)", opacity: 0.5 }}
      />
    </div>
  )
}

interface ProductCardProps {
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
  onClick?: () => void
}

const ProductCard = React.forwardRef<HTMLDivElement, ProductCardProps>(
  ({ name, set, num, price, listings, delta, hue = 200, chip, image, className, onClick }, ref) => {
    const x = useMotionValue(0)
    const y = useMotionValue(0)
    const rotateX = useTransform(y, [-0.5, 0.5], [8, -8])
    const rotateY = useTransform(x, [-0.5, 0.5], [-8, 8])
    const springRotateX = useSpring(rotateX, { stiffness: 300, damping: 30 })
    const springRotateY = useSpring(rotateY, { stiffness: 300, damping: 30 })

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect()
      const px = (e.clientX - rect.left) / rect.width - 0.5
      const py = (e.clientY - rect.top) / rect.height - 0.5
      x.set(px)
      y.set(py)
    }

    const handleMouseLeave = () => {
      x.set(0)
      y.set(0)
    }

    return (
      <motion.div
        ref={ref}
        className={cn(
          "group relative bg-surface border border-border rounded-lg p-3.5 shadow cursor-pointer",
          "[transform-style:preserve-3d] will-change-transform",
          className
        )}
        style={{ rotateX: springRotateX, rotateY: springRotateY, perspective: 900 }}
        onClick={onClick}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        whileHover={{ boxShadow: "var(--shadow-lg)", borderColor: "var(--border-strong)" }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="relative rounded-sm overflow-hidden mb-3.5">
          {chip && (
            <Badge
              variant="default"
              className="absolute top-2.5 left-2.5 z-[4] !bg-navy-surface/90 !text-on-navy text-[10.5px] tracking-[0.04em] uppercase font-bold py-[5px] px-2"
            >
              {chip}
            </Badge>
          )}
          <button
            className="absolute top-2.5 right-2.5 z-[4] w-[34px] h-[34px] rounded-full grid place-items-center text-text transition-all duration-200 hover:scale-[1.12] hover:text-accent"
            style={{
              background: "color-mix(in oklch, var(--surface) 80%, transparent)",
              backdropFilter: "blur(6px)",
              transform: "translateZ(40px)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <Heart size={14} />
          </button>
          {image ? (
            <img src={image} alt={name} className="w-full aspect-[5/7] object-cover rounded-sm" />
          ) : (
            <CardArt hue={hue} />
          )}
        </div>
        <div className="font-heading font-bold text-[15.5px] text-text">{name}</div>
        <div className="text-[12.5px] text-muted mt-0.5">
          {set && num ? `${set} · ${num}` : set || num}
        </div>
        {(price !== undefined || delta !== undefined) && (
          <div className="flex items-end justify-between mt-3">
            <div>
              {price !== undefined && (
                <>
                  <div className="text-[11px] text-faint">from</div>
                  <div className="font-heading font-bold text-[19px] text-text">
                    ${price.toFixed(2)}
                  </div>
                  {listings !== undefined && (
                    <div className="text-[11.5px] text-muted mt-0.5">{listings} listings</div>
                  )}
                </>
              )}
            </div>
            {delta !== undefined && (
              <span
                className={cn(
                  "text-[12.5px] font-heading font-semibold inline-flex items-center gap-0.5",
                  delta >= 0 ? "text-success" : "text-destructive"
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
ProductCard.displayName = "ProductCard"

export { ProductCard }
