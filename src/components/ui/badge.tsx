import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center gap-1 whitespace-nowrap rounded-[6px] font-heading font-bold text-[11px] h-[22px] px-2 transition-colors",
  {
    variants: {
      variant: {
        default:
          "bg-[var(--surface-2)] text-[var(--muted)]",
        grade:
          "bg-[color-mix(in_oklch,var(--purple)_16%,transparent)] text-[var(--purple)]",
        accent:
          "bg-[var(--accent)] text-white",
        accentGhost:
          "bg-[var(--accent-soft)] text-[var(--accent)]",
        success:
          "bg-[#1fad66] text-white",
        successGhost:
          "bg-[color-mix(in_oklch,#1fad66_12%,transparent)] text-[#1fad66]",
        warningGhost:
          "bg-[color-mix(in_oklch,#f0a030_12%,transparent)] text-[#b07018]",
        info:
          "bg-[#2a6fdb] text-white",
        destructiveGhost:
          "bg-[color-mix(in_oklch,#e0466b_12%,transparent)] text-[#e0466b]",
        brandGhost:
          "bg-[color-mix(in_oklch,var(--purple)_12%,transparent)] text-[var(--purple)]",
      },
      shape: {
        default: "rounded-[6px]",
        pill: "rounded-full px-2.5",
      },
    },
    defaultVariants: {
      variant: "default",
      shape: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, shape, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant, shape }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
