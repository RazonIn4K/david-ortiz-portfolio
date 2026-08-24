"use client"

import { useRef, type ComponentProps, type MouseEvent } from "react"

type ProtectedEmailLinkProps = Omit<ComponentProps<"a">, "href"> & {
  user?: string
  domain?: string
  subject?: string
  children: React.ReactNode
}

function assembleMailto(user: string, domain: string, subject?: string): string {
  const addr = `${user}@${domain}`
  return subject ? `mailto:${addr}?subject=${encodeURIComponent(subject)}` : `mailto:${addr}`
}

export function ProtectedEmailLink({
  user = "hello",
  domain = "davidtiz.com",
  subject,
  children,
  onClick,
  ...rest
}: ProtectedEmailLinkProps) {
  const linkRef = useRef<HTMLAnchorElement>(null)

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    const mailto = assembleMailto(user, domain, subject)
    if (linkRef.current) {
      linkRef.current.href = mailto
    }
    onClick?.(e)
  }

  return (
    <a ref={linkRef} {...rest} href="#contact" onClick={handleClick}>
      {children}
    </a>
  )
}

export function RevealedEmail({
  user = "hello",
  domain = "davidtiz.com",
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
