"use client"

import { useEffect, useState } from "react"

// Single source of truth for the site theme: honors ?theme=, then the
// davidtiz-theme localStorage key, then prefers-color-scheme. Used by the
// homepage (which also renders the toggle) and by ThemeShell for subpages.
export function useSiteTheme() {
  const [theme, setTheme] = useState<"light" | "dark">("light")

  useEffect(() => {
    const rootTheme = document.documentElement.dataset.dtzTheme
    const frame = window.requestAnimationFrame(() => {
      setTheme(rootTheme === "dark" ? "dark" : "light")
    })
    return () => window.cancelAnimationFrame(frame)
  }, [])

  const updateTheme = (nextTheme: "light" | "dark") => {
    setTheme(nextTheme)
    document.documentElement.dataset.dtzTheme = nextTheme
    document.documentElement.style.colorScheme = nextTheme
    window.localStorage.setItem("davidtiz-theme", nextTheme)
  }

  return { theme, updateTheme }
}
