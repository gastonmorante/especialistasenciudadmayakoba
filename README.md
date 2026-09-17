# Ecosistema Digital Comercial: Especialista en Ciudad Mayakoba

Arquitectura Full-Stack de Alta Conversión (CRO) y Sistema de Calificación de Leads Inmobiliarios para la Riviera Maya.

---

## Estructura del Ecosistema

```
mayakoba/
├── data/
│   ├── schema_inventario_mayakoba.json       # JSON Schema estricto (Draft 2020-12) con validación de enums y rangos
│   ├── inventario_mayakoba.json              # Inventario comercial normalizado con 5 entidades y metadatos
│   └── test_schema_validator.py              # Validador automatizado de integridad de datos y archivos
├── frontend/
│   ├── index.html                            # Landing page de alta conversión (Hero, Quiz 5 pasos, Showcase, NOM-247)
│   ├── app.js                                # Motor interactivo de selección en Vanilla JS y despacho a Webhook
│   └── styles.css                            # Sistema de estilos luxury, glassmorphism y micro-interacciones
├── integrations/
│   ├── ghl_webhook_payload.json              # Payload POST exacto configurado para GoHighLevel
│   ├── ghl_integration_guide.md              # Matriz de automatización de Workflows y diccionario de Custom Fields
│   └── webhook_simulator.py                  # Servidor local en Python para depuración de webhooks en vivo
└── README.md                                 # Documentación técnica general
```

---

## 1. Data Cleaning & Modelo de Datos

- **Entidades Normalizadas:**
  1. **Bosques de Mayakoba:** \$5.8 MDP - \$6.5 MDP MXN (`Vivienda`, Razón Social: `CEIBA` - *La Ceiba DCM, S.A. de C.V.*)
  2. **Jardines de Mayakoba:** \$1.6 MDP - \$1.8 MDP MXN (`Inversión`, Razón Social: `NTCA` - *Novaterra Caribe, S.A.P.I. de C.V.*)
  3. **Senderos & Senderos Poniente:** \$3.2 MDP - \$5.5 MDP MXN (`Lote`, Razón Social: `OPLK` - *Operadora Lakahn, S.A. de C.V.*)
  4. **Mayakoba Country Club:** \$4.5 MDP - \$12.0 MDP MXN (`Lote`, Razón Social: `OPLK` - *Operadora Lakahn, S.A. de C.V.*)
  5. **The Reserve at Mayakoba:** \$12.0 MDP - \$28.0 MDP MXN (`Vivienda`, Razón Social: `TRAM` - *Inmobilia Funds / Lote 4-5 Mayakoba*)

- **Validación:**
  Para ejecutar la validación automática de datos y verificar la existencia en disco de los 199 activos visuales y 13 documentos legales:
  ```bash
  python data/test_schema_validator.py
  ```

---

## 2. Frontend de Alta Conversión (CRO)

- **Hero Section:** Propuesta de valor clara como Asesor Independiente, métricas de prueba social (+4,000 unidades, 33% selva protegida, seguridad 24/7 con doble filtro biométrico, 0% comisión al comprador) y CTA flotante.
- **Selector Predictivo (Quiz 5 Pasos):**
  - Paso 1: Tipo de propiedad (Departamento, Casa, Lote Residencial, Lote Campestre).
  - Paso 2: Objetivo (Inversión patrimonial, Renta vacacional, Vivir).
  - Paso 3: Presupuesto (\$1.5M - \$3M, \$3M - \$5M, \$5M - \$8M, \$8M+ MXN).
  - Paso 4: Plazo de compra (Inmediato, 1-3 meses, 6+ meses).
  - Paso 5: Formulario con validación en tiempo real de WhatsApp (10 dígitos) y Email (RFC 5322).
  - Resultado Dinámico: Cálculo del desarrollo óptimo con visualización instantánea y enlace directo a WhatsApp con mensaje contextualizado.
- **Showcase:** Catálogo interactivo con tarjetas comparativas y rutas relativas a las imágenes descargadas en `Database web anterior/Imagenes_Descargadas/`.
- **Cumplimiento Legal NOM-247-SE-2021:**
  - Desglose de las 4 razones sociales operativas (`OPLK`, `NTCA`, `CEIBA`, `TRAM`).
  - Leyendas reglamentarias de PROFECO.
  - Enlaces directos a los PDFs de Avisos de Privacidad y Políticas en `Database web anterior/PDFs_Legales/`.

---

## 3. Integración GoHighLevel (GHL)

- **Custom Fields Requeridos:**
  - `cm_tipo_interes`
  - `cm_desarrollo_preferido`
  - `cm_rango_presupuesto`
  - `cm_plazo_compra`
- **Simulador Local de Pruebas:**
  Para levantar el receptor local de webhooks:
  ```bash
  python integrations/webhook_simulator.py
  ```
  Endpoint local: `http://localhost:8080/api/ghl-webhook`
