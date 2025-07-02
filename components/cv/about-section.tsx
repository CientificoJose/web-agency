import { User } from "lucide-react"

export default function AboutSection() {
  return (
    <div className="cv-card p-6 rounded-lg shadow-xl border cv-border">
      <div className="flex items-center mb-6">
        <User className="w-6 h-6 text-[#ff6600] mr-3" />
        <h2 className="text-2xl font-bold bg-gradient-to-r from-[#ff6600] to-[#ff1493] bg-clip-text text-transparent">
          SOBRE MÍ
        </h2>
      </div>

      <p className="text-sm cv-text-secondary leading-relaxed">
        Con más de 5 años de experiencia en desarrollo web y móvil, me especializo en crear soluciones tecnológicas
        innovadoras que impulsan el crecimiento de los negocios. Mi pasión es transformar ideas complejas en productos
        digitales exitosos.
      </p>

      <div className="mt-4 pt-4 border-t cv-border">
        <h3 className="text-lg font-semibold mb-3 bg-gradient-to-r from-[#ff6600] to-[#ff1493] bg-clip-text text-transparent">
          Especialidades
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-gradient-to-r from-[#ff6600] to-[#ff1493] rounded-full"></div>
            <span className="text-sm cv-text-secondary">Desarrollo Full Stack</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-gradient-to-r from-[#ff6600] to-[#ff1493] rounded-full"></div>
            <span className="text-sm cv-text-secondary">Ciencia de Datos</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-gradient-to-r from-[#ff6600] to-[#ff1493] rounded-full"></div>
            <span className="text-sm cv-text-secondary">Machine Learning</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-gradient-to-r from-[#ff6600] to-[#ff1493] rounded-full"></div>
            <span className="text-sm cv-text-secondary">Sistemas GIS</span>
          </div>
        </div>
      </div>
    </div>
  )
}
