"use client"

import {
  Server,
  Globe,
  Activity,
  Users,
  Network,
  Shield,
  Lock,
  Flame,
  Layers,
  Wifi,
  BarChart3,
  Database,
} from "lucide-react"
import { useEffect, useRef, useState } from "react"

const services = [
  {
    icon: Server,
    title: "Infraestrutura Otimizada",
    description: "Projetamos e implementamos redes escaláveis com foco em estabilidade e desempenho.",
    color: "#e53935",
  },
  {
    icon: Globe,
    title: "BGP",
    description:
      "Implementação e otimização de rotas BGP para provedores e redes corporativas, garantindo redundância e conectividade eficiente.",
    color: "#ff6f61",
  },
  {
    icon: Activity,
    title: "Monitoramento Avançado",
    description: "Integrações com Zabbix, Grafana e APIs para uma visão completa da sua rede.",
    color: "#e53935",
  },
  {
    icon: Users,
    title: "Consultoria Especializada",
    description: "Análise, planejamento e execução de melhorias para provedores e ISPs.",
    color: "#ff6f61",
  },
  {
    icon: Network,
    title: "OSPF",
    description:
      "Configuração e tunning de OSPF para redes internas, otimizando a convergência e reduzindo latência entre roteadores.",
    color: "#e53935",
  },
  {
    icon: Lock,
    title: "VPNs",
    description:
      "Criação de túneis seguros entre filiais, datacenters e provedores utilizando IPsec, L2TP, OpenVPN e WireGuard.",
    color: "#ff6f61",
  },
  {
    icon: Layers,
    title: "CGNAT",
    description:
      "Implementação de CGNAT escalável para otimizar o uso de endereços IPv4, com logs detalhados e compatibilidade com IPv6.",
    color: "#e53935",
  },
  {
    icon: Shield,
    title: "Firewall",
    description:
      "Desenvolvimento de políticas de segurança avançadas em Mikrotik, Linux e Huawei, com filtragem de tráfego.",
    color: "#ff6f61",
  },
  {
    icon: Flame,
    title: "MPLS",
    description:
      "Configuração de redes MPLS para ISPs e operadoras, permitindo transporte eficiente de múltiplos serviços.",
    color: "#e53935",
  },
  {
    icon: Wifi,
    title: "Accel-PPP",
    description:
      "Implantação e tunning do Accel-PPP para autenticação PPPoE de alta performance, com suporte a RADIUS e DHCPv6.",
    color: "#ff6f61",
  },
  {
    icon: BarChart3,
    title: "Zabbix e Grafana",
    description:
      "Monitoramento e visualização avançada de métricas de rede com dashboards personalizados e alertas inteligentes.",
    color: "#e53935",
  },
  {
    icon: Database,
    title: "DNS Recursivo e Autoritativo",
    description: "Implantação de servidores DNS de alta performance para resolução local e hospedagem de domínios.",
    color: "#ff6f61",
  },
]

export default function ServicesSection() {
  const [visibleCards, setVisibleCards] = useState<number[]>([])
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"))
            setVisibleCards((prev) => [...new Set([...prev, index])])
          }
        })
      },
      { threshold: 0.1, rootMargin: "50px" },
    )

    const cards = document.querySelectorAll("[data-index]")
    cards.forEach((card) => observer.observe(card))

    return () => observer.disconnect()
  }, [])

  return (
    <section id="services" className="py-32 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#e53935]/5 rounded-full blur-[150px]" />

      <div className="container mx-auto px-6 relative z-10" ref={sectionRef}>
        {/* Section header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#e53935]/10 border border-[#e53935]/30 mb-6">
            <span className="w-2 h-2 bg-[#e53935] rounded-full animate-pulse" />
            <span className="text-sm text-[#e53935] font-medium">Nossos Serviços</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl text-white font-bold mb-6">
            O que <span className="gradient-text">Oferecemos</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Soluções de alta performance e personalização para provedores e empresas de tecnologia.
          </p>
        </div>

        {/* Services grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              data-index={index}
              className={`glass-card rounded-2xl p-8 group cursor-pointer transition-all duration-500 hover:scale-[1.02] hover:border-[#e53935]/50 ${
                visibleCards.includes(index) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              {/* Icon container */}
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110"
                style={{
                  background: `linear-gradient(135deg, ${service.color}20, ${service.color}10)`,
                  boxShadow: `0 0 30px ${service.color}20`,
                }}
              >
                <service.icon
                  className="w-7 h-7 transition-all duration-300 group-hover:scale-110"
                  style={{ color: service.color }}
                />
              </div>

              {/* Content */}
              <h3 className="text-white font-semibold text-xl mb-3 group-hover:text-[#e53935] transition-colors">
                {service.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">{service.description}</p>

              {/* Hover effect line */}
              <div className="mt-6 h-[2px] w-0 bg-gradient-to-r from-[#e53935] to-[#ff6f61] group-hover:w-full transition-all duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
