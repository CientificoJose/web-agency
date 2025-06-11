"use client"

import { useEffect } from "react"
import BrochureHeader from "@/components/brochure/brochure-header"
import BrochureHero from "@/components/brochure/brochure-hero"
import QuienesSomos from "@/components/brochure/quienes-somos"
import ServiciosGrid from "@/components/brochure/servicios-grid"
import CasosExito from "@/components/brochure/casos-exito"
import CTAStripe from "@/components/cta-stripe"
import ContactoBrochure from "@/components/brochure/contacto-brochure"
import Footer from "@/components/footer"
import WhatsAppButton from "@/components/whatsapp-button"
import ThemeToggle from "@/components/theme-toggle"
import { useTheme } from "@/hooks/use-theme"

export default function BrochurePage() {
  const { setTheme } = useTheme()

  useEffect(() => {
    // Auto dark mode based on system preference
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    setTheme(mediaQuery.matches ? "dark" : "light")

    const handleChange = (e: MediaQueryListEvent) => {
      setTheme(e.matches ? "dark" : "light")
    }

    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [setTheme])

  return (
    <div
      className="min-h-screen bg-black bg-gradient-to-br from-black via-gray-900 to-black transition-colors duration-500"
      style={{ overflow: "visible" }}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-primary-foreground px-4 py-2 rounded-md z-50"
      >
        Saltar al contenido principal
      </a>
      <BrochureHeader />
      <main id="main" style={{ overflow: "visible" }}>
        <BrochureHero />
        <QuienesSomos />
        <ServiciosGrid />
        <CasosExito />
        <CTAStripe />
        <ContactoBrochure />
      </main>
      <Footer />
      <WhatsAppButton />
      <ThemeToggle />
    </div>
  )
}
