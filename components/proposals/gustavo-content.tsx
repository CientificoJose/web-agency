import React from "react"

export function GustavoSummarySection(): React.ReactElement {
  return (
    <section className="bg-gradient-to-r from-amber-500/10 to-slate-900/10 border border-amber-500/20 rounded-2xl p-5 md:p-6 mb-6 md:mb-8">
      <h2 className="text-lg md:text-xl font-semibold text-slate-900 mb-3">Resumen Ejecutivo</h2>
      <p className="text-slate-700 text-sm md:text-base leading-relaxed">
        Se formaliza un acuerdo operativo entre José Nieves (operador de arbitraje) y Gustavo (inversionista) para gestionar capital destinado a
        arbitraje P2P dentro del ecosistema Binance. El objetivo es multiplicar el capital inyectado aprovechando diferenciales de compra/venta
        (spread) utilizando bancos nacionales y neobancos (ej. Zinli) con un esquema transparente de distribución de ganancias y control de riesgos.
      </p>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3 text-sm md:text-base text-slate-700">
        <div className="bg-white/70 border border-amber-500/30 rounded-xl p-3">
          <h4 className="font-semibold text-slate-900 mb-1">Participantes</h4>
          <ul className="list-disc list-inside space-y-1">
            <li><strong>Gustavo:</strong> aporta capital inicial y supervisa reportes.</li>
            <li><strong>José Nieves:</strong> ejecuta estrategia de arbitraje, gestiona liquidez y reporta resultados.</li>
          </ul>
        </div>
        <div className="bg-white/70 border border-amber-500/30 rounded-xl p-3">
          <h4 className="font-semibold text-slate-900 mb-1">Metas iniciales</h4>
          <ul className="list-disc list-inside space-y-1">
            <li>Establecer un marco operativo y documental replicable.</li>
            <li>Conseguir estatus de comerciante verificado P2P en Binance.</li>
          </ul>
        </div>
      </div>
    </section>
  )
}

export function GustavoCapitalSection(): React.ReactElement {
  return (
    <section className="bg-white border border-slate-200 rounded-2xl p-5 md:p-6">
      <h3 className="text-base md:text-lg font-semibold text-slate-900 mb-4">1. Capital, Custodia &amp; Flujos</h3>
      <div className="space-y-4 text-sm md:text-base text-slate-700">
        <div className="bg-slate-50 p-4 rounded-xl">
          <h4 className="font-semibold text-slate-900 mb-2">Aportes iniciales</h4>
          <ul className="list-disc list-inside space-y-1">
            <li>Monto base (a definir por Gustavo) transferido a cuentas autorizadas de José.</li>
            <li>Capital fraccionado en bolsillos operativos: bancos nacionales (Banesco, Provincias, etc.), Zinli y stablecoins en Binance.</li>
            <li>Se registró la recepción inicial de <strong>82.91 USDT</strong> ya disponibles en la billetera Binance P2P.</li>
            <li>Registro en acta de recepción indicando fecha, referencia y saldo disponible.</li>
          </ul>
        </div>
        <div className="bg-slate-50 p-4 rounded-xl">
          <h4 className="font-semibold text-slate-900 mb-2">Custodia y accesos</h4>
          <ul className="list-disc list-inside space-y-1">
            <li>Las credenciales de Binance P2P permanecen bajo control de José; Gustavo recibe acceso lector a reportes (API read-only o capturas verificadas).</li>
            <li>Cuentas bancarias utilizadas estarán a nombre de José para garantizar velocidad de liquidación y cumplimiento KYC.</li>
            <li>Kardex compartido (Google Sheets/Notion) refleja entrada/salida de bolívares, USD y USDT.</li>
          </ul>
        </div>
      </div>
    </section>
  )
}

export function GustavoOperationSection(): React.ReactElement {
  return (
    <section className="bg-slate-50 border border-slate-200 rounded-2xl p-5 md:p-6">
      <h3 className="text-base md:text-lg font-semibold text-slate-900 mb-4">2. Estrategia de Arbitraje &amp; Operación</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm md:text-base text-slate-700">
        <div className="bg-white p-4 rounded-xl">
          <h4 className="font-semibold text-slate-900 mb-2">Modelo operativo</h4>
          <ul className="list-disc list-inside space-y-1">
            <li>Compra de USDT a precio preferencial en Binance P2P (bancos nacionales) y venta a premium en Zinli o viceversa.</li>
            <li>Optimización de spreads en ventanas de alta demanda (horarios laborales, fines de semana y cierres de mes).</li>
            <li>Rotación diaria del capital para maximizar número de ciclos.</li>
          </ul>
        </div>
        <div className="bg-white p-4 rounded-xl">
          <h4 className="font-semibold text-slate-900 mb-2">Herramientas y soporte</h4>
          <ul className="list-disc list-inside space-y-1">
            <li>Dashboard en Google Sheets con actualización manual diaria.</li>
            <li>Alertas de precio con bots de Telegram/TradingView para detectar spreads.</li>
            <li>Registro de tickets de soporte Binance/Zinli y plantilla de atención a clientes.</li>
          </ul>
        </div>
      </div>
    </section>
  )
}

export function GustavoProfitSection(): React.ReactElement {
  return (
    <section className="bg-white border border-slate-200 rounded-2xl p-5 md:p-6">
      <h3 className="text-base md:text-lg font-semibold text-slate-900 mb-4">3. Distribución de Ganancias &amp; Retornos</h3>
      <div className="space-y-4 text-sm md:text-base text-slate-700">
        <div className="bg-slate-50 p-4 rounded-xl">
          <h4 className="font-semibold text-slate-900 mb-2">Esquema base</h4>
          <ul className="list-disc list-inside space-y-1">
            <li>Ganancias netas (luego de comisiones, retiros y costos operativos) se distribuyen 50% Gustavo / 50% José.</li>
            <li>Liquidación de utilidades al cierre de cada mes; posibilidad de reinversión automática si ambas partes acuerdan.</li>
            <li>Tope de pérdida asumible: -10% del capital. Al alcanzarlo se detienen operaciones y se revisa estrategia.</li>
          </ul>
        </div>
        <div className="bg-slate-50 p-4 rounded-xl">
          <h4 className="font-semibold text-slate-900 mb-2">Reservas y provisiones</h4>
          <ul className="list-disc list-inside space-y-1">
            <li>Hasta 2% de cada ciclo se destina a un fondo de contingencia cuando aplique (chargebacks, bloqueos temporales, fees inesperadas).</li>
            <li>Registro contable compartido con estado de resultados mensual.</li>
          </ul>
        </div>
      </div>
    </section>
  )
}

export function GustavoRiskSection(): React.ReactElement {
  return (
    <section className="bg-slate-50 border border-slate-200 rounded-2xl p-5 md:p-6">
      <h3 className="text-base md:text-lg font-semibold text-slate-900 mb-4">4. Riesgos, Cumplimiento &amp; Mitigaciones</h3>
      <div className="space-y-4 text-sm md:text-base text-slate-700">
        <div className="bg-white p-4 rounded-xl">
          <h4 className="font-semibold text-slate-900 mb-2">Riesgos identificados</h4>
          <ul className="list-disc list-inside space-y-1">
            <li>Bloqueo temporal de cuentas (Binance, Zinli o bancos) por control de legitimación de capitales.</li>
            <li>Variabilidad del spread y liquidez limitada en horarios específicos.</li>
            <li>Fraude de contrapartes o estafas en P2P (solicitud de reversos, recibos falsificados).</li>
          </ul>
        </div>
        <div className="bg-white p-4 rounded-xl">
          <h4 className="font-semibold text-slate-900 mb-2">Plan de mitigación</h4>
          <ul className="list-disc list-inside space-y-1">
            <li>Proceso KYC completo y documentación de origen de fondos para Gustavo y José.</li>
            <li>Checklist de validación por operación (capturas, confirmación telefónica cuando aplique).</li>
            <li>Seguro interno: prioridad a perfiles verificados y transacciones con reputación &gt; 95%.</li>
            <li>Manual en caso de disputa Binance y escalamiento a Soporte Premium.</li>
          </ul>
        </div>
      </div>
    </section>
  )
}

export function GustavoRoadmapSection(): React.ReactElement {
  return (
    <section className="bg-white border border-slate-200 rounded-2xl p-5 md:p-6">
      <h3 className="text-base md:text-lg font-semibold text-slate-900 mb-4">5. Roadmap &amp; Próximos Hitos</h3>
      <div className="bg-slate-50 p-4 rounded-xl text-sm md:text-base text-slate-700 space-y-2">
        <ol className="list-decimal list-inside space-y-1">
          <li><strong>Semana 1:</strong> formalización del acuerdo, pruebas con anuncios y familiarización con la interfaz Binance C2C.</li>
          <li><strong>Semana 2:</strong> ejecución piloto con capital parcial, ajustes a plantillas de compra/venta y documentación de procesos.</li>
          <li><strong>Semana 3:</strong> escalamiento progresivo hasta el 100% del capital, evaluación de métricas de rotación y spreads promedio.</li>
          <li><strong>Semana 4:</strong> consolidación de reportes, reunión de revisión y definición de reinversión o retiro parcial.</li>
        </ol>
        <p>Al concluir la semana 4 se repite el ciclo operativo: multiplicación de capital, documentación de resultados mensuales y ajustes acordados.</p>
      </div>
    </section>
  )
}
