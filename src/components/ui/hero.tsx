import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface HeroProps {
  variant?: "split" | "centered" | "clean"
  badge?: { dot?: boolean; text: string }
  title: React.ReactNode
  subtitle?: string
  children?: React.ReactNode
  stats?: { value: string; label: string }[]
  className?: string
}

const Hero = React.forwardRef<HTMLElement, HeroProps>(
  ({ variant = "centered", badge, title, subtitle, children, stats, className }, ref) => {
    const isClean = variant === "clean"
    const isCentered = variant === "centered" || variant === "clean"

    return (
      <section
        ref={ref}
        className={cn(
          "relative overflow-hidden",
          isClean ? "pt-[72px] pb-20" : "pt-[60px] pb-20",
          className
        )}
      >
        {/* Glow */}
        <div
          className="absolute -top-[20%] -left-[10%] -right-[10%] h-[720px] z-0 pointer-events-none blur-xl opacity-70 dark:opacity-50"
          style={{
            background: "radial-gradient(620px 420px at 78% 6%, color-mix(in oklch, var(--accent) 12%, transparent), transparent 62%), radial-gradient(560px 420px at 12% 0%, color-mix(in oklch, var(--purple) 9%, transparent), transparent 60%)",
          }}
        />

        {/* Top line (clean only) */}
        {isClean && (
          <div
            className="absolute top-0 left-0 right-0 h-0.5"
            style={{
              background: "linear-gradient(90deg, transparent 0%, transparent 10%, color-mix(in oklch, var(--accent) 55%, transparent) 38%, color-mix(in oklch, var(--accent) 70%, transparent) 50%, color-mix(in oklch, var(--accent) 50%, transparent) 64%, transparent 90%, transparent 100%)",
            }}
          />
        )}

        <div
          className={cn(
            "relative z-[2] max-w-[1240px] mx-auto px-7",
            isCentered && "text-center",
            isCentered && !isClean && "max-w-[880px] mx-auto"
          )}
        >
          {badge && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-2 px-3.5 py-[7px] pl-2 bg-surface border border-border rounded-full text-[13px] font-medium text-muted shadow"
            >
              {badge.dot && (
                <span className="w-2 h-2 rounded-full bg-[#2bbf6a] shadow-[0_0_0_4px_color-mix(in_oklch,#2bbf6a_22%,transparent)]" />
              )}
              <span className="text-text font-semibold">{badge.text}</span>
            </motion.div>
          )}

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              "font-heading font-extrabold leading-[0.98] tracking-[-0.02em] my-5",
              isClean
                ? "text-[clamp(50px,7vw,96px)] leading-[0.97] tracking-[-0.035em]"
                : "text-[clamp(40px,5.6vw,76px)]"
            )}
          >
            {title}
          </motion.h1>

          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className={cn(
                "text-muted leading-relaxed",
                isClean
                  ? "text-[clamp(16px,1.4vw,19px)] max-w-[44ch] mx-auto"
                  : "text-[clamp(17px,1.5vw,20px)] max-w-[30ch]"
              )}
            >
              {subtitle}
            </motion.p>
          )}

          {children && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className={cn(
                "flex gap-3 mt-7 flex-wrap",
                isCentered && "justify-center"
              )}
            >
              {children}
            </motion.div>
          )}

          {stats && stats.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className={cn(
                "flex gap-8 mt-10 flex-wrap",
                isCentered && "justify-center",
                isClean && "border-t border-border pt-11 gap-12"
              )}
            >
              {stats.map((s) => (
                <div key={s.label} className={cn(isClean && "text-center")}>
                  <div className={cn(
                    "font-heading font-bold tracking-[-0.02em]",
                    isClean ? "text-4xl tracking-[-0.03em]" : "text-[30px]"
                  )}>
                    {s.value}
                  </div>
                  <div className="text-[13px] text-muted mt-1">{s.label}</div>
                </div>
              ))}
            </motion.div>
          )}
        </div>
      </section>
    )
  }
)
Hero.displayName = "Hero"

export { Hero }
