"use client"

import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react"
import { useSearchParams } from "next/navigation"
import { Proposal, Credential, ProposalService, ProposalPayment, ProposalCollaborator, saveSignature, getSettings } from "@/lib/actions"
import { SignatureBlock } from "@/components/proposals/signature-pad"
import { Mail, Calendar, CreditCard, Shield, AlertCircle, Check, Users, ShieldAlert, Award, FileText } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface DynamicContractClientProps {
  proposal: Proposal
  credentials: Credential[]
  services: ProposalService[]
  payments: ProposalPayment[]
  collaborators: ProposalCollaborator[]
}

type SignatureData = {
  image: string
  recordedAtISO: string
}

export default function DynamicContractClient({
  proposal,
  credentials,
  services,
  payments,
  collaborators
}: DynamicContractClientProps) {
  const [globalSettings, setGlobalSettings] = useState<Record<string, string>>({})
  const [activeTab, setActiveTab] = useState("servicios")

  // Cargar Ajustes Globales
  useEffect(() => {
    getSettings().then(setGlobalSettings)
  }, [])

  // Colores e Identidad Dinámica
  const primaryColor = proposal.brand_color_primary || globalSettings.color_primary || "#ff6600"
  const secondaryColor = proposal.brand_color_secondary || globalSettings.color_secondary || "#0f172a"
  const logoUrl = proposal.brand_logo_url || globalSettings.brand_logo || "/recurso.png"
  const brandName = globalSettings.brand_name || "Sin Límites"

  const displayFriendlyDate = (dateStr: string | undefined) => {
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
  const isSigned = !!dbSignature && !clearMode

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const initializeCanvas = () => {
      const context = canvas.getContext("2d")
      if (!context) return

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
    return () => window.removeEventListener("resize", handleResize)
  }, [showSignaturePad])

  const handlePrint = () => {
    if (typeof window === "undefined") return
    window.print()
  }

  const getCanvasCoordinates = (event: ReactPointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return { x: 0, y: 0 }

    const rect = canvas.getBoundingClientRect()
    const scaleX = canvas.width / rect.width
    const scaleY = canvas.height / rect.height
    return {
      x: (event.clientX - rect.left) * scaleX,
      y: (event.clientY - rect.top) * scaleY
    }
  }

  const handlePointerDown = (event: ReactPointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const context = canvas.getContext("2d")
    if (!context) return

    setIsDrawing(true)
    setHasStrokes(true)
    const { x, y } = getCanvasCoordinates(event)
    context.beginPath()
    context.moveTo(x, y)
  }

  const handlePointerMove = (event: ReactPointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return
    const canvas = canvasRef.current
    if (!canvas) return
    const context = canvas.getContext("2d")
    if (!context) return

    const { x, y } = getCanvasCoordinates(event)
    context.lineTo(x, y)
    context.stroke()
  }

  const handlePointerUp = () => setIsDrawing(false)
  const handlePointerCancel = () => setIsDrawing(false)
  const handlePointerLeave = () => isDrawing && setIsDrawing(false)

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
    if (!canvas) return
    const context = canvas.getContext("2d")
    if (!context) return
    context.clearRect(0, 0, canvas.width, canvas.height)
    setHasStrokes(false)
    setStatusMessage(null)
  }

  // Calcular morosidad y recargos no exponenciales
  const getDelinquencyDetails = (service: ProposalService) => {
    if (service.billing_type !== 'RECURRENT' || service.status === 'SUSPENDED') return null
    if (!service.expiration_date) return null

    const expDate = new Date(service.expiration_date + "T00:00:00")
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    if (today <= expDate) return null // No vencido

    const diffTime = Math.abs(today.getTime() - expDate.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    const gDays = proposal.grace_days || 0
    if (diffDays <= gDays) {
      return {
        isDelinquent: false,
        daysOverdue: diffDays,
        daysRemainingGrace: gDays - diffDays,
        lateFee: 0
      }
    }

    const lateFeePct = proposal.late_fee_percentage || 0
    const baseLateFee = service.price * (lateFeePct / 100)
    const dailyPenalty = proposal.daily_penalty_fee || 0
    const daysAfterGrace = diffDays - gDays
    const totalLateFee = baseLateFee + (daysAfterGrace * dailyPenalty)

    return {
      isDelinquent: true,
      daysOverdue: diffDays,
      daysAfterGrace,
      lateFee: totalLateFee
    }
  }

  const totalProposalAmount = services.reduce((acc, curr) => acc + curr.price, 0)

  return (
    <div className="light min-h-screen bg-slate-100 py-8 print:bg-white print:py-0 text-slate-800 font-sans">
      {/* Inyección de Estilos de Branding */}
      <style dangerouslySetInnerHTML={{ __html: `
        :root {
          --primary-contract: ${primaryColor};
          --secondary-contract: ${secondaryColor};
        }
        .text-contract-primary { color: var(--primary-contract) !important; }
        .bg-contract-primary { background-color: var(--primary-contract) !important; }
        .border-contract-primary { border-color: var(--primary-contract) !important; }
        .hover\\:bg-contract-primary-hover:hover { background-color: var(--primary-contract) !important; filter: brightness(90%); }
      `}} />

      <div className="container mx-auto max-w-4xl px-4 print:px-0">
        <div className="mb-6 flex justify-between items-center print:hidden">
          <button
            onClick={handlePrint}
            className="rounded-lg bg-contract-primary hover:bg-contract-primary-hover px-6 py-3 font-semibold text-white transition cursor-pointer shadow-md"
          >
            Imprimir Documento
          </button>

          {isSigned && (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs px-3 py-1.5 rounded-full font-medium flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span>Portal de Cliente Activo</span>
            </div>
          )}
        </div>

        {/* CONTENIDO PRINCIPAL */}
        <div className="rounded-2xl bg-white p-6 md:p-8 shadow-xl print:shadow-none border border-slate-200/60">
          
          {/* CABECERA */}
          <div className="mb-8 border-b border-slate-200 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                {isSigned ? "Portal de Seguimiento del Cliente" : "Propuesta de Servicios Comerciales"}
              </h1>
              <p className="mt-1.5 text-sm text-slate-500">
                Documento de Contrato • {proposal.client_company}
              </p>
            </div>
            <div className="flex flex-col items-center">
              {logoUrl && (
                <img
                  src={logoUrl}
                  alt={brandName}
                  className="h-10 w-auto object-contain max-w-[150px]"
                />
              )}
              <p className="mt-1 text-xs font-semibold text-slate-700">{brandName}</p>
            </div>
          </div>

          {/* DATOS PROVEEDOR & CLIENTE */}
          <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 bg-slate-50 p-4 rounded-xl border border-slate-100">
            <div>
              <h3 className="mb-2 text-xs font-bold text-slate-400 uppercase tracking-wider">Proveedor</h3>
              <p className="text-sm font-bold text-slate-800">{brandName}</p>
              <p className="text-xs text-slate-500">Servicios Digitales Gestionados</p>
            </div>
            <div>
              <h3 className="mb-2 text-xs font-bold text-slate-400 uppercase tracking-wider">Cliente</h3>
              <p className="text-sm font-bold text-slate-850">{proposal.client_name}</p>
              <p className="text-xs text-slate-600">{proposal.client_company}</p>
              {proposal.client_domain && <p className="text-xs text-slate-500 font-mono mt-0.5">{proposal.client_domain}</p>}
            </div>
          </div>

          {/* PORTAL CLIENTE CON PESTAÑAS (SI YA ESTÁ FIRMADO) */}
          {isSigned ? (
            <div className="space-y-6">
              {/* TABS SELECTOR */}
              <div className="flex border-b border-slate-200 print:hidden">
                <button
                  onClick={() => setActiveTab("servicios")}
                  className={`py-2.5 px-4 font-semibold text-sm border-b-2 transition ${
                    activeTab === "servicios"
                      ? "border-contract-primary text-contract-primary"
                      : "border-transparent text-slate-500 hover:text-slate-800"
                  }`}
                >
                  Servicios y Accesos
                </button>
                <button
                  onClick={() => setActiveTab("pagos")}
                  className={`py-2.5 px-4 font-semibold text-sm border-b-2 transition ${
                    activeTab === "pagos"
                      ? "border-contract-primary text-contract-primary"
                      : "border-transparent text-slate-500 hover:text-slate-800"
                  }`}
                >
                  Historial de Pagos
                </button>
                {collaborators.length > 0 && (
                  <button
                    onClick={() => setActiveTab("colaboradores")}
                    className={`py-2.5 px-4 font-semibold text-sm border-b-2 transition ${
                      activeTab === "colaboradores"
                        ? "border-contract-primary text-contract-primary"
                        : "border-transparent text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    Colaboradores
                  </button>
                )}
              </div>

              {/* TAB CONTENT: SERVICIOS */}
              {activeTab === "servicios" && (
                <div className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    {services.map((ser, idx) => {
                      const delinquency = getDelinquencyDetails(ser)

                      return (
                        <div key={ser.id || idx} className="border border-slate-200 rounded-xl p-5 bg-white relative overflow-hidden shadow-sm hover:shadow-md transition">
                          <div className={`absolute left-0 top-0 bottom-0 w-1 ${ser.status === "ACTIVE" && !delinquency?.isDelinquent ? "bg-emerald-500" : "bg-red-500"}`} />
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{ser.category_name}</span>
                              <h4 className="font-bold text-base text-slate-900">{ser.service_name}</h4>
                            </div>
                            <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wide ${
                              ser.status === "ACTIVE" && !delinquency?.isDelinquent
                                ? "bg-emerald-100 text-emerald-800"
                                : "bg-red-100 text-red-800"
                            }`}>
                              {delinquency?.isDelinquent ? "MORA" : ser.status === "ACTIVE" ? "Activo" : "Suspendido"}
                            </span>
                          </div>

                          <div className="text-xs text-slate-600 space-y-1 mb-4">
                            <div>Plan: <strong>{ser.plan_name || "Único"}</strong></div>
                            <div>Precio: <strong>${ser.price.toFixed(2)} USD</strong></div>
                            <div>Tipo: <strong>{ser.billing_type === "RECURRENT" ? `Recurrente (${ser.billing_cycle})` : "Proyecto (Costo Único)"}</strong></div>
                          </div>

                          {/* Características */}
                          {ser.features && (
                            <div className="mb-4 pt-2 border-t border-slate-100">
                              <h5 className="text-[10px] text-slate-400 font-bold uppercase mb-1.5">Alcance / Características</h5>
                              <ul className="space-y-1 text-xs text-slate-600">
                                {ser.features.split("\n").map((f, fIdx) => (
                                  <li key={fIdx} className="flex gap-1.5 items-start">
                                    <Check className="h-3.5 w-3.5 text-emerald-500 mt-0.5 flex-shrink-0" />
                                    <span>{f}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {/* Políticas de Plan */}
                          {ser.policies && (
                            <div className="mb-2 p-2 bg-slate-50 rounded text-[11px] text-slate-500 italic border border-slate-100">
                              * Políticas del Plan: {ser.policies}
                            </div>
                          )}

                          {/* Políticas de Categoría */}
                          {ser.category_policies && (
                            <div className="mb-4 p-2 bg-slate-50 rounded text-[11px] text-slate-500 italic border border-slate-100">
                              * Términos de {ser.category_name}: {ser.category_policies}
                            </div>
                          )}

                          {/* Alertas de Morosidad */}
                          {delinquency && (
                            <div className={`p-3 rounded-lg border text-xs space-y-1 ${
                              delinquency.isDelinquent 
                                ? "bg-red-50 border-red-200 text-red-800" 
                                : "bg-orange-50 border-orange-200 text-orange-800"
                            }`}>
                              <div className="font-bold flex items-center gap-1">
                                <ShieldAlert className="h-4 w-4" />
                                <span>{delinquency.isDelinquent ? "Pago Vencido con Recargos" : "Próximo a Vencer"}</span>
                              </div>
                              <p>Venció hace {delinquency.daysOverdue} días (Fecha límite: {displayFriendlyDate(ser.expiration_date)})</p>
                              {delinquency.isDelinquent && (
                                <p className="font-bold mt-1 text-[11px] bg-red-100/50 p-1 rounded inline-block">
                                  Recargo acumulado por mora: +${delinquency.lateFee.toFixed(2)} USD
                                </p>
                              )}
                            </div>
                          )}

                          {/* Vigencia / Fechas */}
                          {ser.billing_type === "RECURRENT" && (
                            <div className="pt-3 border-t border-slate-100 text-[10px] text-slate-400 space-y-0.5">
                              <div>Fecha de inicio: {displayFriendlyDate(ser.start_date)}</div>
                              <div>Próxima renovación: {displayFriendlyDate(ser.expiration_date)}</div>
                              {ser.domain_included === 1 && (
                                <div className="text-blue-500">Dominio vence: {displayFriendlyDate(ser.domain_expiration)}</div>
                              )}
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>

                  {/* CREDENCIALES DE ACCESO */}
                  {credentials.length > 0 && (
                    <div className="mt-8 border-t border-slate-200 pt-6">
                      <h3 className="font-bold text-lg text-slate-900 mb-3 flex items-center gap-2">
                        <Award className="h-5 w-5 text-contract-primary" />
                        <span>Mis Accesos y Credenciales</span>
                      </h3>
                      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 md:p-6 grid gap-4 md:grid-cols-2">
                        {credentials.map((cred, idx) => (
                          <div key={idx} className="bg-white border border-slate-200 p-4 rounded-lg shadow-sm">
                            <h4 className="font-bold text-sm text-slate-800 mb-2 border-b pb-1.5">{cred.description}</h4>
                            <div className="space-y-1.5 text-xs">
                              <div className="flex justify-between text-slate-500">
                                <span>Email / Usuario:</span>
                                <span className="font-mono text-slate-800 font-semibold select-all">{cred.email}</span>
                              </div>
                              <div className="flex justify-between text-slate-500">
                                <span>Contraseña:</span>
                                <span className="font-mono text-slate-800 font-semibold select-all">{cred.password}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* TAB CONTENT: PAGOS */}
              {activeTab === "pagos" && (
                <div className="space-y-4">
                  <div className="border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                    <Table>
                      <TableHeader className="bg-slate-50">
                        <TableRow>
                          <TableHead className="text-slate-700 font-bold">Recibo / Factura</TableHead>
                          <TableHead className="text-slate-700 font-bold">Monto Pagado</TableHead>
                          <TableHead className="text-slate-700 font-bold">Fecha de Pago</TableHead>
                          <TableHead className="text-slate-700 font-bold">Método</TableHead>
                          <TableHead className="text-slate-700 font-bold">Concepto</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {payments.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={5} className="text-center py-8 text-slate-400">
                              No hay registros de pagos archivados.
                            </TableCell>
                          </TableRow>
                        ) : (
                          payments.map((pay, i) => (
                            <TableRow key={pay.id || i} className="hover:bg-slate-50 text-xs">
                              <TableCell className="font-bold text-slate-800">{pay.invoice_number}</TableCell>
                              <TableCell className="font-semibold text-emerald-600">${pay.amount.toFixed(2)} USD</TableCell>
                              <TableCell className="text-slate-600">{displayFriendlyDate(pay.payment_date || "")}</TableCell>
                              <TableCell className="text-slate-600">{pay.payment_method}</TableCell>
                              <TableCell className="text-slate-500 italic">{pay.description}</TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              )}

              {/* TAB CONTENT: COLABORADORES */}
              {activeTab === "colaboradores" && (
                <div className="space-y-6">
                  <h3 className="font-bold text-lg text-slate-900 flex gap-2 items-center">
                    <Users className="h-5 w-5 text-contract-primary" />
                    <span>Equipo y Colaboradores del Proyecto</span>
                  </h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    {collaborators.map((col, idx) => (
                      <div key={col.id || idx} className="border border-slate-200 rounded-xl p-4 bg-white shadow-sm flex items-center gap-4">
                        {col.logo_url ? (
                          <img
                            src={col.logo_url}
                            alt={col.name}
                            className="w-12 h-12 rounded-full object-cover border border-slate-200"
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center font-bold text-contract-primary text-lg">
                            {col.name.slice(0, 2).toUpperCase()}
                          </div>
                        )}
                        <div>
                          <h4 className="font-bold text-sm text-slate-850">{col.name}</h4>
                          {col.role && <p className="text-xs text-slate-500">{col.role}</p>}
                          {col.contact && <p className="text-[10px] text-slate-400 mt-0.5">{col.contact}</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* PROPUESTA PENDIENTE DE FIRMAR (CONTRATO CLÁSICO) */
            <div className="space-y-8">
              
              {/* Servicios Propuestos */}
              <section className="space-y-4">
                <h2 className="text-xl font-bold text-slate-900 flex gap-2 items-center">
                  <FileText className="h-5 w-5 text-contract-primary" />
                  <span>Servicios Incluidos en la Propuesta</span>
                </h2>
                <div className="space-y-4">
                  {services.map((ser, idx) => (
                    <div key={ser.id || idx} className="border border-slate-200 rounded-xl p-5 bg-white shadow-sm">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{ser.category_name}</span>
                          <h4 className="font-bold text-base text-slate-900">{ser.service_name}</h4>
                        </div>
                        <span className="text-xs font-semibold text-contract-primary">${ser.price.toFixed(2)} USD</span>
                      </div>
                      <p className="text-xs text-slate-600 mb-3">Plan: {ser.plan_name} ({ser.billing_type === "RECURRENT" ? `Suscripción ${ser.billing_cycle}` : "Pago Único"})</p>

                      {/* Alcance */}
                      {ser.features && (
                        <div className="pt-2 border-t border-slate-100 space-y-1">
                          <ul className="space-y-1 text-xs text-slate-600">
                            {ser.features.split("\n").map((f, fIdx) => (
                              <li key={fIdx} className="flex gap-1.5 items-start">
                                <Check className="h-3.5 w-3.5 text-emerald-500 mt-0.5 flex-shrink-0" />
                                <span>{f}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Políticas de Plan */}
                      {ser.policies && (
                        <div className="mt-2 p-2 bg-slate-50 border border-slate-100 rounded text-xs text-slate-500 italic">
                          Términos del plan: {ser.policies}
                        </div>
                      )}

                      {/* Políticas de Categoría */}
                      {ser.category_policies && (
                        <div className="mt-3 p-2 bg-slate-50 border border-slate-100 rounded text-xs text-slate-500 italic">
                          Términos de la categoría ({ser.category_name}): {ser.category_policies}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>

              {/* Factura Resumen */}
              <section className="space-y-4">
                <h2 className="text-xl font-bold text-slate-900 flex gap-2 items-center">
                  <CreditCard className="h-5 w-5 text-contract-primary" />
                  <span>Resumen de Cobro</span>
                </h2>
                <div className="border border-slate-200 rounded-xl p-5 space-y-4">
                  <div className="flex justify-between text-sm text-slate-500">
                    <span>Factura Nro:</span>
                    <span className="font-bold text-slate-900">{proposal.invoice_number}</span>
                  </div>
                  <div className="flex justify-between text-sm text-slate-500">
                    <span>Moneda de Pago:</span>
                    <span className="font-bold text-slate-900">USD</span>
                  </div>

                  <div className="border-t border-slate-100 pt-4 flex justify-between items-center">
                    <span className="font-bold text-slate-800 text-lg">Inversión Inicial Total:</span>
                    <span className="text-2xl font-black text-contract-primary">${totalProposalAmount.toFixed(2)} USD</span>
                  </div>
                </div>
              </section>

              {/* Colaboradores / Créditos */}
              {collaborators.length > 0 && (
                <section className="space-y-4">
                  <h2 className="text-xl font-bold text-slate-900 flex gap-2 items-center">
                    <Users className="h-5 w-5 text-contract-primary" />
                    <span>Colaboradores Asociados</span>
                  </h2>
                  <div className="grid gap-4 md:grid-cols-2">
                    {collaborators.map((col, idx) => (
                      <div key={idx} className="border border-slate-200 rounded-xl p-4 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-contract-primary text-sm">
                          {col.name.slice(0,2).toUpperCase()}
                        </div>
                        <div>
                          <h4 className="font-bold text-sm text-slate-800">{col.name}</h4>
                          <p className="text-xs text-slate-500">{col.role || "Colaborador"}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Firma Pad */}
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
                signatureHolderName={proposal.client_name}
                signatureDate={dbSignature?.recordedAtISO}
                saveDisabled={!hasStrokes || savingSignature}
                clearDisabled={!hasStrokes || savingSignature}
                isSignatureLocked={false}
              />

            </div>
          )}

        </div>
      </div>
    </div>
  )
}
