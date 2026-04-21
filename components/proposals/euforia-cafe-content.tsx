import { Check, Mail, Calendar, CreditCard, Shield, AlertCircle } from "lucide-react"

export function EuforiaCafeSummarySection() {
  return (
    <section className="mb-8">
      <h2 className="mb-4 text-2xl font-bold text-gray-900 break-words">Resumen del Contrato</h2>
      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <p className="text-sm text-gray-600">Cliente</p>
            <p className="font-semibold text-gray-900">Euforia Café</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Empresa</p>
            <p className="font-semibold text-gray-900">Euforia Café</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Servicio Contratado</p>
            <p className="font-semibold text-gray-900">Correo Corporativo - Plan Premium (5 Años)</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Dominio</p>
            <p className="font-semibold text-gray-900">euforiacafe.com</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Fecha de Inicio</p>
            <p className="font-semibold text-gray-900">17 de Abril, 2026</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Duración del Servicio</p>
            <p className="font-semibold text-gray-900">5 años (Hasta 2031)</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export function EuforiaCafeServiceSection() {
  return (
    <section className="mb-8">
      <h2 className="mb-4 text-2xl font-bold text-gray-900 break-words">Detalles del Servicio</h2>
      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <h3 className="mb-4 text-lg font-semibold text-gray-900">Plan Premium - 5 Años</h3>
        <ul className="space-y-3">
          <li className="flex items-start gap-3">
            <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
            <span className="text-gray-700">Hasta 3 cuentas de correo corporativo</span>
          </li>
          <li className="flex items-start gap-3">
            <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
            <span className="text-gray-700">5 GB de almacenamiento total (Expandible)</span>
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
            <span className="text-gray-700">Soporte técnico prioritario</span>
          </li>
          <li className="flex items-start gap-3">
            <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
            <span className="text-gray-700">Protección anti-spam y anti-virus avanzada</span>
          </li>
        </ul>

        <div className="mt-6 rounded-lg bg-blue-50 p-4">
          <h4 className="mb-2 flex items-center gap-2 font-semibold text-blue-900">
            <Mail className="h-5 w-5" />
            Dominio Incluido
          </h4>
          <p className="text-sm text-blue-800">
            Mantenimiento y gestión del dominio <strong>euforiacafe.com</strong> incluido por el periodo del contrato.
          </p>
        </div>
      </div>
    </section>
  )
}

export function EuforiaCafeInvoiceSection() {
  return (
    <section className="mb-8">
      <h2 className="mb-4 text-2xl font-bold text-gray-900 break-words">Factura</h2>
      <div className="rounded-lg border border-gray-200 bg-white p-4 md:p-6">
        <div className="mb-6">
          <p className="text-sm text-gray-600">Factura No.</p>
          <p className="text-lg font-bold text-gray-900">EUF-2026-001</p>
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
                      Plan Premium - Correo Corporativo
                      <br />
                      <span className="text-xs text-gray-500 whitespace-nowrap">(5 años - Pago Único)</span>
                    </div>
                  </td>
                  <td className="py-3 text-right text-xs md:text-sm text-gray-700 whitespace-nowrap px-2">1</td>
                  <td className="py-3 text-right text-xs md:text-sm text-gray-700 whitespace-nowrap px-2">$539.58</td>
                  <td className="py-3 text-right text-xs md:text-sm font-semibold text-gray-900 whitespace-nowrap pl-2">$539.58</td>
                </tr>
              </tbody>
              <tfoot>
                <tr className="border-t-2 border-gray-300">
                  <td colSpan={3} className="pt-4 text-right text-sm md:text-lg font-bold text-gray-900 pr-2">
                    Total
                  </td>
                  <td className="pt-4 text-right text-lg md:text-2xl font-bold text-primary whitespace-nowrap pl-2">$539.58</td>
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
            Pago recibido el 17/04/2026 por <strong>512.6 USDT</strong> vía Binance (Neto tras comisiones)
          </p>
        </div>
      </div>
    </section>
  )
}

export function EuforiaCafeCredentialsSection() {
  const credentials = [
    {
      email: "chef@euforiacafe.com",
      password: "EuforiaChef*/2031",
      description: "Cuenta de Chef",
    },
    {
      email: "gerencia@euforiacafe.com",
      password: "EuforiaGerencia*/2031",
      description: "Cuenta de Gerencia",
    },
    {
      email: "admin@euforiacafe.com",
      password: "EuforiaAdmin*/2031",
      description: "Cuenta de Administración",
    },
  ]

  return (
    <section className="mb-8">
      <h2 className="mb-4 text-2xl font-bold text-gray-900 break-words">Credenciales de Acceso</h2>
      
      <div className="mb-4 rounded-lg border-2 border-orange-200 bg-orange-50 p-4">
        <div className="flex items-start gap-2">
          <AlertCircle className="h-5 w-5 flex-shrink-0 text-orange-600 mt-0.5" />
          <div>
            <p className="font-semibold text-orange-900">⚠️ Importante: Sensible a Mayúsculas</p>
            <p className="text-sm text-orange-800">
              Los correos electrónicos deben escribirse <strong>exactamente en minúsculas</strong> al iniciar sesión. El sistema distingue entre mayúsculas y minúsculas.
            </p>
          </div>
        </div>
      </div>

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
      </div>
    </section>
  )
}

export function EuforiaCafeConfigurationSection() {
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
            Ingrese con su <strong>correo completo en minúsculas</strong> y contraseña.
          </p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <h3 className="mb-4 text-lg font-semibold text-gray-900 break-words">📧 Configuración General</h3>
          <p className="mb-4 text-sm text-gray-700">
            Use los siguientes parámetros para configurar su correo en Gmail, Outlook o Móvil:
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export function EuforiaCafeDatesSection() {
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
              <p className="text-2xl font-bold text-primary">17 de Abril, 2026</p>
              <p className="mt-1 text-sm text-gray-600">Fecha de activación del contrato de 5 años</p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-orange-200 bg-orange-50 p-6">
          <div className="flex items-start gap-4">
            <div className="rounded-full bg-orange-100 p-3">
              <Calendar className="h-6 w-6 text-orange-600" />
            </div>
            <div className="flex-1">
              <h3 className="mb-1 font-semibold text-orange-900">Vencimiento del Servicio</h3>
              <p className="text-2xl font-bold text-orange-600">17 de Abril, 2031</p>
              <p className="mt-1 text-sm text-orange-800">
                El contrato de 5 años vence en esta fecha. La renovación debe gestionarse con antelación.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export function EuforiaCafeTermsSection() {
  return (
    <section className="mb-8">
      <h2 className="mb-4 text-2xl font-bold text-gray-900 break-words">Términos y Condiciones</h2>
      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <div className="space-y-4 text-sm text-gray-700">
          <div>
            <h3 className="mb-2 font-semibold text-gray-900">1. Vigencia del Contrato</h3>
            <p>
              Este contrato tiene una duración de 5 años, comenzando desde la fecha de pago y activación.
            </p>
          </div>
          <div>
            <h3 className="mb-2 font-semibold text-gray-900">2. Uso Aceptable</h3>
            <p>
              El cliente se compromete a utilizar el servicio de correo corporativo únicamente para fines legítimos. Prohibido el SPAM o actividades ilegales.
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
