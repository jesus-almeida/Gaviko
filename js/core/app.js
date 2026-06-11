// ============================================
// APP.JS
// Punto de entrada. Inicializa SW, router y
// componentes del shell cuando el DOM está listo.
// ============================================

import router from "./router-instance.js";
import { initNavbar } from "../components/navbar.js";

// ---------- Service Worker ----------
if ("serviceWorker" in navigator) {
  window.addEventListener("load", async () => {
    try {
      const swUrl = new URL("../../service-worker.js", import.meta.url);
      const registration = await navigator.serviceWorker.register(swUrl);
      console.log("SW registrado:", registration);
    } catch (error) {
      console.error("Error al registrar el SW:", error);
    }
  });
}

// ---------- Variables de estado de la vista actual ----------
let currentRoute = null;

function initView(route) {
  const prevHandler = router.getHandler(currentRoute);
  if (prevHandler?.destroy) prevHandler.destroy();
  currentRoute = route;
  const nextHandler = router.getHandler(route);
  if (nextHandler?.init) nextHandler.init();
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
