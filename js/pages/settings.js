// ============================================
// SETTINGS.JS
// Vista de Ajustes: preferencias e información.
// Incluye control de notificaciones con permiso real.
// ============================================

import {
  isNotificationSupported,
  getPermissionState,
  requestNotificationPermission,
  sendTestNotification,
} from "../services/notifications.js";

export function renderSettings() {
  return `
    <div class="card">
      <div class="card-title"><i class="fas fa-sliders-h"></i> Preferencias</div>
      <div class="setting-row">
        <div class="setting-label"><i class="fas fa-moon"></i> Modo oscuro</div>
        <label class="toggle-switch">
          <input type="checkbox" id="darkModeToggle">
          <span class="slider"></span>
        </label>
      </div>
      <div class="setting-row">
        <div class="setting-label"><i class="fas fa-bell"></i> Notificaciones</div>
        <label class="toggle-switch">
          <input type="checkbox" id="notifToggle">
          <span class="slider"></span>
        </label>
      </div>
      <div id="notifExtra" class="mt-3">
        <!-- Aquí se mostrará botón de prueba o mensaje -->
      </div>
    </div>

    <div class="card">
      <div class="card-title"><i class="fas fa-info-circle"></i> Información</div>
      <div class="info-item">
        <span class="info-label">Versión</span>
        <span class="info-value">1.0.0</span>
      </div>
      <div class="info-item">
        <span class="info-label">Repositorio</span>
        <span class="info-value"><a href="https://github.com/jesus-almeida/Gaviko" target="_blank" rel="noopener noreferrer">GitHub <i class="fas fa-external-link-alt"></i></a></span>
      </div>
      <div class="info-item">
        <span class="info-label">Desarrollador</span>
        <span class="info-value">Jesús Almeida (GCoder)</span>
      </div>
    </div>
  `;
}

export function initSettings() {
  const darkToggle = document.getElementById("darkModeToggle");
  const notifToggle = document.getElementById("notifToggle");
  const notifExtra = document.getElementById("notifExtra");

  // --- Modo oscuro ---
  if (darkToggle) {
    const currentTheme = localStorage.getItem("theme") || "light";
    darkToggle.checked = currentTheme === "dark";
    darkToggle.addEventListener("change", (e) => {
      if (e.target.checked) {
        document.documentElement.setAttribute("data-theme", "dark");
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.removeAttribute("data-theme");
        localStorage.setItem("theme", "light");
      }
    });
  }

  // --- Notificaciones ---
  if (notifToggle && notifExtra) {
    // Estado inicial: desactivado por defecto
    const notifSetting = localStorage.getItem("notifications");
    if (notifSetting === null) {
      localStorage.setItem("notifications", "disabled");
    }
    const isEnabled = localStorage.getItem("notifications") === "enabled";
    notifToggle.checked = isEnabled;

    // Actualizar UI según estado y permisos
    updateNotifUI(notifExtra);

    notifToggle.addEventListener("change", async (e) => {
      const enabled = e.target.checked;
      localStorage.setItem("notifications", enabled ? "enabled" : "disabled");
      updateNotifUI(notifExtra);

      // Si se activan, sugerir permiso si no está concedido
      if (enabled && Notification.permission === "default") {
        const result = await requestNotificationPermission();
        if (result === "granted") {
          // Permiso concedido, actualizar UI
          updateNotifUI(notifExtra);
        } else if (result === "denied") {
          // Desactivar toggle porque el usuario denegó
          notifToggle.checked = false;
          localStorage.setItem("notifications", "disabled");
          updateNotifUI(notifExtra);
          alert(
            "No se pueden enviar notificaciones porque el permiso fue denegado. Puedes cambiarlo en la configuración del navegador.",
          );
        }
      }
    });

    // Listener para cuando el permiso cambia externamente (poco común, pero bueno)
    if (navigator.permissions) {
      navigator.permissions.query({ name: "notifications" }).then((status) => {
        status.addEventListener("change", () => {
          updateNotifUI(notifExtra);
        });
      });
    }
  }
}

/**
 * Actualiza la sección extra de notificaciones según el toggle y el permiso.
 */
function updateNotifUI(container) {
  const isEnabled = localStorage.getItem("notifications") === "enabled";
  const permState = getPermissionState();

  let html = "";

  if (!isNotificationSupported()) {
    html = '<p class="text-muted">Tu navegador no soporta notificaciones.</p>';
  } else if (!isEnabled) {
    html =
      '<p class="text-muted">Activa las notificaciones para probarlas.</p>';
  } else if (permState === "denied") {
    html =
      '<p class="text-warning">Permiso denegado. Cámbialo en la configuración del navegador.</p>';
  } else if (permState === "default") {
    html = `
      <p class="text-muted">Se necesita permiso para enviar notificaciones.</p>
      <button class="btn-reset" id="requestPermBtn">Solicitar permiso</button>
    `;
  } else if (permState === "granted") {
    html = `
      <p class="text-success"><i class="fas fa-check-circle"></i> Permiso concedido.</p>
      <button class="btn-reset" id="testNotifBtn">Probar notificación</button>
    `;
  }

  container.innerHTML = html;

  // Eventos para los botones dinámicos
  const requestBtn = document.getElementById("requestPermBtn");
  const testBtn = document.getElementById("testNotifBtn");

  if (requestBtn) {
    requestBtn.addEventListener("click", async () => {
      const result = await requestNotificationPermission();
      if (result === "granted") {
        updateNotifUI(container);
      } else if (result === "denied") {
        // Desactivar toggle
        const notifToggle = document.getElementById("notifToggle");
        if (notifToggle) {
          notifToggle.checked = false;
          localStorage.setItem("notifications", "disabled");
        }
        updateNotifUI(container);
      }
    });
  }

  if (testBtn) {
    testBtn.addEventListener("click", () => {
      sendTestNotification();
    });
  }
}
