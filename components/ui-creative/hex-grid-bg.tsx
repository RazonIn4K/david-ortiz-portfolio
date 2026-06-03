"use client"

import { useEffect, useRef } from "react"

export function HexGridBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener("resize", resize)

    const hexSize = 30
    const hexHeight = hexSize * 2
    const hexWidth = Math.sqrt(3) * hexSize
    const vertDist = hexHeight * 0.75

    let mouseX = -1000
    let mouseY = -1000
    let animationId: number

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }
    window.addEventListener("mousemove", handleMouseMove)

    const drawHexagon = (x: number, y: number, size: number, opacity: number) => {
      ctx.beginPath()
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i - Math.PI / 6
        const hx = x + size * Math.cos(angle)
        const hy = y + size * Math.sin(angle)
        if (i === 0) ctx.moveTo(hx, hy)
        else ctx.lineTo(hx, hy)
      }
      ctx.closePath()
      ctx.strokeStyle = `rgba(45, 212, 191, ${opacity})`
      ctx.lineWidth = 1
      ctx.stroke()
    }

    const animate = () => {
      ctx.fillStyle = "#060a14"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const cols = Math.ceil(canvas.width / hexWidth) + 2
      const rows = Math.ceil(canvas.height / vertDist) + 2

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const x = col * hexWidth + (row % 2 === 1 ? hexWidth / 2 : 0)
          const y = row * vertDist

          const dist = Math.sqrt((x - mouseX) ** 2 + (y - mouseY) ** 2)
          const maxDist = 200
          const proximity = Math.max(0, 1 - dist / maxDist)
          const opacity = 0.03 + proximity * 0.15

          drawHexagon(x, y, hexSize, opacity)
        }
      }

      animationId = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      window.removeEventListener("resize", resize)
      window.removeEventListener("mousemove", handleMouseMove)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />
}
