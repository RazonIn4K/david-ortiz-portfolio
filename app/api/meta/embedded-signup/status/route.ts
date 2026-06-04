import { NextRequest, NextResponse } from "next/server"
import {
  getCoexistencePublicConfig,
  getMissingCoexistenceConfig,
  isValidCoexistenceAdminKey,
  redactIdentifier,
} from "@/lib/meta-embedded-signup"

export const runtime = "nodejs"

export async function GET(request: NextRequest) {
  const key = request.nextUrl.searchParams.get("key") ?? request.headers.get("x-admin-key")

  if (!isValidCoexistenceAdminKey(key)) {
    return NextResponse.json({ error: "Not found" }, { status: 404 })
  }

  const config = getCoexistencePublicConfig()
  const missing = getMissingCoexistenceConfig()

  return NextResponse.json({
    configured: missing.length === 0,
    currentOfficialLane: {
      phoneNumberId: redactIdentifier(process.env.WHATSAPP_PHONE_NUMBER_ID),
      wabaId: redactIdentifier(process.env.WHATSAPP_BUSINESS_ACCOUNT_ID),
    },
    launcher: {
      appId: config.appId,
      configId: redactIdentifier(config.configId),
      graphVersion: config.graphVersion,
      redirectUri: config.redirectUri,
    },
    missing,
    warning:
      "If Meta says disconnect, migrate, transfer, remove, deregister, or free up 779, stop.",
  })
}
