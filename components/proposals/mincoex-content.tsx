import React from "react"

export function MincoexSummarySection(): React.ReactElement {
  return (
    <section className="bg-gradient-to-r from-blue-500/10 to-emerald-500/10 border border-blue-500/20 rounded-2xl p-5 md:p-6 mb-6 md:mb-8">
      <h2 className="text-lg md:text-xl font-semibold text-slate-900 mb-3">Resumen Ejecutivo</h2>
      <p className="text-slate-700 text-sm md:text-base leading-relaxed">
        Entregamos una landing page institucional moderna para el Ministerio del Comercio Exterior orientada exclusivamente a comunicar noticias y
        contenido informativo del ministerio. El sitio prioriza accesibilidad, seguridad y publicación ágil de boletines oficiales, integrando un CMS
        para que los equipos editoriales gestionen contenido sin depender de terceros.
      </p>
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm md:text-base text-slate-700">
        <div className="bg-white/70 border border-blue-500/30 rounded-xl p-3">
          <h4 className="font-semibold text-slate-900 mb-1">Objetivos de la plataforma</h4>
          <ul className="list-disc list-inside space-y-1">
            <li>Facilitar el acceso a normativas, enlaces a trámites y demás información del ministerio.</li>
            <li>Garantizar transparencia y confianza mediante información actualizada.</li>
          </ul>
        </div>
        <div className="bg-white/70 border border-blue-500/30 rounded-xl p-3">
          <h4 className="font-semibold text-slate-900 mb-1">Audiencias clave</h4>
          <ul className="list-disc list-inside space-y-1">
            <li>Empresas exportadoras e importadoras.</li>
            <li>Periodistas y entes públicos regionales.</li>
            <li>Ciudadanía interesada en políticas de comercio exterior.</li>
          </ul>
        </div>
      </div>
    </section>
  )
}

export function MincoexArchitectureSection(): React.ReactElement {
  return (
    <section className="bg-white border border-slate-200 rounded-2xl p-5 md:p-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 mb-4">
        <h3 className="text-base md:text-lg font-semibold text-slate-900">1. Arquitectura Tecnológica</h3>
        <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs sm:text-sm font-medium">Next.js 15 + Ghost CMS + Hosting estatal</span>
      </div>
      <div className="space-y-5 text-sm md:text-base text-slate-700">
        <div>
          <h4 className="font-semibold text-slate-900 mb-2">Frontend gubernamental responsivo</h4>
          <ul className="list-disc list-inside space-y-1">
            <li>Next.js 15 y React 19 con renderizado híbrido (SSG + ISR) para tiempos de carga mínimos.</li>
            <li>TailwindCSS y componentes accesibles (niveles AA) con tipografías institucionales.</li>
            <li>Estrategia de microinteracciones sobrias y jerarquía clara para noticias y comunicados.</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-slate-900 mb-2">Gestión editorial con Ghost</h4>
          <ul className="list-disc list-inside space-y-1">
            <li>Panel administrativo amigable para publicar boletines, galerías y páginas temáticas.</li>
            <li>Control de roles y permisos para periodistas, coordinadores y administradores.</li>
            <li>API Content con autenticación para sincronizar datos con la landing en minutos.</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-slate-900 mb-2">Modelo de despliegue</h4>
          <ul className="list-disc list-inside space-y-1">
            <li>Infraestructura preparada para replicarse en servidores ministeriales (Docker o hosting estático).</li>
            <li>Proxy inverso en cPanel u otro gateway institucional para apuntar dominio oficial.</li>
            <li>Métricas y monitoreo básico (Uptime Kuma / Vercel Analytics) para seguimiento operativo.</li>
          </ul>
        </div>
      </div>
    </section>
  )
}

export function MincoexContentSection(): React.ReactElement {
  return (
    <section className="bg-slate-50 border border-slate-200 rounded-2xl p-5 md:p-6">
      <h3 className="text-base md:text-lg font-semibold text-slate-900 mb-4">2. Estructura de Contenidos</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm md:text-base text-slate-700">
        <div className="bg-white p-4 rounded-xl">
          <h4 className="font-semibold text-slate-900 mb-2">Home informativa</h4>
          <ul className="list-disc list-inside space-y-1">
            <li>Hero con banner institucional y CTA a comunicados recientes.</li>
            <li>Módulo de titulares dinámicos y filtros por categoría (noticias, normativa, comunicados).</li>
            <li>Bloques de indicadores clave y enlaces a programas de exportación/importación.</li>
          </ul>
        </div>
        <div className="bg-white p-4 rounded-xl">
          <h4 className="font-semibold text-slate-900 mb-2">Secciones complementarias</h4>
          <ul className="list-disc list-inside space-y-1">
            <li>Repositorio de comunicados oficiales y publicaciones normativas en PDF.</li>
            <li>Repositorio de comunicados oficiales y publicaciones normativas en PDF.</li>
            <li>Directorio de entes adscritos con contactos y enlaces externos.</li>
          </ul>
        </div>
      </div>
    </section>
  )
}

export function MincoexImplementationSection(): React.ReactElement {
  return (
    <section className="bg-white border border-slate-200 rounded-2xl p-5 md:p-6">
      <h3 className="text-base md:text-lg font-semibold text-slate-900 mb-4">3. Implementación y Entregables Técnicos</h3>
      <div className="bg-slate-50 p-4 rounded-xl text-sm md:text-base text-slate-700 space-y-2">
        <p>El proyecto se ejecutó en un ciclo de cuatro semanas:</p>
        <ol className="list-decimal list-inside space-y-1">
          <li><strong>Descubrimiento &amp; arquitectura de información:</strong> se realizaron entrevistas con las direcciones del ministerio y se definió el mapa de contenidos.</li>
          <li><strong>UI/UX institucional:</strong> se aprobaron prototipos en Figma, sistema de componentes y lineamientos de marca.</li>
          <li><strong>Desarrollo y carga de contenido:</strong> se integró Ghost, se migraron noticias piloto y se ejecutaron pruebas de accesibilidad.</li>
          <li><strong>Capacitación &amp; traspaso:</strong> se entregaron credenciales y se acompañó el despliegue provisional.</li>
        </ol>
        <p>Se entregó documentación técnica y scripts para réplica en la infraestructura del Estado.</p>
      </div>
    </section>
  )
}

export function MincoexInvestmentSection(): React.ReactElement {
  return (
    <section className="bg-gradient-to-r from-blue-500/10 to-emerald-500/10 border border-blue-500/20 rounded-2xl p-5 md:p-6">
      <h3 className="text-base md:text-lg font-semibold text-slate-900 mb-4">4. Inversión &amp; Alcance Económico</h3>
      <div className="flex flex-col lg:flex-row gap-4 text-sm md:text-base text-slate-700">
        <div className="flex-1 bg-white rounded-xl p-4 border border-slate-200 space-y-3">
          <div>
            <p className="text-xs uppercase tracking-wide text-blue-600">Monto fijo del proyecto</p>
            <p className="text-3xl font-bold text-blue-700">USD 600,00</p>
            <p className="text-xs text-slate-500">Equivalente en bolívares al tipo de cambio oficial BCV del día de pago.</p>
          </div>
          <div className="bg-slate-50 rounded-lg p-3 space-y-1">
            <p className="text-xs uppercase tracking-wide text-slate-500">Incluye</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Diseño y desarrollo de la landing page institucional.</li>
              <li>Entrega de credenciales administrativas y configuración del CMS.</li>
              <li>Documentación técnica y guías para los equipos internos.</li>
            </ul>
          </div>
        </div>
        <div className="flex-1 bg-white rounded-xl p-4 border border-slate-200 space-y-3">
          <div className="bg-slate-50 rounded-lg p-3 space-y-1">
            <p className="text-xs uppercase tracking-wide text-slate-500">Acompañamiento garantizado</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Sesiones remotas para migrar la plataforma a servidores provisionales del ministerio.</li>
              <li>Soporte durante la primera publicación oficial y validación de DNS.</li>
              <li>Capacitación a voceros designados para redactar y programar noticias.</li>
            </ul>
          </div>
          <div className="bg-white border border-slate-200 rounded-lg p-3">
            <p className="text-xs uppercase tracking-wide text-slate-500">Condiciones de pago</p>
            <p>50% a la aprobación de prototipos, 50% al entregar el sistema operativo y credenciales. Transferible en USD o Bs vía Tesoro/BCV.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export function MincoexSupportSection(): React.ReactElement {
  return (
    <section className="bg-white border border-slate-200 rounded-2xl p-5 md:p-6">
      <h3 className="text-base md:text-lg font-semibold text-slate-900 mb-4">5. Entregables Complementarios &amp; Soporte</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm md:text-base text-slate-700">
        <div className="bg-slate-50 p-4 rounded-xl">
          <h4 className="font-semibold text-slate-900 mb-2">Materiales entregados</h4>
          <ul className="list-disc list-inside space-y-1">
            <li>Repositorio Git con código fuente y guías de despliegue.</li>
            <li>Backup inicial de contenidos y plan de continuidad.</li>
          </ul>
        </div>
        <div className="bg-slate-50 p-4 rounded-xl">
          <h4 className="font-semibold text-slate-900 mb-2">Soporte posterior</h4>
          <ul className="list-disc list-inside space-y-1">
            <li>Opciones de contrato de mantenimiento anual (opcional).</li>
          </ul>
        </div>
      </div>
    </section>
  )
}

export function MincoexEnhancementsSection(): React.ReactElement {
  return (
    <section className="bg-gradient-to-r from-emerald-500/10 via-blue-500/10 to-emerald-500/10 border border-emerald-500/20 rounded-2xl p-5 md:p-6">
      <h3 className="text-base md:text-lg font-semibold text-slate-900 mb-4">6. Integraciones propuestas (opcional)</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm md:text-base text-slate-700">
        <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2">
          <h4 className="font-semibold text-slate-900">Chatbot IA para exportadores</h4>
          <p>
            Asistente conversacional basado en Chat GPT-5 (low reasoning) entrenado con preguntas frecuentes de exportación no petrolera,
            requisitos de trámites y pasos para gestionar permisos. Incluye roadmap interactivo y base documental para funcionarios y empresarios,
            con capacidad de cubrir hasta 20.000 interacciones completas (pregunta + respuesta).
          </p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2">
          <h4 className="font-semibold text-slate-900">Automatización de resúmenes en video</h4>
          <p>
            Pipeline que genera clips para Instagram a partir de noticias destacadas, alimentando la sección “Resúmenes en Videos” de forma continua
            sin intervención manual.
          </p>
        </div>
      </div>
      <div className="mt-4 bg-white border border-slate-200 rounded-xl p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-wide text-emerald-600">Inversión estimada</p>
          <p className="text-2xl font-bold text-emerald-700">USD 1.499,99</p>
          <p className="text-xs text-slate-500">Entrega en 5 días hábiles posteriores a la aprobación.</p>
        </div>
        <div className="text-sm md:text-base text-slate-700">
          <p>Incluye configuración, pruebas y documentación para operar ambos módulos dentro de la infraestructura ministerial.</p>
        </div>
      </div>
    </section>
  )
}
