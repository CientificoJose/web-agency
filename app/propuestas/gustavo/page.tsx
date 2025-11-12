"use client"

import Image from "next/image"
import {
  GustavoSummarySection,
  GustavoCapitalSection,
  GustavoOperationSection,
  GustavoProfitSection,
  GustavoRiskSection,
  GustavoRoadmapSection,
} from "@/components/proposals/gustavo-content"

export default function GustavoProposalPage() {
  return (
    <div className="bg-slate-100 flex justify-center items-start md:items-center p-0 md:p-4 print:p-0 font-sans min-h-screen">
      <div className="a4-container w-full md:w-[210mm] md:min-h-[297mm] bg-white md:shadow-xl relative overflow-hidden p-4 sm:p-6 md:p-[25mm] print:shadow-none print:p-[25mm]">
        <header className="text-center pb-5 border-b-2 border-amber-500 mb-6 md:mb-8 w-full">
          <Image src="/recurso.png" alt="Logo Sin Límites" width={128} height={128} className="w-24 md:w-28 mx-auto mb-2" />
          <h1 className="text-xl md:text-2xl font-bold text-slate-900">Acuerdo Operativo de Arbitraje P2P</h1>
          <p className="text-sm md:text-base text-slate-600">José Nieves &amp; Gustavo — Binance P2P &amp; Neobancos</p>
          <p className="text-xs md:text-sm text-slate-500 mt-2">Documento interno | Versión 1.0 | Noviembre 2025</p>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 mb-6 md:mb-8">
          <article className="bg-slate-50 p-4 rounded-lg border-l-4 border-amber-500">
            <h3 className="font-semibold text-slate-900 mb-2 text-base md:text-lg">Operador</h3>
            <p className="text-slate-700 text-sm md:text-base">José Nieves</p>
            <p className="text-slate-700 text-sm md:text-base">Responsable de ejecución, reportes y custodia operativa.</p>
            <p className="text-slate-500 text-xs md:text-sm mt-2">Contacto: +58 412 4015063 | jose.nieves@sinlimites-agency.online</p>
          </article>
          <article className="bg-slate-50 p-4 rounded-lg border-l-4 border-amber-500">
            <h3 className="font-semibold text-slate-900 mb-2 text-base md:text-lg">Inversionista</h3>
            <p className="text-slate-700 text-sm md:text-base">Gustavo</p>
            <p className="text-slate-700 text-sm md:text-base">Aporta capital y recibe reportes periódicos de desempeño.</p>
            <p className="text-slate-500 text-xs md:text-sm mt-2">Compromiso: proveer fondos iniciales y validar crecimiento mensual.</p>
          </article>
        </section>

        <GustavoSummarySection />

        <div className="space-y-6 md:space-y-8">
          <GustavoCapitalSection />
          <GustavoOperationSection />
          <GustavoProfitSection />
          <GustavoRiskSection />
          <GustavoRoadmapSection />
        </div>

        <section className="mt-8 md:mt-10 bg-slate-900 text-white rounded-2xl p-5 md:p-6">
          <h3 className="text-lg md:text-xl font-semibold mb-3">Estado actual del capital</h3>
          <p className="text-sm md:text-base text-slate-200">
            Se registró la recepción de <strong>82.91&nbsp;USDT</strong> en la billetera Binance P2P de José. Los fondos están listos para ejecutar las
            primeras operaciones piloto según el roadmap definido.
          </p>
        </section>

        <section className="mt-6 md:mt-8 bg-white border border-slate-200 rounded-2xl p-5 md:p-6">
          <h3 className="text-base md:text-lg font-semibold text-slate-900 mb-2">Firmas</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm md:text-base text-slate-700">
            <div>
              <p className="font-semibold text-slate-900">______________________________</p>
              <p>José Nieves</p>
              <p>Operador de arbitraje</p>
            </div>
            <div>
              <p className="font-semibold text-slate-900">______________________________</p>
              <p>Gustavo</p>
              <p>Inversionista</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
