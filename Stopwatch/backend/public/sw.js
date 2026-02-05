const CACHE_NAME = "kingsvillage-fit-v1";
const TTL = 10 * 1000; // 10 sekundi za test
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
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS_TO_CACHE))
  );
  self.skipWaiting();
});

// ACTIVATE
self.addEventListener("activate", event => {
  console.log("✅ Service Worker activated");
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => key !== CACHE_NAME && caches.delete(key))
      )
    )
  );
});

// FETCH
self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;

  event.respondWith(
    caches.open(CACHE_NAME).then(async cache => {
      const cachedResponse = await cache.match(event.request);
      
      if (cachedResponse) {
        const fetchedAt = Number(cachedResponse.headers.get("sw-fetched-at"));
        if (fetchedAt && Date.now() - fetchedAt < TTL) {
          console.log("🟢 Cache HIT (TTL valid):", event.request.url);
          return cachedResponse;
        } else {
          console.log("🟡 Cache EXPIRED or no TTL:", event.request.url);
        }
      }

      try {
        const networkResponse = await fetch(event.request);

        if (networkResponse.status === 200 && networkResponse.type === "basic") {
          const headers = new Headers(networkResponse.headers);
          headers.set("sw-fetched-at", Date.now().toString());
          const responseClone = new Response(await networkResponse.clone().blob(), {
            status: networkResponse.status,
            statusText: networkResponse.statusText,
            headers
          });

          await cache.put(event.request, responseClone);
          console.log("🔄 Cache updated:", event.request.url);
        } else {
          console.log("⚠️ Not caching (status/type):", networkResponse.status, networkResponse.type);
        }

        return networkResponse;
      } catch (err) {
        console.log("❌ Network failed, using cache if available:", event.request.url, err);
        return cachedResponse || (event.request.destination === "document" ? await cache.match("/offline.html") : null);
      }
    })
  );
});
