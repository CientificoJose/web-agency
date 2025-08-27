'use client'

import { useEffect } from 'react';
import Script from 'next/script';
import Image from 'next/image';

const MermaidDiagram = ({ chart }: { chart: string }) => {
  useEffect(() => {
    if (typeof window !== 'undefined' && window.mermaid) {
      window.mermaid.contentLoaded();
    }
  }, [chart]);

  return <div className="mermaid">{chart}</div>;
};

export default function JgStoreProposalPage() {
  useEffect(() => {
    if (typeof window !== 'undefined' && window.mermaid) {
      window.mermaid.initialize({ startOnLoad: true, theme: 'default' });
      window.mermaid.contentLoaded();
    }
  }, []);

  const handlePrint = () => {
    window.print();
  };

  const mermaidChart = `
    graph LR
        A[Tienda Nube] --> B(Servidor de Sincronización)
        B --> C[MercadoLibre]
        C --> B
        B --> A
  `;

  return (
    <>
      <Script src="https://cdn.jsdelivr.net/npm/mermaid@10.6.1/dist/mermaid.min.js" strategy="afterInteractive" />

      <div className="bg-gray-100 flex justify-center items-start md:items-center p-0 md:p-4 print:p-0 font-sans min-h-screen">
        <button 
          onClick={handlePrint} 
          className="no-print fixed top-4 right-4 bg-primary text-white px-4 py-2 md:px-6 md:py-3 rounded-full shadow-lg hover:bg-primary-dark transition-all transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 z-50 text-sm md:text-base"
        >
          Imprimir
        </button>

        <div className="a4-container w-full md:w-[210mm] md:min-h-[297mm] bg-white md:shadow-xl relative overflow-hidden p-4 sm:p-6 md:p-[25mm] print:shadow-none print:p-[25mm]">
          {/* Watermark */}
          <div className="watermark absolute inset-0 opacity-10 -z-10"></div>
          
          {/* Header */}
          <div className="text-center pb-5 border-b-2 border-primary mb-6 md:mb-8 w-full">
            <Image src="/recurso.png" alt="Logo Sin Limites Agency" width={128} height={128} className="w-24 md:w-32 mb-2 mx-auto" />
            <h1 className="text-xl md:text-2xl font-bold text-dark">Sin Limites</h1>
            <h2 className="text-base md:text-lg text-primary">Agencia Digital</h2>
          </div>
          
          {/* Contact Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 mb-6 md:mb-8">
            <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-primary">
              <h3 className="font-semibold text-dark mb-2 text-base md:text-lg">CEO</h3>
              <p className="text-gray-700 text-sm md:text-base">José Nieves</p>
              <p className="text-gray-700 text-sm md:text-base">Teléfono: +58 424 360 3846</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-primary">
              <h3 className="font-semibold text-dark mb-2 text-base md:text-lg">Cliente</h3>
              <p className="text-gray-700 text-sm md:text-base">Gabriel Saad</p>
              <p className="text-gray-700 text-sm md:text-base">Fecha: 10 de julio de 2025</p>
            </div>
          </div>
          
          {/* Title */}
          <h2 className="text-lg md:text-xl font-bold text-dark mb-6 pb-2 border-b border-gray-200">Propuesta de Integración Tienda Nube - MercadoLibre</h2>
          
          {/* Sections Wrapper */}
          <div className="space-y-6 md:space-y-8">
            {/* Section 1 */}
            <div className="bg-gray-50 rounded-lg p-4 md:p-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
                <h3 className="text-base md:text-lg font-semibold text-dark">1. Implementación de Mejoras al Sistema de Scrapping</h3>
                <span className="bg-primary text-white px-3 py-1 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap">8 días hábiles</span>
              </div>
              <p className="text-gray-700 mb-4 text-sm md:text-base">Optimizar el proceso existente de importación de productos mediante correcciones técnicas y mejoras de rendimiento.</p>
              <div>
                <h4 className="font-medium text-dark mb-2 text-sm md:text-base">Entregables:</h4>
                <ul className="list-disc pl-5 text-gray-700 space-y-1 text-sm md:text-base">
                  <li>Actualización del módulo de scraping para manejo de errores</li>
                </ul>
              </div>
            </div>
            
            {/* Section 2 */}
            <div className="bg-gray-50 rounded-lg p-4 md:p-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
                <h3 className="text-base md:text-lg font-semibold text-dark">2. Desarrollo del Sistema de Automatización</h3>
                <span className="bg-primary text-white px-3 py-1 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap">15 días hábiles</span>
              </div>
              <p className="text-gray-700 mb-4 text-sm md:text-base">Crear integración bidireccional entre Tienda Nube y MercadoLibre para gestión centralizada de productos.</p>
              <div className="bg-white p-2 md:p-4 rounded-lg shadow-inner mb-6">
                <MermaidDiagram chart={mermaidChart} />
              </div>
              <div>
                <h4 className="font-medium text-dark mb-2 text-sm md:text-base">Entregables:</h4>
                <ul className="list-disc pl-5 text-gray-700 space-y-1 text-sm md:text-base">
                  <li>Módulo de sincronización de stock en tiempo real</li>
                  <li>Panel de control para gestión de publicaciones</li>
                  <li>Selector de tipo de publicación (categoría/tradicional)</li>
                </ul>
              </div>
            </div>
            
            {/* Section 3 */}
            <div className="bg-gray-50 rounded-lg p-4 md:p-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
                <h3 className="text-base md:text-lg font-semibold text-dark">3. Pruebas y Ajustes Finales</h3>
                <span className="bg-primary text-white px-3 py-1 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap">7 días hábiles</span>
              </div>
              <p className="text-gray-700 mb-4 text-sm md:text-base">Garantizar el funcionamiento óptimo del sistema integrado.</p>
              <div>
                <h4 className="font-medium text-dark mb-2 text-sm md:text-base">Entregables:</h4>
                <ul className="list-disc pl-5 text-gray-700 space-y-1 text-sm md:text-base">
                  <li>Pruebas de estrés y carga simulada</li>
                  <li>Validación de escenarios de error</li>
                  <li>Ajustes de rendimiento</li>
                  <li>Documentación de usuario final</li>
                  <li>Capacitación básica para el equipo del cliente</li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Cost Section */}
          <div className="mt-6 md:mt-8">
            <h2 className="text-lg md:text-xl font-bold text-dark mb-4 pb-2 border-b border-gray-200">Costo de Implementación</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white text-sm md:text-base">
                <thead className="bg-primary text-white">
                  <tr>
                    <th className="text-left py-2 px-3 md:py-3 md:px-4 font-semibold">Concepto</th>
                    <th className="text-right py-2 px-3 md:py-3 md:px-4 font-semibold">Costo</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  <tr>
                    <td colSpan={2} className="py-2 px-3 md:px-4 bg-blue-50 font-semibold">Desarrollo del Sistema</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 px-3 md:py-3 md:px-4">Mejoras al sistema de scraping</td>
                    <td className="py-2 px-3 md:py-3 md:px-4 text-right">$63.33</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 px-3 md:py-3 md:px-4">Desarrollo integración Tienda Nube-ML</td>
                    <td className="py-2 px-3 md:py-3 md:px-4 text-right">$63.33</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 px-3 md:py-3 md:px-4">Pruebas y ajustes finales</td>
                    <td className="py-2 px-3 md:py-3 md:px-4 text-right">$63.33</td>
                  </tr>
                  <tr className="bg-blue-50">
                    <td className="py-2 px-3 md:py-3 md:px-4 font-semibold">Total Desarrollo</td>
                    <td className="py-2 px-3 md:py-3 md:px-4 text-right font-semibold">$189.99</td>
                  </tr>
                  <tr>
                    <td colSpan={2} className="py-2 px-3 md:px-4 bg-blue-50 font-semibold">Costo Mensual Recurrente</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 md:py-3 md:px-4">Funcionamiento optimo del sistema 24/7</td>
                    <td className="py-2 px-3 md:py-3 md:px-4 text-right">$19.99/mes</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          
          {/* Abonos Recibidos */}
          <div className="mt-6 md:mt-8">
            <h3 className="text-base md:text-lg font-semibold text-dark mb-4">Abonos Recibidos</h3>
            <div className="space-y-4">
              <div className="bg-green-50 border-l-4 border-green-500 text-green-800 p-4 rounded-lg">
                <p className="font-semibold text-sm md:text-base">Abono recibido el 25/06/2025.</p>
                <ul className="list-disc pl-5 mt-2 text-sm md:text-base">
                  <li>Monto en Bolívares: <strong>4.255,00 Bs.</strong></li>
                  <li>Tasa de Cambio (USDT): <strong>142,40 Bs.</strong></li>
                  <li>Equivalente en USD: <strong>$29.88</strong></li>
                </ul>
              </div>
              <div className="bg-green-50 border-l-4 border-green-500 text-green-800 p-4 rounded-lg">
                <p className="font-semibold text-sm md:text-base">Abono recibido el 30/06/2025.</p>
                <ul className="list-disc pl-5 mt-2 text-sm md:text-base">
                  <li>Monto en Bolívares: <strong>4.620,00 Bs.</strong></li>
                  <li>Tasa de Cambio (USDT): <strong>140,10 Bs.</strong></li>
                  <li>Equivalente en USD: <strong>$32.98</strong></li>
                </ul>
              </div>
              <div className="bg-green-50 border-l-4 border-green-500 text-green-800 p-4 rounded-lg">
                <p className="font-semibold text-sm md:text-base">Abono recibido el 23/07/2025.</p>
                <ul className="list-disc pl-5 mt-2 text-sm md:text-base">
                  <li>Monto en Bolívares: <strong>4.860,00 Bs.</strong></li>
                  <li>Tasa de Cambio (USDT): <strong>160,40 Bs.</strong></li>
                  <li>Equivalente en USD: <strong>$30.30</strong></li>
                </ul>
              </div>
              <div className="bg-green-50 border-l-4 border-green-500 text-green-800 p-4 rounded-lg">
                <p className="font-semibold text-sm md:text-base">Abono recibido el 05/08/2025.</p>
                <ul className="list-disc pl-5 mt-2 text-sm md:text-base">
                  <li>Monto en Bolívares: <strong>5.596,00 Bs.</strong></li>
                  <li>Tasa de Cambio (USDT): <strong>171,59 Bs.</strong></li>
                  <li>Equivalente en USD: <strong>$32.55</strong></li>
                </ul>
              </div>
            </div>
          </div>

          {/* Payment Plan */}
          <div className="mt-6 md:mt-8">
            <h3 className="text-base md:text-lg font-semibold text-dark mb-4">Esquema de Pagos</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
              <div className="bg-blue-50 rounded-lg p-4 md:p-5 text-center">
                <h4 className="font-medium text-dark mb-2 md:mb-3">Primer Pago</h4>
                <div className="text-xl md:text-2xl font-bold text-primary mb-2">$63.33</div>
                <p className="text-sm text-green-600 font-medium">Abonado: $63.33</p>
                <p className="text-sm text-green-600 font-medium">Pagado</p>
                <p className="text-xs md:text-sm text-gray-600 mt-2">1. Implementación de Mejoras al Sistema de Scrapping</p>
              </div>
              <div className="bg-blue-50 rounded-lg p-4 md:p-5 text-center">
                <h4 className="font-medium text-dark mb-2 md:mb-3">Segundo Pago</h4>
                <div className="text-xl md:text-2xl font-bold text-primary mb-2">$63.33</div>
                <p className="text-sm text-green-600 font-medium">Abonado: $29.83</p>
                <p className="text-sm text-red-600 font-medium">Restante: $33.50</p>
                <p className="text-xs md:text-sm text-gray-600 mt-2">2. Desarrollo del Sistema de Automatización</p>
              </div>
              <div className="bg-blue-50 rounded-lg p-4 md:p-5 text-center">
                <h4 className="font-medium text-dark mb-2 md:mb-3">Tercer Pago</h4>
                <div className="text-xl md:text-2xl font-bold text-primary mb-2">$63.33</div>
                <p className="text-xs md:text-sm text-gray-600 mt-2">3. Pruebas y Ajustes Finales</p>
              </div>
            </div>
          </div>
          
          {/* Terms & Conditions */}
          <div className="mt-6 md:mt-8">
            <h2 className="text-lg md:text-xl font-bold text-dark mb-4 pb-2 border-b border-gray-200">Términos y Condiciones</h2>
            <div className="bg-gray-50 rounded-lg p-4 md:p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5 text-sm md:text-base">
                  <div className="border-b border-dashed border-gray-300 pb-4 sm:border-none">
                      <h4 className="font-semibold text-primary mb-2">1. Plazo de Ejecución</h4>
                      <p className="text-gray-700">30 días hábiles a partir del primer pago</p>
                  </div>
                  <div className="border-b border-dashed border-gray-300 pb-4 sm:border-none">
                      <h4 className="font-semibold text-primary mb-2">2. Formas de Pago</h4>
                      <p className="text-gray-700">Criptomonedas (USDT - Red TRON recomendada), transferencia bancaria (Tasa paralelo), efectivo dólares</p>
                  </div>
                  <div className="border-b border-dashed border-gray-300 pb-4 sm:border-none">
                      <h4 className="font-semibold text-primary mb-2">3. Confidencialidad</h4>
                      <p className="text-gray-700">Toda información compartida será protegida bajo acuerdo</p>
                  </div>
                  <div className="border-b border-dashed border-gray-300 pb-4 sm:border-none">
                      <h4 className="font-semibold text-primary mb-2">4. Propiedad Intelectual</h4>
                      <p className="text-gray-700">El código fuente permanece como propiedad del Cliente</p>
                  </div>
                  <div className="border-b border-dashed border-gray-300 pb-4 sm:border-none">
                      <h4 className="font-semibold text-primary mb-2">5. Costo Mensual</h4>
                      <p className="text-gray-700">Incluye servidor cloud, monitoreo 24/7 y actualizaciones de seguridad</p>
                  </div>
                  <div className="border-b border-dashed border-gray-300 pb-4 sm:border-none">
                      <h4 className="font-semibold text-primary mb-2">6. Cambios de Alcance</h4>
                      <p className="text-gray-700">Requerirán ajuste presupuestario y temporal</p>
                  </div>
                  <div className="border-b border-dashed border-gray-300 pb-4 sm:border-none">
                      <h4 className="font-semibold text-primary mb-2">7. API MercadoLibre</h4>
                      <p className="text-gray-700">Uso inicial en modalidad gratuita</p>
                  </div>
                  <div className="border-b border-dashed border-gray-300 pb-4 sm:border-none">
                      <h4 className="font-semibold text-primary mb-2">8. Soporte</h4>
                      <p className="text-gray-700">15 días de garantía para corrección de bugs</p>
                  </div>
              </div>
            </div>
          </div>
          
          {/* Footer */}
          <div className="text-center pt-6 mt-6 md:mt-8 border-t border-gray-200">
            <p className="text-gray-600 italic text-sm md:text-base">"Automatizamos tu crecimiento comercial"</p>
            <div className="text-primary font-bold text-base md:text-lg mt-2">Sin Límites Digital Agency</div>
            <p className="text-xs md:text-sm text-gray-500 mt-2">© 2025 - sinlimites_agency | http://www.sinlimites-agency.online/</p>
          </div>
        </div>
      </div>
    </>
  );
}