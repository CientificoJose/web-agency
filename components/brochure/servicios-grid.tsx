"use client"

import { motion } from "framer-motion"
import ServiceCard from "./service-card"
import { Code, Settings, Globe, ShoppingCart, Smartphone, MessageSquare } from "lucide-react"

const services = [
  {
    icon: Code,
    title: "Software a Medida",
    description:
      "Creamos soluciones de software personalizadas que se adaptan perfectamente a las necesidades específicas de tu negocio, utilizando las tecnologías más avanzadas del mercado.",
    price: "Desde $200",
    color: "from-blue-500 to-purple-600",
  },
  {
    icon: Settings,
    title: "Mantenimiento y Actualizaciones",
    description:
      "Ofrecemos un servicio integral de mantenimiento y actualizaciones para garantizar que tu software siempre esté funcionando de manera óptima y segura.",
    price: "Desde $50",
    color: "from-green-500 to-teal-600",
  },
  {
    icon: Globe,
    title: "Landing Page",
    description:
      "Diseñamos landing pages altamente efectivas y optimizadas para conversión, que capturan la atención de tus visitantes y los convierten en clientes potenciales.",
    price: "Desde $100",
    color: "from-orange-500 to-red-600",
  },
  {
    icon: ShoppingCart,
    title: "Ecommerce",
    description:
      "Creamos sitios de Ecommerce completos y funcionales que permiten a tu negocio vender en línea de manera eficiente, con todas las herramientas necesarias para el éxito.",
    price: "Desde $200",
    color: "from-purple-500 to-pink-600",
  },
  {
    icon: Smartphone,
    title: "App Móvil",
    description:
      "Creamos aplicaciones móviles nativas e híbridas para iOS y Android que ofrecen una experiencia de usuario excepcional y funcionalidades avanzadas.",
    price: "Desde $200",
    color: "from-indigo-500 to-blue-600",
  },
  {
    icon: MessageSquare,
    title: "Chat Bot",
    description:
      "Diseñamos chatbots inteligentes que automatizan la atención al cliente, mejoran la experiencia del usuario y aumentan la eficiencia operativa de tu negocio.",
    price: "Desde $150",
    color: "from-cyan-500 to-blue-600",
  },
]

const containerVariant = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

export default function ServiciosGrid() {
  return (
    <section id="servicios" className="py-20 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl lg:text-5xl font-black text-white mb-6">
            Nuestros{" "}
            <span className="bg-gradient-to-r from-[#ff6600] to-[#ff1493] bg-clip-text text-transparent">
              Servicios
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Soluciones digitales completas para impulsar tu negocio al siguiente nivel
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
