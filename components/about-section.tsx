"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { ArrowRight } from "lucide-react"

export default function AboutSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section id="about" className="py-32 relative overflow-hidden" ref={sectionRef}>
      <div className="absolute inset-0 bg-grid-pattern opacity-10" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Images Grid with simplified effects */}
          <div
            className={`relative transition-all duration-700 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
            }`}
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                {/* Image 1 */}
                <div className="relative h-52 rounded-2xl overflow-hidden group">
                  <div className="absolute inset-0 border-2 border-[#e53935] rounded-2xl z-10" />
                  <Image
                    src="/team-meeting-in-modern-office-with-people-discussi.jpg"
                    alt="Equipe em reunião"
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                {/* Image 2 */}
                <div className="relative h-52 rounded-2xl overflow-hidden group">
                  <div className="absolute inset-0 border-2 border-[#e53935] rounded-2xl z-10" />
                  <Image
                    src="/man-working-on-laptop-in-office-with-coffee.jpg"
                    alt="Profissional trabalhando"
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              </div>
              <div className="pt-10">
                {/* Image 3 - Larger */}
                <div className="relative h-80 rounded-2xl overflow-hidden group">
                  <div className="absolute inset-0 border-2 border-[#e53935] rounded-2xl z-10" />
                  <Image
                    src="/smiling-professional-man-with-beard-in-office-wear.jpg"
                    alt="Profissional sorrindo"
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div
            className={`space-y-8 transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
            }`}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#e53935]/10 border border-[#e53935]/30">
              <span className="w-2 h-2 bg-[#e53935] rounded-full" />
              <span className="text-sm text-[#e53935] font-medium">Sobre nós</span>
            </div>

            <h2 className="text-4xl md:text-5xl text-white font-bold">
              Quem <span className="gradient-text">somos?</span>
            </h2>

            <div className="space-y-4 text-gray-400 leading-relaxed">
              <p>
                Na <span className="text-[#e53935] font-semibold">Vega</span>, somos especialistas em soluções de
                conectividade de alta performance para provedores de internet. Nosso objetivo é transformar a
                experiência de seus assinantes, garantindo redes seguras, rápidas e escaláveis.
              </p>
              <p>
                Com uma equipe experiente em tecnologias de ponta, entregamos soluções sob medida, otimizando
                infraestrutura e desempenho, enquanto reduzimos riscos e custos operacionais.
              </p>
            </div>

            <Button
              asChild
              className="bg-transparent border-2 border-[#e53935] text-[#e53935] hover:bg-[#e53935] hover:text-white rounded-full px-8 py-6 text-lg transition-all duration-300"
            >
              <Link
                href="https://wa.me/557799105385?text=Olá%2C%20sou%20um%20isp"
                target="_blank"
                className="flex items-center gap-2"
              >
                Começar agora
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
