import * as React from "react"
import { cn } from "@/lib/utils"

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  icon?: React.ReactNode
  inputSize?: "sm" | "default" | "lg"
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, icon, inputSize = "default", ...props }, ref) => {
    const sizeClasses = {
      sm: "h-9 px-3 text-[13px] rounded-[11px]",
      default: "h-11 px-4 text-[15px] rounded-[12px]",
      lg: "h-14 px-5 text-base rounded-[var(--radius)]",
    }

    return (
      <div className={cn("relative", icon && "flex items-center")}>
        {icon && (
          <div className="absolute left-4 text-[var(--faint)] pointer-events-none">
            {icon}
          </div>
        )}
        <input
          ref={ref}
          className={cn(
            "w-full bg-[var(--surface)] border border-[var(--border-strong)] text-[var(--text)] font-sans outline-none transition-all placeholder:text-[var(--faint)]",
            "focus:border-[var(--accent)] focus:shadow-[0_0_0_3px_var(--accent-soft)]",
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
