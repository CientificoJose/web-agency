import React from "react"

export function MincoexHostingSummarySection(): React.ReactElement {
  return (
    <section className="bg-gradient-to-r from-blue-500/10 to-emerald-500/10 border border-blue-500/20 rounded-2xl p-5 md:p-6 mb-6 md:mb-8">
      <h2 className="text-lg md:text-xl font-semibold text-slate-900 mb-3">Resumen del Servicio de Hosting</h2>
      <p className="text-slate-700 text-sm md:text-base leading-relaxed">
        Para garantizar la continuidad operativa, seguridad y alto rendimiento de la plataforma digital del <strong>Ministerio del Poder Popular de Comercio Exterior</strong>, proponemos un esquema de hosting administrado de alta calidad. 
        Nuestras soluciones están diseñadas para cumplir con los estándares de seguridad institucional, garantizando un uptime óptimo y protección contra amenazas digitales.
      </p>
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm md:text-base text-slate-700">
        <div className="bg-white/70 border border-blue-500/30 rounded-xl p-3">
          <h4 className="font-semibold text-slate-900 mb-1">Garantías Institucionales</h4>
          <ul className="list-disc list-inside space-y-1">
            <li>Seguridad avanzada y mitigación de ataques.</li>
            <li>Respaldos periódicos automatizados.</li>
            <li>Soporte técnico especializado.</li>
          </ul>
        </div>
        <div className="bg-white/70 border border-blue-500/30 rounded-xl p-3">
          <h4 className="font-semibold text-slate-900 mb-1">Flexibilidad de Pago</h4>
          <ul className="list-disc list-inside space-y-1">
            <li>Opciones de pago mensual, trimestral y anual.</li>
            <li>Descuentos significativos por compromiso a mediano y largo plazo.</li>
          </ul>
        </div>
      </div>
    </section>
  )
}

export function MincoexHostingTiersSection(): React.ReactElement {
  return (
    <section className="bg-white border border-slate-200 rounded-2xl p-5 md:p-6 mb-6 md:mb-8">
      <h3 className="text-base md:text-lg font-semibold text-slate-900 mb-4">1. Planes de Hosting Disponibles</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Plan Básico */}
        <div className="bg-slate-50 rounded-xl px-3 py-4 border border-slate-200 flex flex-col justify-between">
          <div>
            <h4 className="text-base font-bold text-slate-900 mb-1">Plan Básico</h4>
            <p className="text-xs text-slate-600 mb-3">Presencia segura y estable.</p>
            <div className="mb-3">
              <p className="text-2xl font-bold text-blue-700">49.99$<span className="text-sm text-slate-500"> / mes</span></p>
            </div>
            <ul className="text-xs text-slate-700 space-y-2 mb-4">
              <li className="flex items-start"><span className="text-emerald-500 mr-1.5 mt-0.5">✔</span> <span>Almacenamiento SSD</span></li>
              <li className="flex items-start"><span className="text-emerald-500 mr-1.5 mt-0.5">✔</span> <span>Certificado SSL</span></li>
              <li className="flex items-start"><span className="text-emerald-500 mr-1.5 mt-0.5">✔</span> <span>Respaldos semanales</span></li>
              <li className="flex items-start"><span className="text-emerald-500 mr-1.5 mt-0.5">✔</span> <span>Soporte Ticket/Correo</span></li>
              <li className="flex items-start"><span className="text-emerald-500 mr-1.5 mt-0.5">✔</span> <span>Protección DDoS</span></li>
            </ul>
          </div>
          <div className="border-t border-slate-200 pt-3 space-y-1.5">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-600">Trimestral (10% off)</span>
              <span className="text-slate-900 font-semibold">134.97$</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-600">Anual (20% off)</span>
              <span className="text-emerald-600 font-semibold">479.90$</span>
            </div>
          </div>
        </div>

        {/* Plan Avanzado */}
        <div className="bg-blue-50 rounded-xl px-3 py-4 border border-blue-200 flex flex-col justify-between relative">
          <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs px-2 py-0.5 rounded-bl-lg rounded-tr-lg font-medium">Recomendado</div>
          <div>
            <h4 className="text-base font-bold text-slate-900 mb-1">Plan Avanzado</h4>
            <p className="text-xs text-slate-600 mb-3">Rendimiento y seguridad.</p>
            <div className="mb-3">
              <p className="text-2xl font-bold text-blue-700">74.99$<span className="text-sm text-slate-500"> / mes</span></p>
            </div>
            <ul className="text-xs text-slate-700 space-y-2 mb-4">
              <li className="flex items-start text-blue-700 font-medium"><span className="mr-1.5 mt-0.5">✔</span> <span>Todo lo del Plan Básico, más:</span></li>
              <li className="flex items-start"><span className="text-emerald-500 mr-1.5 mt-0.5">✔</span> <span>Recursos semi-dedicados</span></li>
              <li className="flex items-start"><span className="text-emerald-500 mr-1.5 mt-0.5">✔</span> <span>Certificado SSL Avanzado</span></li>
              <li className="flex items-start"><span className="text-emerald-500 mr-1.5 mt-0.5">✔</span> <span>Respaldos diarios</span></li>
              <li className="flex items-start"><span className="text-emerald-500 mr-1.5 mt-0.5">✔</span> <span>Firewall WAF</span></li>
              <li className="flex items-start"><span className="text-emerald-500 mr-1.5 mt-0.5">✔</span> <span>Sistema de caché</span></li>
            </ul>
          </div>
          <div className="border-t border-blue-200 pt-3 space-y-1.5">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-600">Trimestral (10% off)</span>
              <span className="text-slate-900 font-semibold">202.47$</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-600">Anual (20% off)</span>
              <span className="text-emerald-600 font-semibold">719.90$</span>
            </div>
          </div>
        </div>

        {/* Plan Premium */}
        <div className="bg-slate-900 text-white rounded-xl px-3 py-4 border border-slate-800 flex flex-col justify-between">
          <div>
            <h4 className="text-base font-bold mb-1">Plan Premium</h4>
            <p className="text-xs text-slate-400 mb-3">Alta disponibilidad.</p>
            <div className="mb-3">
              <p className="text-2xl font-bold text-emerald-400">99.99$<span className="text-sm text-slate-500"> / mes</span></p>
            </div>
            <ul className="text-xs text-slate-300 space-y-2 mb-4">
              <li className="flex items-start text-emerald-400 font-medium"><span className="mr-1.5 mt-0.5">✔</span> <span>Todo lo del Plan Avanzado, más:</span></li>
              <li className="flex items-start"><span className="text-emerald-400 mr-1.5 mt-0.5">✔</span> <span>SSL Wildcard</span></li>
              <li className="flex items-start"><span className="text-emerald-400 mr-1.5 mt-0.5">✔</span> <span>Respaldos externos</span></li>
              <li className="flex items-start"><span className="text-emerald-400 mr-1.5 mt-0.5">✔</span> <span>DDoS Premium</span></li>
            </ul>
          </div>
          <div className="border-t border-slate-700 pt-3 space-y-1.5">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-400">Trimestral (10% off)</span>
              <span className="text-white font-semibold">269.97$</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-400">Anual (20% off)</span>
              <span className="text-emerald-400 font-semibold">959.90$</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

export function MincoexHostingSecuritySection(): React.ReactElement {
  return (
    <section className="bg-slate-50 border border-slate-200 rounded-2xl p-5 md:p-6 mb-6 md:mb-8">
      <h3 className="text-base md:text-lg font-semibold text-slate-900 mb-4">2. Seguridad Institucional Garantizada</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm md:text-base text-slate-700">
        <div className="bg-white p-4 rounded-xl border border-slate-100">
          <h4 className="font-semibold text-slate-900 mb-2">Mitigación de Ataques DDoS</h4>
          <p className="text-sm text-slate-600">
            Implementamos capas de seguridad para filtrar tráfico malicioso antes de que llegue al servidor, garantizando que el sitio web del Ministerio permanezca accesible incluso durante intentos de ataque.
          </p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-100">
          <h4 className="font-semibold text-slate-900 mb-2">Firewall de Aplicaciones Web (WAF)</h4>
          <p className="text-sm text-slate-600">
            Disponible en los planes Avanzado y Premium, el WAF analiza las peticiones en tiempo real para bloquear inyecciones SQL, Cross-Site Scripting (XSS) y otras vulnerabilidades comunes.
          </p>
        </div>
      </div>
    </section>
  )
}

