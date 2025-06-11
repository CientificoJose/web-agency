"use client"

import { motion } from "framer-motion"
import { Code2, Users, Smartphone } from "lucide-react"

const services = [
  {
    icon: Code2,
    title: "Front-End",
    description:
      "Utilizamos las tecnologías más valiosas como React, Next.js, TypeScript y Tailwind CSS para crear interfaces modernas, rápidas y escalables. Nuestro enfoque se centra en la experiencia del usuario y el rendimiento óptimo.",
    technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    icon: Users,
    title: "Desarrollo Personal",
    description:
      "Entrenamos tu equipo en las mejores prácticas de desarrollo moderno. Ofrecemos mentorías personalizadas, workshops técnicos y programas de capacitación adaptados a las necesidades específicas de tu organización.",
    technologies: ["Mentoring", "Workshops", "Best Practices", "Team Training"],
  },
  {
    icon: Smartphone,
    title: "App Móvil",
    description:
      "Desarrollamos apps híbridas multiplataforma usando React Native y Expo. Creamos experiencias móviles nativas con un solo código base, optimizadas para iOS y Android con rendimiento excepcional.",
    technologies: ["React Native", "Expo", "iOS", "Android"],
  },
]

export default function Services() {
  return (
    <section id="servicios" className="py-20 lg:py-32 bg-slate-50/50 dark:bg-slate-900/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl lg:text-5xl font-black text-slate-900 dark:text-white mb-6">
            Bienvenidos a{" "}
            <span className="bg-gradient-to-r from-[#ff6600] to-[#ff1493] bg-clip-text text-transparent">
              Limitless
            </span>
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Trabajamos en todo lo necesario para llevar tu proyecto al siguiente nivel con tecnologías de vanguardia
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="group relative"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{
                y: -12,
                rotateX: 5,
                rotateY: 5,
              }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="relative h-full p-8 bg-white dark:bg-slate-800 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-slate-200/50 dark:border-slate-700/50">
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="relative z-10">
                  <motion.div
                    className="w-20 h-20 bg-gradient-to-br from-[#ff6600] to-[#ff1493] rounded-3xl flex items-center justify-center mb-6 shadow-lg"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <service.icon className="w-10 h-10 text-white" />
                  </motion.div>

                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">{service.title}</h3>

                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">{service.description}</p>

                  <div className="flex flex-wrap gap-2">
                    {service.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 bg-gradient-to-r from-[#ff6600]/20 to-[#ff1493]/20 text-[#ff6600] border border-[#ff6600]/30 text-sm font-medium rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
