import React from "react"

const PLAN_DATA = [
  {
    id: "modernizacion",
    deliveryLabel: "Plan único | Entrega en 7 días hábiles",
    price: 149.99,
    durationDetail: "Ejecución rápida con validaciones diarias",
    note: "El alcance se enfoca en modernización visual/estructura de TiendaNube y creación de landing dentro de MercadoLibre. Ajustes fuera de alcance se cotizan por separado.",
  },
] as const

export function JgStoreSummarySection(): React.ReactElement {
  return (
    <div className="bg-gradient-to-r from-[#ff6600]/10 to-[#ff1493]/10 border border-primary/20 rounded-2xl p-5 md:p-6 mb-6 md:mb-8">
      <h2 className="text-lg md:text-xl font-semibold text-dark mb-3">Resumen Ejecutivo</h2>
      <p className="text-gray-700 text-sm md:text-base leading-relaxed">
        Modernizaremos la presencia digital de <strong>JG Store</strong> a través de dos frentes: una actualización completa del theme y estructura de
        la tienda en TiendaNube para mejorar experiencia de compra y conversión, y la creación de una página de aterrizaje dentro de MercadoLibre
        (mini-sitio/landing) para capitalizar el tráfico orgánico de la plataforma y dirigir usuarios hacia productos y colecciones.
      </p>
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm md:text-base text-gray-700">
        <div className="bg-white/60 border border-primary/20 rounded-xl p-3">
          <h4 className="font-semibold text-dark mb-1">Objetivos</h4>
          <ul className="list-disc list-inside space-y-1">
            <li>Mejorar la percepción de marca con un look &amp; feel moderno y coherente.</li>
            <li>Optimizar la navegación para acelerar la compra y reducir fricción.</li>
            <li>Crear una landing dentro de MercadoLibre orientada a conversión.</li>
          </ul>
        </div>
        <div className="bg-white/60 border border-primary/20 rounded-xl p-3">
          <h4 className="font-semibold text-dark mb-1">Resultados esperados</h4>
          <ul className="list-disc list-inside space-y-1">
            <li>Home y categorías más claras, con jerarquía visual y CTA consistentes.</li>
            <li>Mejor uso de banners/colecciones para impulsar productos clave.</li>
            <li>Base de plantillas visuales reutilizables para futuras campañas.</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export function JgStoreScopeSection(): React.ReactElement {
  return (
    <section className="bg-gray-50 rounded-2xl p-5 md:p-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 mb-4">
        <h3 className="text-base md:text-lg font-semibold text-dark">1. Alcance del Proyecto</h3>
        <span className="bg-primary text-white px-3 py-1 rounded-full text-xs sm:text-sm font-medium">TiendaNube + MercadoLibre</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm md:text-base text-gray-700">
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <h4 className="font-semibold text-dark mb-2">A. Modernización TiendaNube</h4>
          <ul className="list-disc list-inside space-y-1">
            <li>Ajuste de theme/estilo general (colores, tipografías, componentes visuales).</li>
            <li>Reorganización de secciones principales (home) según la estructura entregada por el cliente.</li>
            <li>Mejoras de UX: navegación, jerarquía de información, bloques de confianza.</li>
            <li>Optimización visual para mobile (responsivo y legibilidad).</li>
          </ul>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <h4 className="font-semibold text-dark mb-2">B. Landing en MercadoLibre</h4>
          <ul className="list-disc list-inside space-y-1">
            <li>Diseño/estructura de mini página dentro de MercadoLibre (según opciones permitidas por la plataforma).</li>
            <li>Sección de marca + propuesta de valor + destacados.</li>
            <li>Enlaces a productos/colecciones recomendadas.</li>
            <li>Configuración para mantener coherencia visual con TiendaNube.</li>
          </ul>
        </div>
      </div>
    </section>
  )
}

export function JgStoreDeliverablesSection(): React.ReactElement {
  return (
    <section className="bg-white border border-gray-200 rounded-2xl p-5 md:p-6">
      <h3 className="text-base md:text-lg font-semibold text-dark mb-4">2. Entregables</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm md:text-base text-gray-700">
        <div className="bg-gray-50 rounded-xl p-4">
          <h4 className="font-semibold text-dark mb-2">TiendaNube</h4>
          <ul className="list-disc list-inside space-y-1">
            <li>Theme actualizado y aplicado a la estructura definida.</li>
            <li>Home optimizada con secciones y jerarquía visual clara.</li>
            <li>Ajustes visuales en páginas clave (producto/categorías) según sea necesario.</li>
          </ul>
        </div>

        <div className="bg-gray-50 rounded-xl p-4">
          <h4 className="font-semibold text-dark mb-2">MercadoLibre</h4>
          <ul className="list-disc list-inside space-y-1">
            <li>Landing dentro de MercadoLibre con estructura enfocada a conversión.</li>
            <li>Bloques de marca, beneficios, destacados y acceso a productos.</li>
          </ul>
        </div>

        <div className="bg-gray-50 rounded-xl p-4 md:col-span-2">
          <h4 className="font-semibold text-dark mb-2">Plantillas de imágenes (reutilizables)</h4>
          <p className="text-gray-700 mb-2">
            Se entregará un set de plantillas base para uso futuro, con guía de proporciones y áreas seguras.
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li>Formatos recomendados para banners, promos y destacados (incluye proporciones sugeridas).</li>
            <li>Guía rápida de márgenes/zonas seguras para que el texto no quede cortado en mobile.</li>
            <li>Plantillas listas para editar (para futuras campañas y temporadas).</li>
          </ul>
        </div>
      </div>
    </section>
  )
}

export function JgStoreProcessSection(): React.ReactElement {
  return (
    <section className="bg-white border border-gray-200 rounded-2xl p-5 md:p-6">
      <h3 className="text-base md:text-lg font-semibold text-dark mb-4">3. Proceso de Trabajo</h3>
      <div className="bg-gray-50 p-4 rounded-xl text-sm md:text-base text-gray-700">
        <h4 className="font-semibold text-dark mb-2">Fases de trabajo (duración estimada: 7 días hábiles)</h4>
        <ul className="list-disc list-inside space-y-1">
          <li><strong>Kick-off:</strong> revisión de la estructura deseada, assets y referencias.</li>
          <li><strong>Diseño aplicado:</strong> ajuste de theme y componentes visuales.</li>
          <li><strong>Implementación:</strong> reorganización de secciones y mejoras de UX en TiendaNube.</li>
          <li><strong>Landing ML:</strong> configuración y armado de la mini página dentro de MercadoLibre.</li>
          <li><strong>QA y entrega:</strong> validación en desktop/mobile y ajustes finales.</li>
        </ul>
        <p className="mt-4 text-sm md:text-base text-gray-600">
          Incluye revisiones y feedback durante la semana para asegurar que el resultado final coincida con la visión del cliente.
        </p>
      </div>
    </section>
  )
}

export function JgStorePlansSection(): React.ReactElement {
  return (
    <section className="bg-gradient-to-r from-[#ff6600]/10 to-[#ff1493]/10 border border-primary/20 rounded-2xl p-5 md:p-6">
      <h3 className="text-base md:text-lg font-semibold text-dark mb-4">4. Inversión &amp; Condiciones</h3>
      <div className="text-sm md:text-base text-gray-700">
        {PLAN_DATA.map((plan) => (
          <div key={plan.id} className="bg-white rounded-2xl p-4 md:p-5 border border-gray-200 space-y-4">
            <div className="space-y-1">
              <p className="text-xs uppercase tracking-wide text-primary">Ventana de entrega</p>
              <h4 className="text-lg md:text-xl font-semibold text-dark">{plan.deliveryLabel}</h4>
              <p className="text-sm text-gray-600">{plan.durationDetail}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="bg-gray-50 rounded-xl p-3">
                <p className="text-xs uppercase tracking-wide text-gray-500">Inversión total</p>
                <p className="text-2xl font-bold text-primary">USD {plan.price.toFixed(2)}</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-xl p-3">
                <p className="text-xs uppercase tracking-wide text-gray-500">Forma de pago</p>
                <p className="text-sm text-gray-700">50% para iniciar y 50% contra entrega final.</p>
              </div>
            </div>
            <p className="text-xs text-gray-500">{plan.note}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export function JgStoreTermsSection(): React.ReactElement {
  return (
    <section className="bg-gray-50 border border-gray-200 rounded-2xl p-5 md:p-6">
      <h3 className="text-base md:text-lg font-semibold text-dark mb-4">5. Términos &amp; Condiciones</h3>
      <div className="space-y-3 text-sm md:text-base text-gray-700">
        <p>
          La ejecución estimada es de 7 días hábiles, contados a partir del inicio formal del proyecto (confirmación de pago inicial y entrega de
          recursos necesarios: logos, paleta, tipografías, referencias y estructura aprobada).
        </p>
        <p>
          Cambios adicionales no contemplados en el alcance (integraciones externas, automatizaciones, carga masiva avanzada, redacción extensa o piezas
          de diseño extra) se cotizan por separado.
        </p>
        <p>
          Incluye soporte y microajustes durante 7 días posteriores a la entrega final para corrección de detalles y ajustes menores.
        </p>
      </div>
    </section>
  )
}
