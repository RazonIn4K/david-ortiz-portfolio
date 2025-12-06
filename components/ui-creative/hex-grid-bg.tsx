"use client"

import { ParticleField } from "./particle-field"

export function HexGridBackground() {
  return (
    <>
      <div className="fixed inset-0 z-0 hex-pattern opacity-20 pointer-events-none" />
      <ParticleField />
      <div className="fixed inset-0 z-0 bg-gradient-to-b from-transparent via-transparent to-navy/80 pointer-events-none" />
    </>
  )
}
