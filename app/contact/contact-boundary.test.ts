import fs from "node:fs"
import path from "node:path"

import { describe, expect, it } from "vitest"

import { followWorkLinks, quickReachLinks } from "@/lib/contact-links"

const contactPageSource = fs.readFileSync(path.join(process.cwd(), "app", "contact", "page.tsx"), "utf8")
const contactLinksSource = fs.readFileSync(path.join(process.cwd(), "lib", "contact-links.ts"), "utf8")
const privacyPageSource = fs.readFileSync(path.join(process.cwd(), "app", "privacy", "page.tsx"), "utf8")
const compactPrivacyPageSource = privacyPageSource.replace(/\s+/g, " ")

describe("personal contact boundary", () => {
  it("keeps email first and removes WhatsApp from the public contact surface", () => {
    expect(quickReachLinks[0]).toMatchObject({ id: "email", href: "mailto:hello@davidtiz.com" })

    for (const forbidden of ["ProtectedWhatsAppLink", "whatsappHref", "WhatsApp", "/contact/whatsapp"]) {
      expect(contactPageSource).not.toContain(forbidden)
      expect(JSON.stringify(quickReachLinks)).not.toContain(forbidden)
    }

    for (const reason of ["role", "collaboration", "question", "idea"]) {
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
      expect(link.href).not.toMatch(/razonlab|Razonapp|RazonWorks|HighEncode/i)
    }
  })

  it("describes direct correspondence without presenting this site as business intake", () => {
    expect(compactPrivacyPageSource).toContain("Direct contact")
    expect(compactPrivacyPageSource).toContain("ordinary correspondence")
    expect(compactPrivacyPageSource).toContain("contact records")

    for (const forbidden of ["WhatsApp", "services you ask about", "lead record", "RazonWorks"]) {
      expect(privacyPageSource).not.toContain(forbidden)
    }
  })

  it("does not present parked workflow infrastructure as an active public-path processor", () => {
    expect(compactPrivacyPageSource).not.toContain("Google Cloud (workflow processing and storage)")
    expect(compactPrivacyPageSource).not.toContain("Meta's WhatsApp Business Platform")
    expect(compactPrivacyPageSource).not.toContain("webhook")
  })
})
