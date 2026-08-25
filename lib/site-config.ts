const DEFAULT_PERSONAL_SITE_URL = "https://davidtiz.com"

function normalizeUrl(candidate: string | undefined, fallback: string) {
  if (!candidate) return fallback

  try {
    return new URL(candidate).toString().replace(/\/$/, "")
  } catch {
    return fallback
  }
}

function hostnameFor(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "")
  } catch {
    return url
  }
}

export const personalSiteUrl = normalizeUrl(
  process.env.NEXT_PUBLIC_PERSONAL_SITE_URL,
  DEFAULT_PERSONAL_SITE_URL
)

export const personalSiteDomain = hostnameFor(personalSiteUrl)
export const personalSiteName = "David Ortiz Personal Site"
export const personalSitePublicLabel = personalSiteDomain
