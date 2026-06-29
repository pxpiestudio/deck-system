import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"

const buttonVariants = cva(
  "relative inline-flex items-center justify-center gap-2 whitespace-nowrap font-heading font-semibold transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 cursor-pointer overflow-hidden",
  {
    variants: {
      variant: {
        primary:
          "bg-[var(--accent)] text-white shadow-[0_8px_22px_var(--accent-soft)] hover:shadow-[0_14px_34px_color-mix(in_oklch,var(--accent)_32%,transparent)]",
        ghost:
          "bg-[var(--surface)] text-[var(--text)] border border-[var(--border-strong)] hover:bg-[var(--surface-2)]",
        quiet:
          "text-[var(--text)] hover:bg-[color-mix(in_oklch,var(--text)_8%,transparent)]",
        dark:
          "bg-[var(--navy-surface)] text-[var(--on-navy)] hover:opacity-90",
        outline:
          "bg-transparent text-[var(--text)] border border-[var(--border-strong)] hover:bg-[var(--surface-2)]",
        destructive:
          "bg-[#e0466b] text-white hover:bg-[#c73a5a]",
        link:
          "text-[var(--accent)] underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-9 px-4 text-[13.5px] rounded-[11px]",
        default: "h-11 px-5.5 text-[15px] rounded-[11px]",
        lg: "h-14 px-7 text-[16.5px] rounded-[11px]",
        icon: "h-10 w-10 rounded-[11px]",
        "icon-sm": "h-8 w-8 rounded-[9px]",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onDrag'>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, loading, children, disabled, ...props }, ref) => {
    const isDisabled = disabled || loading

    return (
      <motion.button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={isDisabled}
        whileHover={variant !== "link" ? { y: -2 } : undefined}
        whileTap={{ scale: 0.98, y: 0 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        {...props as any}
      >
        {loading && (
          <Loader2 className="h-4 w-4 animate-spin" />
        )}
        {children}
      </motion.button>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
