"use client"

import { motion } from "framer-motion"
import type { LucideIcon } from "lucide-react"

interface ServiceCardProps {
  icon: LucideIcon
  title: string
  description: string
  price: string
  color: string
}

const cardVariant = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

export default function ServiceCard({ icon: Icon, title, description, price, color }: ServiceCardProps) {
  return (
    <motion.div
      variants={cardVariant}
      className="group relative"
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative h-full p-8 bg-gray-800/50 backdrop-blur-sm rounded-3xl border border-gray-700/50 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden">
        {/* Gradient border effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#ff6600]/20 to-[#ff1493]/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Ripple effect on hover */}
        <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-0 h-0 bg-gradient-to-r from-[#ff6600]/10 to-[#ff1493]/10 rounded-full group-hover:w-full group-hover:h-full group-hover:animate-ping" />
        </div>

        <div className="relative z-10">
          {/* Icon */}
          <motion.div
            className="w-16 h-16 bg-gradient-to-br from-[#ff6600] to-[#ff1493] rounded-2xl flex items-center justify-center mb-6 shadow-lg"
            whileHover={{ rotate: 360, scale: 1.1 }}
            transition={{ duration: 0.5 }}
          >
            <Icon className="w-8 h-8 text-white" />
          </motion.div>

          {/* Price Badge */}
          <div className="absolute top-6 right-6">
            <span className="px-3 py-1 bg-gradient-to-r from-[#ff6600] to-[#ff1493] text-white text-sm font-bold rounded-full">
              {price}
            </span>
          </div>

          {/* Content */}
          <h3 className="text-xl font-bold text-white mb-4 group-hover:text-[#ff6600] transition-colors duration-300">
            {title}
          </h3>

          <p className="text-gray-300 leading-relaxed text-sm">{description}</p>

          {/* Hover indicator */}
          <motion.div
            className="mt-6 flex items-center text-[#ff6600] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            initial={{ x: -10 }}
            whileHover={{ x: 0 }}
          >
            <span className="text-sm font-medium">Más información →</span>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
