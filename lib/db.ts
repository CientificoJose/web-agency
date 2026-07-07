import sqlite3 from "sqlite3"
import { open, Database } from "sqlite"
import path from "path"
import crypto from "crypto"

let dbInstance: Database<sqlite3.Database, sqlite3.Statement> | null = null

export async function getDb() {
  if (dbInstance) {
    return dbInstance
  }

  const dbPath = path.join(process.cwd(), "database.db")

  dbInstance = await open({
    filename: dbPath,
    driver: sqlite3.Database,
  })

  // Habilitar soporte para llaves foráneas en SQLite
  await dbInstance.run("PRAGMA foreign_keys = ON")

  // Inicializar tabla de propuestas
  await dbInstance.exec(`
    CREATE TABLE IF NOT EXISTS proposals (
      id TEXT PRIMARY KEY,
      client_name TEXT NOT NULL,
      client_company TEXT NOT NULL,
      client_domain TEXT,
      service_name TEXT NOT NULL,
      plan_name TEXT,
      start_date TEXT,
      duration TEXT,
      price REAL,
      invoice_number TEXT,
      payment_status TEXT DEFAULT 'PENDIENTE',
      payment_date TEXT,
      payment_method TEXT,
      payment_amount REAL,
      domain_included INTEGER DEFAULT 0,
      domain_expiration TEXT,
      service_expiration TEXT,
      suspension_date TEXT,
      signature_image TEXT,
      signature_date TEXT,
      created_at TEXT DEFAULT (datetime('now', 'localtime'))
    )
  `)

  // Migración en caliente: Añadir columnas category_name, features, grace_days, late_fee_percentage, daily_penalty_fee, brand_color_primary, brand_color_secondary, brand_logo_url
  const columns = await dbInstance.all("PRAGMA table_info(proposals)")
  const hasCategoryName = columns.some((col: any) => col.name === "category_name")
  const hasFeatures = columns.some((col: any) => col.name === "features")
  const hasGraceDays = columns.some((col: any) => col.name === "grace_days")
  const hasLateFeePct = columns.some((col: any) => col.name === "late_fee_percentage")
  const hasDailyPenalty = columns.some((col: any) => col.name === "daily_penalty_fee")
  const hasBrandColorPrimary = columns.some((col: any) => col.name === "brand_color_primary")
  const hasBrandColorSecondary = columns.some((col: any) => col.name === "brand_color_secondary")
  const hasBrandLogoUrl = columns.some((col: any) => col.name === "brand_logo_url")

  if (!hasCategoryName) {
    await dbInstance.run("ALTER TABLE proposals ADD COLUMN category_name TEXT")
  }
  if (!hasFeatures) {
    await dbInstance.run("ALTER TABLE proposals ADD COLUMN features TEXT")
  }
  if (!hasGraceDays) {
    await dbInstance.run("ALTER TABLE proposals ADD COLUMN grace_days INTEGER DEFAULT 0")
  }
  if (!hasLateFeePct) {
    await dbInstance.run("ALTER TABLE proposals ADD COLUMN late_fee_percentage REAL DEFAULT 0.0")
  }
  if (!hasDailyPenalty) {
    await dbInstance.run("ALTER TABLE proposals ADD COLUMN daily_penalty_fee REAL DEFAULT 0.0")
  }
  if (!hasBrandColorPrimary) {
    await dbInstance.run("ALTER TABLE proposals ADD COLUMN brand_color_primary TEXT")
  }
  if (!hasBrandColorSecondary) {
    await dbInstance.run("ALTER TABLE proposals ADD COLUMN brand_color_secondary TEXT")
  }
  if (!hasBrandLogoUrl) {
    await dbInstance.run("ALTER TABLE proposals ADD COLUMN brand_logo_url TEXT")
  }

  // Crear tabla settings
  await dbInstance.exec(`
    CREATE TABLE IF NOT EXISTS settings (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL
    )
  `)

  // Poblar valores por defecto en settings
  const settingsCount = await dbInstance.get<{ total: number }>("SELECT COUNT(*) as total FROM settings")
  if (settingsCount && settingsCount.total === 0) {
    await dbInstance.run("INSERT INTO settings (key, value) VALUES ('brand_name', 'Sin Límites')")
    await dbInstance.run("INSERT INTO settings (key, value) VALUES ('brand_logo', '/recurso.png')")
    await dbInstance.run("INSERT INTO settings (key, value) VALUES ('color_primary', '#ff6600')")
    await dbInstance.run("INSERT INTO settings (key, value) VALUES ('color_secondary', '#0f172a')")
    await dbInstance.run("INSERT INTO settings (key, value) VALUES ('smtp_host', '')")
    await dbInstance.run("INSERT INTO settings (key, value) VALUES ('smtp_port', '587')")
    await dbInstance.run("INSERT INTO settings (key, value) VALUES ('smtp_user', '')")
    await dbInstance.run("INSERT INTO settings (key, value) VALUES ('smtp_pass', '')")
  }

  // Crear tabla proposal_services
  await dbInstance.exec(`
    CREATE TABLE IF NOT EXISTS proposal_services (
      id TEXT PRIMARY KEY,
      proposal_id TEXT NOT NULL,
      category_name TEXT,
      service_name TEXT NOT NULL,
      plan_name TEXT,
      price REAL NOT NULL,
      billing_type TEXT DEFAULT 'RECURRENT',
      billing_cycle TEXT DEFAULT 'monthly',
      features TEXT,
      policies TEXT,
      status TEXT DEFAULT 'ACTIVE',
      start_date TEXT,
      expiration_date TEXT,
      suspension_date TEXT,
      domain_included INTEGER DEFAULT 0,
      domain_expiration TEXT,
      FOREIGN KEY (proposal_id) REFERENCES proposals (id) ON DELETE CASCADE
    )
  `)

  // Crear tabla proposal_payments
  await dbInstance.exec(`
    CREATE TABLE IF NOT EXISTS proposal_payments (
      id TEXT PRIMARY KEY,
      proposal_id TEXT NOT NULL,
      invoice_number TEXT,
      amount REAL NOT NULL,
      payment_date TEXT,
      payment_method TEXT,
      description TEXT,
      status TEXT DEFAULT 'PAGADO',
      FOREIGN KEY (proposal_id) REFERENCES proposals (id) ON DELETE CASCADE
    )
  `)

  // Crear tabla proposal_collaborators
  await dbInstance.exec(`
    CREATE TABLE IF NOT EXISTS proposal_collaborators (
      id TEXT PRIMARY KEY,
      proposal_id TEXT NOT NULL,
      name TEXT NOT NULL,
      role TEXT,
      logo_url TEXT,
      contact TEXT,
      FOREIGN KEY (proposal_id) REFERENCES proposals (id) ON DELETE CASCADE
    )
  `)

  // Migración en caliente: Portar propuestas existentes a proposal_services y proposal_payments
  const existingServicesCount = await dbInstance.get<{ total: number }>("SELECT COUNT(*) as total FROM proposal_services")
  if (existingServicesCount && existingServicesCount.total === 0) {
    const oldProposals = await dbInstance.all("SELECT * FROM proposals")
    for (const prop of oldProposals) {
      const serviceId = crypto.randomUUID()
      await dbInstance.run(`
        INSERT INTO proposal_services (
          id, proposal_id, category_name, service_name, plan_name, price,
          billing_type, billing_cycle, features, status, start_date,
          expiration_date, suspension_date, domain_included, domain_expiration
        ) VALUES (?, ?, ?, ?, ?, ?, 'RECURRENT', 'annually', ?, 'ACTIVE', ?, ?, ?, ?, ?)
      `, [
        serviceId,
        prop.id,
        prop.category_name || "Alojamiento Web y Dominios",
        prop.service_name,
        prop.plan_name,
        prop.price || 0,
        prop.features || "",
        prop.start_date || "",
        prop.service_expiration || "",
        prop.suspension_date || "",
        prop.domain_included ? 1 : 0,
        prop.domain_expiration || ""
      ])

      if (prop.payment_status === "PAGADO") {
        const paymentId = crypto.randomUUID()
        await dbInstance.run(`
          INSERT INTO proposal_payments (
            id, proposal_id, invoice_number, amount, payment_date, payment_method, description, status
          ) VALUES (?, ?, ?, ?, ?, ?, 'Pago Inicial de Contrato', 'PAGADO')
        `, [
          paymentId,
          prop.id,
          prop.invoice_number || "FAC-INICIAL",
          prop.payment_amount || prop.price || 0,
          prop.payment_date || prop.start_date || "",
          prop.payment_method || "Otro"
        ])
      }
    }
  }

  // Inicializar tabla de credenciales
  await dbInstance.exec(`
    CREATE TABLE IF NOT EXISTS credentials (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      proposal_id TEXT NOT NULL,
      description TEXT,
      email TEXT NOT NULL,
      password TEXT NOT NULL,
      FOREIGN KEY (proposal_id) REFERENCES proposals (id) ON DELETE CASCADE
    )
  `)

  // Crear tabla de categorías
  await dbInstance.exec(`
    CREATE TABLE IF NOT EXISTS categories (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      policies TEXT DEFAULT ''
    )
  `)

  // Crear tabla de servicios
  await dbInstance.exec(`
    CREATE TABLE IF NOT EXISTS services (
      id TEXT PRIMARY KEY,
      category_id TEXT NOT NULL,
      name TEXT NOT NULL,
      FOREIGN KEY (category_id) REFERENCES categories (id) ON DELETE CASCADE
    )
  `)

  // Crear tabla de planes/suscripciones
  await dbInstance.exec(`
    CREATE TABLE IF NOT EXISTS service_plans (
      id TEXT PRIMARY KEY,
      service_id TEXT NOT NULL,
      name TEXT NOT NULL,
      price REAL NOT NULL,
      duration TEXT NOT NULL,
      features TEXT NOT NULL,
      policies TEXT,
      FOREIGN KEY (service_id) REFERENCES services (id) ON DELETE CASCADE
    )
  `)

  // Migración en caliente: Añadir columna policies a service_plans si no existe
  const servicePlansColumns = await dbInstance.all("PRAGMA table_info(service_plans)")
  const hasPoliciesInPlans = servicePlansColumns.some((col: any) => col.name === "policies")
  if (!hasPoliciesInPlans) {
    await dbInstance.run("ALTER TABLE service_plans ADD COLUMN policies TEXT")
  }

  // Migración en caliente: Añadir columna policies a categories si no existe
  const categoriesColumns = await dbInstance.all("PRAGMA table_info(categories)")
  const hasPoliciesInCategories = categoriesColumns.some((col: any) => col.name === "policies")
  if (!hasPoliciesInCategories) {
    await dbInstance.run("ALTER TABLE categories ADD COLUMN policies TEXT DEFAULT ''")
  }

  // Insertar datos semilla (Seeds) si las categorías están vacías
  const categoriesCount = await dbInstance.get<{ total: number }>("SELECT COUNT(*) as total FROM categories")
  if (categoriesCount && categoriesCount.total === 0) {
    // 1. Insertar Categorías
    await dbInstance.run("INSERT INTO categories (id, name) VALUES ('hosting', 'Alojamiento Web y Dominios')")
    await dbInstance.run("INSERT INTO categories (id, name) VALUES ('development', 'Desarrollo de Software')")
    await dbInstance.run("INSERT INTO categories (id, name) VALUES ('marketing', 'Marketing y Redes Sociales')")

    // 2. Insertar Servicios
    // Hosting
    await dbInstance.run("INSERT INTO services (id, category_id, name) VALUES ('email_hosting', 'hosting', 'Correo Corporativo')")
    await dbInstance.run("INSERT INTO services (id, category_id, name) VALUES ('vps_hosting', 'hosting', 'Servidores VPS')")
    // Desarrollo
    await dbInstance.run("INSERT INTO services (id, category_id, name) VALUES ('landing_page', 'development', 'Landing Page')")
    await dbInstance.run("INSERT INTO services (id, category_id, name) VALUES ('ecommerce', 'development', 'Tienda Online E-commerce')")
    // Marketing
    await dbInstance.run("INSERT INTO services (id, category_id, name) VALUES ('social_media', 'marketing', 'Gestión de Redes Sociales')")

    // 3. Insertar Planes de Servicios
    // Correo Corporativo
    await dbInstance.run(`
      INSERT INTO service_plans (id, service_id, name, price, duration, features) VALUES (
        'email_basico', 'email_hosting', 'Plan Básico', 9.99, '1 año',
        'Hasta 3 cuentas de correo corporativo\n1 GB de almacenamiento total\nConfiguración completa del servidor\nConfiguración DNS (SPF, DKIM, DMARC)\nWebmail incluido (acceso navegador)\nSoporte técnico por email\nProtección anti-spam activa'
      )
    `)
    await dbInstance.run(`
      INSERT INTO service_plans (id, service_id, name, price, duration, features) VALUES (
        'email_pyme', 'email_hosting', 'Plan Pyme', 19.99, '1 año',
        'Hasta 10 cuentas de correo corporativo\n5 GB de almacenamiento total\nConfiguración + migración de correos antiguos\nSoporte prioritario por WhatsApp\nWebmail + IMAP/SMTP habilitados\nConfiguración DNS avanzada\nProtección anti-spam y antimalware'
      )
    `)
    await dbInstance.run(`
      INSERT INTO service_plans (id, service_id, name, price, duration, features) VALUES (
        'email_corp', 'email_hosting', 'Plan Corporativo', 49.99, '1 año',
        'Hasta 25 cuentas de correo corporativo\n10 GB de almacenamiento total\nMigración completa + capacitación de personal\nSoporte 24/7 (WhatsApp + Email)\nWebmail + IMAP/SMTP + API de integración\nConfiguración de seguridad DNS Premium\nProtección anti-spam empresarial'
      )
    `)

    // VPS Hosting
    await dbInstance.run(`
      INSERT INTO service_plans (id, service_id, name, price, duration, features) VALUES (
        'vps_emprendedor', 'vps_hosting', 'VPS Emprendedor', 29.99, '1 mes',
        '2 vCPU virtuales\n4 GB de Memoria RAM\n80 GB de almacenamiento SSD NVMe\n2 TB de transferencia mensual\n1 Dirección IP dedicada\nSoporte operativo Linux (Ubuntu/Debian)\nRespaldo semanal automático'
      )
    `)
    await dbInstance.run(`
      INSERT INTO service_plans (id, service_id, name, price, duration, features) VALUES (
        'vps_negocios', 'vps_hosting', 'VPS Negocios', 59.99, '1 mes',
        '4 vCPU virtuales\n8 GB de Memoria RAM\n160 GB de almacenamiento SSD NVMe\n4 TB de transferencia mensual\n1 Dirección IP dedicada\nSoporte operativo prioritario\nRespaldo diario automático'
      )
    `)

    // Landing Page
    await dbInstance.run(`
      INSERT INTO service_plans (id, service_id, name, price, duration, features) VALUES (
        'landing_basica', 'landing_page', 'Diseño Básico', 150.00, 'Un único pago',
        'Diseño de 1 sección interactiva (One-Page)\nEstructura responsiva (móvil y tablet)\nFormulario de contacto básico\nEnlace directo a WhatsApp\nCarga ultra rápida optimizada\nHosting y dominio por 1 año'
      )
    `)
    await dbInstance.run(`
      INSERT INTO service_plans (id, service_id, name, price, duration, features) VALUES (
        'landing_pro', 'landing_page', 'Diseño Pro', 300.00, 'Un único pago',
        'Diseño de hasta 4 secciones interactivas\nEstructura responsiva y animaciones sutiles\nFormulario integrado con base de datos\nGoogle Maps y enlaces a redes sociales\nOptimización SEO básica en Google\n1 Mes de soporte técnico post-entrega'
      )
    `)

    // E-commerce
    await dbInstance.run(`
      INSERT INTO service_plans (id, service_id, name, price, duration, features) VALUES (
        'ecom_inicial', 'ecommerce', 'E-commerce Inicial', 499.99, 'Un único pago',
        'Catálogo autogestionable de hasta 50 productos\nPasarelas de pago integradas (Paypal, Stripe o Binance)\nCarrito de compras e historial de pedidos\nPanel de administración para gestión de stock\nConfiguración de envíos y notificaciones por email\nCapacitación de uso (1 hora)'
      )
    `)

    // Gestión de Redes Sociales
    await dbInstance.run(`
      INSERT INTO service_plans (id, service_id, name, price, duration, features) VALUES (
        'rrss_bronce', 'social_media', 'Plan Bronce', 99.99, '1 mes',
        '8 Publicaciones mensuales (diseño gráfico)\nRedacción de copys profesionales y hashtags\nPlanificación y calendario de contenidos\nPublicación automática en Instagram y Facebook\nInforme mensual de métricas y crecimiento'
      )
    `)
    await dbInstance.run(`
      INSERT INTO service_plans (id, service_id, name, price, duration, features) VALUES (
        'rrss_oro', 'social_media', 'Plan Oro', 199.99, '1 mes',
        '16 Publicaciones mensuales (incluye 4 Reels/Videos)\nDiseño gráfico profesional + Edición de video\nRedacción creativa y hashtags estratégicos\nGestión de comentarios y mensajes directos (L-V)\nInforme mensual analítico de rendimiento'
      )
    `)
  }

  return dbInstance
}
