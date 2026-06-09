import { NextRequest, NextResponse } from "next/server"
import {
  exchangeCoexistenceCode,
  isTokenExchangeEnabled,
  redactIdentifier,
  verifyCoexistenceSignupState,
} from "@/lib/meta-embedded-signup"

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

  const code = payload.loginResponse?.authResponse?.code
  const codeReceived = typeof code === "string"
  const extracted = extractEmbeddedSignupIds(payload.sessionInfo)

  console.info("WhatsApp coexistence embedded signup callback recorded", {
    codeReceived,
    phoneNumberId: extracted.phoneNumberId,
    status: payload.loginResponse?.status,
    wabaId: extracted.wabaId,
  })

  // Server-side token exchange, gated by a default-off env flag. The signed
  // state above already proves this request came from the admin-key-gated
  // launcher, and the token is returned ONCE in this operator-facing response
  // (the launcher renders it for the manual Doppler/Vercel env update). It is
  // never logged and nothing in production is updated automatically.
  let tokenExchange:
    | { attempted: false; reason: string }
    | { attempted: true; ok: false; error: string }
    | {
        attempted: true
        ok: true
        accessToken: string
        tokenType: string | null
        expiresIn: number | null
        storeWith: string
      }

  if (!isTokenExchangeEnabled()) {
    tokenExchange = {
      attempted: false,
      reason:
        "Token exchange is disabled. Set META_EMBEDDED_SIGNUP_ALLOW_TOKEN_EXCHANGE=true to enable it for a deliberate launcher run.",
    }
  } else if (!codeReceived) {
    tokenExchange = { attempted: false, reason: "No authorization code in the callback payload." }
  } else {
    const result = await exchangeCoexistenceCode(code)

    if (result.ok) {
      console.info("WhatsApp coexistence token exchange succeeded", {
        expiresIn: result.expiresIn,
        tokenPreview: redactIdentifier(result.accessToken),
        tokenType: result.tokenType,
      })
      tokenExchange = {
        attempted: true,
        ok: true,
        accessToken: result.accessToken,
        tokenType: result.tokenType,
        expiresIn: result.expiresIn,
        storeWith:
          "Shown once. Store manually: doppler secrets set WHATSAPP_ACCESS_TOKEN --project david-ortiz-portfolio. Do not commit it anywhere.",
      }
    } else {
      console.error("WhatsApp coexistence token exchange failed", { error: result.error })
      tokenExchange = { attempted: true, ok: false, error: result.error }
    }
  }

  return NextResponse.json({
    codeReceived,
    extracted,
    tokenExchange,
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
