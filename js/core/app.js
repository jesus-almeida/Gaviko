// ============================================
// APP.JS
// Punto de entrada. Inicializa SW, router y
// componentes del shell cuando el DOM está listo.
// ============================================

import router from "./router-instance.js";
import { initNavbar } from "../components/navbar.js";
import { initBasicCalculator } from "../pages/calculator.js";
import { initPasajes } from "../pages/pasajes.js";
import { initHome, destroyHome } from "../pages/home.js";
import { initTasas } from "../pages/rates.js";
import { initSettings } from "../pages/settings.js";

// ---------- Service Worker ----------
if ("serviceWorker" in navigator) {
  window.addEventListener("load", async () => {
    try {
      const registration =
        await navigator.serviceWorker.register("/service-worker.js");
      console.log("SW registrado:", registration);
    } catch (error) {
      console.error("Error al registrar el SW:", error);
    }
  });
}

// ---------- Variables de estado de la vista actual ----------
let currentRoute = null;

// Mapa de inicializadores y destructores
const viewHandlers = {
  inicio: { init: initHome, destroy: destroyHome },
  calculadora: { init: initBasicCalculator, destroy: null },
  pasajes: { init: initPasajes, destroy: null },
  tasa: { init: initTasas, destroy: null },
  ajustes: { init: initSettings, destroy: null },
};

function initView(route) {
  // Destruir la vista anterior si tiene destructor
  if (currentRoute && viewHandlers[currentRoute]?.destroy) {
    viewHandlers[currentRoute].destroy();
  }

  currentRoute = route;

  // Inicializar la nueva vista si tiene inicializador
  if (viewHandlers[route]?.init) {
    viewHandlers[route].init();
  }
}

// ---------- Inicialización de la app ----------
function bootstrap() {
  // 1. Preparar la barra de navegación (listeners, estado inicial)
  initNavbar();

  // 2. Registrar callback para inicializar/destruir vistas
  router.onRouteChange((route) => {
    initView(route);
  });

  // 3. Iniciar el router (renderiza la vista según el hash actual)
  router.init();
}

// Esperar a que el DOM esté disponible
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", bootstrap);
} else {
  bootstrap();
}
