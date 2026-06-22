"use client"

import React, { useState, useEffect } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X, ChevronRight, ChevronLeft, HelpCircle } from "lucide-react"

export interface TourStep {
  target: string
  title: string
  content: string
}

interface GuidedTourProps {
  steps: TourStep[]
  tourKey: string
  onComplete?: () => void
  onStepChange?: (stepIdx: number) => void
}

export function GuidedTour({ steps, tourKey, onComplete, onStepChange }: GuidedTourProps): React.ReactElement | null {
  const [isActive, setIsActive] = useState(false)
  const [currentStepIdx, setCurrentStepIdx] = useState(0)
  const [coords, setCoords] = useState<{ top: number; left: number; width: number; height: number } | null>(null)

  // Iniciar el tour si no se ha completado antes
  useEffect(() => {
    const completed = localStorage.getItem(`tour_completed_${tourKey}`)
    if (!completed) {
      // Pequeño delay para dejar que la página cargue por completo
      const timer = setTimeout(() => {
        setIsActive(true)
        setCurrentStepIdx(0)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [tourKey])

  const step = steps[currentStepIdx]

  // Notificar cambio de paso para cambiar pestañas en el padre
  useEffect(() => {
    if (isActive && onStepChange) {
      onStepChange(currentStepIdx)
    }
  }, [currentStepIdx, isActive, onStepChange])

  // Actualizar coordenadas del elemento objetivo
  useEffect(() => {
    if (!isActive || !step) return

    const updateCoords = () => {
      const tryFind = (attempts = 0) => {
        const element = document.querySelector(step.target) as HTMLElement
        if (element) {
          // Scroll suave al elemento
          element.scrollIntoView({ behavior: "smooth", block: "center" })

          setTimeout(() => {
            const rect = element.getBoundingClientRect()
            setCoords({
              top: rect.top + window.scrollY,
              left: rect.left + window.scrollX,
              width: rect.width,
              height: rect.height,
            })
          }, 300) // Dar tiempo para completar el scroll
        } else if (attempts < 6) {
          // Reintentar para dar tiempo al cambio de pestañas en el DOM
          setTimeout(() => tryFind(attempts + 1), 80)
        } else {
          setCoords(null) // Fallback al centro
        }
      }

      tryFind()
    }

    updateCoords()

    // Volver a calcular en resize/scroll
    window.addEventListener("resize", updateCoords)
    window.addEventListener("scroll", updateCoords)
    return () => {
      window.removeEventListener("resize", updateCoords)
      window.removeEventListener("scroll", updateCoords)
    }
  }, [isActive, currentStepIdx, step])

  if (!isActive) {
    // Botón flotante para iniciar de nuevo la guía en cualquier momento
    return (
      <button
        onClick={() => {
          setIsActive(true)
          setCurrentStepIdx(0)
        }}
        className="fixed bottom-6 right-6 z-40 p-3 bg-primary text-white rounded-full shadow-lg hover:bg-primary/90 transition flex items-center justify-center cursor-pointer"
        title="Ver guía rápida"
        aria-label="Ayuda"
      >
        <HelpCircle className="h-6 w-6" />
      </button>
    )
  }

  const handleNext = () => {
    if (currentStepIdx < steps.length - 1) {
      setCurrentStepIdx(currentStepIdx + 1)
    } else {
      handleClose()
    }
  }

  const handleBack = () => {
    if (currentStepIdx > 0) {
      setCurrentStepIdx(currentStepIdx - 1)
    }
  }

  const handleClose = () => {
    setIsActive(false)
    localStorage.setItem(`tour_completed_${tourKey}`, "true")
    if (onComplete) onComplete()
  }

  const handleSkip = () => {
    handleClose()
  }

  return (
    <>
      {/* Fondo semi-transparente que bloquea clicks */}
      <div className="fixed inset-0 z-40 bg-black/20 pointer-events-none print:hidden" />

      {/* Highlighter Box */}
      {coords && (
        <div
          className="absolute z-50 border-2 border-primary rounded-lg pointer-events-none animate-pulse transition-all duration-300 shadow-[0_0_15px_rgba(255,102,0,0.4)] print:hidden"
          style={{
            top: coords.top - 4,
            left: coords.left - 4,
            width: coords.width + 8,
            height: coords.height + 8,
          }}
        />
      )}

      {/* Tooltip Card */}
      {coords ? (
        <div
          className="absolute z-50 w-80 max-w-sm transition-all duration-300 print:hidden"
          style={{
            top: coords.top + coords.height + 12,
            left: Math.max(16, Math.min(window.innerWidth - 340, coords.left + coords.width / 2 - 160)),
          }}
        >
          <Card className="bg-slate-900 border border-slate-800 text-white shadow-2xl">
            <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between">
              <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                Paso {currentStepIdx + 1} de {steps.length}
              </span>
              <button onClick={handleSkip} className="text-slate-400 hover:text-white p-1 rounded-full transition">
                <X className="h-4 w-4" />
              </button>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <CardTitle className="text-base font-bold text-white mb-1">{step.title}</CardTitle>
              <p className="text-sm text-slate-300 leading-relaxed">{step.content}</p>
            </CardContent>
            <CardFooter className="p-4 pt-0 flex justify-between gap-2">
              <Button onClick={handleSkip} variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                Omitir
              </Button>
              <div className="flex gap-1.5">
                <Button
                  onClick={handleBack}
                  disabled={currentStepIdx === 0}
                  variant="outline"
                  size="sm"
                  className="bg-slate-800 border-slate-700 text-white hover:bg-slate-700 disabled:opacity-30"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button onClick={handleNext} size="sm" className="bg-primary text-white hover:bg-primary/90">
                  {currentStepIdx === steps.length - 1 ? "Listo" : <ChevronRight className="h-4 w-4" />}
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      ) : (
        /* Fallback: Centered Modal Dialog if target is not found */
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs print:hidden">
          <Card className="bg-slate-900 border border-slate-800 text-white shadow-2xl w-full max-w-sm">
            <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between">
              <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                Paso {currentStepIdx + 1} de {steps.length}
              </span>
              <button onClick={handleSkip} className="text-slate-400 hover:text-white p-1 rounded-full transition">
                <X className="h-4 w-4" />
              </button>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <CardTitle className="text-base font-bold text-white mb-1">{step.title}</CardTitle>
              <p className="text-sm text-slate-300 leading-relaxed">{step.content}</p>
            </CardContent>
            <CardFooter className="p-4 pt-0 flex justify-between gap-2">
              <Button onClick={handleSkip} variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                Omitir
              </Button>
              <div className="flex gap-1.5">
                <Button
                  onClick={handleBack}
                  disabled={currentStepIdx === 0}
                  variant="outline"
                  size="sm"
                  className="bg-slate-800 border-slate-700 text-white hover:bg-slate-700 disabled:opacity-30"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button onClick={handleNext} size="sm" className="bg-primary text-white hover:bg-primary/90">
                  {currentStepIdx === steps.length - 1 ? "Listo" : <ChevronRight className="h-4 w-4" />}
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      )}
    </>
  )
}
