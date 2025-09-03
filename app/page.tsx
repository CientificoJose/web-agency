"use client"

import { useEffect } from "react"
import Header from "@/components/header"
import Hero from "@/components/hero"
import ValuePropositions from "@/components/value-propositions"
import Services from "@/components/services"
import Portfolio from "@/components/portfolio"
import About from "@/components/about"
import CTAStripe from "@/components/cta-stripe"
import Contact from "@/components/contact"
import Footer from "@/components/footer"
import { useTheme } from "@/hooks/use-theme"
import WhatsAppButton from "@/components/whatsapp-button"
import ThemeToggle from "@/components/theme-toggle"

export default function HomePage() {
  const { setTheme } = useTheme()

  useEffect(() => {
    // Auto dark mode at 20:00 local time
    const checkTime = () => {
      const hour = new Date().getHours()
      if (hour >= 20 || hour < 6) {
        setTheme("dark")
      } else {
        setTheme("dark")
      }
    }

    checkTime()
    const interval = setInterval(checkTime, 60000) // Check every minute

    return () => clearInterval(interval)
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
      <Header />
      <main id="main" style={{ overflow: "visible" }}>
        <Hero />
        <ValuePropositions />
        <Services />
        <Portfolio />
        <About />
        <CTAStripe />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
      <ThemeToggle />
    </div>
  )
}
