"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import VegaLogo from "@/components/vega-logo"
import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "py-2 glass border-b border-[#e53935]/10" : "py-4 bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo with glow effect on scroll */}
        <div className={`transition-all duration-300 ${scrolled ? "scale-90" : "scale-100"}`}>
          <VegaLogo />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {[
            { href: "#inicio", label: "Início" },
            { href: "#about", label: "Quem somos" },
            { href: "#services", label: "Serviços" },
          ].map((link, i) => (
            <Link
              key={i}
              href={link.href}
              className="relative px-4 py-2 text-gray-300 hover:text-white transition-colors text-sm group"
            >
              <span className="relative z-10">{link.label}</span>
              <span className="absolute inset-0 bg-[#e53935]/0 group-hover:bg-[#e53935]/10 rounded-lg transition-all duration-300" />
              <span className="absolute bottom-0 left-1/2 w-0 h-[2px] bg-[#e53935] group-hover:w-full group-hover:left-0 transition-all duration-300" />
            </Link>
          ))}
        </nav>

        {/* CTA Button */}
        <Button
          asChild
          className="hidden md:flex bg-[#e53935] hover:bg-[#c62828] text-white rounded-full px-6 relative overflow-hidden group"
        >
          <Link href="https://wa.me/557799105385?text=Olá%2C%20sou%20um%20isp" target="_blank">
            <span className="relative z-10">Contato</span>
            <span className="absolute inset-0 bg-gradient-to-r from-[#ff6f61] to-[#e53935] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Link>
        </Button>

        {/* Mobile menu button */}
        <button className="md:hidden p-2 text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-full left-0 right-0 glass border-b border-[#e53935]/10 transition-all duration-300 ${
          mobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <nav className="container mx-auto px-6 py-4 flex flex-col gap-2">
          {[
            { href: "#inicio", label: "Início" },
            { href: "#about", label: "Quem somos" },
            { href: "#services", label: "Serviços" },
          ].map((link, i) => (
            <Link
              key={i}
              href={link.href}
              className="px-4 py-3 text-gray-300 hover:text-white hover:bg-[#e53935]/10 rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Button asChild className="mt-2 bg-[#e53935] hover:bg-[#c62828] text-white rounded-full">
            <Link href="https://wa.me/557799105385?text=Olá%2C%20sou%20um%20isp" target="_blank">
              Contato
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  )
}
