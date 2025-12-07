"use client"

import type * as React from "react"
import { cn } from "@/lib/utils"
import type { SiteKey } from "@/lib/design-system/site-configs"
import { siteConfigs } from "@/lib/design-system/site-configs"

interface DSInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  site: SiteKey
  label?: string
  error?: string
  icon?: React.ReactNode
}

export function DSInput({ site, label, error, icon, className, ...props }: DSInputProps) {
  const config = siteConfigs[site]
  const isDark = config.theme === "dark"

  return (
    <div className="w-full">
      {label && (
        <label className={cn("block text-sm font-medium mb-2", isDark ? "text-white/70" : "text-neutral-600")}>
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div
            className={cn("absolute left-4 top-1/2 -translate-y-1/2", isDark ? "text-white/40" : "text-neutral-400")}
          >
            {icon}
          </div>
        )}
        <input
          className={cn(
            "w-full rounded-xl px-4 py-3 transition-all duration-200",
            "focus:outline-none focus:ring-2",
            icon && "pl-11",
            isDark
              ? "bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:border-transparent"
              : "bg-neutral-50 border border-neutral-200 text-neutral-900 placeholder:text-neutral-400 focus:border-transparent",
            error && "border-red-500 focus:ring-red-500/30",
            className,
          )}
          style={{
            ["--tw-ring-color" as string]: error ? "rgba(239, 68, 68, 0.3)" : `${config.colors.primary}40`,
          }}
          {...props}
        />
      </div>
      {error && <p className="mt-1.5 text-sm text-red-500">{error}</p>}
    </div>
  )
}
