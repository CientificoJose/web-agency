"use client"

import { Suspense, useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react"
import Image from "next/image"
import { useSearchParams } from "next/navigation"
import {
  TupacArchitectureSection,
  TupacIdentitySection,
  TupacPlansSection,
  TupacProcessSection,
  TupacServicesSection,
  TupacSummarySection,
  TupacTermsSection,
} from "@/components/proposals/tupac-content"
import { SignatureBlock } from "@/components/proposals/signature-pad"

type SignatureData = {
  image: string
  recordedAtISO: string
}

export default function TupacProposalPage() {
  return (
    <Suspense>
      <TupacProposalPageInner />
    </Suspense>
  )
}

const SIGNATURE_STORAGE_KEY = "proposal-tupac-signature"

function TupacProposalPageInner() {
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

    const stored = window.localStorage.getItem(SIGNATURE_STORAGE_KEY)

    if (stored) {
      try {
        const parsed: SignatureData = JSON.parse(stored)
        setSignature(parsed)
      } catch (error) {
        window.localStorage.removeItem(SIGNATURE_STORAGE_KEY)
      }
    }
  }, [])

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

    window.print()
  }

  const getPoint = (event: ReactPointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) {
      return { x: 0, y: 0 }
    }

    const rect = canvas.getBoundingClientRect()

    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    }
  }

  const handlePointerDown = (event: ReactPointerEvent<HTMLCanvasElement>) => {
    if (signature) {
      setStatusMessage({
        type: "error",
        text: clearMode
          ? "Elimina la firma actual antes de registrar una nueva."
          : "Ya existe una firma guardada. Para reemplazarla abre la URL con ?clear=true.",
      })
      return
    }

    event.preventDefault()

    const canvas = canvasRef.current
    const context = canvas?.getContext("2d")
    if (!canvas || !context) {
      return
    }

    const point = getPoint(event)
    context.beginPath()
    context.moveTo(point.x, point.y)
    context.lineTo(point.x, point.y)
    context.stroke()

    setHasStrokes(true)
    setIsDrawing(true)
    canvas.setPointerCapture(event.pointerId)
  }

  const handlePointerMove = (event: ReactPointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing) {
      return
    }

    event.preventDefault()

    const canvas = canvasRef.current
    const context = canvas?.getContext("2d")
    if (!canvas || !context) {
      return
    }

    const point = getPoint(event)
    context.lineTo(point.x, point.y)
    context.stroke()
  }

  const stopDrawing = (event: ReactPointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing) {
      return
    }

    event.preventDefault()

    const canvas = canvasRef.current
    const context = canvas?.getContext("2d")
    if (context) {
      context.closePath()
    }

    setIsDrawing(false)
    canvas?.releasePointerCapture(event.pointerId)
  }

  const clearSignature = () => {
    if (signature && !clearMode) {
      setStatusMessage({
        type: "error",
        text: "La firma está bloqueada. Añade ?clear=true a la URL para poder limpiarla.",
      })
      return
    }

    const canvas = canvasRef.current
    const context = canvas?.getContext("2d")
    if (context && canvas) {
      const { width, height } = canvas
      context.save()
      context.setTransform(1, 0, 0, 1, 0, 0)
      context.clearRect(0, 0, width, height)
      context.restore()
    }

    setHasStrokes(false)
    setSignature(null)
    setStatusMessage({
      type: "success",
      text: signature ? "Firma eliminada. Puedes registrar una nueva." : "Lienzo restablecido.",
    })

    if (typeof window !== "undefined") {
      window.localStorage.removeItem(SIGNATURE_STORAGE_KEY)
    }
  }

  const saveSignature = () => {
    if (signature) {
      setStatusMessage({
        type: "error",
        text: "Ya existe una firma guardada. Usa ?clear=true en la URL y limpia el recuadro para reemplazarla.",
      })
      return
    }

    const canvas = canvasRef.current
    if (!canvas) {
      return
    }

    if (!hasStrokes) {
      setStatusMessage({ type: "error", text: "Dibuja la firma antes de guardarla." })
      return
    }

    const image = canvas.toDataURL("image/png")
    const payload: SignatureData = {
      image,
      recordedAtISO: new Date().toISOString(),
    }

    setSignature(payload)
    setHasStrokes(false)
    setStatusMessage({ type: "success", text: "Firma guardada correctamente." })

    if (typeof window !== "undefined") {
      window.localStorage.setItem(SIGNATURE_STORAGE_KEY, JSON.stringify(payload))
    }
  }

  const formatDateTime = (iso: string) => {
    const date = new Date(iso)
    if (Number.isNaN(date.getTime())) {
      return ""
    }

    return date.toLocaleString("es-VE", {
      dateStyle: "long",
      timeStyle: "short",
    })
  }

  return (
    <div className="bg-gray-100 flex justify-center items-start md:items-center p-0 md:p-4 print:p-0 font-sans min-h-screen">
      <button
        onClick={handlePrint}
        className="no-print fixed top-4 right-4 bg-primary text-white px-4 py-2 md:px-6 md:py-3 rounded-full shadow-lg hover:bg-primary-dark transition-all transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 z-50 text-sm md:text-base"
      >
        Imprimir
      </button>

      <div className="a4-container w-full md:w-[210mm] md:min-h-[297mm] bg-white md:shadow-xl relative overflow-hidden p-4 sm:p-6 md:p-[25mm] print:shadow-none print:p-[25mm]">
        <div className="watermark absolute inset-0 opacity-10 -z-10"></div>

        <div className="text-center pb-5 border-b-2 border-primary mb-6 md:mb-8 w-full">
          <Image src="/recurso.png" alt="Logo Sin Limites" width={128} height={128} className="w-24 md:w-32 mb-2 mx-auto" />
          <h1 className="text-xl md:text-2xl font-bold text-dark">Sin Limites</h1>
          <h2 className="text-base md:text-lg text-primary">Propuesta Estratégica de Landing Page Personal</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 mb-6 md:mb-8">
          <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-primary">
            <h3 className="font-semibold text-dark mb-2 text-base md:text-lg">Consultor Digital</h3>
            <p className="text-gray-700 text-sm md:text-base">José Nieves</p>
            <p className="text-gray-700 text-sm md:text-base">+58 424 360 3846</p>
            <p className="text-gray-700 text-sm md:text-base">contact@sinlimites-agency.site</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-primary">
            <h3 className="font-semibold text-dark mb-2 text-base md:text-lg">Cliente</h3>
            <p className="text-gray-700 text-sm md:text-base">Tupac Hernández</p>
            <p className="text-gray-700 text-sm md:text-base">Artista multidisciplinario &amp; productor audiovisual</p>
            <p className="text-gray-700 text-sm md:text-base">Fecha: 31 de octubre de 2025</p>
          </div>
        </div>

        <TupacSummarySection />

        <div className="space-y-6 md:space-y-8">
          <TupacArchitectureSection />
          <TupacIdentitySection />
          <TupacProcessSection />
        </div>

        <TupacPlansSection />
        <TupacServicesSection />
        <TupacTermsSection />

        <SignatureBlock
          showSignaturePad={showSignaturePad}
          canvasRef={canvasRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={stopDrawing}
          onPointerCancel={stopDrawing}
          onPointerLeave={stopDrawing}
          onSave={saveSignature}
          onClear={clearSignature}
          statusMessage={statusMessage}
          signatureImage={signature?.image}
          signatureHolderName="Tupac"
          signatureDate={signature ? formatDateTime(signature.recordedAtISO) : undefined}
          saveDisabled={Boolean(signature)}
          clearDisabled={Boolean(signature) && !clearMode}
          isSignatureLocked={Boolean(signature)}
        />
      </div>
    </div>
  )
}
