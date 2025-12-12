"use client"

import { useEffect, useState } from "react"

export default function AnimatedGlobe() {
  const [reduceMotion, setReduceMotion] = useState(false)

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)")
    const update = () => setReduceMotion(media.matches)
    update()
    media.addEventListener("change", update)
    return () => media.removeEventListener("change", update)
  }, [])

  return (
    <div className="relative w-[350px] h-[350px] md:w-[450px] md:h-[450px]">
      <div className="absolute inset-[-10%] rounded-full bg-[#e53935]/10 blur-2xl" />

      {/* Main globe container */}
      <div className="absolute inset-[10%] rounded-full bg-gradient-to-br from-[#1a1a2e] via-[#0f0f1a] to-[#0a0a0f] border border-[#e53935]/20 overflow-hidden shadow-2xl">
        {/* Rotating grid - simplificado */}
        <div className={`absolute inset-0 opacity-30 ${reduceMotion ? "" : "motion-safe:animate-globe-spin"}`}>
          {[...Array(6)].map((_, i) => (
            <div
              key={`h-${i}`}
              className="absolute w-full h-[1px] left-0"
              style={{
                top: `${(i + 1) * 14}%`,
                background: `linear-gradient(90deg, transparent, #e5393540, transparent)`,
              }}
            />
          ))}
          {[...Array(6)].map((_, i) => (
            <div
              key={`v-${i}`}
              className="absolute h-full w-[1px] top-0"
              style={{
                left: `${(i + 1) * 14}%`,
                background: `linear-gradient(180deg, transparent, #e5393540, transparent)`,
              }}
            />
          ))}
        </div>

        {/* Glowing core - simplificado */}
        <div className="absolute inset-[35%] rounded-full bg-[#e53935]/20 blur-xl" />

        <div className="absolute top-[20%] left-[25%] w-2 h-2 bg-[#e53935] rounded-full" />
        <div className="absolute bottom-[25%] right-[30%] w-2 h-2 bg-[#ff6f61] rounded-full" />
        <div className="absolute top-[50%] left-[60%] w-2 h-2 bg-white rounded-full" />

        {/* Connection lines SVG - simplificado */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
          <path d="M25 20 Q50 35 70 60" fill="none" stroke="#e53935" strokeWidth="0.5" strokeOpacity="0.4" />
          <path d="M60 50 Q55 40 30 60" fill="none" stroke="#ff6f61" strokeWidth="0.5" strokeOpacity="0.3" />
        </svg>
      </div>

      {/* Outer rings - simplificado */}
      <div className="absolute inset-[-5%] border border-[#e53935]/20 rounded-full" />
      <div className="absolute inset-[-15%] border border-[#e53935]/10 rounded-full" />
    </div>
  )
}
