"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Sun, Moon } from "lucide-react"

export default function CVThemeToggle() {
  const [isDark, setIsDark] = useState(true)

  useEffect(() => {
    // Cargar tema guardado
    const savedTheme = localStorage.getItem("cv-theme")
    if (savedTheme) {
      setIsDark(savedTheme === "dark")
      applyTheme(savedTheme === "dark")
    } else {
      applyTheme(true) // Default dark
    }
  }, [])

  const applyTheme = (dark: boolean) => {
    const root = document.documentElement
    if (dark) {
      root.style.setProperty("--cv-bg", "linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #000000 100%)")
      root.style.setProperty("--cv-header-bg", "rgba(0, 0, 0, 0.9)")
      root.style.setProperty("--cv-card-bg", "linear-gradient(135deg, #1f2937 0%, #111827 50%, #0f172a 100%)")
      root.style.setProperty("--cv-text-primary", "#ffffff")
      root.style.setProperty("--cv-text-secondary", "#d1d5db")
      root.style.setProperty("--cv-text-muted", "#9ca3af")
      root.style.setProperty("--cv-border", "rgba(255, 255, 255, 0.1)")
    } else {
      root.style.setProperty("--cv-bg", "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #f1f5f9 100%)")
      root.style.setProperty("--cv-header-bg", "rgba(255, 255, 255, 0.95)")
      root.style.setProperty("--cv-card-bg", "#ffffff")
      root.style.setProperty("--cv-text-primary", "#1f2937")
      root.style.setProperty("--cv-text-secondary", "#4b5563")
      root.style.setProperty("--cv-text-muted", "#6b7280")
      root.style.setProperty("--cv-border", "rgba(0, 0, 0, 0.1)")
    }
  }

  const toggleTheme = () => {
    const newTheme = !isDark
    setIsDark(newTheme)
    applyTheme(newTheme)
    localStorage.setItem("cv-theme", newTheme ? "dark" : "light")
  }

  return (
    <motion.button
      onClick={toggleTheme}
      className="fixed top-20 right-6 z-50 p-3 bg-gradient-to-r from-[#ff6600] to-[#ff1493] text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 print:hidden"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5 }}
    >
      {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </motion.button>
  )
}
