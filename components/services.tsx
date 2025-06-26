"use client"

import { Code2, Users, Smartphone } from "lucide-react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

const services = [
  {
    icon: Code2,
    title: "Front-End",
    description:
      "Utilizamos las tecnologías más valiosas como React, Next.js, TypeScript y Tailwind CSS para crear interfaces modernas, rápidas y escalables.",
    technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    icon: Users,
    title: "Desarrollo Personal",
    description:
      "Entrenamos tu equipo en las mejores prácticas de desarrollo moderno. Ofrecemos mentorías personalizadas y workshops técnicos.",
    technologies: ["Mentoring", "Workshops", "Best Practices", "Team Training"],
  },
  {
    icon: Smartphone,
    title: "App Móvil",
    description:
      "Desarrollamos apps híbridas multiplataforma usando React Native y Expo. Experiencias móviles nativas con un solo código base.",
    technologies: ["React Native", "Expo", "iOS", "Android"],
  },
]

export default function Services() {
  const { ref: servicesRef, isVisible } = useScrollAnimation({ threshold: 0.1 })

  return (
    <section id="servicios" ref={servicesRef} className="section bg-gray-900/30">
      <div className="container-custom">
        <div className={`text-center mb-16 ${isVisible ? "animate-fade-in-up" : "animate-on-scroll"}`}>
          <h2 className="text-4xl lg:text-5xl font-black text-white mb-6">
            Bienvenidos a <span className="text-gradient">Limitless</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Trabajamos en todo lo necesario para llevar tu proyecto al siguiente nivel
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className={`card group ${isVisible ? "animate-fade-in-up" : "animate-on-scroll"}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-20 h-20 gradient-primary rounded-3xl flex items-center justify-center mb-6 shadow-lg">
                <service.icon className="w-10 h-10 text-white" />
              </div>

              <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-orange-400 transition-colors duration-300">
                {service.title}
              </h3>

              <p className="text-gray-300 leading-relaxed mb-6">{service.description}</p>

              <div className="flex flex-wrap gap-2">
                {service.technologies.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="px-3 py-1 bg-orange-500/20 text-orange-400 border border-orange-500/30 text-sm font-medium rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
