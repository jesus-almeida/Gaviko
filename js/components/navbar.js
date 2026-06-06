// ============================================
// NAVBAR.JS
// Barra de navegación autónoma.
// Escucha hashchange para actualizar el botón
// activo, sin depender del router.
// Protegida contra múltiples inicializaciones.
// ============================================

import router from "../core/router-instance.js";

let initialized = false;

/**
 * Actualiza el botón activo según el hash actual.
 * Solo ejecuta si el hash realmente cambió.
 */
function updateActiveFromHash() {
  const currentHash = window.location.hash.slice(1) || "inicio";
  const navItems = document.querySelectorAll(".nav-item");

  // Remover active de todos
  navItems.forEach((btn) => btn.classList.remove("active"));

  // Agregar active al botón correspondiente
  const activeBtn = document.querySelector(
    `.nav-item[data-nav="${currentHash}"]`,
  );
  if (activeBtn) {
    activeBtn.classList.add("active");
  }
}

/**
 * Inicializa la navbar (solo una vez).
 */
export function initNavbar() {
  if (initialized) return;
  initialized = true;

  const navItems = document.querySelectorAll(".nav-item");

  // Conectar clics de los botones con el router
  navItems.forEach((btn) => {
    btn.addEventListener("click", () => {
      const route = btn.getAttribute("data-nav");
      if (route) {
        router.navigate(route);
      }
    });
  });

  // Escuchar cambios de hash directamente (navegación manual, historial)
  window.addEventListener("hashchange", updateActiveFromHash);

  // Establecer el estado inicial
  updateActiveFromHash();
}
