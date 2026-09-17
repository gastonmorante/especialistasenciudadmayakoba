# Guía de Integración Técnica CRM & Webhooks: GoHighLevel (GHL)
## Ecosistema Comercial "Especialista en Ciudad Mayakoba"

Esta guía detalla la arquitectura de integración técnica entre el **Interactive Quiz CRO** del frontend y el CRM **GoHighLevel (GHL)** para captura, perfilamiento automático, distribución de leads y seguimiento omnicanal inmediato.

---

## 1. Diccionario de Custom Fields en GoHighLevel

Para que la información cualitativa del Quiz se mapee sin pérdidas en el perfil del contacto en GHL, se deben configurar los siguientes **4 Custom Fields obligatorios** en `Settings > Custom Fields > Add Field`:

| Nombre del Campo en GHL | Object | Field Key / API Name | Tipo de Dato | Opciones Permitidas (Single Option / Text) |
| :--- | :--- | :--- | :--- | :--- |
| **Tipo de Interés Mayakoba** | Contact | `cm_tipo_interes` | Single Option / Text | `Departamento`, `Casa`, `Lote Residencial`, `Lote Campestre` |
| **Desarrollo Preferido** | Contact | `cm_desarrollo_preferido` | Single Option / Text | `Bosques`, `Jardines`, `Senderos & Senderos Poniente`, `Mayakoba Country Club`, `The Reserve` |
| **Rango de Presupuesto** | Contact | `cm_rango_presupuesto` | Single Option / Text | `$1.5M - $3M`, `$3M - $5M`, `$5M - $8M`, `$8M+ MXN` |
| **Plazo Estimado de Compra** | Contact | `cm_plazo_compra` | Single Option / Text | `Inmediato`, `1-3 meses`, `6+ meses` |

> [!TIP]
> Los campos estándar de GHL (`first_name`, `last_name`, `email`, `phone`, `tags`) se mapean directamente en los campos nativos de contacto para activar validaciones DND (Do Not Disturb) y telefonía Twilio/LeadConnector.

---

## 2. Especificación Técnica del Webhook (Inbound)

- **Método HTTP:** `POST`
- **Content-Type:** `application/json; charset=utf-8`
- **Endpoint GHL:** `https://services.leadconnectorhq.com/hooks/[LOCATION_ID]/catch/[WORKFLOW_WEBHOOK_ID]` (o webhook de automatización directa de GHL).
- **Timeout recomendado:** 5,000 ms.
- **Respuesta esperada:** `HTTP 200 OK` con `{ "status": "success", "contact_id": "..." }`.

### Payload POST Completo de Ejemplo
Ver archivo: [`ghl_webhook_payload.json`](ghl_webhook_payload.json)

```json
{
  "first_name": "Alejandro",
  "last_name": "García Villaseñor",
  "email": "alejandro.garcia@inversionespatrimoniales.mx",
  "phone": "+529841558899",
  "source": "Especialista Ciudad Mayakoba - Quiz CRO",
  "tags": [
    "lead-calificado",
    "interes-bosques",
    "presupuesto-5m-8m",
    "timeline-1-3-meses",
    "canal-web-directo"
  ],
  "customFields": {
    "cm_tipo_interes": "Casa",
    "cm_desarrollo_preferido": "Bosques",
    "cm_rango_presupuesto": "$5M - $8M",
    "cm_plazo_compra": "1-3 meses"
  },
  "metadata": {
    "desarrollo_id_match": "bosques-de-mayakoba",
    "desarrollo_nombre_match": "Bosques de Mayakoba",
    "razon_social_asociada": "La Ceiba DCM, S.A. de C.V. (CEIBA)",
    "precio_referencia": "$5.8 MDP - $6.5 MDP",
    "objetivo_inversion": "Vivir",
    "match_score": 96,
    "consentimiento_nom247": true,
    "timestamp_utc": "2026-09-17T15:20:00Z"
  }
}
```

---

## 3. Matriz de Automatización (GHL Workflows)

El flujo de trabajo dentro del Automation Builder de GoHighLevel se estructura bajo la siguiente secuencia operativa:

```
[Inbound Webhook Trigger]
          │
          ▼
[Acción 1: Create / Update Contact] ──► Mapea first_name, email, phone, customFields
          │
          ▼
[Acción 2: Add Contact Tags] ────────► lead-calificado, interes-[desarrollo], canal-web-directo
          │
          ▼
[Acción 3: Create Opportunity in Pipeline]
          ├── Pipeline: "Ventas Ciudad Mayakoba 2026"
          ├── Stage: "Nuevo Prospecto - Mayakoba"
          └── Lead Value: Mapeado según cm_rango_presupuesto ($1.7M, $4.3M, $6.1M o $15M MXN)
          │
          ▼
[Acción 4: Internal Notification to Advisor] (Instantáneo < 1 min)
          ├── Vía SMS / WhatsApp al móvil del Asesor
          └── In-App Push Notification en la App Móvil de GHL
          │
          ▼
[Acción 5: Conditional Branching (If / Else por Desarrollo Preferido)]
          ├── Ramal Bosques ──────► Envía WhatsApp & Email con Brochure de Bosques
          ├── Ramal Jardines ─────► Envía WhatsApp & Email con Brochure de Jardines
          ├── Ramal Senderos ─────► Envía WhatsApp & Email con Brochure de Senderos
          ├── Ramal Country Club ─► Envía WhatsApp & Email con Brochure de Country Club
          └── Ramal The Reserve ──► Envía WhatsApp & Email con Brochure de The Reserve
          │
          ▼
[Acción 6: Drip Sequence (Días 2, 4 y 7)]
          ├── Día 2: Certidumbre Jurídica NOM-247 y razones sociales (OPLK, NTCA, CEIBA, TRAM)
          ├── Día 4: Estudio de ROI, plusvalía histórica y rentas vacacionales
          └── Día 7: Invitación personal a VIP Discovery Tour en Playa del Carmen
```

---

## 4. Plantillas de Mensajería Automatizada

### A. Alerta Interna al Asesor (SMS / WhatsApp)
> **Destinatario:** Número celular del Asesor Comercial (+52 984...)  
> **Canal:** Twilio SMS o LeadConnector WhatsApp API  
> **Cuerpo del Mensaje:**  
> `🔥 NUEVO LEAD CALIFICADO - MAYAKOBA`  
> `👤 Nombre: {{contact.name}}`  
> `📱 Teléfono: {{contact.phone}}`  
> `✉️ Email: {{contact.email}}`  
> `🎯 Interés: {{contact.cm_tipo_interes}}`  
> `📍 Desarrollo Match: {{contact.cm_desarrollo_preferido}}`  
> `💰 Presupuesto: {{contact.cm_rango_presupuesto}}`  
> `⏱️ Plazo de compra: {{contact.cm_plazo_compra}}`  
> `⚡ Contactar en los próximos 15 minutos.`

---

### B. Mensaje Instantáneo de WhatsApp al Lead (Lead Delivery)
> **Destinatario:** `{{contact.phone}}`  
> **Disparador:** 60 segundos después de la captura  
> **Cuerpo del Mensaje:**  
> `Hola {{contact.first_name}}, un placer saludarte. Soy tu Especialista Independiente en Ciudad Mayakoba 🌴.`  
>  
> `Con base en tus respuestas en nuestro selector, tu match óptimo es *{{contact.cm_desarrollo_preferido}}* (Presupuesto proyectado: {{contact.cm_rango_presupuesto}}).`  
>  
> `📥 He preparado para ti el Dossier Oficial 2026 con planos, amenidades y lista de precios actualizada:`  
> `🔗 https://ciudadmayakoba.com/dossier/{{contact.cm_desarrollo_preferido | lowercase}}`  
>  
> `Cuentas con mi respaldo para revisar inventario directo de desarrollador con 0% de comisión y absoluta certidumbre legal conforme a la NOM-247. ¿A qué hora te quedaría bien una llamada breve de 5 minutos para resolver dudas puntuales?`

---

### C. Correo Electrónico Inmediato (Email 1 de Bienvenida)
> **Asunto:** `Tu Dossier Exclusivo de {{contact.cm_desarrollo_preferido}} en Ciudad Mayakoba 🌴`  
> **Pre-header:** `Precios oficiales, master plan y estudio de plusvalía 2026.`  
> **Contenido Clave:**  
> - Saludo personalizado: `Hola {{contact.first_name}}, gracias por utilizar nuestro Selector Inteligente.`  
> - Ficha comparativa del desarrollo recomendado (`{{contact.cm_desarrollo_preferido}}`).  
> - Enlace de descarga directa al PDF de planos y reglamento de construcción/condominio.  
> - Respaldo normativo: mención de la razón social operativa correspondiente (*OPLK, NTCA, CEIBA o TRAM*) y registro ante PROFECO.  
> - Botón directo a calendario de Google / Calendly para agendar sesión privada de 15 minutos.

---

## 5. Script de Prueba Local del Webhook

Para validar el flujo sin requerir una cuenta activa de GHL durante la fase de desarrollo, se incluye en el repositorio el script [`webhook_simulator.py`](webhook_simulator.py), el cual levanta un servidor HTTP local en `http://localhost:8080/api/ghl-webhook` y valida en consola:
1. Recepción íntegra del JSON.
2. Presencia de los 4 custom fields (`cm_tipo_interes`, `cm_desarrollo_preferido`, `cm_rango_presupuesto`, `cm_plazo_compra`).
3. Correcto formato telefónico E.164 y validación de correo.
4. Auto-asignación de tags simulada y cálculo de etapa en pipeline.
