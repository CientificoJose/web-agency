"use client"

import { Suspense, useEffect, useRef, useState, type PointerEvent as ReactPointerEvent, type ReactNode } from "react"
import Image from "next/image"
import { useSearchParams } from "next/navigation"
import { SignatureBlock } from "@/components/proposals/signature-pad"

type SignatureData = {
  image: string
  recordedAtISO: string
}

type ContractTemplateProps = {
  // Información del contrato
  contractTitle: string
  contractSubtitle: string
  storageKey: string
  
  // Información del proveedor
  providerName: string
  providerEmail: string
  providerPhone: string
  
  // Información del cliente
  clientName: string
  clientCompany?: string
  clientDomain?: string
  
  // Secciones del contrato (componentes React)
  sections: ReactNode[]
}

export default function ContractTemplate(props: ContractTemplateProps) {
  return (
    <Suspense>
      <ContractTemplateInner {...props} />
    </Suspense>
  )
}

function ContractTemplateInner({
  contractTitle,
  contractSubtitle,
  storageKey,
  providerName,
  providerEmail,
  providerPhone,
  clientName,
  clientCompany,
  clientDomain,
  sections,
}: ContractTemplateProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [hasStrokes, setHasStrokes] = useState(false)
  const [signature, setSignature] = useState<SignatureData | null>(null)
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const searchParams = useSearchParams()
  const clearMode = searchParams.get("clear") === "true"
  const showSignaturePad = !signature || clearMode

  useEffect(() => {
    if (typeof window === "undefined") {
      return
    }

    const stored = window.localStorage.getItem(storageKey)

    if (stored) {
      try {
        const parsed: SignatureData = JSON.parse(stored)
        setSignature(parsed)
      } catch (error) {
        window.localStorage.removeItem(storageKey)
      }
    }
  }, [storageKey])

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
  }, [])

  const handlePrint = () => {
    if (typeof window === "undefined") {
      return
    }
    
    // Forzar tema claro antes de imprimir
    const htmlElement = document.documentElement
    const bodyElement = document.body
    const originalHtmlClass = htmlElement.className
    const originalBodyClass = bodyElement.className
    
    // Remover clases de tema oscuro
    htmlElement.classList.remove('dark')
    bodyElement.classList.remove('dark')
    
    // Forzar fondo blanco
    htmlElement.style.backgroundColor = 'white'
    bodyElement.style.backgroundColor = 'white'
    
    // Imprimir
    window.print()
    
    // Restaurar clases originales después de imprimir
    setTimeout(() => {
      htmlElement.className = originalHtmlClass
      bodyElement.className = originalBodyClass
      htmlElement.style.backgroundColor = ''
      bodyElement.style.backgroundColor = ''
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

  const handleSave = () => {
    const canvas = canvasRef.current
    if (!canvas || !hasStrokes) {
      setStatusMessage({ type: "error", text: "Por favor, firme antes de guardar." })
      setTimeout(() => setStatusMessage(null), 3000)
      return
    }

    try {
      const dataURL = canvas.toDataURL("image/png")
      const now = new Date().toISOString()
      const signatureData: SignatureData = {
        image: dataURL,
        recordedAtISO: now,
      }

      window.localStorage.setItem(storageKey, JSON.stringify(signatureData))
      setSignature(signatureData)
      setStatusMessage({ type: "success", text: "Firma guardada exitosamente." })
      setTimeout(() => setStatusMessage(null), 3000)
    } catch (error) {
      setStatusMessage({ type: "error", text: "Error al guardar la firma." })
      setTimeout(() => setStatusMessage(null), 3000)
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

  const handleDeleteSignature = () => {
    if (typeof window === "undefined") {
      return
    }

    if (confirm("¿Está seguro de que desea eliminar la firma guardada? Esta acción no se puede deshacer.")) {
      window.localStorage.removeItem(storageKey)
      setSignature(null)
      setStatusMessage({ type: "success", text: "Firma eliminada exitosamente." })
      setTimeout(() => setStatusMessage(null), 3000)
    }
  }

  const signatureDate = signature?.recordedAtISO
    ? new Date(signature.recordedAtISO).toLocaleDateString("es-ES", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : undefined

  const isSignatureLocked = !!signature && !clearMode

  return (
    <div className="min-h-screen bg-gray-50 py-8 print:bg-white print:py-0">
      <div className="container mx-auto max-w-4xl px-4 print:px-0">
        <div className="mb-6 flex gap-4 print:hidden">
          <button
            onClick={handlePrint}
            className="rounded-lg bg-primary px-6 py-3 font-semibold text-white transition hover:bg-primary/90"
          >
            📄 Imprimir Contrato
          </button>
          {signature && (
            <button
              onClick={handleDeleteSignature}
              className="rounded-lg border-2 border-red-500 bg-white px-6 py-3 font-semibold text-red-500 transition hover:bg-red-50"
            >
              🗑️ Borrar Firma (Desarrollo)
            </button>
          )}
        </div>

        <div className="rounded-lg bg-white p-8 shadow-lg print:shadow-none" style={{ backgroundColor: 'white' }}>
          {/* Header */}
          <div className="mb-8 border-b border-gray-200 pb-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{contractTitle}</h1>
                <p className="mt-2 text-sm text-gray-600">{contractSubtitle}</p>
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

          {/* Provider and Client Info */}
          <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <h3 className="mb-2 text-sm font-semibold text-gray-900">Proveedor del Servicio</h3>
              <p className="text-sm text-gray-700">{providerName}</p>
              <p className="text-sm text-gray-600">{providerEmail}</p>
              <p className="text-sm text-gray-600">{providerPhone}</p>
            </div>
            <div>
              <h3 className="mb-2 text-sm font-semibold text-gray-900">Cliente</h3>
              <p className="text-sm text-gray-700">{clientName}</p>
              {clientCompany && <p className="text-sm text-gray-700">{clientCompany}</p>}
              {clientDomain && <p className="text-sm text-gray-600">{clientDomain}</p>}
            </div>
          </div>

          {/* Dynamic Sections */}
          {sections.map((section, index) => (
            <div key={index}>{section}</div>
          ))}

          {/* Signature Block */}
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
            signatureImage={signature?.image}
            signatureHolderName={clientName}
            signatureDate={signatureDate}
            saveDisabled={!hasStrokes}
            clearDisabled={!hasStrokes}
            isSignatureLocked={isSignatureLocked}
          />
        </div>
      </div>
    </div>
  )
}
