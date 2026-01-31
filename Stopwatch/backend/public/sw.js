const CACHE_NAME = "kingsvillage-fit-v1";

const ASSETS_TO_CACHE = [
  "/",
  "/index.html",
  "/Stopwatch.css",
  "/stylesResponsive.css",
  "/javascript.js",
  "/manifest.json",
  "/offline.html"
];

// INSTALL
self.addEventListener("install", event => {
  console.log("🛠 Service Worker installing...");
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// ACTIVATE
self.addEventListener("activate", event => {
  console.log("✅ Service Worker activated");
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );
});

// FETCH
self.addEventListener("fetch", event => {
  // Keširamo samo GET zahteve
  if (event.request.method !== "GET") return;

  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      if (cachedResponse) {
        // Vrati iz keša odmah
        return cachedResponse;
      }

      return fetch(event.request)
        .then(networkResponse => {
          // Keširaj sve GET odgovore (dinamički)
          return caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          });
        })
        .catch(() => {
          // Ako nema mreže i nije u kešu, fallback
          if (event.request.destination === "document") {
            return caches.match("/offline.html");
          }
        });
    })
  );
});

