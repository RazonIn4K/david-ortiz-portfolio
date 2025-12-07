"use client"

import type * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import type { SiteKey } from "@/lib/design-system/site-configs"
import { siteConfigs } from "@/lib/design-system/site-configs"

interface DSButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  site: SiteKey
  variant?: "primary" | "secondary" | "ghost" | "outline"
  size?: "sm" | "md" | "lg"
  children: React.ReactNode
}

export function DSButton({ site, variant = "primary", size = "md", className, children, ...props }: DSButtonProps) {
  const config = siteConfigs[site]
  const isDark = config.theme === "dark"

  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  }

  const getVariantStyles = () => {
    switch (variant) {
      case "primary":
        return {
          background: config.gradients.secondary,
          color: "#ffffff",
          boxShadow: `0 0 20px ${config.colors.secondary}40`,
        }
      case "secondary":
        return {
          background: config.gradients.primary,
          color: isDark ? config.colors.bg : "#ffffff",
        }
      case "ghost":
        return {
          background: "transparent",
          color: isDark ? "#ffffff" : config.colors.primary,
          border: `1px solid ${isDark ? "rgba(255,255,255,0.1)" : config.colors.primary}20`,
        }
      case "outline":
        return {
          background: "transparent",
          color: config.colors.primary,
          border: `2px solid ${config.colors.primary}`,
        }
      default:
        return {}
    }
  }

  return (
    <motion.button
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "relative rounded-xl font-semibold transition-all duration-300",
        "focus:outline-none focus:ring-2 focus:ring-offset-2",
        sizeClasses[size],
        className,
      )}
      style={getVariantStyles()}
      {...props}
    >
      {children}
    </motion.button>
  )
}
