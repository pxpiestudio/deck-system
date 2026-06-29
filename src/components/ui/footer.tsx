import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface FooterProps {
  columns?: { title: string; links: { label: string; href?: string }[] }[]
  socials?: { icon: React.ReactNode; href?: string; label: string }[]
  className?: string
}

const Footer = React.forwardRef<HTMLElement, FooterProps>(
  ({ columns, socials, className }, ref) => {
    return (
      <footer ref={ref} className={cn("border-t border-border pt-16 pb-9", className)}>
        <div className="max-w-[1240px] mx-auto px-7">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr] gap-8">
            {/* Brand column */}
            <div>
              <img src="/assets/deckcenter-logo.svg" alt="Deckcenter" className="h-10 w-auto mb-4 opacity-80" />
              <p className="text-sm text-muted leading-relaxed max-w-[30ch]">
                The Pokémon TCG marketplace built for collectors, by collectors.
              </p>
            </div>

            {/* Link columns */}
            {columns?.map((col) => (
              <div key={col.title}>
                <h4 className="font-heading text-[13px] tracking-[0.08em] uppercase text-faint mb-4">
                  {col.title}
                </h4>
                <ul className="flex flex-col gap-2.5 list-none p-0 m-0">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href || "#"}
                        className="text-[14.5px] text-muted hover:text-accent transition-colors duration-200"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom */}
          <div className="flex items-center justify-between mt-12 pt-6 border-t border-border text-[13px] text-muted flex-wrap gap-3.5">
            <span>Deckcenter Sleeve · v2.0 · 2026 · DC Design</span>
            {socials && socials.length > 0 && (
              <div className="flex gap-2.5">
                {socials.map((s) => (
                  <motion.a
                    key={s.label}
                    href={s.href || "#"}
                    aria-label={s.label}
                    className="w-[38px] h-[38px] rounded-full border border-border grid place-items-center text-muted hover:text-accent hover:border-accent transition-colors duration-[250ms]"
                    whileHover={{ y: -2 }}
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {s.icon}
                  </motion.a>
                ))}
              </div>
            )}
          </div>
        </div>
      </footer>
    )
  }
)
Footer.displayName = "Footer"

export { Footer }
