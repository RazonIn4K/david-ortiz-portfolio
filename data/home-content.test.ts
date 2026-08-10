import { describe, expect, it } from "vitest"

import { homeNavigation, homePrimaryActions, homeProofRecords } from "./home-content"

describe("personal homepage content contract", () => {
  it("keeps exactly three evidence-backed flagship records", () => {
    expect(homeProofRecords).toHaveLength(3)

    for (const record of homeProofRecords) {
      expect(record.id.trim()).not.toBe("")
      expect(record.title.trim()).not.toBe("")
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
      { label: "View selected work", href: "#work" },
      { label: "Read operating notes", href: "#notes" },
    ])
  })

  it("keeps Work, process, Notes, and Contact visible in the homepage navigation", () => {
    expect(homeNavigation).toEqual([
      { label: "Work", href: "#work" },
      { label: "How I work", href: "#process" },
      { label: "Notes", href: "#notes" },
      { label: "Contact", href: "#contact" },
    ])
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
