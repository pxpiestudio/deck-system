import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

interface AnimateInProps {
  children: React.ReactNode
  delay?: number
  direction?: "up" | "down" | "left" | "right"
  className?: string
  once?: boolean
}

function AnimateIn({ children, delay = 0, direction = "up", className, once = true }: AnimateInProps) {
  const directions = {
    up: { y: 26 },
    down: { y: -26 },
    left: { x: 26 },
    right: { x: -26 },
  }

  return (
    <motion.div
      className={cn(className)}
      initial={{ opacity: 0, ...directions[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, margin: "-8% 0px" }}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  )
}

interface MotionCardProps {
  children: React.ReactNode
  className?: string
  hoverScale?: number
  hoverY?: number
  onClick?: () => void
}

function MotionCard({ children, className, hoverScale, hoverY = -4, onClick }: MotionCardProps) {
  return (
    <motion.div
      className={cn(className)}
      whileHover={{
        y: hoverY,
        scale: hoverScale,
        boxShadow: "var(--shadow-lg)",
      }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      onClick={onClick}
    >
      {children}
    </motion.div>
  )
}

interface ClosablePanelProps {
  children: React.ReactNode
  isOpen: boolean
  onClose: () => void
  className?: string
}

function ClosablePanel({ children, isOpen, onClose, className }: ClosablePanelProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={cn(className)}
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.98 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-7 h-7 rounded-full grid place-items-center text-[var(--muted)] hover:text-[var(--text)] hover:bg-[var(--surface-2)] transition-colors cursor-pointer z-10"
          >
            ✕
          </button>
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export { AnimateIn, MotionCard, ClosablePanel }
