import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Brochure de Servicios 2025 - Sin Límites Agency",
  description:
    "Descubre nuestros servicios de desarrollo de software, aplicaciones web y móviles. No hay límites para crear.",
  keywords:
    "brochure, servicios, desarrollo web, aplicaciones móviles, software a medida, ecommerce, landing page, chatbot",
  authors: [{ name: "Sin Límites Agency", url: "https://sinlimites-agency.online" }],
  openGraph: {
    title: "Brochure de Servicios 2025 - Sin Límites Agency",
    description: "No hay límites para crear. Conoce nuestros servicios digitales completos.",
    url: "https://sinlimites-agency.online/brochure",
    siteName: "Sin Límites Agency",
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Brochure de Servicios 2025 - Sin Límites Agency",
    description: "No hay límites para crear. Conoce nuestros servicios digitales completos.",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function BrochureLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
