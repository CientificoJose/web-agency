"use client"

import { motion } from "framer-motion"
import { Download, ArrowLeft } from "lucide-react"
import Link from "next/link"

interface CVHeaderProps {
  onExportPDF: () => void
}

export default function CVHeader({ onExportPDF }: CVHeaderProps) {
  return (
    <motion.header
      className="cv-header-bg border-b cv-border sticky top-0 z-40 print:hidden"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-4xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
              <ArrowLeft className="w-5 h-5 cv-text-primary" />
              <span className="text-sm cv-text-primary">Volver al inicio</span>
            </Link>

            <div className="hidden md:block">
              <h1 className="text-xl font-bold bg-gradient-to-r from-[#ff6600] to-[#ff1493] bg-clip-text text-transparent">
                José Nieves
              </h1>
              <p className="text-sm cv-text-muted">Desarrollador Software</p>
            </div>
          </div>

          <motion.button
            onClick={onExportPDF}
            className="flex items-center space-x-2 bg-gradient-to-r from-[#ff6600] to-[#ff1493] text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Download className="w-4 h-4" />
            <span className="text-sm font-medium">Exportar PDF</span>
          </motion.button>
        </div>
      </div>
    </motion.header>
  )
}
