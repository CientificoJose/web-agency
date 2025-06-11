"use client"

import { useEffect } from "react"
import { motion } from "framer-motion"
import CalculatorHeader from "@/components/calculator/calculator-header"
import PriceCalculator from "@/components/calculator/price-calculator"
import WhatsAppButton from "@/components/whatsapp-button"
import ThemeToggle from "@/components/theme-toggle"
import { useTheme } from "@/hooks/use-theme"

export default function CalculatorPage() {
  const { setTheme } = useTheme()

  useEffect(() => {
    // Force dark theme for this page
    setTheme("dark")
  }, [setTheme])

  return (
    <div className="min-h-screen bg-black relative" style={{ overflow: "visible" }}>
      {/* Animated Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-tr from-[#ff6600]/20 via-[#ff1493]/10 to-transparent blur-3xl animate-halo" />
      </div>

      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-primary-foreground px-4 py-2 rounded-md z-50"
      >
        Saltar al contenido principal
      </a>

      <CalculatorHeader />

      <main id="main" className="relative z-10" style={{ overflow: "visible" }}>
        <div className="mx-auto max-w-6xl px-4 lg:px-8 space-y-24" style={{ overflow: "visible" }}>
          {/* Hero Section */}
          <section id="hero" className="text-center space-y-6 pt-24 lg:pt-32" style={{ overflow: "visible" }}>
            <motion.h1
              className="text-4xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#ff6600] to-[#ff1493] leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Landing Pages
            </motion.h1>
            <motion.p
              className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Estima el costo de tu próximo proyecto de diseño web de manera rápida y transparente
            </motion.p>
          </section>

          {/* Calculator Section */}
          <PriceCalculator />

          {/* CTA Section */}
          <motion.section
            className="text-center py-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ overflow: "visible" }}
          >
            <div className="bg-white/5 backdrop-blur-md ring-1 ring-white/10 rounded-3xl p-8 max-w-2xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">¿Listo para comenzar tu proyecto?</h2>
              <p className="text-white/70 mb-6">
                Estos precios son estimaciones. Contáctanos para una cotización personalizada y detallada.
              </p>
              <motion.button
                className="bg-gradient-to-r from-[#ff6600] to-[#ff1493] hover:from-[#e55a00] hover:to-[#e6127a] text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  const phoneNumber = "+584243603846"
                  const message = "¡Hola! Me interesa una cotización para mi landing page."
                  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
                  window.open(whatsappUrl, "_blank", "noopener,noreferrer")
                }}
              >
                Solicitar Cotización
              </motion.button>
            </div>
          </motion.section>
        </div>
      </main>

      <footer className="relative z-10 py-12 text-center text-white/50 text-sm border-t border-white/10">
        <div className="container mx-auto px-4">
          © {new Date().getFullYear()} Sin Límites Agencia Digital. Todos los derechos reservados.
        </div>
      </footer>

      <WhatsAppButton />
      <ThemeToggle />
    </div>
  )
}
