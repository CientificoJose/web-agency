"use client"

import { useCallback } from "react"
import { ArrowRight, Rocket } from "lucide-react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

export default function Hero() {
  const { ref: heroRef, isVisible } = useScrollAnimation({ threshold: 0.2 })

  const scrollToSection = useCallback((href: string) => {
    const element = document.querySelector(href)
    if (element) {
      const headerHeight = 80
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
      const offsetPosition = elementPosition - headerHeight

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
    }
  }, [])

  return (
    <section
      id="inicio"
      ref={heroRef}
      className="section min-h-screen flex items-center justify-center relative overflow-hidden pt-20"
    >
      {/* Background gradients estáticos */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-orange-500/20 to-pink-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-pink-500/20 to-orange-500/20 rounded-full blur-3xl" />
      </div>

      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className={`text-center lg:text-left ${isVisible ? "animate-fade-in-left" : "animate-on-scroll"}`}>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black mb-6 leading-tight">
              <span className="text-gradient">MENTES CREATIVAS,</span>
              <br />
              <span className="text-gradient">OBRAS CREATIVAS</span>
            </h1>

            <p className="text-xl sm:text-2xl text-gray-300 mb-8 font-medium">No Hay Límites para Crear</p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button onClick={() => scrollToSection("#contacto")} className="btn-primary group">
                Cuéntame tu proyecto
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
              </button>
              <button
                onClick={() => scrollToSection("#portafolio")}
                className="border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white font-semibold px-8 py-3 rounded-xl transition-all duration-300"
              >
                Ver Portafolio
              </button>
            </div>
          </div>

          {/* Illustration - Sin animaciones flotantes */}
          <div
            className="relative flex items-center justify-center w-[300px] h-[300px]"
          >
            {/* Círculo principal con el cohete */}
            <div className={`absolute z-10 ${isVisible ? 'animate-float animate-scale-in' : 'animate-scale-out'}`}>
              <div className="relative w-64 h-64 gradient-primary rounded-full flex items-center justify-center shadow-2xl">
                <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <Rocket className="w-16 h-16 text-white" />
                </div>
              </div>
            </div>

            {/* Elemento decorativo 1 (Laptop) */}
            <div className={`absolute top-0 right-0 ${isVisible ? 'animate-float-slow animate-slide-down' : 'animate-slide-out-up'}`}>
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500/80 to-pink-500/80 rounded-2xl shadow-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">💻</span>
              </div>
            </div>

            {/* Elemento decorativo 2 (Cohete) */}
            <div className={`absolute bottom-0 left-0 ${isVisible ? 'animate-float-fast animate-slide-up' : 'animate-slide-out-down'}`}>
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500/80 to-orange-500/80 rounded-2xl shadow-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">🚀</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
