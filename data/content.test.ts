import { describe, expect, it } from "vitest"

import * as content from "./content"

describe("runtime personal content boundary", () => {
  it("exports only the personal contact constants used by the application", () => {
    expect(Object.keys(content).sort()).toEqual(["contact", "whatsappHref"])
    expect(content.whatsappHref).toBe("/contact/whatsapp?intent=portfolio")
    expect(content.contact.email).toBe("hello@davidtiz.com")
  })

  it("does not retain an unused service catalog or sibling-brand directory", () => {
    expect(content).not.toHaveProperty("services")
    expect(content).not.toHaveProperty("showcaseProjects")
    expect(content).not.toHaveProperty("caseStudies")
    expect(content).not.toHaveProperty("resources")
    expect(content).not.toHaveProperty("processSteps")
  })
})
