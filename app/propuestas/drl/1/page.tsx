'use client'


import Image from 'next/image';

export default function DrlProposalPage() {

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
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
              <p className="text-gray-700 text-sm md:text-base">DRL</p>
              <p className="text-gray-700 text-sm md:text-base">Fecha: 10 de julio de 2025</p>
            </div>
          </div>
          
          {/* Title */}
          <h2 className="text-lg md:text-xl font-bold text-dark mb-6 pb-2 border-b border-gray-200">Propuesta de Valor: Agente Virtual Inteligente para Potenciar su Negocio en WhatsApp</h2>
          
          {/* Sections Wrapper */}
          <div className="space-y-6 md:space-y-8">
            <p className='text-gray-700 text-sm md:text-base'>En el dinámico mercado actual, una interacción ágil y personalizada con sus clientes es esencial para el crecimiento. Presentamos nuestra solución de <strong>Agente Virtual inteligente</strong>, diseñado para transformar la atención al cliente de sus sucursales en WhatsApp, optimizando sus operaciones, impulsando sus ventas y mejorando la satisfacción de sus clientes.</p>
            <p className='text-gray-700 text-sm md:text-base'>Nuestro Agente Virtual va más allá de un chatbot básico. Desarrollado con <strong>n8n</strong>, una potente plataforma de automatización de código abierto, le ofrecemos una extensión de su negocio: siempre activa, siempre informada y capaz de brindar asistencia de alto nivel.</p>

            {/* Section 1 */}
            <div className="bg-gray-50 rounded-lg p-4 md:p-6">
              <h3 className="text-base md:text-lg font-semibold text-dark mb-4">¿Qué es un Agente Virtual y por qué lo necesita?</h3>
              <p className="text-gray-700 mb-4 text-sm md:text-base">Un Agente Virtual es una herramienta de Inteligencia Artificial conversacional que simula una conversación humana para atender a sus clientes de forma automática. Sus principales beneficios son:</p>
              <ul className="list-disc pl-5 text-gray-700 space-y-2 text-sm md:text-base">
                <li><strong>Disponibilidad 24/7, 365 días al año:</strong> Sus clientes recibirán atención instantánea en cualquier momento, incluso fuera del horario comercial, fines de semana y feriados. ¡Nunca perderá una oportunidad de venta por falta de respuesta!</li>
                <li><strong>Eficiencia Operativa:</strong> Libera a su equipo de ventas y atención al cliente de tareas repetitivas, permitiéndoles enfocarse en interacciones de mayor valor, seguimiento de leads y cierre de ventas complejas.</li>
                <li><strong>Escalabilidad:</strong> A medida que su negocio crezca y añada más sucursales, nuestro agente virtual se adapta sin problemas, garantizando una solución robusta y centralizada para todas sus operaciones.</li>
                <li><strong>Mejora la Experiencia del Cliente:</strong> Ofrece un servicio moderno, rápido y conveniente a través de su canal de comunicación preferido, WhatsApp, lo que genera mayor satisfacción y fidelidad.</li>
              </ul>
            </div>

            {/* Section 2 */}
            <div className="bg-gray-50 rounded-lg p-4 md:p-6">
              <h3 className="text-base md:text-lg font-semibold text-dark mb-4">Funcionalidades Clave de Nuestro Agente Virtual</h3>
              <p className="text-gray-700 mb-4 text-sm md:text-base">Nuestro agente está diseñado para ofrecer una experiencia completa y avanzada:</p>
              <ol className="list-decimal pl-5 text-gray-700 space-y-3 text-sm md:text-base">
                <li><strong>Respuestas Precisas sobre Inventario y Disponibilidad (Conexión con su ERP):</strong> Se conecta directamente a su sistema de gestión de recursos empresariales (<strong>ERP</strong>), permitiendo ofrecer información en <strong>tiempo real</strong> sobre disponibilidad de productos, precios y ubicaciones.</li>
                <li><strong>Atención Personalizada Basada en el Historial del Cliente (Conexión con su CRM):</strong> Se integra con su sistema de gestión de relaciones con clientes (<strong>CRM</strong>) para acceder al historial de compras y preferencias, brindando una atención contextual.</li>
                <li><strong>Recomendaciones de Productos Personalizadas:</strong> Sugiere productos complementarios o alternativos, actuando como un "asesor de ventas virtual".</li>
                <li><strong>Gestión Inteligente de Preguntas Frecuentes (FAQs):</strong> Responde instantáneamente a las preguntas más comunes de forma conversacional y natural.</li>
                <li><strong>Captura de Leads y Calificación:</strong> Recopila datos clave y califica el lead, notificando a su equipo para un seguimiento oportuno.</li>
                <li><strong>Integración Fluida con Agente Humano (Handoff):</strong> Escala la conversación a un agente humano con el historial completo del chat para una transición sin interrupciones.</li>
                <li><strong>Recopilación de Feedback Post-Interacción:</strong> Solicita una calificación o comentario sobre la experiencia para la mejora continua.</li>
              </ol>
            </div>

            {/* Section 3 */}
            <div className="bg-gray-50 rounded-lg p-4 md:p-6">
              <h3 className="text-base md:text-lg font-semibold text-dark mb-4">Integración con sus Sistemas Actuales</h3>
              <p className="text-gray-700 mb-4 text-sm md:text-base">Para garantizar la eficiencia, es fundamental la integración con sus sistemas:</p>
              <ul className="list-disc pl-5 text-gray-700 space-y-2 text-sm md:text-base">
                <li><strong>¿Cuenta con un Sistema ERP?</strong> Por favor, indíquenos si utiliza un ERP para gestionar su inventario (ej. SAP, Odoo, etc.).</li>
                <li><strong>¿Cuenta con un Sistema CRM?</strong> Infórmenos si ya utiliza un CRM (ej. Salesforce, Zoho, etc.). Si no, podemos recomendarle e implementar <strong>SuiteCRM</strong>, un sistema de código abierto, robusto y personalizable.</li>
              </ul>
            </div>

            {/* Section 4 */}
            <div className="bg-gray-50 rounded-lg p-4 md:p-6">
              <h3 className="text-base md:text-lg font-semibold text-dark mb-4">Proceso de Implementación y Tiempos</h3>
              <p className="text-gray-700 text-sm md:text-base">Una vez confirmada la viabilidad de integración, el proceso será ágil. El tiempo estimado, incluyendo configuración, pruebas y capacitación, oscila entre <strong>10 y 25 días hábiles</strong>.</p>
            </div>
          </div>

          {/* Cost Section */}
          <div className="mt-6 md:mt-8">
            <h2 className="text-lg md:text-xl font-bold text-dark mb-4 pb-2 border-b border-gray-200">Inversión y Modelo de Precios</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white text-sm md:text-base">
                <thead className="bg-primary text-white">
                  <tr>
                    <th className="text-left py-2 px-3 md:py-3 md:px-4 font-semibold">Concepto</th>
                    <th className="text-right py-2 px-3 md:py-3 md:px-4 font-semibold">Costo Mensual</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  <tr className="border-b border-gray-100">
                    <td className="py-2 px-3 md:py-3 md:px-4">Precio Base del Servicio</td>
                    <td className="py-2 px-3 md:py-3 md:px-4 text-right">$200 USD</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 px-3 md:py-3 md:px-4">Por Sucursal Adicional</td>
                    <td className="py-2 px-3 md:py-3 md:px-4 text-right">$50 USD</td>
                  </tr>
                  <tr className="bg-blue-50">
                    <td className="py-2 px-3 md:py-3 md:px-4 font-semibold">Oferta Especial para 3 Sucursales</td>
                    <td className="py-2 px-3 md:py-3 md:px-4 text-right font-semibold">$200 USD</td>
                  </tr>
                  <tr>
                    <td colSpan={2} className="py-2 px-3 md:px-4 bg-gray-100 font-medium text-gray-800">El servicio incluye hasta <strong>10.000 conversaciones mensuales</strong>.</td>
                  </tr>
                </tbody>
              </table>
              <p className='text-xs text-gray-500 mt-2'>* Los precios pueden ser pagados en su equivalente en Bolívares a la tasa oficial del BCV.</p>
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
