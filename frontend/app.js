/**
 * Especialista en Ciudad Mayakoba - Motor de Conversión CRO & Selector Interactivo
 * Desarrollado con Vanilla JS modular sin dependencias pesadas.
 */

// Dataset de los desarrollos normalizados y rutas relativas de activos
const MAYAKOBA_INVENTORY = [
  {
    id: "bosques-de-mayakoba",
    id_desarrollo: "bosques-01",
    nombre: "Bosques Ciudad Mayakoba",
    entidad: "Bosques",
    tipo_producto: "Vivienda",
    estatus_precio: "Vigente",
    precio_display: "$5.8 MDP - $6.5 MDP",
    precio_min: 5800000,
    precio_max: 6500000,
    rango_precio_mxn: { min: 5800000, max: 6500000 },
    tipologias: ["Ceiba", "Roble"],
    razon_social: "CEIBA",
    razon_social_nombre: "La Ceiba DCM, S.A. de C.V. (CEIBA)",
    apto_credito: true,
    superficie: "128 a 185 m²",
    headline: "Residencias familiares listas para habitar con alberca semiolímpica privada",
    descripcion: "Casas y condominios boutique en comunidad cerrada con acceso a parques y ciclovías.",
    hero_image: "../Database web anterior/Imagenes_Descargadas/bosques-10.webp",
    logo: "../Database web anterior/Imagenes_Descargadas/bosques.png",
    galeria: [
      "../Database web anterior/Imagenes_Descargadas/bosques-11.webp",
      "../Database web anterior/Imagenes_Descargadas/bosques-12.webp",
      "../Database web anterior/Imagenes_Descargadas/bosques-13.webp",
      "../Database web anterior/Imagenes_Descargadas/bosques-16.webp"
    ],
    amenidades: ["Alberca semiolímpica", "Gimnasio climatizado", "Salón social", "Seguridad 24/7"],
    tags: ["lujo", "departamentos", "renta-vacacional", "alberca-semiolimpica", "familia"]
  },
  {
    id: "jardines-de-mayakoba",
    id_desarrollo: "jardines-01",
    nombre: "Jardines Ciudad Mayakoba",
    entidad: "Jardines",
    tipo_producto: "Vivienda",
    estatus_precio: "Vigente",
    precio_display: "$1.6 MDP - $1.8 MDP",
    precio_min: 1600000,
    precio_max: 1800000,
    rango_precio_mxn: { min: 1600000, max: 1800000 },
    tipologias: ["Anturio", "Lantana"],
    razon_social: "OPLK",
    razon_social_nombre: "Operadora Lakahn / Novaterra Caribe (OPLK)",
    apto_credito: true,
    superficie: "52 a 78 m²",
    headline: "El ticket de entrada más accesible y rentable del ecosistema Mayakoba",
    descripcion: "Departamentos de alta demanda para renta a nómadas digitales y ejecutivos.",
    hero_image: "../Database web anterior/Imagenes_Descargadas/jardines1.webp",
    logo: "../Database web anterior/Imagenes_Descargadas/jardines.png",
    galeria: [
      "../Database web anterior/Imagenes_Descargadas/jardines-3.webp",
      "../Database web anterior/Imagenes_Descargadas/jardines-4.webp",
      "../Database web anterior/Imagenes_Descargadas/jardines-5.webp"
    ],
    amenidades: ["Alberca y palapa", "Canchas deportivas", "Parque infantil", "Control de acceso"],
    tags: ["familiar", "infonavit", "residencial", "primer-inversionista", "renta-largo-plazo"]
  },
  {
    id: "senderos-mayakoba",
    id_desarrollo: "senderos-01",
    nombre: "Senderos & Senderos Poniente",
    entidad: "Senderos & Senderos Poniente",
    tipo_producto: "Lote Residencial",
    estatus_precio: "Vigente",
    precio_display: "$3.2 MDP - $5.5 MDP",
    precio_min: 3200000,
    precio_max: 5500000,
    rango_precio_mxn: { min: 3200000, max: 5500000 },
    tipologias: ["Lote Tipo A 160m²", "Lote Tipo B 200m²", "Lote Selva 320m²"],
    razon_social: "OPLK",
    razon_social_nombre: "Operadora Lakahn, S.A. de C.V. (OPLK)",
    superficie: "160 a 320 m²",
    headline: "Lotes residenciales urbanizados inmersos en la selva maya con cenote natural",
    descripcion: "Construye tu residencia unifamiliar con arquitectura personalizada y ciclovías.",
    hero_image: "../Database web anterior/Imagenes_Descargadas/senderos1.webp",
    logo: "../Database web anterior/Imagenes_Descargadas/senderos.png",
    galeria: [
      "../Database web anterior/Imagenes_Descargadas/senderos-3.webp",
      "../Database web anterior/Imagenes_Descargadas/senderos-4.webp",
      "../Database web anterior/Imagenes_Descargadas/senderos-5.webp",
      "../Database web anterior/Imagenes_Descargadas/senderos-poniente.png"
    ],
    amenidades: ["Casa Club con alberca", "Cenote natural protegido", "5 km de ciclovías", "Canchas de pádel"],
    tags: ["lotes-residenciales", "urbanizado", "cenote-natural", "ciclovias", "patrimonio"]
  },
  {
    id: "mayakoba-country-club",
    id_desarrollo: "country-club-01",
    nombre: "Mayakoba Country Club",
    entidad: "Mayakoba Country Club",
    tipo_producto: "Lote Residencial",
    estatus_precio: "Vigente",
    precio_display: "$4.5 MDP - $12.0 MDP",
    precio_min: 4500000,
    precio_max: 12000000,
    rango_precio_mxn: { min: 4500000, max: 12000000 },
    tipologias: ["Lotes Golf 300-500m²", "Lotes Country 600-900m²", "Villas Boutique Golf"],
    razon_social: "OPLK",
    razon_social_nombre: "Operadora Lakahn, S.A. de C.V. (OPLK)",
    superficie: "300 a 900 m²",
    headline: "Lotes y villas frente a campo de golf y Club de Playa exclusivo",
    descripcion: "Desarrollo residencial de élite con membresía de golf de 9 hoyos y club sobre el mar Caribe.",
    hero_image: "../Database web anterior/Imagenes_Descargadas/country-club1.webp",
    logo: "../Database web anterior/Imagenes_Descargadas/country-club.png",
    galeria: [
      "../Database web anterior/Imagenes_Descargadas/country-club-3.webp",
      "../Database web anterior/Imagenes_Descargadas/country-club-5.webp",
      "../Database web anterior/Imagenes_Descargadas/country-club-6.webp",
      "../Database web anterior/Imagenes_Descargadas/club-playa-4.webp"
    ],
    amenidades: ["Campo de Golf 9 hoyos", "Club de Playa exclusivo", "Casa club de 4,000 m²", "Spa & Wellness"],
    tags: ["golf-country-club", "club-de-playa", "alta-gama", "inversion-patrimonial"]
  },
  {
    id: "the-reserve-at-mayakoba",
    id_desarrollo: "the-reserve-01",
    nombre: "The Reserve at Mayakoba",
    entidad: "The Reserve",
    tipo_producto: "Vivienda",
    estatus_precio: "Vigente",
    precio_display: "$12.0 MDP - $28.0 MDP",
    precio_min: 12000000,
    precio_max: 28000000,
    rango_precio_mxn: { min: 12000000, max: 28000000 },
    tipologias: ["Garden Residence 2 Rec", "Sky Condos 3 Rec", "Canal Villa 4 Rec"],
    razon_social: "TRAM",
    razon_social_nombre: "Inmobilia Funds / Lote 4-5 Mayakoba (TRAM)",
    superficie: "180 a 520 m²",
    headline: "La cúspide del ultra-lujo residencial frente a los canales de Mayakoba",
    descripcion: "Branded residences con arquitectura biofílica internacional y navegación privada en kayaks.",
    hero_image: "../Database web anterior/Imagenes_Descargadas/the-reserve1.webp",
    logo: "../Database web anterior/Imagenes_Descargadas/the-reserve.png",
    galeria: [
      "../Database web anterior/Imagenes_Descargadas/the-reserve-10.webp",
      "../Database web anterior/Imagenes_Descargadas/the-reserve-11.webp",
      "../Database web anterior/Imagenes_Descargadas/the-reserve-12.webp",
      "../Database web anterior/Imagenes_Descargadas/the-reserve-13.webp"
    ],
    amenidades: ["Canales navegables", "Albercas privadas", "Spa holístico", "Concierge 5 estrellas"],
    tags: ["ultra-luxury", "canales-navegables", "branded-residences", "inmobilia", "lifestyle"]
  }
];

// Estado global de la aplicación
const AppState = {
  currentStep: 1,
  totalSteps: 5,
  quizAnswers: {
    tipo_interes: "",
    objetivo_principal: "",
    rango_presupuesto: "",
    plazo_compra: "",
    nombre: "",
    email: "",
    whatsapp: "",
    consentimiento_nom247: true
  },
  matchedDevelopment: null,
  webhookEndpoint: "http://localhost:8080/api/ghl-webhook" // Configurable o emulado
};

document.addEventListener("DOMContentLoaded", () => {
  initQuiz();
  renderShowcase("Todos");
  initShowcaseFilters();
  initContactFloating();
});

/**
 * Inicialización de la lógica del Quiz interactivo
 */
function initQuiz() {
  const nextBtns = document.querySelectorAll(".btn-next-step");
  const prevBtns = document.querySelectorAll(".btn-prev-step");
  const quizForm = document.getElementById("quiz-capture-form");

  // Selección de opciones en pasos 1 a 4
  const optionCards = document.querySelectorAll(".quiz-option-card");
  optionCards.forEach(card => {
    card.addEventListener("click", () => {
      const step = parseInt(card.getAttribute("data-step"));
      const value = card.getAttribute("data-value");
      const field = card.getAttribute("data-field");

      // Deseleccionar hermanos
      const parentStepEl = document.getElementById(`quiz-step-${step}`);
      parentStepEl.querySelectorAll(".quiz-option-card").forEach(c => c.classList.remove("selected"));

      // Seleccionar actual
      card.classList.add("selected");
      AppState.quizAnswers[field] = value;

      // Habilitar botón de continuar
      const nextBtn = parentStepEl.querySelector(".btn-next-step");
      if (nextBtn) {
        nextBtn.removeAttribute("disabled");
        nextBtn.classList.remove("opacity-50", "cursor-not-allowed");
      }

      // Auto-avance suave tras 300ms para maximizar CRO
      setTimeout(() => {
        if (step < 4) {
          goToStep(step + 1);
        } else if (step === 4) {
          goToStep(5);
        }
      }, 300);
    });
  });

  // Botones de retroceso
  prevBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const targetStep = parseInt(btn.getAttribute("data-target-step"));
      goToStep(targetStep);
    });
  });

  // Envío final del formulario en el Paso 5
  if (quizForm) {
    quizForm.addEventListener("submit", handleFormSubmit);
  }
}

/**
 * Transición entre pasos con barra de progreso
 */
function goToStep(stepNumber) {
  if (stepNumber < 1 || stepNumber > AppState.totalSteps) return;

  // Ocultar paso actual
  document.querySelectorAll(".quiz-step-pane").forEach(pane => {
    pane.classList.add("hidden");
  });

  // Mostrar nuevo paso
  const nextPane = document.getElementById(`quiz-step-${stepNumber}`);
  if (nextPane) {
    nextPane.classList.remove("hidden");
    nextPane.classList.add("step-fade-in");
  }

  AppState.currentStep = stepNumber;

  // Actualizar barra de progreso e indicadores
  const progressPercent = (stepNumber / AppState.totalSteps) * 100;
  const progressBar = document.getElementById("quiz-progress-bar");
  const stepLabel = document.getElementById("quiz-step-label");

  if (progressBar) progressBar.style.width = `${progressPercent}%`;
  if (stepLabel) stepLabel.innerText = `Paso ${stepNumber} de ${AppState.totalSteps}`;

  // Scroll suave al contenedor del quiz si está fuera de pantalla
  const quizSection = document.getElementById("quiz-selector-section");
  if (quizSection && window.scrollY > quizSection.offsetTop + 200) {
    quizSection.scrollIntoView({ behavior: "smooth" });
  }
}

/**
 * Validación y Procesamiento de envío del Quiz
 */
async function handleFormSubmit(e) {
  e.preventDefault();

  const nameInput = document.getElementById("quiz-input-name");
  const emailInput = document.getElementById("quiz-input-email");
  const phoneInput = document.getElementById("quiz-input-phone");
  const consentCheckbox = document.getElementById("quiz-input-consent");
  const submitBtn = document.getElementById("btn-submit-quiz");
  const errorAlert = document.getElementById("quiz-error-message");

  const nameVal = nameInput.value.trim();
  const emailVal = emailInput.value.trim();
  const phoneVal = phoneInput.value.replace(/\D/g, ""); // Solo dígitos

  errorAlert.classList.add("hidden");
  errorAlert.innerText = "";

  // Validaciones estrictas
  if (nameVal.length < 3) {
    showError("Por favor ingresa tu nombre completo.");
    nameInput.focus();
    return;
  }

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(emailVal)) {
    showError("Por favor ingresa un correo electrónico válido (ej. inversion@dominio.com).");
    emailInput.focus();
    return;
  }

  if (phoneVal.length < 10) {
    showError("Por favor ingresa un número de WhatsApp válido de al menos 10 dígitos con lada.");
    phoneInput.focus();
    return;
  }

  if (!consentCheckbox.checked) {
    showError("Debes aceptar el Aviso de Privacidad y el consentimiento informado conforme a la NOM-247.");
    return;
  }

  // Guardar en el estado
  AppState.quizAnswers.nombre = nameVal;
  AppState.quizAnswers.email = emailVal;
  AppState.quizAnswers.whatsapp = `+52${phoneVal.slice(-10)}`;
  AppState.quizAnswers.consentimiento_nom247 = true;

  // Calcular el desarrollo ideal
  AppState.matchedDevelopment = calculateMatch(AppState.quizAnswers);

  // Generar Payload para GoHighLevel
  const ghlPayload = buildGhlPayload(AppState.quizAnswers, AppState.matchedDevelopment);

  // Estado de carga en el botón
  submitBtn.setAttribute("disabled", "true");
  submitBtn.innerHTML = `
    <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
    Calculando tu mejor opción y generando dossier...
  `;

  // Despacho del Webhook (con fallback seguro)
  try {
    await dispatchGhlWebhook(ghlPayload);
  } catch (err) {
    console.warn("Nota: Webhook local simulado o sin servidor activo. Continuando visualización del resultado:", err);
  }

  // Guardar en LocalStorage para persistencia CRO
  localStorage.setItem("mayakoba_lead_quiz", JSON.stringify(ghlPayload));

  // Mostrar Pantalla de Resultado
  renderQuizResult(AppState.matchedDevelopment, AppState.quizAnswers);
}

function showError(msg) {
  const errorAlert = document.getElementById("quiz-error-message");
  if (errorAlert) {
    errorAlert.innerText = msg;
    errorAlert.classList.remove("hidden");
  }
}

/**
 * Algoritmo predictivo de compatibilidad inmobiliaria
 */
function calculateMatch(answers) {
  const budget = answers.rango_presupuesto;
  const propertyType = answers.tipo_interes;
  const objective = answers.objetivo_principal;

  // 1. Si el presupuesto es el inicial ($1.5M - $3M) -> Jardines de Mayakoba
  if (budget === "$1.5M - $3M") {
    return MAYAKOBA_INVENTORY.find(d => d.id === "jardines-de-mayakoba");
  }

  // 2. Si el presupuesto es $3M - $5M o busca Lotes -> Senderos & Senderos Poniente
  if (budget === "$3M - $5M" || propertyType === "Lote Residencial" || propertyType === "Lote Campestre") {
    if (budget === "$5M - $8M" || budget === "$8M+ MXN") {
      return MAYAKOBA_INVENTORY.find(d => d.id === "mayakoba-country-club");
    }
    return MAYAKOBA_INVENTORY.find(d => d.id === "senderos-mayakoba");
  }

  // 3. Si el presupuesto es $5M - $8M y busca Casa / Vivir -> Bosques de Mayakoba
  if (budget === "$5M - $8M") {
    if (objective === "Vivir" && propertyType === "Casa") {
      return MAYAKOBA_INVENTORY.find(d => d.id === "bosques-de-mayakoba");
    }
    return MAYAKOBA_INVENTORY.find(d => d.id === "mayakoba-country-club");
  }

  // 4. Si el presupuesto es $8M+ MXN -> The Reserve at Mayakoba
  if (budget === "$8M+ MXN") {
    return MAYAKOBA_INVENTORY.find(d => d.id === "the-reserve-at-mayakoba");
  }

  // Fallback seguro de alta afinidad
  return MAYAKOBA_INVENTORY.find(d => d.id === "bosques-de-mayakoba");
}

/**
 * Construye el payload exacto para el Webhook de GoHighLevel
 */
function buildGhlPayload(answers, match) {
  const nameParts = answers.nombre.trim().split(" ");
  const firstName = nameParts[0] || answers.nombre;
  const lastName = nameParts.slice(1).join(" ") || "";

  // Normalizar tags automáticos
  const tags = [
    "lead-calificado",
    `interes-${match.entidad.toLowerCase().replace(/\s+/g, "-").replace(/&/g, "y")}`,
    `presupuesto-${answers.rango_presupuesto.toLowerCase().replace(/[\$\s\+]/g, "").replace(/\./g, "")}`,
    `timeline-${answers.plazo_compra.toLowerCase().replace(/\s+/g, "-")}`,
    "canal-web-directo"
  ];

  return {
    first_name: firstName,
    last_name: lastName,
    full_name: answers.nombre,
    email: answers.email,
    phone: answers.whatsapp,
    source: "Especialista Ciudad Mayakoba - Quiz CRO",
    tags: tags,
    customFields: {
      cm_tipo_interes: answers.tipo_interes,
      cm_desarrollo_preferido: match.entidad,
      cm_rango_presupuesto: answers.rango_presupuesto,
      cm_plazo_compra: answers.plazo_compra
    },
    metadata: {
      desarrollo_id_match: match.id,
      id_desarrollo: match.id_desarrollo,
      desarrollo_nombre_match: match.nombre,
      tipologias_sugeridas: match.tipologias,
      apto_credito: match.apto_credito,
      razon_social_asociada: match.razon_social,
      precio_referencia: match.precio_display,
      objetivo_inversion: answers.objetivo_principal,
      consentimiento_nom247: true,
      timestamp_utc: new Date().toISOString(),
      user_agent: navigator.userAgent
    }
  };
}

/**
 * Envia el webhook a GoHighLevel o receptor backend
 */
async function dispatchGhlWebhook(payload) {
  try {
    const response = await fetch(AppState.webhookEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(payload)
    });
    return await response.json();
  } catch (err) {
    console.info("Info: Servidor local de webhook no activo en puerto 8080. Datos registrados en sesión local para GHL:", payload);
    return { status: "simulated_success", data: payload };
  }
}

/**
 * Renderiza la pantalla final del resultado del Quiz
 */
function renderQuizResult(dev, answers) {
  const resultPane = document.getElementById("quiz-result-container");
  const quizCardContainer = document.getElementById("quiz-content-wrapper");

  if (!resultPane || !quizCardContainer) return;

  quizCardContainer.classList.add("hidden");
  resultPane.classList.remove("hidden");
  resultPane.classList.add("step-fade-in");

  // Rellenar datos
  document.getElementById("result-dev-name").innerText = dev.nombre;
  document.getElementById("result-dev-price").innerText = dev.precio_display;
  document.getElementById("result-dev-headline").innerText = dev.headline;
  document.getElementById("result-dev-desc").innerText = dev.descripcion;
  document.getElementById("result-dev-razon").innerText = dev.razon_social;
  document.getElementById("result-dev-hero").src = dev.hero_image;

  // Botón directo a WhatsApp con mensaje preconfigurado
  const whatsappBtn = document.getElementById("result-btn-whatsapp");
  if (whatsappBtn) {
    const msg = encodeURIComponent(
      `Hola Especialista en Ciudad Mayakoba, completé el test de compatibilidad. ` +
      `Mi nombre es ${answers.nombre}, me interesa ${dev.nombre} (Presupuesto: ${answers.rango_presupuesto}, Objetivo: ${answers.objetivo_principal}). ` +
      `¿Podrías enviarme la ficha técnica y disponibilidad actual?`
    );
    whatsappBtn.href = `https://wa.me/529841234567?text=${msg}`;
  }

  // Scroll suave al resultado
  resultPane.scrollIntoView({ behavior: "smooth" });
}

/**
 * Renderizado del Showcase de desarrollos con filtrado dinámico
 */
function renderShowcase(filterType) {
  const container = document.getElementById("showcase-grid-container");
  if (!container) return;

  container.innerHTML = "";

  const filtered = MAYAKOBA_INVENTORY.filter(item => {
    if (filterType === "Todos") return true;
    return item.tipo_producto === filterType;
  });

  filtered.forEach(dev => {
    const card = document.createElement("div");
    card.className = "bg-white rounded-2xl overflow-hidden shadow-lg border border-slate-100 flex flex-col hover:shadow-2xl transition-all duration-300 group";

    card.innerHTML = `
      <div class="relative h-64 overflow-hidden bg-slate-900">
        <img src="${dev.hero_image}" alt="${dev.nombre}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
        <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
        <div class="absolute top-4 left-4 flex gap-2 flex-wrap">
          <span class="px-3 py-1 bg-[#0d382d]/90 backdrop-blur-md text-white text-xs font-semibold rounded-full uppercase tracking-wider">
            ${dev.tipo_producto}
          </span>
          <span class="px-3 py-1 bg-emerald-500/90 backdrop-blur-md text-white text-xs font-semibold rounded-full">
            ${dev.estatus_precio}
          </span>
        </div>
        <div class="absolute bottom-4 left-4 right-4">
          <p class="text-xs text-amber-300 font-medium tracking-wide">Rango Oficial Normalizado</p>
          <p class="text-2xl font-bold text-white tracking-tight">${dev.precio_display} <span class="text-xs font-normal text-slate-300">MXN</span></p>
        </div>
      </div>

      <div class="p-6 flex-1 flex flex-col justify-between">
        <div>
          <div class="flex items-center justify-between mb-2">
            <h3 class="text-xl font-bold text-slate-900">${dev.nombre}</h3>
            <span class="text-xs px-2.5 py-1 bg-slate-100 text-slate-600 rounded-md font-mono">${dev.superficie}</span>
          </div>
          <div class="flex items-center gap-2 mb-2 flex-wrap">
            <span class="text-xs text-[#0d382d] font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">Razón Social: ${dev.razon_social}</span>
            <span class="text-xs font-semibold px-2 py-0.5 rounded ${dev.apto_credito ? 'bg-blue-50 text-blue-700 border border-blue-200' : 'bg-amber-50 text-amber-800 border border-amber-200'}">
              ${dev.apto_credito ? '✓ Apto Crédito' : 'Patrimonial / Contado'}
            </span>
          </div>
          <p class="text-slate-600 text-sm mb-3 leading-relaxed">${dev.headline}</p>

          <div class="mb-3 p-2.5 bg-slate-50 rounded-xl border border-slate-100">
            <p class="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Tipologías Disponibles:</p>
            <p class="text-xs font-semibold text-slate-800">${dev.tipologias ? dev.tipologias.join(' • ') : 'Personalizado'}</p>
          </div>

          <div class="border-t border-slate-100 pt-3 mb-4">
            <p class="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Amenidades Destacadas:</p>
            <ul class="grid grid-cols-2 gap-1.5 text-xs text-slate-700">
              ${dev.amenidades.map(a => `<li class="flex items-center"><span class="w-1.5 h-1.5 bg-[#c59b48] rounded-full mr-2"></span>${a}</li>`).join("")}
            </ul>
          </div>
        </div>

        <div class="pt-4 border-t border-slate-100 flex gap-2">
          <button onclick="selectDevelopmentForQuiz('${dev.entidad}')" class="flex-1 py-2.5 px-4 bg-[#0d382d] hover:bg-[#071f19] text-white text-sm font-semibold rounded-xl text-center transition-colors">
            Evaluar en Quiz
          </button>
          <a href="https://wa.me/529841234567?text=${encodeURIComponent(`Hola Especialista Mayakoba, deseo consultar disponibilidad y ficha técnica de ${dev.nombre}.`)}" target="_blank" class="p-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-xl border border-emerald-200 transition-colors flex items-center justify-center" title="Consultar por WhatsApp">
            <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86.174.086.275.072.376-.043.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.043.073.043.419-.101.824z"/></svg>
          </a>
        </div>
      </div>
    `;

    container.appendChild(card);
  });
}

/**
 * Filtros de categoría de Showcase
 */
function initShowcaseFilters() {
  const filterBtns = document.querySelectorAll(".showcase-filter-btn");
  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => {
        b.classList.remove("bg-[#0d382d]", "text-white");
        b.classList.add("bg-white", "text-slate-700");
      });
      btn.classList.remove("bg-white", "text-slate-700");
      btn.classList.add("bg-[#0d382d]", "text-white");

      const cat = btn.getAttribute("data-filter");
      renderShowcase(cat);
    });
  });
}

/**
 * Función para preseleccionar un desarrollo desde el showcase y llevar al usuario al Quiz
 */
window.selectDevelopmentForQuiz = function(entidadName) {
  const quizSection = document.getElementById("quiz-selector-section");
  if (quizSection) {
    quizSection.scrollIntoView({ behavior: "smooth" });
  }
};

/**
 * Control del botón flotante y radar de WhatsApp
 */
function initContactFloating() {
  const floatBtn = document.getElementById("floating-whatsapp-cta");
  if (!floatBtn) return;

  // Ocultar al inicio, mostrar tras hacer scroll > 300px
  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      floatBtn.classList.remove("opacity-0", "translate-y-10", "pointer-events-none");
      floatBtn.classList.add("opacity-100", "translate-y-0");
    } else {
      floatBtn.classList.add("opacity-0", "translate-y-10", "pointer-events-none");
      floatBtn.classList.remove("opacity-100", "translate-y-0");
    }
  });
}
