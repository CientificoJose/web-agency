import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Landing Pages | Sin Límites Agency",
  description:
    "Estima el costo de tu próximo proyecto de landing page de manera rápida y transparente. Calculadora de precios para diseño web.",
  keywords:
    "calculadora precios, landing page, diseño web, cotización, desarrollo web, precios diseño, Sin Límites Agency",
  authors: [{ name: "Sin Límites Agency", url: "https://sinlimites-agency.online" }],
  openGraph: {
    title: "Landing Pages | Sin Límites Agency",
    description: "Estima el costo de tu próximo proyecto de landing page de manera rápida y transparente.",
    url: "https://sinlimites-agency.online/lading-pages",
    siteName: "Sin Límites Agency",
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Landing Pages | Sin Límites Agency",
    description: "Estima el costo de tu próximo proyecto de landing page de manera rápida y transparente.",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function CalculatorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
