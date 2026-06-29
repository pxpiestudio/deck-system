import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface StatTileProps {
  label: string
  value: string | number
  delta?: number
  className?: string
}

const StatTile = React.forwardRef<HTMLDivElement, StatTileProps>(
  ({ label, value, delta, className }, ref) => {
    return (
      <motion.div
        ref={ref}
        className={cn(
          "p-5 rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface)]",
          className
        )}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ y: -2, boxShadow: "var(--shadow-lg)" }}
      >
        <div className="text-xs text-[var(--muted)] font-medium">{label}</div>
        <div className="font-heading font-bold text-[32px] text-[var(--text)] tracking-[-0.02em] leading-tight mt-1.5">
          {value}
        </div>
        {delta !== undefined && (
          <div
            className={cn(
              "font-mono text-[11px] mt-2",
              delta >= 0 ? "text-[#1fad66]" : "text-[#e0466b]"
            )}
          >
            {delta >= 0 ? "↑" : "↓"} {Math.abs(delta)}%
          </div>
        )}
      </motion.div>
    )
  }
)
StatTile.displayName = "StatTile"

export { StatTile }
