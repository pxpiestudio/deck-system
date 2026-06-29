import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-sans font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))] disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] cursor-pointer",
  {
    variants: {
      variant: {
        primary:
          "bg-[hsl(var(--brand))] text-[hsl(var(--solid))] hover:bg-[hsl(var(--brand-secondary))]",
        accent:
          "bg-[hsl(var(--app-accent))] text-white hover:bg-[hsl(var(--app-accent-secondary))]",
        outline:
          "bg-[hsl(var(--object))] text-[hsl(var(--body))] border border-[hsl(var(--disabled))] hover:bg-[hsl(var(--foreground))] hover:text-[hsl(var(--strong))]",
        ghost:
          "bg-transparent text-[hsl(var(--body))] hover:bg-[hsl(var(--neutral)/0.25)] hover:text-[hsl(var(--strong))]",
        success:
          "bg-[hsl(var(--success))] text-white hover:bg-[hsl(var(--success-secondary))]",
        dark:
          "bg-[hsl(var(--bold))] text-[hsl(var(--object))] hover:opacity-90",
        destructive:
          "bg-[hsl(var(--destructive))] text-white hover:bg-[hsl(var(--destructive-secondary))]",
        link:
          "text-[hsl(var(--app-accent))] underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-8 px-3 text-[13px] rounded-[calc(var(--radius-lg)-4px)]",
        default: "h-10 px-4 text-sm rounded-[var(--radius-lg)]",
        lg: "h-12 px-5 text-[15px] rounded-[var(--radius-xl)]",
        xl: "h-14 px-6 text-base rounded-[var(--radius-xl)]",
        icon: "h-10 w-10 rounded-[var(--radius-lg)]",
        "icon-sm": "h-8 w-8 rounded-[calc(var(--radius-lg)-4px)]",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
