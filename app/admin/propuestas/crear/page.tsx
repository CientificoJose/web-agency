"use client"

import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createProposal, getCatalog, CatalogCategory, Credential, ProposalService, ProposalCollaborator, ProposalPayment } from "@/lib/actions"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import { Trash2, Plus, ArrowLeft, Loader2, Calendar, ChevronDown, ChevronUp, CreditCard } from "lucide-react"
import Link from "next/link"

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

export default function CrearPropuestaPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [catalog, setCatalog] = useState<CatalogCategory[]>([])

  // Cliente
  const [clientName, setClientName] = useState("")
  const [clientCompany, setClientCompany] = useState("")
  const [clientDomain, setClientDomain] = useState("")
  const [clientEmail, setClientEmail] = useState("")
  const [invoiceNumber, setInvoiceNumber] = useState("")
  const [paymentStatus, setPaymentStatus] = useState("PENDIENTE")
  const [paymentDate, setPaymentDate] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("Binance")

  // Branding Custom
  const [brandColorPrimary, setBrandColorPrimary] = useState("")
  const [brandColorSecondary, setBrandColorSecondary] = useState("")
  const [brandLogoUrl, setBrandLogoUrl] = useState("")

  // Morosidad
  const [graceDays, setGraceDays] = useState("0")
  const [lateFeePercentage, setLateFeePercentage] = useState("0")
  const [dailyPenaltyFee, setDailyPenaltyFee] = useState("0")

  // Servicios
  const [services, setServices] = useState<ServiceFormState[]>([])

  // Colaboradores
  const [collaborators, setCollaborators] = useState<ProposalCollaborator[]>([])

  // Credenciales
  interface CredentialState {
    description: string
    email: string
    password: string
    notes: string
    fields: { key: string; value: string }[]
    showAdvanced?: boolean
  }

  const [showCredentialsSection, setShowCredentialsSection] = useState(false)
  const [credentials, setCredentials] = useState<CredentialState[]>([
    { description: "Cuenta de Administración", email: "", password: "", notes: "", fields: [], showAdvanced: false },
  ])

  // Pagos / Cuotas
  const [payments, setPayments] = useState<ProposalPayment[]>([
    { description: "Pago Inicial / Único", amount: 0, status: "PENDIENTE", payment_date: "", payment_method: "Binance", notes: "", due_date: "" }
  ])

  // Sincronizar el monto del primer pago con la suma total de los servicios si solo hay 1 cuota
  useEffect(() => {
    const total = services.reduce((acc, curr) => acc + (parseFloat(curr.price) || 0), 0)
    if (payments.length === 1) {
      setPayments([{ ...payments[0], amount: total }])
    }
  }, [services])

  // Cargar catálogo e inicializar primer servicio
  useEffect(() => {
    getCatalog().then((data) => {
      setCatalog(data)
    })

    const today = new Date()
    const todayISO = today.toISOString().split("T")[0]

    setServices([
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
  }, [])

  // Helper para calcular expiración en formato ISO YYYY-MM-DD
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
    const defaultBillingType = services.length > 0 ? services[0].billing_type : "RECURRENT"
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
        billing_type: defaultBillingType,
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

    // Si cambia el start_date o el billing_cycle, recalcular vencimientos
    if (key === "start_date" || key === "billing_cycle") {
      const sDate = updated[index].start_date
      const cycle = updated[index].billing_cycle
      if (sDate) {
        const exp = calculateExpDate(sDate, cycle)
        updated[index].expiration_date = exp
        
        // Calcular fecha de suspensión sumando días de gracia
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
    setCredentials([...credentials, { description: "", email: "", password: "", notes: "", fields: [], showAdvanced: false }])
  }

  const handleRemoveCredential = (index: number) => {
    setCredentials(credentials.filter((_, i) => i !== index))
  }

  const handleCredentialChange = (index: number, key: keyof CredentialState, value: any) => {
    const updated = [...credentials]
    updated[index] = { ...updated[index], [key]: value } as any
    setCredentials(updated)
  }

  const handleAddCredentialField = (credIndex: number) => {
    const updated = [...credentials]
    updated[credIndex].fields.push({ key: "", value: "" })
    setCredentials(updated)
  }

  const handleRemoveCredentialField = (credIndex: number, fieldIndex: number) => {
    const updated = [...credentials]
    updated[credIndex].fields = updated[credIndex].fields.filter((_, i) => i !== fieldIndex)
    setCredentials(updated)
  }

  const handleCredentialFieldChange = (credIndex: number, fieldIndex: number, key: 'key' | 'value', value: string) => {
    const updated = [...credentials]
    updated[credIndex].fields[fieldIndex][key] = value
    setCredentials(updated)
  }

  // Pagos / Cuotas
  const handleAddPayment = () => {
    setPayments([...payments, { description: `Cuota ${payments.length + 1}`, amount: 0, status: "PENDIENTE", payment_date: "", payment_method: "Binance", notes: "", due_date: "" }])
  }

  const handleRemovePayment = (index: number) => {
    setPayments(payments.filter((_, i) => i !== index))
  }

  const handlePaymentChange = (index: number, key: keyof ProposalPayment, value: any) => {
    const updated = [...payments]
    updated[index] = { ...updated[index], [key]: value } as any
    setPayments(updated)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!clientName || !clientCompany || services.some(s => !s.service_name || !s.price)) {
      toast.error("Por favor, llena los campos obligatorios del cliente y servicios.")
      return
    }

    setLoading(true)

    const hasRecurrent = services.some(s => s.billing_type === "RECURRENT")
    const hasOneTime = services.some(s => s.billing_type === "ONE_TIME")
    if (hasRecurrent && hasOneTime) {
      toast.error("Un contrato no puede mezclar servicios recurrentes (Suscripción) con proyectos de pago único. Por favor, crea contratos independientes.")
      setLoading(false)
      return
    }

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
      const id = await createProposal(
        {
          client_name: clientName,
          client_company: clientCompany,
          client_domain: clientDomain,
          client_email: clientEmail,
          invoice_number: invoiceNumber,
          payment_status: payments.every(p => p.status === "PAGADO") ? "PAGADO" : "PENDIENTE",
          payment_date: payments[0]?.payment_date || "",
          payment_method: payments[0]?.payment_method || "",
          payment_amount: payments.reduce((acc, curr) => acc + (curr.amount || 0), 0),
          brand_color_primary: undefined,
          brand_color_secondary: undefined,
          brand_logo_url: undefined,
          grace_days: parseInt(graceDays) || 0,
          late_fee_percentage: parseFloat(lateFeePercentage) || 0,
          daily_penalty_fee: 0
        },
        showCredentialsSection
          ? credentials
              .filter(c => c.email && c.password)
              .map(c => ({
                description: c.description,
                email: c.email,
                password: c.password,
                notes: c.notes,
                dynamic_fields: JSON.stringify(c.fields.reduce((acc, curr) => {
                  if (curr.key.trim()) acc[curr.key.trim()] = curr.value
                  return acc
                }, {} as Record<string, string>))
              }))
          : [],
        mappedServices,
        collaborators.filter(c => c.name),
        payments
      )

      toast.success("¡Propuesta y contrato multi-servicio creados con éxito!")
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
    <div className="container mx-auto p-6 max-w-4xl text-slate-100">
      <div className="mb-6 flex items-center gap-3">
        <Link href="/admin/propuestas">
          <Button variant="outline" size="icon" className="border-slate-800 text-slate-400 hover:text-white cursor-pointer bg-slate-950">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-white">Crear Nueva Propuesta</h1>
          <p className="text-slate-400 mt-1">Completa los detalles para generar un contrato interactivo con marca blanca</p>
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
            <div className="space-y-2">
              <Label className="text-slate-300">Dominio de la Empresa</Label>
              <Input
                placeholder="Ej. alquimiacompany.com"
                value={clientDomain}
                onChange={e => setClientDomain(e.target.value)}
                className="bg-slate-900 border-slate-800 text-white placeholder:text-slate-600 focus:border-primary"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-slate-300">Correo Electrónico del Cliente *</Label>
              <Input
                type="email"
                placeholder="Ej. valentina@alquimiacompany.com"
                value={clientEmail}
                onChange={e => setClientEmail(e.target.value)}
                className="bg-slate-900 border-slate-800 text-white placeholder:text-slate-600 focus:border-primary"
                required
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
                        disabled={index > 0}
                      >
                        <SelectTrigger className="bg-slate-900 border-slate-800">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-950 border-slate-800 text-white">
                          <SelectItem value="RECURRENT">Servicio Recurrente (Suscripción)</SelectItem>
                          <SelectItem value="ONE_TIME">Proyecto (Costo Único)</SelectItem>
                        </SelectContent>
                      </Select>
                      {index > 0 && (
                        <p className="text-[10px] text-slate-500 mt-1 italic">
                          Heredado del primer servicio.
                        </p>
                      )}
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

        {/* FACTURA Y CRONOGRAMA DE PAGOS */}
        <Card className="border-slate-800 bg-slate-950 text-white shadow-xl">
          <CardHeader className="flex flex-row justify-between items-center">
            <div>
              <CardTitle className="flex gap-2 items-center">
                <CreditCard className="h-5 w-5 text-primary" />
                <span>{services.some(s => s.billing_type === "RECURRENT") ? "6. Facturación y Cronograma de Suscripción" : "6. Facturación y Cronograma de Pagos / Hitos"}</span>
              </CardTitle>
              <CardDescription className="text-slate-400">
                {services.some(s => s.billing_type === "RECURRENT") ? "Define los ciclos de renovación y cobros de la suscripción" : "Define las cuotas, fechas de vencimiento y notas para cada hito de pago"}
              </CardDescription>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleAddPayment}
              className="flex gap-1 border-slate-800 bg-slate-950 hover:bg-slate-900 text-slate-300 hover:text-white cursor-pointer"
            >
              <Plus className="h-4 w-4" />
              {services.some(s => s.billing_type === "RECURRENT") ? "Agregar Renovación" : "Agregar Cuota / Hito"}
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2 max-w-sm mb-4">
              <Label className="text-slate-300">Número de Factura General *</Label>
              <Input
                placeholder="Ej. ALQ-2026-002"
                value={invoiceNumber}
                onChange={e => setInvoiceNumber(e.target.value)}
                className="bg-slate-900 border-slate-800 focus:border-primary text-xs h-9"
                required
              />
            </div>

            <div className="space-y-4">
              {payments.map((pay, index) => (
                <div key={index} className="p-4 border border-slate-900 rounded-lg bg-slate-900/10 space-y-3 relative">
                  <div className="flex justify-between items-center border-b border-slate-900 pb-1.5">
                    <span className="text-xs font-bold text-slate-400">
                      {services.some(s => s.billing_type === "RECURRENT") ? `Ciclo / Cuota #${index + 1}` : `Hito / Cuota #${index + 1}`}
                    </span>
                    {payments.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemovePayment(index)}
                        className="text-red-400 hover:text-red-300 hover:bg-red-950/20 h-7 w-7 cursor-pointer animate-fade-in"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                    <div className="space-y-1">
                      <Label className="text-slate-300 text-[10px]">Concepto / Descripción *</Label>
                      <Input
                        placeholder={services.some(s => s.billing_type === "RECURRENT") ? "Ej. Suscripción Mensual" : "Ej. Pago Inicial (50%)"}
                        value={pay.description}
                        onChange={e => handlePaymentChange(index, "description", e.target.value)}
                        className="bg-slate-900 border-slate-800 text-xs h-8"
                        required
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-slate-300 text-[10px]">Monto ($ USD) *</Label>
                      <Input
                        type="number"
                        placeholder="Ej. 250"
                        value={pay.amount || ""}
                        onChange={e => handlePaymentChange(index, "amount", parseFloat(e.target.value) || 0)}
                        className="bg-slate-900 border-slate-800 text-xs h-8"
                        required
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-slate-300 text-[10px]">Estado</Label>
                      <Select 
                        value={pay.status} 
                        onValueChange={val => {
                          handlePaymentChange(index, "status", val)
                          if (val === "PENDIENTE") {
                            handlePaymentChange(index, "payment_date", "")
                            handlePaymentChange(index, "payment_method", "")
                          }
                        }}
                      >
                        <SelectTrigger className="bg-slate-950 border-slate-800 text-xs h-8">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-950 border-slate-800 text-white">
                          <SelectItem value="PENDIENTE">PENDIENTE</SelectItem>
                          <SelectItem value="PAGADO">PAGADO</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-slate-300 text-[10px]">Fecha Vencimiento (Cuota)</Label>
                      <Input
                        type="date"
                        value={pay.due_date || ""}
                        onChange={e => handlePaymentChange(index, "due_date", e.target.value)}
                        className="bg-slate-900 border-slate-800 text-xs h-8"
                      />
                    </div>
                  </div>

                  {pay.status === "PAGADO" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 border-t border-slate-900/40">
                      <div className="space-y-1">
                        <Label className="text-slate-300 text-[10px]">Método de Pago</Label>
                        <Input
                          placeholder="Ej. Binance (USDT), Stripe, Transferencia"
                          value={pay.payment_method || ""}
                          onChange={e => handlePaymentChange(index, "payment_method", e.target.value)}
                          className="bg-slate-900 border-slate-800 text-xs h-8"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-slate-300 text-[10px]">Fecha de Pago</Label>
                        <Input
                          type="date"
                          value={pay.payment_date || ""}
                          onChange={e => handlePaymentChange(index, "payment_date", e.target.value)}
                          className="bg-slate-900 border-slate-800 text-xs h-8"
                        />
                      </div>
                    </div>
                  )}

                  <div className="space-y-1">
                    <Label className="text-slate-300 text-[10px]">Nota de la Transacción / Referencia</Label>
                    <Input
                      placeholder="Ej. Transferencia recibida banco mercantil Nro #1849"
                      value={pay.notes || ""}
                      onChange={e => handlePaymentChange(index, "notes", e.target.value)}
                      className="bg-slate-900 border-slate-800 text-xs h-8"
                    />
                  </div>

                </div>
              ))}
            </div>

            <div className="pt-2 flex justify-between items-center text-xs text-slate-400">
              <span>Suma Total Cuotas:</span>
              <span className="font-bold text-white text-sm">
                ${payments.reduce((acc, curr) => acc + (curr.amount || 0), 0).toFixed(2)} USD
              </span>
            </div>
            {Math.abs(payments.reduce((acc, curr) => acc + (curr.amount || 0), 0) - services.reduce((acc, curr) => acc + (parseFloat(curr.price) || 0), 0)) > 0.01 && (
              <p className="text-[10px] text-orange-400">
                Aviso: La suma total de las cuotas (${payments.reduce((acc, curr) => acc + (curr.amount || 0), 0).toFixed(2)}) no coincide con la suma de los servicios (${services.reduce((acc, curr) => acc + (parseFloat(curr.price) || 0), 0).toFixed(2)}).
              </p>
            )}
          </CardContent>
        </Card>

        {/* CREDENCIALES (OPCIONAL Y COLAPSABLE) */}
        <Card className="border-slate-800 bg-slate-950 text-white shadow-xl">
          <CardHeader className="flex flex-row justify-between items-center">
            <div>
              <CardTitle>7. Credenciales de Acceso (Opcional)</CardTitle>
              <CardDescription className="text-slate-400">Cuentas que se le entregarán al cliente una vez firme</CardDescription>
            </div>
            <div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={showCredentialsSection} 
                  onChange={e => setShowCredentialsSection(e.target.checked)} 
                  className="sr-only peer" 
                />
                <div className="w-9 h-5 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-slate-300 after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
                <span className="ml-2 text-xs font-semibold text-slate-300">Habilitar</span>
              </label>
            </div>
          </CardHeader>
          
          {showCredentialsSection && (
            <CardContent className="space-y-6 border-t border-slate-900 pt-4">
              <div className="flex justify-end mb-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleAddCredential}
                  className="flex gap-1 border-slate-800 bg-slate-950 hover:bg-slate-900 text-slate-300 hover:text-white cursor-pointer h-8 text-xs"
                >
                  <Plus className="h-4 w-4" />
                  Agregar Cuenta
                </Button>
              </div>

              {credentials.map((cred, index) => (
                <div key={index} className="p-5 border border-slate-800 rounded-xl bg-slate-900/10 space-y-4 relative">
                  
                  {/* Cabecera de la cuenta y botón Eliminar */}
                  <div className="flex justify-between items-center border-b border-slate-900 pb-2">
                    <h4 className="font-bold text-xs text-primary">Cuenta #{index + 1}</h4>
                    {credentials.length > 1 && (
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="bg-red-950/40 border border-red-800/30 text-red-400 hover:bg-red-900/60 cursor-pointer h-7 text-xs"
                        onClick={() => handleRemoveCredential(index)}
                      >
                        <Trash2 className="h-3.5 w-3.5 mr-1" />
                        Eliminar
                      </Button>
                    )}
                  </div>

                  {/* Campos Principales */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-1.5">
                      <Label className="text-slate-300 text-xs">Descripción / Nombre</Label>
                      <Input
                        placeholder="Ej. Hosting de Producción"
                        value={cred.description}
                        onChange={e => handleCredentialChange(index, "description", e.target.value)}
                        className="bg-slate-900 border-slate-800 text-xs h-9"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-slate-300 text-xs">Email / Usuario Principal *</Label>
                      <Input
                        placeholder="Ej. admin@tumarca.com"
                        value={cred.email}
                        onChange={e => handleCredentialChange(index, "email", e.target.value)}
                        className="bg-slate-900 border-slate-800 text-xs h-9"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-slate-300 text-xs">Contraseña Principal *</Label>
                      <Input
                        placeholder="Ej. ClaveSecreta123"
                        value={cred.password}
                        onChange={e => handleCredentialChange(index, "password", e.target.value)}
                        className="bg-slate-900 border-slate-800 text-xs h-9"
                      />
                    </div>
                  </div>

                  {/* Botón para abrir Configuración Avanzada de esta Cuenta */}
                  <div className="pt-2">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => handleCredentialChange(index, "showAdvanced", !cred.showAdvanced)}
                      className="text-xs text-slate-400 hover:text-white flex items-center gap-1 p-0 h-auto bg-transparent hover:bg-transparent cursor-pointer"
                    >
                      {cred.showAdvanced ? <ChevronUp className="h-3.5 w-3.5 animate-bounce" /> : <ChevronDown className="h-3.5 w-3.5" />}
                      <span>Configuración avanzada y notas de acceso</span>
                    </Button>
                  </div>

                  {cred.showAdvanced && (
                    <div className="space-y-4 pt-3 border-t border-slate-900/60 bg-slate-950/20 p-3 rounded-lg border border-slate-900/40">
                      
                      {/* CAMPOS PERSONALIZADOS REPETIDOR */}
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Campos Adicionales / Personalizados</span>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => handleAddCredentialField(index)}
                            className="h-6 text-[9px] border-slate-800 bg-slate-950 hover:bg-slate-900 text-slate-300 cursor-pointer"
                          >
                            <Plus className="h-2.5 w-2.5 mr-1" />
                            Agregar Campo
                          </Button>
                        </div>

                        {cred.fields.length === 0 ? (
                          <p className="text-[10px] text-slate-500 italic">No se han agregado campos personalizados.</p>
                        ) : (
                          <div className="grid gap-3 grid-cols-1 md:grid-cols-2">
                            {cred.fields.map((fld, fldIdx) => (
                              <div key={fldIdx} className="flex gap-2 items-center bg-slate-900/20 p-1.5 rounded-lg border border-slate-900/40">
                                <Input
                                  placeholder="Campo (ej. Servidor)"
                                  value={fld.key}
                                  onChange={e => handleCredentialFieldChange(index, fldIdx, "key", e.target.value)}
                                  className="bg-slate-900 border-slate-800 text-[10px] h-7 w-1/3"
                                />
                                <Input
                                  placeholder="Valor (ej. mail.tumarca.com)"
                                  value={fld.value}
                                  onChange={e => handleCredentialFieldChange(index, fldIdx, "value", e.target.value)}
                                  className="bg-slate-900 border-slate-800 text-[10px] h-7 flex-1"
                                />
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleRemoveCredentialField(index, fldIdx)}
                                  className="text-red-400 hover:text-red-300 hover:bg-red-950/20 h-6 w-6 cursor-pointer"
                                >
                                  <Trash2 className="h-3 w-3" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* NOTAS / COMENTARIOS */}
                      <div className="space-y-1.5 pt-2 border-t border-slate-900/50">
                        <Label className="text-slate-300 text-xs">Nota de Acceso / Instrucciones</Label>
                        <textarea
                          placeholder="Escribe aquí cualquier aclaración, instrucción, URL del panel o aclaratoria..."
                          value={cred.notes}
                          onChange={e => handleCredentialChange(index, "notes", e.target.value)}
                          rows={2}
                          className="w-full rounded-md border border-slate-800 bg-slate-900 p-2.5 text-xs text-white focus:ring-1 focus:ring-primary font-sans leading-relaxed"
                        />
                      </div>

                    </div>
                  )}

                </div>
              ))}
            </CardContent>
          )}
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
