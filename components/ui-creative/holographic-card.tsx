"use client"

import type React from "react"

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import type { ReactNode } from "react"

interface HolographicCardProps {
  children: ReactNode
  className?: string
  accentColor?: string
}

export function HolographicCard({ children, className = "", accentColor = "#2dd4bf" }: HolographicCardProps) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 })
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 })

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"])
  const brightness = useTransform(mouseXSpring, [-0.5, 0, 0.5], [0.9, 1, 1.1])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    x.set(mouseX / rect.width - 0.5)
    y.set(mouseY / rect.height - 0.5)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={`relative group cursor-pointer ${className}`}
    >
      {/* Holographic gradient overlay */}
      <motion.div
        className="absolute -inset-[1px] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `linear-gradient(135deg, ${accentColor}40 0%, #a78bfa40 50%, #22d3ee40 100%)`,
          filter: "blur(1px)",
        }}
      />

      {/* Shine effect */}
      <motion.div
        className="absolute inset-0 rounded-2xl overflow-hidden opacity-0 group-hover:opacity-100 pointer-events-none"
        style={{ filter: brightness }}
      >
        <div
          className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent"
          style={{
            transform: "translateX(-100%) rotate(45deg)",
            animation: "shimmer 1.5s ease-in-out infinite",
          }}
        />
      </motion.div>

      {/* Card content */}
      <div
        className="relative glass rounded-2xl p-6 border border-white/10 group-hover:border-white/20 transition-all duration-300"
        style={{ transform: "translateZ(40px)" }}
      >
        {children}
      </div>

      {/* Glow underneath */}
      <div
        className="absolute inset-0 -z-10 rounded-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-500 blur-2xl"
        style={{ backgroundColor: accentColor, transform: "translateY(10px) scale(0.9)" }}
      />
    </motion.div>
  )
}
