"use client"

import { useEffect, useState } from "react"

// Single source of truth for the site theme: honors ?theme=, then the
// davidtiz-theme localStorage key, then prefers-color-scheme. Used by the
// homepage (which also renders the toggle) and by ThemeShell for subpages.
export function useSiteTheme() {
  const [theme, setTheme] = useState<"light" | "dark">("light")

  useEffect(() => {
    const requestedTheme = new URLSearchParams(window.location.search).get("theme")
    let nextTheme: "light" | "dark" | null = null

    if (requestedTheme === "light" || requestedTheme === "dark") {
      nextTheme = requestedTheme
      window.localStorage.setItem("davidtiz-theme", requestedTheme)
    } else {
      const savedTheme = window.localStorage.getItem("davidtiz-theme")
      if (savedTheme === "light" || savedTheme === "dark") {
        nextTheme = savedTheme
      } else if (window.matchMedia?.("(prefers-color-scheme: dark)").matches) {
        nextTheme = "dark"
      }
    }

    if (!nextTheme) return

    const frame = window.requestAnimationFrame(() => setTheme(nextTheme))
    return () => window.cancelAnimationFrame(frame)
  }, [])

  const updateTheme = (nextTheme: "light" | "dark") => {
    setTheme(nextTheme)
    window.localStorage.setItem("davidtiz-theme", nextTheme)
  }

  return { theme, updateTheme }
}
