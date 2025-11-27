"use client"

import Image from "next/image"
import {
  MagySummarySection,
  MagyBillingHistorySection,
  MagyUpcomingChargesSection,
  MagyServiceNotesSection,
  MagyPaymentMethodsSection,
} from "@/components/proposals/magy-fashion-content"

export default function MagyFashionAgreementPage() {
  return (
    <div className="bg-slate-100 flex justify-center items-start md:items-center p-0 md:p-4 print:p-0 font-sans min-h-screen">
      <div className="a4-container w-full md:w-[210mm] md:min-h-[297mm] bg-white md:shadow-xl relative overflow-hidden p-4 sm:p-6 md:p-[25mm] print:shadow-none print:p-[25mm]">
        <header className="text-center pb-5 border-b-2 border-pink-500 mb-6 md:mb-8 w-full">
          <Image src="/recurso.png" alt="Logo Sin Límites" width={128} height={128} className="w-24 md:w-28 mx-auto mb-2" />
          <h1 className="text-xl md:text-2xl font-bold text-slate-900">Acuerdo de Continuidad | magy-fashion.shop</h1>
          <p className="text-sm md:text-base text-slate-600">Hosting y dominio administrados por Sin Límites</p>
          <p className="text-xs md:text-sm text-slate-500 mt-2">Documento interno | Noviembre 2025</p>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 mb-6 md:mb-8">
          <article className="bg-slate-50 p-4 rounded-lg border-l-4 border-pink-500">
            <h3 className="font-semibold text-slate-900 mb-2 text-base md:text-lg">Cliente</h3>
            <p className="text-slate-700 text-sm md:text-base">Jorge Peralta</p>
            <p className="text-slate-700 text-sm md:text-base">Propietario de magy-fashion.shop</p>
            <p className="text-slate-500 text-xs md:text-sm mt-2">Contacto habitual: WhatsApp y correo registrados.</p>
          </article>
          <article className="bg-slate-50 p-4 rounded-lg border-l-4 border-pink-500">
            <h3 className="font-semibold text-slate-900 mb-2 text-base md:text-lg">Responsable</h3>
            <p className="text-slate-700 text-sm md:text-base">José Nieves</p>
            <p className="text-slate-700 text-sm md:text-base">Sin Límites | Consultoría Digital</p>
            <p className="text-slate-500 text-xs md:text-sm mt-2">+58 412 4015063 | contact@sinlimites-agency.site</p>
          </article>
        </section>

        <MagySummarySection />
        <MagyBillingHistorySection />
        <MagyUpcomingChargesSection />
        <MagyServiceNotesSection />
        <MagyPaymentMethodsSection />

        <section className="mt-6 md:mt-8 bg-white border border-slate-200 rounded-2xl p-5 md:p-6">
          <h3 className="text-base md:text-lg font-semibold text-slate-900 mb-2">Confirmación</h3>
          <p className="text-sm md:text-base text-slate-700">
            Este documento sirve como constancia del esquema de cobros y pagos de infraestructura para magy-fashion.shop. Cualquier ajuste deberá ser
            comunicado con al menos 15 días de anticipación para ser incluido en el siguiente ciclo.
          </p>
        </section>
      </div>
    </div>
  )
}
