'use client'

import { useEffect, useState } from 'react';
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
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    setCurrentDate(now.toLocaleDateString('es-ES', options));

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

      <div className="bg-gray-100 flex justify-center items-center p-4 print:p-0 font-sans">
        <button 
          onClick={handlePrint} 
          className="no-print fixed top-4 right-4 bg-primary text-white px-6 py-3 rounded-full shadow-lg hover:bg-primary-dark transition-all transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 z-50"
        >
          Imprimir Propuesta
        </button>

        <div className="a4-container w-[210mm] min-h-[297mm] bg-white shadow-xl relative overflow-hidden p-[25mm] print:shadow-none">
          {/* Watermark */}
          <div className="watermark absolute inset-0 opacity-10 -z-10"></div>
          
          {/* Header */}
          <div className="text-center pb-5 border-b-2 border-primary mb-8 w-full">
            <Image src="/recurso.png" alt="Logo Sin Limites Agency" width={128} height={128} className="w-32 mb-2 mx-auto" />
            <h1 className="text-2xl font-bold text-dark">Sin Limites</h1>
            <h2 className="text-lg text-primary">Agencia Digital</h2>
          </div>
          
          {/* Contact Info */}
          <div className="grid grid-cols-2 gap-5 mb-8">
            <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-primary">
              <h3 className="font-semibold text-dark mb-2">CEO</h3>
              <p className="text-gray-700">José Nieves</p>
              <p className="text-gray-700">Teléfono: +58 424 360 3846</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-primary">
              <h3 className="font-semibold text-dark mb-2">Cliente</h3>
              <p className="text-gray-700">Gabriel Saad</p>
              <p className="text-gray-700">Fecha: <span id="current-date">{currentDate}</span></p>
            </div>
          </div>
          
          {/* Title */}
          <h2 className="text-xl font-bold text-dark mb-6 pb-2 border-b border-gray-200">Propuesta de Integración Tienda Nube - MercadoLibre</h2>
          
          {/* Section 1 */}
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-dark">1. Implementación de Mejoras al Sistema de Scrapping</h3>
              <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">8 días hábiles</span>
            </div>
            <p className="text-gray-700 mb-4">Optimizar el proceso existente de importación de productos mediante correcciones técnicas y mejoras de rendimiento.</p>
            <div>
              <h4 className="font-medium text-dark mb-2">Entregables:</h4>
              <ul className="list-disc pl-5 text-gray-700 space-y-1">
                <li>Actualización del módulo de scraping para manejo de errores</li>
              </ul>
            </div>
          </div>
          
          {/* Section 2 */}
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-dark">2. Desarrollo del Sistema de Automatización</h3>
              <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">15 días hábiles</span>
            </div>
            <p className="text-gray-700 mb-4">Crear integración bidireccional entre Tienda Nube y MercadoLibre para gestión centralizada de productos.</p>
            <div className="bg-white p-4 rounded-lg shadow-inner mb-6">
              <MermaidDiagram chart={mermaidChart} />
            </div>
            <div>
              <h4 className="font-medium text-dark mb-2">Entregables:</h4>
              <ul className="list-disc pl-5 text-gray-700 space-y-1">
                <li>Módulo de sincronización de stock en tiempo real</li>
                <li>Panel de control para gestión de publicaciones</li>
                <li>Selector de tipo de publicación (categoría/tradicional)</li>
              </ul>
            </div>
          </div>
          
          {/* Section 3 */}
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-dark">3. Pruebas y Ajustes Finales</h3>
              <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">7 días hábiles</span>
            </div>
            <p className="text-gray-700 mb-4">Garantizar el funcionamiento óptimo del sistema integrado.</p>
            <div>
              <h4 className="font-medium text-dark mb-2">Entregables:</h4>
              <ul className="list-disc pl-5 text-gray-700 space-y-1">
                <li>Pruebas de estrés y carga simulada</li>
                <li>Validación de escenarios de error</li>
                <li>Ajustes de rendimiento</li>
                <li>Documentación de usuario final</li>
                <li>Capacitación básica para el equipo del cliente</li>
              </ul>
            </div>
          </div>
          
          {/* Cost Section */}
          <h2 className="text-xl font-bold text-dark mb-4 pb-2 border-b border-gray-200">Costo de Implementación</h2>
          <div className="overflow-x-auto mb-8">
            <table className="min-w-full bg-white rounded-lg overflow-hidden">
              <thead className="bg-primary text-white">
                <tr>
                  <th className="text-left py-3 px-4 font-semibold">Concepto</th>
                  <th className="text-right py-3 px-4 font-semibold">Costo</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                <tr>
                  <td colSpan={2} className="py-2 px-4 bg-blue-50 font-semibold">Desarrollo del Sistema</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4">Mejoras al sistema de scraping</td>
                  <td className="py-3 px-4 text-right">$63.33</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4">Desarrollo integración Tienda Nube-ML</td>
                  <td className="py-3 px-4 text-right">$63.33</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4">Pruebas y ajustes finales</td>
                  <td className="py-3 px-4 text-right">$63.33</td>
                </tr>
                <tr className="bg-blue-50">
                  <td className="py-3 px-4 font-semibold">Total Desarrollo</td>
                  <td className="py-3 px-4 text-right font-semibold">$189.99</td>
                </tr>
                <tr>
                  <td colSpan={2} className="py-2 px-4 bg-blue-50 font-semibold">Costo Mensual Recurrente</td>
                </tr>
                <tr>
                  <td className="py-3 px-4">Funcionamiento optimo del sistema 24/7</td>
                  <td className="py-3 px-4 text-right">$19.99/mes</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          {/* Abono Recibido */}
          <h3 className="text-lg font-semibold text-dark mb-4">Abono Recibido</h3>
          <div className="bg-green-50 border-l-4 border-green-500 text-green-800 p-4 rounded-lg mb-8">
            <p className="font-semibold">Se recibió un abono el 25/06/2025.</p>
            <ul className="list-disc pl-5 mt-2">
              <li>Monto en Bolívares: <strong>4.255,00 Bs.</strong></li>
              <li>Tasa de Cambio (USDT): <strong>142,40 Bs.</strong></li>
              <li>Equivalente en USD: <strong>$29.88</strong></li>
            </ul>
          </div>

          {/* Payment Plan */}
          <h3 className="text-lg font-semibold text-dark mb-4">Esquema de Pagos</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
            <div className="bg-blue-50 rounded-lg p-5 text-center">
              <h4 className="font-medium text-dark mb-3">Primer Pago</h4>
              <div className="text-2xl font-bold text-primary mb-2">$63.33</div>
              <p className="text-sm text-green-600 font-medium">Abonado: $29.88</p>
              <p className="text-sm text-red-600 font-medium">Restante: $33.45</p>
              <p className="text-sm text-gray-600">1. Implementación de Mejoras al Sistema de Scrapping</p>
            </div>
            <div className="bg-blue-50 rounded-lg p-5 text-center">
              <h4 className="font-medium text-dark mb-3">Segundo Pago</h4>
              <div className="text-2xl font-bold text-primary mb-2">$63.33</div>
              <p className="text-sm text-gray-600">2. Desarrollo del Sistema de Automatización</p>
            </div>
            <div className="bg-blue-50 rounded-lg p-5 text-center">
              <h4 className="font-medium text-dark mb-3">Tercer Pago</h4>
              <div className="text-2xl font-bold text-primary mb-2">$63.33</div>
              <p className="text-sm text-gray-600">3. Pruebas y Ajustes Finales</p>
            </div>
          </div>
          
          {/* Terms & Conditions */}
          <h2 className="text-xl font-bold text-dark mb-4 pb-2 border-b border-gray-200">Términos y Condiciones</h2>
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="border-b border-dashed border-gray-300 pb-4">
                    <h4 className="font-semibold text-primary mb-2">1. Plazo de Ejecución</h4>
                    <p className="text-gray-700">30 días hábiles a partir del primer pago</p>
                </div>
                <div className="border-b border-dashed border-gray-300 pb-4">
                    <h4 className="font-semibold text-primary mb-2">2. Formas de Pago</h4>
                    <p className="text-gray-700">Criptomonedas (USDT - Red TRON recomendada), transferencia bancaria (Tasa paralelo), efectivo dólares</p>
                </div>
                <div className="border-b border-dashed border-gray-300 pb-4">
                    <h4 className="font-semibold text-primary mb-2">3. Confidencialidad</h4>
                    <p className="text-gray-700">Toda información compartida será protegida bajo acuerdo</p>
                </div>
                <div className="border-b border-dashed border-gray-300 pb-4">
                    <h4 className="font-semibold text-primary mb-2">4. Propiedad Intelectual</h4>
                    <p className="text-gray-700">El código fuente permanece como propiedad del Cliente</p>
                </div>
                <div className="border-b border-dashed border-gray-300 pb-4">
                    <h4 className="font-semibold text-primary mb-2">5. Costo Mensual</h4>
                    <p className="text-gray-700">Incluye servidor cloud, monitoreo 24/7 y actualizaciones de seguridad</p>
                </div>
                <div className="border-b border-dashed border-gray-300 pb-4">
                    <h4 className="font-semibold text-primary mb-2">6. Cambios de Alcance</h4>
                    <p className="text-gray-700">Requerirán ajuste presupuestario y temporal</p>
                </div>
                <div className="border-b border-dashed border-gray-300 pb-4">
                    <h4 className="font-semibold text-primary mb-2">7. API MercadoLibre</h4>
                    <p className="text-gray-700">Uso inicial en modalidad gratuita</p>
                </div>
                <div className="border-b border-dashed border-gray-300 pb-4">
                    <h4 className="font-semibold text-primary mb-2">8. Soporte</h4>
                    <p className="text-gray-700">15 días de garantía para corrección de bugs</p>
                </div>
            </div>
          </div>
          
          {/* Footer */}
          <div className="text-center pt-6 border-t border-gray-200">
            <p className="text-gray-600 italic">"Automatizamos tu crecimiento comercial"</p>
            <div className="text-primary font-bold text-lg mt-2">Sin Límites Digital Agency</div>
            <p className="text-sm text-gray-500 mt-2">© 2025 - sinlimites_agency | http://www.sinlimites-agency.online/</p>
          </div>
        </div>
      </div>
    </>
  );
}