"use client"

import { useRef } from "react"
import CVHeader from "@/components/cv/cv-header"
import CVThemeToggle from "@/components/cv/cv-theme-toggle"
import { usePDFGenerator } from "@/hooks/use-pdf-generator"

export default function JoseNievesCV() {
  const cvRef = useRef<HTMLDivElement>(null)
  const { generatePDF } = usePDFGenerator()

  const handleExportPDF = () => {
    generatePDF()
  }

  return (
    <div className="min-h-screen cv-bg transition-colors duration-300">
      <CVHeader onExportPDF={handleExportPDF} />
      <CVThemeToggle />

      <div className="max-w-4xl mx-auto p-6">
        <div id="cv-content" ref={cvRef} className="bg-white rounded-lg shadow-2xl overflow-hidden">
          {/* Header del CV */}
          <div className="bg-gradient-to-r from-[#ff6600] to-[#ff1493] text-white p-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
                <img src="/images/jose-profile.jpg" alt="José Nieves" className="w-full h-full object-cover" />
              </div>
            </div>
            <h1 className="text-4xl font-bold mb-2">JOSÉ NIEVES</h1>
            <p className="text-xl opacity-90">Desarrollador Software</p>
            <div className="mt-4 flex justify-center space-x-6 text-sm">
              <span>qijoos3niievsik@gmail.com</span>
              <span>+58 412-4015063</span>
              <span>Venezuela, Edo. Aragua</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
            {/* Columna izquierda */}
            <div className="lg:col-span-1 bg-gray-50 p-6">
              {/* Contacto */}
              <div className="mb-8">
                <h3 className="text-lg font-bold text-[#ff6600] mb-4 border-b-2 border-[#ff6600] pb-2">
                  INFORMACIÓN PERSONAL
                </h3>
                <div className="space-y-3 text-sm text-gray-700">
                  <div>
                    <strong>Fecha de Nacimiento:</strong> 08/06/2000
                  </div>
                  <div>
                    <strong>Cédula:</strong> 27.262.539
                  </div>
                  <div>
                    <strong>LinkedIn:</strong> jose-nieves-sin-limites
                  </div>
                  <div>
                    <strong>Instagram:</strong> @josemind_win
                  </div>
                  <div>
                    <strong>Web:</strong> sinlimites-agency.online
                  </div>
                </div>
              </div>

              {/* Idiomas */}
              <div className="mb-8">
                <h3 className="text-lg font-bold text-[#ff6600] mb-4 border-b-2 border-[#ff6600] pb-2">IDIOMAS</h3>
                <div className="space-y-2 text-sm text-gray-700">
                  <div className="flex justify-between">
                    <span>Español</span>
                    <span className="font-semibold">Nativo</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Inglés</span>
                    <span className="font-semibold">Principiante</span>
                  </div>
                </div>
              </div>

              {/* Lenguajes */}
              <div className="mb-8">
                <h3 className="text-lg font-bold text-[#ff6600] mb-4 border-b-2 border-[#ff6600] pb-2">
                  LENGUAJES DE PROGRAMACIÓN
                </h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Python",
                    "PHP (Laravel)",
                    "ReactJS",
                    "TypeScript",
                    "JavaScript",
                    "ElectronJS",
                    "React Native",
                    "MQL4/MQL5",
                    "C/C#/C++",
                    "HTML",
                    "SQL",
                  ].map((lang, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-[#ff6600]/10 text-[#ff6600] text-xs rounded border border-[#ff6600]/30"
                    >
                      {lang}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bases de Datos */}
              <div className="mb-8">
                <h3 className="text-lg font-bold text-[#ff1493] mb-4 border-b-2 border-[#ff1493] pb-2">
                  BASES DE DATOS
                </h3>
                <div className="flex flex-wrap gap-2">
                  {["MySQL", "PostgreSQL"].map((db, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-[#ff1493]/10 text-[#ff1493] text-xs rounded border border-[#ff1493]/30"
                    >
                      {db}
                    </span>
                  ))}
                </div>
              </div>

              {/* Herramientas */}
              <div>
                <h3 className="text-lg font-bold text-[#ff6600] mb-4 border-b-2 border-[#ff6600] pb-2">HERRAMIENTAS</h3>
                <div className="space-y-1 text-sm text-gray-700">
                  {[
                    "Visual Studio Code",
                    "GitHub",
                    "API Telegram (Bot's)",
                    "API ChatGPT (IA)",
                    "OS Windows Server (VPS)",
                    "ArcGIS / QGIS",
                    "Excel",
                    "Word",
                    "Adobe Photoshop/Illustrator",
                    "Canva",
                    "Kali Linux OS",
                  ].map((tool, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-1 h-1 bg-[#ff6600] rounded-full"></div>
                      <span>{tool}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Columna derecha */}
            <div className="lg:col-span-2 p-6">
              {/* Sobre mí */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-[#ff6600] mb-4 border-b-2 border-[#ff6600] pb-2">SOBRE MÍ</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Con más de 5 años de experiencia en desarrollo web y móvil, me especializo en crear soluciones
                  tecnológicas innovadoras que impulsan el crecimiento de los negocios. Mi pasión es transformar ideas
                  complejas en productos digitales exitosos.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-gradient-to-r from-[#ff6600] to-[#ff1493] rounded-full"></div>
                    <span className="text-sm text-gray-600">Desarrollo Full Stack</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-gradient-to-r from-[#ff6600] to-[#ff1493] rounded-full"></div>
                    <span className="text-sm text-gray-600">Ciencia de Datos</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-gradient-to-r from-[#ff6600] to-[#ff1493] rounded-full"></div>
                    <span className="text-sm text-gray-600">Machine Learning</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-gradient-to-r from-[#ff6600] to-[#ff1493] rounded-full"></div>
                    <span className="text-sm text-gray-600">Sistemas GIS</span>
                  </div>
                </div>
              </div>

              {/* Experiencia */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-[#ff6600] mb-6 border-b-2 border-[#ff6600] pb-2">
                  EXPERIENCIA PROFESIONAL
                </h3>
                <div className="space-y-6">
                  {[
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
                      description:
                        "Desarrollo de software, análisis de datos y implementación de soluciones de ciencia de datos.",
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
                  ].map((exp, index) => (
                    <div key={index} className="border-l-4 border-[#ff6600] pl-4">
                      <h4 className="text-lg font-bold text-[#ff6600] mb-1">{exp.company}</h4>
                      <p className="font-semibold text-gray-800 mb-1">{exp.position}</p>
                      <div className="flex items-center space-x-4 text-xs text-gray-500 mb-2">
                        <span>📅 {exp.period}</span>
                        <span>📍 {exp.location}</span>
                      </div>
                      <p className="text-sm text-gray-600">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Educación */}
              <div>
                <h3 className="text-2xl font-bold text-[#ff1493] mb-6 border-b-2 border-[#ff1493] pb-2">EDUCACIÓN</h3>
                <div className="space-y-4">
                  {[
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
                  ].map((edu, index) => (
                    <div key={index} className="border-l-4 border-[#ff1493] pl-4">
                      <h4 className="text-lg font-bold text-[#ff1493] mb-1">{edu.degree}</h4>
                      <p className="font-semibold text-gray-800 mb-1">{edu.institution}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">📅 {edu.year}</span>
                        <span className="text-xs bg-[#ff1493]/10 text-[#ff1493] px-2 py-1 rounded">{edu.type}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
