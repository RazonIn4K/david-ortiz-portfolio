"use client"

import type * as React from "react"
import { cn } from "@/lib/utils"
import type { SiteKey } from "@/lib/design-system/site-configs"
import { siteConfigs } from "@/lib/design-system/site-configs"

interface DSBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  site: SiteKey
  variant?: "default" | "success" | "warning" | "error" | "info"
  size?: "sm" | "md"
  pulse?: boolean
  children: React.ReactNode
}

export function DSBadge({
  site,
  variant = "default",
  size = "md",
  pulse = false,
  className,
  children,
  ...props
}: DSBadgeProps) {
  const config = siteConfigs[site]
  const isDark = config.theme === "dark"

  const sizeClasses = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-3 py-1 text-sm",
  }

  const getVariantStyles = (): React.CSSProperties => {
    const colors = {
      default: config.colors.primary,
      success: "#22c55e",
      warning: "#f59e0b",
      error: "#ef4444",
      info: "#3b82f6",
    }
    const color = colors[variant]

    return {
      background: `${color}20`,
      color: color,
      border: `1px solid ${color}30`,
    }
  }

  return (
    <span
      className={cn("inline-flex items-center gap-1.5 rounded-full font-medium", sizeClasses[size], className)}
      style={getVariantStyles()}
      {...props}
    >
      {pulse && (
        <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: getVariantStyles().color }} />
      )}
      {children}
    </span>
  )
}
