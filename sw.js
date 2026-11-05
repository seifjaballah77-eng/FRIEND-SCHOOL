const CACHE_NAME = "friend-school-v6";
const APP_FILES = ["./", "./index.html", "./styles.css", "./app.js", "./manifest.webmanifest", "./icon.svg", "./countries.json", "./curriculum-tn.json"];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(APP_FILES))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", event => {
  const request = event.request;
  if (request.method !== "GET") return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  const isAppFile = url.pathname.endsWith("/") || /\.(html|css|js|json|webmanifest|svg)$/i.test(url.pathname);
  if (!isAppFile) return;

  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);
    try {
      const response = await fetch(request, { cache: "no-store" });
      if (response && response.ok && response.type === "basic") await cache.put(request, response.clone());
      return response;
    } catch (error) {
      const cached = await cache.match(request) || await cache.match("./index.html");
      if (cached) return cached;
      throw error;
    }
  })());
});
