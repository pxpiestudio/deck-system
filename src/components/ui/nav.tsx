import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { Button } from "./button"
import { Sun, Moon, ShoppingCart } from "lucide-react"

interface NavLink {
  label: string
  href?: string
  active?: boolean
}

interface NavProps {
  links?: NavLink[]
  user?: { name: string; initials: string } | null
  cartCount?: number
  onThemeToggle?: () => void
  theme?: "light" | "dark"
  className?: string
}

const Nav = React.forwardRef<HTMLElement, NavProps>(
  ({ links, user, cartCount = 0, onThemeToggle, theme = "light", className }, ref) => {
    const [scrolled, setScrolled] = React.useState(false)
    const [menuOpen, setMenuOpen] = React.useState(false)

    React.useEffect(() => {
      const onScroll = () => setScrolled(window.scrollY > 10)
      window.addEventListener("scroll", onScroll)
      return () => window.removeEventListener("scroll", onScroll)
    }, [])

    return (
      <nav
        ref={ref}
        className={cn("sticky top-0 z-[60]", className)}
      >
        {/* Utility bar */}
        <div className="h-8 bg-navy-surface border-b border-white/[0.06]">
          <div className="max-w-[1240px] mx-auto px-7 h-full flex items-center">
            <button className="text-[12px] font-medium text-on-navy/60 hover:text-on-navy transition-colors cursor-pointer bg-transparent border-0 px-2.5 py-0">
              Seller portal
            </button>
            <span className="w-px h-[13px] bg-on-navy/15 mx-1 self-center" />
            <button className="text-[12px] font-medium text-on-navy/60 hover:text-on-navy transition-colors cursor-pointer bg-transparent border-0 px-2.5 py-0">
              How it works
            </button>
            <div className="flex-1" />
            <div className="flex items-center h-full">
              <button
                className={cn(
                  "bg-transparent border-0 cursor-pointer text-[11.5px] font-bold tracking-[0.05em] px-1.5 h-full font-sans transition-colors",
                  "text-on-navy/50 hover:text-on-navy"
                )}
              >
                EN
              </button>
              <span className="w-px h-[13px] bg-on-navy/15 mx-1 self-center" />
              <button
                className={cn(
                  "bg-transparent border-0 cursor-pointer text-[11.5px] font-bold tracking-[0.05em] px-1.5 h-full font-sans transition-colors",
                  "text-on-navy/50 hover:text-on-navy"
                )}
              >
                ES
              </button>
            </div>
          </div>
        </div>

        {/* Main nav */}
        <div
          className={cn(
            "backdrop-blur-xl saturate-150 bg-bg/80 border-b border-transparent transition-[border-color,background] duration-[350ms]",
            scrolled && "border-border"
          )}
        >
          <div className="max-w-[1240px] mx-auto px-7 h-16 flex items-center gap-7">
            {/* Logo */}
            <a href="/" className="flex-shrink-0 transition-transform duration-300 hover:rotate-[-2deg] hover:scale-[1.03]">
              <img src="/assets/deckcenter-logo.svg" alt="Deckcenter" className="h-[38px] w-auto dark:hidden" />
              <img src="/assets/deckcenter-logo-light.svg" alt="Deckcenter" className="h-[38px] w-auto hidden dark:block" />
            </a>

            {/* Links */}
            {links && links.length > 0 && (
              <div className="hidden md:flex items-center gap-1 ml-2">
                {links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href || "#"}
                    className={cn(
                      "text-[14.5px] font-medium px-3.5 py-2 rounded-sm relative transition-colors duration-200",
                      link.active
                        ? "text-text bg-text/[0.08]"
                        : "text-muted hover:text-text hover:bg-text/[0.08]"
                    )}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            )}

            <div className="flex-1" />

            {/* Actions */}
            <div className="flex items-center gap-2.5">
              {/* Cart */}
              <button className="relative w-10 h-10 rounded-full grid place-items-center text-text hover:bg-surface-2 transition-colors cursor-pointer">
                <ShoppingCart size={18} />
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-[18px] h-[18px] rounded-full bg-accent text-white text-[10px] font-bold grid place-items-center">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Theme toggle */}
              {onThemeToggle && (
                <button
                  onClick={onThemeToggle}
                  className="w-[26px] h-[26px] rounded-full grid place-items-center bg-transparent border-0 cursor-pointer text-on-navy/50 hover:text-on-navy hover:bg-on-navy/10 transition-colors"
                >
                  {theme === "light" ? <Moon size={13} /> : <Sun size={13} />}
                </button>
              )}

              {/* Auth */}
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="w-9 h-9 rounded-full flex-shrink-0 bg-gradient-to-br from-magenta to-purple flex items-center justify-center font-heading font-bold text-[13px] text-white cursor-pointer border-0 shadow-none hover:shadow-[0_0_0_3px_rgba(222,14,127,0.3)] transition-shadow"
                  >
                    {user.initials}
                  </button>
                  <AnimatePresence>
                    {menuOpen && (
                      <>
                        <div className="fixed inset-0 z-[55]" onClick={() => setMenuOpen(false)} />
                        <motion.div
                          initial={{ opacity: 0, y: -8, scale: 0.96 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -8, scale: 0.96 }}
                          transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                          className="absolute top-[calc(100%+8px)] right-0 w-[264px] bg-surface border border-border rounded-2xl shadow-xl p-1.5 z-[60] origin-top-right"
                        >
                          <div className="flex items-center gap-3 px-3.5 py-3 pb-3.5 border-b border-border mb-1.5">
                            <div className="w-[46px] h-[46px] rounded-full flex-shrink-0 bg-gradient-to-br from-magenta to-purple grid place-items-center font-heading font-bold text-base text-white shadow-[0_2px_8px_rgba(222,14,127,0.3)]">
                              {user.initials}
                            </div>
                            <div>
                              <div className="font-heading font-bold text-[15px] text-text">{user.name}</div>
                              <div className="text-xs text-muted mt-px">ash@trainer.com</div>
                            </div>
                          </div>
                          <div className="px-2 py-1">
                            <button className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-text hover:bg-surface-2 transition-colors cursor-pointer">
                              My profile
                            </button>
                            <button className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-text hover:bg-surface-2 transition-colors cursor-pointer">
                              List a card
                            </button>
                          </div>
                          <div className="border-t border-border mt-1 pt-1 px-2">
                            <button className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-muted hover:text-text hover:bg-surface-2 transition-colors cursor-pointer">
                              Log out
                            </button>
                          </div>
                        </motion.div>
                      </>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <>
                  <Button variant="quiet" size="sm">Sign in</Button>
                  <Button size="sm">Sell cards</Button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    )
  }
)
Nav.displayName = "Nav"

export { Nav }
