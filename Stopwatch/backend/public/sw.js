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

// INSTALL
self.addEventListener("install", event => {
  console.log("🛠 SW installing");
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS_TO_CACHE))
  );
  self.skipWaiting();
});

// ACTIVATE
self.addEventListener("activate", event => {
  console.log("✅ SW activated");
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(key => key !== CACHE_NAME && caches.delete(key)))
    )
  );
});

// FETCH
self.addEventListener('fetch', event => {
  console.log("🧲 SW FETCH:", event.request.url); // Dodajmo log za svaki fetch

  if (event.request.method !== "GET") return;

  const url = new URL(event.request.url);

  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);
    const cachedResponse = await cache.match(event.request);

    if (cachedResponse) {
      const fetchedAt = Number(cachedResponse.headers.get("sw-fetched-at"));
      if (fetchedAt) {
        const age = Date.now() - fetchedAt;
        console.log("⏱ TTL age(ms):", age, "URL:", event.request.url);
      }

      if (fetchedAt && Date.now() - fetchedAt < TTL) {
        console.log("🟢 TTL HIT (cache valid):", event.request.url);
        return cachedResponse;
      } else {
        console.log("🟡 TTL EXPIRED:", event.request.url);
      }
    } else {
      console.log("⚪ Cache MISS:", event.request.url);
    }

    // Ako dođe do Cache MISS, pravimo mrežni poziv
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

        await cache.put(event.request, responseClone);  // Keširamo podatke sa mreže
        console.log("🔄 Cached from network:", event.request.url);
      }

      return networkResponse;

    } catch (err) {
      console.log("❌ Network fail, fallback cache:", event.request.url);

      // Ako je offline i nema podataka u kešu, šaljemo poruku o grešci
      if (cachedResponse) {
        return cachedResponse;
      }

      return new Response(
        JSON.stringify({ error: "offline" }),
        { status: 503, headers: { "Content-Type": "application/json" } }
      );
    }
  })()); // Zatvorena asinhrona funkcija
});  // Zatvorena fetch event listener

// Handling CHECK_TTL message from client
self.addEventListener('message', event => {
  console.log("Received message in Service Worker:", event.data); // Logovanje celokupnog eventa
  if (event.data && event.data.type === 'CHECK_TTL') {
    console.log("🕒 Checking TTL and refreshing cache if needed...");

    event.waitUntil(
      caches.open(CACHE_NAME).then(async (cache) => {
        console.log("Proveravam URL za keširanje:", event.data.url);
        const cachedResponse = await cache.match(event.data.url);
        console.log("Cached Response:", cachedResponse); // Proveri da li postoji keširani odgovor

        if (cachedResponse) {
          const fetchedAt = Number(cachedResponse.headers.get("sw-fetched-at"));
          const age = Date.now() - fetchedAt;
          console.log("⏱ TTL age(ms):", age, "URL:", event.data.url);

          if (fetchedAt && age >= TTL) {
            console.log("🟡 TTL EXPIRED:", event.data.url);
            try {
              const networkResponse = await fetch(event.data.url);  // Fetch iz mreže
              if (networkResponse.status === 200 && networkResponse.type === "basic") {
                const headers = new Headers(networkResponse.headers);
                headers.set("sw-fetched-at", Date.now().toString());

                const responseClone = new Response(await networkResponse.clone().blob(), {
                  status: networkResponse.status,
                  statusText: networkResponse.statusText,
                  headers
                });

                await cache.put(event.data.url, responseClone);  // Stavljamo novu verziju u cache
                console.log("🔄 Cache refreshed with network data:", event.data.url);
              }
            } catch (err) {
              console.log("❌ Error while refreshing cache from network:", event.data.url, err);
            }
          } else {
            console.log("🟢 TTL HIT (cache valid):", event.data.url);
          }
        } else {
          console.log("⚪ Cache MISS:", event.data.url);  // Ako nije bilo odgovora u cache-u
        }
      })
    );
  }
});  // Zatvorena message event listener
