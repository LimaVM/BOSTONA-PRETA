"use client"

import { useEffect, useRef, useState } from "react"

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
  color: string
}

export default function ParticlesBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [shouldReduce, setShouldReduce] = useState(false)

  useEffect(() => {
    const checkPerformance = () => {
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      const lowCpu = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4
      const smallScreen = window.innerWidth < 768

      if (prefersReducedMotion || lowCpu || smallScreen) {
        setShouldReduce(true)
        return true
      }

      const canvas = document.createElement("canvas")
      const gl = canvas.getContext("webgl")
      if (!gl) {
        setShouldReduce(true)
        return true
      }

      setShouldReduce(false)
      return false
    }

    const lowPerf = checkPerformance()

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationId: number
    let particles: Particle[] = []

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const createParticles = () => {
      particles = []
      const baseCount = lowPerf ? 10 : 24
      const particleCount = Math.min(baseCount, Math.floor((canvas.width * canvas.height) / 60000))

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          size: Math.random() * 2 + 1,
          opacity: Math.random() * 0.4 + 0.2,
          color: Math.random() > 0.7 ? "#e53935" : "#ffffff",
        })
      }
    }

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((p, i) => {
        // Update position
        p.x += p.vx
        p.y += p.vy

        // Boundary check
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1

        // Draw particle
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.globalAlpha = p.opacity
        ctx.fill()

        if (!lowPerf) {
          const nearParticles = particles.slice(i + 1, i + 6)
          nearParticles.forEach((p2) => {
            const dx2 = p.x - p2.x
            const dy2 = p.y - p2.y
            const dist2 = Math.sqrt(dx2 * dx2 + dy2 * dy2)

            if (dist2 < 100) {
              ctx.beginPath()
              ctx.moveTo(p.x, p.y)
              ctx.lineTo(p2.x, p2.y)
              ctx.strokeStyle = p.color
              ctx.globalAlpha = (1 - dist2 / 100) * 0.1
              ctx.lineWidth = 0.5
              ctx.stroke()
            }
          })
        }
      })

      ctx.globalAlpha = 1
      animationId = requestAnimationFrame(drawParticles)
    }

    resize()
    createParticles()
    drawParticles()

    const handleResize = () => {
      resize()
      createParticles()
    }

    window.addEventListener("resize", handleResize)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  if (shouldReduce) {
    return <div aria-hidden className="fixed inset-0 pointer-events-none z-0 bg-gradient-to-b from-[#0a0a0a] to-[#050505]" />
  }

  return (
    <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" style={{ background: "transparent" }} />
  )
}
