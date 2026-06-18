import type { MetadataRoute } from "next"

import { getWriteupSlugs } from "@/lib/writeups"

const BASE_URL = "https://davidtiz.com"

export default function sitemap(): MetadataRoute.Sitemap {
  const writeupRoutes: MetadataRoute.Sitemap = getWriteupSlugs().map((slug) => ({
    url: `${BASE_URL}/writeups/${slug}`,
    changeFrequency: "yearly",
    priority: 0.4,
  }))

  return [
    { url: `${BASE_URL}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${BASE_URL}/contact`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/portfolio`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/writeups`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/demo`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/privacy`, changeFrequency: "yearly", priority: 0.2 },
    ...writeupRoutes,
  ]
}
