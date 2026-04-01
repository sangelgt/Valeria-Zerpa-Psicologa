// ============================================================
// Edge Function: send-lead-magnet
// Proyecto: Valeria Zerpa — Psicología Clínica Integrativa
// Arquitecto: Backend Architect Agent
// ============================================================
//
// TRIGGER: Database Webhook en Supabase activado cuando
// se inserta una nueva fila en la tabla `leads_web`.
//
// FLUJO:
//   1. Recibe el payload del webhook (nuevo lead)
//   2. Identifica qué lead magnet solicitó
//   3. Carga la plantilla HTML correspondiente
//   4. Envía el correo via Resend API
//   5. Retorna 200 OK
// ============================================================

import { serve } from "https://deno.land/std@0.177.0/http/server.ts"

// ─── Tipos ───────────────────────────────────────────────────
interface LeadRecord {
  full_name: string
  email: string
  lead_magnet_downloaded: string
}

interface WebhookPayload {
  type: "INSERT" | "UPDATE" | "DELETE"
  record: LeadRecord
}

// ─── Configuración de recursos ───────────────────────────────
const LEAD_MAGNET_CONFIG: Record<string, {
  subject: string
  templateFile: string
  downloadUrl: string
}> = {
  "Guía de Éxito Escolar": {
    subject: "🌸 Tu Guía de Éxito Escolar ya está aquí — Valeria Zerpa",
    templateFile: "guia-exito-escolar.html",
    downloadUrl: "https://dfbujugcitimkkvbbsxh.supabase.co/storage/v1/object/public/resources/Guia-Exito-Escolar.pdf",
  },
  "Manual de Duelo Migratorio": {
    subject: "🌿 Tu Manual de Duelo Migratorio — Valeria Zerpa",
    templateFile: "manual-duelo-migratorio.html",
    downloadUrl: "https://dfbujugcitimkkvbbsxh.supabase.co/storage/v1/object/public/resources/Manual-Duelo-Migratorio.pdf",
  },
}

// ─── Fallback: lead magnet por defecto ───────────────────────
const DEFAULT_CONFIG = LEAD_MAGNET_CONFIG["Guía de Éxito Escolar"]

// ─── Servidor principal ──────────────────────────────────────
serve(async (req: Request) => {
  // Solo aceptamos POST del webhook de Supabase
  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 })
  }

  try {
    const payload: WebhookPayload = await req.json()

    // Solo procesamos inserciones nuevas
    if (payload.type !== "INSERT") {
      return new Response("OK — skipped (not INSERT)", { status: 200 })
    }

    const { full_name, email, lead_magnet_downloaded } = payload.record

    console.log(`📩 Procesando nuevo lead: ${email} | Magnet: ${lead_magnet_downloaded}`)

    // Validación mínima
    if (!email) {
      console.error("❌ Email vacío en el payload del lead")
      return new Response("Bad Request — email missing", { status: 400 })
    }

    // Seleccionar configuración según el lead magnet
    const config = LEAD_MAGNET_CONFIG[lead_magnet_downloaded] ?? DEFAULT_CONFIG
    const firstName = full_name?.split(" ")[0] ?? "amig@"

    // ── Cargar plantilla HTML desde el filesystem de la función ──
    const templatePath = new URL(`./emails/${config.templateFile}`, import.meta.url)
    let htmlBody = await Deno.readTextFile(templatePath)

    // Reemplazar variables dinámicas
    htmlBody = htmlBody
      .replace(/{{nombre}}/g, firstName)
      .replace(/{{enlace_descarga}}/g, config.downloadUrl)

    // ── Enviar correo con Resend ──────────────────────────────
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY")
    if (!RESEND_API_KEY) {
      console.error("❌ RESEND_API_KEY no encontrada en variables de entorno")
      throw new Error("RESEND_API_KEY no está configurada en las variables de entorno.")
    }

    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Valeria Zerpa <valeriaz.atencion@proton.me>",
        reply_to: "valeriaz.atencion@proton.me",
        to: [email],
        subject: config.subject,
        html: htmlBody,
      }),
    })


    if (!resendResponse.ok) {
      const errorBody = await resendResponse.text()
      console.error(`❌ Error de Resend [${resendResponse.status}]:`, errorBody)
      throw new Error(`Resend API error: ${errorBody}`)
    }

    const resendData = await resendResponse.json()
    console.log(`✅ Correo enviado a ${email} | ID: ${resendData.id} | Magnet: ${lead_magnet_downloaded}`)

    return new Response(
      JSON.stringify({ success: true, email_id: resendData.id }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    )

  } catch (error) {
    console.error("❌ Error en send-lead-magnet:", error)
    return new Response(
      JSON.stringify({ success: false, error: String(error) }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    )
  }
})
