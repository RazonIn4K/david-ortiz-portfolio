import type { MetadataRoute } from "next"

// proxy.ts already exempts /robots.txt from the host-canonicalization
// middleware in anticipation of this file existing.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin/",
          "/api/",
          "/contact/whatsapp", // screened redirect + challenge endpoint, not content
          "/pay", // already noindex via page metadata
          "/pagar",
        ],
      },
    ],
    sitemap: "https://davidtiz.com/sitemap.xml",
  }
}
