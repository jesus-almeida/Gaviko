const CACHE_NAME = "gaviko-v1";

const STATIC_ASSETS = [
  // HTML
  "/",
  "/pages/index.html",
  "/pages/calculator.html",
  "/pages/rates.html",
  "/pages/basic-calculator.html",
  "/pages/timer.html",

  // Manifest
  "/manifest.json",

  // Icons
  "/icons/favicon.ico",
  "/icons/apple-touch-icon.png",
  "/icons/web-app-manifest-192x192.png",
  "/icons/web-app-manifest-512x512.png",

  // Base CSS
  "/css/base/reset.css",
  "/css/base/variables.css",
  "/css/base/typography.css",
  "/css/base/utilities.css",

  // Core JS
  "/js/core/app.js",
  "/js/core/router.js",
  "/js/core/storage.js",
];

// INSTALL
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
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

  // SOLO GET
  if (request.method !== "GET") return;

  // HTML - NETWORK FIRST
  if (request.destination === "document") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();

          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, copy);
          });

          return response;
        })

        .catch(() => {
          return caches.match(request);
        }),
    );

    return;
  }

  // CSS / JS / IMAGES - CACHE FIRST
  if (
    request.destination === "style" ||
    request.destination === "script" ||
    request.destination === "image" ||
    request.destination === "font"
  ) {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }

        return fetch(request).then((response) => {
          const copy = response.clone();

          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, copy);
          });

          return response;
        });
      }),
    );

    return;
  }

  // API REQUESTS - NETWORK FIRST

  if (request.url.includes("/api/")) {
    event.respondWith(fetch(request).catch(() => caches.match(request)));
  }
});
