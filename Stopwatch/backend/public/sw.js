const CACHE_NAME = "kingsvillage-fit-v1";

const ASSETS_TO_CACHE = [
  "/",
  "/index.html",
  "/Stopwatch.css",
  "/stylesResponsive.css",
  "/javascript.js",
  "/manifest.json"
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
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
