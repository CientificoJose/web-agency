import React from "react"
import Image from "next/image"

export function MagySummarySection(): React.ReactElement {
  return (
    <section className="bg-gradient-to-r from-pink-500/10 to-slate-900/10 border border-pink-500/20 rounded-2xl p-5 md:p-6 mb-6 md:mb-8">
      <h2 className="text-lg md:text-xl font-semibold text-slate-900 mb-3">Resumen del Servicio</h2>
      <p className="text-slate-700 text-sm md:text-base leading-relaxed">
        Se documenta el acuerdo de continuidad operativa para <strong>magy-fashion.shop</strong>, sitio web desarrollado y entregado a Jorge Peralta. El
        alcance actual contempla la administración de hosting trimestral, dominio anual y soporte básico asociado a la capa de infraestructura.
      </p>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3 text-sm md:text-base text-slate-700">
        <div className="bg-white/70 border border-pink-500/30 rounded-xl p-3">
          <h4 className="font-semibold text-slate-900 mb-1">Datos del cliente</h4>
          <ul className="list-disc list-inside space-y-1">
            <li><strong>Nombre:</strong> Jorge Peralta</li>
            <li><strong>Proyecto:</strong> magy-fashion.shop</li>
            <li><strong>Fecha de emisión:</strong> Noviembre 2025</li>
          </ul>
        </div>
        <div className="bg-white/70 border border-pink-500/30 rounded-xl p-3">
          <h4 className="font-semibold text-slate-900 mb-1">Objetivo del documento</h4>
          <ul className="list-disc list-inside space-y-1">
            <li>Dejar constancia de los pagos recibidos.</li>
            <li>Establecer el cronograma de próximos cobros.</li>
            <li>Compartir los medios autorizados para transferencias.</li>
          </ul>
        </div>
      </div>
    </section>
  )
}

export function MagyBillingHistorySection(): React.ReactElement {
  return (
    <section className="bg-white border border-slate-200 rounded-2xl p-5 md:p-6">
      <h3 className="text-base md:text-lg font-semibold text-slate-900 mb-4">1. Historial de pagos</h3>
      <div className="bg-slate-50 p-4 rounded-xl text-sm md:text-base text-slate-700 space-y-2">
        <p>
          Se confirma la recepción de <strong>USD 20</strong> equivalentes en <strong>USDT</strong> correspondientes al período de hosting <strong>1 de agosto 2025 – 31 de
          octubre 2025</strong>. El pago se acreditó en billetera Binance el día 27 de agosto de 2025.
        </p>
        <p>Concepto cubierto: Hosting (trimestral) — ciclo Agosto 2025 / Octubre 2025.</p>
      </div>
    </section>
  )
}

export function MagyUpcomingChargesSection(): React.ReactElement {
  return (
    <section className="bg-slate-50 border border-slate-200 rounded-2xl p-5 md:p-6">
      <h3 className="text-base md:text-lg font-semibold text-slate-900 mb-4">2. Próximos cobros</h3>
      <div className="space-y-4 text-sm md:text-base text-slate-700">
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <h4 className="font-semibold text-slate-900 mb-1">Hosting (trimestral)</h4>
          <p>
            <span className="font-medium">27 de enero de 2026 — USD 20</span> correspondientes al ciclo <strong>Octubre 2025 / Enero 2026</strong>. Incluye renovación de
            instancia y monitoreo básico.
          </p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <h4 className="font-semibold text-slate-900 mb-1">Dominio (anual)</h4>
          <p>
            <span className="font-medium">27 de mayo de 2026 — USD 50</span> correspondientes al período <strong>27 de mayo 2025 / 27 de mayo 2026</strong>. Incluye
            administración de DNS y renovación en el registrador.
          </p>
        </div>
      </div>
    </section>
  )
}

export function MagyServiceNotesSection(): React.ReactElement {
  return (
    <section className="bg-white border border-slate-200 rounded-2xl p-5 md:p-6">
      <h3 className="text-base md:text-lg font-semibold text-slate-900 mb-4">3. Alcance del servicio</h3>
      <ul className="list-disc list-inside space-y-2 text-sm md:text-base text-slate-700">
        <li>Gestión de hosting con backups semanales y monitoreo de uptime.</li>
        <li>Renovación del dominio, ajustes de DNS y soporte ante incidencias básicas.</li>
        <li>Comunicación con Jorge Peralta para confirmar pagos y emitir recibos digitales.</li>
      </ul>
    </section>
  )
}

export function MagyPaymentMethodsSection(): React.ReactElement {
  return (
    <section className="bg-slate-900 text-white rounded-2xl p-5 md:p-6">
      <h3 className="text-lg md:text-xl font-semibold mb-4">4. Medios de pago autorizados</h3>
      <div className="bg-white/5 rounded-2xl p-4 md:p-5 text-center space-y-4">
        <p className="text-sm md:text-base text-slate-100">
          Escanea el QR para cancelar vía Binance Pay / USDT red Tron. También puedes copiar la dirección manualmente.
        </p>
        <div className="flex flex-col items-center gap-3">
          <Image src="/images/QR-Binance.jpg" alt="QR Binance" width={220} height={220} className="rounded-xl border border-white/20" />
          <div className="bg-white/10 rounded-xl px-4 py-2 text-xs md:text-sm font-mono text-white break-all">
            TAMG2RkiABbk6rJWn3BMJJdtgDV3FVsbUx
          </div>
          <p className="text-xs md:text-sm text-slate-200">Wallet USDT (TRC20) de José Nieves.</p>
        </div>
      </div>
      <p className="mt-4 text-xs md:text-sm text-slate-300">
        Envía el comprobante a <a href="mailto:contact@sinlimites-agency.online" className="underline">contact@sinlimites-agency.online</a> o al WhatsApp +58 412 4015063 para confirmar el abono.
      </p>
    </section>
  )
}

