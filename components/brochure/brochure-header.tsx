"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function BrochureHeader() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-black/80 backdrop-blur-md shadow-lg border-b border-gray-800" : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <motion.div className="flex-shrink-0" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <h1 className="text-xl lg:text-2xl font-black bg-gradient-to-r from-[#ff6600] to-[#ff1493] bg-clip-text text-transparent">
              Sin Límites
            </h1>
          </motion.div>

          {/* Navigation */}
          <div className="flex items-center space-x-4">
            <Link href="/">
              <motion.button
                className="flex items-center space-x-2 text-white hover:text-[#ff6600] font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#ff6600] focus:ring-offset-2 rounded-md px-3 py-2"
                whileHover={{ x: -2 }}
                whileTap={{ x: 0 }}
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Volver al Inicio</span>
              </motion.button>
            </Link>

            <Button
              onClick={() => scrollToSection("#contacto")}
              className="bg-gradient-to-r from-[#ff6600] to-[#ff1493] hover:from-[#e55a00] hover:to-[#e6127a] text-white font-semibold px-4 lg:px-6 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Contáctanos
            </Button>
          </div>
        </div>
      </div>
    </motion.header>
  )
}
