"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Code, Palette, Rocket } from "lucide-react"

export default function Hero() {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const floatingIcons = [
    { Icon: Code, delay: 0, x: 100, y: 50 },
    { Icon: Palette, delay: 0.5, x: -80, y: 80 },
    { Icon: Rocket, delay: 1, x: 120, y: -60 },
  ]

  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-[#ff6600]/30 to-[#ff1493]/30 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-[#ff1493]/30 to-[#ff6600]/30 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            className="text-center lg:text-left"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              className="text-4xl sm:text-5xl lg:text-7xl font-black mb-6 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="bg-gradient-to-r from-[#ff6600] via-[#ff1493] to-[#ff6600] bg-clip-text text-transparent">
                MENTES CREATIVAS,
              </span>
              <br />
              <span className="bg-gradient-to-r from-[#ff1493] via-[#ff6600] to-[#ff1493] bg-clip-text text-transparent">
                OBRAS CREATIVAS
              </span>
            </motion.h1>

            <motion.p
              className="text-xl sm:text-2xl text-slate-600 dark:text-slate-300 mb-8 font-medium"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              No Hay Límites para Crear
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Button
                onClick={() => scrollToSection("#contacto")}
                size="lg"
                className="bg-gradient-to-r from-[#ff6600] to-[#ff1493] hover:from-[#e55a00] hover:to-[#e6127a] text-white font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                Cuéntame tu proyecto
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                onClick={() => scrollToSection("#portafolio")}
                variant="outline"
                size="lg"
                className="border-2 border-[#ff6600] text-[#ff6600] hover:bg-gradient-to-r hover:from-[#ff6600] hover:to-[#ff1493] hover:text-white hover:border-transparent font-semibold px-8 py-4 rounded-full transition-all duration-300"
              >
                Ver Portafolio
              </Button>
            </motion.div>
          </motion.div>

          {/* Illustration */}
          <motion.div
            className="relative flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            {/* Central Astronaut */}
            <motion.div
              className="relative z-10 w-64 h-64 bg-gradient-to-br from-[#ff6600] to-[#ff1493] rounded-full flex items-center justify-center shadow-2xl"
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            >
              <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <Rocket className="w-16 h-16 text-white" />
              </div>
            </motion.div>

            {/* Floating Icons */}
            {floatingIcons.map(({ Icon, delay }, index) => (
              <motion.div
                key={index}
                className={`absolute w-16 h-16 ${
                  index % 2 === 0
                    ? "bg-gradient-to-br from-[#ff6600]/80 to-[#ff1493]/80"
                    : "bg-gradient-to-br from-[#ff1493]/80 to-[#ff6600]/80"
                } backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg`}
                style={{
                  left: index === 0 ? "70%" : index === 1 ? "10%" : "75%",
                  top: index === 0 ? "20%" : index === 1 ? "60%" : "80%",
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: [0, -20, 0],
                  rotate: [0, 360],
                }}
                transition={{
                  opacity: { duration: 0.5, delay },
                  scale: { duration: 0.5, delay },
                  y: { duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay },
                  rotate: { duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
                }}
              >
                <Icon className="w-8 h-8 text-white" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
