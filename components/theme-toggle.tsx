"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "@/hooks/use-theme"

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Evitar hidratación incorrecta
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <motion.button
      className="fixed bottom-6 left-6 z-50 w-12 h-12 bg-white/10 backdrop-blur-md dark:bg-black/20 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label={theme === "dark" ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      {theme === "dark" ? <Sun className="w-5 h-5 text-yellow-300" /> : <Moon className="w-5 h-5 text-slate-700" />}

      {/* Glow effect */}
      <div
        className={`absolute inset-0 rounded-full ${
          theme === "dark" ? "bg-yellow-300/20" : "bg-slate-700/20"
        } blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
      />
    </motion.button>
  )
}
