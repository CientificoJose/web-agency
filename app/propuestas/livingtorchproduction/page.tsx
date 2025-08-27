'use client'

import Image from 'next/image'

export default function LivingTorchProposalPage() {
  const handlePrint = () => {
    window.print()
  }

  return (
    <>
      <div className="bg-gray-100 flex justify-center items-start md:items-center p-0 md:p-4 print:p-0 font-sans min-h-screen">
        <button
          onClick={handlePrint}
          className="no-print fixed top-4 right-4 bg-primary text-white px-4 py-2 md:px-6 md:py-3 rounded-full shadow-lg hover:bg-primary/90 transition-all transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 z-50 text-sm md:text-base"
        >
          Imprimir
        </button>

        <div className="a4-container w-full md:w-[210mm] md:min-h-[297mm] bg-white md:shadow-xl relative overflow-hidden p-4 sm:p-6 md:p-[25mm] print:shadow-none print:p-[25mm]">
          {/* Watermark */}
          <div className="watermark absolute inset-0 opacity-10 -z-10" />

          {/* Header */}
          <div className="text-center pb-5 border-b-2 border-primary mb-6 md:mb-8 w-full">
            <Image
              src="/recurso.png"
              alt="Logo Limitless Agency"
              width={128}
              height={128}
              className="w-24 md:w-32 mb-2 mx-auto"
            />
            <h1 className="text-xl md:text-2xl font-bold text-dark">Sin Límites</h1>
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
              <p className="text-gray-700 text-sm md:text-base">LivingTorchProduction</p>
              <p className="text-gray-700 text-sm md:text-base">Fecha: 27 de agosto de 2025</p>
            </div>
          </div>

          {/* Title */}
          <h2 className="text-lg md:text-xl font-bold text-dark mb-6 pb-2 border-b border-gray-200">
            Propuesta de Sistema de Registro de Asistentes y Generación de Códigos QR para Eventos
          </h2>


          {/* Section 1: Objetivo Principal */}
          <div className="bg-gray-50 rounded-lg p-4 md:p-6 mb-6">
            <h3 className="text-base md:text-lg font-semibold text-dark mb-3">1. Objetivo Principal</h3>
            <p className="text-gray-700 text-sm md:text-base">
              Desarrollar un sistema web para optimizar y asegurar el proceso de registro de asistentes a
              eventos. El sistema busca automatizar la generación de códigos QR únicos y personalizados
              después de la confirmación de un pago, centralizando la información de los participantes en
              una base de datos para facilitar un control de acceso rápido, eficiente y a prueba de fraudes
              el día del evento.
            </p>
          </div>

          {/* Section 2: Flujo de Trabajo */}
          <div className="bg-gray-50 rounded-lg p-4 md:p-6 mb-6">
            <h3 className="text-base md:text-lg font-semibold text-dark mb-4">2. Descripción del Flujo de Trabajo</h3>
            <p className="text-gray-700 mb-3">El proceso se dividiría en tres fases claras:</p>

            {/* Fase 1 */}
            <div className="mb-5">
              <h4 className="font-semibold text-dark mb-2">Fase 1: Venta y Confirmación de Pago (Proceso Manual)</h4>
              <ol className="list-decimal pl-5 text-gray-700 space-y-2 text-sm md:text-base">
                <li>
                  <strong>Contacto Inicial:</strong> El cliente contacta al equipo de taquillería a través de
                  WhatsApp para solicitar la compra de un número específico de entradas (ej: 5 entradas VIP).
                </li>
                <li>
                  <strong>Instrucciones de Pago:</strong> Taquillería proporciona al cliente el monto total a pagar
                  y los datos de la cuenta bancaria.
                </li>
                <li>
                  <strong>Realización del Pago:</strong> El cliente efectúa el pago y envía el comprobante a taquillería
                  por el mismo medio.
                </li>
                <li>
                  <strong>Confirmación y Código de Acceso:</strong> Una vez que el equipo de taquillería confirma la
                  recepción del pago, genera un Código de Acceso Único. Este código es la clave que valida que el
                  pago para un número determinado de entradas fue exitoso.
                </li>
                <li>
                  <strong>Envío al Cliente:</strong> Taquillería envía al cliente dos cosas: (1) el enlace a la plataforma
                  de registro online y (2) su Código de Acceso Único.
                </li>
              </ol>
            </div>

            {/* Fase 2 */}
            <div className="mb-5">
              <h4 className="font-semibold text-dark mb-2">Fase 2: Registro en la Plataforma y Generación del QR (El Sistema a Desarrollar)</h4>
              <ol className="list-decimal pl-5 text-gray-700 space-y-2 text-sm md:text-base">
                <li>
                  <strong>Acceso a la Plataforma:</strong> El cliente ingresa al enlace proporcionado por taquillería.
                </li>
                <li>
                  <strong>Formulario de Registro:</strong> El cliente completa un formulario con sus datos personales:
                  Nombre y Apellido, Número de Cédula, Número de Teléfono, Correo Electrónico, y el <em>Código de Acceso Único</em> recibido.
                </li>
                <li>
                  <strong>Envío y Validación:</strong> Al enviar, el sistema valida internamente que el Código de Acceso sea
                  correcto y no haya sido utilizado previamente.
                </li>
                <li>
                  <strong>Generación del Código QR:</strong> Tras validación exitosa, la plataforma genera automáticamente un QR
                  único y personal, asociado a los datos del cliente y a la cantidad de entradas pagadas (vinculadas al
                  Código de Acceso).
                </li>
                <li>
                  <strong>Base de Datos Centralizada:</strong> La información del registro se almacena automáticamente en una base
                  de datos central (similar a Google Sheets o Excel) a la que el organizador tiene acceso, para control en
                  tiempo real.
                </li>
              </ol>
            </div>

            {/* Fase 3 */}
            <div>
              <h4 className="font-semibold text-dark mb-2">Fase 3: Control de Acceso el Día del Evento</h4>
              <ol className="list-decimal pl-5 text-gray-700 space-y-2 text-sm md:text-base">
                <li>
                  <strong>Llegada del Asistente:</strong> Presenta su Código QR (en teléfono o impreso) junto con su cédula.
                </li>
                <li>
                  <strong>Verificación:</strong> El personal de logística escanea el QR desde una laptop o tablet con la plataforma,
                  o busca manualmente por nombre o cédula.
                </li>
                <li>
                  <strong>Confirmación de Datos:</strong> El sistema muestra nombre, cédula y el número de entradas que le corresponden
                  (ej: "Patricia Pérez, C.I. 12.345.678, 5 brazaletes VIP").
                </li>
                <li>
                  <strong>Entrega de Brazaletes:</strong> Tras validar identidad, se entregan los brazaletes correspondientes.
                </li>
              </ol>
            </div>
          </div>


          {/* Footer */}
          <div className="text-center pt-6 mt-6 md:mt-8 border-t border-gray-200">
            <p className="text-gray-600 italic text-sm md:text-base">"No Hay Límites para Crear"</p>
            <div className="text-primary font-bold text-base md:text-lg mt-2">Sin Límites Digital Agency</div>
            <p className="text-xs md:text-sm text-gray-500 mt-2">© 2025 - sinlimites_agency | http://www.sinlimites-agency.online/</p>
          </div>
        </div>
      </div>
    </>
  )
}
