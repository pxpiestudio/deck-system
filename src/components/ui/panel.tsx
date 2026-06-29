import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface PanelProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean
}

const Panel = React.forwardRef<HTMLDivElement, PanelProps>(
  ({ className, hoverable, children, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        className={cn(
          "bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius)]",
          hoverable && "cursor-pointer",
          className
        )}
        whileHover={hoverable ? {
          y: -2,
          borderColor: "color-mix(in oklch, var(--accent) 35%, transparent)",
          boxShadow: "var(--shadow-lg)",
        } : undefined}
        transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
        {...props as any}
      >
        {children}
      </motion.div>
    )
  }
)
Panel.displayName = "Panel"

export { Panel }
