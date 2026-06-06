// ============================================
// NOTIFICATIONS.JS
// Servicio de notificaciones.
// Maneja permisos, suscripción push (futuro)
// y envío de notificaciones locales de prueba.
// ============================================

/**
 * Verifica si el navegador soporta notificaciones.
 */
export function isNotificationSupported() {
  return "Notification" in window && "serviceWorker" in navigator;
}

/**
 * Obtiene el estado actual del permiso de notificaciones.
 * @returns {'granted'|'denied'|'default'}
 */
export function getPermissionState() {
  if (!isNotificationSupported()) return "denied";
  return Notification.permission;
}

/**
 * Solicita permiso para enviar notificaciones.
 * Solo se llama si el permiso es 'default'.
 * @returns {Promise<'granted'|'denied'|'default'>}
 */
export async function requestNotificationPermission() {
  if (!isNotificationSupported()) return "denied";
  if (Notification.permission === "granted") return "granted";
  if (Notification.permission === "denied") return "denied";
  const result = await Notification.requestPermission();
  return result;
}

/**
 * Envía una notificación de prueba usando el Service Worker.
 * Requiere que el permiso esté concedido.
 */
export function sendTestNotification() {
  if (!isNotificationSupported()) {
    console.warn("Notificaciones no soportadas");
    return;
  }
  if (Notification.permission !== "granted") {
    console.warn("Permiso de notificación no concedido");
    return;
  }

  // Esperar a que el SW esté listo
  navigator.serviceWorker.ready.then((registration) => {
    registration.showNotification("Gaviko - Test Notification", {
      body: "¡Las notificaciones funcionan correctamente!",
      icon: "/icons/web-app-manifest-192x192.png",
      badge: "/icons/favicon-96x96.png",
      tag: "test-notification",
      requireInteraction: false,
      data: {
        url: "/#inicio", // Al hacer clic irá a inicio
      },
    });
  });
}
