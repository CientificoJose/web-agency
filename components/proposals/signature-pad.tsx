import React from "react"

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
  return (
    <section className="mt-8 md:mt-10 bg-gray-900 text-white rounded-2xl p-5 md:p-6">
      <h3 className="text-lg md:text-xl font-semibold mb-4">Aceptación &amp; Firma Digital</h3>
      <p className="text-sm md:text-base text-gray-200 mb-4">
        Firma en el recuadro utilizando cursor, lápiz digital o pantalla táctil. Al guardar la firma quedará almacenada de forma local en tu navegador
        junto con la fecha y hora de aceptación.
      </p>
      <div className="bg-white text-gray-900 rounded-xl p-4">
        {showSignaturePad ? (
          <>
            <div className="border border-dashed border-gray-300 rounded-xl overflow-hidden">
              <canvas
                ref={canvasRef}
                className={`w-full h-48 bg-white ${isSignatureLocked ? "pointer-events-none opacity-75" : ""}`}
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
                onPointerCancel={onPointerCancel}
                onPointerLeave={onPointerLeave}
              />
            </div>
            <div className="no-print mt-4 flex flex-col sm:flex-row gap-3">
              <button
                onClick={onSave}
                disabled={saveDisabled}
                className={`w-full sm:w-auto inline-flex items-center justify-center px-4 py-2 rounded-full font-semibold transition ${
                  saveDisabled ? "bg-gray-300 text-gray-600 cursor-not-allowed" : "bg-primary text-white hover:bg-primary-dark"
                }`}
              >
                Guardar firma
              </button>
              <button
                onClick={onClear}
                disabled={clearDisabled}
                className={`w-full sm:w-auto inline-flex items-center justify-center px-4 py-2 rounded-full font-semibold transition border ${
                  clearDisabled ? "border-gray-200 text-gray-400 cursor-not-allowed" : "border-gray-300 text-gray-700 hover:bg-gray-100"
                }`}
              >
                Limpiar firma
              </button>
            </div>
          </>
        ) : null}
        {statusMessage ? (
          <p className={`no-print mt-3 text-sm ${statusMessage.type === "success" ? "text-emerald-600" : "text-red-600"}`}>{statusMessage.text}</p>
        ) : null}
        {signatureImage ? (
          <div className="mt-6 border border-gray-200 rounded-xl p-4 bg-gray-50">
            <h4 className="font-semibold text-dark mb-3">Registro de aceptación</h4>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <p className="text-sm text-gray-600">Firmado digitalmente por</p>
                <p className="text-base font-semibold text-gray-900">{signatureHolderName}</p>
                {signatureDate ? <p className="text-sm text-gray-600">{signatureDate}</p> : null}
              </div>
              <div className="flex-shrink-0">
                <img src={signatureImage} alt={`Firma digital de ${signatureHolderName}`} className="max-h-24 object-contain" />
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  )
}
