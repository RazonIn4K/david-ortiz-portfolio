"use client"

import { useEffect, useState, useRef } from "react"
import { motion, useInView } from "framer-motion"

interface Stat {
  label: string
  detail: string
  color: string
}

const stats: Stat[] = [
  { label: "Browser runtime", detail: "Buffering, cache, media loading, rendering", color: "#2dd4bf" },
  { label: "Frontend decisions", detail: "Routes, copy, hierarchy, accessibility", color: "#22d3ee" },
  { label: "Backend boundaries", detail: "Auth, APIs, storage, permissions", color: "#a78bfa" },
  { label: "Business layer", detail: "Offers, domains, trust, scoping", color: "#ff6b6b" },
]

export function AnimatedStats() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
      className="grid grid-cols-2 md:grid-cols-4 gap-6"
    >
      {stats.map((stat, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: i * 0.1 }}
          className="relative group"
        >
          <div className="glass rounded-2xl p-6 text-center hover:scale-105 transition-transform">
            {/* Background glow */}
            <div
              className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity blur-xl"
              style={{ backgroundColor: stat.color }}
            />

            <div className="text-xl md:text-2xl font-bold mb-2" style={{ color: stat.color }}>
              {stat.label}
            </div>
            <p className="text-white/50 text-sm leading-relaxed">{stat.detail}</p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}
