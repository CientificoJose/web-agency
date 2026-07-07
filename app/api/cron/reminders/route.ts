import { NextResponse } from "next/server"
import nodemailer from "nodemailer"
import { getDb } from "@/lib/db"

export async function GET(req: Request) {
  try {
    // Proteger opcionalmente con un token de autorización en la cabecera/query si se desea
    const { searchParams } = new URL(req.url)
    const token = searchParams.get("token")
    if (process.env.CRON_SECRET && token !== process.env.CRON_SECRET) {
      return new Response(
        JSON.stringify({ success: false, message: "No autorizado" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      )
    }

    const db = await getDb()

    // 1. Obtener configuraciones de SMTP y Marca de la base de datos
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
      return new Response(
        JSON.stringify({ success: false, message: "SMTP no configurado en ajustes del panel ni en variables .env" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      )
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

    // 2. Buscar servicios recurrentes activos en contratos
    const services = await db.all(`
      SELECT s.*, p.client_name, p.client_company, p.client_domain, p.invoice_number,
             p.grace_days, p.late_fee_percentage, p.daily_penalty_fee,
             p.brand_color_primary, p.brand_logo_url
      FROM proposal_services s
      JOIN proposals p ON s.proposal_id = p.id
      WHERE s.billing_type = 'RECURRENT' AND s.status = 'ACTIVE'
    `)

    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const processed = []

    for (const s of services) {
      if (!s.expiration_date) continue

      const expDate = new Date(s.expiration_date + "T00:00:00")
      if (isNaN(expDate.getTime())) continue

      const diffTime = expDate.getTime() - today.getTime()
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

      const customColor = s.brand_color_primary || colorPrim
      const customLogo = s.brand_logo_url || logoUrl

      // Caso A: Recordatorio 7 días antes
      if (diffDays === 7) {
        const emailHTML = `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px; background-color: #ffffff; color: #334155;">
            <div style="text-align: center; margin-bottom: 20px;">
              ${customLogo ? `<img src="${customLogo}" alt="${brandName}" style="height: 48px; object-fit: contain;" />` : `<h2 style="color: ${customColor}; margin: 0;">${brandName}</h2>`}
            </div>
            <h2 style="color: #0f172a; border-bottom: 2px solid ${customColor}; padding-bottom: 10px; margin-top: 0; font-size: 20px;">Recordatorio de Renovación de Servicio</h2>
            <p>Estimado/a <strong>${s.client_name}</strong>,</p>
            <p>Le escribimos de <strong>${brandName}</strong> para notificarle que su suscripción al servicio <strong>${s.service_name} (${s.plan_name})</strong> está próxima a vencer el <strong>${s.expiration_date}</strong> (dentro de 7 días).</p>
            
            <div style="background-color: #f8fafc; padding: 15px; border-radius: 6px; margin: 20px 0; border-left: 4px solid ${customColor};">
              <p style="margin: 0 0 8px 0; font-weight: bold; color: #1e293b;">Resumen del Servicio:</p>
              <ul style="margin: 0; padding-left: 20px; font-size: 13px; line-height: 1.6;">
                <li><strong>Servicio:</strong> ${s.service_name} (${s.plan_name})</li>
                <li><strong>Precio de renovación:</strong> $${s.price.toFixed(2)} USD</li>
                <li><strong>Fecha de vencimiento:</strong> ${s.expiration_date}</li>
              </ul>
            </div>
            
            <p>Para evitar interrupciones en su servicio o recargos por mora en la facturación, le solicitamos registrar su renovación ingresando a su portal de cliente haciendo clic en el siguiente enlace:</p>
            
            <div style="text-align: center; margin: 25px 0;">
              <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/propuestas-dinamicas/${s.proposal_id}" 
                 style="background-color: ${customColor}; color: white; padding: 12px 25px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
                Ver Mi Portal de Cliente
              </a>
            </div>
            
            <hr style="border: 0; border-top: 1px solid #f1f5f9; margin: 30px 0;" />
            <p style="font-size: 11px; color: #94a3b8; text-align: center; margin: 0;">
              Este correo es una notificación automática enviada por la plataforma de ${brandName}. Si ya realizó su pago correspondiente, por favor desestime esta alerta.
            </p>
          </div>
        `

        await transporter.sendMail({
          from: `"${brandName}" <${smtpUser}>`,
          to: s.client_domain || smtpUser,
          subject: `Recordatorio de renovación de servicio - ${s.service_name}`,
          html: emailHTML
        })

        processed.push({ serviceId: s.id, type: "reminder_7_days" })
      }

      // Caso B: Moroso (Superó la fecha de vencimiento + días de gracia)
      if (diffDays < 0) {
        const daysOverdue = Math.abs(diffDays)
        const gDays = s.grace_days || 0

        if (daysOverdue > gDays) {
          // Calcular mora no exponencial
          const baseLateFee = s.price * ((s.late_fee_percentage || 0) / 100)
          const daysPastGrace = daysOverdue - gDays
          const dailyLateFee = daysPastGrace * (s.daily_penalty_fee || 0)
          const totalLateFee = baseLateFee + dailyLateFee
          const totalOutstanding = s.price + totalLateFee

          const emailHTML = `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #fca5a5; border-radius: 8px; background-color: #fffafb; color: #334155;">
              <div style="text-align: center; margin-bottom: 20px;">
                ${customLogo ? `<img src="${customLogo}" alt="${brandName}" style="height: 48px; object-fit: contain;" />` : `<h2 style="color: #dc2626; margin: 0;">${brandName}</h2>`}
              </div>
              <h2 style="color: #dc2626; border-bottom: 2px solid #dc2626; padding-bottom: 10px; margin-top: 0; font-size: 20px;">Aviso de Retraso de Pago y Recargo por Mora</h2>
              <p>Estimado/a <strong>${s.client_name}</strong>,</p>
              <p>Le notificamos que el pago de renovación para su servicio <strong>${s.service_name} (${s.plan_name})</strong> venció el <strong>${s.expiration_date}</strong> (hace ${daysOverdue} días).</p>
              <p>Dado que se han superado los ${gDays} días de gracia preestablecidos en el contrato, se han devengado recargos por morosidad sobre el saldo adeudado:</p>
              
              <div style="background-color: #fef2f2; padding: 15px; border-radius: 6px; border: 1px solid #fee2e2; margin: 20px 0; color: #991b1b;">
                <p style="margin: 0 0 8px 0; font-weight: bold; font-size: 14px;">Detalle de Cuenta Pendiente:</p>
                <ul style="margin: 0; padding-left: 20px; font-size: 13px; line-height: 1.6;">
                  <li>Inversión de Renovación: $${s.price.toFixed(2)} USD</li>
                  <li>Recargo base por morosidad (${s.late_fee_percentage}%): $${baseLateFee.toFixed(2)} USD</li>
                  <li>Recargo diario acumulado (${daysPastGrace} días): $${dailyLateFee.toFixed(2)} USD ($${s.daily_penalty_fee}/día)</li>
                  <li style="font-size: 15px; margin-top: 8px; font-weight: bold; border-top: 1px dashed #fecaca; padding-top: 8px;">Monto Total a Pagar: $${totalOutstanding.toFixed(2)} USD</li>
                </ul>
              </div>
              
              <p>Le solicitamos liquidar el monto pendiente a la brevedad para evitar la suspensión definitiva de sus credenciales y accesos asociados.</p>
              
              <div style="text-align: center; margin: 25px 0;">
                <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/propuestas-dinamicas/${s.proposal_id}" 
                   style="background-color: #dc2626; color: white; padding: 12px 25px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
                  Pagar Ahora en Mi Portal
                </a>
              </div>
              
              <hr style="border: 0; border-top: 1px solid #fee2e2; margin: 30px 0;" />
              <p style="font-size: 11px; color: #b91c1c; text-align: center; margin: 0;">
                Aviso automático de cobranza del sistema de ${brandName}.
              </p>
            </div>
          `

          await transporter.sendMail({
            from: `"${brandName}" <${smtpUser}>`,
            to: s.client_domain || smtpUser,
            subject: `⚠️ AVISO DE MORA: Saldo vencido en servicio - ${s.service_name}`,
            html: emailHTML
          })

          // Actualizar estado general del contrato
          await db.run(
            "UPDATE proposals SET payment_status = 'MOROSO' WHERE id = ? AND payment_status != 'PAGADO'",
            [s.proposal_id]
          )

          processed.push({ serviceId: s.id, type: "late_fee_delinquent" })
        }
      }
    }

    return NextResponse.json({ success: true, processed })
  } catch (error: any) {
    console.error("Error in reminders API:", error)
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
