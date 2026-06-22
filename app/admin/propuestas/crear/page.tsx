"use client"

import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createProposal, getCatalog, CatalogCategory, Credential } from "@/lib/actions"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import { Trash2, Plus, ArrowLeft, Loader2 } from "lucide-react"
import Link from "next/link"
import { GuidedTour, TourStep } from "@/components/ui/guided-tour"

const tourSteps: TourStep[] = [
  {
    target: "#tour-catalog-section",
    title: "Catálogo de Servicios",
    content: "Selecciona una Categoría, Servicio y Plan del catálogo. Esto pre-cargará automáticamente los valores sugeridos, incluyendo precios y características.",
  },
  {
    target: "#tour-features-field",
    title: "Características del Contrato",
    content: "Aquí se listan los detalles del servicio contratado. Puedes editarlos directamente. Cada línea representa un ítem que se mostrará con un ✓ en el contrato.",
  },
  {
    target: "#tour-service-fields",
    title: "Fechas e Inversión",
    content: "Especifica la inversión total, duración del contrato y fechas de vigencia. Las fechas de vencimiento se auto-calculan en base a la duración seleccionada.",
  },
  {
    target: "#tour-credentials-section",
    title: "Credenciales del Cliente",
    content: "Si estás entregando cuentas (como emails o accesos), puedes ingresarlos aquí para que el cliente los reciba de forma segura al firmar.",
  },
]

export default function CrearPropuestaPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  // Catálogo
  const [catalog, setCatalog] = useState<CatalogCategory[]>([])
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedService, setSelectedService] = useState("")
  const [selectedPlan, setSelectedPlan] = useState("")

  // Estados del contrato
  const [clientName, setClientName] = useState("")
  const [clientCompany, setClientCompany] = useState("")
  const [clientDomain, setClientDomain] = useState("")
  
  const [categoryName, setCategoryName] = useState("")
  const [serviceName, setServiceName] = useState("")
  const [planName, setPlanName] = useState("")
  const [startDate, setStartDate] = useState("")
  const [duration, setDuration] = useState("1 año")
  const [price, setPrice] = useState("")
  const [features, setFeatures] = useState("")
  
  const [invoiceNumber, setInvoiceNumber] = useState("")
  const [paymentStatus, setPaymentStatus] = useState("PENDIENTE")
  const [paymentDate, setPaymentDate] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("Binance")
  const [paymentAmount, setPaymentAmount] = useState("")
  const [domainIncluded, setDomainIncluded] = useState(false)
  const [domainExpiration, setDomainExpiration] = useState("")
  const [serviceExpiration, setServiceExpiration] = useState("")
  const [suspensionDate, setSuspensionDate] = useState("")

  // Estado de las credenciales
  const [credentials, setCredentials] = useState<Credential[]>([
    { description: "Cuenta de Administración", email: "", password: "" },
  ])

  // Cargar Catálogo e Inicializar Fecha de Inicio
  useEffect(() => {
    getCatalog().then((data) => {
      setCatalog(data)
    })

    const today = new Date()
    const yyyy = today.getFullYear()
    const mm = String(today.getMonth() + 1).padStart(2, "0")
    const dd = String(today.getDate()).padStart(2, "0")
    const todayISO = `${yyyy}-${mm}-${dd}`

    setStartDate(todayISO)
    setServiceExpiration(calculateExpirationDate(todayISO, "1 año"))
    setSuspensionDate(calculateExpirationDate(todayISO, "1 año"))
  }, [])

  const handleAddCredential = () => {
    setCredentials([...credentials, { description: "", email: "", password: "" }])
  }

  const handleRemoveCredential = (index: number) => {
    setCredentials(credentials.filter((_, i) => i !== index))
  }

  const handleCredentialChange = (index: number, field: keyof Credential, value: string) => {
    const updated = [...credentials]
    updated[index] = { ...updated[index], [field]: value }
    setCredentials(updated)
  }

  // Helper para calcular expiración en formato ISO YYYY-MM-DD
  const calculateExpirationDate = (startDateISO: string, durationStr: string) => {
    if (!startDateISO) return ""
    const date = new Date(startDateISO + "T00:00:00") // Evita desfases de zona horaria
    if (isNaN(date.getTime())) return ""

    const d = durationStr.toLowerCase()
    if (d.includes("5 años")) {
      date.setFullYear(date.getFullYear() + 5)
    } else if (d.includes("2 años")) {
      date.setFullYear(date.getFullYear() + 2)
    } else if (d.includes("1 año") || d.includes("año")) {
      date.setFullYear(date.getFullYear() + 1)
    } else if (d.includes("6 meses")) {
      date.setMonth(date.getMonth() + 6)
    } else if (d.includes("3 meses")) {
      date.setMonth(date.getMonth() + 3)
    } else if (d.includes("1 mes") || d.includes("mes")) {
      date.setMonth(date.getMonth() + 1)
    } else {
      date.setFullYear(date.getFullYear() + 1) // default 1 año
    }

    const yyyy = date.getFullYear()
    const mm = String(date.getMonth() + 1).padStart(2, "0")
    const dd = String(date.getDate()).padStart(2, "0")
    return `${yyyy}-${mm}-${dd}`
  }

  const filteredServices = catalog.find((c) => c.id === selectedCategory)?.services || []
  const filteredPlans = filteredServices.find((s) => s.id === selectedService)?.plans || []

  const handleCategoryChange = (val: string) => {
    setSelectedCategory(val)
    setSelectedService("")
    setSelectedPlan("")
    if (val === "custom") {
      setCategoryName("Personalizado")
    } else {
      const cat = catalog.find((c) => c.id === val)
      if (cat) {
        setCategoryName(cat.name)
      }
    }
  }

  const handleServiceChange = (val: string) => {
    setSelectedService(val)
    setSelectedPlan("")
    if (val === "custom") {
      setServiceName("")
    } else {
      const ser = filteredServices.find((s) => s.id === val)
      if (ser) {
        setServiceName(ser.name)
      }
    }
  }

  const handlePlanChange = (val: string) => {
    setSelectedPlan(val)
    if (val === "custom") {
      setPlanName("Personalizado")
    } else {
      const plan = filteredPlans.find((p) => p.id === val)
      if (plan) {
        setPlanName(plan.name)
        setPrice(plan.price.toString())
        setDuration(plan.duration)
        setFeatures(plan.features)
        
        // Auto-calcular fechas de vencimiento y suspensión
        const expiration = calculateExpirationDate(startDate, plan.duration)
        setServiceExpiration(expiration)
        setSuspensionDate(expiration)
      }
    }
  }

  const handleStartDateChange = (val: string) => {
    setStartDate(val)
    setServiceExpiration(calculateExpirationDate(val, duration))
  }

  const handleDurationChange = (val: string) => {
    setDuration(val)
    setServiceExpiration(calculateExpirationDate(startDate, val))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!clientName || !clientCompany || !serviceName) {
      toast.error("Por favor, llena los campos obligatorios del cliente y servicio.")
      return
    }

    setLoading(true)
    try {
      const proposalId = await createProposal(
        {
          client_name: clientName,
          client_company: clientCompany,
          client_domain: clientDomain,
          category_name: categoryName,
          service_name: serviceName,
          plan_name: planName,
          start_date: startDate,
          duration: duration,
          price: parseFloat(price) || 0,
          features: features,
          invoice_number: invoiceNumber,
          payment_status: paymentStatus,
          payment_date: paymentStatus === "PAGADO" ? paymentDate : "",
          payment_method: paymentStatus === "PAGADO" ? paymentMethod : "",
          payment_amount: paymentStatus === "PAGADO" ? parseFloat(paymentAmount) || 0 : 0,
          domain_included: domainIncluded ? 1 : 0,
          domain_expiration: domainIncluded ? domainExpiration : "",
          service_expiration: serviceExpiration,
          suspension_date: suspensionDate,
        },
        credentials.filter((c) => c.email && c.password)
      )

      toast.success("¡Propuesta y contrato creados con éxito!")
      router.push("/admin/propuestas")
      router.refresh()
    } catch (error) {
      console.error(error)
      toast.error("Hubo un error al crear la propuesta.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      {/* Tour Guiado */}
      <GuidedTour steps={tourSteps} tourKey="admin_propuestas_crear" />

      <div className="mb-6 flex items-center gap-3">
        <Link href="/admin/propuestas">
          <Button variant="outline" size="icon" className="border-slate-800 text-slate-400 hover:text-white cursor-pointer">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-white">Crear Nueva Propuesta</h1>
          <p className="text-slate-400 mt-1">Completa los detalles para generar un contrato interactivo dinámico</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Sección 1: Cliente */}
        <Card className="border-slate-800 bg-slate-950 text-white">
          <CardHeader>
            <CardTitle className="text-white">1. Datos del Cliente</CardTitle>
            <CardDescription className="text-slate-400">Información del cliente y dominio principal</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="clientName" className="text-slate-300">Nombre del Cliente *</Label>
              <Input
                id="clientName"
                placeholder="Ej. Valentina Alvarez"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="bg-slate-900 border-slate-800 text-white placeholder:text-slate-600 focus:border-primary"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="clientCompany" className="text-slate-300">Nombre de la Empresa *</Label>
              <Input
                id="clientCompany"
                placeholder="Ej. Alquimia Company"
                value={clientCompany}
                onChange={(e) => setClientCompany(e.target.value)}
                className="bg-slate-900 border-slate-800 text-white placeholder:text-slate-600 focus:border-primary"
                required
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="clientDomain" className="text-slate-300">Dominio de la Empresa</Label>
              <Input
                id="clientDomain"
                placeholder="Ej. alquimiacompany.com"
                value={clientDomain}
                onChange={(e) => setClientDomain(e.target.value)}
                className="bg-slate-900 border-slate-800 text-white placeholder:text-slate-600 focus:border-primary"
              />
            </div>
          </CardContent>
        </Card>

        {/* Sección 2: Detalles del Servicio */}
        <Card className="border-slate-800 bg-slate-950 text-white">
          <CardHeader>
            <CardTitle className="text-white">2. Catálogo de Servicios y Fechas</CardTitle>
            <CardDescription className="text-slate-400">Selecciona un servicio preestablecido o configúralo manualmente</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Catalog Selector Grid */}
            <div id="tour-catalog-section" className="grid gap-4 md:grid-cols-3 p-4 rounded-lg bg-slate-900/30 border border-slate-800">
              <div className="space-y-2">
                <Label htmlFor="catalogCategory" className="text-slate-300">Categoría del Servicio</Label>
                <Select value={selectedCategory} onValueChange={handleCategoryChange}>
                  <SelectTrigger id="catalogCategory" className="bg-slate-950 border-slate-800 text-white">
                    <SelectValue placeholder="Seleccione Categoría" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-950 border-slate-800 text-white">
                    {catalog.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id}>
                        {cat.name}
                      </SelectItem>
                    ))}
                    <SelectItem value="custom">-- Personalizado --</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="catalogService" className="text-slate-300">Servicio</Label>
                <Select
                  value={selectedService}
                  onValueChange={handleServiceChange}
                  disabled={!selectedCategory || selectedCategory === "custom"}
                >
                  <SelectTrigger id="catalogService" className="bg-slate-950 border-slate-800 text-white disabled:opacity-50">
                    <SelectValue placeholder="Seleccione Servicio" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-950 border-slate-800 text-white">
                    {filteredServices.map((ser) => (
                      <SelectItem key={ser.id} value={ser.id}>
                        {ser.name}
                      </SelectItem>
                    ))}
                    <SelectItem value="custom">-- Personalizado --</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="catalogPlan" className="text-slate-300">Plan / Suscripción</Label>
                <Select
                  value={selectedPlan}
                  onValueChange={handlePlanChange}
                  disabled={!selectedService || selectedService === "custom"}
                >
                  <SelectTrigger id="catalogPlan" className="bg-slate-950 border-slate-800 text-white disabled:opacity-50">
                    <SelectValue placeholder="Seleccione Plan" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-950 border-slate-800 text-white">
                    {filteredPlans.map((plan) => (
                      <SelectItem key={plan.id} value={plan.id}>
                        {plan.name} (${plan.price})
                      </SelectItem>
                    ))}
                    <SelectItem value="custom">-- Personalizado --</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Editable Fields Grid */}
            <div id="tour-service-fields" className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="categoryName" className="text-slate-300">Nombre de Categoría</Label>
                <Input
                  id="categoryName"
                  placeholder="Ej. Alojamiento Web y Dominios"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  className="bg-slate-900 border-slate-800 text-white placeholder:text-slate-600 focus:border-primary"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="serviceName" className="text-slate-300">Nombre del Servicio *</Label>
                <Input
                  id="serviceName"
                  placeholder="Ej. Correo Corporativo"
                  value={serviceName}
                  onChange={(e) => setServiceName(e.target.value)}
                  className="bg-slate-900 border-slate-800 text-white placeholder:text-slate-600 focus:border-primary"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="planName" className="text-slate-300">Nombre del Plan / Suscripción</Label>
                <Input
                  id="planName"
                  placeholder="Ej. Plan Básico o Plan Premium"
                  value={planName}
                  onChange={(e) => setPlanName(e.target.value)}
                  className="bg-slate-900 border-slate-800 text-white placeholder:text-slate-600 focus:border-primary"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="price" className="text-slate-300">Inversión del Plan ($ USD) *</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  placeholder="Ej. 419.58"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="bg-slate-900 border-slate-800 text-white placeholder:text-slate-600 focus:border-primary"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="duration" className="text-slate-300">Duración del Contrato *</Label>
                <Input
                  id="duration"
                  placeholder="Ej. 5 años, 1 año o 3 meses"
                  value={duration}
                  onChange={(e) => handleDurationChange(e.target.value)}
                  className="bg-slate-900 border-slate-800 text-white placeholder:text-slate-600 focus:border-primary"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="startDate" className="text-slate-300">Fecha de Inicio *</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={startDate}
                  onChange={(e) => handleStartDateChange(e.target.value)}
                  className="bg-slate-900 border-slate-800 text-white focus:border-primary"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="serviceExpiration" className="text-slate-300">Fecha de Vencimiento del Servicio *</Label>
                <Input
                  id="serviceExpiration"
                  type="date"
                  value={serviceExpiration}
                  onChange={(e) => setServiceExpiration(e.target.value)}
                  className="bg-slate-900 border-slate-800 text-white focus:border-primary"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="suspensionDate" className="text-slate-300">Fecha Límite para Suspensión</Label>
                <Input
                  id="suspensionDate"
                  type="date"
                  value={suspensionDate}
                  onChange={(e) => setSuspensionDate(e.target.value)}
                  className="bg-slate-900 border-slate-800 text-white focus:border-primary"
                />
              </div>

              <div id="tour-features-field" className="space-y-2 md:col-span-2">
                <Label htmlFor="features" className="text-slate-300">Características del Contrato (Una por línea) *</Label>
                <textarea
                  id="features"
                  placeholder="Escriba las características del servicio contratado..."
                  value={features}
                  onChange={(e) => setFeatures(e.target.value)}
                  rows={6}
                  className="w-full rounded-md border border-slate-800 bg-slate-900 p-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-slate-950 font-sans leading-relaxed"
                  required
                />
              </div>

              <div className="md:col-span-2 border-t border-slate-800 pt-4 mt-2">
                <div className="flex items-center gap-2 mb-4">
                  <input
                    type="checkbox"
                    id="domainIncluded"
                    className="h-4 w-4 rounded border-slate-800 bg-slate-950 text-primary focus:ring-primary focus:ring-offset-slate-950 cursor-pointer"
                    checked={domainIncluded}
                    onChange={(e) => setDomainIncluded(e.target.checked)}
                  />
                  <Label htmlFor="domainIncluded" className="cursor-pointer font-semibold text-white">
                    ¿Incluye compra/registro de Dominio en este contrato?
                  </Label>
                </div>

                {domainIncluded && (
                  <div className="space-y-2">
                    <Label htmlFor="domainExpiration" className="text-slate-300">Fecha de Vencimiento del Dominio</Label>
                    <Input
                      id="domainExpiration"
                      type="date"
                      value={domainExpiration}
                      onChange={(e) => setDomainExpiration(e.target.value)}
                      className="bg-slate-900 border-slate-800 text-white focus:border-primary"
                    />
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sección 3: Factura y Pagos */}
        <Card className="border-slate-800 bg-slate-950 text-white">
          <CardHeader>
            <CardTitle className="text-white">3. Factura y Estado de Pago</CardTitle>
            <CardDescription className="text-slate-400">Datos fiscales del cobro</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="invoiceNumber" className="text-slate-300">Número de Factura *</Label>
              <Input
                id="invoiceNumber"
                placeholder="Ej. ALQ-2026-002"
                value={invoiceNumber}
                onChange={(e) => setInvoiceNumber(e.target.value)}
                className="bg-slate-900 border-slate-800 text-white placeholder:text-slate-600 focus:border-primary"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="paymentStatus" className="text-slate-300">Estado del Pago</Label>
              <Select value={paymentStatus} onValueChange={setPaymentStatus}>
                <SelectTrigger id="paymentStatus" className="bg-slate-950 border-slate-800 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-950 border-slate-800 text-white">
                  <SelectItem value="PENDIENTE">PENDIENTE</SelectItem>
                  <SelectItem value="PAGADO">PAGADO</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {paymentStatus === "PAGADO" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="paymentMethod" className="text-slate-300">Método de Pago</Label>
                  <Input
                    id="paymentMethod"
                    placeholder="Ej. Binance (USDT), Pago Móvil"
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="bg-slate-900 border-slate-800 text-white placeholder:text-slate-600 focus:border-primary"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="paymentDate" className="text-slate-300">Fecha de Recepción del Pago</Label>
                  <Input
                    id="paymentDate"
                    type="date"
                    value={paymentDate}
                    onChange={(e) => setPaymentDate(e.target.value)}
                    className="bg-slate-900 border-slate-800 text-white focus:border-primary"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="paymentAmount" className="text-slate-300">Monto Recibido ($ USD)</Label>
                  <Input
                    id="paymentAmount"
                    type="number"
                    step="0.01"
                    placeholder="Ej. 419.58"
                    value={paymentAmount}
                    onChange={(e) => setPaymentAmount(e.target.value)}
                    className="bg-slate-900 border-slate-800 text-white placeholder:text-slate-600 focus:border-primary"
                  />
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Sección 4: Credenciales */}
        <Card id="tour-credentials-section" className="border-slate-800 bg-slate-950 text-white">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-white">4. Credenciales de Acceso (Opcional)</CardTitle>
                <CardDescription className="text-slate-400">Cuentas de acceso rápido que se le entregarán al cliente</CardDescription>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleAddCredential}
                className="flex gap-1 border-slate-800 hover:bg-slate-900 text-slate-300 hover:text-white cursor-pointer"
              >
                <Plus className="h-4 w-4" />
                Agregar
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {credentials.map((cred, index) => (
              <div key={index} className="flex flex-col md:flex-row gap-3 p-4 border border-slate-800 rounded-lg bg-slate-900/30 relative">
                <div className="flex-1 space-y-2">
                  <Label className="text-slate-300">Descripción de la cuenta</Label>
                  <Input
                    placeholder="Ej. Cuenta de Gerencia"
                    value={cred.description}
                    onChange={(e) => handleCredentialChange(index, "description", e.target.value)}
                    className="bg-slate-900 border-slate-800 text-white placeholder:text-slate-600 focus:border-primary"
                  />
                </div>
                <div className="flex-1 space-y-2">
                  <Label className="text-slate-300">Email *</Label>
                  <Input
                    type="email"
                    placeholder="Ej. gerencia@tumarca.com"
                    value={cred.email}
                    onChange={(e) => handleCredentialChange(index, "email", e.target.value)}
                    className="bg-slate-900 border-slate-800 text-white placeholder:text-slate-600 focus:border-primary"
                  />
                </div>
                <div className="flex-1 space-y-2">
                  <Label className="text-slate-300">Contraseña *</Label>
                  <Input
                    placeholder="Ej. Contrasena123*"
                    value={cred.password}
                    onChange={(e) => handleCredentialChange(index, "password", e.target.value)}
                    className="bg-slate-900 border-slate-800 text-white placeholder:text-slate-600 focus:border-primary"
                  />
                </div>
                {credentials.length > 1 && (
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="self-end md:mb-1 bg-red-950/40 border border-red-800/30 text-red-400 hover:bg-red-900/60 cursor-pointer"
                    onClick={() => handleRemoveCredential(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="flex justify-end gap-3">
          <Link href="/admin/propuestas">
            <Button type="button" variant="outline" disabled={loading} className="border-slate-800 hover:bg-slate-900 text-slate-300 hover:text-white cursor-pointer">
              Cancelar
            </Button>
          </Link>
          <Button type="submit" disabled={loading} className="px-6 bg-primary text-white hover:bg-primary/90 cursor-pointer">
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creando...
              </>
            ) : (
              "Guardar Propuesta"
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}
