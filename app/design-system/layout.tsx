import type { Metadata } from "next"
import type React from "react"

// The design-system showcase is an internal reference page, not part of the
// public portfolio. Keep it out of search results.
export const metadata: Metadata = {
  title: "Design System — David Ortiz",
  robots: { index: false, follow: false },
}

export default function DesignSystemLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
