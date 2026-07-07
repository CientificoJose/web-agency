"use client"

import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { updateProposal, Credential, CatalogCategory, Proposal, ProposalService, ProposalCollaborator } from "@/lib/actions"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import { Trash2, Plus, ArrowLeft, Loader2, Calendar } from "lucide-react"
import Link from "next/link"

interface EditarPropuestaClientProps {
  proposal: Proposal
  initialCredentials: Credential[]
  initialServices: ProposalService[]
  initialCollaborators: ProposalCollaborator[]
  catalog: CatalogCategory[]
}

interface ServiceFormState {
  category_id: string
  service_id: string
  plan_id: string
  category_name: string
  service_name: string
  plan_name: string
  price: string
  billing_type: 'RECURRENT' | 'ONE_TIME'
  billing_cycle: string
  features: string
  policies: string
  start_date: string
  expiration_date: string
  suspension_date: string
  domain_included: boolean
  domain_expiration: string
}

export default function EditarPropuestaClient({
  proposal,
  initialCredentials,
  initialServices,
  initialCollaborators,
  catalog
}: EditarPropuestaClientProps) {
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

    const today = new Date()
    return today.toISOString().split("T")[0]
  }

  // Cliente
  const [clientName, setClientName] = useState(proposal.client_name)
  const [clientCompany, setClientCompany] = useState(proposal.client_company)
  const [clientDomain, setClientDomain] = useState(proposal.client_domain || "")
  const [invoiceNumber, setInvoiceNumber] = useState(proposal.invoice_number || "")
  const [paymentStatus, setPaymentStatus] = useState(proposal.payment_status || "PENDIENTE")
  const [paymentDate, setPaymentDate] = useState(parseFriendlyDateToISO(proposal.payment_date || ""))
  const [paymentMethod, setPaymentMethod] = useState(proposal.payment_method || "Binance")

  // Branding Custom
  const [brandColorPrimary, setBrandColorPrimary] = useState(proposal.brand_color_primary || "")
  const [brandColorSecondary, setBrandColorSecondary] = useState(proposal.brand_color_secondary || "")
  const [brandLogoUrl, setBrandLogoUrl] = useState(proposal.brand_logo_url || "")

  // Morosidad
  const [graceDays, setGraceDays] = useState(proposal.grace_days?.toString() || "0")
  const [lateFeePercentage, setLateFeePercentage] = useState(proposal.late_fee_percentage?.toString() || "0")
  const [dailyPenaltyFee, setDailyPenaltyFee] = useState(proposal.daily_penalty_fee?.toString() || "0")

  // Servicios
  const [services, setServices] = useState<ServiceFormState[]>(() => {
    return initialServices.map(s => ({
      category_id: "",
      service_id: "",
      plan_id: "",
      category_name: s.category_name,
      service_name: s.service_name,
      plan_name: s.plan_name,
      price: s.price.toString(),
      billing_type: s.billing_type || "RECURRENT",
      billing_cycle: s.billing_cycle || "monthly",
      features: s.features,
      policies: s.policies || "",
      start_date: parseFriendlyDateToISO(s.start_date || ""),
      expiration_date: parseFriendlyDateToISO(s.expiration_date || ""),
      suspension_date: parseFriendlyDateToISO(s.suspension_date || ""),
      domain_included: s.domain_included === 1,
      domain_expiration: parseFriendlyDateToISO(s.domain_expiration || "")
    }))
  })

  // Colaboradores
  const [collaborators, setCollaborators] = useState<ProposalCollaborator[]>(initialCollaborators)

  // Credenciales
  const [credentials, setCredentials] = useState<Credential[]>(
    initialCredentials.length > 0
      ? initialCredentials
      : [{ description: "Cuenta de Administración", email: "", password: "" }]
  )

  // Cargar IDs de catálogo basados en los nombres pre-cargados
  useEffect(() => {
    const updated = [...services]
    let modified = false
    updated.forEach((service) => {
      if (!service.category_id && service.category_name) {
        const cat = catalog.find(c => c.name === service.category_name)
        if (cat) {
          service.category_id = cat.id
          const ser = cat.services.find(s => s.name === service.service_name)
          if (ser) {
            service.service_id = ser.id
            const plan = ser.plans.find(p => p.name === service.plan_name)
            if (plan) {
              service.plan_id = plan.id
            } else {
              service.plan_id = "custom"
            }
          } else {
            service.service_id = "custom"
            service.plan_id = "custom"
          }
          modified = true
        } else {
          service.category_id = "custom"
          service.service_id = "custom"
          service.plan_id = "custom"
          modified = true
        }
      }
    })
    if (modified) {
      setServices(updated)
    }
  }, [catalog])

  const calculateExpDate = (startDateISO: string, cycle: string) => {
    if (!startDateISO) return ""
    const date = new Date(startDateISO + "T00:00:00")
    if (isNaN(date.getTime())) return ""

    if (cycle === "15_days") {
      date.setDate(date.getDate() + 15)
    } else if (cycle === "monthly") {
      date.setMonth(date.getMonth() + 1)
    } else if (cycle === "quarterly") {
      date.setMonth(date.getMonth() + 3)
    } else if (cycle === "semiannually") {
      date.setMonth(date.getMonth() + 6)
    } else if (cycle === "annually") {
      date.setFullYear(date.getFullYear() + 1)
    } else {
      date.setMonth(date.getMonth() + 1)
    }

    const yyyy = date.getFullYear()
    const mm = String(date.getMonth() + 1).padStart(2, "0")
    const dd = String(date.getDate()).padStart(2, "0")
    return `${yyyy}-${mm}-${dd}`
  }

  const handleAddService = () => {
    const todayISO = new Date().toISOString().split("T")[0]
    setServices([
      ...services,
      {
        category_id: "",
        service_id: "",
        plan_id: "",
        category_name: "",
        service_name: "",
        plan_name: "",
        price: "",
        billing_type: "RECURRENT",
        billing_cycle: "monthly",
        features: "",
        policies: "",
        start_date: todayISO,
        expiration_date: calculateExpDate(todayISO, "monthly"),
        suspension_date: calculateExpDate(todayISO, "monthly"),
        domain_included: false,
        domain_expiration: ""
      }
    ])
  }

  const handleRemoveService = (index: number) => {
    setServices(services.filter((_, i) => i !== index))
  }

  const handleServiceChange = (index: number, key: keyof ServiceFormState, value: any) => {
    const updated = [...services]
    updated[index] = { ...updated[index], [key]: value }

    if (key === "start_date" || key === "billing_cycle") {
      const sDate = updated[index].start_date
      const cycle = updated[index].billing_cycle
      if (sDate) {
        const exp = calculateExpDate(sDate, cycle)
        updated[index].expiration_date = exp
        
        const gDays = parseInt(graceDays) || 0
        const expDate = new Date(exp + "T00:00:00")
        if (!isNaN(expDate.getTime())) {
          expDate.setDate(expDate.getDate() + gDays)
          const yyyy = expDate.getFullYear()
          const mm = String(expDate.getMonth() + 1).padStart(2, "0")
          const dd = String(expDate.getDate()).padStart(2, "0")
          updated[index].suspension_date = `${yyyy}-${mm}-${dd}`
        } else {
          updated[index].suspension_date = exp
        }
      }
    }

    setServices(updated)
  }

  const handleCatalogSelection = (index: number, catId: string, serId: string, planId: string) => {
    const updated = [...services]
    updated[index].category_id = catId
    updated[index].service_id = serId
    updated[index].plan_id = planId

    if (catId === "custom") {
      updated[index].category_name = "Personalizado"
    } else {
      const cat = catalog.find(c => c.id === catId)
      if (cat) updated[index].category_name = cat.name
    }

    if (serId === "custom") {
      updated[index].service_name = ""
    } else {
      const cat = catalog.find(c => c.id === catId)
      const ser = cat?.services.find(s => s.id === serId)
      if (ser) updated[index].service_name = ser.name
    }

    if (planId === "custom") {
      updated[index].plan_name = "Personalizado"
    } else {
      const cat = catalog.find(c => c.id === catId)
      const ser = cat?.services.find(s => s.id === serId)
      const plan = ser?.plans.find(p => p.id === planId)
      if (plan) {
        updated[index].plan_name = plan.name
        updated[index].price = plan.price.toString()
        updated[index].features = plan.features
        updated[index].policies = plan.policies || ""
        
        let cycle = "monthly"
        if (plan.duration.toLowerCase().includes("15 dias") || plan.duration.toLowerCase().includes("15 días")) {
          cycle = "15_days"
        } else if (plan.duration.toLowerCase().includes("trimestre") || plan.duration.toLowerCase().includes("3 meses")) {
          cycle = "quarterly"
        } else if (plan.duration.toLowerCase().includes("semestre") || plan.duration.toLowerCase().includes("6 meses")) {
          cycle = "semiannually"
        } else if (plan.duration.toLowerCase().includes("año") || plan.duration.toLowerCase().includes("1 año")) {
          cycle = "annually"
        }
        updated[index].billing_cycle = cycle
        
        const exp = calculateExpDate(updated[index].start_date, cycle)
        updated[index].expiration_date = exp
        updated[index].suspension_date = exp
      }
    }

    setServices(updated)
  }

  // Colaboradores
  const handleAddCollaborator = () => {
    setCollaborators([...collaborators, { name: "", role: "", contact: "", logo_url: "" }])
  }

  const handleRemoveCollaborator = (index: number) => {
    setCollaborators(collaborators.filter((_, i) => i !== index))
  }

  const handleCollaboratorChange = (index: number, key: keyof ProposalCollaborator, value: string) => {
    const updated = [...collaborators]
    updated[index] = { ...updated[index], [key]: value }
    setCollaborators(updated)
  }

  // Credenciales
  const handleAddCredential = () => {
    setCredentials([...credentials, { description: "", email: "", password: "" }])
  }

  const handleRemoveCredential = (index: number) => {
    setCredentials(credentials.filter((_, i) => i !== index))
  }

  const handleCredentialChange = (index: number, key: keyof Credential, value: string) => {
    const updated = [...credentials]
    updated[index] = { ...updated[index], [key]: value }
    setCredentials(updated)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!clientName || !clientCompany || services.some(s => !s.service_name || !s.price)) {
      toast.error("Por favor, llena los campos obligatorios del cliente y servicios.")
      return
    }

    setLoading(true)

    // Sumar montos
    let totalServicesPrice = 0
    const mappedServices = services.map(s => {
      const itemPrice = parseFloat(s.price) || 0
      totalServicesPrice += itemPrice
      return {
        category_name: s.category_name,
        service_name: s.service_name,
        plan_name: s.plan_name,
        price: itemPrice,
        billing_type: s.billing_type,
        billing_cycle: s.billing_cycle,
        features: s.features,
        policies: s.policies,
        status: "ACTIVE",
        start_date: s.start_date,
        expiration_date: s.billing_type === "RECURRENT" ? s.expiration_date : "",
        suspension_date: s.billing_type === "RECURRENT" ? s.suspension_date : "",
        domain_included: s.domain_included ? 1 : 0,
        domain_expiration: s.domain_included ? s.domain_expiration : ""
      } as ProposalService
    })

    try {
      await updateProposal(
        proposal.id,
        {
          client_name: clientName,
          client_company: clientCompany,
          client_domain: clientDomain,
          invoice_number: invoiceNumber,
          payment_status: paymentStatus,
          payment_date: paymentStatus === "PAGADO" ? paymentDate : "",
          payment_method: paymentStatus === "PAGADO" ? paymentMethod : "",
          payment_amount: paymentStatus === "PAGADO" ? totalServicesPrice : 0,
          brand_color_primary: brandColorPrimary || undefined,
          brand_color_secondary: brandColorSecondary || undefined,
          brand_logo_url: brandLogoUrl || undefined,
          grace_days: parseInt(graceDays) || 0,
          late_fee_percentage: parseFloat(lateFeePercentage) || 0,
          daily_penalty_fee: parseFloat(dailyPenaltyFee) || 0
        },
        credentials.filter(c => c.email && c.password),
        mappedServices,
        collaborators.filter(c => c.name)
      )

      toast.success("¡Propuesta modificada con éxito!")
      router.push("/admin/propuestas")
      router.refresh()
    } catch (error) {
      console.error(error)
      toast.error("Hubo un error al modificar la propuesta.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto p-6 max-w-4xl text-slate-100">
      <div className="mb-6 flex items-center gap-3">
        <Link href="/admin/propuestas">
          <Button variant="outline" size="icon" className="border-slate-800 text-slate-400 hover:text-white cursor-pointer bg-slate-950">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-white">Editar Propuesta</h1>
          <p className="text-slate-400 mt-1">Modifica los detalles del contrato y su estructura multi-servicio</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* CLIENTE */}
        <Card className="border-slate-800 bg-slate-950 text-white shadow-xl">
          <CardHeader>
            <CardTitle>1. Datos del Cliente</CardTitle>
            <CardDescription className="text-slate-400">Información del cliente y dominio principal</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label className="text-slate-300">Nombre del Cliente *</Label>
              <Input
                placeholder="Ej. Valentina Alvarez"
                value={clientName}
                onChange={e => setClientName(e.target.value)}
                className="bg-slate-900 border-slate-800 text-white placeholder:text-slate-600 focus:border-primary"
                required
              />
            </div>
            <div className="space-y-2">
              <Label className="text-slate-300">Nombre de la Empresa *</Label>
              <Input
                placeholder="Ej. Alquimia Company"
                value={clientCompany}
                onChange={e => setClientCompany(e.target.value)}
                className="bg-slate-900 border-slate-800 text-white placeholder:text-slate-600 focus:border-primary"
                required
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label className="text-slate-300">Dominio de la Empresa</Label>
              <Input
                placeholder="Ej. alquimiacompany.com"
                value={clientDomain}
                onChange={e => setClientDomain(e.target.value)}
                className="bg-slate-900 border-slate-800 text-white placeholder:text-slate-600 focus:border-primary"
              />
            </div>
          </CardContent>
        </Card>

        {/* BRANDING PERSONALIZADO */}
        <Card className="border-slate-800 bg-slate-950 text-white shadow-xl">
          <CardHeader>
            <CardTitle>2. Branding y Colores del Contrato (Opcional)</CardTitle>
            <CardDescription className="text-slate-400">Personaliza la estética visual de esta propuesta</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label className="text-slate-300">Color Primario</Label>
              <div className="flex gap-2">
                <Input
                  type="color"
                  value={brandColorPrimary || "#ff6600"}
                  onChange={e => setBrandColorPrimary(e.target.value)}
                  className="w-10 h-10 p-0 border border-slate-800 cursor-pointer rounded bg-transparent"
                />
                <Input
                  placeholder="#ff6600"
                  value={brandColorPrimary}
                  onChange={e => setBrandColorPrimary(e.target.value)}
                  className="bg-slate-900 border-slate-800 text-white"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-slate-300">Color Secundario</Label>
              <div className="flex gap-2">
                <Input
                  type="color"
                  value={brandColorSecondary || "#0f172a"}
                  onChange={e => setBrandColorSecondary(e.target.value)}
                  className="w-10 h-10 p-0 border border-slate-800 cursor-pointer rounded bg-transparent"
                />
                <Input
                  placeholder="#0f172a"
                  value={brandColorSecondary}
                  onChange={e => setBrandColorSecondary(e.target.value)}
                  className="bg-slate-900 border-slate-800 text-white"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-slate-300">URL del Logotipo Cliente</Label>
              <Input
                placeholder="https://..."
                value={brandLogoUrl}
                onChange={e => setBrandLogoUrl(e.target.value)}
                className="bg-slate-900 border-slate-800 text-white placeholder:text-slate-600 focus:border-primary"
              />
            </div>
          </CardContent>
        </Card>

        {/* MOROSIDAD Y RECARGOS */}
        <Card className="border-slate-800 bg-slate-950 text-white shadow-xl">
          <CardHeader>
            <CardTitle>3. Políticas de Morosidad y Cobros</CardTitle>
            <CardDescription className="text-slate-400">Condiciones aplicadas tras el vencimiento de servicios recurrentes</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label className="text-slate-300">Días de Gracia</Label>
              <Input
                type="number"
                min="0"
                value={graceDays}
                onChange={e => setGraceDays(e.target.value)}
                className="bg-slate-900 border-slate-800 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-slate-300">% Mora Base del Servicio</Label>
              <Input
                type="number"
                step="0.01"
                min="0"
                value={lateFeePercentage}
                onChange={e => setLateFeePercentage(e.target.value)}
                className="bg-slate-900 border-slate-800 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-slate-300">Cargo Fijo por Día de Retraso ($)</Label>
              <Input
                type="number"
                step="0.01"
                min="0"
                value={dailyPenaltyFee}
                onChange={e => setDailyPenaltyFee(e.target.value)}
                className="bg-slate-900 border-slate-800 text-white"
              />
            </div>
          </CardContent>
        </Card>

        {/* SERVICIOS */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span>4. Servicios en el Contrato</span>
              <span className="text-xs bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full font-mono">{services.length}</span>
            </h2>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleAddService}
              className="flex gap-1 border-slate-800 bg-slate-950 hover:bg-slate-900 text-slate-300 hover:text-white cursor-pointer"
            >
              <Plus className="h-4 w-4" />
              Añadir Servicio
            </Button>
          </div>

          {services.map((service, index) => {
            const catServices = catalog.find(c => c.id === service.category_id)?.services || []
            const planPlans = catServices.find(s => s.id === service.service_id)?.plans || []

            return (
              <Card key={index} className="border-slate-800 bg-slate-950 text-white shadow-xl relative overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-primary" />
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div>
                    <CardTitle className="text-lg">Servicio #{index + 1}</CardTitle>
                    <CardDescription className="text-slate-500">Configura la facturación y los términos del servicio</CardDescription>
                  </div>
                  {services.length > 1 && (
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      onClick={() => handleRemoveService(index)}
                      className="bg-red-950/40 border border-red-800/30 text-red-400 hover:bg-red-900/60 cursor-pointer"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Selector del Catálogo */}
                  <div className="grid gap-4 md:grid-cols-3 p-4 rounded-lg bg-slate-900/30 border border-slate-800">
                    <div className="space-y-2">
                      <Label className="text-slate-400 text-xs">Categoría del Catálogo</Label>
                      <Select
                        value={service.category_id}
                        onValueChange={val => handleCatalogSelection(index, val, "", "")}
                      >
                        <SelectTrigger className="bg-slate-950 border-slate-800">
                          <SelectValue placeholder="Seleccione Categoría" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-950 border-slate-800 text-white">
                          {catalog.map(cat => (
                            <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                          ))}
                          <SelectItem value="custom">-- Personalizado --</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-slate-400 text-xs">Servicio del Catálogo</Label>
                      <Select
                        value={service.service_id}
                        onValueChange={val => handleCatalogSelection(index, service.category_id, val, "")}
                        disabled={!service.category_id || service.category_id === "custom"}
                      >
                        <SelectTrigger className="bg-slate-950 border-slate-800 disabled:opacity-50">
                          <SelectValue placeholder="Seleccione Servicio" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-950 border-slate-800 text-white">
                          {catServices.map(ser => (
                            <SelectItem key={ser.id} value={ser.id}>{ser.name}</SelectItem>
                          ))}
                          <SelectItem value="custom">-- Personalizado --</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-slate-400 text-xs">Plan / Suscripción</Label>
                      <Select
                        value={service.plan_id}
                        onValueChange={val => handleCatalogSelection(index, service.category_id, service.service_id, val)}
                        disabled={!service.service_id || service.service_id === "custom"}
                      >
                        <SelectTrigger className="bg-slate-950 border-slate-800 disabled:opacity-50">
                          <SelectValue placeholder="Seleccione Plan" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-950 border-slate-800 text-white">
                          {planPlans.map(plan => (
                            <SelectItem key={plan.id} value={plan.id}>{plan.name} (${plan.price})</SelectItem>
                          ))}
                          <SelectItem value="custom">-- Personalizado --</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Campos Editables */}
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label className="text-slate-300">Nombre del Servicio *</Label>
                      <Input
                        placeholder="Ej. Hosting Básico, Desarrollo Web"
                        value={service.service_name}
                        onChange={e => handleServiceChange(index, "service_name", e.target.value)}
                        className="bg-slate-900 border-slate-800"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-slate-300">Nombre del Plan / Suscripción</Label>
                      <Input
                        placeholder="Ej. Plan Pro, Trimestral"
                        value={service.plan_name}
                        onChange={e => handleServiceChange(index, "plan_name", e.target.value)}
                        className="bg-slate-900 border-slate-800"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-slate-300">Inversión ($ USD) *</Label>
                      <Input
                        type="number"
                        step="0.01"
                        placeholder="Ej. 150.00"
                        value={service.price}
                        onChange={e => handleServiceChange(index, "price", e.target.value)}
                        className="bg-slate-900 border-slate-800"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-slate-300">Tipo de Cobro</Label>
                      <Select
                        value={service.billing_type}
                        onValueChange={val => handleServiceChange(index, "billing_type", val)}
                      >
                        <SelectTrigger className="bg-slate-900 border-slate-800">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-950 border-slate-800 text-white">
                          <SelectItem value="RECURRENT">Servicio Recurrente (Suscripción)</SelectItem>
                          <SelectItem value="ONE_TIME">Proyecto (Costo Único)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {service.billing_type === "RECURRENT" && (
                      <>
                        <div className="space-y-2">
                          <Label className="text-slate-300">Ciclo de Renovación</Label>
                          <Select
                            value={service.billing_cycle}
                            onValueChange={val => handleServiceChange(index, "billing_cycle", val)}
                          >
                            <SelectTrigger className="bg-slate-900 border-slate-800">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-slate-950 border-slate-800 text-white">
                              <SelectItem value="15_days">Cada 15 días</SelectItem>
                              <SelectItem value="monthly">Mensual</SelectItem>
                              <SelectItem value="quarterly">Trimestral</SelectItem>
                              <SelectItem value="semiannually">Semestral</SelectItem>
                              <SelectItem value="annually">Anual</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-slate-300">Próximo Vencimiento</Label>
                          <Input
                            type="date"
                            value={service.expiration_date}
                            onChange={e => handleServiceChange(index, "expiration_date", e.target.value)}
                            className="bg-slate-900 border-slate-800 focus:border-primary"
                          />
                        </div>
                      </>
                    )}

                    <div className="space-y-2">
                      <Label className="text-slate-300">Fecha de Inicio *</Label>
                      <Input
                        type="date"
                        value={service.start_date}
                        onChange={e => handleServiceChange(index, "start_date", e.target.value)}
                        className="bg-slate-900 border-slate-800 focus:border-primary"
                        required
                      />
                    </div>

                    {service.billing_type === "RECURRENT" && (
                      <div className="space-y-2">
                        <Label className="text-slate-300">Fecha Límite de Suspensión</Label>
                        <Input
                          type="date"
                          value={service.suspension_date}
                          onChange={e => handleServiceChange(index, "suspension_date", e.target.value)}
                          className="bg-slate-900 border-slate-800 focus:border-primary"
                        />
                      </div>
                    )}

                    <div className="space-y-2 md:col-span-2">
                      <Label className="text-slate-300">Características del Servicio (Una por línea)</Label>
                      <textarea
                        placeholder="Escriba las características detalladas..."
                        value={service.features}
                        onChange={e => handleServiceChange(index, "features", e.target.value)}
                        rows={4}
                        className="w-full rounded-md border border-slate-800 bg-slate-900 p-3 text-sm text-white focus:ring-2 focus:ring-primary font-sans leading-relaxed"
                        required
                      />
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <Label className="text-slate-300">Políticas y Términos del Servicio (Req 1)</Label>
                      <textarea
                        placeholder="Términos de servicio de este plan específico (opcional)..."
                        value={service.policies}
                        onChange={e => handleServiceChange(index, "policies", e.target.value)}
                        rows={3}
                        className="w-full rounded-md border border-slate-800 bg-slate-900 p-3 text-sm text-white focus:ring-2 focus:ring-primary font-sans leading-relaxed"
                      />
                    </div>

                    {/* Dominio */}
                    <div className="md:col-span-2 border-t border-slate-900 pt-4 mt-2">
                      <div className="flex items-center gap-2 mb-4">
                        <input
                          type="checkbox"
                          className="h-4 w-4 rounded border-slate-800 bg-slate-950 text-primary cursor-pointer focus:ring-primary"
                          checked={service.domain_included}
                          onChange={e => handleServiceChange(index, "domain_included", e.target.checked)}
                          id={`domain-inc-${index}`}
                        />
                        <Label htmlFor={`domain-inc-${index}`} className="cursor-pointer font-medium text-white text-sm">
                          ¿Incluye registro/compra de Dominio en este servicio?
                        </Label>
                      </div>

                      {service.domain_included && (
                        <div className="space-y-2 max-w-md">
                          <Label className="text-slate-300 text-xs">Vencimiento del Dominio</Label>
                          <Input
                            type="date"
                            value={service.domain_expiration}
                            onChange={e => handleServiceChange(index, "domain_expiration", e.target.value)}
                            className="bg-slate-900 border-slate-800 focus:border-primary"
                          />
                        </div>
                      )}
                    </div>

                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* ALIANZAS Y COLABORADORES */}
        <Card className="border-slate-800 bg-slate-950 text-white shadow-xl">
          <CardHeader className="flex flex-row justify-between items-center">
            <div>
              <CardTitle>5. Alianzas y Colaboraciones (Opcional)</CardTitle>
              <CardDescription className="text-slate-400">Créditos de otros profesionales incluidos en el proyecto</CardDescription>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleAddCollaborator}
              className="flex gap-1 border-slate-800 bg-slate-950 hover:bg-slate-900 text-slate-300 hover:text-white cursor-pointer"
            >
              <Plus className="h-4 w-4" />
              Agregar
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {collaborators.map((col, index) => (
              <div key={index} className="flex flex-col md:flex-row gap-3 p-4 border border-slate-800 rounded-lg bg-slate-900/30 relative">
                <div className="flex-1 space-y-2">
                  <Label className="text-slate-300">Nombre Colaborador / Empresa *</Label>
                  <Input
                    placeholder="Ej. Diseños Valentina"
                    value={col.name}
                    onChange={e => handleCollaboratorChange(index, "name", e.target.value)}
                    className="bg-slate-900 border-slate-800"
                    required
                  />
                </div>
                <div className="flex-1 space-y-2">
                  <Label className="text-slate-300">Rol</Label>
                  <Input
                    placeholder="Ej. Diseñador UI/UX"
                    value={col.role}
                    onChange={e => handleCollaboratorChange(index, "role", e.target.value)}
                    className="bg-slate-900 border-slate-800"
                  />
                </div>
                <div className="flex-1 space-y-2">
                  <Label className="text-slate-300">Contacto</Label>
                  <Input
                    placeholder="Ej. contacto@valentina.com"
                    value={col.contact}
                    onChange={e => handleCollaboratorChange(index, "contact", e.target.value)}
                    className="bg-slate-900 border-slate-800"
                  />
                </div>
                <div className="flex-1 space-y-2">
                  <Label className="text-slate-300">URL del Logo (Opcional)</Label>
                  <Input
                    placeholder="https://..."
                    value={col.logo_url}
                    onChange={e => handleCollaboratorChange(index, "logo_url", e.target.value)}
                    className="bg-slate-900 border-slate-800"
                  />
                </div>
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="self-end md:mb-1 bg-red-950/40 border border-red-800/30 text-red-400 hover:bg-red-900/60 cursor-pointer"
                  onClick={() => handleRemoveCollaborator(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* FACTURA Y PAGO INICIAL */}
        <Card className="border-slate-800 bg-slate-950 text-white shadow-xl">
          <CardHeader>
            <CardTitle>6. Factura y Pago Inicial</CardTitle>
            <CardDescription className="text-slate-400">Registra el estado del cobro de la propuesta</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label className="text-slate-300">Número de Factura *</Label>
              <Input
                placeholder="Ej. ALQ-2026-002"
                value={invoiceNumber}
                onChange={e => setInvoiceNumber(e.target.value)}
                className="bg-slate-900 border-slate-800 focus:border-primary"
                required
              />
            </div>
            <div className="space-y-2">
              <Label className="text-slate-300">Estado del Pago</Label>
              <Select value={paymentStatus} onValueChange={setPaymentStatus}>
                <SelectTrigger className="bg-slate-950 border-slate-800">
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
                  <Label className="text-slate-300">Método de Pago</Label>
                  <Input
                    placeholder="Ej. Binance (USDT), Pago Móvil, Stripe"
                    value={paymentMethod}
                    onChange={e => setPaymentMethod(e.target.value)}
                    className="bg-slate-900 border-slate-800"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-slate-300">Fecha de Recepción del Pago</Label>
                  <Input
                    type="date"
                    value={paymentDate}
                    onChange={e => setPaymentDate(e.target.value)}
                    className="bg-slate-900 border-slate-800 focus:border-primary"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label className="text-slate-300">Monto de Pago Inicial Recibido ($ USD)</Label>
                  <Input
                    type="text"
                    disabled
                    value={services.reduce((acc, curr) => acc + (parseFloat(curr.price) || 0), 0).toFixed(2)}
                    className="bg-slate-950 border-slate-800 text-slate-400 opacity-80"
                  />
                  <p className="text-xs text-slate-500">El pago inicial se calcula automáticamente como la suma de todos los servicios agregados.</p>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* CREDENCIALES */}
        <Card className="border-slate-800 bg-slate-950 text-white shadow-xl">
          <CardHeader className="flex flex-row justify-between items-center">
            <div>
              <CardTitle>7. Credenciales de Acceso (Opcional)</CardTitle>
              <CardDescription className="text-slate-400">Cuentas que se le entregarán al cliente una vez firme</CardDescription>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleAddCredential}
              className="flex gap-1 border-slate-800 bg-slate-950 hover:bg-slate-900 text-slate-300 hover:text-white cursor-pointer"
            >
              <Plus className="h-4 w-4" />
              Agregar
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {credentials.map((cred, index) => (
              <div key={index} className="flex flex-col md:flex-row gap-3 p-4 border border-slate-800 rounded-lg bg-slate-900/30 relative">
                <div className="flex-1 space-y-2">
                  <Label className="text-slate-300">Descripción de la cuenta</Label>
                  <Input
                    placeholder="Ej. Cuenta de Gerencia"
                    value={cred.description}
                    onChange={e => handleCredentialChange(index, "description", e.target.value)}
                    className="bg-slate-900 border-slate-800"
                  />
                </div>
                <div className="flex-1 space-y-2">
                  <Label className="text-slate-300">Email *</Label>
                  <Input
                    type="email"
                    placeholder="Ej. gerencia@tumarca.com"
                    value={cred.email}
                    onChange={e => handleCredentialChange(index, "email", e.target.value)}
                    className="bg-slate-900 border-slate-800"
                  />
                </div>
                <div className="flex-1 space-y-2">
                  <Label className="text-slate-300">Contraseña *</Label>
                  <Input
                    placeholder="Ej. Contrasena123*"
                    value={cred.password}
                    onChange={e => handleCredentialChange(index, "password", e.target.value)}
                    className="bg-slate-900 border-slate-800"
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

        <div className="flex justify-end gap-3 pb-8">
          <Link href="/admin/propuestas">
            <Button type="button" variant="outline" disabled={loading} className="border-slate-800 hover:bg-slate-900 text-slate-300 hover:text-white cursor-pointer bg-slate-950">
              Cancelar
            </Button>
          </Link>
          <Button type="submit" disabled={loading} className="px-6 bg-primary text-white hover:bg-primary/90 cursor-pointer">
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Guardando...
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
