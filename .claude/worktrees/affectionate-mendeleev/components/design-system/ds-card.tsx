"use client"

import type * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import type { SiteKey } from "@/lib/design-system/site-configs"
import { siteConfigs } from "@/lib/design-system/site-configs"

interface DSCardProps extends React.HTMLAttributes<HTMLDivElement> {
  site: SiteKey
  variant?: "default" | "glass" | "elevated" | "bordered"
  hover?: boolean
  children: React.ReactNode
}

export function DSCard({ site, variant = "default", hover = true, className, children, ...props }: DSCardProps) {
  const config = siteConfigs[site]
  const isDark = config.theme === "dark"

  const getVariantStyles = (): React.CSSProperties => {
    switch (variant) {
      case "glass":
        return {
          background: config.glassEffect.bg,
          backdropFilter: `blur(${config.glassEffect.blur})`,
          WebkitBackdropFilter: `blur(${config.glassEffect.blur})`,
          border: `1px solid ${config.glassEffect.border}`,
        }
      case "elevated":
        return {
          background: isDark ? config.colors.bgLight : "#ffffff",
          boxShadow: isDark ? "0 8px 32px rgba(0, 0, 0, 0.4)" : "0 8px 32px rgba(0, 0, 0, 0.08)",
        }
      case "bordered":
        return {
          background: isDark ? config.colors.bgLight : "#ffffff",
          border: `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)"}`,
        }
      default:
        return {
          background: isDark ? config.colors.bgLight : "#ffffff",
        }
    }
  }

  return (
    <motion.div
      whileHover={hover ? { y: -4, scale: 1.01 } : undefined}
      transition={{ duration: 0.2 }}
      className={cn("rounded-2xl p-6", className)}
      style={getVariantStyles()}
      {...props}
    >
      {children}
    </motion.div>
  )
}
