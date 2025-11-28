"use client"

import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import VegaLogo from "@/components/vega-logo"
import { ArrowRight, Mail, Phone } from "lucide-react"

export default function Footer() {
  return (
    <footer className="pt-24 pb-8 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#e53935]/5 rounded-full blur-[150px]" />

      {/* Top CTA Section */}
      <div className="container mx-auto px-6 mb-20 relative z-10">
        <div className="glass-card rounded-3xl p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#e53935]/10 rounded-full blur-[100px]" />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h3 className="text-3xl md:text-4xl text-white font-bold mb-2">
                Pronto para <span className="gradient-text">transformar</span> sua rede?
              </h3>
              <p className="text-gray-400">Entre em contato e descubra como podemos ajudar.</p>
            </div>
            <Button
              asChild
              className="bg-[#e53935] hover:bg-[#c62828] text-white rounded-full px-8 py-6 text-lg group animate-pulse-glow"
            >
              <Link
                href="https://wa.me/557799105385?text=Olá%2C%20sou%20um%20isp"
                target="_blank"
                className="flex items-center gap-2"
              >
                Fale Conosco
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Logo and Description */}
          <div className="space-y-6 lg:col-span-1">
            <VegaLogo />
            <p className="text-gray-400 text-sm leading-relaxed">
              Consultoria de redes especializada para provedores de internet. Projetamos, otimizamos e mantemos
              infraestruturas de rede de alto desempenho.
            </p>
            {/* Contact info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-400 text-sm">
                <Mail className="w-4 h-4 text-[#e53935]" />
                <span>contato@vega.network</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400 text-sm">
                <Phone className="w-4 h-4 text-[#e53935]" />
                <span>+55 77 99910-5385</span>
              </div>
            </div>
          </div>

          {/* Empresa */}
          <div>
            <h3 className="text-white font-semibold mb-6 flex items-center gap-2">
              <span className="w-2 h-2 bg-[#e53935] rounded-full" />
              Empresa
            </h3>
            <ul className="space-y-4">
              {["Sobre", "Serviços", "Projetos", "Carreiras"].map((item, i) => (
                <li key={i}>
                  <Link
                    href={item === "Sobre" ? "#about" : item === "Serviços" ? "#services" : "#"}
                    className="text-gray-400 hover:text-[#e53935] text-sm transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-0 h-[2px] bg-[#e53935] group-hover:w-4 transition-all" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Suporte */}
          <div>
            <h3 className="text-white font-semibold mb-6 flex items-center gap-2">
              <span className="w-2 h-2 bg-[#e53935] rounded-full" />
              Suporte
            </h3>
            <ul className="space-y-4">
              {["Atendimento ao Cliente", "Política de Privacidade", "Termos de Uso", "Central de Ajuda"].map(
                (item, i) => (
                  <li key={i}>
                    <Link
                      href="#"
                      className="text-gray-400 hover:text-[#e53935] text-sm transition-colors flex items-center gap-2 group"
                    >
                      <span className="w-0 h-[2px] bg-[#e53935] group-hover:w-4 transition-all" />
                      {item}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white font-semibold mb-6 flex items-center gap-2">
              <span className="w-2 h-2 bg-[#e53935] rounded-full" />
              Receba novidades
            </h3>
            <p className="text-gray-400 text-sm mb-4">Inscreva-se para receber atualizações e dicas de networking.</p>
            <div className="space-y-3">
              <Input
                type="email"
                placeholder="Seu melhor email"
                className="bg-[#0a0a0a] border-gray-800 text-white placeholder:text-gray-500 focus:border-[#e53935] rounded-full"
              />
              <Button className="w-full bg-[#e53935] hover:bg-[#c62828] text-white rounded-full group">
                <span>Inscrever-se</span>
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-gray-800/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">© 2025 Vega Consultoria — Todos os direitos reservados.</p>
          <div className="flex items-center gap-6">
            {["Twitter", "LinkedIn", "Instagram"].map((social, i) => (
              <Link key={i} href="#" className="text-gray-500 hover:text-[#e53935] text-sm transition-colors">
                {social}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
