import { NextRequest, NextResponse } from "next/server"
import { verifyCoexistenceSignupState } from "@/lib/meta-embedded-signup"

export const runtime = "nodejs"

type CallbackPayload = {
  loginResponse?: {
    authResponse?: {
      code?: string
      expiresIn?: number
      graphDomain?: string
      userID?: string
    }
    status?: string
  }
  sessionInfo?: unknown
  state?: string
}

export async function POST(request: NextRequest) {
  const payload = (await request.json().catch(() => null)) as CallbackPayload | null

  if (!payload || !verifyCoexistenceSignupState(payload.state)) {
    return NextResponse.json({ error: "Invalid or expired state" }, { status: 401 })
  }

  const codeReceived = typeof payload.loginResponse?.authResponse?.code === "string"
  const extracted = extractEmbeddedSignupIds(payload.sessionInfo)

  console.info("WhatsApp coexistence embedded signup callback recorded", {
    codeReceived,
    phoneNumberId: extracted.phoneNumberId,
    status: payload.loginResponse?.status,
    wabaId: extracted.wabaId,
  })

  return NextResponse.json({
    codeReceived,
    extracted,
    nextStep:
      "Do not update production IDs until 779 is confirmed to remain active in the WhatsApp Business app.",
    recorded: true,
  })
}

export async function GET(request: NextRequest) {
  const state = request.nextUrl.searchParams.get("state")
  const code = request.nextUrl.searchParams.get("code")
  const error = request.nextUrl.searchParams.get("error")
  const errorDescription = request.nextUrl.searchParams.get("error_description")

  if (!verifyCoexistenceSignupState(state)) {
    return renderCallbackPage("Invalid or expired state", [
      "Close this tab.",
      "Return to the launcher and start again.",
    ])
  }

  if (error) {
    console.warn("WhatsApp coexistence embedded signup returned error", {
      error,
      errorDescription,
    })

    return renderCallbackPage("Meta returned an error", [
      errorDescription ?? error,
      "No production settings were changed.",
    ])
  }

  console.info("WhatsApp coexistence embedded signup GET callback recorded", {
    codeReceived: typeof code === "string" && code.length > 0,
  })

  return renderCallbackPage("Authorization code received", [
    "This callback intentionally did not exchange the code for tokens.",
    "Confirm 779 still works in the WhatsApp Business app before updating any production identifiers.",
  ])
}

function extractEmbeddedSignupIds(sessionInfo: unknown) {
  const records = collectRecords(sessionInfo)

  return {
    phoneNumberId: findStringValue(records, ["phone_number_id", "phoneNumberId"]),
    wabaId: findStringValue(records, ["waba_id", "wabaId", "whatsapp_business_account_id"]),
  }
}

function collectRecords(value: unknown): Record<string, unknown>[] {
  if (!isRecord(value)) {
    return []
  }

  const records = [value]

  Object.values(value).forEach((item) => {
    if (isRecord(item)) {
      records.push(...collectRecords(item))
    }

    if (Array.isArray(item)) {
      item.forEach((entry) => records.push(...collectRecords(entry)))
    }
  })

  return records
}

function findStringValue(records: Record<string, unknown>[], keys: string[]) {
  for (const record of records) {
    for (const key of keys) {
      const value = record[key]

      if (typeof value === "string" && value.length > 0) {
        return value
      }
    }
  }

  return null
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null
}

function renderCallbackPage(title: string, lines: string[]) {
  const escapedTitle = escapeHtml(title)
  const escapedLines = lines.map((line) => `<li>${escapeHtml(line)}</li>`).join("")

  return new NextResponse(
    `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="robots" content="noindex,nofollow" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapedTitle}</title>
    <style>
      body { font-family: ui-sans-serif, system-ui, sans-serif; margin: 0; padding: 32px; background: #f8f5ef; color: #1c1917; }
      main { max-width: 720px; margin: 0 auto; background: white; border: 1px solid #d6d3d1; border-radius: 24px; padding: 28px; }
      h1 { margin-top: 0; font-size: 28px; }
      li { margin: 10px 0; line-height: 1.5; }
      strong { color: #991b1b; }
    </style>
  </head>
  <body>
    <main>
      <h1>${escapedTitle}</h1>
      <p><strong>Do not update production yet.</strong></p>
      <ul>${escapedLines}</ul>
    </main>
  </body>
</html>`,
    {
      headers: {
        "Content-Type": "text/html; charset=utf-8",
      },
    }
  )
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;")
}
