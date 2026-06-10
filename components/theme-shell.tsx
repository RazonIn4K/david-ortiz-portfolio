"use client"

import type { ReactNode } from "react"
import { useSiteTheme } from "@/components/use-site-theme"

// Wraps secondary pages (contact, portfolio, privacy, 404, error) in the
// same `.dtz-site` scope as the homepage, so the dtz-* design tokens cascade
// and the saved light/dark preference applies site-wide instead of only on
// the homepage. Pages style themselves with var(--dtz-*) on top of this.
export function ThemeShell({ children }: { children: ReactNode }) {
  const { theme } = useSiteTheme()

  return <div className={`dtz-site dtz-${theme}`}>{children}</div>
}
