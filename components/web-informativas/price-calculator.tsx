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

const multipliers = [14.0, 25.3, 32.8] // Calculated to reach $449.99, ~$815, ~$1055 at rate 22.85
const rowsInfo: RowInfo[] = [
  {
    type: "Básica",
    sections: "1 – 4 secciones",
    description: "La opción más popular para negocios pequeños",
    features: [
      "Diseño completo",
      "Múltiples CTA",
      "Formularios",
      "Galeria",
      "Blog",
      "SEO básico",
      "Hosting y Dominio por 1 año (sujeto a disponibilidad y precio)",
    ],
  },
  {
    type: "Profesional",
    sections: "5 – 8 secciones",
    description: "Para negocios establecidos que necesitan más explicación",
    features: [
      "Diseño completo",
      "Múltiples CTA",
      "Formularios",
      "Galeria",
      "Blog",
      "SEO avanzado",
      "Múltiples servicios",
      "Hosting y Dominio por 1 año (sujeto a disponibilidad y precio)",
    ],
    popular: true,
  },
  {
    type: "Corporativa",
    sections: "9 – 12 secciones",
    description: "Solución corporativa completa",
    features: [
      "Diseño completo",
      "Múltiples CTA",
      "Formularios",
      "Galeria",
      "Blog",
      "SEO avanzado",
      "Múltiples servicios",
      "Hosting y Dominio por 1 año (sujeto a disponibilidad y precio)",
    ],
  },
]

const formatUSD = (n: number): string => {
  return `$${n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

export default function PriceCalculator() {
  const [hourRate, setHourRate] = useState(22.85) // Setting this to perfectly match the previous logic, scaled up.
  const [calculatedPrices, setCalculatedPrices] = useState<
    Array<{
      type: string
      sections: string
      description: string
      features: string[]
      popular?: boolean
      full: number
    }>
  >([])

  const calculatePrices = (rate: number) => {
    const prices = rowsInfo.map((row, idx) => {
      const fixedPrices = [449.99, 799.99, 1049.99]
      
      const full = fixedPrices[idx]

      return {
        ...row,
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
        className="grid grid-cols-1 md:grid-cols-3 gap-6 hide-scrollbar max-w-5xl mx-auto"
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
                <div className="text-3xl font-bold text-white">{formatUSD(plan.full)}</div>
              </div>
            </div>

            {/* Features */}
            <div className="space-y-3 mb-6 hide-scrollbar" style={{ overflow: "visible" }}>
              {plan.features.map((feature, featureIndex) => (
                <div key={featureIndex} className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 text-[#ff6600] flex-shrink-0" />
                  <span className="text-white/80">{feature}</span>
                </div>
              ))}
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
                const message = `¡Hola! Me interesa una cotización para un sitio web informativo ${plan.type.toLowerCase()}.`
                const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
                window.open(whatsappUrl, "_blank", "noopener,noreferrer")
              }}
            >
              Solicitar Cotización
            </motion.button>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}


// TODO: ESTO ES UNA COPIA DEL PREVIO, HACE LO MISMO PERO CON UNA DIFERENCIA EN EL CALCULO DE PRECIOS