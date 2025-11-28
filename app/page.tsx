import Header from "@/components/header"
import HeroSection from "@/components/hero-section"
import AboutSection from "@/components/about-section"
import ServicesSection from "@/components/services-section"
import FaqSection from "@/components/faq-section"
import Footer from "@/components/footer"
import ParticlesBackground from "@/components/particles-background"
import PartnersCarousel from "@/components/partners-carousel"

export default function Home() {
  return (
    <main className="min-h-screen bg-[#050505] relative overflow-hidden noise-overlay">
      {/* Animated particles background */}
      <ParticlesBackground />

      {/* Main content */}
      <div className="relative z-10">
        <Header />
        <HeroSection />
        <PartnersCarousel />
        <AboutSection />
        <ServicesSection />
        <FaqSection />
        <Footer />
      </div>
    </main>
  )
}
