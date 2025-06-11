"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import CaseCard from "./case-card"
import { ChevronLeft, ChevronRight } from "lucide-react"

const cases = [
  {
    title: "Prensa Oriente VE",
    subtitle: "Periódico Digital",
    description: "Plataforma de noticias moderna con sistema de gestión de contenido y optimización SEO.",
    image: "/placeholder.svg?height=300&width=500",
    link: "https://prensaoriente.com",
    tags: ["Next.js", "CMS", "SEO"],
  },
  {
    title: "Alba Hogar",
    subtitle: "Tienda Online",
    description: "E-commerce completo para productos del hogar con carrito de compras y pasarela de pagos.",
    image: "/placeholder.svg?height=300&width=500",
    link: "https://albahogar.com",
    tags: ["E-commerce", "Stripe", "React"],
  },
  {
    title: "Magy Fashion",
    subtitle: "Tienda Online",
    description: "Tienda de moda online con catálogo dinámico y sistema de gestión de inventario.",
    image: "/placeholder.svg?height=300&width=500",
    link: "https://magyfashion.com",
    tags: ["Fashion", "Inventory", "Mobile"],
  },
  {
    title: "Amanda Urdaneta",
    subtitle: "Landing Page",
    description: "Landing page profesional con formularios de contacto y optimización para conversiones.",
    image: "/placeholder.svg?height=300&width=500",
    link: "https://amandaurdaneta.com",
    tags: ["Landing", "Conversion", "Professional"],
  },
]

const containerVariant = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

export default function CasosExito() {
  const [currentCase, setCurrentCase] = useState(0)

  const nextCase = () => {
    setCurrentCase((prev) => (prev + 1) % cases.length)
  }

  const prevCase = () => {
    setCurrentCase((prev) => (prev - 1 + cases.length) % cases.length)
  }

  return (
    <section id="exitos" className="py-20 lg:py-32 bg-gray-900/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl lg:text-5xl font-black text-white mb-6">
            Casos de{" "}
            <span className="bg-gradient-to-r from-[#ff6600] to-[#ff1493] bg-clip-text text-transparent">Éxito</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Proyectos que demuestran nuestra experiencia y compromiso con la excelencia
          </p>
        </motion.div>

        {/* Desktop Masonry Grid */}
        <motion.div
          className="hidden lg:grid lg:grid-cols-2 xl:grid-cols-4 gap-6"
          variants={containerVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {cases.map((caseItem, index) => (
            <div key={index} className={index % 3 === 0 ? "xl:col-span-2" : ""}>
              <CaseCard {...caseItem} />
            </div>
          ))}
        </motion.div>

        {/* Mobile Carousel */}
        <div className="lg:hidden">
          <div className="relative">
            <motion.div
              key={currentCase}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
            >
              <CaseCard {...cases[currentCase]} />
            </motion.div>

            {/* Navigation Buttons */}
            <button
              onClick={prevCase}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 text-white hover:text-[#ff6600]"
              aria-label="Caso anterior"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={nextCase}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 text-white hover:text-[#ff6600]"
              aria-label="Siguiente caso"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-6 space-x-2">
            {cases.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentCase(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentCase ? "bg-gradient-to-r from-[#ff6600] to-[#ff1493]" : "bg-gray-600"
                }`}
                aria-label={`Ir al caso ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
