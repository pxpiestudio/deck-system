import * as React from "react"
import { cn } from "@/lib/utils"

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "card" | "row" | "text" | "circle" | "rect"
  count?: number
  className?: string
}

const shimmerStyle: React.CSSProperties = {
  background: "linear-gradient(100deg, var(--surface-2) 30%, color-mix(in oklch, var(--surface-2) 50%, var(--bg)) 50%, var(--surface-2) 70%)",
  backgroundSize: "200% 100%",
  animation: "shimmer 1.1s infinite linear",
}

const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ variant = "rect", count = 1, className, ...props }, ref) => {
    const variants = {
      card: "h-[280px] rounded-lg",
      row: "h-[60px] rounded-sm",
      text: "h-4 rounded-sm",
      circle: "rounded-full aspect-square",
      rect: "rounded-sm",
    }

    return (
      <>
        <style>{`
          @keyframes shimmer {
            from { background-position: 200% 0; }
            to { background-position: -200% 0; }
          }
        `}</style>
        <div ref={ref} className={cn("flex flex-col gap-2", className)} {...props}>
          {Array.from({ length: count }).map((_, i) => (
            <div
              key={i}
              className={cn("w-full", variants[variant])}
              style={shimmerStyle}
            />
          ))}
        </div>
      </>
    )
  }
)
Skeleton.displayName = "Skeleton"

interface SkeletonGridProps {
  columns?: number
  rows?: number
  className?: string
}

function SkeletonGrid({ columns = 4, rows = 2, className }: SkeletonGridProps) {
  return (
    <div
      className={cn("grid gap-5", className)}
      style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
    >
      {Array.from({ length: columns * rows }).map((_, i) => (
        <div key={i} className="flex flex-col gap-2">
          <div className="h-[220px] rounded-lg" style={shimmerStyle} />
          <div className="h-4 w-3/4 rounded-sm" style={shimmerStyle} />
          <div className="h-3 w-1/2 rounded-sm" style={shimmerStyle} />
        </div>
      ))}
    </div>
  )
}

export { Skeleton, SkeletonGrid }
