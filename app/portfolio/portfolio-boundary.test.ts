import fs from "node:fs"
import path from "node:path"

import { describe, expect, it } from "vitest"

import { homeProofRecords } from "@/data/home-content"

const portfolioSource = fs.readFileSync(
  path.join(process.cwd(), "app", "portfolio", "page.tsx"),
  "utf8",
)

describe("personal portfolio route boundary", () => {
  it("organizes the Hernandez record around personal judgment and checked-in evidence", () => {
    for (const field of [
      "portfolioProof.problem",
      "portfolioProof.role",
      "portfolioProof.decision",
      "portfolioProof.tradeoff",
      "portfolioProof.evidence.status",
      "portfolioProof.evidence.note",
    ]) {
      expect(portfolioSource).toContain(field)
    }

    const assets = [
      "/portfolio/hernandez/site-screenshot.png",
      "/portfolio/hernandez/site-trust-screenshot.png",
      "/portfolio/hernandez/landscape-work-hero.jpeg",
    ]
    for (const asset of assets) {
      expect(portfolioSource).toContain(asset)
      expect(fs.existsSync(path.join(process.cwd(), "public", asset))).toBe(true)
    }

    const record = homeProofRecords.find(candidate => candidate.id === "hernandez-landscape")
    expect(record?.evidence.status).toBe("Checked-in record")
    expect(record?.evidence.note).toContain("recorded account")
    expect(portfolioSource).toContain(
      "The problem, role, decision, and tradeoff are David&apos;s recorded account"
    )
    expect(portfolioSource).toMatch(
      /images support only the visual observations stated here/
    )
    expect(portfolioSource).toContain("The retained project image provides visual context only")
    expect(portfolioSource).not.toContain("Source-backed")
  })

  it("does not render a service package, commercial intake, or sibling-business handoff", () => {
    for (const forbidden of [
      "businessSiteUrl",
      "highencodelearning.com",
      "packageExamples",
      "Website launch",
      "Local growth",
      "Ongoing care",
      "Services and work page",
      "Read case note",
      "Want something like this for your local business?",
      "Start a project",
      "services-facing contact flow",
      "hernandezlandscapeservices.com",
    ]) {
      expect(portfolioSource).not.toContain(forbidden)
    }
  })
})
