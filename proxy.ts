import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

const CANONICAL_HOST = "davidtiz.com"
const REDIRECT_HOSTS = new Set([
  "www.davidtiz.com",
  "cs-learning.me",
  "www.cs-learning.me",
])

export function proxy(request: NextRequest) {
  const host = request.headers.get("host")

  if (!host || !REDIRECT_HOSTS.has(host)) {
    return NextResponse.next()
  }

  const target = new URL(request.url)
  target.protocol = "https:"
  target.host = CANONICAL_HOST

  return NextResponse.redirect(target, 308)
}

export const config = {
  matcher: [
    "/((?!api/chat|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)",
  ],
}
