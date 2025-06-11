"use client"

import { motion } from "framer-motion"
import { ExternalLink, ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

const projects = [
  {
    title: "PRENSA ORIENTE",
    subtitle: "Periódico Digital",
    description:
      "Plataforma de noticias moderna con sistema de gestión de contenido, optimizada para SEO y con diseño responsive.",
    image: "/placeholder.svg?height=400&width=600",
    link: "https://prensaoriente.com",
    tags: ["Next.js", "CMS", "SEO"],
  },
  {
    title: "Amanda Urdaneta",
    subtitle: "Página de Aterrizaje",
    description: "Landing page elegante para profesional con animaciones suaves y formulario de contacto integrado.",
    image: "/placeholder.svg?height=400&width=600",
    link: "https://amandaurdaneta.com",
    tags: ["React", "Framer Motion", "Tailwind"],
  },
  {
    title: "Magy Fashion",
    subtitle: "Tienda en Línea",
    description: "E-commerce completo con carrito de compras, pasarela de pagos y panel administrativo.",
    image: "/placeholder.svg?height=400&width=600",
    link: "https://magyfashion.com",
    tags: ["E-commerce", "Stripe", "Dashboard"],
  },
]

export default function Portfolio() {
  const [currentProject, setCurrentProject] = useState(0)

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

        {/* Desktop Grid */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-8">
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

        {/* Mobile Carousel */}
        <div className="lg:hidden">
          <div className="relative">
            <motion.div
              className="rounded-3xl bg-white dark:bg-slate-800 shadow-xl"
              key={currentProject}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative h-64 rounded-t-3xl overflow-hidden">
                <Image
                  src={projects[currentProject].image || "/placeholder.svg"}
                  alt={projects[currentProject].title}
                  fill
                  className="object-cover"
                  loading="lazy"
                />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                  {projects[currentProject].title}
                </h3>
                <p className="text-indigo-600 dark:text-indigo-400 font-medium mb-3">
                  {projects[currentProject].subtitle}
                </p>
                <p className="text-slate-600 dark:text-slate-300 text-sm mb-4 leading-relaxed">
                  {projects[currentProject].description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {projects[currentProject].tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-medium rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <Button
                  asChild
                  className="w-full bg-gradient-to-r from-[#ff6600] to-[#ff1493] hover:from-[#e55a00] hover:to-[#e6127a] text-white"
                >
                  <a href={projects[currentProject].link} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Visitar Proyecto
                  </a>
                </Button>
              </div>
            </motion.div>

            {/* Navigation Buttons */}
            <button
              onClick={prevProject}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300"
              aria-label="Proyecto anterior"
            >
              <ChevronLeft className="w-5 h-5 text-slate-700 dark:text-slate-300" />
            </button>

            <button
              onClick={nextProject}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300"
              aria-label="Siguiente proyecto"
            >
              <ChevronRight className="w-5 h-5 text-slate-700 dark:text-slate-300" />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-6 space-x-2">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentProject(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentProject ? "bg-indigo-600 dark:bg-indigo-400" : "bg-slate-300 dark:bg-slate-600"
                }`}
                aria-label={`Ir al proyecto ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
