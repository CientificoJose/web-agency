"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export default function About() {
  return (
    <section id="sobre" className="py-20 lg:py-32 bg-slate-50/50 dark:bg-slate-900/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <motion.div
            className="order-2 lg:order-1"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl lg:text-5xl font-black text-slate-900 dark:text-white mb-6">
                  ¿Quiénes{" "}
                  <span className="bg-gradient-to-r from-[#ff6600] to-[#ff1493] bg-clip-text text-transparent">
                    Somos?
                  </span>
                </h2>
                <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                  Somos un equipo apasionado de desarrolladores, diseñadores y estrategas digitales que creen en el
                  poder transformador de la tecnología. Con años de experiencia en el desarrollo de soluciones web y
                  móviles, nos especializamos en crear experiencias digitales que no solo funcionan perfectamente, sino
                  que también inspiran y conectan con las personas.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Nuestra Visión</h3>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  Ser la agencia de referencia en desarrollo de software, reconocida por nuestra innovación, calidad
                  excepcional y capacidad de transformar ideas ambiciosas en realidades digitales exitosas que impacten
                  positivamente en el mundo.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Nuestra Misión</h3>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  Empoderar a empresas y emprendedores con soluciones tecnológicas de vanguardia, combinando
                  creatividad, innovación y excelencia técnica para crear productos digitales que superen expectativas y
                  generen valor real para nuestros clientes y sus usuarios.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Image Collage */}
          <motion.div
            className="order-1 lg:order-2 relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative h-96 lg:h-[500px]">
              {/* Main Image */}
              <motion.div
                className="absolute inset-0 rounded-3xl overflow-hidden shadow-2xl"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src="/placeholder.svg?height=500&width=400"
                  alt="Equipo Limitless Agency"
                  fill
                  className="object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/20 to-transparent" />
              </motion.div>

              {/* Floating Elements */}
              <motion.div
                className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-[#ff6600] to-[#ff1493] rounded-2xl shadow-xl flex items-center justify-center"
                style={{ right: "1rem", top: "1rem" }} // Asegurar que esté dentro del contenedor
                animate={{ y: [-10, 10, -10], rotate: [0, 5, 0, -5, 0] }}
                transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              >
                <span className="text-white font-bold text-lg">💻</span>
              </motion.div>

              <motion.div
                className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-[#ff1493] to-[#ff6600] rounded-2xl shadow-xl flex items-center justify-center"
                style={{ left: "1rem", bottom: "1rem" }} // Asegurar que esté dentro del contenedor
                animate={{ y: [10, -10, 10], rotate: [0, -5, 0, 5, 0] }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1 }}
              >
                <span className="text-white font-bold text-lg">🚀</span>
              </motion.div>

              {/* Decorative Blur */}
              <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-gradient-to-r from-indigo-400/30 to-purple-400/30 rounded-full blur-2xl" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
