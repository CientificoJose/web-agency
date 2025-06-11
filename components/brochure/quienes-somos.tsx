"use client"

import { motion } from "framer-motion"
import Image from "next/image"

const fadeUpVariant = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

export default function QuienesSomos() {
  return (
    <section id="quienes" className="py-20 lg:py-32 bg-gray-900/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <motion.div variants={fadeUpVariant} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h2 className="text-4xl lg:text-5xl font-black text-white mb-8">
              ¿QUIÉNES{" "}
              <span className="bg-gradient-to-r from-[#ff6600] to-[#ff1493] bg-clip-text text-transparent">SOMOS?</span>
            </h2>

            <div className="space-y-6 text-gray-300 leading-relaxed text-lg">
              <p>
                En Sin Límites nuestra agencia se dedica a transformar ideas innovadoras en soluciones digitales
                excepcionales. Nos especializamos en el desarrollo de software personalizado, aplicaciones web y móviles
                que no solo cumplen con los más altos estándares de calidad, sino que también impulsan el crecimiento y
                la eficiencia de nuestros clientes.
              </p>

              <p>
                Nuestro equipo está compuesto por desarrolladores altamente capacitados, diseñadores creativos y
                estrategas digitales que trabajan en conjunto para ofrecer productos que superen las expectativas. Desde
                startups emergentes hasta empresas consolidadas, hemos ayudado a organizaciones de diversos sectores a
                digitalizar sus procesos y alcanzar sus objetivos comerciales.
              </p>

              <p>
                Lo que nos distingue es nuestro enfoque centrado en el cliente y nuestra capacidad para entender las
                necesidades específicas de cada proyecto. Utilizamos las tecnologías más avanzadas y las mejores
                prácticas de la industria para crear soluciones que no solo resuelven problemas actuales, sino que
                también se adaptan y escalan con el crecimiento futuro de nuestros clientes, asegurando que cada
                inversión tecnológica se alinee perfectamente con sus objetivos comerciales.
              </p>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            className="relative"
            variants={fadeUpVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div
              className="relative h-96 lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl"
              whileHover={{ scale: 1.02, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src="/placeholder.svg?height=500&width=400"
                alt="Equipo Sin Límites trabajando"
                fill
                className="object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </motion.div>

            {/* Floating elements */}
            <motion.div
              className="absolute w-20 h-20 bg-gradient-to-br from-[#ff6600] to-[#ff1493] rounded-2xl shadow-xl flex items-center justify-center"
              style={{ right: "1rem", top: "1rem" }} // Posición segura dentro del contenedor
              animate={{ y: [-10, 10, -10], rotate: [0, 5, 0, -5, 0] }}
              transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            >
              <span className="text-white font-bold text-lg">💻</span>
            </motion.div>

            <motion.div
              className="absolute w-16 h-16 bg-gradient-to-br from-[#ff1493] to-[#ff6600] rounded-2xl shadow-xl flex items-center justify-center"
              style={{ left: "1rem", bottom: "1rem" }} // Posición segura dentro del contenedor
              animate={{ y: [10, -10, 10], rotate: [0, -5, 0, 5, 0] }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1 }}
            >
              <span className="text-white font-bold text-lg">🚀</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
