/**
 * Especialista en Ciudad Mayakoba - Motor CRO, Selector Interactivo y Lightbox
 * Arquitectura modular en Vanilla JS sin dependencias externas.
 */

// Inventario comercial normalizado con 6 desarrollos, activos visuales y metadatos legales
const MAYAKOBA_CATALOG = [
  {
    id: "bosques",
    id_desarrollo: "bosques-01",
    nombre: "Bosques Ciudad Mayakoba",
    tipo_producto: "Vivienda",
    categoria: "vivienda",
    estatus_precio: "Vigente",
    precio_display: "$5.8 MDP - $6.5 MDP MXN",
    precio_min: 5800000,
    precio_max: 6500000,
    tipologias: "Ceiba (128 m²) • Roble (185 m²)",
    razon_social: "CEIBA",
    razon_social_full: "La Ceiba DCM, S.A. de C.V. (CEIBA)",
    apto_credito: true,
    imagen_principal: "Imagenes_Descargadas/bosques-10.webp",
    logo: "Imagenes_Descargadas/bosques.png",
    galeria: [
      "Imagenes_Descargadas/bosques-10.webp",
      "Imagenes_Descargadas/bosques-16.webp",
      "Imagenes_Descargadas/bosques-19.webp",
      "Imagenes_Descargadas/bosques-22.webp"
    ],
    amenidades_destacadas: [
      { nombre: "Alberca Semiolímpica", icono: "Imagenes_Descargadas/icon-semiolimpica.svg" },
      { nombre: "3 Canchas de Pádel", icono: "Imagenes_Descargadas/icon-padel.svg" },
      { nombre: "2 Canchas de Tenis", icono: "Imagenes_Descargadas/icon-tenis.svg" },
      { nombre: "2 Gimnasios Climatizados", icono: "Imagenes_Descargadas/icon-gym.svg" },
      { nombre: "Kids Club & Juegos", icono: "Imagenes_Descargadas/icon-kids.svg" },
      { nombre: "Rooftop con Jacuzzi", icono: "Imagenes_Descargadas/icon-rooftop.svg" }
    ],
    descripcion: "Departamentos residenciales de 3 recámaras inmersos en más de 36,000 m² de reserva natural protegida. Entrega inmediata y preventa."
  },
  {
    id: "jardines",
    id_desarrollo: "jardines-01",
    nombre: "Jardines Ciudad Mayakoba",
    tipo_producto: "Vivienda",
    categoria: "vivienda",
    estatus_precio: "Vigente",
    precio_display: "$1.6 MDP - $1.8 MDP MXN",
    precio_min: 1600000,
    precio_max: 1800000,
    apartado: "Aparta desde $6,000 MXN",
    tipologias: "Anturio (52 m²) • Lantana (78 m²)",
    razon_social: "NTCA / OPLK",
    razon_social_full: "Novaterra Caribe, S.A.P.I. de C.V. (NTCA) / Operadora Lakahn (OPLK)",
    apto_credito: true,
    imagen_principal: "Imagenes_Descargadas/jardines1.webp",
    logo: "Imagenes_Descargadas/jardines.png",
    galeria: [
      "Imagenes_Descargadas/jardines1.webp",
      "Imagenes_Descargadas/jardines-3.webp",
      "Imagenes_Descargadas/jardines-4.webp",
      "Imagenes_Descargadas/jardines-5.webp"
    ],
    amenidades_destacadas: [
      { nombre: "Alberca & Chapoteadero", icono: "Imagenes_Descargadas/icon-alberca.svg" },
      { nombre: "Pista de Jogging", icono: "Imagenes_Descargadas/icon-pista.svg" },
      { nombre: "Área de Asadores", icono: "Imagenes_Descargadas/icon-picnic.svg" },
      { nombre: "Pet Park Cercado", icono: "Imagenes_Descargadas/icon-pet.svg" },
      { nombre: "Juegos Infantiles", icono: "Imagenes_Descargadas/icon-kids.svg" }
    ],
    descripcion: "El valor de entrada más accesible del ecosistema con la más alta rentabilidad por arrendamiento a nómadas y ejecutivos en Playa del Carmen."
  },
  {
    id: "senderos",
    id_desarrollo: "senderos-01",
    nombre: "Senderos & Senderos Poniente",
    tipo_producto: "Lote Residencial",
    categoria: "lotes",
    estatus_precio: "Vigente",
    precio_display: "$3.2 MDP - $5.5 MDP MXN",
    precio_min: 3200000,
    precio_max: 5500000,
    tipologias: "Lote 160 m² • Lote 200 m² • Lote Selva 320 m²",
    razon_social: "OPLK",
    razon_social_full: "Operadora Lakahn, S.A. de C.V. (OPLK)",
    apto_credito: true,
    imagen_principal: "Imagenes_Descargadas/senderos1.webp",
    logo: "Imagenes_Descargadas/senderos.png",
    galeria: [
      "Imagenes_Descargadas/senderos1.webp",
      "Imagenes_Descargadas/senderos-3.webp",
      "Imagenes_Descargadas/senderos-4.webp",
      "Imagenes_Descargadas/senderos-5.webp"
    ],
    amenidades_destacadas: [
      { nombre: "Cenote Natural Protegido", icono: "Imagenes_Descargadas/icon-lagunas.svg" },
      { nombre: "Casa Club con Alberca", icono: "Imagenes_Descargadas/icon-club.svg" },
      { nombre: "Ciclovías Integradas (5 km)", icono: "Imagenes_Descargadas/icon-pista.svg" },
      { nombre: "Canchas de Pádel", icono: "Imagenes_Descargadas/icon-padel.svg" },
      { nombre: "Parque Lineal Nativo", icono: "Imagenes_Descargadas/icon-park.svg" }
    ],
    descripcion: "Lotes residenciales listos para construir la casa de tus sueños, rodeados de vegetación virgen, cenotes y ciclopistas."
  },
  {
    id: "country_club",
    id_desarrollo: "country-club-01",
    nombre: "Mayakoba Country Club",
    tipo_producto: "Lote Residencial & Villas",
    categoria: "lotes",
    estatus_precio: "Vigente",
    precio_display: "$4.5 MDP - $12.0 MDP MXN",
    precio_min: 4500000,
    precio_max: 12000000,
    tipologias: "Lotes Golf 300-500 m² • Lotes Country 600-900 m² • Villas Golf",
    razon_social: "OPLK",
    razon_social_full: "Operadora Lakahn, S.A. de C.V. (OPLK)",
    apto_credito: true,
    imagen_principal: "Imagenes_Descargadas/country-club1.webp",
    logo: "Imagenes_Descargadas/country-club.png",
    galeria: [
      "Imagenes_Descargadas/country-club1.webp",
      "Imagenes_Descargadas/country-club-3.webp",
      "Imagenes_Descargadas/country-club-5.webp",
      "Imagenes_Descargadas/country-club-9.webp"
    ],
    amenidades_destacadas: [
      { nombre: "Campo de Golf 18 Hoyos", icono: "Imagenes_Descargadas/icon-tee.svg" },
      { nombre: "Casa Club 4,000 m²", icono: "Imagenes_Descargadas/icon-club.svg" },
      { nombre: "Club de Playa Privado", icono: "Imagenes_Descargadas/icon-beach.svg" },
      { nombre: "Tenis & Pádel Pro", icono: "Imagenes_Descargadas/icon-tenis.svg" },
      { nombre: "Spa & Área de Vapor", icono: "Imagenes_Descargadas/icon-vapor.svg" }
    ],
    descripcion: "El enclave residencial más exclusivo de la Riviera Maya con campo de golf Nick Price, casa club deportiva y membresía a Club de Playa."
  },
  {
    id: "the_reserve",
    id_desarrollo: "the-reserve-01",
    nombre: "The Reserve at Mayakoba",
    tipo_producto: "Ultra-Lujo Branded",
    categoria: "lujo",
    estatus_precio: "Vigente",
    precio_display: "$12.0 MDP - $28.0 MDP MXN",
    precio_min: 12000000,
    precio_max: 28000000,
    tipologias: "Garden Residence (2 Rec) • Sky Condos (3 Rec) • Canal Villa (4 Rec)",
    razon_social: "TRAM",
    razon_social_full: "The Reserve Mayakoba / Inmobilia Funds / Lote 4-5 Mayakoba (TRAM)",
    apto_credito: false,
    imagen_principal: "Imagenes_Descargadas/the-reserve1.webp",
    logo: "Imagenes_Descargadas/the-reserve.png",
    galeria: [
      "Imagenes_Descargadas/the-reserve1.webp",
      "Imagenes_Descargadas/the-reserve-12.webp",
      "Imagenes_Descargadas/the-reserve-13.webp",
      "Imagenes_Descargadas/the-reserve-15.webp"
    ],
    amenidades_destacadas: [
      { nombre: "Canales Navegables en Kayak", icono: "Imagenes_Descargadas/icon-kayak.svg" },
      { nombre: "Concierge & Valet 24/7", icono: "Imagenes_Descargadas/icon-business.svg" },
      { nombre: "Albercas Privadas en Canal", icono: "Imagenes_Descargadas/icon-alberca.svg" },
      { nombre: "Acceso Privilegiado Hoteles", icono: "Imagenes_Descargadas/icon-restaurant.svg" },
      { nombre: "Diseño Biofílico Sordo Madaleno", icono: "Imagenes_Descargadas/icon-lounge.svg" }
    ],
    descripcion: "Branded residences de arquitectura internacional en canales navegables, con total privacidad y privilegios en el resort Mayakoba."
  },
  {
    id: "lagunas",
    id_desarrollo: "lagunas-01",
    nombre: "Lagunas de Mayakoba",
    tipo_producto: "Condominios & Lagunas",
    categoria: "vivienda",
    estatus_precio: "Vigente",
    precio_display: "$3.8 MDP - $5.2 MDP MXN",
    precio_min: 3800000,
    precio_max: 5200000,
    tipologias: "Condominios 2 y 3 Recámaras con terrazas",
    razon_social: "OPLK",
    razon_social_full: "Operadora Lakahn, S.A. de C.V. (OPLK)",
    apto_credito: true,
    imagen_principal: "Imagenes_Descargadas/lagunas1.webp",
    logo: "Imagenes_Descargadas/lagunas.png",
    galeria: [
      "Imagenes_Descargadas/lagunas1.webp",
      "Imagenes_Descargadas/lagunas-3.webp",
      "Imagenes_Descargadas/lagunas-4.webp",
      "Imagenes_Descargadas/lagunas-5.webp"
    ],
    amenidades_destacadas: [
      { nombre: "Lagunas Navegables", icono: "Imagenes_Descargadas/icon-lagunas.svg" },
      { nombre: "Club de Playa & Albercas", icono: "Imagenes_Descargadas/icon-beach.svg" },
      { nombre: "Fitness Center Climatizado", icono: "Imagenes_Descargadas/icon-gym.svg" },
      { nombre: "Rooftop con Asadores", icono: "Imagenes_Descargadas/icon-rooftop.svg" }
    ],
    descripcion: "Vida de resort rodeada de lagunas de agua dulce cristalina, áreas verdes y conectividad peatonal con el centro comercial."
  }
];

/* Control de Navegación del Quiz */
let quizCurrentStep = 1;
const quizTotalSteps = 5;

function updateQuizUI() {
  document.querySelectorAll('.quiz-step').forEach(el => el.classList.add('hidden'));
  const activeStep = document.querySelector(`.quiz-step[data-step="${quizCurrentStep}"]`);
  if (activeStep) activeStep.classList.remove('hidden');

  const indicator = document.getElementById('step-indicator');
  const tracker = document.getElementById('step-title-tracker');
  const bar = document.getElementById('progress-bar');

  if (indicator) indicator.innerText = `PASO ${quizCurrentStep} DE ${quizTotalSteps}`;
  if (bar) bar.style.width = `${(quizCurrentStep / quizTotalSteps) * 100}%`;

  const titles = [
    "Tipo de Propiedad",
    "Objetivo de Inversión",
    "Rango de Presupuesto",
    "Plazo Estimado",
    "Datos de Contacto Directo"
  ];
  if (tracker) tracker.innerText = titles[quizCurrentStep - 1] || "";
}

function nextStep(step) {
  const activeStepEl = document.querySelector(`.quiz-step[data-step="${quizCurrentStep}"]`);
  if (!activeStepEl) return;

  const inputs = activeStepEl.querySelectorAll('input[required]');
  let valid = true;

  inputs.forEach(input => {
    if (input.type === 'radio') {
      const groupChecked = activeStepEl.querySelector(`input[name="${input.name}"]:checked`);
      if (!groupChecked) valid = false;
    } else if (!input.value.trim()) {
      valid = false;
    }
  });

  if (!valid) {
    alert('Por favor selecciona una opción para avanzar al siguiente paso.');
    return;
  }

  quizCurrentStep = step;
  updateQuizUI();
}

function prevStep(step) {
  quizCurrentStep = step;
  updateQuizUI();
}

/* Procesamiento y Envío del Quiz */
async function handleQuizSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  // Validación de teléfono (mínimo 10 dígitos numéricos)
  const cleanPhone = (data.telefono || '').replace(/\D/g, '');
  if (cleanPhone.length < 10) {
    alert('Por favor ingresa un número de teléfono o WhatsApp válido con código de área (10 dígitos).');
    return;
  }

  // Algoritmo predictivo de emparejamiento
  let matchKey = "bosques";
  const presupuesto = data.cm_rango_presupuesto || "";
  const tipo = data.cm_tipo_interes || "";

  if (presupuesto === "$1.5M - $3M MXN") {
    matchKey = "jardines";
  } else if (tipo === "Lote" && presupuesto === "$3M - $6M MXN") {
    matchKey = "senderos";
  } else if (presupuesto === "$6M+ MXN") {
    matchKey = (tipo === "Lote") ? "country_club" : "the_reserve";
  } else if (tipo === "Departamento" && presupuesto === "$3M - $6M MXN") {
    matchKey = "bosques";
  } else if (tipo === "Lote") {
    matchKey = "senderos";
  }

  const match = MAYAKOBA_CATALOG.find(d => d.id === matchKey) || MAYAKOBA_CATALOG[0];

  // Construcción del Payload Estricto para GoHighLevel
  const ghlPayload = {
    first_name: data.nombre.split(' ')[0] || data.nombre,
    last_name: data.nombre.split(' ').slice(1).join(' ') || '',
    name: data.nombre,
    email: data.email,
    phone: `+52${cleanPhone.slice(-10)}`,
    source: "Especialista Ciudad Mayakoba - Quiz CRO",
    tags: [
      "lead-calificado",
      `interes-${matchKey.replace('_', '-')}`,
      "canal-web-directo",
      "nom-247-aceptado"
    ],
    customFields: {
      cm_tipo_interes: data.cm_tipo_interes || "No especificado",
      cm_desarrollo_preferido: match.nombre,
      cm_rango_presupuesto: data.cm_rango_presupuesto || "No especificado",
      cm_plazo_compra: data.cm_plazo_compra || "Inmediato"
    },
    metadata: {
      id_desarrollo: match.id_desarrollo,
      desarrollo_sugerido: match.nombre,
      tipologias_sugeridas: match.tipologias,
      razon_social: match.razon_social,
      precio_referencia: match.precio_display,
      objetivo_inversion: data.cm_objetivo || "Inversión Patrimonial",
      timestamp_utc: new Date().toISOString()
    }
  };

  const submitBtn = document.getElementById('btn-submit-quiz');
  if (submitBtn) {
    submitBtn.innerText = "Procesando compatibilidad...";
    submitBtn.disabled = true;
  }

  // Despacho a Webhook (ruta relativa dinámica para local y Render.com)
  try {
    await fetch("/api/ghl-webhook", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(ghlPayload)
    });
  } catch (err) {
    console.info("Info: Webhook local en espera. Datos registrados para GoHighLevel:", ghlPayload);
  }

  try {
    localStorage.setItem("mayakoba_ultimo_lead", JSON.stringify(ghlPayload));
  } catch (e) {}

  // Mostrar panel de resultados dinámico
  form.classList.add('hidden');
  const headerWrapper = document.getElementById('quiz-header-wrapper');
  if (headerWrapper) headerWrapper.classList.add('hidden');

  const resultPane = document.getElementById('quiz-result-pane');
  if (resultPane) {
    resultPane.classList.remove('hidden');

    const nameEl = document.getElementById('match-dev-name');
    const imgEl = document.getElementById('match-dev-img');
    const priceEl = document.getElementById('match-dev-price');
    const socialEl = document.getElementById('match-dev-social');
    const descEl = document.getElementById('match-dev-desc');
    const tipoEl = document.getElementById('match-dev-tipologias');
    const waBtn = document.getElementById('btn-redirect-whatsapp');

    if (nameEl) nameEl.innerText = match.nombre;
    if (imgEl) imgEl.src = match.imagen_principal;
    if (priceEl) priceEl.innerText = match.precio_display;
    if (socialEl) socialEl.innerText = match.razon_social_full;
    if (descEl) descEl.innerText = match.descripcion;
    if (tipoEl) tipoEl.innerText = match.tipologias;

    const msg = encodeURIComponent(
      `Hola Especialista Mayakoba, mi nombre es ${data.nombre}. Completé el cuestionario y mi desarrollo ideal fue ${match.nombre} (${match.precio_display}). Deseo recibir la disponibilidad de inventario y agendar una llamada.`
    );
    if (waBtn) waBtn.href = `https://wa.me/5219841047963?text=${msg}`;
  }
}

/* Lightbox Modal de Imágenes y Planos */
function openLightbox(imageSrc, title = "Visualización Arquitectónica") {
  const modal = document.getElementById('lightbox-modal');
  const modalImg = document.getElementById('lightbox-img');
  const modalTitle = document.getElementById('lightbox-title');

  if (modal && modalImg) {
    modalImg.src = imageSrc;
    if (modalTitle) modalTitle.innerText = title;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeLightbox() {
  const modal = document.getElementById('lightbox-modal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

/* Filtrado de Proyectos en el Showcase */
function filterProjects(category) {
  document.querySelectorAll('.filter-tab-btn').forEach(btn => {
    btn.classList.remove('bg-emerald-700', 'text-white');
    btn.classList.add('bg-slate-100', 'text-slate-600');
  });

  const activeBtn = document.querySelector(`.filter-tab-btn[data-category="${category}"]`);
  if (activeBtn) {
    activeBtn.classList.remove('bg-slate-100', 'text-slate-600');
    activeBtn.classList.add('bg-emerald-700', 'text-white');
  }

  document.querySelectorAll('.project-card').forEach(card => {
    const cardCategory = card.getAttribute('data-category');
    if (category === 'all' || cardCategory === category) {
      card.classList.remove('hidden');
    } else {
      card.classList.add('hidden');
    }
  });
}

/* Switcher Expat Hub (US / MX) */
function toggleExpatTab(country) {
  const usTab = document.getElementById('expat-tab-us');
  const mxTab = document.getElementById('expat-tab-mx');
  const usContent = document.getElementById('expat-content-us');
  const mxContent = document.getElementById('expat-content-mx');

  const activeClass = "flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs font-bold bg-emerald-700 text-white shadow-md transition";
  const inactiveClass = "flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs font-bold bg-slate-100 text-slate-600 hover:bg-slate-200 transition";

  if (country === 'us') {
    if (usTab) usTab.className = activeClass;
    if (mxTab) mxTab.className = inactiveClass;
    if (usContent) usContent.classList.remove('hidden');
    if (mxContent) mxContent.classList.add('hidden');
  } else {
    if (mxTab) mxTab.className = activeClass;
    if (usTab) usTab.className = inactiveClass;
    if (mxContent) mxContent.classList.remove('hidden');
    if (usContent) usContent.classList.add('hidden');
  }
}

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
  updateQuizUI();

  // Cerrar lightbox con tecla ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });

  // Mobile menu drawer toggle
  const mobileBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileIcon = document.getElementById('mobile-menu-icon');

  if (mobileBtn && mobileMenu) {
    mobileBtn.addEventListener('click', () => {
      const isHidden = mobileMenu.classList.contains('hidden');
      if (isHidden) {
        mobileMenu.classList.remove('hidden');
        if (mobileIcon) mobileIcon.className = 'fa-solid fa-xmark text-xl';
      } else {
        mobileMenu.classList.add('hidden');
        if (mobileIcon) mobileIcon.className = 'fa-solid fa-bars text-xl';
      }
    });

    document.querySelectorAll('.mobile-nav-link').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        if (mobileIcon) mobileIcon.className = 'fa-solid fa-bars text-xl';
      });
    });
  }
});

