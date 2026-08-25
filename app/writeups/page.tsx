import type { Metadata } from "next"

import { ThemeShell } from "@/components/theme-shell"
import { getAllWriteups } from "@/lib/writeups"
import { WriteupsMotion } from "./writeups-motion"

export const metadata: Metadata = {
  title: "CTF Writeups | David Ortiz",
  description:
    "Capture-the-Flag writeups by David Ortiz across binary exploitation, privilege escalation, cryptography, and log forensics. Flags redacted; technique-focused.",
  alternates: { canonical: "/writeups" },
  openGraph: {
    title: "CTF Writeups | David Ortiz",
    description:
      "Capture-the-Flag writeups across binary exploitation, privilege escalation, cryptography, and log forensics.",
    url: "/writeups",
    type: "website",
  },
}

export default function WriteupsPage() {
  const writeups = getAllWriteups()

  return (
    <ThemeShell>
      <WriteupsMotion writeups={writeups} />
    </ThemeShell>
  )
}
