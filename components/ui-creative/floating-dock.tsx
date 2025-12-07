"use client"

import { motion } from "framer-motion"
import { Home, Zap, FolderOpen, User, MessageCircle, GraduationCap, ExternalLink } from "lucide-react"
import { useState } from "react"

const dockItems = [
  { icon: Home, label: "Home", href: "#" },
  { icon: Zap, label: "Services", href: "#services" },
  { icon: FolderOpen, label: "Case Studies", href: "#cases" },
  { icon: GraduationCap, label: "Learning", href: "https://highencodelearning.com", external: true },
  { icon: User, label: "About", href: "#about" },
  { icon: MessageCircle, label: "Contact", href: "#contact" },
]

export function FloatingDock() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <motion.nav
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40"
    >
      <div className="glass-strong rounded-2xl px-4 py-3 flex items-center gap-1">
        {dockItems.map((item, i) => {
          const isHovered = hoveredIndex === i
          const isNear = hoveredIndex !== null && Math.abs(hoveredIndex - i) === 1

          const scale = isHovered ? 1.4 : isNear ? 1.15 : 1
          const y = isHovered ? -12 : isNear ? -4 : 0

          return (
            <motion.a
              key={i}
              href={item.href}
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noopener noreferrer" : undefined}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              animate={{ scale, y }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="relative p-3 rounded-xl hover:bg-white/10 transition-colors group"
            >
              <item.icon className="w-5 h-5 text-white/70 group-hover:text-[#2dd4bf] transition-colors" />

              {/* External indicator */}
              {item.external && <ExternalLink className="absolute top-1 right-1 w-2.5 h-2.5 text-white/30" />}

              {/* Tooltip */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
                className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-white text-[#060a14] text-xs font-medium rounded-lg whitespace-nowrap pointer-events-none"
              >
                {item.label}
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white rotate-45" />
              </motion.div>
            </motion.a>
          )
        })}
      </div>
    </motion.nav>
  )
}
