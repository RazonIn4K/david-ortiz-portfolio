const DEFAULT_PERSONAL_SITE_URL = "https://david-ortiz-portfolio-flax.vercel.app"
const DEFAULT_BUSINESS_SITE_URL = "https://highencodelearning.com"

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
export const personalSitePublicLabel = "David Ortiz personal site"

export const businessSiteUrl = normalizeUrl(
  process.env.NEXT_PUBLIC_BUSINESS_SITE_URL,
  DEFAULT_BUSINESS_SITE_URL
)

export const businessSiteDomain = hostnameFor(businessSiteUrl)
