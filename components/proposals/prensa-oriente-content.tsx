import React from "react"
import { Check, Calendar, CreditCard, Shield, AlertCircle, Landmark } from "lucide-react"

export function PrensaOrienteSummarySection() {
  return (
    <section className="mb-8">
      <h2 className="mb-4 text-2xl font-bold text-gray-900 break-words">Resumen del Contrato</h2>
      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <p className="text-sm text-gray-600">Cliente</p>
            <p className="font-semibold text-gray-900">Prensa Oriente</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Dominio</p>
            <p className="font-semibold text-gray-900">prensaoriente.com.ve</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Servicio Contratado</p>
            <p className="font-semibold text-gray-900">Hosting Trimestral + Dominio Anual</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Estado General</p>
            <p className="font-semibold text-orange-600">Renovación Pendiente</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export function PrensaOrienteBillingHistorySection() {
  return (
    <section className="mb-8">
      <h2 className="mb-4 text-2xl font-bold text-gray-900 break-words">Historial de Pagos</h2>
      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <div>
              <p className="font-semibold text-gray-900">Hosting Trimestral (Feb - Abr 2026)</p>
              <p className="text-sm text-gray-500">Pago procesado exitosamente</p>
            </div>
            <div className="text-right">
              <span className="inline-flex items-center rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-800">
                <Check className="mr-1 h-3 w-3" /> Pagado
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export function PrensaOrienteUpcomingChargesSection() {
  return (
    <section className="mb-8">
      <h2 className="mb-4 text-2xl font-bold text-gray-900 break-words">Próximos Cobros / Pendientes</h2>
      <div className="space-y-4">
        {/* Hosting First (Delayed) */}
        <div className="rounded-lg border-2 border-red-200 bg-red-50 p-6">
          <div className="flex items-start gap-4">
            <div className="rounded-full bg-red-100 p-3">
              <AlertCircle className="h-6 w-6 text-red-600" />
            </div>
            <div className="flex-1">
              <h3 className="mb-1 font-semibold text-red-900">Hosting Trimestral (Abr - Jul 2026)</h3>
              <p className="text-2xl font-bold text-red-600">$36.00 (Tasa BCV)</p>
              <p className="mt-1 text-sm text-red-800">
                Fecha límite de pago: <strong>30 de Abril, 2026</strong>.
              </p>
              <div className="mt-3 flex items-center gap-2 text-sm font-bold text-red-900 uppercase tracking-wide">
                <CreditCard className="h-4 w-4" /> Pago Retrasado
              </div>
            </div>
          </div>
        </div>

        {/* Domain Second (Next to expire) */}
        <div className="rounded-lg border-2 border-blue-200 bg-blue-50 p-6">
          <div className="flex items-start gap-4">
            <div className="rounded-full bg-blue-100 p-3">
              <Calendar className="h-6 w-6 text-blue-600" />
            </div>
            <div className="flex-1">
              <h3 className="mb-1 font-semibold text-blue-900">Dominio Anual (2026-2027)</h3>
              <p className="text-2xl font-bold text-blue-600">25 de Mayo, 2026 — 17€</p>
              <p className="mt-1 text-sm text-blue-800">
                Renovación anual del dominio <strong>prensaoriente.com.ve</strong>.
              </p>
              <div className="mt-3 flex items-center gap-2 text-sm font-bold text-blue-900 uppercase tracking-wide">
                <Calendar className="h-4 w-4" /> Próximo a vencer
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export function PrensaOrienteBankDetailsSection() {
  return (
    <section className="mb-8">
      <h2 className="mb-4 text-2xl font-bold text-gray-900 break-words">Datos Bancarios</h2>
      <div className="rounded-lg bg-slate-900 p-6 text-white shadow-xl">
        <div className="mb-6 flex items-center gap-3 border-b border-white/10 pb-4">
          <Landmark className="h-6 w-6 text-blue-400" />
          <h3 className="text-xl font-bold">Banco Banesco</h3>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-400">Transferencia</h4>
            <div>
              <p className="text-xs text-slate-400">Nombre</p>
              <p className="font-semibold text-lg">Jose Nieves</p>
            </div>
            <div>
              <p className="text-xs text-slate-400">C.I.V</p>
              <p className="font-mono text-lg">27.262.539</p>
            </div>
            <div>
              <p className="text-xs text-slate-400">Número de Cuenta (Cta Cte)</p>
              <p className="font-mono text-lg tracking-wider">0134 0154 3915 4102 6525</p>
            </div>
            <div>
              <p className="text-xs text-slate-400">Teléfono</p>
              <p className="font-mono text-lg">0412-4015063</p>
            </div>
          </div>

          <div className="space-y-4 rounded-xl bg-white/5 p-4 border border-white/10">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-blue-400">Pago Móvil</h4>
            <div className="space-y-2 font-mono">
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-slate-400">Banco:</span>
                <span className="font-bold">0134</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-slate-400">Cédula:</span>
                <span className="font-bold">27262539</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Teléfono:</span>
                <span className="font-bold">04124015063</span>
              </div>
            </div>
            <div className="mt-4 rounded-lg bg-blue-500/10 p-3 text-center text-xs text-blue-300">
              Por favor, envíe el comprobante de pago vía WhatsApp para confirmar su abono.
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export function PrensaOrienteTermsSection() {
  return (
    <section className="mb-8">
      <h2 className="mb-4 text-2xl font-bold text-gray-900 break-words">Términos y Condiciones</h2>
      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <div className="space-y-4 text-sm text-gray-700">
          <div>
            <h3 className="mb-2 font-semibold text-gray-900">1. Gestión de BCV</h3>
            <p>
              Los pagos en Bolívares se calculan a la tasa oficial del Banco Central de Venezuela (BCV) del día de la transacción.
            </p>
          </div>
          <div>
            <h3 className="mb-2 font-semibold text-gray-900">2. Suspensión de Servicio</h3>
            <p>
              El incumplimiento del pago de renovación de dominio o hosting resultará en la suspensión automática de los servicios asociados al sitio web prensaoriente.com.ve.
            </p>
          </div>
          <div className="mt-6 rounded-lg border border-gray-300 bg-gray-50 p-4">
            <div className="flex items-start gap-2">
              <Shield className="h-5 w-5 flex-shrink-0 text-gray-600 mt-0.5" />
              <p className="text-xs text-gray-600">
                Al firmar este documento, el cliente reconoce y acepta los términos de facturación y las fechas de vencimiento establecidas.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
