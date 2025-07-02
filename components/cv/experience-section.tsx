import { Briefcase, MapPin, Calendar } from "lucide-react"

export default function ExperienceSection() {
  const experiences = [
    {
      company: "ALCALDIA DE SUCRE - EDO. SUCRE",
      position: "Desarrollador de medios digitales",
      period: "Mar 2023 - May 2025",
      location: "Remoto",
      description: "Desarrollo de soluciones digitales y gestión de medios para la alcaldía.",
    },
    {
      company: "DEPARTAMENTO DE TECNOLOGIA - ALCALDIA DE SUCRE - EDO ARAGUA",
      position: "Desarrollador de Software, Analista de Datos, Ciencia de Datos",
      period: "Ene 2024 - Jul 2024",
      location: "Remoto",
      description: "Desarrollo de software, análisis de datos y implementación de soluciones de ciencia de datos.",
    },
    {
      company: "Sin Límites Agency",
      position: "Desarrollador de Software",
      period: "2024 - Presente",
      location: "Venezuela",
      description: "Emprendimiento Agencia Digital - www.limitless-agency.online",
    },
    {
      company: "SDEPRO (Secretaria de Desarrollo Económico y Productivo del Estado Aragua)",
      position: "Desarrollador Web",
      period: "Sep 2020 - Abr 2022",
      location: "Aragua, Venezuela",
      description: "Desarrollo Web (PHP, Kalkun, Laravel, Data Science, GIS)",
    },
    {
      company: "Alcaldía del Municipio Libertador Edo. Aragua",
      position: "Desarrollador Web",
      period: "Ago 2021 - Oct 2021",
      location: "Aragua, Venezuela",
      description: "Desarrollo Web (PHP, Laravel, Data Science, GIS)",
    },
  ]

  return (
    <div className="cv-card p-6 rounded-lg shadow-xl border cv-border">
      <div className="flex items-center mb-6">
        <Briefcase className="w-6 h-6 text-[#ff6600] mr-3" />
        <h2 className="text-2xl font-bold bg-gradient-to-r from-[#ff6600] to-[#ff1493] bg-clip-text text-transparent">
          EXPERIENCIA PROFESIONAL
        </h2>
      </div>

      <div className="space-y-6">
        {experiences.map((exp, index) => (
          <div key={index} className="border-l-4 border-[#ff6600] pl-4 pb-4">
            <h3 className="text-lg font-bold bg-gradient-to-r from-[#ff6600] to-[#ff1493] bg-clip-text text-transparent mb-1">
              {exp.company}
            </h3>
            <p className="text-sm font-semibold cv-text-primary mb-2">{exp.position}</p>

            <div className="flex flex-wrap items-center gap-4 mb-3">
              <div className="flex items-center">
                <Calendar className="w-3 h-3 text-[#ff6600] mr-1" />
                <span className="text-xs cv-text-muted">{exp.period}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="w-3 h-3 text-[#ff1493] mr-1" />
                <span className="text-xs cv-text-muted">{exp.location}</span>
              </div>
            </div>

            <p className="text-sm cv-text-secondary leading-relaxed">{exp.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
