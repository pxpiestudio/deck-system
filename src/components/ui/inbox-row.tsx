import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Badge } from "./badge"

interface InboxRowProps {
  image?: React.ReactNode
  title: string
  subtitle?: string
  status?: string
  statusColor?: "success" | "warning" | "info" | "accent" | "default"
  price?: number
  date?: string
  selected?: boolean
  onSelect?: () => void
  className?: string
}

function InboxRow({
  image,
  title,
  subtitle,
  status,
  statusColor = "default",
  price,
  date,
  selected,
  onSelect,
  className,
}: InboxRowProps) {
  const statusVariantMap = {
    success: "successGhost" as const,
    warning: "warningGhost" as const,
    info: "info" as const,
    accent: "accentGhost" as const,
    default: "default" as const,
  }

  return (
    <motion.div
      className={cn(
        "grid items-center gap-3 px-3.5 py-3 border-b border-[var(--border)] bg-[var(--surface)] transition-colors",
        className
      )}
      style={{
        gridTemplateColumns: onSelect ? "20px 32px 1fr auto auto" : "32px 1fr auto auto",
      }}
      whileHover={{ backgroundColor: "color-mix(in oklch, var(--accent) 3%, var(--surface))" }}
      transition={{ duration: 0.15 }}
    >
      {onSelect && (
        <div
          className={cn(
            "w-4 h-4 rounded-[4px] border flex items-center justify-center text-[9px] text-white font-extrabold cursor-pointer flex-shrink-0",
            selected
              ? "bg-[var(--accent)] border-[var(--accent)]"
              : "border-[var(--border-strong)] bg-transparent"
          )}
          onClick={onSelect}
        >
          {selected && "✓"}
        </div>
      )}
      <div className="flex-shrink-0">{image}</div>
      <div className="min-w-0">
        <div className="font-heading font-bold text-[13.5px] text-[var(--text)] truncate">{title}</div>
        {subtitle && (
          <div className="text-[11px] text-[var(--muted)] mt-0.5 truncate">{subtitle}</div>
        )}
      </div>
      {status && (
        <Badge variant={statusVariantMap[statusColor]} className="flex-shrink-0 whitespace-nowrap">
          {status}
        </Badge>
      )}
      <div className="text-right flex-shrink-0">
        {price !== undefined && (
          <div className="font-heading font-bold text-sm text-[var(--accent)]">
            ${price.toFixed(2)}
          </div>
        )}
        {date && <div className="text-[11px] text-[var(--faint)] mt-0.5">{date}</div>}
      </div>
    </motion.div>
  )
}

export { InboxRow }
