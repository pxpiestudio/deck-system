import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center gap-1 whitespace-nowrap rounded-[var(--radius-md)] font-sans font-semibold text-[11px] h-[22px] px-2 transition-colors",
  {
    variants: {
      variant: {
        neutral:
          "bg-[hsl(var(--neutral)/0.15)] text-[hsl(var(--strong))] border border-[hsl(var(--disabled)/0.35)]",
        accent:
          "bg-[hsl(var(--app-accent))] text-white",
        accentGhost:
          "bg-[hsl(var(--app-accent)/0.1)] text-[hsl(var(--app-accent))] border border-[hsl(var(--app-accent)/0.22)]",
        success:
          "bg-[hsl(var(--success))] text-white",
        successGhost:
          "bg-[hsl(var(--success)/0.1)] text-[hsl(var(--success))] border border-[hsl(var(--success)/0.18)]",
        warningGhost:
          "bg-[hsl(var(--warning)/0.1)] text-[hsl(var(--warning-secondary))] border border-[hsl(var(--warning)/0.2)]",
        info:
          "bg-[hsl(var(--info))] text-white",
        destructiveGhost:
          "bg-[hsl(var(--destructive)/0.1)] text-[hsl(var(--destructive))] border border-[hsl(var(--destructive)/0.18)]",
        brandGhost:
          "bg-[hsl(var(--brand)/0.08)] text-[hsl(var(--brand))] border border-[hsl(var(--brand)/0.18)]",
      },
      shape: {
        default: "rounded-[var(--radius-md)]",
        pill: "rounded-full px-2.5",
      },
    },
    defaultVariants: {
      variant: "neutral",
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
