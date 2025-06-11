"use client"

import type React from "react"

import { motion } from "framer-motion"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MessageSquare, Phone, Instagram } from "lucide-react"
import Image from "next/image"

interface FormData {
  nombre: string
  apellido: string
  email: string
  telefono: string
  mensaje: string
}

interface FormErrors {
  [key: string]: string
}

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    nombre: "",
    apellido: "",
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

    if (!formData.apellido.trim()) {
      newErrors.apellido = "El apellido es requerido"
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
      apellido: "",
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
          <h2 className="text-4xl lg:text-5xl font-black text-slate-900 dark:text-white mb-6">
            Hablemos de tu{" "}
            <span className="bg-gradient-to-r from-[#ff6600] to-[#ff1493] bg-clip-text text-transparent">Proyecto</span>
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="nombre" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Nombre *
                  </label>
                  <Input
                    id="nombre"
                    name="nombre"
                    type="text"
                    value={formData.nombre}
                    onChange={handleChange}
                    className={`${errors.nombre ? "border-red-500 focus:border-red-500" : ""}`}
                    placeholder="Tu nombre"
                  />
                  {errors.nombre && <p className="mt-1 text-sm text-red-600">{errors.nombre}</p>}
                </div>

                <div>
                  <label
                    htmlFor="apellido"
                    className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
                  >
                    Apellido *
                  </label>
                  <Input
                    id="apellido"
                    name="apellido"
                    type="text"
                    value={formData.apellido}
                    onChange={handleChange}
                    className={`${errors.apellido ? "border-red-500 focus:border-red-500" : ""}`}
                    placeholder="Tu apellido"
                  />
                  {errors.apellido && <p className="mt-1 text-sm text-red-600">{errors.apellido}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Email *
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`${errors.email ? "border-red-500 focus:border-red-500" : ""}`}
                  placeholder="tu@email.com"
                />
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="telefono" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Teléfono *
                </label>
                <Input
                  id="telefono"
                  name="telefono"
                  type="tel"
                  value={formData.telefono}
                  onChange={handleChange}
                  className={`${errors.telefono ? "border-red-500 focus:border-red-500" : ""}`}
                  placeholder="+58 424 360 3846"
                />
                {errors.telefono && <p className="mt-1 text-sm text-red-600">{errors.telefono}</p>}
              </div>

              <div>
                <label htmlFor="mensaje" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Mensaje *
                </label>
                <Textarea
                  id="mensaje"
                  name="mensaje"
                  value={formData.mensaje}
                  onChange={handleChange}
                  className={`min-h-[120px] ${errors.mensaje ? "border-red-500 focus:border-red-500" : ""}`}
                  placeholder="Cuéntanos sobre tu proyecto..."
                />
                {errors.mensaje && <p className="mt-1 text-sm text-red-600">{errors.mensaje}</p>}
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-[#ff6600] to-[#ff1493] hover:from-[#e55a00] hover:to-[#e6127a] text-white font-semibold py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {isSubmitting ? "Enviando..." : "Enviar Mensaje"}
              </Button>
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
            {/* Person Card */}
            <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-xl border border-slate-200/50 dark:border-slate-700/50">
              <div className="flex items-center space-x-4 mb-6">
                <div className="relative w-16 h-16 rounded-full overflow-hidden">
                  <Image src="/placeholder.svg?height=64&width=64" alt="José Nieves" fill className="object-cover" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">José Nieves</h3>
                  <p className="text-indigo-600 dark:text-indigo-400 font-medium">Founder & Lead Developer</p>
                </div>
              </div>

              <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                Con más de 5 años de experiencia en desarrollo web y móvil, me especializo en crear soluciones
                tecnológicas innovadoras que impulsan el crecimiento de los negocios. Mi pasión es transformar ideas
                complejas en productos digitales exitosos.
              </p>

              {/* Contact Methods */}
              <div className="space-y-4">
                <motion.a
                  href="tel:+584243603846"
                  className="flex items-center space-x-3 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200"
                  whileHover={{ x: 5 }}
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-[#ff6600]/20 to-[#ff1493]/20 rounded-full flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-[#ff6600]" />
                  </div>
                  <div>
                    <p className="font-medium">WhatsApp</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">+58 424 360 3846</p>
                  </div>
                </motion.a>

                <motion.a
                  href="tel:+584243603846"
                  className="flex items-center space-x-3 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200"
                  whileHover={{ x: 5 }}
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-[#ff6600]/20 to-[#ff1493]/20 rounded-full flex items-center justify-center">
                    <Phone className="w-5 h-5 text-[#ff1493]" />
                  </div>
                  <div>
                    <p className="font-medium">Teléfono</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">+58 424 360 3846</p>
                  </div>
                </motion.a>

                <motion.a
                  href="https://instagram.com/limitlessagency"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200"
                  whileHover={{ x: 5 }}
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-[#ff6600]/20 to-[#ff1493]/20 rounded-full flex items-center justify-center">
                    <Instagram className="w-5 h-5 text-[#ff6600]" />
                  </div>
                  <div>
                    <p className="font-medium">Instagram</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">@limitlessagency</p>
                  </div>
                </motion.a>
              </div>
            </div>

            {/* Quick Info */}
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-3xl p-6 border border-indigo-200/50 dark:border-indigo-700/50">
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Respuesta Rápida</h4>
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                Nos comprometemos a responder todos los mensajes en menos de 24 horas. Para consultas urgentes,
                contáctanos directamente por WhatsApp.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
