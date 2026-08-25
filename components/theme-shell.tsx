import type { ReactNode } from "react"

// The root layout initializes `data-dtz-theme` before paint. This server-side
// wrapper only provides the shared design-token scope for secondary pages.
export function ThemeShell({ children }: { children: ReactNode }) {
  return <div className="dtz-site">{children}</div>
}
