"use client"

import { Moon, Sun } from "lucide-react"

import { useSiteTheme } from "@/components/use-site-theme"

export function EditorialThemeToggle() {
  const { theme, updateTheme } = useSiteTheme()

  return (
    <div className="dtz-editorial-theme" role="group" aria-label="Color theme">
      {([
        { value: "light", label: "Light", icon: Sun },
        { value: "dark", label: "Dark", icon: Moon },
      ] as const).map((option) => {
        const Icon = option.icon
        const selected = theme === option.value

        return (
          <button
            key={option.value}
            type="button"
            className={selected ? "is-selected" : ""}
            aria-label={`${option.label} theme`}
            aria-pressed={selected}
            onClick={() => updateTheme(option.value)}
          >
            <Icon aria-hidden="true" />
            <span className="sr-only">{option.label}</span>
          </button>
        )
      })}
    </div>
  )
}
