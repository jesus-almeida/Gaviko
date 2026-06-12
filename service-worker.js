// ⚠️ Al modificar assets estáticos (CSS/JS/imágenes), incrementa este número
const CACHE_NAME = "gaviko-v4";

const STATIC_ASSETS = [
  "./",
  "./index.html",
  "./manifest.json",

  // CSS base
  "./css/base/variables.css",
  "./css/base/reset.css",
  "./css/base/typography.css",
  "./css/base/utilities.css",

  // CSS componentes
  "./css/components/navbar.css",
  "./css/components/cards.css",

  // CSS layouts
  "./css/layouts/main.css",

  // CSS pages
  "./css/pages/calculator.css",
  "./css/pages/home.css",
  "./css/pages/pasajes.css",
  "./css/pages/rates.css",
  "./css/pages/settings.css",

  // JS core
  "./js/core/app.js",
  "./js/core/router.js",
  "./js/core/router-instance.js",

  // JS components
  "./js/components/navbar.js",

  // JS pages
  "./js/pages/calculator.js",
  "./js/pages/home.js",
  "./js/pages/pasajes.js",
  "./js/pages/rates.js",
  "./js/pages/settings.js",

  // JS services
  "./js/services/notifications.js",
  "./js/services/rates-api.js",

  // Iconos
  "./icons/apple-touch-icon.png",
  "./icons/favicon.ico",
  "./icons/favicon.svg",
  "./icons/favicon-96x96.png",
  "./icons/web-app-manifest-192x192.png",
  "./icons/web-app-manifest-512x512.png",

  // iOS Splash Screen
  "./splash_screens/iPhone_8_Plus__iPhone_7_Plus__iPhone_6s_Plus__iPhone_6_Plus_landscape.png",
  "./splash_screens/iPhone_8_Plus__iPhone_7_Plus__iPhone_6s_Plus__iPhone_6_Plus_portrait.png",

  // Imagen logo
  "./images/logo.svg",

  // Galeria
  "./images/gallery/image0.jpeg",
  "./images/gallery/image1.jpeg",
  "./images/gallery/image2.jpeg",
  "./images/gallery/image3.jpeg",
  "./images/gallery/image4.jpeg",
  "./images/gallery/image5.jpeg",

  // Sonidos (Despues)
  //"./sounds/notification.mp3",
];

// INSTALL
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS).catch((error) => {
        console.warn("Algunos recursos no se pudieron cachear:", error);
      });
    }),
  );
  self.skipWaiting();
});

// ACTIVATE
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        }),
      );
    }),
  );
  self.clients.claim();
});

// FETCH
self.addEventListener("fetch", (event) => {
  const request = event.request;

  if (request.method !== "GET") return;

  // HTML - Network first, fallback al index.html cacheado si no hay red
  if (request.destination === "document") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
          return response;
        })
        .catch(() => {
          // Si falla la red, servir el index.html cacheado (app shell)
          return caches.match("./index.html");
        }),
    );
    return;
  }

  // CSS, JS, imágenes, fuentes - Cache first
  if (
    request.destination === "style" ||
    request.destination === "script" ||
    request.destination === "image" ||
    request.destination === "font"
  ) {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        return (
          cachedResponse ||
          fetch(request).then((response) => {
            const copy = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
            return response;
          })
        );
      }),
    );
    return;
  }

  // API requests - Network first
  if (new URL(request.url).pathname.includes("/api/")) {
    event.respondWith(fetch(request).catch(() => caches.match(request)));
  }
});

// NOTIFICATION CLICK
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const urlToOpen = event.notification.data?.url || "/";
  event.waitUntil(
    clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then((windowClients) => {
        for (const client of windowClients) {
          if (client.url.includes(urlToOpen) && "focus" in client) {
            return client.focus();
          }
        }
        if (clients.openWindow) {
          return clients.openWindow(urlToOpen);
        }
      }),
  );
});
