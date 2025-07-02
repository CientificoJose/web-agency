import type React from "react"
import type { Metadata } from "next"
import { Inter, Roboto } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/hooks/use-theme"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-roboto',
  display: 'swap',
})

export const metadata: Metadata = {
  title: "Limitless Agency - Mentes Creativas, Obras Creativas",
  description:
    "Agencia de desarrollo de software especializada en crear experiencias digitales excepcionales. No hay límites para crear.",
  icons: {
    icon: "/favicon.ico",
  },
  keywords: "desarrollo web, aplicaciones móviles, React, Next.js, TypeScript, diseño web, Venezuela",
  authors: [{ name: "José Nieves", url: "https://sinlimites-agency.online" }],
  openGraph: {
    title: "Limitless Agency - Mentes Creativas, Obras Creativas",
    description: "Transformamos ideas en soluciones tecnológicas innovadoras",
    url: "https://sinlimites-agency.online",
    siteName: "Limitless Agency",
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Limitless Agency - Mentes Creativas, Obras Creativas",
    description: "Transformamos ideas en soluciones tecnológicas innovadoras",
  },
  robots: {
    index: true,
    follow: true,
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${inter.variable} ${roboto.variable} font-sans antialiased`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
