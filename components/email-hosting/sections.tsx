"use client"

import { useState } from "react"
import { Mail, Shield, TrendingDown, Check, X, ArrowRight, Clock, Settings, Rocket, CheckCircle2, ChevronDown, MessageSquare } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black py-20 md:py-32">
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
      <div className="container relative mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm text-primary">
            <Mail className="h-4 w-4" />
            <span>Correo Corporativo Profesional</span>
          </div>
          <h1 className="mb-6 text-4xl font-bold text-white md:text-6xl lg:text-7xl">
            Correo Corporativo sin Complicaciones
          </h1>
          <p className="mb-8 text-lg text-gray-300 md:text-xl">
            Deja de usar <span className="text-red-400 line-through">@gmail.com</span> en tu negocio. Tu marca merece un correo con tu dominio, gestionado por expertos.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="#pricing"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-lg font-semibold text-white transition hover:bg-primary/90"
            >
              Cotizar mi Plan
              <ArrowRight className="h-5 w-5" />
            </a>
            <a
              href="#comparison"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-8 py-4 text-lg font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
            >
              Ver Comparativa
            </a>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-6 backdrop-blur-sm">
              <p className="mb-2 text-sm font-medium text-red-300">❌ Antes</p>
              <p className="text-lg text-white">contacto@gmail.com</p>
              <p className="mt-2 text-sm text-gray-400">Poco profesional, sin control</p>
            </div>
            <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-6 backdrop-blur-sm">
              <p className="mb-2 text-sm font-medium text-emerald-300">✅ Después</p>
              <p className="text-lg text-white">contacto@tumarca.com</p>
              <p className="mt-2 text-sm text-gray-400">Profesional, seguro, tuyo</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export function ValuePropositions() {
  const values = [
    {
      icon: CheckCircle2,
      title: "Profesionalismo",
      description: "Tu marca con dominio propio genera 10x más confianza que @gmail.com",
      color: "text-primary",
    },
    {
      icon: Shield,
      title: "Seguridad",
      description: "Protección anti-spam, SPF/DKIM/DMARC configurados por expertos",
      color: "text-blue-500",
    },
    {
      icon: TrendingDown,
      title: "Ahorro",
      description: "Hasta 70% más económico que Google Workspace o Microsoft 365",
      color: "text-emerald-500",
    },
  ]

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
            ¿Por qué cambiar a correo corporativo gestionado?
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Profesionaliza tu comunicación y ahorra tiempo y dinero
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {values.map((value) => (
            <div
              key={value.title}
              className="group rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition hover:border-primary/30 hover:shadow-lg"
            >
              <div className={`mb-4 inline-flex rounded-full bg-gray-100 p-4 ${value.color}`}>
                <value.icon className="h-8 w-8" />
              </div>
              <h3 className="mb-3 text-xl font-semibold text-gray-900">{value.title}</h3>
              <p className="text-gray-600">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function ComparisonTable() {
  const features = [
    { name: "Precio/mes (5 usuarios)", google: "~$30 USD", microsoft: "~$25 USD", ours: "$9.99 USD", highlight: true },
    { name: "Dominio incluido", google: false, microsoft: false, ours: "Adicional" },
    { name: "Soporte técnico", google: "Limitado", microsoft: "Limitado", ours: "Personalizado" },
    { name: "Configuración inicial", google: "Tú lo haces", microsoft: "Tú lo haces", ours: "Nosotros" },
    { name: "Spam/Seguridad", google: "Básico", microsoft: "Básico", ours: "SPF/DKIM/DMARC" },
  ]

  return (
    <section id="comparison" className="bg-gray-50 py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">Compara y Ahorra</h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            La misma calidad profesional, a una fracción del costo
          </p>
        </div>
        <div className="mx-auto max-w-5xl overflow-x-auto">
          <table className="w-full rounded-2xl bg-white shadow-lg">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="p-4 text-left text-sm font-semibold text-gray-900 md:p-6">Característica</th>
                <th className="p-4 text-center text-sm font-semibold text-gray-600 md:p-6">Google Workspace</th>
                <th className="p-4 text-center text-sm font-semibold text-gray-600 md:p-6">Microsoft 365</th>
                <th className="p-4 text-center text-sm font-semibold text-primary md:p-6">Nuestro Servicio</th>
              </tr>
            </thead>
            <tbody>
              {features.map((feature, idx) => (
                <tr key={feature.name} className={idx !== features.length - 1 ? "border-b border-gray-100" : ""}>
                  <td className="p-4 text-sm text-gray-900 md:p-6">{feature.name}</td>
                  <td className="p-4 text-center text-sm text-gray-600 md:p-6">
                    {typeof feature.google === "boolean" ? (
                      feature.google ? (
                        <Check className="mx-auto h-5 w-5 text-emerald-500" />
                      ) : (
                        <X className="mx-auto h-5 w-5 text-red-500" />
                      )
                    ) : (
                      feature.google
                    )}
                  </td>
                  <td className="p-4 text-center text-sm text-gray-600 md:p-6">
                    {typeof feature.microsoft === "boolean" ? (
                      feature.microsoft ? (
                        <Check className="mx-auto h-5 w-5 text-emerald-500" />
                      ) : (
                        <X className="mx-auto h-5 w-5 text-red-500" />
                      )
                    ) : (
                      feature.microsoft
                    )}
                  </td>
                  <td className={`p-4 text-center text-sm md:p-6 ${feature.highlight ? "font-bold text-primary" : "text-gray-900"}`}>
                    {typeof feature.ours === "boolean" ? (
                      feature.ours ? (
                        <Check className="mx-auto h-5 w-5 text-emerald-500" />
                      ) : (
                        <X className="mx-auto h-5 w-5 text-red-500" />
                      )
                    ) : (
                      feature.ours
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-8 text-center">
          <a
            href="#pricing"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-lg font-semibold text-white transition hover:bg-primary/90"
          >
            Quiero mi correo profesional
            <ArrowRight className="h-5 w-5" />
          </a>
        </div>
      </div>
    </section>
  )
}

export function PricingCards() {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "annual" | "biennial">("monthly")

  console.log("Current billing period:", billingPeriod)

  const plans = [
    {
      name: "Básico",
      monthlyPrice: 9.99,
      description: "Ideal para emprendedores y freelancers",
      features: [
        "hasta 3 cuentas de correo",
        "1 GB de almacenamiento total",
        "Configuración completa",
        "Soporte por email",
        "Webmail incluido",
      ],
      cta: "Empezar Ahora",
      popular: false,
    },
    {
      name: "Pyme",
      monthlyPrice: 19.99,
      description: "Perfecto para pequeñas y medianas empresas",
      features: [
        "hasta 10 cuentas de correo",
        "5 GB de almacenamiento total",
        "Configuración + migración",
        "Soporte prioritario (WhatsApp)",
        "Webmail + IMAP/SMTP",
      ],
      cta: "Plan Recomendado",
      popular: true,
    },
    {
      name: "Corporativo",
      monthlyPrice: 49.99,
      description: "Para empresas que necesitan escalabilidad",
      features: [
        "hasta 25 cuentas",
        "10 GB de almacenamiento total",
        "Migración completa + capacitación",
        "Soporte 24/7 (WhatsApp + Email)",
        "Webmail + IMAP/SMTP + API",
      ],
      cta: "Contactar Ventas",
      popular: false,
    },
  ]

  const calculatePrice = (monthlyPrice: number) => {
    if (billingPeriod === "monthly") {
      return { price: monthlyPrice.toFixed(2), period: "/mes", total: null, discount: null }
    }
    if (billingPeriod === "annual") {
      const annualPrice = monthlyPrice * 10
      const savings = (monthlyPrice * 12 - annualPrice).toFixed(2)
      return { 
        price: annualPrice.toFixed(2), 
        period: "/año", 
        total: `$${(monthlyPrice * 12).toFixed(2)}`,
        discount: "16.67%",
        savings: `$${savings}`
      }
    }
    const biennialPrice = monthlyPrice * 24 * 0.80
    const savings = (monthlyPrice * 24 - biennialPrice).toFixed(2)
    return { 
      price: biennialPrice.toFixed(2), 
      period: "/2 años", 
      total: `$${(monthlyPrice * 24).toFixed(2)}`,
      discount: "20%",
      savings: `$${savings}`
    }
  }

  return (
    <section id="pricing" className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
            Elige el Plan que se Ajusta a tu Negocio
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Sin contratos largos. Cancela cuando quieras.
          </p>
          
          <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white p-2 shadow-sm relative z-10">
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                console.log("Clicking monthly")
                setBillingPeriod("monthly")
              }}
              className={`rounded-full px-6 py-2 text-sm font-semibold transition cursor-pointer ${
                billingPeriod === "monthly"
                  ? "bg-primary text-white"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Mensual
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                console.log("Clicking annual")
                setBillingPeriod("annual")
              }}
              className={`rounded-full px-6 py-2 text-sm font-semibold transition cursor-pointer ${
                billingPeriod === "annual"
                  ? "bg-primary text-white"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Anual
              <span className="ml-1 text-xs">(-17%)</span>
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                console.log("Clicking biennial")
                setBillingPeriod("biennial")
              }}
              className={`rounded-full px-6 py-2 text-sm font-semibold transition cursor-pointer ${
                billingPeriod === "biennial"
                  ? "bg-primary text-white"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              2 Años
              <span className="ml-1 text-xs">(-20%)</span>
            </button>
          </div>
        </div>
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-3">
          {plans.map((plan) => {
            const pricing = calculatePrice(plan.monthlyPrice)
            return (
              <div
                key={plan.name}
                className={`relative rounded-2xl border p-8 shadow-lg transition hover:shadow-xl ${
                  plan.popular
                    ? "border-primary bg-gradient-to-br from-primary/5 to-primary/10"
                    : "border-gray-200 bg-white"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-sm font-semibold text-white">
                    ⭐ Más Popular
                  </div>
                )}
                {pricing.discount && (
                  <div className="absolute -top-4 right-4 rounded-full bg-emerald-500 px-3 py-1 text-xs font-semibold text-white">
                    Ahorra {pricing.discount}
                  </div>
                )}
                <div className="mb-6">
                  <h3 className="mb-2 text-2xl font-bold text-gray-900">{plan.name}</h3>
                  <p className="text-sm text-gray-600">{plan.description}</p>
                </div>
                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-gray-900">${pricing.price}</span>
                    <span className="text-lg text-gray-600">{pricing.period}</span>
                  </div>
                  {pricing.total && (
                    <div className="mt-2 text-sm text-gray-500">
                      <span className="line-through">{pricing.total}</span>
                      <span className="ml-2 font-semibold text-emerald-600">Ahorras {pricing.savings}</span>
                    </div>
                  )}
                </div>
                <ul className="mb-8 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="#contact"
                  className={`block w-full rounded-full py-3 text-center font-semibold transition ${
                    plan.popular
                      ? "bg-primary text-white hover:bg-primary/90"
                      : "border border-gray-300 bg-white text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  {plan.cta}
                </a>
              </div>
            )
          })}
        </div>
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 rounded-xl border border-blue-200 bg-blue-50 px-6 py-4 text-sm text-blue-900">
            <Mail className="h-5 w-5" />
            <span>
              <strong>Dominio:</strong> Adicional desde $20/año o usa el tuyo propio
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

export function OnboardingTimeline() {
  const steps = [
    {
      icon: CheckCircle2,
      title: "Contratas",
      description: "Eliges tu plan y pagas (Binance/USDT o transferencia)",
    },
    {
      icon: Settings,
      title: "Configuramos",
      description: "Compramos tu dominio (opcional) y configuramos el servidor (24-48h)",
    },
    {
      icon: Rocket,
      title: "Migramos",
      description: "Transferimos tus correos antiguos (si aplica)",
    },
    {
      icon: Mail,
      title: "Listo",
      description: "Recibes credenciales y tutorial de uso",
    },
  ]

  return (
    <section className="bg-gray-50 py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">¿Cómo Funciona? Simple y Rápido</h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            En 4 pasos tienes tu correo corporativo funcionando
          </p>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-4">
          {steps.map((step, idx) => (
            <div key={step.title} className="relative">
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-white">
                  <step.icon className="h-8 w-8" />
                </div>
                <div className="mb-2 text-sm font-semibold text-primary">Paso {idx + 1}</div>
                <h3 className="mb-2 text-lg font-bold text-gray-900">{step.title}</h3>
                <p className="text-sm text-gray-600">{step.description}</p>
              </div>
              {idx < steps.length - 1 && (
                <div className="absolute left-1/2 top-8 hidden h-0.5 w-full bg-gradient-to-r from-primary to-primary/30 md:block"></div>
              )}
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-6 py-4 text-sm text-emerald-900">
            <Shield className="h-5 w-5" />
            <span>
              <strong>Todo el proceso técnico</strong> (DNS, SPF, DKIM, DMARC, PTR) lo hacemos nosotros. Tú solo usas tu correo.
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = [
    {
      question: "¿Puedo migrar mis correos de Gmail/Outlook?",
      answer:
        "Sí, incluimos migración de correos en los planes Pyme y Corporativo. Para el plan Básico, ofrecemos asistencia técnica para que lo hagas tú mismo.",
    },
    {
      question: "¿Qué pasa si necesito más cuentas después?",
      answer:
        "Puedes actualizar tu plan en cualquier momento. Si solo necesitas 1-2 cuentas adicionales, podemos ajustar el precio sin cambiar de plan.",
    },
    {
      question: "¿Cómo accedo a mi correo?",
      answer:
        "Tienes 3 opciones: (1) Webmail desde cualquier navegador, (2) Configuración IMAP/SMTP en Outlook, Thunderbird, etc., (3) App de correo en tu móvil. Te enviamos guías paso a paso.",
    },
    {
      question: "¿Qué sucede si envío spam o correos masivos?",
      answer:
        "Nuestros términos prohíben estrictamente el envío de spam o correos masivos no solicitados. Violaciones resultan en suspensión inmediata sin reembolso para proteger la reputación de nuestra IP compartida.",
    },
    {
      question: "¿El dominio es mío o de ustedes?",
      answer:
        "Si compras el dominio con nosotros, es 100% tuyo. Te damos acceso completo al panel de control. Si ya tienes un dominio, solo necesitamos que apuntes los registros DNS que te indicamos.",
    },
    {
      question: "¿Qué incluye el soporte técnico?",
      answer:
        "Plan Básico: soporte por email (24-48h). Plan Pyme: WhatsApp prioritario (12h). Plan Corporativo: WhatsApp 24/7 (4h). Todos los planes incluyen base de conocimiento y tutoriales.",
    },
  ]

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">Preguntas Frecuentes</h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Resolvemos tus dudas antes de empezar
          </p>
        </div>
        <div className="mx-auto max-w-3xl space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
              <button
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="flex w-full items-center justify-between p-6 text-left transition hover:bg-gray-50"
              >
                <span className="font-semibold text-gray-900">{faq.question}</span>
                <ChevronDown
                  className={`h-5 w-5 flex-shrink-0 text-gray-500 transition ${openIndex === idx ? "rotate-180" : ""}`}
                />
              </button>
              {openIndex === idx && (
                <div className="border-t border-gray-100 bg-gray-50 p-6">
                  <p className="text-gray-700">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function AntiSpamTerms() {
  return (
    <section className="bg-gray-50 py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-4xl rounded-2xl border border-red-200 bg-red-50 p-8 md:p-12">
          <div className="mb-6 flex items-center gap-3">
            <Shield className="h-8 w-8 text-red-600" />
            <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">Política de Uso Responsable</h2>
          </div>
          <div className="space-y-4 text-gray-700">
            <p>
              <strong>Prohibido:</strong> Envío masivo no solicitado (spam), phishing, o cualquier actividad ilegal a través de nuestros servidores.
            </p>
            <p>
              <strong>Consecuencias:</strong> Violaciones resultan en suspensión inmediata de la cuenta sin reembolso. Esto es necesario para proteger la reputación de nuestra IP compartida y garantizar la entregabilidad de correos para todos nuestros clientes.
            </p>
            <p>
              <strong>Uso permitido:</strong> Correos transaccionales, newsletters con opt-in verificado (lista propia), comunicación comercial B2B/B2C legítima.
            </p>
          </div>
          <div className="mt-6">
            <Link
              href="/terminos-servicio-email"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
            >
              Leer Términos Completos
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export function FinalCTA() {
  const whatsappNumber = "584243603846"
  const whatsappMessage = encodeURIComponent(
    "Hola, quiero información sobre el servicio de correo corporativo gestionado"
  )

  return (
    <section id="contact" className="bg-gradient-to-br from-gray-900 via-gray-800 to-black py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-6 text-3xl font-bold text-white md:text-4xl">
            ¿Listo para Profesionalizar tu Correo?
          </h2>
          <p className="mb-8 text-lg text-gray-300">
            Únete a decenas de negocios que ya confían en nosotros. Sin contratos largos, sin complicaciones técnicas.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-8 py-4 text-lg font-semibold text-white transition hover:bg-emerald-600"
            >
              <MessageSquare className="h-5 w-5" />
              Contactar por WhatsApp
            </a>
            <a
              href="mailto:contact@sinlimites-agency.site"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-8 py-4 text-lg font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
            >
              <Mail className="h-5 w-5" />
              Enviar Email
            </a>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
              <div className="mb-2 text-3xl font-bold text-primary">$9.99</div>
              <p className="text-sm text-gray-300">Desde solo</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
              <div className="mb-2 text-3xl font-bold text-primary">24-48h</div>
              <p className="text-sm text-gray-300">Tiempo de activación</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
              <div className="mb-2 text-3xl font-bold text-primary">24/7</div>
              <p className="text-sm text-gray-300">Soporte disponible</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
