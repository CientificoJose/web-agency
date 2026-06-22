"use server"

import { getDb } from "./db"
import { revalidatePath } from "next/cache"
import crypto from "crypto"

export interface Proposal {
  id: string
  client_name: string
  client_company: string
  client_domain: string
  service_name: string
  plan_name: string
  start_date: string
  duration: string
  price: number
  invoice_number: string
  payment_status: string
  payment_date: string
  payment_method: string
  payment_amount: number
  domain_included: number
  domain_expiration: string
  service_expiration: string
  suspension_date: string
  signature_image: string | null
  signature_date: string | null
  created_at: string
  category_name: string
  features: string
}

export interface Credential {
  id?: number
  description: string
  email: string
  password: string
}

export async function getProposals(): Promise<Proposal[]> {
  const db = await getDb()
  const rows = await db.all<Proposal[]>("SELECT * FROM proposals ORDER BY created_at DESC")
  return rows
}

export async function getProposalById(id: string): Promise<{ proposal: Proposal | null; credentials: Credential[] }> {
  const db = await getDb()
  const proposal = await db.get<Proposal>("SELECT * FROM proposals WHERE id = ?", [id])
  if (!proposal) {
    return { proposal: null, credentials: [] }
  }
  const credentials = await db.all<Credential[]>(
    "SELECT description, email, password FROM credentials WHERE proposal_id = ?",
    [id]
  )
  return { proposal, credentials }
}

export async function createProposal(
  proposalData: Omit<Proposal, "id" | "signature_image" | "signature_date" | "created_at">,
  credentialsData: Credential[]
): Promise<string> {
  const db = await getDb()
  const id = crypto.randomUUID()

  await db.run(
    `INSERT INTO proposals (
      id, client_name, client_company, client_domain, service_name, plan_name,
      start_date, duration, price, invoice_number, payment_status,
      payment_date, payment_method, payment_amount, domain_included,
      domain_expiration, service_expiration, suspension_date, category_name, features
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      id,
      proposalData.client_name,
      proposalData.client_company,
      proposalData.client_domain || "",
      proposalData.service_name,
      proposalData.plan_name || "",
      proposalData.start_date || "",
      proposalData.duration || "",
      proposalData.price || 0,
      proposalData.invoice_number || "",
      proposalData.payment_status || "PENDIENTE",
      proposalData.payment_date || "",
      proposalData.payment_method || "",
      proposalData.payment_amount || 0,
      proposalData.domain_included ? 1 : 0,
      proposalData.domain_expiration || "",
      proposalData.service_expiration || "",
      proposalData.suspension_date || "",
      proposalData.category_name || "",
      proposalData.features || "",
    ]
  )

  for (const cred of credentialsData) {
    if (cred.email && cred.password) {
      await db.run(
        "INSERT INTO credentials (proposal_id, description, email, password) VALUES (?, ?, ?, ?)",
        [id, cred.description || "", cred.email, cred.password]
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
}

export interface CatalogService {
  id: string
  name: string
  plans: CatalogPlan[]
}

export interface CatalogCategory {
  id: string
  name: string
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
      services: catServices,
    }
  })
}

export async function createCategory(name: string): Promise<string> {
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

  await db.run("INSERT INTO categories (id, name) VALUES (?, ?)", [id, name])
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
  features: string
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
    "INSERT INTO service_plans (id, service_id, name, price, duration, features) VALUES (?, ?, ?, ?, ?, ?)",
    [id, serviceId, name, price, duration, features]
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
  credentialsData: Credential[]
): Promise<void> {
  const db = await getDb()
  
  await db.run(
    `UPDATE proposals SET 
      client_name = ?, 
      client_company = ?, 
      client_domain = ?, 
      category_name = ?,
      service_name = ?, 
      plan_name = ?,
      start_date = ?, 
      duration = ?, 
      price = ?, 
      invoice_number = ?, 
      payment_status = ?,
      payment_date = ?, 
      payment_method = ?, 
      payment_amount = ?, 
      domain_included = ?,
      domain_expiration = ?, 
      service_expiration = ?, 
      suspension_date = ?,
      features = ?
    WHERE id = ?`,
    [
      proposalData.client_name,
      proposalData.client_company,
      proposalData.client_domain || "",
      proposalData.category_name || "",
      proposalData.service_name,
      proposalData.plan_name || "",
      proposalData.start_date || "",
      proposalData.duration || "",
      proposalData.price || 0,
      proposalData.invoice_number || "",
      proposalData.payment_status || "PENDIENTE",
      proposalData.payment_date || "",
      proposalData.payment_method || "",
      proposalData.payment_amount || 0,
      proposalData.domain_included ? 1 : 0,
      proposalData.domain_expiration || "",
      proposalData.service_expiration || "",
      proposalData.suspension_date || "",
      proposalData.features || "",
      id,
    ]
  )

  // Reemplazar credenciales
  await db.run("DELETE FROM credentials WHERE proposal_id = ?", [id])
  
  for (const cred of credentialsData) {
    if (cred.email && cred.password) {
      await db.run(
        "INSERT INTO credentials (proposal_id, description, email, password) VALUES (?, ?, ?, ?)",
        [id, cred.description || "", cred.email, cred.password]
      )
    }
  }

  revalidatePath("/admin/propuestas")
  revalidatePath(`/propuestas-dinamicas/${id}`)
}


