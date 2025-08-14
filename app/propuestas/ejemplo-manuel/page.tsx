'use client'

import { useEffect } from 'react';
import Script from 'next/script';
import Image from 'next/image';

// ================================================
// Ejemplo de Propuesta para Manuel
// --------------------------------
// Cómo reutilizar esta plantilla:
// 1) Cambia datos del cliente y fecha en la sección "Cliente".
// 2) Ajusta el título y el resumen con el problema y la solución.
// 3) Edita las secciones de Alcance, Entregables y Cronograma.
// 4) Actualiza los precios en la tabla de Inversión.
// 5) Elimina o adapta el diagrama Mermaid si no lo necesitas.
// 6) Presiona el botón "Imprimir" para generar PDF (Ctrl/Cmd + P).
//
// Tips de estilo (Tailwind):
// - Usa contenedores con "bg-gray-50", bordes y padding para bloques.
// - Utiliza "print:" para ajustar estilos en versión PDF.
// - Mantén "a4-container" para formato A4 consistente.
// ================================================

// Componente de diagrama con Mermaid (opcional)
const MermaidDiagram = ({ chart }: { chart: string }) => {
  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).mermaid) {
      (window as any).mermaid.contentLoaded();
    }
  }, [chart]);

  return <div className="mermaid">{chart}</div>;
};

export default function ManuelExampleProposalPage() {
  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).mermaid) {
      (window as any).mermaid.initialize({ startOnLoad: true, theme: 'default' });
      (window as any).mermaid.contentLoaded();
    }
  }, []);

  const handlePrint = () => {
    window.print();
  };

  // Fecha formateada para mostrar en español
  const fecha = new Date().toLocaleDateString('es-VE', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  // Diagrama del proceso (puedes editar los pasos o eliminar el bloque completo)
  const mermaidChart = `
    flowchart LR
      A[Descubrimiento] --> B[Diseño de Solución]
      B --> C[Implementación]
      C --> D[Pruebas]
      D --> E[Lanzamiento]
      E --> F[Soporte y Mejora Continua]
  `;

  return (
    <>
      {/* Carga de Mermaid solo si usas el diagrama */}
      <Script src="https://cdn.jsdelivr.net/npm/mermaid@10.6.1/dist/mermaid.min.js" strategy="afterInteractive" />

      <div className="bg-gray-100 flex justify-center items-start md:items-center p-0 md:p-4 print:p-0 font-sans min-h-screen">
        <button
          onClick={handlePrint}
          className="no-print fixed top-4 right-4 bg-primary text-white px-4 py-2 md:px-6 md:py-3 rounded-full shadow-lg hover:bg-primary-dark transition-all transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 z-50 text-sm md:text-base"
        >
          Imprimir
        </button>

        <div className="a4-container w-full md:w-[210mm] md:min-h-[297mm] bg-white md:shadow-xl relative overflow-hidden p-4 sm:p-6 md:p-[25mm] print:shadow-none print:p-[25mm]">
          {/* Marca de agua opcional (defínela en CSS global) */}
          <div className="watermark absolute inset-0 opacity-10 -z-10"></div>

          {/* Encabezado */}
          <div className="text-center pb-5 border-b-2 border-primary mb-6 md:mb-8 w-full">
            <Image src="/recurso.png" alt="Logo Sin Limites Agency" width={128} height={128} className="w-24 md:w-32 mb-2 mx-auto" />
            <h1 className="text-xl md:text-2xl font-bold text-dark">Sin Límites</h1>
            <h2 className="text-base md:text-lg text-primary">Agencia Digital</h2>
          </div>

          {/* Datos de Contacto */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 mb-6 md:mb-8">
            <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-primary">
              <h3 className="font-semibold text-dark mb-2 text-base md:text-lg">CEO</h3>
              <p className="text-gray-700 text-sm md:text-base">José Nieves</p>
              <p className="text-gray-700 text-sm md:text-base">Teléfono: +58 424 360 3846</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-primary">
              <h3 className="font-semibold text-dark mb-2 text-base md:text-lg">Cliente</h3>
              {/* Cambia estos datos para cada propuesta */}
              <p className="text-gray-700 text-sm md:text-base">Manuel</p>
              <p className="text-gray-700 text-sm md:text-base">Fecha: {fecha}</p>
            </div>
          </div>

          {/* Título */}
          <h2 className="text-lg md:text-xl font-bold text-dark mb-6 pb-2 border-b border-gray-200">
            Propuesta de Servicios Digitales — Plantilla Didáctica para Integrar en tu Trabajo
          </h2>

          {/* Secciones */}
          <div className="space-y-6 md:space-y-8">
            {/* Resumen Ejecutivo / Cómo usar */}
            <div className="bg-gray-50 rounded-lg p-4 md:p-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-2">
                <h3 className="text-base md:text-lg font-semibold text-dark">Resumen Ejecutivo</h3>
                <div className="no-print flex gap-2">
                  <span className="inline-block bg-primary text-white px-3 py-1 rounded-full text-xs font-medium">Plantilla</span>
                  <span className="inline-block bg-green-600 text-white px-3 py-1 rounded-full text-xs font-medium">Imprimible</span>
                  <span className="inline-block bg-indigo-600 text-white px-3 py-1 rounded-full text-xs font-medium">Personalizable</span>
                </div>
              </div>
              <p className="text-gray-700 text-sm md:text-base">
                Esta propuesta está diseñada para que puedas reutilizarla y adaptarla con rapidez. Cambia el nombre del cliente, la fecha, el título y
                los bloques de contenido según el proyecto. Mantiene una estructura profesional, lista para presentar o exportar a PDF.
              </p>
            </div>

            {/* Alcance del Proyecto */}
            <div className="bg-gray-50 rounded-lg p-4 md:p-6">
              <h3 className="text-base md:text-lg font-semibold text-dark mb-4">Alcance del Proyecto</h3>
              <ul className="list-disc pl-5 text-gray-700 space-y-2 text-sm md:text-base">
                <li>Descubrimiento: sesiones de entendimiento del negocio y objetivos del proyecto.</li>
                <li>Diseño de solución: arquitectura, flujos y definición de herramientas.</li>
                <li>Implementación: desarrollo de funcionalidades y configuración de integraciones.</li>
                <li>Pruebas: QA funcional, corrección de bugs y validación con el cliente.</li>
                <li>Lanzamiento y soporte: despliegue, monitoreo y mejoras continuas.</li>
              </ul>
            </div>

            {/* Proceso de Trabajo con Diagrama */}
            <div className="bg-gray-50 rounded-lg p-4 md:p-6">
              <h3 className="text-base md:text-lg font-semibold text-dark mb-4">Proceso de Trabajo (Visual)</h3>
              <p className="text-gray-700 text-sm md:text-base mb-3">
                Puedes mostrar tu proceso con un diagrama. Si no lo necesitas, elimina el bloque "Script" y este componente.
              </p>
              <div className="rounded-lg border border-gray-200 p-3 overflow-x-auto">
                <MermaidDiagram chart={mermaidChart} />
              </div>
            </div>

            {/* Entregables */}
            <div className="bg-gray-50 rounded-lg p-4 md:p-6">
              <h3 className="text-base md:text-lg font-semibold text-dark mb-4">Entregables</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
                <div className="p-4 rounded-lg border border-gray-200 bg-white">
                  <h4 className="font-medium text-primary mb-2">Documento de Arquitectura</h4>
                  <p className="text-gray-700 text-sm md:text-base">Diagrama, decisiones técnicas y dependencias.</p>
                </div>
                <div className="p-4 rounded-lg border border-gray-200 bg-white">
                  <h4 className="font-medium text-primary mb-2">MVP Funcional</h4>
                  <p className="text-gray-700 text-sm md:text-base">Características clave listas para usar.</p>
                </div>
                <div className="p-4 rounded-lg border border-gray-200 bg-white">
                  <h4 className="font-medium text-primary mb-2">Guía de Operación</h4>
                  <p className="text-gray-700 text-sm md:text-base">Instrucciones para el equipo del cliente.</p>
                </div>
                <div className="p-4 rounded-lg border border-gray-200 bg-white">
                  <h4 className="font-medium text-primary mb-2">Capacitación</h4>
                  <p className="text-gray-700 text-sm md:text-base">Sesión grabada y material de apoyo.</p>
                </div>
              </div>
            </div>

            {/* Cronograma (ejemplo) */}
            <div className="bg-gray-50 rounded-lg p-4 md:p-6">
              <h3 className="text-base md:text-lg font-semibold text-dark mb-4">Cronograma Estimado</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-5">
                <div className="bg-blue-50 rounded-lg p-4 md:p-5 text-center">
                  <h4 className="font-medium text-dark mb-2 md:mb-3">Semana 1</h4>
                  <div className="text-xl md:text-2xl font-bold text-primary mb-2">Descubrimiento</div>
                  <p className="text-xs md:text-sm text-gray-600 mt-2">Brief, objetivos, definición de KPIs</p>
                </div>
                <div className="bg-blue-50 rounded-lg p-4 md:p-5 text-center">
                  <h4 className="font-medium text-dark mb-2 md:mb-3">Semanas 2-3</h4>
                  <div className="text-xl md:text-2xl font-bold text-primary mb-2">Implementación</div>
                  <p className="text-xs md:text-sm text-gray-600 mt-2">Desarrollo e integraciones</p>
                </div>
                <div className="bg-blue-50 rounded-lg p-4 md:p-5 text-center">
                  <h4 className="font-medium text-dark mb-2 md:mb-3">Semana 4</h4>
                  <div className="text-xl md:text-2xl font-bold text-primary mb-2">Lanzamiento</div>
                  <p className="text-xs md:text-sm text-gray-600 mt-2">QA, ajustes y despliegue</p>
                </div>
              </div>
            </div>

            {/* Inversión y Modelo de Precios */}
            <div className="bg-gray-50 rounded-lg p-4 md:p-6">
              <h3 className="text-base md:text-lg font-semibold text-dark mb-4">Inversión y Modelo de Precios</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white text-sm md:text-base">
                  <thead className="bg-primary text-white">
                    <tr>
                      <th className="text-left py-2 px-3 md:py-3 md:px-4 font-semibold">Concepto</th>
                      <th className="text-right py-2 px-3 md:py-3 md:px-4 font-semibold">Costo</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700">
                    <tr className="border-b border-gray-100">
                      <td className="py-2 px-3 md:py-3 md:px-4">Setup Único (Kickoff, Arquitectura)</td>
                      <td className="py-2 px-3 md:py-3 md:px-4 text-right">$150 USD</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-2 px-3 md:py-3 md:px-4">Mensualidad (Operación + Soporte)</td>
                      <td className="py-2 px-3 md:py-3 md:px-4 text-right">$200 USD</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-2 px-3 md:py-3 md:px-4">Integraciones Opcionales</td>
                      <td className="py-2 px-3 md:py-3 md:px-4 text-right">Desde $50 USD</td>
                    </tr>
                    <tr>
                      <td colSpan={2} className="py-2 px-3 md:px-4 bg-gray-100 font-medium text-gray-800">
                        Precios referenciales. Se ajustan según alcance. Pago en USD o equivalente en Bs a tasa BCV.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* FAQ / Términos clave */}
            <div className="bg-gray-50 rounded-lg p-4 md:p-6">
              <h3 className="text-base md:text-lg font-semibold text-dark mb-4">Preguntas Frecuentes</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5 text-sm md:text-base">
                <div className="border-b border-dashed border-gray-300 pb-4 sm:border-none">
                  <h4 className="font-semibold text-primary mb-2">¿Cómo se gestiona el soporte?</h4>
                  <p className="text-gray-700">Canal dedicado con tiempos de respuesta acordados (SLA).</p>
                </div>
                <div className="border-b border-dashed border-gray-300 pb-4 sm:border-none">
                  <h4 className="font-semibold text-primary mb-2">¿Qué ocurre si cambia el alcance?</h4>
                  <p className="text-gray-700">Se re-estima el tiempo/costo y se aprueba por ambas partes.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center pt-6 mt-6 md:mt-8 border-t border-gray-200">
            <p className="text-gray-600 italic text-sm md:text-base">"Automatizamos tu crecimiento comercial"</p>
            <div className="text-primary font-bold text-base md:text-lg mt-2">Sin Límites Digital Agency</div>
            <p className="text-xs md:text-sm text-gray-500 mt-2">© {new Date().getFullYear()} - sinlimites_agency | http://www.sinlimites-agency.online/</p>
          </div>
        </div>
      </div>
    </>
  );
}
