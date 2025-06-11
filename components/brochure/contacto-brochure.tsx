"use client"

import type React from "react"
import { motion } from "framer-motion"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Phone, Mail, Clock, Shield } from "lucide-react"

interface FormData {
  nombre: string
  email: string
  telefono: string
  mensaje: string
}

interface FormErrors {
  [key: string]: string
}

export default function ContactoBrochure() {
  const [formData, setFormData] = useState<FormData>({
    nombre: "",
    email: "",
    telefono: "",
    mensaje: "",
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.nombre.trim()) {
      newErrors.nombre = "El nombre es requerido"
    }

    if (!formData.email.trim()) {
      newErrors.email = "El email es requerido"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "El email no es válido"
    }

    if (!formData.telefono.trim()) {
      newErrors.telefono = "El teléfono es requerido"
    }

    if (!formData.mensaje.trim()) {
      newErrors.mensaje = "El mensaje es requerido"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000))

    console.log("Form submitted:", formData)

    // Reset form
    setFormData({
      nombre: "",
      email: "",
      telefono: "",
      mensaje: "",
    })

    setIsSubmitting(false)
    alert("¡Mensaje enviado correctamente! Te contactaremos pronto.")
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  return (
    <section id="contacto" className="py-20 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl lg:text-5xl font-black text-white mb-6">
            Hablemos de tu{" "}
            <span className="bg-gradient-to-r from-[#ff6600] to-[#ff1493] bg-clip-text text-transparent">Proyecto</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Estamos listos para convertir tu visión en realidad digital
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="nombre" className="block text-sm font-medium text-gray-300 mb-2">
                  Nombre completo *
                </label>
                <Input
                  id="nombre"
                  name="nombre"
                  type="text"
                  value={formData.nombre}
                  onChange={handleChange}
                  className={`bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:border-[#ff6600] ${
                    errors.nombre ? "border-red-500 focus:border-red-500" : ""
                  }`}
                  placeholder="Tu nombre completo"
                />
                {errors.nombre && <p className="mt-1 text-sm text-red-400">{errors.nombre}</p>}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email *
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:border-[#ff6600] ${
                    errors.email ? "border-red-500 focus:border-red-500" : ""
                  }`}
                  placeholder="tu@email.com"
                />
                {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="telefono" className="block text-sm font-medium text-gray-300 mb-2">
                  Teléfono *
                </label>
                <Input
                  id="telefono"
                  name="telefono"
                  type="tel"
                  value={formData.telefono}
                  onChange={handleChange}
                  className={`bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:border-[#ff6600] ${
                    errors.telefono ? "border-red-500 focus:border-red-500" : ""
                  }`}
                  placeholder="+58 424 360 3846"
                />
                {errors.telefono && <p className="mt-1 text-sm text-red-400">{errors.telefono}</p>}
              </div>

              <div>
                <label htmlFor="mensaje" className="block text-sm font-medium text-gray-300 mb-2">
                  Mensaje *
                </label>
                <Textarea
                  id="mensaje"
                  name="mensaje"
                  value={formData.mensaje}
                  onChange={handleChange}
                  className={`min-h-[120px] bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:border-[#ff6600] ${
                    errors.mensaje ? "border-red-500 focus:border-red-500" : ""
                  }`}
                  placeholder="Cuéntanos sobre tu proyecto..."
                />
                {errors.mensaje && <p className="mt-1 text-sm text-red-400">{errors.mensaje}</p>}
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-[#ff6600] to-[#ff1493] hover:from-[#e55a00] hover:to-[#e6127a] text-white font-semibold py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {isSubmitting ? "Enviando..." : "Enviar Mensaje"}
              </Button>

              {/* Privacy Notice */}
              <div className="flex items-start space-x-2 text-xs text-gray-400">
                <Shield className="w-4 h-4 mt-0.5 text-[#ff6600]" />
                <p>
                  Tus datos están protegidos. Solo los utilizaremos para contactarte sobre tu proyecto. No compartimos
                  información con terceros.
                </p>
              </div>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Quick Contact */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-3xl p-8 border border-gray-700/50">
              <h3 className="text-xl font-bold text-white mb-6">Datos de Contacto</h3>

              <div className="space-y-4">
                <motion.div className="flex items-center space-x-3 text-gray-300" whileHover={{ x: 5 }}>
                  <div className="w-10 h-10 bg-gradient-to-br from-[#ff6600]/20 to-[#ff1493]/20 rounded-full flex items-center justify-center">
                    <Phone className="w-5 h-5 text-[#ff6600]" />
                  </div>
                  <div>
                    <p className="font-medium text-white">Teléfono</p>
                    <p className="text-sm">+58 424-360-3846</p>
                  </div>
                </motion.div>

                <motion.div className="flex items-center space-x-3 text-gray-300" whileHover={{ x: 5 }}>
                  <div className="w-10 h-10 bg-gradient-to-br from-[#ff6600]/20 to-[#ff1493]/20 rounded-full flex items-center justify-center">
                    <Mail className="w-5 h-5 text-[#ff1493]" />
                  </div>
                  <div>
                    <p className="font-medium text-white">Email</p>
                    <p className="text-sm">assistant@sinlimites-agency.online</p>
                  </div>
                </motion.div>

                <motion.div className="flex items-center space-x-3 text-gray-300" whileHover={{ x: 5 }}>
                  <div className="w-10 h-10 bg-gradient-to-br from-[#ff6600]/20 to-[#ff1493]/20 rounded-full flex items-center justify-center">
                    <Clock className="w-5 h-5 text-[#ff6600]" />
                  </div>
                  <div>
                    <p className="font-medium text-white">Horario</p>
                    <p className="text-sm">Lun-Vie 9:00-18:00</p>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Response Time */}
            <div className="bg-gradient-to-br from-[#ff6600]/10 to-[#ff1493]/10 rounded-3xl p-6 border border-[#ff6600]/20">
              <h4 className="text-lg font-bold text-white mb-4">Tiempo de Respuesta</h4>
              <p className="text-gray-300 text-sm leading-relaxed">
                Nos comprometemos a responder todas las consultas en menos de 24 horas. Para proyectos urgentes,
                contáctanos directamente por WhatsApp.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
