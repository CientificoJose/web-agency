"use client"

import { motion } from "framer-motion"
import { ExternalLink, ChevronLeft, ChevronRight } from "lucide-react"
import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

const projects = [
  {
    title: "PRENSA ORIENTE",
    subtitle: "Periódico Digital",
    description:
      "Plataforma de noticias moderna con sistema de gestión de contenido, optimizada para SEO y con diseño responsive.",
    image: "/images/proyect/prensa-oriente.png",
    link: "https://www.prensaoriente.com.ve",
    tags: ["Next.js", "CMS", "SEO", "Periodico Digital"],
  },
  {
    title: "Be Global Media",
    subtitle: "Página de Aterrizaje",
    description: "Landing page de agencia audiovisual.",
    image: "/images/proyect/be-global.png",
    link: "https://www.beglobalmedia.com.ve",
    tags: ["React", "Framer Motion", "Tailwind", "Landing Page"],
  },
  {
    title: "Magy Fashion",
    subtitle: "Tienda en Línea",
    description: "E-commerce completo con carrito de compras, pasarela de pagos y panel administrativo.",
    image: "/images/proyect/magy-fashion.png",
    link: "https://magy-fashion.shop/",
    tags: ["E-commerce", "MultiIdioma", "Dashboard", "Tienda en Linea"],
  },
  {
    title: "JG-Store",
    subtitle: "Tienda en Línea",
    description: "E-commerce usando tecnologia TiendaNube.",
    image: "/images/proyect/jg-store.png",
    link: "https://jg-store.shop/",
    tags: ["E-commerce", "TiendaNube", "Argentina", "Dashboard", "Tienda en Linea"],
  },
]

export default function Portfolio() {
  const [currentProject, setCurrentProject] = useState(0)
  const trackRef = useRef<HTMLDivElement>(null)

  // Desplaza el carrusel horizontal por el ancho de una tarjeta
  const scrollByCards = (direction: number) => {
    const el = trackRef.current
    if (!el) return
    const firstItem = el.querySelector<HTMLElement>('.carousel-item')
    if (!firstItem) return
    const itemWidth = firstItem.getBoundingClientRect().width
    const styles = getComputedStyle(el)
    const gap = parseFloat((styles as any).columnGap || (styles as any).gap || '0') || 0
    el.scrollBy({ left: direction * (itemWidth + gap), behavior: 'smooth' })
  }

  const nextProject = () => {
    setCurrentProject((prev) => (prev + 1) % projects.length)
  }

  const prevProject = () => {
    setCurrentProject((prev) => (prev - 1 + projects.length) % projects.length)
  }

  return (
    <section id="portafolio" className="py-20 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl lg:text-5xl font-black text-slate-900 dark:text-white mb-6">
            Nuestro{" "}
            <span className="bg-gradient-to-r from-[#ff6600] to-[#ff1493] bg-clip-text text-transparent">
              Portafolio
            </span>
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Proyectos que demuestran nuestra pasión por la excelencia digital
          </p>
        </motion.div>

        {/* Desktop Grid (oculto, usamos carrusel unificado) */}
        <div className="hidden">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className="group relative rounded-3xl bg-white dark:bg-slate-800 shadow-xl hover:shadow-2xl transition-all duration-500"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{
                y: -8,
                rotateX: 5,
                rotateY: 5,
              }}
              style={{ transformStyle: "preserve-3d", overflow: "visible" }}
            >
              <div className="relative h-64 rounded-t-3xl overflow-hidden">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <motion.div
                  className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  whileHover={{ scale: 1.1 }}
                >
                  <Button
                    asChild
                    size="sm"
                    className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border border-white/30"
                  >
                    <a href={project.link} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Visitar
                    </a>
                  </Button>
                </motion.div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{project.title}</h3>
                <p className="text-indigo-600 dark:text-indigo-400 font-medium mb-3">{project.subtitle}</p>
                <p className="text-slate-600 dark:text-slate-300 text-sm mb-4 leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-medium rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Carrusel unificado: 3 visibles + swipe para ver más */}
        <div>
          <div className="relative">
            <div
              ref={trackRef}
              className="flex flex-nowrap gap-4 overflow-x-auto snap-x snap-mandatory px-4"
              style={{ scrollBehavior: 'smooth' }}
            >
              {projects.map((project, index) => (
                <div key={index} className="carousel-item snap-start flex-none w-[85%] sm:w-1/2 lg:w-1/3">
                  <div className="group relative rounded-3xl bg-white dark:bg-slate-800 shadow-xl">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Visitar ${project.title}`}
                      className="relative block h-56 sm:h-64 lg:h-72 rounded-t-3xl overflow-hidden"
                    >
                      <Image
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        fill
                        className="object-cover"
                        loading="lazy"
                      />
                      {/* Overlay solo en desktop (hover) */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute inset-0 hidden md:flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white text-sm font-medium flex items-center gap-2">
                          <ExternalLink className="w-4 h-4" />
                          Visitar
                        </span>
                      </div>
                    </a>
                    <div className="p-4">
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1 line-clamp-1">{project.title}</h3>
                      <p className="text-[12px] text-indigo-600 dark:text-indigo-400 font-medium line-clamp-1">{project.subtitle}</p>
                      {project.tags && project.tags.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {project.tags.map((tag, i) => (
                            <span
                              key={i}
                              className="px-2 py-1 rounded-full bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-200 text-[10px] font-medium"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Botones de navegación */}
            <button
              onClick={() => scrollByCards(-1)}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-full hidden md:flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300"
              aria-label="Anterior"
            >
              <ChevronLeft className="w-5 h-5 text-slate-700 dark:text-slate-300" />
            </button>

            <button
              onClick={() => scrollByCards(1)}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-full hidden md:flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300"
              aria-label="Siguiente"
            >
              <ChevronRight className="w-5 h-5 text-slate-700 dark:text-slate-300" />
            </button>
          </div>
        </div>

        {/* Enlaces a secciones: Brochure y Landing Pages */}
        <div className="mt-12 text-center">
          <p className="text-slate-600 dark:text-slate-300 mb-4">Explora más secciones</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild className="px-6 bg-white/10 hover:bg-white/20 text-slate-900 dark:text-white border border-slate-200 dark:border-white/20">
              <Link href="/brochure">Ver Brochure</Link>
            </Button>
            <Button asChild className="px-6 bg-gradient-to-r from-[#ff6600] to-[#ff1493] hover:from-[#e55a00] hover:to-[#e6127a] text-white">
              <Link href="/lading-pages">Landing Pages y Precios</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
