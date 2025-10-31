import React from "react"

const PLAN_DATA = [
  {
    id: "standard",
    deliveryLabel: "Entrega en 25 días hábiles",
    price: 289.99,
    durationDetail: "Calendario estándar con iteraciones semanales",
    note: "Ideal para validar narrativa y piezas creativas con comodidad antes del lanzamiento.",
  },
  {
    id: "priority",
    deliveryLabel: "Entrega prioritaria en 15 días hábiles",
    price: 349.99,
    durationDetail: "Sprints focalizados con checkpoints cada 3 días",
    note: "Perfecto cuando necesitas salir antes de una campaña o colaboración ya calendarizada.",
  },
  {
    id: "express",
    deliveryLabel: "Entrega express en 10 días hábiles",
    price: 449,
    durationDetail: "Trabajo en células diarias con aprobación continua",
    note: "Pensado para ventanas ultra rápidas o coberturas que requieren presencia digital inmediata.",
  },
] as const

export function TupacSummarySection(): React.ReactElement {
  return (
    <div className="bg-gradient-to-r from-[#ff6600]/10 to-[#ff1493]/10 border border-primary/20 rounded-2xl p-5 md:p-6 mb-6 md:mb-8">
      <h2 className="text-lg md:text-xl font-semibold text-dark mb-3">Resumen Ejecutivo</h2>
      <p className="text-gray-700 text-sm md:text-base leading-relaxed">
        Diseñaremos y desarrollaremos una landing page premium que concentre la esencia de tu marca personal: trayectoria artística, proyectos
        audiovisuales y servicios profesionales disponibles. El sitio se enfocará en posicionarte como aliado estratégico en producción, dirección
        creativa y gestión de comunidades, integrando piezas de portafolio, tabla de servicios y un flujo de contacto contractual que facilite cerrar
        acuerdos con nuevos clientes.
      </p>
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm md:text-base text-gray-700">
        <div className="bg-white/60 border border-primary/20 rounded-xl p-3">
          <h4 className="font-semibold text-dark mb-1">Puntos de partida</h4>
          <ul className="list-disc list-inside space-y-1">
            <li>Marca personal con presencia constante en redes sociales y comunidad activa.</li>
            <li>Producciones audiovisuales de alto impacto sin un contenedor centralizado.</li>
            <li>Servicios comercializados de forma independiente sin proceso contractual homogéneo.</li>
          </ul>
        </div>
        <div className="bg-white/60 border border-primary/20 rounded-xl p-3">
          <h4 className="font-semibold text-dark mb-1">Objetivos clave</h4>
          <ul className="list-disc list-inside space-y-1">
            <li>Centralizar tu historia, visión y propuesta de valor en un storytelling envolvente.</li>
            <li>Exhibir portafolio dinámico con filtros por disciplina (filmmaker, community, diseño).</li>
            <li>Disponer de contratos listos para firma y onboarding de nuevos clientes.</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export function TupacArchitectureSection(): React.ReactElement {
  return (
    <section className="bg-gray-50 rounded-2xl p-5 md:p-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 mb-4">
        <h3 className="text-base md:text-lg font-semibold text-dark">1. Arquitectura Estratégica</h3>
        <span className="bg-primary text-white px-3 py-1 rounded-full text-xs sm:text-sm font-medium">Landing modular con microinteracciones</span>
      </div>
      <div className="space-y-5 text-sm md:text-base text-gray-700">
        <div>
          <h4 className="font-semibold text-dark mb-2">🎬 Hero Narrativo</h4>
          <ul className="list-disc list-inside space-y-1">
            <li>Video loop o cinemagraph con manifiesto personal y CTA directo a “Trabajemos juntos”.</li>
            <li>Contador de hitos: campañas, producciones destacadas y comunidades gestionadas.</li>
            <li>Accesos rápidos a portafolio, servicios y contacto contractual.</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-dark mb-2">📂 Portafolio Curado</h4>
          <ul className="list-disc list-inside space-y-1">
            <li>Casos héroes con narrativa reto → proceso → impacto en formato multimedia.</li>
            <li>Galerías segmentadas por disciplina y tipo de cliente (industria musical, marcas de lifestyle, eventos).</li>
            <li>Testimonios en video y quotes dinámicas de colaboraciones clave.</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-dark mb-2">🧠 ADN &amp; Experiencia</h4>
          <ul className="list-disc list-inside space-y-1">
            <li>Timeline interactivo con hitos profesionales y evolución de la marca personal.</li>
            <li>Valores y promesa de servicio orientados a resultados medibles y experiencias memorables.</li>
            <li>Detalle de disciplinas: dirección creativa, filmmaking, community management y diseño.</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-dark mb-2">🤝 Contratación &amp; Booking</h4>
          <ul className="list-disc list-inside space-y-1">
            <li>Formularios diferenciados por servicio con términos y condiciones visibles.</li>
            <li>Integración de calendario para reservas y sesiones de discovery.</li>
            <li>Generación automática de propuesta/contrato PDF para cada cliente.</li>
          </ul>
        </div>
      </div>
    </section>
  )
}

export function TupacIdentitySection(): React.ReactElement {
  return (
    <section className="bg-white border border-gray-200 rounded-2xl p-5 md:p-6">
      <h3 className="text-base md:text-lg font-semibold text-dark mb-4">2. Identidad Visual &amp; Experiencia de Marca</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm md:text-base text-gray-700">
        <div className="bg-gray-50 p-4 rounded-xl">
          <h4 className="font-semibold text-dark mb-2">Dirección de Arte</h4>
          <ul className="list-disc list-inside space-y-1">
            <li>Fusión entre estética urbana premium y acentos cromáticos eléctricos.</li>
            <li>Tipografía display con personalidad + soporte sans para lecturas largas.</li>
            <li>Componentes con efectos de luz, glitch y glassmorphism controlado.</li>
          </ul>
        </div>
        <div className="bg-gray-50 p-4 rounded-xl">
          <h4 className="font-semibold text-dark mb-2">UX &amp; Performance</h4>
          <ul className="list-disc list-inside space-y-1">
            <li>Navegación narrativa con checkpoints que guían al usuario hacia la contratación.</li>
            <li>Optimización multimedia con compresión adaptativa y carga progresiva de videos.</li>
            <li>Auditoría de accesibilidad AA, SEO técnico y métricas Core Web Vitals dentro de los objetivos.</li>
          </ul>
        </div>
      </div>
    </section>
  )
}

export function TupacProcessSection(): React.ReactElement {
  return (
    <section className="bg-white border border-gray-200 rounded-2xl p-5 md:p-6">
      <h3 className="text-base md:text-lg font-semibold text-dark mb-4">3. Proceso y Entregables</h3>
      <div className="bg-gray-50 p-4 rounded-xl text-sm md:text-base text-gray-700">
        <h4 className="font-semibold text-dark mb-2">Fases de trabajo (inicio inmediato, duración 4 semanas)</h4>
        <ul className="list-disc list-inside space-y-1">
          <li><strong>Kick-off estratégico:</strong> definición de narrativa comercial, buyer personas y roadmap de contenidos.</li>
          <li><strong>Dirección creativa:</strong> moodboards, look &amp; feel definitivo, wireframes y prototipo navegable en Figma.</li>
          <li><strong>Producción técnica:</strong> desarrollo Next.js, integraciones con formularios/contratos y carga de portafolio.</li>
          <li><strong>Lanzamiento y acompañamiento:</strong> QA integral, optimización final y soporte extendido de 30 días.</li>
        </ul>
        <p className="mt-4 text-sm md:text-base text-gray-600">Incluye reuniones semanales de control y tablero compartido de avances para seguimiento de tareas.</p>
      </div>
    </section>
  )
}

export function TupacPlansSection(): React.ReactElement {
  return (
    <section className="bg-gradient-to-r from-[#ff6600]/10 to-[#ff1493]/10 border border-primary/20 rounded-2xl p-5 md:p-6">
      <h3 className="text-base md:text-lg font-semibold text-dark mb-4">4. Planes de Servicio &amp; Condiciones</h3>
      <div className="flex flex-col md:flex-row gap-4 overflow-x-auto pb-2 text-sm md:text-base text-gray-700 scroll-smooth" style={{ scrollbarWidth: "thin" }}>
        {PLAN_DATA.map((plan) => {
          const discounted = +(plan.price - 89.99).toFixed(2)
          const initialPayment = +(discounted / 2).toFixed(2)
          const remaining = +(discounted - initialPayment).toFixed(2)

          return (
            <div key={plan.id} className="min-w-full md:min-w-[300px] lg:min-w-[340px] bg-white rounded-xl p-4 border border-gray-200 space-y-3 flex-1">
              <div className="space-y-1">
                <p className="text-xs uppercase tracking-wide text-primary">Ventana de entrega</p>
                <h4 className="text-lg font-semibold text-dark">{plan.deliveryLabel}</h4>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs uppercase tracking-wide text-gray-500">Inversión base</p>
                <p className="text-2xl font-bold text-primary">USD {plan.price.toFixed(2)}</p>
                <p className="text-xs text-gray-500">{plan.durationDetail}</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-3">
                <p className="text-xs uppercase tracking-wide text-gray-500">Alianza barbería (24 cortes / 6 meses)</p>
                <p className="text-lg font-semibold text-gray-900">- USD 89.99</p>
                <p className="text-xs text-gray-500">Crédito aplicado al costo del proyecto.</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs uppercase tracking-wide text-gray-500">Total ajustado</p>
                <p className="text-2xl font-bold text-primary">USD {discounted.toFixed(2)}</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg border border-gray-200 p-3">
                  <p className="text-xs uppercase tracking-wide text-gray-500">Anticipo 50%</p>
                  <p className="text-lg font-semibold text-gray-900">USD {initialPayment.toFixed(2)}</p>
                </div>
                <div className="rounded-lg border border-gray-200 p-3">
                  <p className="text-xs uppercase tracking-wide text-gray-500">Saldo a entrega</p>
                  <p className="text-lg font-semibold text-gray-900">USD {remaining.toFixed(2)}</p>
                </div>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-3">
                <p className="text-xs uppercase tracking-wide text-gray-500">Bonus exclusivo</p>
                <p className="text-sm text-gray-700">
                  Durante seis meses diseñaremos propuestas y contratos digitales para tus clientes, reforzando tu oferta de valor en cada servicio
                  contratado.
                </p>
              </div>
              <p className="text-xs text-gray-500">{plan.note}</p>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export function TupacServicesSection(): React.ReactElement {
  return (
    <section className="bg-white border border-gray-200 rounded-2xl p-5 md:p-6">
      <h3 className="text-base md:text-lg font-semibold text-dark mb-4">5. Servicios Complementarios Incluidos</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm md:text-base text-gray-700">
        <div className="bg-gray-50 p-4 rounded-xl">
          <h4 className="font-semibold text-dark mb-2">Dominio &amp; Hosting gestionados</h4>
          <ul className="list-disc list-inside space-y-1">
            <li>Dominio .com personalizado por 12 meses (USD 15) incluido en la inversión.</li>
            <li>Hosting administrado optimizado para Next.js por 12 meses (USD 30) incluido.</li>
            <li>Configuración de DNS, SSL gratuito, monitoreo básico y renovaciones asistidas.</li>
          </ul>
        </div>
        <div className="bg-gray-50 p-4 rounded-xl">
          <h4 className="font-semibold text-dark mb-2">Laboratorio de contratos digitales</h4>
          <ul className="list-disc list-inside space-y-1">
            <li>Plantillas de contratos adaptadas a cada servicio (Community, Filmmaker, Diseño).</li>
            <li>Automatización para generar propuestas/contratos PDF listos para firma desde la landing.</li>
            <li>Acompañamiento durante 6 meses para personalizar cláusulas según cada cliente.</li>
          </ul>
        </div>
      </div>
    </section>
  )
}

export function TupacTermsSection(): React.ReactElement {
  return (
    <section className="bg-gray-50 border border-gray-200 rounded-2xl p-5 md:p-6">
      <h3 className="text-base md:text-lg font-semibold text-dark mb-4">6. Términos &amp; Condiciones</h3>
      <div className="space-y-3 text-sm md:text-base text-gray-700">
        <p>
          Los pagos pueden realizarse en USD vía transferencia (Binance Pay/USDT) o en bolívares calculados a la tasa Binance vigente al momento de la
          transacción. El anticipo del 50% se cancela para iniciar, aplicando el crédito de USD 89.99 correspondiente al intercambio de 24 cortes de
          cabello durante seis meses.
        </p>
        <p>
          El saldo restante se liquida al aprobar la versión final. Solicitudes adicionales o fuera de alcance se estiman y cotizan por separado. El
          proyecto incluye dominio (USD 15) y hosting administrado (USD 30) por 12 meses; las renovaciones posteriores se facturan según tarifas
          vigentes.
        </p>
        <p>
          Brindamos soporte técnico y microajustes durante 30 días posteriores al lanzamiento. Evoluciones futuras, nuevas secciones o integraciones se
          gestionan mediante nuevas órdenes de trabajo o bolsa de horas.
        </p>
      </div>
    </section>
  )
}
