"use client"

import { useRef, type ReactNode } from "react"
import { motion, useInView, useReducedMotion, useScroll, useTransform } from "framer-motion"

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1])
  const shouldReduceMotion = useReducedMotion()

  if (shouldReduceMotion) return null

  return <motion.div className="dtz-scroll-progress" style={{ scaleX }} />
}

interface RevealProps {
  children: ReactNode
  className?: string
  delay?: number
  direction?: "up" | "down" | "left" | "right" | "scale"
}

export function Reveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })
  const shouldReduceMotion = useReducedMotion()

  const variants = {
    up: { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } },
    down: { hidden: { opacity: 0, y: -40 }, visible: { opacity: 1, y: 0 } },
    left: { hidden: { opacity: 0, x: -40 }, visible: { opacity: 1, x: 0 } },
    right: { hidden: { opacity: 0, x: 40 }, visible: { opacity: 1, x: 0 } },
    scale: { hidden: { opacity: 0, scale: 0.92 }, visible: { opacity: 1, scale: 1 } },
  }

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants[direction]}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  )
}

interface StaggerContainerProps {
  children: ReactNode
  className?: string
  staggerDelay?: number
  as?: "div" | "ul"
  "aria-label"?: string
}

export function StaggerContainer({
  children,
  className = "",
  staggerDelay = 0.08,
  as = "div",
  "aria-label": ariaLabel,
}: StaggerContainerProps) {
  const ref = useRef<HTMLDivElement | HTMLUListElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-60px" })
  const shouldReduceMotion = useReducedMotion()

  const Component = as === "ul" ? motion.ul : motion.div
  const FallbackComponent = as === "ul" ? "ul" : "div"

  if (shouldReduceMotion) {
    return (
      <FallbackComponent className={className} aria-label={ariaLabel}>
        {children}
      </FallbackComponent>
    )
  }

  return (
    <Component
      ref={ref as React.RefObject<HTMLDivElement & HTMLUListElement>}
      className={className}
      aria-label={ariaLabel}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
    >
      {children}
    </Component>
  )
}

export const staggerItem = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
}

interface SectionHeaderProps {
  index: string
  label: string
  title: string
  titleId?: string
  lead?: string
  align?: "left" | "split"
}

export function SectionHeader({
  index,
  label,
  title,
  titleId,
  lead,
  align = "split",
}: SectionHeaderProps) {
  return (
    <header className={`dtz-section-heading dtz-editorial-heading ${align === "split" ? "is-split" : ""}`}>
      <div className="dtz-section-heading-main">
        <p className="dtz-section-label">
          <span className="dtz-index-badge" aria-hidden="true">
            {index}
          </span>
          {label}
        </p>
        <h2 id={titleId}>{title}</h2>
      </div>
      {lead ? <p className="dtz-section-lead">{lead}</p> : null}
    </header>
  )
}

interface CapabilityTrackProps {
  items: string[]
}

export function CapabilityTrack({ items }: CapabilityTrackProps) {
  const shouldReduceMotion = useReducedMotion()
  const track = [...items, ...items]

  if (shouldReduceMotion) {
    return (
      <ul className="dtz-hero-badges" aria-label="Focus areas">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    )
  }

  return (
    <div className="dtz-capability-track" aria-hidden="true">
      <div className="dtz-capability-track-inner">
        {track.map((item, index) => (
          <span key={`${item}-${index}`}>{item}</span>
        ))}
      </div>
    </div>
  )
}
