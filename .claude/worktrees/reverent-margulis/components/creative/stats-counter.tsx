"use client"

import { motion, useMotionValue, useTransform, animate } from "framer-motion"
import { useEffect, useRef, useState } from "react"

interface StatProps {
  value: number
  suffix?: string
  label: string
  duration?: number
}

function AnimatedStat({ value, suffix = "", label, duration = 2 }: StatProps) {
  const count = useMotionValue(0)
  const rounded = useTransform(count, (latest) => Math.round(latest))
  const [displayValue, setDisplayValue] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true
          animate(count, value, { duration })
        }
      },
      { threshold: 0.5 },
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [count, value, duration])

  useEffect(() => {
    const unsubscribe = rounded.on("change", (latest) => setDisplayValue(latest))
    return () => unsubscribe()
  }, [rounded])

  return (
    <div ref={ref} className="text-center">
      <motion.div
        className="text-4xl md:text-5xl font-bold gradient-text"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        {displayValue}
        {suffix}
      </motion.div>
      <p className="text-white/50 text-sm mt-2">{label}</p>
    </div>
  )
}

export function StatsCounter() {
  const stats = [
    { value: 127, suffix: "+", label: "Automations shipped" },
    { value: 40, suffix: "K", label: "Hours saved" },
    { value: 98, suffix: "%", label: "Client satisfaction" },
    { value: 12, suffix: "", label: "Years experience" },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12">
      {stats.map((stat, i) => (
        <AnimatedStat key={i} {...stat} duration={2 + i * 0.3} />
      ))}
    </div>
  )
}
