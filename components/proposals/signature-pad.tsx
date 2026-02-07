"use client"

import React, { useState, useEffect } from "react"
import { X } from "lucide-react"

type StatusMessage = {
  type: "success" | "error"
  text: string
} | null

type SignatureBlockProps = {
  showSignaturePad: boolean
  canvasRef: React.RefObject<HTMLCanvasElement | null>
  onPointerDown: (event: React.PointerEvent<HTMLCanvasElement>) => void
  onPointerMove: (event: React.PointerEvent<HTMLCanvasElement>) => void
  onPointerUp: (event: React.PointerEvent<HTMLCanvasElement>) => void
  onPointerCancel: (event: React.PointerEvent<HTMLCanvasElement>) => void
  onPointerLeave: (event: React.PointerEvent<HTMLCanvasElement>) => void
  onSave: () => void
  onClear: () => void
  statusMessage: StatusMessage
  signatureImage?: string
  signatureHolderName: string
  signatureDate?: string
  saveDisabled: boolean
  clearDisabled: boolean
  isSignatureLocked: boolean
}

export function SignatureBlock({
  showSignaturePad,
  canvasRef,
  onPointerDown,
  onPointerMove,
  onPointerUp,
  onPointerCancel,
  onPointerLeave,
  onSave,
  onClear,
  statusMessage,
  signatureImage,
  signatureHolderName,
  signatureDate,
  saveDisabled,
  clearDisabled,
  isSignatureLocked,
}: SignatureBlockProps): React.ReactElement {
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Prevenir scroll cuando el modal está abierto
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden'
      document.body.style.touchAction = 'none'
    } else {
      document.body.style.overflow = ''
      document.body.style.touchAction = ''
    }
    
    return () => {
      document.body.style.overflow = ''
      document.body.style.touchAction = ''
    }
  }, [isModalOpen])

  const handleSaveAndClose = () => {
    onSave()
    setIsModalOpen(false)
  }

  return (
    <section className="mt-8 md:mt-10 bg-gray-900 text-white rounded-2xl p-5 md:p-6">
      <h3 className="text-lg md:text-xl font-semibold mb-4 break-words">Aceptación &amp; Firma Digital</h3>
      
      {!signatureImage && (
        <p className="text-sm md:text-base text-gray-200 mb-4">
          Para aceptar este contrato, haga clic en el botón de abajo para abrir el panel de firma digital.
        </p>
      )}

      <div className="bg-white text-gray-900 rounded-xl p-4">
        {!signatureImage && showSignaturePad && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full py-3 px-6 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition print:hidden"
          >
            ✍️ Abrir Panel de Firma
          </button>
        )}

        {statusMessage && (
          <p className={`no-print mt-3 text-sm ${statusMessage.type === "success" ? "text-emerald-600" : "text-red-600"}`}>
            {statusMessage.text}
          </p>
        )}

        {signatureImage && (
          <div className="border border-gray-200 rounded-xl p-4 bg-gray-50">
            <h4 className="font-semibold text-dark mb-3">Registro de aceptación</h4>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <p className="text-sm text-gray-600">Firmado digitalmente por</p>
                <p className="text-base font-semibold text-gray-900">{signatureHolderName}</p>
                {signatureDate && <p className="text-sm text-gray-600">{signatureDate}</p>}
              </div>
              <div className="flex-shrink-0">
                <img src={signatureImage} alt={`Firma digital de ${signatureHolderName}`} className="max-h-24 object-contain" />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modal de Firma */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm print:hidden">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between rounded-t-2xl">
              <h4 className="text-lg font-bold text-gray-900">Firma Digital</h4>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition"
                aria-label="Cerrar"
              >
                <X className="h-5 w-5 text-gray-600" />
              </button>
            </div>

            <div className="p-6">
              <p className="text-sm text-gray-600 mb-4">
                Dibuje su firma en el recuadro utilizando cursor, lápiz digital o pantalla táctil. 
                La firma quedará almacenada de forma local en su navegador junto con la fecha y hora de aceptación.
              </p>

              <div className="border-2 border-dashed border-gray-300 rounded-xl overflow-hidden bg-white">
                <canvas
                  ref={canvasRef}
                  className={`w-full h-64 touch-none ${isSignatureLocked ? "pointer-events-none opacity-75" : ""}`}
                  onPointerDown={onPointerDown}
                  onPointerMove={onPointerMove}
                  onPointerUp={onPointerUp}
                  onPointerCancel={onPointerCancel}
                  onPointerLeave={onPointerLeave}
                  style={{ touchAction: 'none' }}
                />
              </div>

              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleSaveAndClose}
                  disabled={saveDisabled}
                  className={`flex-1 py-3 px-6 rounded-lg font-semibold transition ${
                    saveDisabled 
                      ? "bg-gray-300 text-gray-600 cursor-not-allowed" 
                      : "bg-primary text-white hover:bg-primary/90"
                  }`}
                >
                  💾 Guardar Firma
                </button>
                <button
                  onClick={onClear}
                  disabled={clearDisabled}
                  className={`flex-1 py-3 px-6 rounded-lg font-semibold transition border-2 ${
                    clearDisabled 
                      ? "border-gray-200 text-gray-400 cursor-not-allowed" 
                      : "border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  🗑️ Limpiar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
