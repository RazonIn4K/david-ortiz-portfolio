import { NextRequest, NextResponse } from "next/server"
import { contact } from "@/data/content"

const intentMessages = {
  portfolio: "Hola David, vi tu portafolio",
  callback: "Hola David, vi tu portafolio. Me gustaria pedir una llamada cuando tengas tiempo.",
  localSite: "Hola David, vi tus demos para negocios locales y quiero una pagina asi para mi negocio.",
  automation: "Hola David, quiero hablar de una automatizacion o flujo de trabajo.",
} as const

type Intent = keyof typeof intentMessages

export function GET(request: NextRequest) {
  const intent = request.nextUrl.searchParams.get("intent")
  const customText = request.nextUrl.searchParams.get("text")?.trim()
  const safeIntent: Intent = isIntent(intent) ? intent : "portfolio"
  const target = new URL(`https://wa.me/${contact.whatsappNumber}`)

  target.searchParams.set("text", customText ? customText.slice(0, 1200) : intentMessages[safeIntent])

  const response = NextResponse.redirect(target, 302)
  response.headers.set("X-Robots-Tag", "noindex,nofollow")

  return response
}

function isIntent(value: string | null): value is Intent {
  return Boolean(value && value in intentMessages)
}
