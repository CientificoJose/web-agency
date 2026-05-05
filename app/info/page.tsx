"use client"

import { useState } from "react"
import Image from "next/image"
import { 
  AlertCircle, 
  ChevronRight, 
  ShieldAlert, 
  CheckCircle2, 
  Languages, 
  Maximize2, 
  X,
  ExternalLink,
  ZoomIn,
  ZoomOut
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function CloudflareInfoPage() {
  const [lang, setLang] = useState<"es" | "en">("en")
  const [zoomedImage, setZoomedImage] = useState<string | null>(null)
  const [zoomScale, setZoomScale] = useState(1)

  const content = {
    es: {
      title: "Guía de Configuración Cloudflare",
      subtitle: "Dominio: euforiacafe.com",
      warningTitle: "Advertencia Crítica",
      warningText: "No edite, modifique ni elimine ninguno de los registros DNS ya preestablecidos. Cualquier cambio no autorizado puede interrumpir los servicios de correo corporativo y el acceso al sitio web.",
      successMsg: "¡Proceso Completado con Éxito!",
      footer: "Sin Límites Agency. Todos los derechos reservados.",
      steps: [
        {
          title: "1. Recepción de la Invitación",
          description: "Recibirá un correo electrónico de Cloudflare indicando que se le ha invitado a unirse a una cuenta. Haga clic en el enlace de aceptación proporcionado en el mensaje.",
          image: "/info/paso 1.png",
        },
        {
          title: "2. Inicio de Sesión / Creación de Cuenta",
          description: "Si ya tiene una cuenta de Cloudflare, inicie sesión con sus credenciales. De lo contrario, deberá crear una cuenta nueva para proceder.",
          image: "/info/paso 2.png",
        },
        {
          title: "3. Confirmación de Acceso",
          description: "Una vez dentro de su cuenta, verá la solicitud de acceso pendiente. Proceda a confirmar la aceptación para vincular el dominio a su panel de gestión.",
          image: "/info/paso 3.png",
        },
        {
          title: "4. Selección del Dominio",
          description: "En su lista de sitios o cuentas, seleccione la correspondiente a euforiacafe.com para acceder a sus configuraciones específicas.",
          image: "/info/paso 4.png",
        },
        {
          title: "5. Navegación a la sección DNS",
          description: "En el menú lateral izquierdo, busque y haga clic en la sección 'DNS' y luego en 'Records' (Registros).",
          image: "/info/paso 5.png",
        },
        {
          title: "6. Verificación de Registros Existentes",
          description: "Aquí podrá visualizar los registros actuales (A, CNAME, MX, TXT). Verifique que todos los servicios estén configurados correctamente.",
          image: "/info/paso 6.png",
        },
        {
          title: "7. Configuración Finalizada",
          description: "Llegado a este punto, usted ya tiene acceso total para monitorear el estado del dominio. Recuerde mantener la integridad de los registros existentes.",
          image: "/info/paso 7.png",
        },
      ]
    },
    en: {
      title: "Cloudflare Configuration Guide",
      subtitle: "Domain: euforiacafe.com",
      warningTitle: "Critical Warning",
      warningText: "Do not edit, modify, or delete any of the pre-established DNS records. Any unauthorized change may interrupt corporate email services and website access.",
      successMsg: "Process Successfully Completed!",
      footer: "Sin Límites Agency. All rights reserved.",
      steps: [
        {
          title: "1. Receiving the Invitation",
          description: "You will receive an email from Cloudflare indicating that you have been invited to join an account. Click the acceptance link provided in the message.",
          image: "/info/paso 1.png",
        },
        {
          title: "2. Login / Account Creation",
          description: "If you already have a Cloudflare account, log in with your credentials. Otherwise, you must create a new account to proceed.",
          image: "/info/paso 2.png",
        },
        {
          title: "3. Access Confirmation",
          description: "Once inside your account, you will see the pending access request. Proceed to confirm acceptance to link the domain to your management panel.",
          image: "/info/paso 3.png",
        },
        {
          title: "4. Domain Selection",
          description: "In your list of sites or accounts, select the one corresponding to euforiacafe.com to access its specific settings.",
          image: "/info/paso 4.png",
        },
        {
          title: "5. Navigate to DNS Section",
          description: "In the left side menu, look for and click on the 'DNS' section and then 'Records'.",
          image: "/info/paso 5.png",
        },
        {
          title: "6. Verification of Existing Records",
          description: "Here you can view the current records (A, CNAME, MX, TXT). Verify that all services are correctly configured.",
          image: "/info/paso 6.png",
        },
        {
          title: "7. Setup Completed",
          description: "At this point, you already have full access to monitor the status of the domain. Remember to maintain the integrity of existing records.",
          image: "/info/paso 7.png",
        },
      ]
    }
  }

  const current = content[lang]

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 font-sans transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        
        {/* Language Switcher */}
        <div className="flex justify-end mb-8">
          <button
            onClick={() => setLang(lang === "es" ? "en" : "es")}
            className="flex items-center gap-2 bg-white border border-slate-200 px-4 py-2 rounded-full shadow-sm hover:bg-slate-50 transition-all font-medium text-slate-700"
          >
            <Languages className="h-4 w-4 text-primary" />
            {lang === "es" ? "English Version" : "Versión en Español"}
          </button>
        </div>

        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">
            {current.title}
          </h1>
          <p className="text-xl text-slate-600 font-medium">
            {current.subtitle}
          </p>
        </motion.div>

        {/* Warning Alert */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-12 bg-red-50 border-l-8 border-red-500 p-8 rounded-r-2xl shadow-lg ring-1 ring-red-200"
        >
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <ShieldAlert className="h-8 w-8 text-red-500" />
            </div>
            <div className="ml-5">
              <h3 className="text-xl font-black text-red-800 uppercase tracking-widest">
                {current.warningTitle}
              </h3>
              <p className="mt-3 text-red-700 text-lg leading-relaxed font-semibold">
                {current.warningText}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Steps Grid */}
        <div className="space-y-20">
          {current.steps.map((step, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative bg-white rounded-[2rem] shadow-2xl shadow-slate-200/50 overflow-hidden border border-slate-100 transition-all"
            >
              <div className="p-8 md:p-14">
                <div className="flex items-center gap-4 mb-8">
                  <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-primary text-white font-black text-xl shadow-lg shadow-primary/30">
                    {index + 1}
                  </div>
                  <h2 className="text-3xl font-black text-slate-900 tracking-tight">{step.title}</h2>
                </div>
                
                <p className="text-slate-600 text-xl leading-relaxed mb-10 font-medium">
                  {step.description}
                </p>

                <div className="relative group cursor-zoom-in" onClick={() => setZoomedImage(step.image)}>
                  <div className="absolute -inset-2 bg-gradient-to-r from-primary to-blue-500 rounded-[1.5rem] blur opacity-0 group-hover:opacity-30 transition duration-500"></div>
                  <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-inner">
                    <Image
                      src={step.image}
                      alt={step.title}
                      width={1200}
                      height={800}
                      className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      priority={index < 2}
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500 flex items-center justify-center">
                      <div className="bg-white/90 backdrop-blur-sm p-4 rounded-full shadow-2xl opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                        <Maximize2 className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step completion indicator for the last step */}
              {index === current.steps.length - 1 && (
                <div className="bg-emerald-500 p-8 flex items-center justify-center gap-4">
                  <CheckCircle2 className="h-8 w-8 text-white" />
                  <span className="text-white font-black text-2xl uppercase tracking-wider">{current.successMsg}</span>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Footer info */}
        <div className="mt-24 text-center pb-12">
          <p className="text-slate-400 font-bold tracking-tight">
            &copy; {new Date().getFullYear()} {current.footer}
          </p>
        </div>
      </div>

      {/* Image Zoom Modal */}
      <AnimatePresence>
        {zoomedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/95 backdrop-blur-md"
          >
            <div className="absolute top-0 right-0 m-6 flex gap-4 z-[60]">
              <div className="bg-white/10 backdrop-blur-md rounded-full p-2 flex gap-2 border border-white/10">
                <button 
                  onClick={(e) => { e.stopPropagation(); setZoomScale(prev => Math.max(1, prev - 0.5)) }}
                  className="p-2 hover:bg-white/10 rounded-full text-white transition-colors"
                  title="Zoom Out"
                >
                  <ZoomOut className="h-6 w-6" />
                </button>
                <div className="w-px bg-white/10 my-1" />
                <button 
                  onClick={(e) => { e.stopPropagation(); setZoomScale(prev => Math.min(4, prev + 0.5)) }}
                  className="p-2 hover:bg-white/10 rounded-full text-white transition-colors"
                  title="Zoom In"
                >
                  <ZoomIn className="h-6 w-6" />
                </button>
              </div>
              <button 
                className="bg-white/10 hover:bg-white/20 p-4 rounded-full text-white transition-colors border border-white/10"
                onClick={() => { setZoomedImage(null); setZoomScale(1) }}
              >
                <X className="h-8 w-8" />
              </button>
            </div>

            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full h-full flex items-center justify-center overflow-hidden cursor-grab active:cursor-grabbing"
              onClick={() => { setZoomedImage(null); setZoomScale(1) }}
            >
              <motion.div 
                animate={{ scale: zoomScale }}
                drag={zoomScale > 1}
                dragConstraints={{ left: -500 * (zoomScale - 1), right: 500 * (zoomScale - 1), top: -300 * (zoomScale - 1), bottom: 300 * (zoomScale - 1) }}
                className="relative w-4/5 h-4/5"
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src={zoomedImage}
                  alt="Zoomed step"
                  fill
                  className="object-contain"
                  quality={100}
                />
              </motion.div>
            </motion.div>
            
            {/* Zoom Indicator */}
            {zoomScale > 1 && (
              <div className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-md px-6 py-2 rounded-full text-white font-bold border border-white/10">
                {Math.round(zoomScale * 100)}%
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@100;400;700;900&display=swap');
        body {
          font-family: 'Outfit', sans-serif;
        }
      `}</style>
    </div>
  )
}
