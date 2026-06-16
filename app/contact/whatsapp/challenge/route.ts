import { NextRequest, NextResponse } from "next/server"
import { randomBytes } from "node:crypto"

export const runtime = "nodejs"

const CHALLENGE_COOKIE_NAME = "dzt-contact-challenge"
const CHALLENGE_COOKIE_PATH = "/contact/whatsapp"
const CHALLENGE_TTL_SECONDS = 10 * 60

// Issues a single-use contact challenge. The token is returned to the caller
// (so it can be echoed back as the `?challenge=` query param on the outbound
// link) AND set as a cookie server-side. The cookie is HttpOnly so client JS
// can neither read nor forge it; the redirect route (/contact/whatsapp) then
// compares the full cookie challenge value against the query challenge value.
// Minting and validation are both server-side now, which also removes the old
// client/server clock-skew failure mode on the expiry check.
export function GET(request: NextRequest) {
  const token = `${randomBytes(16).toString("hex")}.${Date.now()}`

  const response = NextResponse.json(
    { token, expiresIn: CHALLENGE_TTL_SECONDS },
    { headers: { "Cache-Control": "no-store" } },
  )

  response.cookies.set(CHALLENGE_COOKIE_NAME, token, {
    path: CHALLENGE_COOKIE_PATH,
    maxAge: CHALLENGE_TTL_SECONDS,
    sameSite: "lax",
    httpOnly: true,
    secure: request.nextUrl.protocol === "https:",
  })

  return response
}
