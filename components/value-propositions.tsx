"use client"

import { motion } from "framer-motion"
import { Lightbulb, Target, Zap } from "lucide-react"

const propositions = [
  {
    icon: Lightbulb,
    title: "Soluciones Creativas",
    description:
      "Transformamos ideas complejas en soluciones digitales elegantes y funcionales. Nuestro enfoque innovador combina creatividad con tecnología de vanguardia para crear experiencias únicas que destacan en el mercado digital.",
  },
  {
    icon: Target,
    title: "Ideas Grandes",
    description:
      "No hay proyecto demasiado ambicioso para nosotros. Desde startups hasta empresas consolidadas, escalamos nuestras soluciones para adaptarse a cualquier visión, sin importar su magnitud o complejidad técnica.",
  },
  {
    icon: Zap,
    title: "Futuro",
    description:
      "Construimos con las tecnologías del mañana, hoy. Nuestro stack tecnológico siempre está actualizado con las últimas tendencias, asegurando que tu proyecto esté preparado para el futuro digital.",
  },
]

export default function ValuePropositions() {
  return (
    <section className="py-20 lg:py-32 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {propositions.map((prop, index) => (
            <motion.div
              key={index}
              className="group relative"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ y: -8 }}
            >
              <div className="relative h-full p-8 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-3xl border border-white/20 dark:border-slate-700/50 shadow-xl hover:shadow-2xl transition-all duration-300">
                {/* Glassmorphism effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-3xl" />

                {/* Soft neumorphism shadow */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#ff6600]/5 to-[#ff1493]/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="relative z-10">
                  <motion.div
                    className="w-16 h-16 bg-gradient-to-br from-[#ff6600] to-[#ff1493] rounded-2xl flex items-center justify-center mb-6 shadow-lg"
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <prop.icon className="w-8 h-8 text-white" />
                  </motion.div>

                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">{prop.title}</h3>

                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{prop.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
