const CACHE_NAME = "kingsvillage-fit-v1";
const TTL = 10 * 1000; // 10 sekundi (test mode)
console.log("🔥 SW SCRIPT LOADED");

const ASSETS_TO_CACHE = [
  "/",
  "/index.html",
  "/Stopwatch.css",
  "/stylesResponsive.css",
  "/javascript.js",
  "/manifest.json",
  "/offline.html"
];

// ================= INSTALL =================
self.addEventListener("install", event => {
  console.log("🛠 SW installing");
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS_TO_CACHE))
  );
  self.skipWaiting();
});

// ================= ACTIVATE =================
self.addEventListener("activate", event => {
  console.log("✅ SW activated");
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(key => key !== CACHE_NAME && caches.delete(key)))
    )
  );
  self.clients.claim();
});

// ================= FETCH + TTL =================
self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;

  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);
    const cachedResponse = await cache.match(event.request);

    // ================= CACHE HIT =================
    if (cachedResponse) {
      const fetchedAt = Number(cachedResponse.headers.get("sw-fetched-at"));

      if (fetchedAt) {
        const age = Date.now() - fetchedAt;

        // TTL VALID
        if (age < TTL) {
          console.log("🟢 TTL HIT (cache valid):", event.request.url);
          return cachedResponse;
        }

        // TTL EXPIRED
        console.log("🟡 TTL EXPIRED:", event.request.url);
      }
    } 
    // ================= CACHE MISS =================
    else {
      console.log("⚪ Cache MISS:", event.request.url);
    }

    // ================= NETWORK FETCH =================
    try {
      console.log("🌍 Fetching from network:", event.request.url);
      const networkResponse = await fetch(event.request);

      if (networkResponse.ok) {
        const headers = new Headers(networkResponse.headers);
        headers.set("sw-fetched-at", Date.now().toString());

        const responseClone = new Response(await networkResponse.clone().blob(), {
          status: networkResponse.status,
          statusText: networkResponse.statusText,
          headers
        });

        // 🔥 CACHE SE PUNI OVDE
        await cache.put(event.request, responseClone);
        console.log("💾 Cached from network:", event.request.url);
      }

      return networkResponse;

    } catch (err) {
      console.log("❌ Network error:", event.request.url, err);

      if (cachedResponse) {
        console.log("📦 Offline fallback cache:", event.request.url);
        return cachedResponse;
      }

      return new Response(
        JSON.stringify({ error: "offline" }),
        { status: 503, headers: { "Content-Type": "application/json" } }
      );
    }
  })());
});


// Handling CHECK_TTL message from client
self.addEventListener('message', event => {
  if (!event.data || event.data.type !== 'CHECK_TTL') return;

  console.log("🕒 TTL check:", event.data.url);

  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    const cachedResponse = await cache.match(event.data.url);

    // ================= CACHE HIT =================
    if (cachedResponse) {
      const fetchedAt = Number(cachedResponse.headers.get("sw-fetched-at"));
      const age = Date.now() - fetchedAt;

      if (fetchedAt && age >= TTL) {
        console.log("🟡 TTL EXPIRED → refresh:", event.data.url);

        try {
          const networkResponse = await fetch(event.data.url);

          if (networkResponse.ok) {
            const headers = new Headers(networkResponse.headers);
            headers.set("sw-fetched-at", Date.now().toString());

            const responseClone = new Response(await networkResponse.clone().blob(), {
              status: networkResponse.status,
              statusText: networkResponse.statusText,
              headers
            });

            await cache.put(event.data.url, responseClone);
            console.log("🔄 Cache refreshed:", event.data.url);
          }
        } catch (e) {
          console.log("❌ TTL refresh failed:", e);
        }
      } else {
        console.log("🟢 TTL VALID:", event.data.url);
      }
    }

    // ================= CACHE MISS =================
    else {
      console.log("⚪ Cache MISS (message handler) → fetching:", event.data.url);

      try {
        const networkResponse = await fetch(event.data.url);

        if (networkResponse.ok) {
          const headers = new Headers(networkResponse.headers);
          headers.set("sw-fetched-at", Date.now().toString());

          const responseClone = new Response(await networkResponse.clone().blob(), {
            status: networkResponse.status,
            statusText: networkResponse.statusText,
            headers
          });

          await cache.put(event.data.url, responseClone);
          console.log("💾 Cache filled from MISS:", event.data.url);
        }
      } catch (e) {
        console.log("❌ MISS fetch failed:", e);
      }
    }

  })());
});

