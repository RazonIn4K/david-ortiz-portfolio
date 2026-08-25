import { describe, expect, it } from "vitest"
import robots from "@/app/robots"
import sitemap from "@/app/sitemap"
import nextConfig from "@/next.config.mjs"
import { getAllWriteups, getWriteupSlugs } from "@/lib/writeups"
import { socialProfileLinks } from "@/lib/contact-links"

// These guard the SEO/hardening config against accidental edits: removing a
// disallow line or a header here is a deliberate decision, not a side effect.

describe("robots.txt config", () => {
  const config = robots()
  const rule = Array.isArray(config.rules) ? config.rules[0] : config.rules

  it("keeps crawlers off the operational routes", () => {
    const disallow = Array.isArray(rule.disallow) ? rule.disallow : [rule.disallow]
    for (const path of ["/admin/", "/api/", "/contact/whatsapp"]) {
      expect(disallow).toContain(path)
    }
  })

  it("allows the rest of the site and names the sitemap", () => {
    expect(rule.allow).toBe("/")
    expect(config.sitemap).toBe("https://davidtiz.com/sitemap.xml")
  })
})

describe("sitemap", () => {
  const urls = sitemap().map((entry) => entry.url)

  it("lists exactly the public content pages", () => {
    expect(urls).toEqual([
      "https://davidtiz.com/",
      "https://davidtiz.com/contact",
      "https://davidtiz.com/portfolio",
      "https://davidtiz.com/writeups",
      "https://davidtiz.com/privacy",
      ...getAllWriteups().map((writeup) => `https://davidtiz.com/writeups/${writeup.slug}`),
    ])
  })

  it("never lists noindex or operational routes", () => {
    for (const url of urls) {
      expect(url).not.toMatch(/\/(demo|pay|pagar|admin|api|contact\/whatsapp)/)
    }
  })

  it("uses each writeup's known publication date as its sitemap timestamp", () => {
    const writeupEntries = sitemap().filter((entry) => entry.url.includes("/writeups/"))
    expect(writeupEntries).toHaveLength(getWriteupSlugs().length)
    for (const entry of writeupEntries) {
      expect(entry.lastModified).toMatch(/^20\d{2}-\d{2}-\d{2}$/)
    }
  })
})

describe("security headers", () => {
  it("keeps the legacy demo surfaces out of search during temporary containment", async () => {
    const headerRules = await nextConfig.headers?.()
    if (!headerRules) throw new Error("nextConfig.headers is not defined")
    const demos = headerRules.find((entry) => entry.source === "/demo/:path*")
    if (!demos) throw new Error("demo containment header rule is missing")

    expect(demos.headers).toContainEqual({
      key: "X-Robots-Tag",
      value: "noindex, nofollow",
    })
  })

  it("applies the baseline hardening set to every route", async () => {
    const headerRules = await nextConfig.headers?.()
    if (!headerRules) throw new Error("nextConfig.headers is not defined")
    const all = headerRules.find((entry) => entry.source === "/(.*)")
    if (!all) throw new Error("catch-all header rule is missing")

    const byKey = Object.fromEntries(all.headers.map((header) => [header.key, header.value]))
    expect(byKey["X-Content-Type-Options"]).toBe("nosniff")
    expect(byKey["X-Frame-Options"]).toBe("DENY")
    expect(byKey["Referrer-Policy"]).toBe("strict-origin-when-cross-origin")
    expect(byKey["Permissions-Policy"]).toContain("camera=()")
  })
})

describe("Person structured-data profile boundary", () => {
  it("asserts only owner-person profiles and excludes Razon Lab channels", () => {
    expect(socialProfileLinks).toEqual([
      "https://github.com/RazonIn4K",
      "https://www.linkedin.com/in/davidortiz-dekalb/",
      "https://www.facebook.com/profile.php?id=61581646236939",
      "https://www.instagram.com/ra.z.on",
    ])

    for (const url of socialProfileLinks) {
      expect(url).not.toMatch(/youtube\.com\/\@razonlab|twitch\.tv\/razonlab|x\.com\/Razonapp/i)
    }
  })
})
