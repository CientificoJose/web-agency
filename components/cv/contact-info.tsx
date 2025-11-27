import { Mail, Phone, MapPin, Calendar, User, Linkedin, Instagram, Globe } from "lucide-react"
import Image from "next/image"

export default function ContactInfo() {
  return (
    <div className="cv-card p-6 rounded-lg shadow-xl border cv-border">
      {/* Foto de perfil SIN efecto de sombra */}
      <div className="flex justify-center mb-6">
        <div className="relative w-32 h-32">
          <div className="absolute inset-0 bg-gradient-to-r from-[#ff6600] to-[#ff1493] rounded-full p-1">
            <div className="bg-gray-900 rounded-full p-1 w-full h-full">
              <Image
                src="/images/jose-profile.jpg"
                alt="José Nieves"
                width={120}
                height={120}
                className="rounded-full object-cover w-full h-full"
                priority
              />
            </div>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-[#ff6600] to-[#ff1493] bg-clip-text text-transparent text-center">
        CONTACTO
      </h2>

      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <Mail className="w-5 h-5 text-[#ff6600]" />
          <a
            href="mailto:qijoos3niievsik@gmail.com"
            className="text-sm cv-text-secondary hover:text-[#ff6600] transition-colors"
          >
            qijoos3niievsik@gmail.com
          </a>
        </div>

        <div className="flex items-center space-x-3">
          <Phone className="w-5 h-5 text-[#ff6600]" />
          <a href="tel:+584124015063" className="text-sm cv-text-secondary hover:text-[#ff6600] transition-colors">
            +58 412-4015063
          </a>
        </div>

        <div className="flex items-center space-x-3">
          <MapPin className="w-5 h-5 text-[#ff6600]" />
          <span className="text-sm cv-text-secondary">Venezuela, Edo. Aragua</span>
        </div>

        <div className="flex items-center space-x-3">
          <Calendar className="w-5 h-5 text-[#ff6600]" />
          <span className="text-sm cv-text-secondary">08/06/2000</span>
        </div>

        <div className="flex items-center space-x-3">
          <User className="w-5 h-5 text-[#ff6600]" />
          <span className="text-sm cv-text-secondary">27.262.539</span>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t cv-border">
        <h3 className="text-lg font-semibold mb-4 bg-gradient-to-r from-[#ff6600] to-[#ff1493] bg-clip-text text-transparent">
          REDES SOCIALES
        </h3>
        <div className="space-y-3">
          <a
            href="https://www.linkedin.com/in/jose-nieves-sin-limites"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-3 hover:bg-[#ff6600]/10 p-2 rounded transition-colors"
          >
            <Linkedin className="w-4 h-4 text-[#ff6600]" />
            <span className="text-sm cv-text-secondary">LinkedIn</span>
          </a>

          <a
            href="https://www.instagram.com/josemind_win"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-3 hover:bg-[#ff1493]/10 p-2 rounded transition-colors"
          >
            <Instagram className="w-4 h-4 text-[#ff1493]" />
            <span className="text-sm cv-text-secondary">Instagram</span>
          </a>

          <a
            href="http://sinlimites-agency.site/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-3 hover:bg-[#ff6600]/10 p-2 rounded transition-colors"
          >
            <Globe className="w-4 h-4 text-[#ff6600]" />
            <span className="text-sm cv-text-secondary">Sitio Web</span>
          </a>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t cv-border">
        <h3 className="text-lg font-semibold mb-4 bg-gradient-to-r from-[#ff6600] to-[#ff1493] bg-clip-text text-transparent">
          IDIOMAS
        </h3>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm cv-text-primary">Español</span>
            <span className="text-xs cv-text-secondary">Nativo</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm cv-text-primary">Inglés</span>
            <span className="text-xs cv-text-secondary">Principiante</span>
          </div>
        </div>
      </div>
    </div>
  )
}
