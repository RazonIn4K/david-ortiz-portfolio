"use client"

import { useEffect, useState, useRef } from "react"
import { motion, useInView } from "framer-motion"

interface Stat {
  value: number
  suffix: string
  label: string
  color: string
}

const stats: Stat[] = [
  { value: 50, suffix: "+", label: "Automations Built", color: "#2dd4bf" },
  { value: 1200, suffix: "+", label: "Hours Saved", color: "#22d3ee" },
  { value: 98, suffix: "%", label: "Client Satisfaction", color: "#a78bfa" },
  { value: 24, suffix: "/7", label: "AI Support", color: "#ff6b6b" },
]

function AnimatedNumber({ value, suffix, inView }: { value: number; suffix: string; inView: boolean }) {
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    if (!inView) return

    const duration = 2000
    const steps = 60
    const increment = value / steps
    let current = 0

    const timer = setInterval(() => {
      current += increment
      if (current >= value) {
        setDisplayValue(value)
        clearInterval(timer)
      } else {
        setDisplayValue(Math.floor(current))
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [value, inView])

  return (
    <span>
      {displayValue.toLocaleString()}
      {suffix}
    </span>
  )
}

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

            <div className="text-4xl md:text-5xl font-bold mb-2" style={{ color: stat.color }}>
              <AnimatedNumber value={stat.value} suffix={stat.suffix} inView={isInView} />
            </div>
            <p className="text-white/50 text-sm">{stat.label}</p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}
