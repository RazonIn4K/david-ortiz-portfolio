import fs from "node:fs"
import path from "node:path"

import { describe, expect, it } from "vitest"

const homePageSource = fs.readFileSync(
  path.join(process.cwd(), "components", "personal-homepage.tsx"),
  "utf8",
)
const globalStyles = fs.readFileSync(path.join(process.cwd(), "app", "globals.css"), "utf8")

describe("personal homepage implementation contract", () => {
  it("renders the typed three-record proof model and typed primary actions", () => {
    expect(homePageSource).toContain("homeProofRecords.map")
    expect(homePageSource).toContain("homePrimaryActions.map")
    expect(homePageSource).toContain('id="work"')
    expect(homePageSource).toContain('id="notes"')
  })

  it("removes the former service-like and brand-directory homepage structures", () => {
    for (const forbidden of [
      "const proofSurfaces",
      "const setupCards",
      "const workAreas",
      "dtz-services-section",
      "What David can set up",
      "Razon Live Lab",
      "razonlab.com",
      "businessSiteUrl",
      "Start a project",
      "AIAssistant",
      "@/components/ai-assistant",
      "/api/chat",
    ]) {
      expect(homePageSource).not.toContain(forbidden)
    }
  })

  it("keeps the protected personal contact component in place", () => {
    expect(homePageSource).toContain("ProtectedWhatsAppLink")
    expect(homePageSource).toContain("whatsappHref")
    expect(homePageSource).toContain('href="/contact/whatsapp?intent=callback"')
  })

  it("does not hide selected navigation items on small screens", () => {
    expect(globalStyles).not.toMatch(/\.dtz-nav-list li:nth-child\(\d+\)/)
  })

  it("keeps each theme radio named when its visible text is hidden on phones", () => {
    expect(homePageSource).toContain("aria-label={option.label}")
  })

  it("keeps the critical proof content independent from client-side motion state", () => {
    expect(homePageSource).not.toContain('from "framer-motion"')
    expect(homePageSource).not.toContain("useReducedMotion")
    expect(homePageSource).not.toContain("initial={{ opacity: 0")
  })

  it("dates the current-focus checkpoint instead of presenting it as timeless", () => {
    expect(homePageSource).toContain("Aug 2026")
    expect(homePageSource).not.toContain("<strong>Now</strong>")
  })
})
