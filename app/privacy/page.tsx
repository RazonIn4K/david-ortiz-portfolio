import type { Metadata } from "next"

import { ThemeShell } from "@/components/theme-shell"
import { PrivacyMotion } from "./privacy-motion"

export const metadata: Metadata = {
  title: "Privacy Policy | David Ortiz",
  description:
    "Privacy policy for davidtiz.com — analytics, email contact, data retention, and deletion instructions.",
}

export default function PrivacyPage() {
  return (
    <ThemeShell>
      <PrivacyMotion />
    </ThemeShell>
  )
}
