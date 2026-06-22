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
import { PlusCircle, FileText, Trash2, ExternalLink, Loader2, Folder, Layers, Award, Pencil } from "lucide-react"
import { GuidedTour, TourStep } from "@/components/ui/guided-tour"

interface AdminPropuestasClientProps {
  proposals: Proposal[]
  initialCatalog: CatalogCategory[]
}

const tourSteps: TourStep[] = [
  {
    target: "#tour-header",
    title: "Panel de Sin Límites",
    content: "¡Bienvenido! Este es tu centro de control para gestionar propuestas de contratos comerciales y el catálogo de servicios.",
  },
  {
    target: "#tour-tabs",
    title: "Pestañas de Navegación",
    content: "Puedes moverte entre el listado de propuestas, tus categorías de servicios y los servicios base con sus planes de precios.",
  },
  {
    target: "#tour-table",
    title: "Historial de Contratos",
    content: "En la primera pestaña verás todos los contratos creados, el estado del pago y si ya fue firmado digitalmente por el cliente.",
  },
  {
    target: "#tour-new-button",
    title: "Nueva Propuesta",
    content: "Usa este botón para redactar un nuevo contrato rápido. Te llevará al formulario de creación.",
  },
  {
    target: "#tour-categories-content",
    title: "Gestión de Categorías",
    content: "En esta segunda pestaña puedes registrar nuevas categorías del catálogo (ej. Diseño Web) o eliminar las existentes.",
  },
  {
    target: "#tour-services-content",
    title: "Servicios y Planes",
    content: "En esta tercera pestaña agregas los servicios específicos dentro de cada categoría y creas planes sugeridos con precios, duración y características.",
  },
]

export default function AdminPropuestasClient({ proposals, initialCatalog }: AdminPropuestasClientProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [catalog, setCatalog] = useState<CatalogCategory[]>(initialCatalog)
  const [activeTab, setActiveTab] = useState("propuestas")

  const handleStepChange = (stepIdx: number) => {
    if (stepIdx <= 3) {
      setActiveTab("propuestas")
    } else if (stepIdx === 4) {
      setActiveTab("categorias")
    } else if (stepIdx === 5) {
      setActiveTab("servicios")
    }
  }

  // Sincronizar catálogo desde props del servidor
  useEffect(() => {
    setCatalog(initialCatalog)
  }, [initialCatalog])

  // Estados de los Formularios de Creación
  const [newCatName, setNewCatName] = useState("")
  
  const [newSerName, setNewSerName] = useState("")
  const [newSerCatId, setNewSerCatId] = useState("")

  const [newPlanName, setNewPlanName] = useState("")
  const [newPlanCatId, setNewPlanCatId] = useState("")
  const [newPlanSerId, setNewPlanSerId] = useState("")
  const [newPlanPrice, setNewPlanPrice] = useState("")
  const [newPlanDuration, setNewPlanDuration] = useState("1 año")
  const [newPlanFeatures, setNewPlanFeatures] = useState("")

  // Filtrado de servicios para el creador de planes
  const activeServices = catalog.find((c) => c.id === newPlanCatId)?.services || []

  // Manejo de Acciones
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
        await createCategory(newCatName)
        toast.success("Categoría creada con éxito")
        setNewCatName("")
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
          newPlanFeatures
        )
        toast.success("Plan de servicio creado con éxito")
        setNewPlanName("")
        setNewPlanPrice("")
        setNewPlanFeatures("")
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
    <div className="container mx-auto p-6 max-w-6xl">
      {/* Tour Guiado */}
      <GuidedTour steps={tourSteps} tourKey="admin_propuestas_dashboard_v3" onStepChange={handleStepChange} />

      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-6">
        <div id="tour-header">
          <h1 className="text-3xl font-bold text-white font-sans">Administración de Sin Límites</h1>
          <p className="text-slate-400 mt-1">Configura categorías, servicios base y genera contratos interactivos</p>
        </div>
        <div id="tour-new-button">
          <Link href="/admin/propuestas/crear">
            <Button className="flex items-center gap-2 bg-primary text-white hover:bg-primary/90 cursor-pointer">
              <PlusCircle className="h-4 w-4" />
              Nueva Propuesta
            </Button>
          </Link>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <div id="tour-tabs" className="border-b border-slate-800 pb-1">
          <TabsList className="bg-slate-950 border border-slate-800 text-slate-400">
            <TabsTrigger value="propuestas" className="data-[state=active]:bg-slate-800 data-[state=active]:text-white">
              Propuestas ({proposals.length})
            </TabsTrigger>
            <TabsTrigger value="categorias" className="data-[state=active]:bg-slate-800 data-[state=active]:text-white">
              Categorías ({catalog.length})
            </TabsTrigger>
            <TabsTrigger value="servicios" className="data-[state=active]:bg-slate-800 data-[state=active]:text-white">
              Servicios y Planes
            </TabsTrigger>
          </TabsList>
        </div>

        {/* CONTENIDO 1: PROPUESTAS */}
        <TabsContent value="propuestas">
          <Card id="tour-table" className="border-slate-800 bg-slate-950 text-white">
            <CardHeader>
              <CardTitle className="text-white">Contratos Generados</CardTitle>
              <CardDescription className="text-slate-400">
                Listado de propuestas comerciales y estados de firmas contractuales
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
                        <TableHead className="text-slate-400">Cliente</TableHead>
                        <TableHead className="text-slate-400">Servicio / Plan</TableHead>
                        <TableHead className="text-slate-400">Monto</TableHead>
                        <TableHead className="text-slate-400">Estado Pago</TableHead>
                        <TableHead className="text-slate-400">Firma Cliente</TableHead>
                        <TableHead className="text-slate-400">Creado el</TableHead>
                        <TableHead className="text-right text-slate-400" id="tour-actions">Acciones</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {proposals.map((prop) => (
                        <TableRow key={prop.id} className="border-slate-800 hover:bg-slate-900/30">
                          <TableCell>
                            <div className="font-medium text-white">{prop.client_company}</div>
                            <div className="text-sm text-slate-400">{prop.client_name}</div>
                          </TableCell>
                          <TableCell>
                            <div className="font-medium text-white">
                              {prop.category_name ? `${prop.category_name} - ` : ""}{prop.service_name}
                            </div>
                            <div className="text-sm text-slate-400">
                              {prop.plan_name} ({prop.duration})
                            </div>
                          </TableCell>
                          <TableCell className="font-semibold text-white">${prop.price.toFixed(2)}</TableCell>
                          <TableCell>
                            <Badge
                              variant={prop.payment_status === "PAGADO" ? "default" : "secondary"}
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
                                  className="border-slate-700 hover:bg-slate-800 text-slate-300 hover:text-white cursor-pointer"
                                  title="Ver Contrato"
                                >
                                  <ExternalLink className="h-4 w-4" />
                                </Button>
                              </Link>
                              <Link href={`/admin/propuestas/editar/${prop.id}`}>
                                <Button
                                  size="icon"
                                  variant="outline"
                                  className="border-slate-700 hover:bg-slate-800 text-slate-300 hover:text-white cursor-pointer"
                                  title="Editar Propuesta"
                                >
                                  <Pencil className="h-4 w-4" />
                                </Button>
                              </Link>
                              <Button
                                size="icon"
                                variant="destructive"
                                className="bg-red-950/40 border border-red-800/30 text-red-400 hover:bg-red-900/60 cursor-pointer"
                                title="Eliminar"
                                onClick={() => handleDeleteProposal(prop.id)}
                                disabled={isPending}
                              >
                                {isPending ? (
                                  <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                  <Trash2 className="h-4 w-4" />
                                )}
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
        </TabsContent>

        {/* CONTENIDO 2: CATEGORÍAS */}
        <TabsContent value="categorias" id="tour-categories-content">
          <div className="grid gap-6 md:grid-cols-3">
            {/* Tabla / Lista de Categorías */}
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
                  <p className="text-center py-8 text-slate-500">No hay categorías configuradas</p>
                ) : (
                  <Table>
                    <TableHeader className="border-slate-800">
                      <TableRow className="border-slate-800">
                        <TableHead className="text-slate-400">Identificador (ID)</TableHead>
                        <TableHead className="text-slate-400">Nombre de la Categoría</TableHead>
                        <TableHead className="text-right text-slate-400">Acciones</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {catalog.map((cat) => (
                        <TableRow key={cat.id} className="border-slate-800 hover:bg-slate-900/10">
                          <TableCell className="font-mono text-xs text-slate-400">{cat.id}</TableCell>
                          <TableCell className="font-medium text-white">{cat.name}</TableCell>
                          <TableCell className="text-right">
                            <Button
                              size="icon"
                              variant="destructive"
                              className="bg-red-950/40 border border-red-800/30 text-red-400 hover:bg-red-900/60 cursor-pointer"
                              title="Eliminar Categoría"
                              onClick={() => handleDeleteCategory(cat.id)}
                              disabled={isPending}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>

            {/* Crear Nueva Categoría */}
            <Card className="border-slate-800 bg-slate-950 text-white h-fit">
              <CardHeader>
                <CardTitle className="text-white">Nueva Categoría</CardTitle>
                <CardDescription className="text-slate-400">Agrega un nuevo tipo de servicio al menú</CardDescription>
              </CardHeader>
              <form onSubmit={handleCreateCategory}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="catName" className="text-slate-300">Nombre de la Categoría *</Label>
                    <Input
                      id="catName"
                      placeholder="Ej. Diseño y Branding"
                      value={newCatName}
                      onChange={(e) => setNewCatName(e.target.value)}
                      className="bg-slate-900 border-slate-800 text-white focus:border-primary"
                      required
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    type="submit"
                    disabled={isPending}
                    className="w-full bg-primary text-white hover:bg-primary/90 cursor-pointer"
                  >
                    {isPending ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      "Crear Categoría"
                    )}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </div>
        </TabsContent>

        {/* CONTENIDO 3: SERVICIOS Y PLANES */}
        <TabsContent value="servicios" id="tour-services-content">
          <div className="grid gap-6 md:grid-cols-3">
            {/* Visualización de la Estructura de Servicios */}
            <Card className="md:col-span-2 border-slate-800 bg-slate-950 text-white">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Layers className="h-5 w-5 text-primary" />
                  Estructura del Catálogo
                </CardTitle>
                <CardDescription className="text-slate-400">
                  Relación de Categorías → Servicios → Planes con sus respectivos presets
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {catalog.length === 0 ? (
                  <p className="text-center py-8 text-slate-500">Agregue categorías primero</p>
                ) : (
                  catalog.map((cat) => (
                    <div key={cat.id} className="border border-slate-850 rounded-lg p-4 bg-slate-900/10 space-y-4">
                      {/* Categoría Header */}
                      <div className="flex justify-between items-center border-b border-slate-850 pb-2">
                        <h3 className="font-bold text-primary flex items-center gap-2">
                          <Folder className="h-4 w-4" />
                          {cat.name}
                        </h3>
                        <Badge variant="outline" className="text-slate-500 border-slate-800">Categoría</Badge>
                      </div>

                      {/* Servicios de esta categoría */}
                      {cat.services.length === 0 ? (
                        <p className="text-sm text-slate-500 pl-4 italic">No hay servicios en esta categoría</p>
                      ) : (
                        <div className="space-y-4 pl-4 border-l border-slate-800">
                          {cat.services.map((ser) => (
                            <div key={ser.id} className="space-y-2 bg-slate-950/40 p-3 rounded-lg border border-slate-900">
                              <div className="flex justify-between items-center">
                                <h4 className="font-semibold text-white text-sm flex items-center gap-1.5">
                                  <Layers className="h-3.5 w-3.5 text-slate-400" />
                                  {ser.name}
                                </h4>
                                <div className="flex items-center gap-2">
                                  <Badge className="bg-slate-800 text-slate-300 text-[10px]">Servicio</Badge>
                                  <Button
                                    size="icon"
                                    variant="ghost"
                                    className="h-7 w-7 text-red-500 hover:text-red-400 hover:bg-red-950/20"
                                    title="Eliminar Servicio"
                                    onClick={() => handleDeleteService(ser.id)}
                                    disabled={isPending}
                                  >
                                    <Trash2 className="h-3.5 w-3.5" />
                                  </Button>
                                </div>
                              </div>

                              {/* Planes de este servicio */}
                              {ser.plans.length === 0 ? (
                                <p className="text-xs text-slate-500 pl-2 italic">Sin planes configurados</p>
                              ) : (
                                <div className="space-y-1.5 pl-4">
                                  {ser.plans.map((plan) => (
                                    <div
                                      key={plan.id}
                                      className="flex items-center justify-between text-xs py-1.5 px-2.5 rounded bg-slate-900/50 border border-slate-850"
                                    >
                                      <div className="flex items-center gap-2">
                                        <Award className="h-3.5 w-3.5 text-slate-500" />
                                        <span className="font-medium text-slate-200">{plan.name}</span>
                                        <span className="text-slate-500">|</span>
                                        <span className="text-emerald-400 font-semibold">${plan.price}</span>
                                        <span className="text-slate-500">|</span>
                                        <span className="text-slate-400">{plan.duration}</span>
                                      </div>
                                      <Button
                                        size="icon"
                                        variant="ghost"
                                        className="h-6 w-6 text-red-500 hover:text-red-400 hover:bg-red-950/20"
                                        title="Eliminar Plan"
                                        onClick={() => handleDeletePlan(plan.id)}
                                        disabled={isPending}
                                      >
                                        <Trash2 className="h-3 w-3" />
                                      </Button>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))
                )}
              </CardContent>
            </Card>

            {/* Formularios de Creación de Servicios y Planes */}
            <div className="space-y-6">
              {/* Formulario 1: Crear Servicio */}
              <Card className="border-slate-800 bg-slate-950 text-white">
                <CardHeader className="pb-3">
                  <CardTitle className="text-white text-base">Crear Servicio</CardTitle>
                  <CardDescription className="text-slate-400">Inserta un servicio dentro de una categoría</CardDescription>
                </CardHeader>
                <form onSubmit={handleCreateService}>
                  <CardContent className="space-y-3">
                    <div className="space-y-1.5">
                      <Label htmlFor="serCategory" className="text-slate-300 text-xs">Categoría Principal *</Label>
                      <Select value={newSerCatId} onValueChange={setNewSerCatId}>
                        <SelectTrigger id="serCategory" className="bg-slate-900 border-slate-800 text-white h-9 text-xs">
                          <SelectValue placeholder="Seleccione Categoría" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-950 border-slate-800 text-white">
                          {catalog.map((cat) => (
                            <SelectItem key={cat.id} value={cat.id}>
                              {cat.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="serName" className="text-slate-300 text-xs">Nombre del Servicio *</Label>
                      <Input
                        id="serName"
                        placeholder="Ej. Servidor Dedicado"
                        value={newSerName}
                        onChange={(e) => setNewSerName(e.target.value)}
                        className="bg-slate-900 border-slate-800 text-white h-9 text-xs focus:border-primary"
                        required
                      />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      type="submit"
                      disabled={isPending}
                      className="w-full bg-primary text-white hover:bg-primary/90 h-9 text-xs cursor-pointer"
                    >
                      {isPending ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        "Crear Servicio"
                      )}
                    </Button>
                  </CardFooter>
                </form>
              </Card>

              {/* Formulario 2: Crear Plan / Suscripción */}
              <Card className="border-slate-800 bg-slate-950 text-white">
                <CardHeader className="pb-3">
                  <CardTitle className="text-white text-base">Crear Plan / Suscripción</CardTitle>
                  <CardDescription className="text-slate-400">Registra un plan comercial para un servicio</CardDescription>
                </CardHeader>
                <form onSubmit={handleCreatePlan}>
                  <CardContent className="space-y-3">
                    <div className="space-y-1.5">
                      <Label htmlFor="planCategory" className="text-slate-300 text-xs">Categoría Principal *</Label>
                      <Select value={newPlanCatId} onValueChange={(val) => { setNewPlanCatId(val); setNewPlanSerId(""); }}>
                        <SelectTrigger id="planCategory" className="bg-slate-900 border-slate-800 text-white h-9 text-xs">
                          <SelectValue placeholder="Seleccione Categoría" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-950 border-slate-800 text-white">
                          {catalog.map((cat) => (
                            <SelectItem key={cat.id} value={cat.id}>
                              {cat.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="planService" className="text-slate-300 text-xs">Servicio Relacionado *</Label>
                      <Select value={newPlanSerId} onValueChange={setNewPlanSerId} disabled={!newPlanCatId}>
                        <SelectTrigger id="planService" className="bg-slate-900 border-slate-800 text-white h-9 text-xs disabled:opacity-50">
                          <SelectValue placeholder="Seleccione Servicio" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-950 border-slate-800 text-white">
                          {activeServices.map((ser) => (
                            <SelectItem key={ser.id} value={ser.id}>
                              {ser.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="planNameInput" className="text-slate-300 text-xs">Nombre del Plan *</Label>
                      <Input
                        id="planNameInput"
                        placeholder="Ej. Plan Pro"
                        value={newPlanName}
                        onChange={(e) => setNewPlanName(e.target.value)}
                        className="bg-slate-900 border-slate-800 text-white h-9 text-xs focus:border-primary"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-1.5">
                        <Label htmlFor="planPriceInput" className="text-slate-300 text-xs">Precio ($) *</Label>
                        <Input
                          id="planPriceInput"
                          type="number"
                          step="0.01"
                          placeholder="Ej. 19.99"
                          value={newPlanPrice}
                          onChange={(e) => setNewPlanPrice(e.target.value)}
                          className="bg-slate-900 border-slate-800 text-white h-9 text-xs focus:border-primary"
                          required
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="planDurationInput" className="text-slate-300 text-xs">Duración *</Label>
                        <Input
                          id="planDurationInput"
                          placeholder="Ej. 1 año o 1 mes"
                          value={newPlanDuration}
                          onChange={(e) => setNewPlanDuration(e.target.value)}
                          className="bg-slate-900 border-slate-800 text-white h-9 text-xs focus:border-primary"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="planFeaturesInput" className="text-slate-300 text-xs">Características (una por línea) *</Label>
                      <textarea
                        id="planFeaturesInput"
                        placeholder="Característica 1&#10;Característica 2"
                        value={newPlanFeatures}
                        onChange={(e) => setNewPlanFeatures(e.target.value)}
                        rows={4}
                        className="w-full rounded-md border border-slate-800 bg-slate-900 p-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-primary font-sans leading-relaxed"
                        required
                      />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      type="submit"
                      disabled={isPending}
                      className="w-full bg-primary text-white hover:bg-primary/90 h-9 text-xs cursor-pointer"
                    >
                      {isPending ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        "Crear Plan"
                      )}
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
