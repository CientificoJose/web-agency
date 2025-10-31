"use client"

import { useEffect } from "react"
import Image from "next/image"

export default function ValentinaAlvarezProposalPage() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0 })
    }
  }, [])

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="bg-gray-100 flex justify-center items-start md:items-center p-0 md:p-4 print:p-0 font-sans min-h-screen">
      <button
        onClick={handlePrint}
        className="no-print fixed top-4 right-4 bg-primary text-white px-4 py-2 md:px-6 md:py-3 rounded-full shadow-lg hover:bg-primary-dark transition-all transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 z-50 text-sm md:text-base"
      >
        Imprimir
      </button>

      <div className="a4-container w-full md:w-[210mm] md:min-h-[297mm] bg-white md:shadow-xl relative overflow-hidden p-4 sm:p-6 md:p-[25mm] print:shadow-none print:p-[25mm]">
        {/* Watermark */}
        <div className="watermark absolute inset-0 opacity-10 -z-10"></div>

        {/* Header */}
        <div className="text-center pb-5 border-b-2 border-primary mb-6 md:mb-8 w-full">
          <Image src="/recurso.png" alt="Logo Sin Limites" width={128} height={128} className="w-24 md:w-32 mb-2 mx-auto" />
          <h1 className="text-xl md:text-2xl font-bold text-dark">Sin Limites</h1>
          <h2 className="text-base md:text-lg text-primary">Propuesta Digital</h2>
        </div>

        {/* Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 mb-6 md:mb-8">
          <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-primary">
            <h3 className="font-semibold text-dark mb-2 text-base md:text-lg">Consultor Digital</h3>
            <p className="text-gray-700 text-sm md:text-base">José Nieves</p>
            <p className="text-gray-700 text-sm md:text-base">+58 424 360 3846</p>
            <p className="text-gray-700 text-sm md:text-base">contact@sinlimites-agency.online</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-primary">
            <h3 className="font-semibold text-dark mb-2 text-base md:text-lg">Cliente</h3>
            <p className="text-gray-700 text-sm md:text-base">Valentina Álvarez</p>
            <p className="text-gray-700 text-sm md:text-base">Liz Spa Center</p>
            <p className="text-gray-700 text-sm md:text-base">Fecha: 10 de octubre de 2025</p>
          </div>
        </div>

        {/* Introducción */}
        <div className="bg-gradient-to-r from-[#ff6600]/10 to-[#ff1493]/10 border border-primary/20 rounded-2xl p-5 md:p-6 mb-6 md:mb-8">
          <h2 className="text-lg md:text-xl font-semibold text-dark mb-3">Resumen Ejecutivo</h2>
          <p className="text-gray-700 text-sm md:text-base leading-relaxed">
            El objetivo de esta propuesta es ejecutar el rebranding completo del sitio web de Liz Spa Center, trasladando la identidad visual
            renovada a una experiencia digital moderna, intuitiva y orientada a la conversión. Mantendremos la estructura y contenidos
            actuales, reforzando la narrativa de bienestar premium, optimizando el flujo de reservas en línea y asegurando una presentación
            consistente en todos los dispositivos.
          </p>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm md:text-base text-gray-700">
            <div className="bg-white/60 border border-primary/20 rounded-xl p-3">
              <h4 className="font-semibold text-dark mb-1">Sitio actual a modernizar</h4>
              <a
                href="https://lizspacenter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline break-all"
              >
                https://lizspacenter.com
              </a>
            </div>
            <div className="bg-white/60 border border-primary/20 rounded-xl p-3">
              <h4 className="font-semibold text-dark mb-1">Referencia visual solicitada</h4>
              <a
                href="https://firstbodywellnesscenter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline break-all"
              >
                https://firstbodywellnesscenter.com
              </a>
            </div>
          </div>
        </div>

        <div className="space-y-6 md:space-y-8">
          {/* Alcance */}
          <section className="bg-gray-50 rounded-2xl p-5 md:p-6">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 mb-4">
              <h3 className="text-base md:text-lg font-semibold text-dark">1. Alcance y Arquitectura del Sitio</h3>
              <span className="bg-primary text-white px-3 py-1 rounded-full text-xs sm:text-sm font-medium">Estructura existente + nuevo look & feel</span>
            </div>
            <div className="space-y-5 text-sm md:text-base text-gray-700">
              <div>
                <h4 className="font-semibold text-dark mb-2">🏠 Página de Inicio</h4>
                <ul className="list-disc list-inside space-y-1">
                  <li>Hero con fotografía protagonista y promoción destacada.</li>
                  <li>Introducción cálida al spa y su filosofía de cuidado integral.</li>
                  <li>Accesos directos a categorías clave: Cuidado de la piel, Depilación Láser, Masajes terapéuticos y más.</li>
                  <li>Opiniones verificadas de Google para reforzar confianza.</li>
                  <li>Bloque informativo con dirección, horarios, teléfono y CTA de reserva.</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-dark mb-2">👩‍⚕️ Sobre Nosotras</h4>
                <ul className="list-disc list-inside space-y-1">
                  <li>Presentación del equipo profesional con fotografía, rol y especialidad.</li>
                  <li>Galería de instalaciones con fotografías de alta calidad y descripciones breves.</li>
                  <li>Sección de valores y diferenciadores de la experiencia Liz Spa Center.</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-dark mb-2">📋 Catálogo de Servicios</h4>
                <ul className="list-disc list-inside space-y-1">
                  <li>Listado organizado por categorías con descripción, beneficios y tiempos estimados.</li>
                  <li>Botón directo "Agendar en Vagaro" para cada tratamiento.</li>
                  <li>Sugerencias de combos o promociones activas.</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-dark mb-2">📞 Contacto y Reservaciones</h4>
                <ul className="list-disc list-inside space-y-1">
                  <li>Ficha completa con datos de contacto, mapa interactivo y horarios.</li>
                  <li>Formulario de consultas personalizado con reCAPTCHA.</li>
                  <li>Link fijo a WhatsApp Business para atención inmediata.</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-dark mb-2">🔗 Elementos Fijos</h4>
                <ul className="list-disc list-inside space-y-1">
                  <li>Menú principal siempre visible con navegación clara.</li>
                  <li>Botón "Agendar Cita" flotante y accesible en toda la navegación.</li>
                  <li>Footer completo con redes sociales, datos de contacto y enlaces legales.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Branding */}
          <section className="bg-white border border-gray-200 rounded-2xl p-5 md:p-6">
            <h3 className="text-base md:text-lg font-semibold text-dark mb-4">2. Identidad Visual y Experiencia de Usuario</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm md:text-base text-gray-700">
              <div className="bg-gray-50 p-4 rounded-xl">
                <h4 className="font-semibold text-dark mb-2">Nuevo Branding</h4>
                <ul className="list-disc list-inside space-y-1">
                  <li>Integración del nuevo logo y paleta cromática proporcionada por el cliente.</li>
                  <li>Sistema tipográfico armonizado con la marca y legibilidad web.</li>
                  <li>Componentes UI consistentes: botones, iconografía, badges y tarjetas.</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl">
                <h4 className="font-semibold text-dark mb-2">UX & Accesibilidad</h4>
                <ul className="list-disc list-inside space-y-1">
                  <li>Diseño mobile-first con revisiones para tablet y desktop.</li>
                  <li>Contrastes y jerarquías tipográficas alineadas a WCAG AA.</li>
                  <li>Microinteracciones cuidadas en botones y llamadas a la acción.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Proceso */}
          <section className="bg-white border border-gray-200 rounded-2xl p-5 md:p-6">
            <h3 className="text-base md:text-lg font-semibold text-dark mb-4">3. Proceso de Trabajo y Cronograma</h3>
            <div className="bg-gray-50 p-4 rounded-xl text-sm md:text-base text-gray-700">
              <h4 className="font-semibold text-dark mb-2">Fases del Proyecto (inicio inmediato, cierre 31 de octubre)</h4>
              <ul className="list-disc list-inside space-y-1">
                <li><strong>Descubrimiento:</strong> recopilación de branding definitivo, revisión del sitio actual y definición de prioridades UX.</li>
                <li><strong>Dirección de Arte:</strong> traducción del rebranding a layout web, moodboard y lineamientos visuales.</li>
                <li><strong>Implementación:</strong> desarrollo responsive, integración de reservas, testimonios y optimizaciones de performance.</li>
                <li><strong>Go Live:</strong> QA integral, carga de contenido final y checklist previo al lanzamiento.</li>
              </ul>
              <p className="mt-4 text-sm md:text-base text-gray-600">Contamos con 16 días hábiles desde el 10 hasta el 31 de octubre de 2025 para completar el proyecto dentro del cronograma previsto.</p>
            </div>
          </section>

          {/* Inversión */}
          <section className="bg-gradient-to-r from-[#ff6600]/10 to-[#ff1493]/10 border border-primary/20 rounded-2xl p-5 md:p-6">
            <h3 className="text-base md:text-lg font-semibold text-dark mb-4">4. Inversión y Condiciones</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm md:text-base text-gray-700">
              <div className="bg-white rounded-xl p-4 border border-gray-200">
                <h4 className="font-semibold text-dark mb-2">Inversión Total</h4>
                <p className="text-3xl md:text-4xl font-bold text-primary mb-2">USD 289,99</p>
                <p>Incluye rediseño UI, desarrollo front-end, integraciones y despliegue.</p>
                <p className="mt-2 text-sm md:text-base text-gray-600">Valor válido hasta el domingo 12 de octubre de 2025. A partir del 13 de octubre se aplicará una nueva cotización.</p>
              </div>
              <div className="bg-white rounded-xl p-4 border border-gray-200">
                <h4 className="font-semibold text-dark mb-2">Condiciones</h4>
                <ul className="list-disc list-inside space-y-1">
                  <li>50% de anticipo para iniciar, 50% al entregar la versión final aprobada.</li>
                  <li>Pagos vía USDT (Binance) bajo modalidad transferencia directa.</li>
                  <li>Dominio, hosting y herramientas de terceros no incluidos (se mantienen los servicios actuales de Liz Spa Center).</li>
                  <li>Ajustes fuera de alcance se cotizan por separado.</li>
                </ul>
              </div>
            </div>
          </section>
        </div>

        {/* Cierre */}
        <div className="mt-8 md:mt-10 bg-gray-900 text-white rounded-2xl p-5 md:p-6 text-center">
          <h3 className="text-lg md:text-xl font-semibold mb-3">Próximos Pasos</h3>
          <p className="text-sm md:text-base text-gray-200 mb-5">
            Una vez confirmada la propuesta iniciaremos la fase de descubrimiento para recibir el branding definitivo, accesos y
            lineamientos. A partir de allí avanzamos con Figma y entregamos un prototipo navegable para su validación.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="https://wa.me/584243603846?text=Hola%20Jose,%20acepto%20la%20propuesta%20de%20rebranding%20web."
              className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-white text-gray-900 font-semibold shadow-lg hover:shadow-xl transition"
            >
              Confirmar por WhatsApp
            </a>
            <a
              href="mailto:contact@sinlimites-agency.online?subject=Propuesta%20Rebranding%20Liz%20Spa%20Center&body=Hola%20José,%20vamos%20adelante%20con%20la%20propuesta."
              className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-primary text-white font-semibold hover:bg-primary-dark transition"
            >
              Aceptar por Email
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
