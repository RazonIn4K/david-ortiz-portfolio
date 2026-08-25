import fs from "node:fs"
import path from "node:path"

import { describe, expect, it } from "vitest"

const homePageSource = fs.readFileSync(
  path.join(process.cwd(), "components", "personal-homepage.tsx"),
  "utf8",
)
const globalStyles = fs.readFileSync(path.join(process.cwd(), "app", "globals.css"), "utf8")

describe("personal homepage implementation contract", () => {
  it("renders the typed three-record proof model and editorial primary actions", () => {
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

  it("keeps operational contact mechanics out of the public homepage", () => {
    for (const forbidden of [
      "ProtectedWhatsAppLink",
      "whatsappHref",
      "WhatsApp",
      "Contact guardrails",
      "short-lived challenge",
      "replay checks",
      "bare phone number",
    ]) {
      expect(homePageSource).not.toContain(forbidden)
    }

    expect(homePageSource).toContain("mailto:${contact.email}")
    expect(homePageSource).toContain("More ways to connect")
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

  it("renders actual proof captures and a separate decorative generated hero visual", () => {
    expect(homePageSource).toContain("record.visual.src")
    expect(homePageSource).toContain("record.visual.alt")
    expect(homePageSource).toContain("record.visual.browserPath")
    expect(homePageSource).toContain("/visuals/editorial-systems-layers.webp")
    expect(homePageSource).toContain("Decorative systems study")
    expect(globalStyles).toContain("prefers-reduced-motion: reduce")
    expect(globalStyles).toContain("animation-timeline: view()")
  })

  it("dates the editorial introduction instead of presenting it as timeless", () => {
    expect(homePageSource).toContain("August 2026")
    expect(homePageSource).not.toContain("<strong>Now</strong>")
  })
})
