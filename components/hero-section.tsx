"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useEffect, useState } from "react"
import AnimatedGlobe from "./animated-globe"
import { ArrowRight, Zap } from "lucide-react"

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [typedText, setTypedText] = useState("")
  const fullText = "Garantimos estabilidade e velocidade para seus assinantes."

  useEffect(() => {
    setIsVisible(true)
    let i = 0
    const typingInterval = setInterval(() => {
      if (i < fullText.length) {
        setTypedText(fullText.slice(0, i + 1))
        i++
      } else {
        clearInterval(typingInterval)
      }
    }, 40)
    return () => clearInterval(typingInterval)
  }, [])

  return (
    <section id="inicio" className="min-h-screen pt-32 pb-20 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-50" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-[#e53935]/10 rounded-full blur-[100px] animate-pulse" />
      <div
        className="absolute bottom-20 right-10 w-96 h-96 bg-[#ff6f61]/10 rounded-full blur-[120px] animate-pulse"
        style={{ animationDelay: "1s" }}
      />

      {/* Scan line effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-full h-[2px] bg-gradient-to-r from-transparent via-[#e53935]/30 to-transparent animate-[scan-line_4s_linear_infinite]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Content */}
          <div
            className={`space-y-8 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#e53935]/10 border border-[#e53935]/30 backdrop-blur-sm">
              <Zap className="w-4 h-4 text-[#e53935]" />
              <span className="text-sm text-[#e53935] font-medium">Consultoria de Elite em Redes</span>
            </div>

            {/* Main heading with typing effect */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white font-sans font-bold leading-tight">
              <span className="gradient-text">{typedText}</span>
              <span className="inline-block w-[3px] h-[1em] bg-[#e53935] ml-1 animate-[blink_1s_infinite]" />
            </h1>

            <p className="text-gray-400 text-lg md:text-xl max-w-xl leading-relaxed">
              Consultoria de redes especializada em provedores de internet.
              <span className="text-white font-medium"> Transformamos infraestrutura em vantagem competitiva.</span>
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                asChild
                className="bg-[#e53935] hover:bg-[#c62828] text-white rounded-full px-8 py-6 text-lg group relative overflow-hidden animate-pulse-glow"
              >
                <Link
                  href="https://wa.me/557799105385?text=Olá%2C%20sou%20um%20isp"
                  target="_blank"
                  className="flex items-center gap-2"
                >
                  <span className="relative z-10">Fale Conosco</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform relative z-10" />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#e53935] to-[#ff6f61] opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                className="border-[#e53935]/50 text-white hover:bg-[#e53935]/10 hover:border-[#e53935] rounded-full px-8 py-6 text-lg bg-transparent backdrop-blur-sm"
              >
                <Link href="#services">Ver Serviços</Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-800/50">
              {[
                { number: "50+", label: "ISPs Atendidos" },
                { number: "99.9%", label: "Uptime Garantido" },
                { number: "24/7", label: "Suporte Dedicado" },
              ].map((stat, i) => (
                <div key={i} className="text-center" style={{ animationDelay: `${i * 0.2}s` }}>
                  <div className="text-2xl md:text-3xl font-bold text-white glow-red-text">{stat.number}</div>
                  <div className="text-sm text-gray-500">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Globe */}
          <div
            className={`flex justify-center lg:justify-end transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}
          >
            <AnimatedGlobe />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-xs text-gray-500 uppercase tracking-widest">Scroll</span>
        <div className="w-[2px] h-8 bg-gradient-to-b from-[#e53935] to-transparent" />
      </div>
    </section>
  )
}
