import fs from "node:fs"
import path from "node:path"

import { describe, expect, it } from "vitest"

import { followWorkLinks, quickReachLinks } from "@/lib/contact-links"

const contactPageSource = fs.readFileSync(path.join(process.cwd(), "app", "contact", "page.tsx"), "utf8")
const contactLinksSource = fs.readFileSync(path.join(process.cwd(), "lib", "contact-links.ts"), "utf8")
const privacyPageSource = fs.readFileSync(path.join(process.cwd(), "app", "privacy", "page.tsx"), "utf8")
const compactPrivacyPageSource = privacyPageSource.replace(/\s+/g, " ")

describe("personal contact boundary", () => {
  it("keeps the screened personal WhatsApp path and names the allowed reasons to connect", () => {
    expect(contactPageSource).toContain("ProtectedWhatsAppLink")
    expect(contactPageSource).toContain("href={whatsappHref}")
    expect(quickReachLinks.find((link) => link.id === "whatsapp")?.href).toBe(
      "/contact/whatsapp?intent=portfolio",
    )

    for (const reason of ["employment", "collaboration", "speaking", "referrals", "peer conversations"]) {
      expect(contactPageSource).toContain(reason)
    }
  })

  it("does not render a commercial intake or package marketplace", () => {
    const renderedContactContract = `${contactPageSource}\n${JSON.stringify({ quickReachLinks, followWorkLinks })}`

    for (const forbidden of [
      "hireMeLinks",
      "Hire me",
      "direct work-intake",
      "freelance",
      "structured intake",
      "Start a project",
      "scoped business discussion",
      "Upwork",
      "Fiverr",
      "productized package",
    ]) {
      expect(renderedContactContract).not.toContain(forbidden)
      expect(contactLinksSource).not.toContain(forbidden)
    }
  })

  it("presents channel links as David's profiles rather than sibling brands", () => {
    for (const link of [...quickReachLinks, ...followWorkLinks]) {
      expect(link.label).not.toMatch(/RazonWorks|Razon Lab|High Encode|CSBrainAI/i)
    }
  })

  it("describes personal contact records without presenting this site as business intake", () => {
    expect(compactPrivacyPageSource).toContain("WhatsApp contact messaging")
    expect(compactPrivacyPageSource).toContain("personal contact request")
    expect(compactPrivacyPageSource).toContain("Commercial service inquiries belong with RazonWorks")
    expect(compactPrivacyPageSource).toContain("contact record")

    for (const forbidden of ["WhatsApp business messaging", "services you ask about", "lead record"]) {
      expect(privacyPageSource).not.toContain(forbidden)
    }
  })

  it("does not present parked workflow infrastructure as an active public-path processor", () => {
    expect(compactPrivacyPageSource).toContain("Optional webhook and workflow integrations")
    expect(compactPrivacyPageSource).not.toContain("Google Cloud (workflow processing and storage)")
    expect(compactPrivacyPageSource).not.toContain("Meta's WhatsApp Business Platform")
  })
})
