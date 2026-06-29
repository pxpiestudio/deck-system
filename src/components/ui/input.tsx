import * as React from "react"
import { cn } from "@/lib/utils"

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  icon?: React.ReactNode
  inputSize?: "sm" | "default" | "lg"
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, icon, inputSize = "default", ...props }, ref) => {
    const sizeClasses = {
      sm: "h-9 px-3 text-[13px] rounded-lg",
      default: "h-11 px-4 text-[15px] rounded-lg",
      lg: "h-14 px-5 text-base rounded-xl",
    }

    return (
      <div className={cn("relative", icon && "flex items-center")}>
        {icon && (
          <div className="absolute left-4 text-faint pointer-events-none">
            {icon}
          </div>
        )}
        <input
          ref={ref}
          className={cn(
            "w-full bg-surface border border-border-strong text-text font-sans outline-none transition-all placeholder:text-faint",
            "focus:border-accent focus:shadow-[0_0_0_3px_var(--accent-soft)]",
            sizeClasses[inputSize],
            icon && "pl-10",
            className
          )}
          {...props}
        />
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }
