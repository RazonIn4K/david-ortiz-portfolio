import { describe, expect, it } from "vitest"

import { homeNavigation, homePrimaryActions, homeProofRecords } from "./home-content"

describe("personal homepage content contract", () => {
  it("keeps exactly three evidence-backed flagship records", () => {
    expect(homeProofRecords).toHaveLength(3)

    for (const record of homeProofRecords) {
      expect(record.id.trim()).not.toBe("")
      expect(record.title.trim()).not.toBe("")
      expect(record.summary.trim()).not.toBe("")
      expect(record.year).toMatch(/^20\d{2}$/)
      expect(record.problem.trim()).not.toBe("")
      expect(record.role.trim()).not.toBe("")
      expect(record.decision.trim()).not.toBe("")
      expect(record.tradeoff.trim()).not.toBe("")
      expect(record.evidence.label.trim()).not.toBe("")
      expect(record.evidence.status.trim()).not.toBe("")
      expect(record.evidence.href).toMatch(/^(\/|#)/)
    }
  })

  it("uses local Work and Notes links as the two primary actions", () => {
    expect(homePrimaryActions).toEqual([
      { label: "Explore selected work", href: "#work" },
      { label: "Read the field notes", href: "#notes" },
    ])
  })

  it("keeps Work, Approach, Notes, and Contact visible in the homepage navigation", () => {
    expect(homeNavigation).toEqual([
      { label: "Work", href: "#work" },
      { label: "Approach", href: "#approach" },
      { label: "Notes", href: "#notes" },
      { label: "Contact", href: "#contact" },
    ])
  })

  it("uses real work and published writeups instead of contact infrastructure as proof", () => {
    const homepageData = JSON.stringify(homeProofRecords).toLowerCase()

    expect(homepageData).toContain("hernandez landscape")
    expect(homepageData).toContain("uplink")
    expect(homepageData).toContain("stolen swipe")
    expect(homepageData).not.toContain("whatsapp")
    expect(homepageData).not.toContain("replay")
  })

  it("does not turn homepage data into a service catalog or sibling-brand router", () => {
    const homepageData = JSON.stringify({
      homeNavigation,
      homePrimaryActions,
      homeProofRecords,
    }).toLowerCase()

    for (const forbidden of [
      "start a project",
      "book a call",
      "free audit",
      "pricing",
      "service package",
      "highencodelearning.com",
      "businesssiteurl",
      "razonworks",
      "high encode",
      "razon lab",
      "csbrainai",
    ]) {
      expect(homepageData).not.toContain(forbidden)
    }
  })
})
