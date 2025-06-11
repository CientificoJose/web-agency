"use client"

import { motion } from "framer-motion"
import { ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface CaseCardProps {
  title: string
  subtitle: string
  description: string
  image: string
  link: string
  tags: string[]
}

const cardVariant = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

export default function CaseCard({ title, subtitle, description, image, link, tags }: CaseCardProps) {
  return (
    <motion.div
      variants={cardVariant}
      className="group relative overflow-hidden rounded-3xl bg-gray-800/50 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-500"
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      {/* Image */}
      <div className="relative h-48 lg:h-56 overflow-hidden">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Blur glass overlay on hover */}
        <motion.div
          className="absolute inset-0 bg-black/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
        >
          <Button
            asChild
            size="sm"
            className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border border-white/30 rounded-full"
          >
            <a href={link} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="w-4 h-4 mr-2" />
              Ver Proyecto
            </a>
          </Button>
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-xl font-bold text-white mb-1 group-hover:text-[#ff6600] transition-colors duration-300">
              {title}
            </h3>
            <p className="text-[#ff1493] font-medium text-sm">{subtitle}</p>
          </div>
        </div>

        <p className="text-gray-300 text-sm leading-relaxed mb-4">{description}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-gradient-to-r from-[#ff6600]/20 to-[#ff1493]/20 text-[#ff6600] border border-[#ff6600]/30 text-xs font-medium rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
