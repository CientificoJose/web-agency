"use client"

import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { updateProposal, Credential, CatalogCategory, Proposal } from "@/lib/actions"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import { Trash2, Plus, ArrowLeft, Loader2 } from "lucide-react"
import Link from "next/link"

interface EditarPropuestaClientProps {
  proposal: Proposal
  initialCredentials: Credential[]
  catalog: CatalogCategory[]
}

export default function EditarPropuestaClient({ proposal, initialCredentials, catalog }: EditarPropuestaClientProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  // Helper para parsear fecha friendly "22 de Junio, 2026" a ISO "2026-06-22"
  const parseFriendlyDateToISO = (dateStr: string) => {
    if (!dateStr) return ""
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return dateStr

    try {
      const cleaned = dateStr.toLowerCase().replace(/de/g, "").replace(/\s+/g, " ").trim()
      const parts = cleaned.split(" ")
      if (parts.length >= 3) {
        const day = String(parseInt(parts[0]) || 1).padStart(2, "0")
        const year = parts[2].replace(",", "").trim()
        const months: { [key: string]: string } = {
          enero: "01",
          febrero: "02",
          marzo: "03",
          abril: "04",
          mayo: "05",
          junio: "06",
          julio: "07",
          agosto: "08",
          septiembre: "09",
          octubre: "10",
          noviembre: "11",
          diciembre: "12",
        }
        const monthName = parts[1].replace(",", "").trim()
        const month = months[monthName] || "01"
        return `${year}-${month}-${day}`
      }
    } catch (e) {
      console.error("Error parsing date: ", dateStr, e)
    }

    // Fallback today ISO
    const today = new Date()
    const yyyy = today.getFullYear()
    const mm = String(today.getMonth() + 1).padStart(2, "0")
    const dd = String(today.getDate()).padStart(2, "0")
    return `${yyyy}-${mm}-${dd}`
  }

  // Catálogo selectores
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedService, setSelectedService] = useState("")
  const [selectedPlan, setSelectedPlan] = useState("")

  // Estados del contrato
  const [clientName, setClientName] = useState(proposal.client_name)
  const [clientCompany, setClientCompany] = useState(proposal.client_company)
  const [clientDomain, setClientDomain] = useState(proposal.client_domain || "")
  
  const [categoryName, setCategoryName] = useState(proposal.category_name || "")
  const [serviceName, setServiceName] = useState(proposal.service_name)
  const [planName, setPlanName] = useState(proposal.plan_name || "")
  const [startDate, setStartDate] = useState(parseFriendlyDateToISO(proposal.start_date))
  const [duration, setDuration] = useState(proposal.duration || "1 año")
  const [price, setPrice] = useState(proposal.price ? proposal.price.toString() : "")
  const [features, setFeatures] = useState(proposal.features || "")
  
  const [invoiceNumber, setInvoiceNumber] = useState(proposal.invoice_number || "")
  const [paymentStatus, setPaymentStatus] = useState(proposal.payment_status || "PENDIENTE")
  const [paymentDate, setPaymentDate] = useState(parseFriendlyDateToISO(proposal.payment_date || ""))
  const [paymentMethod, setPaymentMethod] = useState(proposal.payment_method || "Binance")
  const [paymentAmount, setPaymentAmount] = useState(proposal.payment_amount ? proposal.payment_amount.toString() : "")
  const [domainIncluded, setDomainIncluded] = useState(proposal.domain_included === 1)
  const [domainExpiration, setDomainExpiration] = useState(parseFriendlyDateToISO(proposal.domain_expiration || ""))
  const [serviceExpiration, setServiceExpiration] = useState(parseFriendlyDateToISO(proposal.service_expiration || ""))
  const [suspensionDate, setSuspensionDate] = useState(parseFriendlyDateToISO(proposal.suspension_date || ""))

  // Estado de las credenciales
  const [credentials, setCredentials] = useState<Credential[]>(
    initialCredentials.length > 0 
      ? initialCredentials 
      : [{ description: "Cuenta de Administración", email: "", password: "" }]
  )

  // Inicializar selectores de catálogo basados en los datos de la propuesta
  useEffect(() => {
    if (proposal.category_name) {
      const cat = catalog.find((c) => c.name === proposal.category_name)
      if (cat) {
        setSelectedCategory(cat.id)
        
        const ser = cat.services.find((s) => s.name === proposal.service_name)
        if (ser) {
          setSelectedService(ser.id)
          
          const plan = ser.plans.find((p) => p.name === proposal.plan_name)
          if (plan) {
            setSelectedPlan(plan.id)
          } else {
            setSelectedPlan("custom")
          }
        } else {
          setSelectedService("custom")
          setSelectedPlan("custom")
        }
      } else {
        setSelectedCategory("custom")
        setSelectedService("custom")
        setSelectedPlan("custom")
      }
    } else {
      setSelectedCategory("custom")
      setSelectedService("custom")
      setSelectedPlan("custom")
    }
  }, [catalog, proposal])

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

  // Helper para calcular expiración
  const calculateExpirationDate = (startDateISO: string, durationStr: string) => {
    if (!startDateISO) return ""
    const date = new Date(startDateISO + "T00:00:00")
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
      await updateProposal(
        proposal.id,
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

      toast.success("¡Propuesta y contrato actualizados con éxito!")
      router.push("/admin/propuestas")
      router.refresh()
    } catch (error) {
      console.error(error)
      toast.error("Hubo un error al actualizar la propuesta.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-6 flex items-center gap-3">
        <Link href="/admin/propuestas">
          <Button variant="outline" size="icon" className="border-slate-800 text-slate-400 hover:text-white cursor-pointer">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-white">Editar Propuesta</h1>
          <p className="text-slate-400 mt-1">Modifica los detalles del contrato de {proposal.client_company}</p>
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
            <div className="grid gap-4 md:grid-cols-3 p-4 rounded-lg bg-slate-900/30 border border-slate-800">
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
            <div className="grid gap-4 md:grid-cols-2">
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

              <div className="space-y-2 md:col-span-2">
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
        <Card className="border-slate-800 bg-slate-950 text-white">
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
                Actualizando...
              </>
            ) : (
              "Guardar Cambios"
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}
