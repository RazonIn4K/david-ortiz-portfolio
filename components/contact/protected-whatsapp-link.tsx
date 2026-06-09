"use client"

import type { AnchorHTMLAttributes, ReactNode } from "react"
import { useEffect, useState } from "react"

const CONTACT_PATH = "/contact/whatsapp"
const CHALLENGE_ENDPOINT = "/contact/whatsapp/challenge"

// One challenge per page load, shared across every link instance. The server
// issues a single HttpOnly cookie, so all links must echo the SAME token for
// the cookie/query match to succeed — sharing the promise both avoids N
// redundant requests and prevents instances from overwriting each other's
// cookie (only the last writer would otherwise have matched).
let sharedChallenge: Promise<string | null> | null = null

function requestChallenge(): Promise<string | null> {
  if (!sharedChallenge) {
    sharedChallenge = fetch(CHALLENGE_ENDPOINT, {
      method: "GET",
      credentials: "same-origin",
      headers: { accept: "application/json" },
    })
      .then((response) => (response.ok ? response.json() : null))
      .then((data) => (typeof data?.token === "string" ? data.token : null))
      .catch(() => null)
  }
  return sharedChallenge
}

type ProtectedWhatsAppLinkProps = {
  href: string
  children: ReactNode
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "children">

function addChallenge(href: string, challenge: string) {
  const url = new URL(href, window.location.origin)
  url.searchParams.delete("challenge")
  url.searchParams.set("challenge", challenge)
  return `${url.pathname}${url.search}${url.hash}`
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

    let active = true
    requestChallenge().then((token) => {
      if (active && token) {
        setFinalHref(addChallenge(href, token))
      }
    })

    return () => {
      active = false
    }
  }, [href])

  return (
    <a href={finalHref} {...props}>
      {children}
    </a>
  )
}
