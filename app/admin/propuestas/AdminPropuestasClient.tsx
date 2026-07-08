"use client"

import React, { useState, useEffect, useTransition } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  deleteProposal,
  Proposal,
  CatalogCategory,
  createCategory,
  deleteCategory,
  createService,
  deleteService,
  createServicePlan,
  deleteServicePlan,
  getSettings,
  updateSettings,
  registerPayment,
  getProposalById,
  ProposalService,
  ProposalPayment,
  ProposalCollaborator,
  Credential,
  updateCategory,
  updateService,
  updateServicePlan,
  sendTestEmail,
  sendProposalEmail
} from "@/lib/actions"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "sonner"
import {
  PlusCircle,
  FileText,
  Trash2,
  ExternalLink,
  Loader2,
  Folder,
  Layers,
  Award,
  Pencil,
  Eye,
  Settings,
  Mail,
  Palette,
  CreditCard,
  Plus
} from "lucide-react"

interface AdminPropuestasClientProps {
  proposals: (Proposal & { services?: ProposalService[] })[]
  initialCatalog: CatalogCategory[]
}

export default function AdminPropuestasClient({ proposals, initialCatalog }: AdminPropuestasClientProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [catalog, setCatalog] = useState<CatalogCategory[]>(initialCatalog)
  const [activeTab, setActiveTab] = useState("propuestas")

  // Sincronizar catálogo
  useEffect(() => {
    setCatalog(initialCatalog)
  }, [initialCatalog])

  // Estados para Edición del Catálogo (Categorías, Servicios, Planes)
  const [editCategoryObj, setEditCategoryObj] = useState<{ id: string; name: string; policies: string } | null>(null)
  const [showEditCategoryModal, setShowEditCategoryModal] = useState(false)

  const [editServiceObj, setEditServiceObj] = useState<{ id: string; name: string; category_id: string } | null>(null)
  const [showEditServiceModal, setShowEditServiceModal] = useState(false)

  const [editPlanObj, setEditPlanObj] = useState<{
    id: string
    service_id: string
    name: string
    price: number
    duration: string
    features: string
    policies: string
  } | null>(null)
  const [showEditPlanModal, setShowEditPlanModal] = useState(false)

  const handleEditCategorySubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!editCategoryObj || !editCategoryObj.name.trim()) return
    startTransition(async () => {
      try {
        await updateCategory(editCategoryObj.id, editCategoryObj.name, editCategoryObj.policies)
        toast.success("Categoría actualizada correctamente")
        setShowEditCategoryModal(false)
        router.refresh()
      } catch (err) {
        toast.error("Error al actualizar la categoría")
      }
    })
  }

  const handleEditServiceSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!editServiceObj || !editServiceObj.name.trim() || !editServiceObj.category_id) return
    startTransition(async () => {
      try {
        await updateService(editServiceObj.id, editServiceObj.category_id, editServiceObj.name)
        toast.success("Servicio actualizado correctamente")
        setShowEditServiceModal(false)
        router.refresh()
      } catch (err) {
        toast.error("Error al actualizar el servicio")
      }
    })
  }

  const handleEditPlanSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!editPlanObj || !editPlanObj.name.trim() || !editPlanObj.price) return
    startTransition(async () => {
      try {
        await updateServicePlan(
          editPlanObj.id,
          editPlanObj.name,
          editPlanObj.price,
          editPlanObj.duration,
          editPlanObj.features,
          editPlanObj.policies
        )
        toast.success("Plan actualizado correctamente")
        setShowEditPlanModal(false)
        router.refresh()
      } catch (err) {
        toast.error("Error al actualizar el plan")
      }
    })
  }

  // Ajustes de marca blanca
  const [settings, setSettings] = useState<Record<string, string>>({})
  const [brandName, setBrandName] = useState("")
  const [brandLogo, setBrandLogo] = useState("")
  const [colorPrim, setColorPrim] = useState("")
  const [colorSec, setColorSec] = useState("")
  const [smtpHost, setSmtpHost] = useState("")
  const [smtpPort, setSmtpPort] = useState("")
  const [smtpUser, setSmtpUser] = useState("")
  const [smtpPass, setSmtpPass] = useState("")

  // Estados para envío de correos y pruebas
  const [testEmailRecipient, setTestEmailRecipient] = useState("")
  const [isSendingTest, setIsSendingTest] = useState(false)
  const [isSendingProposal, setIsSendingProposal] = useState<Record<string, boolean>>({})

  useEffect(() => {
    getSettings().then(data => {
      setSettings(data)
      setBrandName(data.brand_name || "Sin Límites")
      setBrandLogo(data.brand_logo || "/recurso.png")
      setColorPrim(data.color_primary || "#ff6600")
      setColorSec(data.color_secondary || "#0f172a")
      setSmtpHost(data.smtp_host || "")
      setSmtpPort(data.smtp_port || "587")
      setSmtpUser(data.smtp_user || "")
      setSmtpPass(data.smtp_pass || "")
    })
  }, [])

  // Guardar Ajustes de Marca
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault()
    startTransition(async () => {
      try {
        await updateSettings({
          brand_name: brandName,
          brand_logo: brandLogo,
          color_primary: colorPrim,
          color_secondary: colorSec,
          smtp_host: smtpHost,
          smtp_port: smtpPort,
          smtp_user: smtpUser,
          smtp_pass: smtpPass
        })
        toast.success("Ajustes de marca guardados correctamente")
        router.refresh()
      } catch (err) {
        toast.error("Error al guardar ajustes")
      }
    })
  }



  // Estados de los Formularios de Catálogo
  const [newCatName, setNewCatName] = useState("")
  const [newCatPolicies, setNewCatPolicies] = useState("")
  const [newSerName, setNewSerName] = useState("")
  const [newSerCatId, setNewSerCatId] = useState("")

  const [newPlanName, setNewPlanName] = useState("")
  const [newPlanCatId, setNewPlanCatId] = useState("")
  const [newPlanSerId, setNewPlanSerId] = useState("")
  const [newPlanPrice, setNewPlanPrice] = useState("")
  const [newPlanDuration, setNewPlanDuration] = useState("1 año")
  const [newPlanFeatures, setNewPlanFeatures] = useState("")
  const [newPlanPolicies, setNewPlanPolicies] = useState("")

  const activeServices = catalog.find((c) => c.id === newPlanCatId)?.services || []

  const handleDeleteProposal = (id: string) => {
    if (confirm("¿Estás seguro de que deseas eliminar esta propuesta?")) {
      startTransition(async () => {
        try {
          await deleteProposal(id)
          toast.success("Propuesta eliminada correctamente")
          router.refresh()
        } catch (error) {
          console.error(error)
          toast.error("Error al eliminar la propuesta")
        }
      })
    }
  }

  const handleCreateCategory = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newCatName.trim()) return

    startTransition(async () => {
      try {
        await createCategory(newCatName, newCatPolicies)
        toast.success("Categoría creada con éxito")
        setNewCatName("")
        setNewCatPolicies("")
        router.refresh()
      } catch (error) {
        console.error(error)
        toast.error("Error al crear la categoría")
      }
    })
  }

  const handleDeleteCategory = (id: string) => {
    if (confirm("¿Estás seguro de que deseas eliminar esta categoría? Se borrarán todos los servicios y planes asociados.")) {
      startTransition(async () => {
        try {
          await deleteCategory(id)
          toast.success("Categoría eliminada")
          router.refresh()
        } catch (error) {
          console.error(error)
          toast.error("Error al eliminar la categoría")
        }
      })
    }
  }

  const handleCreateService = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newSerName.trim() || !newSerCatId) {
      toast.error("Por favor completa todos los campos del servicio")
      return
    }

    startTransition(async () => {
      try {
        await createService(newSerCatId, newSerName)
        toast.success("Servicio creado con éxito")
        setNewSerName("")
        router.refresh()
      } catch (error) {
        console.error(error)
        toast.error("Error al crear el servicio")
      }
    })
  }

  const handleDeleteService = (id: string) => {
    if (confirm("¿Estás seguro de que deseas eliminar este servicio? Se borrarán sus planes asociados.")) {
      startTransition(async () => {
        try {
          await deleteService(id)
          toast.success("Servicio eliminado")
          router.refresh()
        } catch (error) {
          console.error(error)
          toast.error("Error al eliminar el servicio")
        }
      })
    }
  }

  const handleCreatePlan = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newPlanName.trim() || !newPlanSerId || !newPlanPrice || !newPlanFeatures.trim()) {
      toast.error("Por favor completa los campos del plan")
      return
    }

    startTransition(async () => {
      try {
        await createServicePlan(
          newPlanSerId,
          newPlanName,
          parseFloat(newPlanPrice) || 0,
          newPlanDuration,
          newPlanFeatures,
          newPlanPolicies
        )
        toast.success("Plan de servicio creado con éxito")
        setNewPlanName("")
        setNewPlanPrice("")
        setNewPlanFeatures("")
        setNewPlanPolicies("")
        router.refresh()
      } catch (error) {
        console.error(error)
        toast.error("Error al crear el plan")
      }
    })
  }

  const handleDeletePlan = (id: string) => {
    if (confirm("¿Estás seguro de que deseas eliminar este plan?")) {
      startTransition(async () => {
        try {
          await deleteServicePlan(id)
          toast.success("Plan eliminado")
          router.refresh()
        } catch (error) {
          console.error(error)
          toast.error("Error al eliminar el plan")
        }
      })
    }
  }

  return (
    <div className="container mx-auto p-6 max-w-6xl text-slate-100">
      <style dangerouslySetInnerHTML={{ __html: `
        :root {
          --primary-admin: ${colorPrim || '#ff6600'};
          --secondary-admin: ${colorSec || '#0f172a'};
        }
        
        /* Clases personalizadas de branding admin */
        .text-admin-primary { color: var(--primary-admin) !important; }
        .bg-admin-primary { background-color: var(--primary-admin) !important; }
        .border-admin-primary { border-color: var(--primary-admin) !important; }
        .hover\\:bg-admin-primary-hover:hover { background-color: var(--primary-admin) !important; filter: brightness(90%); }
        
        /* Sobrescribir clases específicas de Tailwind */
        .text-primary { color: var(--primary-admin) !important; }
        .border-primary { border-color: var(--primary-admin) !important; }
        .bg-primary { background-color: var(--primary-admin) !important; }
        .hover\\:bg-primary\\/90:hover { background-color: var(--primary-admin) !important; filter: brightness(90%); }
        .focus\\:ring-primary:focus { --tw-ring-color: var(--primary-admin) !important; }
        .focus-visible\\:ring-primary:focus-visible { --tw-ring-color: var(--primary-admin) !important; }
        
        /* Ajustar tabs activos de Radix UI */
        [data-state="active"] {
          border-color: var(--primary-admin) !important;
          color: var(--primary-admin) !important;
        }
      `}} />
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-white font-sans flex items-center gap-3">
            {brandLogo && (
              <img src={brandLogo} alt="Logo" className="w-10 h-10 object-contain rounded" />
            )}
            <span>Administración de {brandName}</span>
          </h1>
          <p className="text-slate-400 mt-1">Configura marca blanca, planes de catálogo y gestiona propuestas multi-servicio</p>
        </div>
        <div>
          <Link href="/admin/propuestas/crear">
            <Button className="flex items-center gap-2 bg-primary text-white hover:bg-primary/90 cursor-pointer">
              <PlusCircle className="h-4 w-4" />
              Nueva Propuesta
            </Button>
          </Link>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <div className="border-b border-slate-800 pb-1">
          <TabsList className="bg-slate-950 border border-slate-800 text-slate-400">
            <TabsTrigger value="propuestas" className="data-[state=active]:bg-slate-850 data-[state=active]:text-white">
              Propuestas ({proposals.length})
            </TabsTrigger>
            <TabsTrigger value="categorias" className="data-[state=active]:bg-slate-850 data-[state=active]:text-white">
              Categorías ({catalog.length})
            </TabsTrigger>
            <TabsTrigger value="servicios" className="data-[state=active]:bg-slate-850 data-[state=active]:text-white">
              Servicios y Planes
            </TabsTrigger>
            <TabsTrigger value="branding" className="data-[state=active]:bg-slate-850 data-[state=active]:text-white flex gap-1.5 items-center">
              <Settings className="h-3.5 w-3.5" />
              Ajustes de Marca
            </TabsTrigger>
          </TabsList>
        </div>

        {/* TAB 1: PROPUESTAS */}
        <TabsContent value="propuestas">
          <Card className="border-slate-800 bg-slate-950 text-white shadow-2xl">
            <CardHeader>
              <CardTitle>Contratos Generados</CardTitle>
              <CardDescription className="text-slate-400">
                Historial de propuestas comerciales creadas, estados de facturación y firmas
              </CardDescription>
            </CardHeader>
            <CardContent>
              {proposals.length === 0 ? (
                <div className="text-center py-12 text-slate-400">
                  <FileText className="mx-auto h-12 w-12 text-slate-600 mb-3" />
                  <p className="font-semibold text-lg text-white">No hay propuestas creadas aún</p>
                  <p className="text-sm mt-1">Crea tu primera propuesta haciendo clic en "Nueva Propuesta"</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader className="border-slate-800">
                      <TableRow className="border-slate-800 hover:bg-transparent">
                        <TableHead className="text-slate-400">Cliente / Empresa</TableHead>
                        <TableHead className="text-slate-400">Servicios Contratados</TableHead>
                        <TableHead className="text-slate-400">Inversión Total</TableHead>
                        <TableHead className="text-slate-400">Estado Pago</TableHead>
                        <TableHead className="text-slate-400">Firma</TableHead>
                        <TableHead className="text-slate-400">Creado el</TableHead>
                        <TableHead className="text-right text-slate-400">Acciones</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {proposals.map((prop) => {
                        const totalAmount = prop.services?.reduce((acc, curr) => acc + curr.price, 0) || prop.price || 0
                        const servicesList = prop.services?.map(s => s.service_name).join(", ") || prop.service_name || "Servicio"

                        return (
                          <TableRow key={prop.id} className="border-slate-800 hover:bg-slate-900/30">
                            <TableCell>
                              <div className="font-medium text-white">{prop.client_company}</div>
                              <div className="text-sm text-slate-400">{prop.client_name}</div>
                            </TableCell>
                            <TableCell className="max-w-[240px] truncate">
                              <div className="text-sm text-slate-200">{servicesList}</div>
                              <div className="text-xs text-slate-500">{prop.services?.length || 1} servicio(s)</div>
                            </TableCell>
                            <TableCell className="font-semibold text-white">${totalAmount.toFixed(2)}</TableCell>
                            <TableCell>
                              <Badge
                                className={
                                  prop.payment_status === "PAGADO"
                                    ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                                    : "bg-slate-800 text-slate-300 border border-slate-700"
                                }
                              >
                                {prop.payment_status}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              {prop.signature_image ? (
                                <Badge className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                  ✓ Firmado
                                </Badge>
                              ) : (
                                <Badge variant="outline" className="text-slate-500 border-slate-700">
                                  Pendiente
                                </Badge>
                              )}
                            </TableCell>
                            <TableCell className="text-sm text-slate-400">
                              {new Date(prop.created_at).toLocaleDateString("es-ES")}
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Link href={`/propuestas-dinamicas/${prop.id}`} target="_blank">
                                  <Button
                                    size="icon"
                                    variant="outline"
                                    className="border-slate-700 hover:bg-slate-800 text-slate-300 hover:text-white cursor-pointer bg-slate-950"
                                    title="Ver Portal Público"
                                  >
                                    <ExternalLink className="h-4 w-4" />
                                  </Button>
                                </Link>
                                <Link href={`/admin/propuestas/editar/${prop.id}`}>
                                  <Button
                                    size="icon"
                                    variant="outline"
                                    className="border-slate-700 hover:bg-slate-800 text-slate-300 hover:text-white cursor-pointer bg-slate-950"
                                    title="Editar Contrato"
                                  >
                                    <Pencil className="h-4 w-4" />
                                  </Button>
                                </Link>
                                 <Button
                                   size="icon"
                                   variant="outline"
                                   className="border-slate-700 hover:bg-slate-800 text-slate-300 hover:text-white cursor-pointer bg-slate-950"
                                   title="Enviar Propuesta por Correo"
                                   disabled={isSendingProposal[prop.id] || isPending}
                                   onClick={async () => {
                                     const confirmSend = window.confirm(`¿Estás seguro de enviar la propuesta de servicios a ${prop.client_name} por correo?`)
                                     if (!confirmSend) return
                                     
                                     setIsSendingProposal(prev => ({ ...prev, [prop.id]: true }))
                                     try {
                                       await sendProposalEmail(prop.id)
                                       toast.success("¡Propuesta enviada por correo con éxito!")
                                     } catch (err: any) {
                                       console.error(err)
                                       toast.error(err.message || "Error al enviar la propuesta.")
                                     } finally {
                                       setIsSendingProposal(prev => ({ ...prev, [prop.id]: false }))
                                     }
                                   }}
                                 >
                                   {isSendingProposal[prop.id] ? (
                                     <Loader2 className="h-4 w-4 animate-spin" />
                                   ) : (
                                     <Mail className="h-4 w-4" />
                                   )}
                                 </Button>
                                 <Button
                                   size="icon"
                                   variant="destructive"
                                   className="bg-red-950/40 border border-red-800/30 text-red-400 hover:bg-red-900/60 cursor-pointer"
                                   title="Eliminar"
                                   onClick={() => handleDeleteProposal(prop.id)}
                                   disabled={isPending}
                                 >
                                   <Trash2 className="h-4 w-4" />
                                 </Button>
                               </div>
                            </TableCell>
                          </TableRow>
                        )
                      })}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* TAB 2: CATEGORÍAS */}
        <TabsContent value="categorias">
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="md:col-span-2 border-slate-800 bg-slate-950 text-white">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Folder className="h-5 w-5 text-primary" />
                  Categorías Existentes
                </CardTitle>
                <CardDescription className="text-slate-400">
                  Grupos de clasificación principales para los servicios del catálogo
                </CardDescription>
              </CardHeader>
              <CardContent>
                {catalog.length === 0 ? (
                  <div className="text-slate-400 py-6 text-center text-sm">No hay categorías configuradas.</div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader className="border-slate-800">
                        <TableRow className="border-slate-800 hover:bg-transparent">
                          <TableHead className="text-slate-400">ID / Identificador</TableHead>
                          <TableHead className="text-slate-400">Nombre de la Categoría</TableHead>
                           <TableHead className="text-right text-slate-400">Acciones</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {catalog.map((cat) => (
                          <TableRow key={cat.id} className="border-slate-800 hover:bg-slate-900/10">
                            <TableCell className="font-mono text-xs text-primary">{cat.id}</TableCell>
                            <TableCell className="font-semibold text-white">{cat.name}</TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-1.5">
                                <Button
                                  size="icon"
                                  variant="outline"
                                  className="border-slate-800 hover:bg-slate-900 text-slate-300 hover:text-white cursor-pointer h-7 w-7 bg-slate-950"
                                  onClick={() => {
                                    setEditCategoryObj({ id: cat.id, name: cat.name, policies: cat.policies || "" })
                                    setShowEditCategoryModal(true)
                                  }}
                                >
                                  <Pencil className="h-3.5 w-3.5" />
                                </Button>
                                <Button
                                  size="icon"
                                  variant="destructive"
                                  className="bg-red-950/40 border border-red-800/30 text-red-400 hover:bg-red-900/60 cursor-pointer h-7 w-7"
                                  onClick={() => handleDeleteCategory(cat.id)}
                                  disabled={isPending}
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="border-slate-800 bg-slate-950 text-white">
              <CardHeader>
                <CardTitle className="text-base text-white">Nueva Categoría</CardTitle>
                <CardDescription className="text-slate-400">Añade una categoría al catálogo</CardDescription>
              </CardHeader>
              <form onSubmit={handleCreateCategory}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="catName">Nombre de Categoría</Label>
                    <Input
                      id="catName"
                      placeholder="Ej. Alojamiento Web"
                      value={newCatName}
                      onChange={(e) => setNewCatName(e.target.value)}
                      className="bg-slate-900 border-slate-800 text-white"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="catPolicies">Políticas de la Categoría / SLA General</Label>
                    <textarea
                      id="catPolicies"
                      placeholder="Ej. Soporte de 9am a 5pm de lunes a viernes."
                      value={newCatPolicies}
                      onChange={(e) => setNewCatPolicies(e.target.value)}
                      rows={3}
                      className="w-full rounded-md border border-slate-800 bg-slate-900 p-2.5 text-xs text-white focus:ring-1 focus:ring-primary font-sans leading-relaxed"
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" disabled={isPending} className="w-full bg-primary text-white hover:bg-primary/90 cursor-pointer h-9 text-xs">
                    {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Crear Categoría"}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </div>
        </TabsContent>

        {/* TAB 3: SERVICIOS Y PLANES */}
        <TabsContent value="servicios">
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="md:col-span-2 border-slate-800 bg-slate-950 text-white">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Layers className="h-5 w-5 text-primary" />
                  Servicios y Planes de Catálogo
                </CardTitle>
                <CardDescription className="text-slate-400">
                  Visualiza los servicios activos y sus respectivos planes de cotización
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {catalog.map((cat) => (
                  <div key={cat.id} className="border-b border-slate-900 pb-6 last:border-b-0 last:pb-0">
                    <h3 className="text-lg font-bold text-primary mb-3 flex items-center gap-2">
                      <Folder className="h-4 w-4" />
                      {cat.name}
                    </h3>

                    {cat.services.length === 0 ? (
                      <p className="text-xs text-slate-500 pl-6">No hay servicios en esta categoría</p>
                    ) : (
                      <div className="space-y-4 pl-6 border-l border-slate-900 ml-2">
                        {cat.services.map((ser) => (
                          <div key={ser.id} className="space-y-2">
                            <div className="flex justify-between items-center bg-slate-900/30 p-2 rounded border border-slate-850">
                              <span className="font-semibold text-sm text-slate-200">{ser.name}</span>
                              <div className="flex gap-1">
                                <Button
                                  size="icon"
                                  variant="ghost"
                                  className="text-slate-400 hover:text-slate-200 h-6 w-6 cursor-pointer"
                                  onClick={() => {
                                    setEditServiceObj({ id: ser.id, name: ser.name, category_id: cat.id })
                                    setShowEditServiceModal(true)
                                  }}
                                >
                                  <Pencil className="h-3 w-3" />
                                </Button>
                                <Button
                                  size="icon"
                                  variant="ghost"
                                  className="text-red-400 hover:text-red-300 hover:bg-red-950/20 h-6 w-6 cursor-pointer"
                                  onClick={() => handleDeleteService(ser.id)}
                                  disabled={isPending}
                                >
                                  <Trash2 className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>

                            {ser.plans.length === 0 ? (
                              <p className="text-[11px] text-slate-600 pl-4">No hay planes registrados</p>
                            ) : (
                              <div className="grid gap-2 md:grid-cols-2 pl-4">
                                {ser.plans.map((plan) => (
                                  <div key={plan.id} className="bg-slate-950 p-3 rounded border border-slate-900 relative">
                                    <div className="flex justify-between items-start mb-1">
                                      <div className="font-bold text-xs text-white">{plan.name}</div>
                                      <div className="flex gap-1 -mt-1 -mr-1">
                                        <Button
                                          size="icon"
                                          variant="ghost"
                                          className="text-slate-400 hover:text-slate-200 h-5 w-5 p-0"
                                          onClick={() => {
                                            setEditPlanObj({
                                              id: plan.id,
                                              service_id: ser.id,
                                              name: plan.name,
                                              price: plan.price,
                                              duration: plan.duration,
                                              features: plan.features,
                                              policies: plan.policies || ""
                                            })
                                            setShowEditPlanModal(true)
                                          }}
                                        >
                                          <Pencil className="h-3.5 w-3.5" />
                                        </Button>
                                        <Button
                                          size="icon"
                                          variant="ghost"
                                          className="text-red-500 hover:text-red-400 h-5 w-5 p-0"
                                          onClick={() => handleDeletePlan(plan.id)}
                                          disabled={isPending}
                                        >
                                          <Trash2 className="h-3 w-3" />
                                        </Button>
                                      </div>
                                    </div>
                                    <div className="text-[10px] text-slate-400 mb-2">
                                      ${plan.price} / {plan.duration}
                                    </div>
                                    {plan.policies && (
                                      <div className="text-[9px] text-slate-500 bg-slate-900/55 p-1 rounded font-mono truncate">
                                        Term: {plan.policies}
                                      </div>
                                    )}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>

            <div className="space-y-6">
              {/* Form 1: Crear Servicio */}
              <Card className="border-slate-800 bg-slate-950 text-white">
                <CardHeader className="pb-3">
                  <CardTitle className="text-white text-base">Crear Servicio</CardTitle>
                  <CardDescription className="text-slate-400">Registra un nuevo servicio bajo una categoría</CardDescription>
                </CardHeader>
                <form onSubmit={handleCreateService}>
                  <CardContent className="space-y-3">
                    <div className="space-y-1.5">
                      <Label htmlFor="serCategory" className="text-slate-300 text-xs">Categoría Asociada *</Label>
                      <Select value={newSerCatId} onValueChange={setNewSerCatId}>
                        <SelectTrigger id="serCategory" className="bg-slate-900 border-slate-800 text-white h-9 text-xs">
                          <SelectValue placeholder="Seleccione Categoría" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-950 border-slate-800 text-white">
                          {catalog.map((cat) => (
                            <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="serName" className="text-slate-300 text-xs">Nombre del Servicio *</Label>
                      <Input
                        id="serName"
                        placeholder="Ej. Hosting Premium"
                        value={newSerName}
                        onChange={(e) => setNewSerName(e.target.value)}
                        className="bg-slate-900 border-slate-800 text-white h-9 text-xs focus:border-primary"
                        required
                      />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button type="submit" disabled={isPending} className="w-full bg-primary text-white hover:bg-primary/90 h-9 text-xs cursor-pointer">
                      {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Crear Servicio"}
                    </Button>
                  </CardFooter>
                </form>
              </Card>

              {/* Form 2: Crear Plan / Suscripción */}
              <Card className="border-slate-800 bg-slate-950 text-white">
                <CardHeader className="pb-3">
                  <CardTitle className="text-white text-base">Crear Plan / Suscripción</CardTitle>
                  <CardDescription className="text-slate-400">Registra un plan comercial para un servicio</CardDescription>
                </CardHeader>
                <form onSubmit={handleCreatePlan}>
                  <CardContent className="space-y-3">
                    <div className="space-y-1.5">
                      <Label className="text-slate-300 text-xs">Categoría Principal *</Label>
                      <Select value={newPlanCatId} onValueChange={(val) => { setNewPlanCatId(val); setNewPlanSerId(""); }}>
                        <SelectTrigger className="bg-slate-900 border-slate-800 text-white h-9 text-xs">
                          <SelectValue placeholder="Seleccione Categoría" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-950 border-slate-800 text-white">
                          {catalog.map((cat) => (
                            <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-1.5">
                      <Label className="text-slate-300 text-xs">Servicio Relacionado *</Label>
                      <Select value={newPlanSerId} onValueChange={setNewPlanSerId} disabled={!newPlanCatId}>
                        <SelectTrigger className="bg-slate-900 border-slate-800 text-white h-9 text-xs disabled:opacity-50">
                          <SelectValue placeholder="Seleccione Servicio" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-950 border-slate-800 text-white">
                          {activeServices.map((ser) => (
                            <SelectItem key={ser.id} value={ser.id}>{ser.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-1.5">
                      <Label className="text-slate-300 text-xs">Nombre del Plan *</Label>
                      <Input
                        placeholder="Ej. Plan Pro"
                        value={newPlanName}
                        onChange={(e) => setNewPlanName(e.target.value)}
                        className="bg-slate-900 border-slate-800 h-9 text-xs"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-1.5">
                        <Label className="text-slate-300 text-xs">Precio ($) *</Label>
                        <Input
                          type="number"
                          step="0.01"
                          placeholder="Ej. 19.99"
                          value={newPlanPrice}
                          onChange={(e) => setNewPlanPrice(e.target.value)}
                          className="bg-slate-900 border-slate-800 h-9 text-xs"
                          required
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-slate-300 text-xs">Ciclo / Duración *</Label>
                        <Input
                          placeholder="Ej. 1 año, 1 mes, 15 días"
                          value={newPlanDuration}
                          onChange={(e) => setNewPlanDuration(e.target.value)}
                          className="bg-slate-900 border-slate-800 h-9 text-xs"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <Label className="text-slate-300 text-xs">Características *</Label>
                      <textarea
                        placeholder="Característica 1&#10;Característica 2"
                        value={newPlanFeatures}
                        onChange={(e) => setNewPlanFeatures(e.target.value)}
                        rows={3}
                        className="w-full rounded-md border border-slate-800 bg-slate-900 p-2 text-xs text-white focus:ring-1 focus:ring-primary font-sans leading-relaxed"
                        required
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label className="text-slate-300 text-xs">Políticas de Servicio / SLA (Req 1)</Label>
                      <textarea
                        placeholder="Políticas específicas de este plan..."
                        value={newPlanPolicies}
                        onChange={(e) => setNewPlanPolicies(e.target.value)}
                        rows={2}
                        className="w-full rounded-md border border-slate-800 bg-slate-900 p-2 text-xs text-white focus:ring-1 focus:ring-primary font-sans leading-relaxed"
                      />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button type="submit" disabled={isPending} className="w-full bg-primary text-white hover:bg-primary/90 h-9 text-xs cursor-pointer">
                      {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Crear Plan"}
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* TAB 4: AJUSTES DE MARCA (BRANDING / WHITE-LABEL) */}
        <TabsContent value="branding">
          <Card className="border-slate-800 bg-slate-950 text-white shadow-2xl">
            <CardHeader>
              <CardTitle className="flex gap-2 items-center">
                <Palette className="h-5 w-5 text-primary" />
                <span>Personalización de Marca Blanca (White-Label)</span>
              </CardTitle>
              <CardDescription className="text-slate-400">
                Configura el nombre, logotipo y la paleta de colores para vestir el sistema bajo tu propia identidad visual.
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSaveSettings}>
              <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label className="text-slate-300">Nombre de la Marca</Label>
                    <Input
                      placeholder="Ej. Mi Agencia"
                      value={brandName}
                      onChange={e => setBrandName(e.target.value)}
                      className="bg-slate-900 border-slate-800"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-slate-300">Logotipo de la Marca (Subir imagen o URL)</Label>
                    <div className="flex gap-3 items-center">
                      {brandLogo && (
                        <div className="h-10 w-10 border border-slate-800 rounded bg-slate-900 flex items-center justify-center p-1 flex-shrink-0">
                          <img src={brandLogo} alt="Logo" className="h-full w-full object-contain" />
                        </div>
                      )}
                      <div className="flex-1 flex gap-2">
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={e => {
                            const file = e.target.files?.[0]
                            if (file) {
                              const reader = new FileReader()
                              reader.onloadend = () => {
                                setBrandLogo(reader.result as string)
                              }
                              reader.readAsDataURL(file)
                            }
                          }}
                          className="bg-slate-900 border-slate-800 text-xs py-1 cursor-pointer flex-1"
                        />
                        <Input
                          placeholder="O URL directa..."
                          value={brandLogo.startsWith("data:") ? "" : brandLogo}
                          onChange={e => setBrandLogo(e.target.value)}
                          className="bg-slate-900 border-slate-800 text-xs w-1/3"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-slate-300">Color Primario Corporativo</Label>
                    <div className="flex gap-2">
                      <Input
                        type="color"
                        value={colorPrim || "#ff6600"}
                        onChange={e => setColorPrim(e.target.value)}
                        className="w-10 h-10 p-0 border border-slate-800 cursor-pointer rounded bg-transparent"
                      />
                      <Input
                        placeholder="#ff6600"
                        value={colorPrim}
                        onChange={e => setColorPrim(e.target.value)}
                        className="bg-slate-900 border-slate-800"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-slate-300">Color Secundario Corporativo</Label>
                    <div className="flex gap-2">
                      <Input
                        type="color"
                        value={colorSec || "#0f172a"}
                        onChange={e => setColorSec(e.target.value)}
                        className="w-10 h-10 p-0 border border-slate-800 cursor-pointer rounded bg-transparent"
                      />
                      <Input
                        placeholder="#0f172a"
                        value={colorSec}
                        onChange={e => setColorSec(e.target.value)}
                        className="bg-slate-900 border-slate-800"
                      />
                    </div>
                  </div>
                </div>

                <div className="border-t border-slate-900 pt-6">
                  <h3 className="text-sm font-bold text-slate-200 mb-3 flex items-center gap-2">
                    <Mail className="h-4 w-4 text-primary" />
                    Configuración de Servidor SMTP (Para Email Recordatorios y Envío de Propuestas)
                  </h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label className="text-slate-300">Host SMTP</Label>
                      <Input
                        placeholder="Ej. smtp.gmail.com o mail.tudominio.com"
                        value={smtpHost}
                        onChange={e => setSmtpHost(e.target.value)}
                        className="bg-slate-900 border-slate-800"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-slate-300">Puerto SMTP</Label>
                      <Input
                        placeholder="Ej. 465 o 587"
                        value={smtpPort}
                        onChange={e => setSmtpPort(e.target.value)}
                        className="bg-slate-900 border-slate-800"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-slate-300">Usuario SMTP (Email)</Label>
                      <Input
                        placeholder="Ej. notificaciones@tudominio.com"
                        value={smtpUser}
                        onChange={e => setSmtpUser(e.target.value)}
                        className="bg-slate-900 border-slate-800"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-slate-300">Contraseña SMTP</Label>
                      <Input
                        type="password"
                        placeholder="••••••••••••••••"
                        value={smtpPass}
                        onChange={e => setSmtpPass(e.target.value)}
                        className="bg-slate-900 border-slate-800"
                      />
                    </div>
                  </div>
                </div>

                {/* Email Test and Preview */}
                <div className="border-t border-slate-900 pt-6 space-y-4">
                  <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
                    <Eye className="h-4 w-4 text-primary" />
                    Vista Previa de Correo y Envío de Prueba
                  </h3>

                  <div className="grid gap-6 md:grid-cols-2">
                    {/* Formulario de Correo de prueba */}
                    <div className="bg-slate-900/40 p-4 border border-slate-800 rounded-lg space-y-3 flex flex-col justify-center">
                      <Label className="text-slate-300">Enviar correo de prueba</Label>
                      <p className="text-xs text-slate-400">Verifica la conexión SMTP enviando un correo de prueba ahora mismo.</p>
                      <div className="flex gap-2">
                        <Input
                          placeholder="Ej. tu-correo@dominio.com"
                          value={testEmailRecipient}
                          onChange={e => setTestEmailRecipient(e.target.value)}
                          className="bg-slate-900 border-slate-800 text-xs h-9"
                        />
                        <Button
                          type="button"
                          onClick={async () => {
                            if (!testEmailRecipient) {
                              toast.error("Por favor, ingresa un correo destinatario.")
                              return
                            }
                            setIsSendingTest(true)
                            try {
                              await sendTestEmail(testEmailRecipient)
                              toast.success("¡Correo de prueba enviado con éxito!")
                            } catch (err: any) {
                              console.error(err)
                              toast.error(err.message || "Error al enviar el correo de prueba.")
                            } finally {
                              setIsSendingTest(false)
                            }
                          }}
                          className="bg-primary text-white hover:bg-primary/90 text-xs h-9 cursor-pointer flex-shrink-0"
                          disabled={isSendingTest}
                        >
                          {isSendingTest ? <Loader2 className="h-3 w-3 animate-spin mr-1" /> : null}
                          Enviar Test
                        </Button>
                      </div>
                    </div>

                    {/* Visor de Plantilla de Correo */}
                    <div className="border border-slate-800 rounded-lg overflow-hidden bg-white text-slate-700 shadow-lg text-[10px] w-full">
                      <div className="bg-slate-100 p-2 text-slate-500 border-b flex justify-between items-center text-[9px] font-sans">
                        <span>Para: cliente@ejemplo.com</span>
                        <span>Asunto: Propuesta de Servicios - [Empresa]</span>
                      </div>
                      <div className="p-4 space-y-4 max-w-md mx-auto font-sans">
                        <div className="text-center">
                          {brandLogo ? (
                            <img src={brandLogo} alt="Logo" className="max-h-8 object-contain mx-auto" />
                          ) : (
                            <h4 style={{ color: colorPrim || '#ff6600' }} className="margin-0 font-bold text-sm">{brandName}</h4>
                          )}
                        </div>
                        <div style={{ borderTop: `2px solid ${colorPrim || '#ff6600'}` }} className="pt-2">
                          <p className="font-bold text-slate-900 mb-1 text-xs">Propuesta Comercial de Servicios</p>
                          <p className="leading-relaxed">Estimado cliente, le invitamos a revisar los detalles de los servicios y planes cotizados haciendo clic en el siguiente enlace para firmar en línea:</p>
                        </div>
                        <div className="text-center py-1">
                          <span style={{ backgroundColor: colorPrim || '#ff6600' }} className="text-white px-3 py-1.5 rounded text-[9px] font-bold inline-block shadow-sm">
                            Ver y Firmar Propuesta Comercial
                          </span>
                        </div>
                        <p className="text-[8px] text-slate-400 text-center border-t pt-2">Enviado por la plataforma de {brandName}.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="justify-end border-t border-slate-900 pt-4 bg-slate-950/20">
                <Button type="submit" disabled={isPending} className="bg-primary text-white hover:bg-primary/90 cursor-pointer">
                  {isPending ? "Guardando..." : "Guardar Ajustes"}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
      </Tabs>

      {/* MODAL EDITAR CATEGORÍA */}
      {showEditCategoryModal && editCategoryObj && (
        <div className="fixed inset-0 z-55 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
          <div className="bg-slate-950 border border-slate-800 rounded-xl max-w-md w-full p-6 text-white shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-slate-900 pb-3">
              <h3 className="text-lg font-bold text-white">Editar Categoría</h3>
              <button onClick={() => setShowEditCategoryModal(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>
            <form onSubmit={handleEditCategorySubmit} className="space-y-4">
              <div className="space-y-2">
                <Label className="text-slate-300">Nombre de la Categoría</Label>
                <Input
                  value={editCategoryObj.name}
                  onChange={e => setEditCategoryObj({ ...editCategoryObj, name: e.target.value })}
                  className="bg-slate-900 border-slate-800 text-white"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label className="text-slate-300">Políticas de la Categoría / SLA General</Label>
                <textarea
                  value={editCategoryObj.policies}
                  onChange={e => setEditCategoryObj({ ...editCategoryObj, policies: e.target.value })}
                  rows={3}
                  className="w-full rounded-md border border-slate-800 bg-slate-900 p-2.5 text-xs text-white focus:ring-1 focus:ring-primary font-sans leading-relaxed"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <Button type="button" variant="outline" onClick={() => setShowEditCategoryModal(false)} className="bg-slate-950 border-slate-800 text-slate-300 hover:text-white cursor-pointer">
                  Cancelar
                </Button>
                <Button type="submit" disabled={isPending} className="bg-primary hover:bg-primary/90 text-white cursor-pointer">
                  {isPending ? "Guardando..." : "Guardar Cambios"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL EDITAR SERVICIO */}
      {showEditServiceModal && editServiceObj && (
        <div className="fixed inset-0 z-55 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
          <div className="bg-slate-950 border border-slate-800 rounded-xl max-w-md w-full p-6 text-white shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-slate-900 pb-3">
              <h3 className="text-lg font-bold text-white">Editar Servicio</h3>
              <button onClick={() => setShowEditServiceModal(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>
            <form onSubmit={handleEditServiceSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label className="text-slate-300">Categoría Asociada</Label>
                <Select
                  value={editServiceObj.category_id}
                  onValueChange={val => setEditServiceObj({ ...editServiceObj, category_id: val })}
                >
                  <SelectTrigger className="bg-slate-900 border-slate-800 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-950 border-slate-800 text-white">
                    {catalog.map(cat => (
                      <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-slate-300">Nombre del Servicio</Label>
                <Input
                  value={editServiceObj.name}
                  onChange={e => setEditServiceObj({ ...editServiceObj, name: e.target.value })}
                  className="bg-slate-900 border-slate-800 text-white"
                  required
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <Button type="button" variant="outline" onClick={() => setShowEditServiceModal(false)} className="bg-slate-950 border-slate-800 text-slate-300 hover:text-white cursor-pointer">
                  Cancelar
                </Button>
                <Button type="submit" disabled={isPending} className="bg-primary hover:bg-primary/90 text-white cursor-pointer">
                  {isPending ? "Guardando..." : "Guardar Cambios"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL EDITAR PLAN */}
      {showEditPlanModal && editPlanObj && (
        <div className="fixed inset-0 z-55 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
          <div className="bg-slate-950 border border-slate-800 rounded-xl max-w-lg w-full p-6 text-white shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-slate-900 pb-3">
              <h3 className="text-lg font-bold text-white">Editar Plan / Suscripción</h3>
              <button onClick={() => setShowEditPlanModal(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>
            <form onSubmit={handleEditPlanSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label className="text-slate-300">Nombre del Plan</Label>
                <Input
                  value={editPlanObj.name}
                  onChange={e => setEditPlanObj({ ...editPlanObj, name: e.target.value })}
                  className="bg-slate-900 border-slate-800 text-white"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-slate-300">Precio ($)</Label>
                  <Input
                    type="number"
                    step="0.01"
                    value={editPlanObj.price}
                    onChange={e => setEditPlanObj({ ...editPlanObj, price: parseFloat(e.target.value) || 0 })}
                    className="bg-slate-900 border-slate-800 text-white"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-slate-300">Ciclo / Duración</Label>
                  <Input
                    value={editPlanObj.duration}
                    onChange={e => setEditPlanObj({ ...editPlanObj, duration: e.target.value })}
                    className="bg-slate-900 border-slate-800 text-white"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-slate-300">Características (Una por línea)</Label>
                <textarea
                  value={editPlanObj.features}
                  onChange={e => setEditPlanObj({ ...editPlanObj, features: e.target.value })}
                  rows={4}
                  className="w-full rounded-md border border-slate-800 bg-slate-900 p-3 text-sm text-white focus:ring-1 focus:ring-primary font-sans leading-relaxed"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label className="text-slate-300">Políticas del Plan / SLA (Req 1)</Label>
                <textarea
                  value={editPlanObj.policies}
                  onChange={e => setEditPlanObj({ ...editPlanObj, policies: e.target.value })}
                  rows={3}
                  className="w-full rounded-md border border-slate-800 bg-slate-900 p-3 text-sm text-white focus:ring-1 focus:ring-primary font-sans leading-relaxed"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <Button type="button" variant="outline" onClick={() => setShowEditPlanModal(false)} className="bg-slate-950 border-slate-800 text-slate-300 hover:text-white cursor-pointer">
                  Cancelar
                </Button>
                <Button type="submit" disabled={isPending} className="bg-primary hover:bg-primary/90 text-white cursor-pointer">
                  {isPending ? "Guardando..." : "Guardar Cambios"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  )
}
