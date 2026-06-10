import type { MetadataRoute } from "next"

const BASE_URL = "https://davidtiz.com"

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${BASE_URL}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${BASE_URL}/contact`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/portfolio`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/demo`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/privacy`, changeFrequency: "yearly", priority: 0.2 },
  ]
}
