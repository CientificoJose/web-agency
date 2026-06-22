"use client"

import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react"
import Image from "next/image"
import { useSearchParams } from "next/navigation"
import { Proposal, Credential, saveSignature } from "@/lib/actions"
import { SignatureBlock } from "@/components/proposals/signature-pad"
import { Mail, Calendar, CreditCard, Shield, AlertCircle, Check } from "lucide-react"

interface DynamicContractClientProps {
  proposal: Proposal
  credentials: Credential[]
}

type SignatureData = {
  image: string
  recordedAtISO: string
}

export default function DynamicContractClient({ proposal, credentials }: DynamicContractClientProps) {
  const displayFriendlyDate = (dateStr: string) => {
    if (!dateStr) return ""
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
      const [year, month, day] = dateStr.split("-").map(Number)
      const date = new Date(year, month - 1, day)
      return date.toLocaleDateString("es-ES", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    }
    return dateStr
  }

  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [hasStrokes, setHasStrokes] = useState(false)
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const [savingSignature, setSavingSignature] = useState(false)

  // Usar el estado de la base de datos para la firma del cliente
  const [dbSignature, setDbSignature] = useState<SignatureData | null>(
    proposal.signature_image
      ? {
          image: proposal.signature_image,
          recordedAtISO: proposal.signature_date || new Date().toISOString(),
        }
      : null
  )

  const searchParams = useSearchParams()
  const clearMode = searchParams.get("clear") === "true"
  const showSignaturePad = !dbSignature || clearMode

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) {
      return
    }

    const initializeCanvas = () => {
      const context = canvas.getContext("2d")
      if (!context) {
        return
      }

      const ratio = window.devicePixelRatio || 1
      const { clientWidth, clientHeight } = canvas

      canvas.width = clientWidth * ratio
      canvas.height = clientHeight * ratio

      context.setTransform(1, 0, 0, 1, 0, 0)
      context.scale(ratio, ratio)
      context.lineCap = "round"
      context.lineJoin = "round"
      context.lineWidth = 2
      context.strokeStyle = "#111827"
    }

    initializeCanvas()

    const handleResize = () => {
      initializeCanvas()
      setHasStrokes(false)
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [showSignaturePad])

  const handlePrint = () => {
    if (typeof window === "undefined") {
      return
    }

    const htmlElement = document.documentElement
    const bodyElement = document.body
    const originalHtmlClass = htmlElement.className
    const originalBodyClass = bodyElement.className

    htmlElement.classList.remove("dark")
    bodyElement.classList.remove("dark")

    htmlElement.style.backgroundColor = "white"
    bodyElement.style.backgroundColor = "white"

    window.print()

    setTimeout(() => {
      htmlElement.className = originalHtmlClass
      bodyElement.className = originalBodyClass
      htmlElement.style.backgroundColor = ""
      bodyElement.style.backgroundColor = ""
    }, 100)
  }

  const getCanvasCoordinates = (event: ReactPointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) {
      return { x: 0, y: 0 }
    }

    const rect = canvas.getBoundingClientRect()
    const scaleX = canvas.width / rect.width
    const scaleY = canvas.height / rect.height

    const x = (event.clientX - rect.left) * scaleX
    const y = (event.clientY - rect.top) * scaleY

    return { x, y }
  }

  const handlePointerDown = (event: ReactPointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) {
      return
    }

    const context = canvas.getContext("2d")
    if (!context) {
      return
    }

    setIsDrawing(true)
    setHasStrokes(true)

    const { x, y } = getCanvasCoordinates(event)

    context.beginPath()
    context.moveTo(x, y)
  }

  const handlePointerMove = (event: ReactPointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing) {
      return
    }

    const canvas = canvasRef.current
    if (!canvas) {
      return
    }

    const context = canvas.getContext("2d")
    if (!context) {
      return
    }

    const { x, y } = getCanvasCoordinates(event)

    context.lineTo(x, y)
    context.stroke()
  }

  const handlePointerUp = () => {
    setIsDrawing(false)
  }

  const handlePointerCancel = () => {
    setIsDrawing(false)
  }

  const handlePointerLeave = () => {
    if (isDrawing) {
      setIsDrawing(false)
    }
  }

  const handleSave = async () => {
    const canvas = canvasRef.current
    if (!canvas || !hasStrokes) {
      setStatusMessage({ type: "error", text: "Por favor, firme antes de guardar." })
      setTimeout(() => setStatusMessage(null), 3000)
      return
    }

    setSavingSignature(true)
    try {
      const dataURL = canvas.toDataURL("image/png")
      await saveSignature(proposal.id, dataURL)

      const signatureDateStr = new Date().toLocaleDateString("es-ES", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })

      setDbSignature({
        image: dataURL,
        recordedAtISO: signatureDateStr,
      })

      setStatusMessage({ type: "success", text: "Firma guardada en la base de datos exitosamente." })
      setTimeout(() => setStatusMessage(null), 3000)
    } catch (error) {
      console.error(error)
      setStatusMessage({ type: "error", text: "Error al guardar la firma en el servidor." })
      setTimeout(() => setStatusMessage(null), 3000)
    } finally {
      setSavingSignature(false)
    }
  }

  const handleClear = () => {
    const canvas = canvasRef.current
    if (!canvas) {
      return
    }

    const context = canvas.getContext("2d")
    if (!context) {
      return
    }

    context.clearRect(0, 0, canvas.width, canvas.height)
    setHasStrokes(false)
    setStatusMessage(null)
  }

  // Cargar características lógicas por plan
  const getFeatures = () => {
    if (proposal.features) {
      return proposal.features.split("\n").map(f => f.trim()).filter(Boolean)
    }

    if (proposal.plan_name === "Plan Básico") {
      return [
        "Hasta 3 cuentas de correo corporativo",
        "1 GB de almacenamiento total",
        "Configuración completa del servidor de correo",
        "Configuración de registros DNS (SPF, DKIM, DMARC)",
        "Webmail incluido (acceso desde navegador)",
        "Soporte técnico por email",
        "Protección anti-spam",
      ]
    }
    if (proposal.plan_name === "Plan Pyme") {
      return [
        "Hasta 10 cuentas de correo corporativo",
        "5 GB de almacenamiento total",
        "Configuración + migración de correos antiguos",
        "Soporte prioritario (WhatsApp)",
        "Webmail + IMAP/SMTP",
        "Configuración de registros DNS (SPF, DKIM, DMARC)",
        "Protección anti-spam",
      ]
    }
    if (proposal.plan_name === "Plan Corporativo") {
      return [
        "Hasta 25 cuentas de correo corporativo",
        "10 GB de almacenamiento total",
        "Migración completa + capacitación de personal",
        "Soporte 24/7 (WhatsApp + Email)",
        "Webmail + IMAP/SMTP + API de integración",
        "Configuración de registros DNS (SPF, DKIM, DMARC)",
        "Protección anti-spam avanzada",
      ]
    }
    // Por defecto
    return [
      "Servicio de Correo Corporativo Gestionado",
      "Configuración completa de servidor y registros DNS",
      "Soporte técnico y mantenimiento incluido",
      "Protección anti-spam activa",
    ]
  }

  const features = getFeatures()

  const signatureHolderName = proposal.client_name
  const signatureDate = dbSignature?.recordedAtISO

  const isSignatureLocked = !!dbSignature && !clearMode

  return (
    <div className="light min-h-screen bg-slate-100 py-8 print:bg-white print:py-0 text-slate-900">
      <div className="container mx-auto max-w-4xl px-4 print:px-0">
        <div className="mb-6 flex gap-4 print:hidden">
          <button
            onClick={handlePrint}
            className="rounded-lg bg-primary px-6 py-3 font-semibold text-white transition hover:bg-primary/90 cursor-pointer"
          >
            Imprimir Contrato
          </button>
        </div>

        <div className="rounded-lg bg-white p-8 shadow-lg print:shadow-none" style={{ backgroundColor: "white" }}>
          {/* Cabecera del Contrato */}
          <div className="mb-8 border-b border-gray-200 pb-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Contrato de Servicio</h1>
                <p className="mt-2 text-sm text-gray-600">
                  {proposal.service_name} - {proposal.client_company}
                </p>
              </div>
              <div className="text-center">
                <Image
                  src="/recurso.png"
                  alt="Sin Límites Agency"
                  width={120}
                  height={40}
                  className="h-10 w-auto"
                  priority
                />
                <p className="mt-1 text-xs font-semibold text-gray-700">Sin Límites</p>
              </div>
            </div>
          </div>

          {/* Datos Proveedor / Cliente */}
          <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <h3 className="mb-2 text-sm font-semibold text-gray-900">Proveedor del Servicio</h3>
              <p className="text-sm text-gray-700">Sin Límites Agency</p>
              <p className="text-sm text-gray-600">contact@sinlimites-agency.site</p>
              <p className="text-sm text-gray-600">+58 424 360 3846</p>
            </div>
            <div>
              <h3 className="mb-2 text-sm font-semibold text-gray-900">Cliente</h3>
              <p className="text-sm text-gray-700">{proposal.client_name}</p>
              <p className="text-sm text-gray-700">{proposal.client_company}</p>
              {proposal.client_domain && <p className="text-sm text-gray-600">{proposal.client_domain}</p>}
            </div>
          </div>

          {/* Resumen del Contrato */}
          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-bold text-gray-900 break-words">Resumen del Contrato</h2>
            <div className="rounded-lg border border-gray-200 bg-white p-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <p className="text-sm text-gray-600">Cliente</p>
                  <p className="font-semibold text-gray-900">{proposal.client_name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Empresa</p>
                  <p className="font-semibold text-gray-900">{proposal.client_company}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Servicio Contratado</p>
                  <p className="font-semibold text-gray-900">
                    {proposal.service_name} - {proposal.plan_name}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Dominio</p>
                  <p className="font-semibold text-gray-900">{proposal.client_domain || "No especificado"}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Fecha de Inicio</p>
                  <p className="font-semibold text-gray-900">{displayFriendlyDate(proposal.start_date)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Duración del Servicio</p>
                  <p className="font-semibold text-gray-950">{proposal.duration}</p>
                </div>
              </div>
            </div>
          </section>

          {/* Detalles del Servicio */}
          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-bold text-gray-900 break-words">Detalles del Servicio</h2>
            <div className="rounded-lg border border-gray-200 bg-white p-6">
              <h3 className="mb-4 text-lg font-semibold text-gray-900">
                {proposal.plan_name} - {proposal.duration}
              </h3>
              <ul className="space-y-3">
                {features.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                    <span className="text-gray-700">{feat}</span>
                  </li>
                ))}
              </ul>

              {proposal.domain_included === 1 && (
                <div className="mt-6 rounded-lg bg-blue-50 p-4">
                  <h4 className="mb-2 flex items-center gap-2 font-semibold text-blue-900">
                    <Mail className="h-5 w-5" />
                    Dominio Incluido
                  </h4>
                  <p className="text-sm text-blue-800">
                    Registro/mantenimiento del dominio <strong>{proposal.client_domain}</strong> (renovación anual)
                  </p>
                </div>
              )}
            </div>
          </section>

          {/* Factura */}
          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-bold text-gray-900 break-words">Factura</h2>
            <div className="rounded-lg border border-gray-200 bg-white p-4 md:p-6">
              <div className="mb-6">
                <p className="text-sm text-gray-600">Factura No.</p>
                <p className="text-lg font-bold text-gray-900">{proposal.invoice_number}</p>
              </div>

              <div className="overflow-x-auto -mx-4 md:mx-0">
                <div className="inline-block min-w-full align-middle px-4 md:px-0">
                  <table className="min-w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="pb-3 text-left text-xs md:text-sm font-semibold text-gray-900 whitespace-nowrap pr-4">
                          Concepto
                        </th>
                        <th className="pb-3 text-right text-xs md:text-sm font-semibold text-gray-900 whitespace-nowrap px-2">
                          Cant.
                        </th>
                        <th className="pb-3 text-right text-xs md:text-sm font-semibold text-gray-900 whitespace-nowrap px-2">
                          Precio
                        </th>
                        <th className="pb-3 text-right text-xs md:text-sm font-semibold text-gray-900 whitespace-nowrap pl-2">
                          Subtotal
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-100">
                        <td className="py-3 text-xs md:text-sm text-gray-700 pr-4">
                          <div className="max-w-[200px] md:max-w-none">
                            {proposal.service_name} - {proposal.plan_name}
                            <br />
                            <span className="text-xs text-gray-500 whitespace-nowrap">({proposal.duration})</span>
                          </div>
                        </td>
                        <td className="py-3 text-right text-xs md:text-sm text-gray-700 whitespace-nowrap px-2">1</td>
                        <td className="py-3 text-right text-xs md:text-sm text-gray-700 whitespace-nowrap px-2">
                          ${proposal.price.toFixed(2)}
                        </td>
                        <td className="py-3 text-right text-xs md:text-sm font-semibold text-gray-900 whitespace-nowrap pl-2">
                          ${proposal.price.toFixed(2)}
                        </td>
                      </tr>
                    </tbody>
                    <tfoot>
                      <tr className="border-t-2 border-gray-300">
                        <td colSpan={3} className="pt-4 text-right text-sm md:text-lg font-bold text-gray-900 pr-2">
                          Total
                        </td>
                        <td className="pt-4 text-right text-lg md:text-2xl font-bold text-primary whitespace-nowrap pl-2">
                          ${proposal.price.toFixed(2)}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>

              {proposal.payment_status === "PAGADO" && (
                <div className="mt-6 rounded-lg bg-emerald-50 p-4">
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5 text-emerald-600" />
                    <p className="font-semibold text-emerald-900">Estado de Pago: PAGADO</p>
                  </div>
                  <p className="mt-2 text-sm text-emerald-800">
                    Pago recibido {proposal.payment_date ? `el ${displayFriendlyDate(proposal.payment_date)}` : ""} por{" "}
                    <strong>
                      ${proposal.payment_amount.toFixed(2)} {proposal.payment_method}
                    </strong>
                  </p>
                </div>
              )}
            </div>
          </section>

          {/* Credenciales de Acceso */}
          {credentials.length > 0 && (
            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-bold text-gray-900 break-words">Credenciales de Acceso</h2>

              <div className="mb-4 rounded-lg border-2 border-orange-200 bg-orange-50 p-4">
                <div className="flex items-start gap-2">
                  <AlertCircle className="h-5 w-5 flex-shrink-0 text-orange-600 mt-0.5" />
                  <div>
                    <p className="font-semibold text-orange-900">⚠️ Importante: Sensible a Mayúsculas</p>
                    <p className="text-sm text-orange-800">
                      Los correos electrónicos deben escribirse exactamente en minúsculas al iniciar sesión. El sistema
                      distingue entre mayúsculas y minúsculas.
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
                <p className="text-sm text-blue-800 mb-2">Puede acceder a su correo desde cualquier navegador en:</p>
                <p className="font-mono text-sm font-bold text-blue-900">
                  https://mailserver.press-cloud.com/webmail
                </p>
              </div>
            </section>
          )}

          {/* Fechas Importantes */}
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
                    <p className="text-2xl font-bold text-primary">{displayFriendlyDate(proposal.start_date)}</p>
                    <p className="mt-1 text-sm text-gray-600">Fecha de activación del servicio contratado</p>
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
                    <p className="text-2xl font-bold text-orange-600">{displayFriendlyDate(proposal.service_expiration)}</p>
                    <p className="mt-1 text-sm text-orange-800">
                      El servicio vence después de {proposal.duration}. Para renovar, contacte con nosotros.
                    </p>
                  </div>
                </div>
              </div>

              {proposal.domain_included === 1 && proposal.domain_expiration && (
                <div className="rounded-lg border border-blue-200 bg-blue-50 p-6">
                  <div className="flex items-start gap-4">
                    <div className="rounded-full bg-blue-100 p-3">
                      <Calendar className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="mb-1 font-semibold text-blue-900">Vencimiento del Dominio</h3>
                      <p className="text-2xl font-bold text-blue-600">{displayFriendlyDate(proposal.domain_expiration)}</p>
                      <p className="mt-1 text-sm text-blue-800">El dominio debe renovarse anualmente.</p>
                    </div>
                  </div>
                </div>
              )}

              {proposal.suspension_date && (
                <div className="rounded-lg border border-red-200 bg-red-50 p-6">
                  <div className="flex items-start gap-4">
                    <div className="rounded-full bg-red-100 p-3">
                      <AlertCircle className="h-6 w-6 text-red-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="mb-1 font-semibold text-red-900">Política de Suspensión</h3>
                      <p className="text-sm text-red-800">
                        Si no se renueva el servicio antes de la fecha de vencimiento ({displayFriendlyDate(proposal.suspension_date)}), el
                        servicio será suspendido automáticamente.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Firma Block */}
          <SignatureBlock
            showSignaturePad={showSignaturePad}
            canvasRef={canvasRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerCancel}
            onPointerLeave={handlePointerLeave}
            onSave={handleSave}
            onClear={handleClear}
            statusMessage={statusMessage}
            signatureImage={dbSignature?.image}
            signatureHolderName={signatureHolderName}
            signatureDate={signatureDate}
            saveDisabled={!hasStrokes || savingSignature}
            clearDisabled={!hasStrokes || savingSignature}
            isSignatureLocked={isSignatureLocked}
          />
        </div>
      </div>
    </div>
  )
}
