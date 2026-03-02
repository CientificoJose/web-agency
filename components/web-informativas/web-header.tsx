"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

export default function WebHeader() {
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
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? "bg-black/80 backdrop-blur-lg border-b border-white/10 py-4 shadow-lg" : "bg-transparent py-6"
    }`} style={{ overflow: "visible" }}>
      <div className="container mx-auto px-4 lg:px-8" style={{ overflow: "visible" }}>
        <div className="flex items-center justify-between" style={{ overflow: "visible" }}>
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/recurso.png"
              alt="Sin Límites Agency Logo"
              width={150}
              height={50}
              className="h-10 w-auto brightness-0 invert"
            />
          </Link>

          <nav className="hidden md:flex gap-6">
            <Link href="/brochure" className="text-sm font-medium text-white/70 hover:text-white transition-colors">
              Brochure
            </Link>
            <Link href="/lading-pages" className="text-sm font-medium text-white/70 hover:text-white transition-colors">
              Landing Pages
            </Link>
            <Link href="/web-informativas" className="text-sm font-medium text-[#ff6600] transition-colors">
              Web Informativas
            </Link>
          </nav>

          {/* Navigation */}
          <div className="flex items-center space-x-4">
            <Link href="/">
              <motion.button
                className="flex items-center space-x-2 text-white hover:text-[#ff6600] font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#ff6600] focus:ring-offset-2 rounded-md px-3 py-2"
                whileHover={{ x: -2 }}
                whileTap={{ x: 0 }}
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Inicio</span>
              </motion.button>
            </Link>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={() => scrollToSection("#contacto")}
                className="bg-gradient-to-r from-[#ff6600] to-[#ff1493] hover:from-[#e55a00] hover:to-[#e6127a] text-white font-semibold px-4 lg:px-6 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 animate-pulse hover:animate-none"
              >
                Contáctanos
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </header>
  )
}
