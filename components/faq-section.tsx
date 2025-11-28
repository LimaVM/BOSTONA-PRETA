"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useEffect, useRef, useState } from "react"
import { MessageCircle } from "lucide-react"

const faqs = [
  {
    question: "Quais serviços vocês oferecem para ISPs?",
    answer:
      "Oferecemos consultoria completa em redes para ISPs, incluindo BGP, OSPF, VPNs, CGNAT, Firewalls, MPLS, monitoramento com Zabbix/Grafana, Accel-PPP, DNS recursivo e autoritativo, e otimização de infraestrutura.",
  },
  {
    question: "É possível terceirizar a gestão de toda a rede?",
    answer:
      "Sim! Oferecemos serviços de gestão remota completa, incluindo monitoramento, configuração e manutenção de rede para ISPs que desejam foco total no atendimento ao cliente e expansão.",
  },
  {
    question: "Vocês fazem implementação de redes ou apenas consultoria?",
    answer:
      "Fazemos ambos: consultoria estratégica e implementação prática de redes. Avaliamos sua infraestrutura, projetamos melhorias e aplicamos as soluções diretamente nos equipamentos.",
  },
  {
    question: "Como funciona o suporte da consultoria?",
    answer:
      "Nosso suporte é personalizado, podendo incluir suporte remoto, revisão de configurações e acompanhamento de projetos. Também fornecemos relatórios e dashboards de monitoramento, garantindo visibilidade completa da rede.",
  },
  {
    question: "Quanto tempo leva para implementar uma solução de rede?",
    answer:
      "O tempo depende do tamanho da rede e da complexidade da solução. Após a análise inicial, entregamos um plano detalhado com prazos realistas.",
  },
  {
    question: "Vocês fornecem treinamento para a equipe do ISP?",
    answer:
      "Sim, oferecemos treinamentos técnicos personalizados, cobrindo configuração, monitoramento e boas práticas de operação de redes.",
  },
]

export default function FaqSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section className="py-32 relative overflow-hidden" ref={sectionRef}>
      {/* Background effects */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#e53935]/5 rounded-full blur-[150px]" />

      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        {/* Section header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#e53935]/10 border border-[#e53935]/30 mb-6">
            <MessageCircle className="w-4 h-4 text-[#e53935]" />
            <span className="text-sm text-[#e53935] font-medium">FAQ</span>
          </div>
          <h2 className="text-4xl md:text-5xl text-white font-bold">
            Perguntas <span className="gradient-text">frequentes</span>
          </h2>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className={`glass-card rounded-2xl px-6 overflow-hidden transition-all duration-500 data-[state=open]:border-[#e53935]/50 data-[state=open]:glow-red ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <AccordionTrigger className="text-white hover:no-underline text-left py-6 hover:text-[#e53935] transition-colors">
                <span className="flex items-center gap-4">
                  <span className="w-8 h-8 rounded-full bg-[#e53935]/20 flex items-center justify-center text-[#e53935] text-sm font-bold">
                    {index + 1}
                  </span>
                  {faq.question}
                </span>
              </AccordionTrigger>
              <AccordionContent className="text-gray-400 pb-6 pl-12">{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
