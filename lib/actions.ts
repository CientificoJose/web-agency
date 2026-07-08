"use server"

import { getDb } from "./db"
import { revalidatePath } from "next/cache"
import crypto from "crypto"
import nodemailer from "nodemailer"

export interface Proposal {
  id: string
  client_name: string
  client_company: string
  client_domain: string
  service_name?: string
  plan_name?: string
  start_date?: string
  duration?: string
  price?: number
  invoice_number: string
  payment_status: string
  payment_date: string
  payment_method: string
  payment_amount: number
  domain_included?: number
  domain_expiration?: string
  service_expiration?: string
  suspension_date?: string
  signature_image: string | null
  signature_date: string | null
  created_at: string
  category_name?: string
  features?: string
  brand_color_primary?: string
  brand_color_secondary?: string
  brand_logo_url?: string
  grace_days?: number
  late_fee_percentage?: number
  daily_penalty_fee?: number
}

export interface Credential {
  id?: number
  description: string
  email: string
  password: string
  notes?: string
  dynamic_fields?: string
}

export interface ProposalService {
  id?: string
  proposal_id?: string
  category_name: string
  service_name: string
  plan_name: string
  price: number
  billing_type: 'RECURRENT' | 'ONE_TIME'
  billing_cycle?: string
  features: string
  policies?: string
  category_policies?: string
  status?: string
  start_date?: string
  expiration_date?: string
  suspension_date?: string
  domain_included?: number
  domain_expiration?: string
}

export interface ProposalPayment {
  id?: string
  proposal_id?: string
  invoice_number?: string
  amount: number
  payment_date?: string
  payment_method?: string
  description?: string
  status?: string
}

export interface ProposalCollaborator {
  id?: string
  proposal_id?: string
  name: string
  role?: string
  logo_url?: string
  contact?: string
}

export async function getProposals(): Promise<(Proposal & { services?: ProposalService[] })[]> {
  const db = await getDb()
  const proposals = await db.all<Proposal[]>("SELECT * FROM proposals ORDER BY created_at DESC")
  const services = await db.all<ProposalService[]>("SELECT * FROM proposal_services")
  
  return proposals.map(p => ({
    ...p,
    services: services.filter(s => s.proposal_id === p.id)
  }))
}

export async function getProposalById(id: string): Promise<{
  proposal: Proposal | null
  credentials: Credential[]
  services: ProposalService[]
  payments: ProposalPayment[]
  collaborators: ProposalCollaborator[]
}> {
  const db = await getDb()
  const proposal = await db.get<Proposal>("SELECT * FROM proposals WHERE id = ?", [id])
  if (!proposal) {
    return { proposal: null, credentials: [], services: [], payments: [], collaborators: [] }
  }
  const credentials = await db.all<Credential[]>(
    "SELECT description, email, password, notes, dynamic_fields FROM credentials WHERE proposal_id = ?",
    [id]
  )
  const services = await db.all<ProposalService[]>(
    `SELECT s.*, c.policies as category_policies 
     FROM proposal_services s 
     LEFT JOIN categories c ON c.name = s.category_name 
     WHERE s.proposal_id = ?`,
    [id]
  )
  const payments = await db.all<ProposalPayment[]>(
    "SELECT * FROM proposal_payments WHERE proposal_id = ?",
    [id]
  )
  const collaborators = await db.all<ProposalCollaborator[]>(
    "SELECT * FROM proposal_collaborators WHERE proposal_id = ?",
    [id]
  )
  return { proposal, credentials, services, payments, collaborators }
}

export async function createProposal(
  proposalData: Omit<Proposal, "id" | "signature_image" | "signature_date" | "created_at">,
  credentialsData: Credential[],
  servicesData: ProposalService[],
  collaboratorsData: ProposalCollaborator[]
): Promise<string> {
  const db = await getDb()
  const id = crypto.randomUUID()

  await db.run(
    `INSERT INTO proposals (
      id, client_name, client_company, client_domain,
      invoice_number, payment_status, payment_date, payment_method, payment_amount,
      brand_color_primary, brand_color_secondary, brand_logo_url,
      grace_days, late_fee_percentage, daily_penalty_fee,
      service_name, plan_name, start_date, duration, price,
      domain_included, domain_expiration, service_expiration, suspension_date, category_name, features
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      id,
      proposalData.client_name,
      proposalData.client_company,
      proposalData.client_domain || "",
      proposalData.invoice_number || "",
      proposalData.payment_status || "PENDIENTE",
      proposalData.payment_date || "",
      proposalData.payment_method || "",
      proposalData.payment_amount || 0,
      proposalData.brand_color_primary || "",
      proposalData.brand_color_secondary || "",
      proposalData.brand_logo_url || "",
      proposalData.grace_days || 0,
      proposalData.late_fee_percentage || 0,
      proposalData.daily_penalty_fee || 0,
      // Legacy columns
      servicesData[0]?.service_name || "",
      servicesData[0]?.plan_name || "",
      servicesData[0]?.start_date || "",
      servicesData[0]?.billing_cycle || "",
      servicesData[0]?.price || 0,
      servicesData[0]?.domain_included ? 1 : 0,
      servicesData[0]?.domain_expiration || "",
      servicesData[0]?.expiration_date || "",
      servicesData[0]?.suspension_date || "",
      servicesData[0]?.category_name || "",
      servicesData[0]?.features || ""
    ]
  )

  for (const cred of credentialsData) {
    if (cred.email && cred.password) {
      await db.run(
        "INSERT INTO credentials (proposal_id, description, email, password, notes, dynamic_fields) VALUES (?, ?, ?, ?, ?, ?)",
        [id, cred.description || "", cred.email, cred.password, cred.notes || "", cred.dynamic_fields || ""]
      )
    }
  }

  for (const service of servicesData) {
    const sId = crypto.randomUUID()
    await db.run(
      `INSERT INTO proposal_services (
        id, proposal_id, category_name, service_name, plan_name, price,
        billing_type, billing_cycle, features, policies, status,
        start_date, expiration_date, suspension_date, domain_included, domain_expiration
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        sId,
        id,
        service.category_name,
        service.service_name,
        service.plan_name,
        service.price,
        service.billing_type || 'RECURRENT',
        service.billing_cycle || 'monthly',
        service.features,
        service.policies || "",
        service.status || 'ACTIVE',
        service.start_date || "",
        service.expiration_date || "",
        service.suspension_date || "",
        service.domain_included ? 1 : 0,
        service.domain_expiration || ""
      ]
    )
  }

  if (proposalData.payment_status === "PAGADO") {
    const paymentId = crypto.randomUUID()
    await db.run(
      `INSERT INTO proposal_payments (
        id, proposal_id, invoice_number, amount, payment_date, payment_method, description, status
      ) VALUES (?, ?, ?, ?, ?, ?, 'Pago Inicial de Contrato', 'PAGADO')`,
      [
        paymentId,
        id,
        proposalData.invoice_number || "FAC-INICIAL",
        proposalData.payment_amount || 0,
        proposalData.payment_date || "",
        proposalData.payment_method || "Otro"
      ]
    )
  }

  for (const col of collaboratorsData) {
    if (col.name) {
      const colId = crypto.randomUUID()
      await db.run(
        `INSERT INTO proposal_collaborators (id, proposal_id, name, role, logo_url, contact)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [colId, id, col.name, col.role || "", col.logo_url || "", col.contact || ""]
      )
    }
  }

  revalidatePath("/admin/propuestas")
  return id
}

export async function deleteProposal(id: string): Promise<void> {
  const db = await getDb()
  await db.run("DELETE FROM proposals WHERE id = ?", [id])
  revalidatePath("/admin/propuestas")
}

export async function saveSignature(id: string, signatureImage: string): Promise<void> {
  const db = await getDb()
  const signatureDate = new Date().toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  await db.run(
    "UPDATE proposals SET signature_image = ?, signature_date = ? WHERE id = ?",
    [signatureImage, signatureDate, id]
  )

  revalidatePath(`/propuestas-dinamicas/${id}`)
  revalidatePath("/admin/propuestas")
}

export interface CatalogPlan {
  id: string
  name: string
  price: number
  duration: string
  features: string
  policies?: string
}

export interface CatalogService {
  id: string
  name: string
  plans: CatalogPlan[]
}

export interface CatalogCategory {
  id: string
  name: string
  policies?: string
  services: CatalogService[]
}

export async function getCatalog(): Promise<CatalogCategory[]> {
  const db = await getDb()
  const categories = await db.all("SELECT * FROM categories")
  const services = await db.all("SELECT * FROM services")
  const plans = await db.all("SELECT * FROM service_plans")

  return categories.map((cat: any) => {
    const catServices = services
      .filter((ser: any) => ser.category_id === cat.id)
      .map((ser: any) => {
        const serPlans = plans
          .filter((plan: any) => plan.service_id === ser.id)
          .map((plan: any) => ({
            id: plan.id,
            name: plan.name,
            price: plan.price,
            duration: plan.duration,
            features: plan.features,
            policies: plan.policies || "",
          }))
        return {
          id: ser.id,
          name: ser.name,
          plans: serPlans,
        }
      })
    return {
      id: cat.id,
      name: cat.name,
      policies: cat.policies || "",
      services: catServices,
    }
  })
}

export async function createCategory(name: string, policies: string = ""): Promise<string> {
  const db = await getDb()
  const baseId = name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "")
  
  let id = baseId || crypto.randomUUID()
  
  // Check collision
  const existing = await db.get("SELECT id FROM categories WHERE id = ?", [id])
  if (existing) {
    id = `${id}-${crypto.randomBytes(2).toString("hex")}`
  }

  await db.run("INSERT INTO categories (id, name, policies) VALUES (?, ?, ?)", [id, name, policies])
  revalidatePath("/admin/propuestas")
  return id
}

export async function deleteCategory(id: string): Promise<void> {
  const db = await getDb()
  await db.run("DELETE FROM categories WHERE id = ?", [id])
  revalidatePath("/admin/propuestas")
}

export async function createService(categoryId: string, name: string): Promise<string> {
  const db = await getDb()
  const baseId = name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "")
  
  let id = baseId || crypto.randomUUID()
  
  const existing = await db.get("SELECT id FROM services WHERE id = ?", [id])
  if (existing) {
    id = `${id}-${crypto.randomBytes(2).toString("hex")}`
  }

  await db.run("INSERT INTO services (id, category_id, name) VALUES (?, ?, ?)", [id, categoryId, name])
  revalidatePath("/admin/propuestas")
  return id
}

export async function deleteService(id: string): Promise<void> {
  const db = await getDb()
  await db.run("DELETE FROM services WHERE id = ?", [id])
  revalidatePath("/admin/propuestas")
}

export async function createServicePlan(
  serviceId: string,
  name: string,
  price: number,
  duration: string,
  features: string,
  policies: string = ""
): Promise<string> {
  const db = await getDb()
  const baseId = name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "")
  
  let id = baseId || crypto.randomUUID()
  
  const existing = await db.get("SELECT id FROM service_plans WHERE id = ?", [id])
  if (existing) {
    id = `${id}-${crypto.randomBytes(2).toString("hex")}`
  }

  await db.run(
    "INSERT INTO service_plans (id, service_id, name, price, duration, features, policies) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [id, serviceId, name, price, duration, features, policies]
  )
  revalidatePath("/admin/propuestas")
  return id
}

export async function deleteServicePlan(id: string): Promise<void> {
  const db = await getDb()
  await db.run("DELETE FROM service_plans WHERE id = ?", [id])
  revalidatePath("/admin/propuestas")
}

export async function updateProposal(
  id: string,
  proposalData: Omit<Proposal, "id" | "signature_image" | "signature_date" | "created_at">,
  credentialsData: Credential[],
  servicesData: ProposalService[],
  collaboratorsData: ProposalCollaborator[]
): Promise<void> {
  const db = await getDb()
  
  await db.run(
    `UPDATE proposals SET 
      client_name = ?, 
      client_company = ?, 
      client_domain = ?, 
      invoice_number = ?, 
      payment_status = ?,
      payment_date = ?, 
      payment_method = ?, 
      payment_amount = ?,
      brand_color_primary = ?,
      brand_color_secondary = ?,
      brand_logo_url = ?,
      grace_days = ?,
      late_fee_percentage = ?,
      daily_penalty_fee = ?,
      service_name = ?, 
      plan_name = ?,
      start_date = ?, 
      duration = ?, 
      price = ?, 
      domain_included = ?,
      domain_expiration = ?, 
      service_expiration = ?, 
      suspension_date = ?,
      category_name = ?,
      features = ?
    WHERE id = ?`,
    [
      proposalData.client_name,
      proposalData.client_company,
      proposalData.client_domain || "",
      proposalData.invoice_number || "",
      proposalData.payment_status || "PENDIENTE",
      proposalData.payment_date || "",
      proposalData.payment_method || "",
      proposalData.payment_amount || 0,
      proposalData.brand_color_primary || "",
      proposalData.brand_color_secondary || "",
      proposalData.brand_logo_url || "",
      proposalData.grace_days || 0,
      proposalData.late_fee_percentage || 0,
      proposalData.daily_penalty_fee || 0,
      // Legacy columns
      servicesData[0]?.service_name || "",
      servicesData[0]?.plan_name || "",
      servicesData[0]?.start_date || "",
      servicesData[0]?.billing_cycle || "",
      servicesData[0]?.price || 0,
      servicesData[0]?.domain_included ? 1 : 0,
      servicesData[0]?.domain_expiration || "",
      servicesData[0]?.expiration_date || "",
      servicesData[0]?.suspension_date || "",
      servicesData[0]?.category_name || "",
      servicesData[0]?.features || "",
      id,
    ]
  )

  // Reemplazar credenciales
  await db.run("DELETE FROM credentials WHERE proposal_id = ?", [id])
  for (const cred of credentialsData) {
    if (cred.email && cred.password) {
      await db.run(
        "INSERT INTO credentials (proposal_id, description, email, password, notes, dynamic_fields) VALUES (?, ?, ?, ?, ?, ?)",
        [id, cred.description || "", cred.email, cred.password, cred.notes || "", cred.dynamic_fields || ""]
      )
    }
  }

  // Reemplazar servicios
  await db.run("DELETE FROM proposal_services WHERE proposal_id = ?", [id])
  for (const service of servicesData) {
    const sId = crypto.randomUUID()
    await db.run(
      `INSERT INTO proposal_services (
        id, proposal_id, category_name, service_name, plan_name, price,
        billing_type, billing_cycle, features, policies, status,
        start_date, expiration_date, suspension_date, domain_included, domain_expiration
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        sId,
        id,
        service.category_name,
        service.service_name,
        service.plan_name,
        service.price,
        service.billing_type || 'RECURRENT',
        service.billing_cycle || 'monthly',
        service.features,
        service.policies || "",
        service.status || 'ACTIVE',
        service.start_date || "",
        service.expiration_date || "",
        service.suspension_date || "",
        service.domain_included ? 1 : 0,
        service.domain_expiration || ""
      ]
    )
  }

  // Reemplazar colaboradores
  await db.run("DELETE FROM proposal_collaborators WHERE proposal_id = ?", [id])
  for (const col of collaboratorsData) {
    if (col.name) {
      const colId = crypto.randomUUID()
      await db.run(
        `INSERT INTO proposal_collaborators (id, proposal_id, name, role, logo_url, contact)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [colId, id, col.name, col.role || "", col.logo_url || "", col.contact || ""]
      )
    }
  }

  revalidatePath("/admin/propuestas")
  revalidatePath(`/propuestas-dinamicas/${id}`)
}

export async function getSettings(): Promise<Record<string, string>> {
  const db = await getDb()
  const rows = await db.all<{ key: string; value: string }[]>("SELECT * FROM settings")
  const settings: Record<string, string> = {}
  for (const row of rows) {
    settings[row.key] = row.value
  }
  return settings
}

export async function updateSettings(settings: Record<string, string>): Promise<void> {
  const db = await getDb()
  for (const [key, value] of Object.entries(settings)) {
    await db.run(
      "INSERT INTO settings (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value",
      [key, value]
    )
  }
  revalidatePath("/admin/propuestas")
}

export async function registerPayment(
  proposalId: string,
  paymentData: {
    amount: number
    payment_method: string
    payment_date: string
    invoice_number: string
    description: string
  }
): Promise<void> {
  const db = await getDb()
  const paymentId = crypto.randomUUID()

  await db.run(
    `INSERT INTO proposal_payments (id, proposal_id, invoice_number, amount, payment_date, payment_method, description, status)
     VALUES (?, ?, ?, ?, ?, ?, ?, 'PAGADO')`,
    [
      paymentId,
      proposalId,
      paymentData.invoice_number || `FAC-${Date.now()}`,
      paymentData.amount,
      paymentData.payment_date,
      paymentData.payment_method,
      paymentData.description || "Renovación de Servicio"
    ]
  )

  const services = await db.all<ProposalService[]>(
    "SELECT * FROM proposal_services WHERE proposal_id = ? AND billing_type = 'RECURRENT' AND status = 'ACTIVE'",
    [proposalId]
  )

  for (const s of services) {
    const cycle = s.billing_cycle || 'monthly'
    let currentExp = s.expiration_date ? new Date(s.expiration_date) : new Date()
    const paymentDateObj = new Date(paymentData.payment_date)
    if (isNaN(currentExp.getTime()) || currentExp < paymentDateObj) {
      currentExp = paymentDateObj
    }

    if (cycle === '15_days') {
      currentExp.setDate(currentExp.getDate() + 15)
    } else if (cycle === 'monthly') {
      currentExp.setMonth(currentExp.getMonth() + 1)
    } else if (cycle === 'quarterly') {
      currentExp.setMonth(currentExp.getMonth() + 3)
    } else if (cycle === 'semiannually') {
      currentExp.setMonth(currentExp.getMonth() + 6)
    } else if (cycle === 'annually') {
      currentExp.setFullYear(currentExp.getFullYear() + 1)
    }

    const newExpStr = currentExp.toISOString().split('T')[0]

    const proposal = await db.get<{ grace_days: number }>("SELECT grace_days FROM proposals WHERE id = ?", [proposalId])
    const graceDays = proposal?.grace_days || 0
    const currentSusp = new Date(currentExp)
    currentSusp.setDate(currentSusp.getDate() + graceDays)
    const newSuspStr = currentSusp.toISOString().split('T')[0]

    await db.run(
      `UPDATE proposal_services SET expiration_date = ?, suspension_date = ? WHERE id = ?`,
      [newExpStr, newSuspStr, s.id]
    )
  }

  await db.run(
    "UPDATE proposals SET payment_status = 'PAGADO', payment_date = ?, payment_method = ?, payment_amount = ? WHERE id = ?",
    [paymentData.payment_date, paymentData.payment_method, paymentData.amount, proposalId]
  )

  revalidatePath("/admin/propuestas")
  revalidatePath(`/propuestas-dinamicas/${proposalId}`)
}

export async function updateCategory(id: string, name: string, policies: string): Promise<void> {
  const db = await getDb()
  await db.run("UPDATE categories SET name = ?, policies = ? WHERE id = ?", [name, policies, id])
  revalidatePath("/admin/propuestas")
}

export async function updateService(id: string, categoryId: string, name: string): Promise<void> {
  const db = await getDb()
  await db.run("UPDATE services SET category_id = ?, name = ? WHERE id = ?", [categoryId, name, id])
  revalidatePath("/admin/propuestas")
}

export async function updateServicePlan(
  id: string,
  name: string,
  price: number,
  duration: string,
  features: string,
  policies: string
): Promise<void> {
  const db = await getDb()
  await db.run(
    "UPDATE service_plans SET name = ?, price = ?, duration = ?, features = ?, policies = ? WHERE id = ?",
    [name, price, duration, features, policies, id]
  )
  revalidatePath("/admin/propuestas")
}

export async function sendTestEmail(toEmail: string): Promise<void> {
  const db = await getDb()
  const settingsRows = await db.all<{ key: string; value: string }[]>("SELECT * FROM settings")
  const settings: Record<string, string> = {}
  for (const r of settingsRows) {
    settings[r.key] = r.value
  }

  const brandName = settings.brand_name || "Sin Límites"
  const colorPrim = settings.color_primary || "#ff6600"
  const logoUrl = settings.brand_logo || ""

  const smtpHost = settings.smtp_host || process.env.SMTP_HOST
  const smtpPort = parseInt(settings.smtp_port || process.env.SMTP_PORT || "587")
  const smtpUser = settings.smtp_user || process.env.SMTP_USER
  const smtpPass = settings.smtp_pass || process.env.SMTP_PASS

  if (!smtpHost || !smtpUser || !smtpPass) {
    throw new Error("SMTP no configurado. Por favor, completa la configuración SMTP en Ajustes de Marca.")
  }

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465,
    auth: {
      user: smtpUser,
      pass: smtpPass
    }
  })

  const emailHTML = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px; background-color: #ffffff; color: #334155;">
      <div style="text-align: center; margin-bottom: 20px;">
        ${logoUrl ? `<img src="${logoUrl}" alt="${brandName}" style="max-height: 48px; object-fit: contain; max-width: 100%;" />` : `<h2 style="color: ${colorPrim}; margin: 0;">${brandName}</h2>`}
      </div>
      <h2 style="color: #0f172a; border-bottom: 2px solid ${colorPrim}; padding-bottom: 10px; margin-top: 0; font-size: 20px; text-align: center;">Correo de Prueba Exitoso</h2>
      <p>Hola,</p>
      <p>¡Felicidades! Este es un correo de prueba enviado desde tu panel administrativo de <strong>${brandName}</strong>.</p>
      <p>Esto confirma que las credenciales de tu servidor de correo SMTP se han configurado correctamente y están listas para enviar recordatorios de cobro y notificaciones de morosidad automatizadas.</p>
      <hr style="border: 0; border-top: 1px solid #f1f5f9; margin: 30px 0;" />
      <p style="font-size: 11px; color: #94a3b8; text-align: center; margin: 0;">
        Enviado por la plataforma de ${brandName}.
      </p>
    </div>
  `

  await transporter.sendMail({
    from: `"${brandName}" <${smtpUser}>`,
    to: toEmail,
    subject: `Correo de prueba SMTP - ${brandName}`,
    html: emailHTML
  })
}

export async function sendProposalEmail(proposalId: string): Promise<void> {
  const db = await getDb()
  const proposal = await db.get<Proposal>("SELECT * FROM proposals WHERE id = ?", [proposalId])
  if (!proposal) {
    throw new Error("Contrato no encontrado")
  }

  const settingsRows = await db.all<{ key: string; value: string }[]>("SELECT * FROM settings")
  const settings: Record<string, string> = {}
  for (const r of settingsRows) {
    settings[r.key] = r.value
  }

  const brandName = settings.brand_name || "Sin Límites"
  const colorPrim = proposal.brand_color_primary || settings.color_primary || "#ff6600"
  const logoUrl = proposal.brand_logo_url || settings.brand_logo || ""

  const smtpHost = settings.smtp_host || process.env.SMTP_HOST
  const smtpPort = parseInt(settings.smtp_port || process.env.SMTP_PORT || "587")
  const smtpUser = settings.smtp_user || process.env.SMTP_USER
  const smtpPass = settings.smtp_pass || process.env.SMTP_PASS

  if (!smtpHost || !smtpUser || !smtpPass) {
    throw new Error("SMTP no configurado. Por favor, completa la configuración SMTP en Ajustes de Marca.")
  }

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465,
    auth: {
      user: smtpUser,
      pass: smtpPass
    }
  })

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
  const link = `${appUrl}/propuestas-dinamicas/${proposalId}`

  const emailHTML = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px; background-color: #ffffff; color: #334155;">
      <div style="text-align: center; margin-bottom: 20px;">
        ${logoUrl ? `<img src="${logoUrl}" alt="${brandName}" style="max-height: 48px; object-fit: contain; max-width: 100%;" />` : `<h2 style="color: ${colorPrim}; margin: 0;">${brandName}</h2>`}
      </div>
      <h2 style="color: #0f172a; border-bottom: 2px solid ${colorPrim}; padding-bottom: 10px; margin-top: 0; font-size: 20px;">Propuesta Comercial de Servicios</h2>
      <p>Estimado/a <strong>${proposal.client_name}</strong> de <strong>${proposal.client_company}</strong>,</p>
      <p>Es un placer saludarle. Le escribimos de <strong>${brandName}</strong> para enviarle el enlace a la propuesta digital de servicios acordada.</p>
      
      <p>Le invitamos a revisar los detalles de los servicios, planes, tarifas y los términos comerciales haciendo clic en el siguiente enlace. Desde allí mismo podrá **firmar el contrato en línea** de manera fácil y rápida.</p>
      
      <div style="text-align: center; margin: 25px 0;">
        <a href="${link}" 
           style="background-color: ${colorPrim}; color: white; padding: 12px 25px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
          Ver y Firmar Propuesta Comercial
        </a>
      </div>

      <p>Si tiene alguna pregunta o requiere cualquier ajuste, no dude en responder a este correo.</p>
      
      <hr style="border: 0; border-top: 1px solid #f1f5f9; margin: 30px 0;" />
      <p style="font-size: 11px; color: #94a3b8; text-align: center; margin: 0;">
        Enviado por la plataforma de ${brandName}.
      </p>
    </div>
  `

  await transporter.sendMail({
    from: `"${brandName}" <${smtpUser}>`,
    to: proposal.client_domain || smtpUser,
    subject: `Propuesta de Servicios Comerciales - ${proposal.client_company}`,
    html: emailHTML
  })
}


