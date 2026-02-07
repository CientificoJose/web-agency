# 📄 Sistema de Contratos/Propuestas Reutilizables

Este sistema permite crear contratos y propuestas profesionales con firma digital de forma rápida y consistente.

## 🎯 Plantilla Base: `contract-template.tsx`

### Características

- ✅ **Firma digital** con persistencia en localStorage
- ✅ **Botón de impresión** optimizado para PDF
- ✅ **Botón de borrar firma** para desarrollo/pruebas
- ✅ **Logo automático** (recurso.png + "Sin Límites")
- ✅ **Diseño responsive** y profesional
- ✅ **Secciones dinámicas** totalmente personalizables

### Uso Básico

```tsx
import ContractTemplate from "@/components/proposals/contract-template"
import { MiSeccion1, MiSeccion2 } from "./mi-contenido"

export default function MiContratoPage() {
  return (
    <ContractTemplate
      // Información del contrato
      contractTitle="Contrato de Servicio"
      contractSubtitle="Descripción del servicio"
      storageKey="proposal-mi-cliente-signature"
      
      // Proveedor
      providerName="Sin Límites Agency"
      providerEmail="contact@sinlimites-agency.site"
      providerPhone="+58 424 360 3846"
      
      // Cliente
      clientName="Nombre del Cliente"
      clientCompany="Empresa del Cliente"
      clientDomain="dominio.com"
      
      // Secciones (componentes React)
      sections={[
        <MiSeccion1 key="seccion1" />,
        <MiSeccion2 key="seccion2" />,
      ]}
    />
  )
}
```

## 📋 Ejemplo: Contrato de Correo Corporativo

Ver `app/propuestas/alquimia-company/correo-corporativo/page.tsx` como referencia completa.

### Estructura de Secciones

Crea un archivo de contenido (ej: `mi-contenido.tsx`):

```tsx
export function ResumenSection() {
  return (
    <section className="mb-8">
      <h2 className="mb-4 text-2xl font-bold text-gray-900">Resumen</h2>
      <div className="rounded-lg border border-gray-200 bg-white p-6">
        {/* Tu contenido aquí */}
      </div>
    </section>
  )
}

export function ServicioSection() {
  return (
    <section className="mb-8">
      <h2 className="mb-4 text-2xl font-bold text-gray-900">Detalles del Servicio</h2>
      <div className="rounded-lg border border-gray-200 bg-white p-6">
        {/* Tu contenido aquí */}
      </div>
    </section>
  )
}
```

## 🎨 Guía de Estilos

### Secciones
```tsx
<section className="mb-8">
  <h2 className="mb-4 text-2xl font-bold text-gray-900">Título</h2>
  {/* Contenido */}
</section>
```

### Cajas de Contenido
```tsx
<div className="rounded-lg border border-gray-200 bg-white p-6">
  {/* Contenido */}
</div>
```

### Alertas/Notas

**Éxito:**
```tsx
<div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4">
  <h4 className="mb-2 font-semibold text-emerald-900">✅ Título</h4>
  <p className="text-sm text-emerald-800">Mensaje</p>
</div>
```

**Información:**
```tsx
<div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
  <h4 className="mb-2 font-semibold text-blue-900">💡 Título</h4>
  <p className="text-sm text-blue-800">Mensaje</p>
</div>
```

**Advertencia:**
```tsx
<div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4">
  <h4 className="mb-2 font-semibold text-yellow-900">⚠️ Título</h4>
  <p className="text-sm text-yellow-800">Mensaje</p>
</div>
```

**Error/Importante:**
```tsx
<div className="rounded-lg border border-red-200 bg-red-50 p-4">
  <h4 className="mb-2 font-semibold text-red-900">🔴 Título</h4>
  <p className="text-sm text-red-800">Mensaje</p>
</div>
```

### Emojis Recomendados

Usa emojis **emocionales**, no técnicos:
- ✅ Éxito/Completado
- 🎉 Celebración/Listo
- 💡 Tip/Idea
- ⚠️ Advertencia
- 🔴 Error/Crítico
- 📧 Email
- 📨 Mensaje
- 🗑️ Eliminar
- 📄 Documento
- 🔧 Configuración

## 🚀 Crear un Nuevo Contrato

1. **Crear carpeta del cliente:**
   ```
   app/propuestas/nombre-cliente/nombre-servicio/
   ```

2. **Crear archivo de contenido:**
   ```
   components/proposals/nombre-cliente-contenido.tsx
   ```

3. **Crear página del contrato:**
   ```tsx
   // app/propuestas/nombre-cliente/nombre-servicio/page.tsx
   import ContractTemplate from "@/components/proposals/contract-template"
   import { Seccion1, Seccion2 } from "@/components/proposals/nombre-cliente-contenido"

   export default function ContratoPage() {
     return (
       <ContractTemplate
         contractTitle="Título del Contrato"
         contractSubtitle="Subtítulo"
         storageKey="proposal-nombre-cliente-signature"
         providerName="Sin Límites Agency"
         providerEmail="contact@sinlimites-agency.site"
         providerPhone="+58 424 360 3846"
         clientName="Nombre del Cliente"
         sections={[
           <Seccion1 key="1" />,
           <Seccion2 key="2" />,
         ]}
       />
     )
   }
   ```

## 🔧 Funcionalidades

### Firma Digital
- Se guarda automáticamente en `localStorage`
- Persiste entre sesiones
- Incluye fecha y hora de firma
- Botón de borrar para desarrollo

### Impresión/PDF
- Botón "Imprimir Contrato" genera PDF
- Estilos optimizados para impresión
- Fondo blanco forzado (sin fondos negros)
- Logo y firma incluidos

### Desarrollo
- Botón "Borrar Firma" visible cuando hay firma guardada
- Permite hacer pruebas sin limpiar localStorage manualmente
- Solo visible en pantalla, no en impresión

## 📝 Notas Importantes

- **storageKey**: Debe ser único por contrato (ej: `proposal-cliente-servicio-signature`)
- **Secciones**: Siempre pasar array de componentes React con `key` único
- **Emojis**: Usar emocionales (🎉✅💡) no técnicos (⚙️🔧📡)
- **Impresión**: Probar siempre el PDF antes de enviar al cliente

## 🎯 Ejemplo Completo

Ver implementación completa en:
- **Página**: `app/propuestas/alquimia-company/correo-corporativo/page.tsx`
- **Contenido**: `components/proposals/alquimia-company-content.tsx`
