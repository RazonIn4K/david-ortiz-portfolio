import { describe, expect, it } from "vitest"

import { buildContactMailto, getContactEmailParts } from "@/lib/contact-links"
import { contact } from "@/data/content"

describe("contact mailto helpers", () => {
  it("parses canonical contact email parts", () => {
    expect(getContactEmailParts()).toEqual({
      user: "hello",
      domain: "davidtiz.com",
    })
    expect(getContactEmailParts().user + "@" + getContactEmailParts().domain).toBe(contact.email)
  })

  it("builds a mailto href with optional subject", () => {
    expect(buildContactMailto()).toBe(`mailto:${contact.email}`)
    expect(buildContactMailto("Project inquiry")).toBe(
      `mailto:${contact.email}?subject=${encodeURIComponent("Project inquiry")}`,
    )
  })
})
