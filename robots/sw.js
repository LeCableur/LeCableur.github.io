const CACHE = "mes-robots-v5";
const FILES = ["/robots/", "/robots/index.html", "/robots/app.js", "/robots/manifest.webmanifest", "/robots/data.json",
  "/robots/icons/apple-touch-icon.png", "/robots/icons/icon-192.png", "/robots/icons/icon-512.png"];
self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(FILES)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", (e) => {
  e.waitUntil(caches.keys().then((keys) => Promise.all(
    keys.filter((k) => k.startsWith("mes-robots-") && k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
function networkFirst(req) {
  return fetch(req, { cache: "no-store" }).then((res) => {
    const copy = res.clone();
    caches.open(CACHE).then((c) => c.put(req, copy));
    return res;
  }).catch(() => caches.match(req, { ignoreSearch: true }));
}
self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return;
  const url = new URL(e.request.url);
  if (!url.pathname.startsWith("/robots/")) return;
  if (url.pathname.endsWith("/data.json")) { e.respondWith(networkFirst(e.request)); return; }
  if (e.request.mode === "navigate") {
    e.respondWith(networkFirst(e.request).then((r) => r || caches.match("/robots/index.html")));
    return;
  }
  e.respondWith(caches.match(e.request, { ignoreSearch: true }).then((hit) => hit || networkFirst(e.request)));
});
