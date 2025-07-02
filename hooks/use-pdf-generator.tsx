"use client"

import { useCallback } from "react"

export function usePDFGenerator() {
  const generatePDF = useCallback(async () => {
    try {
      // Importar dinámicamente las librerías
      const html2canvas = (await import("html2canvas")).default
      const jsPDF = (await import("jspdf")).default

      // Obtener el elemento del CV
      const element = document.getElementById("cv-content")
      if (!element) {
        console.error("No se encontró el elemento del CV")
        return
      }

      // Forzar tema claro para el PDF
      const root = document.documentElement
      const originalStyles = {
        bg: root.style.getPropertyValue("--cv-bg"),
        headerBg: root.style.getPropertyValue("--cv-header-bg"),
        cardBg: root.style.getPropertyValue("--cv-card-bg"),
        textPrimary: root.style.getPropertyValue("--cv-text-primary"),
        textSecondary: root.style.getPropertyValue("--cv-text-secondary"),
        textMuted: root.style.getPropertyValue("--cv-text-muted"),
        border: root.style.getPropertyValue("--cv-border"),
      }

      // Aplicar tema claro temporalmente
      root.style.setProperty("--cv-bg", "#ffffff")
      root.style.setProperty("--cv-header-bg", "#ffffff")
      root.style.setProperty("--cv-card-bg", "#ffffff")
      root.style.setProperty("--cv-text-primary", "#1f2937")
      root.style.setProperty("--cv-text-secondary", "#4b5563")
      root.style.setProperty("--cv-text-muted", "#6b7280")
      root.style.setProperty("--cv-border", "rgba(0, 0, 0, 0.1)")

      // Esperar un poco para que se apliquen los estilos
      await new Promise((resolve) => setTimeout(resolve, 100))

      // Configuración para html2canvas
      const canvas = await html2canvas(element, {
        scale: 2, // Mayor calidad
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",
        width: element.scrollWidth,
        height: element.scrollHeight,
        scrollX: 0,
        scrollY: 0,
      })

      // Restaurar estilos originales
      Object.entries(originalStyles).forEach(([key, value]) => {
        const cssVar = `--cv-${key.replace(/([A-Z])/g, "-$1").toLowerCase()}`
        if (value) {
          root.style.setProperty(cssVar, value)
        }
      })

      // Crear PDF
      const imgData = canvas.toDataURL("image/png")
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      })

      // Calcular dimensiones para ajustar a A4
      const pdfWidth = pdf.internal.pageSize.getWidth()
      const pdfHeight = pdf.internal.pageSize.getHeight()
      const imgWidth = canvas.width
      const imgHeight = canvas.height
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight)
      const imgX = (pdfWidth - imgWidth * ratio) / 2
      const imgY = 0

      pdf.addImage(imgData, "PNG", imgX, imgY, imgWidth * ratio, imgHeight * ratio)

      // Descargar el PDF
      pdf.save("Jose_Nieves_CV.pdf")
    } catch (error) {
      console.error("Error generando PDF:", error)
      // Fallback al método de impresión del navegador
      window.print()
    }
  }, [])

  return { generatePDF }
}
