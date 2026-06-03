"use client"

import { motion, useReducedMotion, type Transition } from "framer-motion"
import { Home, Zap, MessageCircle, BookOpen } from "lucide-react"
import { useState, useCallback, useMemo } from "react"

interface DockItem {
  icon: typeof Home
  label: string
  href: string
}

const dockItems: DockItem[] = [
  { icon: Home, label: "Home", href: "#" },
  { icon: Zap, label: "Focus", href: "#focus" },
  { icon: BookOpen, label: "Learning", href: "#learning" },
  { icon: MessageCircle, label: "Business", href: "#contact" },
]

export function FloatingDock() {
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null)
  const prefersReducedMotion = useReducedMotion()

  const handleFocus = useCallback((index: number) => {
    setFocusedIndex(index)
  }, [])

  const handleBlur = useCallback(() => {
    setFocusedIndex(null)
  }, [])

  // Memoize the entry animation
  const navAnimation = useMemo(() => {
    if (prefersReducedMotion) {
      return {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { duration: 0.2 } as Transition
      }
    }
    return {
      initial: { y: 100, opacity: 0 },
      animate: { y: 0, opacity: 1 },
      transition: { delay: 0.5, type: "spring", stiffness: 100 } as Transition
    }
  }, [prefersReducedMotion])

  return (
    <motion.nav
      {...navAnimation}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40"
      aria-label="Quick navigation"
    >
      <div className="glass-strong rounded-2xl px-4 py-3 flex items-center gap-1" role="list">
        {dockItems.map((item, i) => {
          const isActive = focusedIndex === i
          const isNear = focusedIndex !== null && Math.abs(focusedIndex - i) === 1

          // Calculate scales based on interaction
          const scale = prefersReducedMotion ? 1 : (isActive ? 1.4 : isNear ? 1.15 : 1)
          const y = prefersReducedMotion ? 0 : (isActive ? -12 : isNear ? -4 : 0)

          return (
            <motion.a
              key={item.label}
              href={item.href}
              role="listitem"
              aria-label={`Navigate to ${item.label}`}
              onMouseEnter={() => handleFocus(i)}
              onMouseLeave={handleBlur}
              onFocus={() => handleFocus(i)}
              onBlur={handleBlur}
              animate={prefersReducedMotion ? {} : { scale, y }}
              transition={(prefersReducedMotion ? { duration: 0 } : { type: "spring", stiffness: 400, damping: 25 }) as Transition}
              className="relative p-3 rounded-xl hover:bg-white/10 transition-colors group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2dd4bf] focus-visible:ring-offset-2 focus-visible:ring-offset-[#060a14]"
            >
              <item.icon
                className="w-5 h-5 text-white/70 group-hover:text-[#2dd4bf] group-focus-visible:text-[#2dd4bf] transition-colors"
                aria-hidden="true"
              />

              {/* Tooltip */}
              <motion.div
                role="tooltip"
                id={`tooltip-${item.label}`}
                initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
                animate={
                  prefersReducedMotion
                    ? { opacity: isActive ? 1 : 0 }
                    : { opacity: isActive ? 1 : 0, y: isActive ? 0 : 10 }
                }
                transition={prefersReducedMotion ? { duration: 0.1 } : undefined}
                aria-hidden={!isActive}
                className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-white text-[#060a14] text-xs font-medium rounded-lg whitespace-nowrap pointer-events-none"
              >
                {item.label}
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white rotate-45" aria-hidden="true" />
              </motion.div>
            </motion.a>
          )
        })}
      </div>
    </motion.nav>
  )
}
