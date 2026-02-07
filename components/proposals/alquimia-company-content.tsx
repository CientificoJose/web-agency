import { Check, Mail, Calendar, CreditCard, Shield, AlertCircle } from "lucide-react"

export function AlquimiaCompanySummarySection() {
  return (
    <section className="mb-8">
      <h2 className="mb-4 text-2xl font-bold text-gray-900 break-words">Resumen del Contrato</h2>
      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <p className="text-sm text-gray-600">Cliente</p>
            <p className="font-semibold text-gray-900">Valentina Alvarez</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Empresa</p>
            <p className="font-semibold text-gray-900">Alquimia Company</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Servicio Contratado</p>
            <p className="font-semibold text-gray-900">Correo Corporativo - Plan Básico</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Dominio</p>
            <p className="font-semibold text-gray-900">alquimiaCompany.com</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Fecha de Inicio</p>
            <p className="font-semibold text-gray-900">05 de Febrero, 2026</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Duración del Servicio</p>
            <p className="font-semibold text-gray-900">3 meses</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export function AlquimiaCompanyServiceSection() {
  return (
    <section className="mb-8">
      <h2 className="mb-4 text-2xl font-bold text-gray-900 break-words">Detalles del Servicio</h2>
      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <h3 className="mb-4 text-lg font-semibold text-gray-900">Plan Básico - 3 Meses</h3>
        <ul className="space-y-3">
          <li className="flex items-start gap-3">
            <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
            <span className="text-gray-700">Hasta 3 cuentas de correo corporativo</span>
          </li>
          <li className="flex items-start gap-3">
            <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
            <span className="text-gray-700">1 GB de almacenamiento total</span>
          </li>
          <li className="flex items-start gap-3">
            <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
            <span className="text-gray-700">Configuración completa del servidor de correo</span>
          </li>
          <li className="flex items-start gap-3">
            <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
            <span className="text-gray-700">Configuración de registros DNS (SPF, DKIM, DMARC)</span>
          </li>
          <li className="flex items-start gap-3">
            <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
            <span className="text-gray-700">Webmail incluido (acceso desde navegador)</span>
          </li>
          <li className="flex items-start gap-3">
            <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
            <span className="text-gray-700">Soporte técnico por email</span>
          </li>
          <li className="flex items-start gap-3">
            <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
            <span className="text-gray-700">Protección anti-spam</span>
          </li>
        </ul>

        <div className="mt-6 rounded-lg bg-blue-50 p-4">
          <h4 className="mb-2 flex items-center gap-2 font-semibold text-blue-900">
            <Mail className="h-5 w-5" />
            Dominio Incluido
          </h4>
          <p className="text-sm text-blue-800">
            Registro del dominio <strong>alquimiaCompany.com</strong> por 1 año (renovación anual)
          </p>
        </div>
      </div>
    </section>
  )
}

export function AlquimiaCompanyInvoiceSection() {
  return (
    <section className="mb-8">
      <h2 className="mb-4 text-2xl font-bold text-gray-900 break-words">Factura</h2>
      <div className="rounded-lg border border-gray-200 bg-white p-4 md:p-6">
        <div className="mb-6">
          <p className="text-sm text-gray-600">Factura No.</p>
          <p className="text-lg font-bold text-gray-900">ALQ-2026-001</p>
        </div>

        <div className="overflow-x-auto -mx-4 md:mx-0">
          <div className="inline-block min-w-full align-middle px-4 md:px-0">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="pb-3 text-left text-xs md:text-sm font-semibold text-gray-900 whitespace-nowrap pr-4">Concepto</th>
                  <th className="pb-3 text-right text-xs md:text-sm font-semibold text-gray-900 whitespace-nowrap px-2">Cant.</th>
                  <th className="pb-3 text-right text-xs md:text-sm font-semibold text-gray-900 whitespace-nowrap px-2">Precio</th>
                  <th className="pb-3 text-right text-xs md:text-sm font-semibold text-gray-900 whitespace-nowrap pl-2">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-3 text-xs md:text-sm text-gray-700 pr-4">
                    <div className="max-w-[200px] md:max-w-none">
                      Plan Básico - Correo Corporativo
                      <br />
                      <span className="text-xs text-gray-500 whitespace-nowrap">(3 meses)</span>
                    </div>
                  </td>
                  <td className="py-3 text-right text-xs md:text-sm text-gray-700 whitespace-nowrap px-2">1</td>
                  <td className="py-3 text-right text-xs md:text-sm text-gray-700 whitespace-nowrap px-2">$29.97</td>
                  <td className="py-3 text-right text-xs md:text-sm font-semibold text-gray-900 whitespace-nowrap pl-2">$29.97</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 text-xs md:text-sm text-gray-700 pr-4">
                    <div className="max-w-[200px] md:max-w-none">
                      Dominio alquimiaCompany.com
                      <br />
                      <span className="text-xs text-gray-500 whitespace-nowrap">(1 año)</span>
                    </div>
                  </td>
                  <td className="py-3 text-right text-xs md:text-sm text-gray-700 whitespace-nowrap px-2">1</td>
                  <td className="py-3 text-right text-xs md:text-sm text-gray-700 whitespace-nowrap px-2">$15.00</td>
                  <td className="py-3 text-right text-xs md:text-sm font-semibold text-gray-900 whitespace-nowrap pl-2">$15.00</td>
                </tr>
              </tbody>
              <tfoot>
                <tr className="border-t-2 border-gray-300">
                  <td colSpan={3} className="pt-4 text-right text-sm md:text-lg font-bold text-gray-900 pr-2">
                    Total
                  </td>
                  <td className="pt-4 text-right text-lg md:text-2xl font-bold text-primary whitespace-nowrap pl-2">$44.97</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        <div className="mt-6 rounded-lg bg-emerald-50 p-4">
          <div className="flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-emerald-600" />
            <p className="font-semibold text-emerald-900">Estado de Pago: PAGADO</p>
          </div>
          <p className="mt-2 text-sm text-emerald-800">
            Pago recibido el 05/02/2026 por <strong>$44.97 USDT</strong> vía Binance
          </p>
        </div>
      </div>
    </section>
  )
}

export function AlquimiaCompanyCredentialsSection() {
  const credentials = [
    {
      email: "Chef@alquimiaCompany.com",
      password: "AlquimiacompanyChef2026",
      description: "Cuenta de Chef",
    },
    {
      email: "Gerencia@alquimiaCompany.com",
      password: "AlquimiacompanyGerencia2026",
      description: "Cuenta de Gerencia",
    },
    {
      email: "Admin@alquimiaCompany.com",
      password: "Alquimiacompany2026",
      description: "Cuenta de Administración",
    },
  ]

  return (
    <section className="mb-8">
      <h2 className="mb-4 text-2xl font-bold text-gray-900 break-words">Credenciales de Acceso</h2>
    

      <div className="space-y-4">
        {credentials.map((cred, idx) => (
          <div key={idx} className="rounded-lg border border-gray-200 bg-white p-6">
            <h3 className="mb-3 font-semibold text-gray-900">{cred.description}</h3>
            <div className="space-y-2">
              <div>
                <p className="text-xs text-gray-600">Correo Electrónico</p>
                <p className="font-mono text-sm font-semibold text-gray-900">{cred.email}</p>
              </div>
              <div>
                <p className="text-xs text-gray-600">Contraseña</p>
                <p className="font-mono text-sm font-semibold text-gray-900">{cred.password}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-lg border border-blue-200 bg-blue-50 p-4">
        <h4 className="mb-2 font-semibold text-blue-900">Acceso al Webmail</h4>
        <p className="text-sm text-blue-800 mb-2">
          Puede acceder a su correo desde cualquier navegador en:
        </p>
        <p className="font-mono text-sm font-bold text-blue-900">https://mailserver.press-cloud.com/webmail</p>
        <p className="mt-3 text-xs text-blue-700">
          También puede configurar su correo en Gmail, Outlook, Thunderbird o la app de correo de su móvil. Vea las
          instrucciones de configuración más abajo.
        </p>
      </div>
    </section>
  )
}

export function AlquimiaCompanyConfigurationSection() {
  return (
    <section className="mb-8">
      <h2 className="mb-4 text-2xl font-bold text-gray-900 break-words">Instrucciones de Configuración</h2>
      
      <div className="mb-6 rounded-lg border-2 border-emerald-300 bg-emerald-50 p-6">
        <h3 className="mb-2 flex items-center gap-2 text-lg font-bold text-emerald-900">
          ✅ Acceso Webmail (Más Rápido)
        </h3>
        <p className="mb-3 text-sm text-emerald-800">
          La forma más rápida de acceder a su correo sin configuración adicional:
        </p>
        <div className="rounded-lg bg-white p-4">
          <p className="mb-2 text-sm font-semibold text-gray-900">Acceso Webmail:</p>
          <p className="font-mono text-lg font-bold text-emerald-600">https://mailserver.press-cloud.com/webmail</p>
          <p className="mt-2 text-xs text-gray-600">
            Ingrese con su correo completo y contraseña. Funciona desde cualquier navegador sin configuración adicional.
          </p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <h3 className="mb-4 text-lg font-semibold text-gray-900 break-words">📧 Configuración en Gmail</h3>
          
          <p className="mb-4 text-sm text-gray-700">
            Proceso simple para enviar y recibir correos desde su cuenta corporativa en Gmail:
          </p>
          
          <div className="space-y-4">
            <div>
              <h4 className="mb-3 font-semibold text-gray-900">Pasos para Configurar</h4>
              <ol className="ml-6 list-decimal space-y-3 text-sm text-gray-700">
                <li>
                  <strong>Abra Gmail</strong> en su navegador web
                </li>
                <li>
                  Haga clic en el ícono de <strong>configuración (⚙️)</strong> en la esquina superior derecha
                </li>
                <li>
                  Seleccione <strong>"Ver todos los ajustes"</strong>
                </li>
                <li>
                  Vaya a la pestaña <strong>"Cuentas e importación"</strong>
                </li>
                <li>
                  En la sección <strong>"Enviar correo como"</strong>, haga clic en <strong>"Añadir otra dirección de correo electrónico"</strong>
                </li>
                <li>
                  En la ventana emergente:
                  <ul className="ml-6 mt-2 list-disc space-y-1">
                    <li>Ingrese su <strong>nombre</strong> (ej: Chef de Alquimia Company)</li>
                    <li>Ingrese su <strong>correo corporativo completo</strong> (ej: <code>Chef@alquimiaCompany.com</code>)</li>
                    <li>Marque <strong>"Tratar como alias"</strong> ✓</li>
                    <li>Haga clic en <strong>"Siguiente paso"</strong></li>
                  </ul>
                </li>
                <li>
                  Configure el servidor SMTP con estos datos:
                </li>
              </ol>

              <div className="mt-3 rounded-lg bg-gray-50 p-4">
                <div className="grid gap-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Servidor SMTP:</span>
                    <span className="font-mono font-semibold text-gray-900">mailserver.press-cloud.com</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Puerto:</span>
                    <span className="font-mono font-semibold text-gray-900">587</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Nombre de usuario:</span>
                    <span className="font-mono font-semibold text-gray-900">Su correo completo</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Contraseña:</span>
                    <span className="font-mono font-semibold text-gray-900">Su contraseña</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Conexión segura:</span>
                    <span className="font-mono font-semibold text-emerald-600">TLS ✓</span>
                  </div>
                </div>
              </div>

              <ol start={8} className="ml-6 mt-4 list-decimal space-y-3 text-sm text-gray-700">
                <li>
                  Haga clic en <strong>"Agregar cuenta"</strong>
                </li>
                <li>
                  Gmail enviará un <strong>código de verificación</strong> a su correo corporativo 📨
                </li>
                <li>
                  Revise su correo en el <strong>Webmail</strong> y copie el código
                </li>
                <li>
                  Pegue el código en Gmail y haga clic en <strong>"Verificar"</strong>
                </li>
              </ol>
            </div>

            <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
              <p className="text-sm text-blue-800">
                💡 <strong>Tip:</strong> Este proceso configura automáticamente tanto el <strong>envío</strong> como la 
                <strong> recepción</strong> de correos. No necesita configurar POP3/IMAP por separado.
              </p>
            </div>

            <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4">
              <h4 className="mb-2 font-semibold text-emerald-900">🎉 ¡Listo!</h4>
              <p className="text-sm text-emerald-800">
                Ahora puede <strong>enviar y recibir</strong> correos desde su cuenta corporativa directamente en Gmail. 
                Los correos llegarán automáticamente a su bandeja de entrada.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <h3 className="mb-4 text-lg font-semibold text-gray-900 break-words">Configuración en Outlook / Thunderbird / Móvil</h3>
          <p className="mb-4 text-sm text-gray-700">
            Use los mismos parámetros de servidor para configurar su correo en cualquier cliente:
          </p>
          
          <div className="space-y-4">
            <div className="rounded-lg bg-gray-50 p-4">
              <h4 className="mb-3 font-semibold text-gray-900">Servidor de Entrada (IMAP)</h4>
              <div className="grid gap-2 text-sm">
                <div className="flex gap-2">
                  <span className="w-32 text-gray-600">Servidor:</span>
                  <span className="font-mono font-semibold text-gray-900">mailserver.press-cloud.com</span>
                </div>
                <div className="flex gap-2">
                  <span className="w-32 text-gray-600">Puerto:</span>
                  <span className="font-mono font-semibold text-gray-900">993</span>
                </div>
                <div className="flex gap-2">
                  <span className="w-32 text-gray-600">Cifrado:</span>
                  <span className="font-mono font-semibold text-gray-900">SSL/TLS</span>
                </div>
              </div>
            </div>

            <div className="rounded-lg bg-gray-50 p-4">
              <h4 className="mb-3 font-semibold text-gray-900">Servidor de Salida (SMTP)</h4>
              <div className="grid gap-2 text-sm">
                <div className="flex gap-2">
                  <span className="w-32 text-gray-600">Servidor:</span>
                  <span className="font-mono font-semibold text-gray-900">mailserver.press-cloud.com</span>
                </div>
                <div className="flex gap-2">
                  <span className="w-32 text-gray-600">Puerto:</span>
                  <span className="font-mono font-semibold text-gray-900">587</span>
                </div>
                <div className="flex gap-2">
                  <span className="w-32 text-gray-600">Cifrado:</span>
                  <span className="font-mono font-semibold text-gray-900">STARTTLS</span>
                </div>
                <div className="flex gap-2">
                  <span className="w-32 text-gray-600">Autenticación:</span>
                  <span className="font-mono font-semibold text-gray-900">Sí (usar mismas credenciales)</span>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4">
              <p className="text-sm text-yellow-800">
                <strong>Nota:</strong> En todos los casos, use su correo completo como nombre de usuario (ej:
                Chef@alquimiaCompany.com) y la contraseña proporcionada en la sección de credenciales.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4">
          <h4 className="mb-2 font-semibold text-emerald-900">¿Necesita Ayuda?</h4>
          <p className="text-sm text-emerald-800">
            Si tiene problemas configurando su correo, contáctenos a{" "}
            <strong>contact@sinlimites-agency.site</strong> o por WhatsApp al <strong>+58 424 360 3846</strong> y le
            asistiremos con gusto.
          </p>
        </div>
      </div>
    </section>
  )
}

export function AlquimiaCompanyDatesSection() {
  return (
    <section className="mb-8">
      <h2 className="mb-4 text-2xl font-bold text-gray-900 break-words">Fechas Importantes</h2>
      <div className="space-y-4">
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <div className="flex items-start gap-4">
            <div className="rounded-full bg-emerald-100 p-3">
              <Calendar className="h-6 w-6 text-emerald-600" />
            </div>
            <div className="flex-1">
              <h3 className="mb-1 font-semibold text-gray-900">Inicio del Servicio</h3>
              <p className="text-2xl font-bold text-primary">05 de Febrero, 2026</p>
              <p className="mt-1 text-sm text-gray-600">Fecha de activación del servicio de correo corporativo</p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-orange-200 bg-orange-50 p-6">
          <div className="flex items-start gap-4">
            <div className="rounded-full bg-orange-100 p-3">
              <Calendar className="h-6 w-6 text-orange-600" />
            </div>
            <div className="flex-1">
              <h3 className="mb-1 font-semibold text-orange-900">Vencimiento del Servicio de Correo</h3>
              <p className="text-2xl font-bold text-orange-600">05 de Mayo, 2026</p>
              <p className="mt-1 text-sm text-orange-800">
                El servicio de correo corporativo vence después de 3 meses. Para renovar, contacte con nosotros antes
                de esta fecha.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-blue-200 bg-blue-50 p-6">
          <div className="flex items-start gap-4">
            <div className="rounded-full bg-blue-100 p-3">
              <Calendar className="h-6 w-6 text-blue-600" />
            </div>
            <div className="flex-1">
              <h3 className="mb-1 font-semibold text-blue-900">Vencimiento del Dominio</h3>
              <p className="text-2xl font-bold text-blue-600">05 de Febrero, 2027</p>
              <p className="mt-1 text-sm text-blue-800">
                El dominio alquimiaCompany.com debe renovarse anualmente. Le enviaremos un recordatorio 30 días antes
                del vencimiento.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-red-200 bg-red-50 p-6">
          <div className="flex items-start gap-4">
            <div className="rounded-full bg-red-100 p-3">
              <AlertCircle className="h-6 w-6 text-red-600" />
            </div>
            <div className="flex-1">
              <h3 className="mb-1 font-semibold text-red-900">Política de Suspensión</h3>
              <p className="text-sm text-red-800">
                Si no se renueva el servicio antes de la fecha de vencimiento (05/05/2026), el servicio de correo será
                suspendido automáticamente. Los correos no podrán ser enviados ni recibidos hasta que se realice el
                pago de renovación.
              </p>
              <p className="mt-2 text-sm text-red-800">
                <strong>Importante:</strong> Los datos se conservarán por 45 días adicionales después de la suspensión.
                Pasado este período, los correos y configuraciones podrían ser eliminados permanentemente.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export function AlquimiaCompanyTermsSection() {
  return (
    <section className="mb-8">
      <h2 className="mb-4 text-2xl font-bold text-gray-900 break-words">Términos y Condiciones</h2>
      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <div className="space-y-4 text-sm text-gray-700">
          <div>
            <h3 className="mb-2 font-semibold text-gray-900">1. Uso Aceptable</h3>
            <p>
              El cliente se compromete a utilizar el servicio de correo corporativo únicamente para fines legítimos y
              profesionales. Queda estrictamente prohibido:
            </p>
            <ul className="ml-6 mt-2 list-disc space-y-1">
              <li>Envío de correo masivo no solicitado (spam)</li>
              <li>Actividades de phishing o suplantación de identidad</li>
              <li>Distribución de malware o contenido malicioso</li>
              <li>Cualquier actividad ilegal o que viole derechos de terceros</li>
            </ul>
          </div>

          <div>
            <h3 className="mb-2 font-semibold text-gray-900">2. Responsabilidad del Cliente</h3>
            <p>
              El cliente es responsable de mantener la confidencialidad de sus credenciales de acceso y de todas las
              actividades realizadas bajo sus cuentas de correo.
            </p>
          </div>

          <div>
            <h3 className="mb-2 font-semibold text-gray-900">3. Renovación y Cancelación</h3>
            <p>
              El servicio no se renueva automáticamente. El cliente debe contactar con nosotros antes de la fecha de
              vencimiento para renovar el servicio. La cancelación debe notificarse con al menos 7 días de anticipación.
            </p>
          </div>

          <div>
            <h3 className="mb-2 font-semibold text-gray-900">4. Suspensión del Servicio</h3>
            <p>
              Nos reservamos el derecho de suspender el servicio inmediatamente y sin previo aviso en caso de:
            </p>
            <ul className="ml-6 mt-2 list-disc space-y-1">
              <li>Violación de los términos de uso aceptable</li>
              <li>Actividades que comprometan la seguridad o reputación de nuestros servidores</li>
              <li>Falta de pago en la fecha de renovación</li>
            </ul>
          </div>

          <div>
            <h3 className="mb-2 font-semibold text-gray-900">5. Respaldo de Datos</h3>
            <p>
              Aunque realizamos respaldos regulares, recomendamos que el cliente mantenga copias locales de sus correos
              importantes. No nos hacemos responsables por pérdida de datos debido a fallas técnicas o eliminación
              accidental.
            </p>
          </div>

          <div>
            <h3 className="mb-2 font-semibold text-gray-900">6. Soporte Técnico</h3>
            <p>
              El soporte técnico se proporciona por email durante horario laboral (Lunes a Viernes, 9:00 AM - 6:00 PM).
              Tiempo de respuesta estimado: 24-48 horas.
            </p>
          </div>

          <div>
            <h3 className="mb-2 font-semibold text-gray-900">7. Modificaciones</h3>
            <p>
              Nos reservamos el derecho de modificar estos términos con previo aviso de 15 días. El uso continuado del
              servicio después de la notificación constituye aceptación de los nuevos términos.
            </p>
          </div>

          <div className="mt-6 rounded-lg border border-gray-300 bg-gray-50 p-4">
            <div className="flex items-start gap-2">
              <Shield className="h-5 w-5 flex-shrink-0 text-gray-600 mt-0.5" />
              <p className="text-xs text-gray-600">
                Al firmar este contrato, el cliente declara haber leído, entendido y aceptado todos los términos y
                condiciones aquí establecidos.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
