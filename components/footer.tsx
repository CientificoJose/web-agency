"use client"

import { motion } from "framer-motion"
import { Phone, Mail } from "lucide-react"

const navItems = [
  { href: "#inicio", label: "Inicio" },
  { href: "#servicios", label: "Servicios" },
  { href: "#portafolio", label: "Portafolio" },
  { href: "#sobre", label: "Sobre Nosotros" },
  { href: "#contacto", label: "Contacto" },
]

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <footer className="bg-black border-t border-gray-800 text-white py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <motion.div
              className="mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl font-black bg-gradient-to-r from-[#ff6600] to-[#ff1493] bg-clip-text text-transparent mb-4">
                Limitless Agency
              </h3>
              <p className="text-slate-300 leading-relaxed max-w-md">
                Agencia de desarrollo de software especializada en crear experiencias digitales excepcionales.
                Transformamos ideas en soluciones tecnológicas innovadoras que impulsan el crecimiento de tu negocio.
              </p>
            </motion.div>

            {/* Contact Info */}
            <div className="space-y-3">
              <motion.a
                href="tel:+584243603846"
                className="flex items-center space-x-3 text-slate-300 hover:text-[#ff6600] transition-colors duration-200"
                whileHover={{ x: 5 }}
              >
                <Phone className="w-5 h-5" />
                <span>+58 424 360 3846</span>
              </motion.a>

              <motion.a
                href="mailto:assistant@sinlimites-agency.online"
                className="flex items-center space-x-3 text-slate-300 hover:text-[#ff6600] transition-colors duration-200"
                whileHover={{ x: 5 }}
              >
                <Mail className="w-5 h-5" />
                <span>assistant@sinlimites-agency.online</span>
              </motion.a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h4 className="text-lg font-bold text-white mb-6">Navegación</h4>
              <nav className="space-y-3">
                {navItems.map((item) => (
                  <motion.button
                    key={item.href}
                    onClick={() => scrollToSection(item.href)}
                    className="block text-slate-300 hover:text-[#ff6600] transition-colors duration-200 text-left"
                    whileHover={{ x: 5 }}
                  >
                    {item.label}
                  </motion.button>
                ))}
              </nav>
            </motion.div>
          </div>

          {/* Services */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h4 className="text-lg font-bold text-white mb-6">Servicios</h4>
              <div className="space-y-3">
                <p className="text-slate-300">Desarrollo Web</p>
                <p className="text-slate-300">Aplicaciones Móviles</p>
                <p className="text-slate-300">Consultoría Técnica</p>
                <p className="text-slate-300">Capacitación</p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          className="border-t border-slate-800 pt-8 flex flex-col sm:flex-row justify-between items-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <p className="text-slate-400 text-sm mb-4 sm:mb-0">
            © {currentYear} Limitless Agency. Todos los Derechos Reservados.
          </p>

          <div className="flex space-x-6">
            <a href="#" className="text-slate-400 hover:text-indigo-400 text-sm transition-colors duration-200">
              Términos de Servicio
            </a>
            <a href="#" className="text-slate-400 hover:text-indigo-400 text-sm transition-colors duration-200">
              Política de Privacidad
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
