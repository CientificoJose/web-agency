"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Check, Star } from "lucide-react"

interface RowInfo {
  type: string
  sections: string
  description: string
  features: string[]
  popular?: boolean
}

const multipliers = [5, 7.5, 11.5, 20.8, 27]
const rowsInfo: RowInfo[] = [
  {
    type: "Muy Corta",
    sections: "1 sección",
    description: "Perfecta para validar ideas rápidamente",
    features: ["Hero section", "Formulario básico", "Responsive design", "Optimización básica"],
  },
  {
    type: "Corta",
    sections: "2 – 3 secciones",
    description: "Ideal para productos simples",
    features: ["Hero + Features", "Testimonios", "CTA optimizado", "Integración analytics", "SEO básico"],
  },
  {
    type: "Mediana",
    sections: "4 – 6 secciones",
    description: "La opción más popular para negocios",
    features: [
      "Diseño completo",
      "Múltiples CTA",
      "Formularios avanzados",
      "Integración CRM",
      "SEO avanzado",
      "A/B Testing",
    ],
    popular: true,
  },
  {
    type: "Larga",
    sections: "7 – 10 secciones",
    description: "Para productos complejos que necesitan explicación",
    features: [
      "Storytelling completo",
      "Múltiples productos",
      "Calculadoras",
      "Chat integrado",
      "Automatizaciones",
      "Dashboard analytics",
    ],
  },
  {
    type: "Muy Larga",
    sections: "11 – 15 secciones",
    description: "Solución enterprise completa",
    features: [
      "Múltiples páginas",
      "Sistema completo",
      "Integraciones avanzadas",
      "Panel admin",
      "Multi-idioma",
      "Soporte 24/7",
    ],
  },
]

const formatUSD = (n: number): string => {
  return `$${Math.round(n).toLocaleString()}`
}

export default function PriceCalculator() {
  const [hourRate, setHourRate] = useState(17)
  const [calculatedPrices, setCalculatedPrices] = useState<
    Array<{
      type: string
      sections: string
      description: string
      features: string[]
      popular?: boolean
      solo: number
      base: number
      full: number
    }>
  >([])

  const calculatePrices = (rate: number) => {
    const prices = rowsInfo.map((row, idx) => {
      const base = rate * multipliers[idx]
      const solo = base * 0.65
      const full = base * 1.4

      return {
        ...row,
        solo,
        base,
        full,
      }
    })
    setCalculatedPrices(prices)
  }

  useEffect(() => {
    calculatePrices(hourRate)
  }, [hourRate])

  const handleRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value) || 0
    if (value > 0) {
      setHourRate(value)
    }
  }

  return (
    <section id="calculator" className="space-y-12">
      {/* Hidden Input Section */}
      <div className="max-w-md mx-auto text-center space-y-4 opacity-0 pointer-events-none absolute">
        <label className="flex items-center justify-center gap-2">
          <span className="sr-only">Tu Precio por Hora</span>
          <input
            type="number"
            id="hourRate"
            value={hourRate}
            onChange={handleRateChange}
            className="w-40 bg-white/10 backdrop-blur-md text-center rounded-md py-2 px-4 text-white/90 focus:ring-2 focus:ring-[#ff6600] focus:outline-none border border-white/20 transition-all duration-300"
            min="1"
            step="1"
          />
          <span className="text-white/70 font-medium">$USD / h</span>
        </label>
      </div>

      {/* Pricing Cards Grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 hide-scrollbar"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        style={{ overflow: "visible" }}
      >
        {calculatedPrices.map((plan, index) => (
          <motion.div
            key={index}
            className={`relative bg-white/5 backdrop-blur-md ring-1 ring-white/10 rounded-2xl p-6 transition-all duration-300 hover:bg-white/10 hover:ring-white/20 ${
              plan.popular ? "ring-2 ring-[#ff6600] bg-gradient-to-b from-[#ff6600]/10 to-[#ff1493]/5" : ""
            }`}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ y: -8, scale: 1.02 }}
            style={{ overflow: "visible" }}
          >
            {/* Popular Badge */}
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <div className="bg-gradient-to-r from-[#ff6600] to-[#ff1493] text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                  <Star className="w-3 h-3" />
                  Más Popular
                </div>
              </div>
            )}

            {/* Header */}
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-white mb-2">{plan.type}</h3>
              <p className="text-[#ff6600] font-medium text-sm mb-2">{plan.sections}</p>
              <p className="text-white/70 text-sm">{plan.description}</p>
            </div>

            {/* Pricing */}
            <div className="space-y-4 mb-6">
              <div className="text-center">
                <div className="text-amber-400 font-semibold">Solo Diseño</div>
                <div className="text-2xl font-bold text-white">{formatUSD(plan.solo)}</div>
              </div>

              <div className="text-center">
                <div className="text-[#ff6600] font-semibold">Diseño + Desarrollo</div>
                <div className="text-2xl font-bold text-white">{formatUSD(plan.base)}</div>
              </div>

              <div className="text-center">
                <div className="text-pink-400 font-semibold">Completo + Copy</div>
                <div className="text-2xl font-bold text-white">{formatUSD(plan.full)}</div>
              </div>
            </div>

            {/* Features */}
            <div className="space-y-3 mb-6 hide-scrollbar" style={{ overflow: "visible" }}>
              {/* {plan.features.map((feature, featureIndex) => (
                <div key={featureIndex} className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 text-[#ff6600] flex-shrink-0" />
                  <span className="text-white/80">{feature}</span>
                </div>
              ))} */}
            </div>

            {/* CTA Button */}
            <motion.button
              className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-300 ${
                plan.popular
                  ? "bg-gradient-to-r from-[#ff6600] to-[#ff1493] text-white hover:shadow-lg"
                  : "bg-white/10 text-white hover:bg-white/20 border border-white/20"
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                const phoneNumber = "+584243603846"
                const message = `¡Hola! Me interesa una cotización para una landing page ${plan.type.toLowerCase()}.`
                const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
                window.open(whatsappUrl, "_blank", "noopener,noreferrer")
              }}
            >
              Solicitar Cotización
            </motion.button>
          </motion.div>
        ))}
      </motion.div>

      {/* Service Types Info */}
      <motion.div
        className="max-w-4xl mx-auto grid md:grid-cols-3 gap-6 mt-16 hide-scrollbar"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
        style={{ overflow: "visible" }}
      >
        <div className="bg-white/5 backdrop-blur-md ring-1 ring-white/10 rounded-xl p-6 text-center">
          <div className="w-12 h-12 bg-gradient-to-r from-amber-400 to-amber-600 rounded-lg flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold">D</span>
          </div>
          <h3 className="text-lg font-bold text-white mb-2">Solo Diseño</h3>
          <p className="text-white/70 text-sm">
            Incluye wireframes, mockups y diseño visual completo en Figma o Adobe XD.
          </p>
        </div>
        <div className="bg-white/5 backdrop-blur-md ring-1 ring-white/10 rounded-xl p-6 text-center">
          <div className="w-12 h-12 bg-gradient-to-r from-[#ff6600] to-[#ff1493] rounded-lg flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold">D+</span>
          </div>
          <h3 className="text-lg font-bold text-white mb-2">Diseño + Desarrollo</h3>
          <p className="text-white/70 text-sm">
            Diseño completo + desarrollo frontend responsive con HTML, CSS y JavaScript.
          </p>
        </div>
        <div className="bg-white/5 backdrop-blur-md ring-1 ring-white/10 rounded-xl p-6 text-center">
          <div className="w-12 h-12 bg-gradient-to-r from-pink-400 to-pink-600 rounded-lg flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold">C</span>
          </div>
          <h3 className="text-lg font-bold text-white mb-2">Completo + Copy</h3>
          <p className="text-white/70 text-sm">
            Todo lo anterior + redacción de contenido optimizado para conversión y SEO.
          </p>
        </div>
      </motion.div>
    </section>
  )
}
