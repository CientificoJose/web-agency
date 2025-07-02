import { GraduationCap, Calendar } from "lucide-react"

export default function EducationSection() {
  const education = [
    {
      degree: "TSU Informática",
      institution: "IUTAR Instituto Universitario Tecnológico Antonio Ricaurte",
      year: "2020",
      type: "Título Universitario",
    },
    {
      degree: "Diplomado Geomática",
      institution: "FEVP Fundación de Escuela Venezolana de Planificación",
      year: "2019",
      type: "Diplomado",
    },
    {
      degree: "Ciencia de Datos",
      institution: "IBM Coursera.org",
      year: "2021",
      type: "Certificación",
    },
  ]

  return (
    <div className="cv-card p-6 rounded-lg shadow-xl border cv-border">
      <div className="flex items-center mb-6">
        <GraduationCap className="w-6 h-6 text-[#ff1493] mr-3" />
        <h2 className="text-2xl font-bold bg-gradient-to-r from-[#ff6600] to-[#ff1493] bg-clip-text text-transparent">
          EDUCACIÓN
        </h2>
      </div>

      <div className="space-y-4">
        {education.map((edu, index) => (
          <div key={index} className="border-l-4 border-[#ff1493] pl-4 pb-4">
            <h3 className="text-lg font-bold bg-gradient-to-r from-[#ff6600] to-[#ff1493] bg-clip-text text-transparent mb-1">
              {edu.degree}
            </h3>
            <p className="text-sm font-semibold cv-text-primary mb-2">{edu.institution}</p>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Calendar className="w-3 h-3 text-[#ff1493] mr-1" />
                <span className="text-xs cv-text-muted">{edu.year}</span>
              </div>
              <span className="text-xs cv-text-muted bg-gradient-to-r from-[#ff6600]/20 to-[#ff1493]/20 px-2 py-1 rounded">
                {edu.type}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
