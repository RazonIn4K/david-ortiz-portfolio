"use client"

import type { AnchorHTMLAttributes, ReactNode } from "react"
import { useEffect, useState } from "react"

const CHALLENGE_COOKIE_NAME = "dzt-contact-challenge"
const CHALLENGE_TTL_SECONDS = 10 * 60
const CONTACT_PATH = "/contact/whatsapp"

type ProtectedWhatsAppLinkProps = {
  href: string
  children: ReactNode
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "children">

function randomHex(length: number) {
  const bytes = new Uint8Array(length)
  crypto.getRandomValues(bytes)
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("")
}

function addChallenge(href: string, challenge: string) {
  const url = new URL(href, window.location.origin)
  url.searchParams.delete("challenge")
  url.searchParams.set("challenge", challenge)
  return `${url.pathname}${url.search}${url.hash}`
}

function setChallengeCookie(challenge: string) {
  const secure = window.location.protocol === "https:" ? "; Secure" : ""
  document.cookie = `${CHALLENGE_COOKIE_NAME}=${encodeURIComponent(challenge)}; Path=${CONTACT_PATH}; Max-Age=${CHALLENGE_TTL_SECONDS}; SameSite=Lax${secure}`
}

export function ProtectedWhatsAppLink({
  href,
  children,
  ...props
}: ProtectedWhatsAppLinkProps) {
  const [finalHref, setFinalHref] = useState(href)

  useEffect(() => {
  if (!href.startsWith(CONTACT_PATH)) {
      return
    }

    const token = `${randomHex(16)}.${Date.now()}`
    const nextHref = addChallenge(href, token)

    const timer = window.setTimeout(() => {
      setChallengeCookie(token)
      setFinalHref(nextHref)
    }, 0)

    return () => {
      window.clearTimeout(timer)
    }
  }, [href])

  return (
    <a href={finalHref} {...props}>
      {children}
    </a>
  )
}
