"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function CalculatorHeader() {
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
          <motion.div className="flex items-center space-x-3" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            {/* Infinity SVG Logo */}
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-white"
            >
              <path
                d="M8 16C8 12.6863 10.6863 10 14 10H18C21.3137 10 24 12.6863 24 16C24 19.3137 21.3137 22 18 22H14C10.6863 22 8 19.3137 8 16Z"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
              />
              <path
                d="M14 16C14 14.8954 14.8954 14 16 14C17.1046 14 18 14.8954 18 16C18 17.1046 17.1046 18 16 18C14.8954 18 14 17.1046 14 16Z"
                fill="url(#gradient)"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#ff6600" />
                  <stop offset="100%" stopColor="#ff1493" />
                </linearGradient>
              </defs>
            </svg>
            <h1 className="text-xl lg:text-2xl font-black text-white">Landing Price Calculator</h1>
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
    </motion.header>
  )
}
