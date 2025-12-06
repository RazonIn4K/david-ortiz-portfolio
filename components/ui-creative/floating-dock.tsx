"use client"

import { motion } from "framer-motion"
import { Home, Layers, Zap, Book, Mail } from "lucide-react"

export function FloatingDock() {
  const items = [
    { icon: Home, label: "Home", href: "#" },
    { icon: Layers, label: "Services", href: "#services" },
    { icon: Zap, label: "Cases", href: "#cases" },
    { icon: Book, label: "Learning", href: "#learning" },
    { icon: Mail, label: "Contact", href: "#contact" },
  ]

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 glass rounded-full px-4 py-3 flex items-center gap-4"
    >
      {items.map((item, i) => (
        <a
            key={i}
            href={item.href}
            className="p-2 rounded-full hover:bg-white/10 transition text-white/70 hover:text-white"
            title={item.label}
        >
          <item.icon className="w-5 h-5" />
        </a>
      ))}
    </motion.div>
  )
}
