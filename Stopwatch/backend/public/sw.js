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
  })()); // <-- Ovdje se završava async funkcija
});  // <-- Ovdje se završava event listener
