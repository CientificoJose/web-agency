"use client"

import Image from "next/image"
import {
  MincoexArchitectureSection,
  MincoexContentSection,
  MincoexImplementationSection,
  MincoexInvestmentSection,
  MincoexSummarySection,
  MincoexSupportSection,
  MincoexEnhancementsSection,
} from "@/components/proposals/mincoex-content"

export default function MincoexProposalPage() {
  const handlePrint = () => {
    if (typeof window === "undefined") {
      return
    }

    window.print()
  }

  return (
    <div className="bg-slate-100 flex justify-center items-start md:items-center p-0 md:p-4 print:p-0 font-sans min-h-screen">
      <button
        onClick={handlePrint}
        className="no-print fixed top-4 right-4 bg-blue-600 text-white px-4 py-2 md:px-6 md:py-3 rounded-full shadow-lg hover:bg-blue-700 transition-all transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 z-50 text-sm md:text-base"
      >
        Imprimir documento
      </button>

      <div className="a4-container w-full md:w-[210mm] md:min-h-[297mm] bg-white md:shadow-xl relative overflow-hidden p-4 sm:p-6 md:p-[25mm] print:shadow-none print:p-[25mm]">
        <div className="absolute inset-0 pointer-events-none opacity-5 bg-[radial-gradient(circle_at_top,_#0f172a40,_transparent_55%)] -z-10" />

        <header className="text-center pb-5 border-b-2 border-blue-600 mb-6 md:mb-8 w-full">
          <Image src="/recurso.png" alt="Logo Sin Limites" width={128} height={128} className="w-24 md:w-32 mb-2 mx-auto" />
          <p className="text-slate-600 text-sm md:text-base">Sin Límites | Consultoría Digital y Transformación</p>
          <h1 className="text-xl md:text-2xl font-bold text-slate-900">Propuesta de Landing Page Institucional</h1>
          <h2 className="text-base md:text-lg text-blue-600">Ministerio del Poder Popular de Comercio Exterior</h2>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 mb-6 md:mb-8">
          <article className="bg-slate-50 p-4 rounded-lg border-l-4 border-blue-600">
            <h3 className="font-semibold text-slate-900 mb-2 text-base md:text-lg">Consultor Digital</h3>
            <p className="text-slate-700 text-sm md:text-base">José Nieves</p>
            <p className="text-slate-700 text-sm md:text-base">+58 424 360 3846</p>
            <p className="text-slate-700 text-sm md:text-base">contact@sinlimites-agency.site</p>
            <p className="text-slate-500 text-xs md:text-sm mt-2">Coordinación directa con Dirección de TIC MINCOEX.</p>
          </article>
          <article className="bg-slate-50 p-4 rounded-lg border-l-4 border-blue-600">
            <h3 className="font-semibold text-slate-900 mb-2 text-base md:text-lg">Cliente Institucional</h3>
            <p className="text-slate-700 text-sm md:text-base">Ministerio del Poder Popular de Comercio Exterior</p>
            <p className="text-slate-700 text-sm md:text-base">República Bolivariana de Venezuela</p>
            <p className="text-slate-700 text-sm md:text-base">Fecha de emisión: 11 de noviembre de 2025</p>
            <p className="text-slate-500 text-xs md:text-sm mt-2">Documento de trabajo para la Dirección de Finanzas.</p>
          </article>
        </section>

        <MincoexSummarySection />

        <div className="space-y-6 md:space-y-8">
          <MincoexArchitectureSection />
          <MincoexContentSection />
          <MincoexImplementationSection />
        </div>

        <MincoexInvestmentSection />
        <MincoexSupportSection />
        <MincoexEnhancementsSection />

        <section className="mt-8 md:mt-10 bg-slate-900 text-white rounded-2xl p-5 md:p-6">
          <h3 className="text-lg md:text-xl font-semibold mb-4">Próximos Pasos &amp; Coordinación</h3>
          <div className="space-y-3 text-sm md:text-base text-slate-200 mb-4">
            <p>
              1. Compartir la orden de servicio o memorando interno que confirme el alcance entregado y el interés en las integraciones propuestas.
            </p>
            <p>
              2. Definir ventanilla única con la Dirección de Finanzas para la gestión administrativa y con TIC para la agenda técnica.
            </p>
            <p>
              3. Coordinar sesión de trabajo inicial para revisar roadmap del chatbot y automatización de videos, así como el cronograma de pagos.
            </p>
          </div>
          <div className="bg-white text-slate-900 rounded-xl p-4">
            <h4 className="font-semibold text-slate-900 mb-2">Contactos para seguimiento</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm md:text-base">
              <div>
                <p className="text-xs uppercase tracking-wide text-slate-500">Coordinación del proyecto</p>
                <p className="font-medium">José Nieves</p>
                <p className="text-slate-600">contact@sinlimites-agency.site</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-slate-500">Soporte técnico</p>
                <p className="font-medium">Mesa Técnica Sin Límites</p>
                <p className="text-slate-600">support@sinlimites-agency.site</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-6 md:mt-8 bg-white border border-slate-200 rounded-2xl p-5 md:p-6">
          <h3 className="text-base md:text-lg font-semibold text-slate-900 mb-4">Datos para Transferencia</h3>
          <div className="text-sm md:text-base text-slate-700 space-y-3">
            <div>
              <p className="font-semibold uppercase tracking-wide text-slate-500">Banco Banesco</p>
              <p>Transferencia | Cuenta Corriente</p>
              <p>N.º Cuenta: 0134 0154 3915 4102 6525</p>
              <p>C.I.V: 27.262.539</p>
              <p>Teléfono: 0412-4015063</p>
              <p>Titular: José Nieves</p>
            </div>
            <div>
              <p className="font-semibold uppercase tracking-wide text-slate-500">Pago Móvil</p>
              <p>Banco: 0134</p>
              <p>C.I.V: 27.262.539</p>
              <p>Teléfono: 0412-4015063</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
