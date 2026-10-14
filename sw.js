/* mbweather.online service worker (MB Suite v3 template, kept in this app's style).
   Network-first for the app's own files, cache as the offline fallback. Never touches user data
   (localStorage / IndexedDB), never intercepts non-GET or cross-origin requests (weather APIs, map tiles).
   BUMP VERSION ON EVERY RELEASE so installed copies drop old files and pick up new icons. */
const VERSION = 'mbweather-20261014-ce112367';
const SHELL = ['./', 'index.html', 'manifest.json', 'favicon.ico', 'favicon.svg', 'apple-touch-icon.png', 'icon-192.png', 'icon-512.png', 'icon-maskable-512.png', 'vendor/leaflet.js', 'vendor/leaflet.css', 'vendor/maplibre-gl.js', 'vendor/maplibre-gl.css', 'vendor/leaflet-maplibre-gl.js', 'vendor/topojson-client.min.js', 'vendor/countries-50m.json', 'vendor/states-10m.json', 'vendor/images/layers.png', 'vendor/images/layers-2x.png', 'vendor/images/marker-icon.png', 'vendor/images/marker-icon-2x.png', 'vendor/images/marker-shadow.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(SHELL.map(u => new Request(u, { cache: 'reload' })))).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k.startsWith('mbweather-') && k !== VERSION).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return;   // weather APIs, radar and map tiles are never touched
  e.respondWith(
    fetch(req, { cache: 'no-cache' })
      .then(res => { if (res.ok && res.type === 'basic') { const copy = res.clone(); caches.open(VERSION).then(c => c.put(req, copy)); } return res; })
      .catch(() => caches.match(req, { ignoreSearch: true })
        .then(r => r || (req.mode === 'navigate' ? caches.match('index.html') : Response.error())))
  );
});
