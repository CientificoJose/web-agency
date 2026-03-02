import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Web Informativas | Sin Límites Agency",
  description:
    "Estima el costo de tu próximo proyecto de sitio web informativo de manera rápida y transparente. Calculadora de precios para diseño web empresarial.",
  keywords:
    "calculadora precios, web informativa, sitio web empresa, diseño web, cotización, desarrollo web, precios diseño, Sin Límites Agency",
  authors: [{ name: "Sin Límites Agency", url: "https://sinlimites-agency.site" }],
  openGraph: {
    title: "Web Informativas | Sin Límites Agency",
    description: "Estima el costo de tu próximo proyecto de sitio web informativo de manera rápida y transparente.",
    url: "https://sinlimites-agency.site/web-informativas",
    siteName: "Sin Límites Agency",
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Web Informativas | Sin Límites Agency",
    description: "Estima el costo de tu próximo proyecto de sitio web informativo de manera rápida y transparente.",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function WebInformativasLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
