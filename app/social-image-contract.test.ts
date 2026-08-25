import fs from "node:fs"
import path from "node:path"

import { describe, expect, it } from "vitest"

const portfolioCard = "/portfolio/hernandez/decision-record-og.png"
const writeupsCard = "/visuals/writeups-og-card.png"

function readSource(...segments: string[]) {
  return fs.readFileSync(path.join(process.cwd(), ...segments), "utf8")
}

function readPngDimensions(publicPath: string) {
  const filePath = path.join(process.cwd(), "public", publicPath)
  const bytes = fs.readFileSync(filePath)

  expect(bytes.subarray(0, 8)).toEqual(
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
  )

  return {
    width: bytes.readUInt32BE(16),
    height: bytes.readUInt32BE(20),
    size: bytes.byteLength,
  }
}

const portfolioSource = readSource("app", "portfolio", "page.tsx")
const writeupsSource = readSource("app", "writeups", "page.tsx")
const writeupSource = readSource("app", "writeups", "[slug]", "page.tsx")

describe("personal proof social image contract", () => {
  it.each([
    ["portfolio decision record", portfolioCard],
    ["security writeups", writeupsCard],
  ])("ships the %s card as a bounded 1200 by 630 PNG", (_label, publicPath) => {
    const dimensions = readPngDimensions(publicPath)

    expect(dimensions.width).toBe(1200)
    expect(dimensions.height).toBe(630)
    expect(dimensions.size).toBeLessThanOrEqual(300_000)
  })

  it("wires the checked-in portfolio record to its own large social card", () => {
    expect(portfolioSource).toContain(`url: "${portfolioCard}"`)
    expect(portfolioSource).toContain("width: 1200")
    expect(portfolioSource).toContain("height: 630")
    expect(portfolioSource).toContain(
      'alt: "David Ortiz personal decision record for the Hernandez Landscape interface"',
    )
    expect(portfolioSource).toContain('card: "summary_large_image"')
    expect(portfolioSource).toContain(`images: ["${portfolioCard}"]`)
  })

  it("wires the writeups index and every writeup detail to the shared large card", () => {
    for (const source of [writeupsSource, writeupSource]) {
      expect(source).toContain(`url: "${writeupsCard}"`)
      expect(source).toContain("width: 1200")
      expect(source).toContain("height: 630")
      expect(source).toContain(
        'alt: "David Ortiz security writeups with redacted field notes and trace analysis"',
      )
      expect(source).toContain('card: "summary_large_image"')
      expect(source).toContain(`images: ["${writeupsCard}"]`)
    }

    expect(writeupSource).toContain('title: `${writeup.title} | CTF Writeup`')
    expect(writeupSource).toContain("description: writeup.summary")
    expect(writeupSource).toContain('alternates: { canonical: `/writeups/${slug}` }')
    expect(writeupSource).toContain('url: `/writeups/${slug}`')
    expect(writeupSource).toContain('type: "article"')
    expect(writeupSource).toContain("publishedTime: writeup.date")
    expect(writeupSource).toContain('"@type": "TechArticle"')
    expect(writeupSource).toContain("datePublished: writeup.date")
  })
})
