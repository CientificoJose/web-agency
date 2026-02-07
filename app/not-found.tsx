"use client"

import Link from "next/link"
import Image from "next/image"
import { Home, ArrowLeft, Search, Mail } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        {/* Logo */}
        <div className="mb-8 flex justify-center">
          <div className="text-center">
            <Image
              src="/recurso.png"
              alt="Sin Límites Agency"
              width={150}
              height={50}
              className="h-12 w-auto mx-auto"
              priority
            />
            <p className="mt-2 text-sm font-semibold text-gray-700">Sin Límites</p>
          </div>
        </div>

        {/* 404 Number */}
        <div className="mb-8">
          <h1 className="text-9xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            404
          </h1>
        </div>

        {/* Message */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            ¡Oops! Página no encontrada
          </h2>
          <p className="text-lg text-gray-600 mb-2">
            La página que buscas no existe o ha sido movida.
          </p>
          <p className="text-sm text-gray-500">
            Puede que el enlace esté roto o que hayas escrito mal la dirección.
          </p>
        </div>

        {/* Decorative Element */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full"></div>
            <Search className="relative h-24 w-24 text-primary/40" />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3 font-semibold text-white transition hover:bg-primary/90 shadow-lg hover:shadow-xl"
          >
            <Home className="h-5 w-5" />
            Ir al Inicio
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 rounded-full border-2 border-gray-300 bg-white px-8 py-3 font-semibold text-gray-700 transition hover:bg-gray-50 hover:border-gray-400"
          >
            <ArrowLeft className="h-5 w-5" />
            Volver Atrás
          </button>
        </div>

        {/* Quick Links */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-600 mb-4">Enlaces útiles:</p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link href="/" className="text-primary hover:underline">
              Inicio
            </Link>
            <Link href="/brochure" className="text-primary hover:underline">
              Brochure
            </Link>
            <Link href="/lading-pages" className="text-primary hover:underline">
              Landing Pages
            </Link>
            <Link href="/servicios/correo-corporativo" className="text-primary hover:underline">
              Correo Corporativo
            </Link>
          </div>
        </div>

        {/* Contact */}
        <div className="mt-8 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Mail className="h-5 w-5 text-primary" />
            <p className="font-semibold text-gray-900">¿Necesitas ayuda?</p>
          </div>
          <p className="text-sm text-gray-600 mb-3">
            Si crees que esto es un error o necesitas asistencia, contáctanos:
          </p>
          <div className="flex flex-col sm:flex-row gap-2 justify-center items-center text-sm">
            <a
              href="mailto:contact@sinlimites-agency.site"
              className="text-primary hover:underline font-medium"
            >
              contact@sinlimites-agency.site
            </a>
            <span className="hidden sm:inline text-gray-400">•</span>
            <a
              href="https://wa.me/584243603846"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline font-medium"
            >
              +58 424 360 3846
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-xs text-gray-500">
          <p>© 2026 Sin Límites Agency. Todos los derechos reservados.</p>
        </div>
      </div>
    </div>
  )
}
