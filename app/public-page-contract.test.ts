import fs from "node:fs"
import path from "node:path"

import { describe, expect, it } from "vitest"

function readSource(...segments: string[]) {
  return fs.readFileSync(path.join(process.cwd(), ...segments), "utf8")
}

const layoutSource = readSource("app", "layout.tsx")
const homeSource = readSource("app", "page.tsx")
const homeComponentSource = readSource("components", "personal-homepage.tsx")
const portfolioSource = readSource("app", "portfolio", "page.tsx")
const writeupsSource = readSource("app", "writeups", "page.tsx")
const writeupSource = readSource("app", "writeups", "[slug]", "page.tsx")
const contactSource = readSource("app", "contact", "page.tsx")
const privacySource = readSource("app", "privacy", "page.tsx")

const innerPageSources = {
  portfolio: portfolioSource,
  writeups: writeupsSource,
  "writeup detail": writeupSource,
  contact: contactSource,
  privacy: privacySource,
}

describe("public page landmark contract", () => {
  it("keeps the root layout as the only main landmark owner", () => {
    expect(layoutSource.match(/<main\b/g)).toHaveLength(1)
    expect(layoutSource.match(/<\/main>/g)).toHaveLength(1)
    expect(layoutSource).toContain('<main id="main-content" tabIndex={-1}>')

    for (const [route, source] of Object.entries(innerPageSources)) {
      expect(source.match(/<main\b/g), `${route} must not nest a main landmark`).toBeNull()
      expect(source.match(/<\/main>/g), `${route} must not close a nested main landmark`).toBeNull()
    }

    expect(homeComponentSource.match(/<main\b/g)).toBeNull()
    expect(homeComponentSource.match(/<\/main>/g)).toBeNull()
  })
})

describe("public page discovery metadata contract", () => {
  it("gives the home route a canonical while retaining personal social metadata", () => {
    expect(homeSource).toContain('alternates: { canonical: "/" }')
    expect(layoutSource).toContain("openGraph:")
    expect(layoutSource).toContain("twitter:")
    expect(layoutSource).toContain('url: siteUrl')
  })

  it.each([
    {
      route: "contact",
      source: contactSource,
      canonical: "/contact",
      title: "Contact | David Ortiz",
    },
    {
      route: "privacy",
      source: privacySource,
      canonical: "/privacy",
      title: "Privacy Policy | David Ortiz",
    },
    {
      route: "writeups",
      source: writeupsSource,
      canonical: "/writeups",
      title: "CTF Writeups | David Ortiz",
    },
  ])("keeps $route canonical and social metadata route-specific", ({ source, canonical, title }) => {
    expect(source).toContain(`alternates: { canonical: "${canonical}" }`)
    expect(source).toContain("openGraph:")
    expect(source).toContain(`url: "${canonical}"`)
    expect(source).toContain("twitter:")
    expect(source.match(new RegExp(`title: \"${title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\"`, "g"))).toHaveLength(3)
  })

  it("keeps writeup-detail canonical and social metadata tied to the selected writeup", () => {
    expect(writeupSource).toContain('alternates: { canonical: `/writeups/${slug}` }')
    expect(writeupSource).toContain('url: `/writeups/${slug}`')
    expect(writeupSource).toContain("openGraph:")
    expect(writeupSource).toContain("twitter:")
    expect(writeupSource.match(/title: `\$\{writeup\.title\} \| CTF Writeup`/g)).toHaveLength(3)
    expect(writeupSource.match(/description: writeup\.summary/g)).toHaveLength(4)
  })
})
