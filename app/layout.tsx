import type React from "react"
import type { Metadata } from "next"
import { JetBrains_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains" })

export const metadata: Metadata = {
  title: "Vega Network | Consultoria de Redes",
  description:
    "Consultoria de redes especializada em provedores de internet. Projetamos, otimizamos e mantemos infraestruturas de rede de alto desempenho.",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${jetbrains.variable} font-mono antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
