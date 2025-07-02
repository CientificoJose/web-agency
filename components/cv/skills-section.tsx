import { Code, Database, Wrench } from "lucide-react"

export default function SkillsSection() {
  const languages = [
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
  ]

  const databases = ["MySQL", "PostgreSQL"]

  const tools = [
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
  ]

  return (
    <div className="cv-card p-6 rounded-lg shadow-xl border cv-border">
      <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-[#ff6600] to-[#ff1493] bg-clip-text text-transparent">
        HABILIDADES
      </h2>

      {/* Lenguajes */}
      <div className="mb-6">
        <div className="flex items-center mb-3">
          <Code className="w-5 h-5 text-[#ff6600] mr-2" />
          <h3 className="text-lg font-semibold cv-text-primary">Lenguajes</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {languages.map((lang, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-gradient-to-r from-[#ff6600]/20 to-[#ff1493]/20 text-xs cv-text-secondary rounded-full border border-[#ff6600]/30"
            >
              {lang}
            </span>
          ))}
        </div>
      </div>

      {/* Bases de Datos */}
      <div className="mb-6">
        <div className="flex items-center mb-3">
          <Database className="w-5 h-5 text-[#ff1493] mr-2" />
          <h3 className="text-lg font-semibold cv-text-primary">Bases de Datos</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {databases.map((db, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-gradient-to-r from-[#ff1493]/20 to-[#ff6600]/20 text-xs cv-text-secondary rounded-full border border-[#ff1493]/30"
            >
              {db}
            </span>
          ))}
        </div>
      </div>

      {/* Herramientas */}
      <div>
        <div className="flex items-center mb-3">
          <Wrench className="w-5 h-5 text-[#ff6600] mr-2" />
          <h3 className="text-lg font-semibold cv-text-primary">Herramientas</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {tools.map((tool, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-gradient-to-r from-[#ff6600]/20 to-[#ff1493]/20 text-xs cv-text-secondary rounded-full border border-[#ff6600]/30"
            >
              {tool}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
