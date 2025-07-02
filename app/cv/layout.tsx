import type React from "react"
import type { Metadata } from "next"


export const metadata: Metadata = {
  title: "José Nieves - Desarrollador Software | CV",
  description: "Curriculum Vitae de José Nieves - Desarrollador de Software con más de 5 años de experiencia",
}

export default function CVLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">{children}</div>
}
