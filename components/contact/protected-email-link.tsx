"use client"

import { useCallback, useEffect, useRef, type ComponentProps } from "react"

import { buildContactMailto, getContactEmailParts } from "@/lib/contact-links"

type ProtectedEmailLinkProps = Omit<ComponentProps<"a">, "href"> & {
  user?: string
  domain?: string
  subject?: string
  children: React.ReactNode
}

const defaultEmailParts = getContactEmailParts()

export function ProtectedEmailLink({
  user = defaultEmailParts.user,
  domain = defaultEmailParts.domain,
  subject,
  children,
  onClick,
  onPointerEnter,
  onFocus,
  ...rest
}: ProtectedEmailLinkProps) {
  const linkRef = useRef<HTMLAnchorElement>(null)
  const mailto = buildContactMailto(subject, { user, domain })

  const applyMailto = useCallback(() => {
    if (linkRef.current && linkRef.current.getAttribute("href") !== mailto) {
      linkRef.current.href = mailto
    }
  }, [mailto])

  useEffect(() => {
    applyMailto()
  }, [applyMailto])

  return (
    <a
      ref={linkRef}
      {...rest}
      href="#contact"
      onPointerEnter={(event) => {
        applyMailto()
        onPointerEnter?.(event)
      }}
      onFocus={(event) => {
        applyMailto()
        onFocus?.(event)
      }}
      onClick={(event) => {
        applyMailto()
        onClick?.(event)
      }}
    >
      {children}
    </a>
  )
}

export function RevealedEmail({
  user = defaultEmailParts.user,
  domain = defaultEmailParts.domain,
  className,
}: {
  user?: string
  domain?: string
  className?: string
}) {
  const spanRef = useRef<HTMLSpanElement>(null)
  const revealedRef = useRef(false)

  const handleMouseEnter = () => {
    if (!revealedRef.current && spanRef.current) {
      spanRef.current.textContent = `${user}@${domain}`
      revealedRef.current = true
    }
  }

  return (
    <span ref={spanRef} className={className} onMouseEnter={handleMouseEnter}>
      Email
    </span>
  )
}
