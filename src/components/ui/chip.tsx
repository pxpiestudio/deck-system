import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface ChipProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onDrag'> {
  active?: boolean
}

const Chip = React.forwardRef<HTMLButtonElement, ChipProps>(
  ({ className, active, children, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        className={cn(
          "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-medium transition-colors cursor-pointer",
          active
            ? "bg-[var(--accent)] text-white border-[var(--accent)]"
            : "bg-[var(--surface)] text-[var(--text)] border-[var(--border)] hover:border-[color-mix(in_oklch,var(--accent)_40%,transparent)] hover:text-[var(--accent)]",
          className
        )}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        transition={{ duration: 0.15, ease: [0.22, 1, 0.36, 1] }}
        {...props as any}
      >
        {children}
      </motion.button>
    )
  }
)
Chip.displayName = "Chip"

export { Chip }
